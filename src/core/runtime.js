import {set,when,loop,flat,toMolang} from './molanguage.js';
import {curveMolang,segmentCount,DISCONTINUITY_DISTANCE} from '../config.js';
export function createRuntime(config,names){
const SEGMENTS=segmentCount(config),INTERVAL=config.sampleInterval,LIFETIME=config.lifetime;
const AX = ['x', 'y', 'z'], ENDS = ['a', 'b'];
const slots = ['live', ...Array.from({ length: SEGMENTS }, (_, i) => 'h' + i)];
const point = (slot, end, a) => `v.st_${slot}_${end}${a}`;
const age = slot => `v.st_${slot}_age`;
const field = (i, key) => `v.st_mesh${i}_${key}`;
const vector = (prefix, values) => AX.map((a, i) => set(prefix + a, values[i]));
const length = p => `math.sqrt(${AX.map(a => `${p}${a}*${p}${a}`).join('+')})`;
const dot = (a, b) => AX.map(k => `${a}${k}*${b}${k}`).join('+');

// The A&S attachable controller alternates states and reads its own bone TRS
// in on_exit. The two additional marker bones make these reads independent of
// Euler order, sword animation curves, and the owner's arm proportions.
function initialize() {
  return flat([
    ...['ready', 'warm', 'active', 'attack', 'previous_attack', 'fp', 'previous_fp', 'emit', 'previous_emit', 'acc', 'stamp', 'frame'].map(k => set('v.st_' + k, 0)),
    set('v.st_last_time', -1), set('v.st_bone_clock', 10000),
    AX.map(a=>[set('v.st_units_'+a,.9375/16),set('v.st_previous_units_'+a,.9375/16)]),
    ...['x', 'y', 'z', 'yaw', 'pitch'].map(a => set('v.st_owner_' + a, 0)),
    slots.map(s => [set(age(s), LIFETIME+1), ENDS.map(e => AX.map(a => set(point(s, e, a), 0)))]),
    Array.from({ length: SEGMENTS * 2 }, (_, i) => [
      set(field(i, 'stamp'), -1), set(field(i, 'visible'), 0),
      ...['rx', 'ry', 'rz', 'px', 'py', 'pz', 'sx', 'sy', 'iz'].map(k => set(field(i, k), 0)),
    ]),
  ]);
}

const clear = () => [set('v.st_ready', 0), set('v.st_acc', 0), slots.map(s => set(age(s), LIFETIME+1))];
// The vanilla player already publishes attack_time. Read it only from an
// attached player in the world; UI, mobs and loose items never follow the arrow.
const preAnimation =
  "v.st_active=0;v.st_emit=0;v.st_attack=0;v.trail_attack=0;v.st_fp=c.is_first_person;"+
  "!q.is_in_ui&&!(v.is_paperdoll??0)&&q.is_attached?{"+
  "q.is_owner_identifier_any('minecraft:player')?{"+
  "v.st_active=1;v.trail_attack=c.owning_entity->v.attack_time;v.st_attack=v.trail_attack;"+
  "v.st_emit=("+config.emitCondition+");};};";

function captureFrame() {
  return [
    set('t.base', `q.bone_orientation_trs('${names.a}')`),
    set('t.tip', `q.bone_orientation_trs('${names.b}')`),
    set('t.root', `q.bone_orientation_trs('${names.root}')`),
    set('t.ca', 'math.cos(t.root.r.x)'), set('t.sa', '-math.sin(t.root.r.x)'),
    set('t.cb', 'math.cos(t.root.r.y)'), set('t.sb', 'math.sin(t.root.r.y)'),
    set('t.cc', 'math.cos(t.root.r.z)'), set('t.sc', '-math.sin(t.root.r.z)'),
    ...[['t.cc*t.cb', 't.cc*t.sb*t.sa-t.sc*t.ca', 't.cc*t.sb*t.ca+t.sc*t.sa'],
      ['t.sc*t.cb', 't.sc*t.sb*t.sa+t.cc*t.ca', 't.sc*t.sb*t.ca-t.cc*t.sa'],
      ['-t.sb', 't.cb*t.sa', 't.cb*t.ca']].flatMap((row, i) => row.map((value, j) => set(`v.st_root${i}${j}`, value))),
    AX.map(a => [set('v.st_root_' + a, 't.root.t.' + a), set('v.st_root_s' + a, `(t.root.s.${a}<0?-1:1)*math.max(math.abs(t.root.s.${a}),0.00001)`)]),
    AX.map(a => [set('t.a' + a, `t.base.t.${a}`), set('t.b' + a, `t.tip.t.${a}`)]),
    set('t.dt', 'math.clamp(q.life_time-v.st_last_time,0,0.1)'),
    vector('t.pos', AX.map((_, i) => `q.position(${i})`)),
    set('t.yaw', config.firstPersonSpace==='world'?'v.st_fp?q.camera_rotation(1):(q.is_riding?q.head_y_rotation(0)-q.target_y_rotation:q.body_y_rotation)':'q.is_riding?q.head_y_rotation(0)-q.target_y_rotation:q.body_y_rotation'),
    set('t.pitch',config.firstPersonSpace==='world'?'v.st_fp?q.camera_rotation(0):0':'0'),
    set('t.reset', '!v.st_ready||v.st_previous_fp!=v.st_fp||q.life_time-v.st_last_time>0.15||q.life_time<v.st_last_time'),
    // Position discontinuity heuristic; enabled trails may bridge the jump.
    config.teleportTrail?[]:[
      set('t.displacement', AX.map(a => `(t.pos${a}-v.st_owner_${a})*(t.pos${a}-v.st_owner_${a})`).join('+')),
      when(`t.displacement>${DISCONTINUITY_DISTANCE**2}`, set('t.reset', 1)),
    ],
    when('t.reset', [clear(), set('v.st_ready', 1), set('t.dt', 0)]),
    // Third person: bring earlier points into the current actor model frame.
    // Yaw and the model/world Z flip match ClothPhysics / Simple Ragdoll.
    // The default first-person mode keeps view-model history. World mode also
    // compensates the camera pitch/yaw; it shares the same history and mesh fit.
    when(config.firstPersonSpace==='world'?'!t.reset':'!t.reset&&!v.st_fp', [
      set('t.cp0','math.cos(v.st_owner_pitch)'),set('t.sp0','math.sin(v.st_owner_pitch)'),set('t.cp1','math.cos(t.pitch)'),set('t.sp1','math.sin(t.pitch)'),
      set('t.cy', 'math.cos(t.yaw)'), set('t.sy', 'math.sin(t.yaw)'),
      set('t.cd', 'math.cos(v.st_owner_yaw-t.yaw)'), set('t.sd', 'math.sin(v.st_owner_yaw-t.yaw)'),
      AX.map(a => set('t.d' + a, `v.st_owner_${a}-t.pos${a}`)),
      set('t.ox', 't.cy*t.dx+t.sy*t.dz'), set('t.oz', 't.sy*t.dx-t.cy*t.dz'),
      slots.map(s => ENDS.map(e => [
        AX.map(a=>set('t.scaled_'+a,`${point(s,e,a)}*v.st_previous_units_${a}`)),
        set('t.x', 't.scaled_x'),set('t.y','t.cp0*t.scaled_y+t.sp0*t.scaled_z'),set('t.z','-t.sp0*t.scaled_y+t.cp0*t.scaled_z'),
        set('t.y','t.y+t.dy'),set('t.nz','-t.sd*t.x+t.cd*t.z+t.oz'),
        set(point(s, e, 'x'), '(t.cd*t.x+t.sd*t.z+t.ox)/v.st_units_x'),
        set(point(s,e,'y'),'(t.cp1*t.y-t.sp1*t.nz)/v.st_units_y'),
        set(point(s,e,'z'),'(t.sp1*t.y+t.cp1*t.nz)/v.st_units_z'),
      ])),
    ]),
    slots.map(s => set(age(s), `math.min(${age(s)}+t.dt,${LIFETIME+1})`)),
    set('t.swing', 'v.st_emit'),
    set('t.start', 't.swing&&(!v.st_previous_emit||t.reset'+(config.emitCondition.includes('v.trail_attack')?'||v.st_attack<v.st_previous_attack-0.25':'')+')'),
    when('t.start', [
      slots.map(s => [set(age(s), LIFETIME+1), ENDS.map(e => AX.map(a => set(point(s, e, a), `t.${e}${a}`)))]),
      set(age('live'), 0), set(age('h0'), 0), set('v.st_acc', 0), set('t.dt', 0),
    ]),
    when('t.swing', [
      // Even at 30 FPS, sample at 40 Hz by interpolating the two captured poses.
      // The live front edge follows the latest capture between fixed samples.
      ENDS.map(e => AX.map(a => set(`t.previous_${e}${a}`, point('live', e, a)))),
      set('t.old_acc', 'v.st_acc'), set('t.total', 'v.st_acc+t.dt'),
      set('t.steps', `math.min(${Math.ceil(.1/INTERVAL)},math.floor((t.total+0.000001)/${INTERVAL}))`),
      set('t.step', 0),
      loop('t.steps', [
        set('t.u', `math.clamp((${INTERVAL}-t.old_acc+t.step*${INTERVAL})/math.max(t.dt,0.000001),0,1)`),
        Array.from({ length: SEGMENTS - 1 }, (_, k) => SEGMENTS - 1 - k).map(i => [
          set(age('h' + i), age('h' + (i - 1))),
          ENDS.map(e => AX.map(a => set(point('h' + i, e, a), point('h' + (i - 1), e, a)))),
        ]),
        ENDS.map(e => AX.map(a => set(point('h0', e, a), `math.lerp(t.previous_${e}${a},t.${e}${a},t.u)`))),
        set(age('h0'), 't.dt*(1-t.u)'), set('t.step', 't.step+1'),
      ]),
      set('v.st_acc', `math.max(0,t.total-t.steps*${INTERVAL})`),
      ENDS.map(e => AX.map(a => set(point('live', e, a), `t.${e}${a}`))),
      set(age('live'), 0),
    ]),
    AX.map(a => set('v.st_owner_' + a, 't.pos' + a)), set('v.st_owner_yaw', 't.yaw'),set('v.st_owner_pitch','t.pitch'),
    AX.map(a=>set('v.st_previous_units_'+a,'v.st_units_'+a)),
    set('v.st_previous_emit', 'v.st_emit'), set('v.st_previous_attack', 'v.st_attack'), set('v.st_previous_fp', 'v.st_fp'),
    set('v.st_last_time', 'q.life_time'), set('v.st_frame', 'v.st_frame+1'),
  ];
}

function captureNodes() {
  return flat(when('v.st_active', [
    when('q.anim_time<v.st_bone_clock', [clear(), set('v.st_warm', 0)]),
    set('v.st_bone_clock', 'q.anim_time'),
    when('q.life_time!=v.st_stamp', [
      set('v.st_stamp', 'q.life_time'),
      when('v.st_warm<0.1', [
        set('v.st_warm', 'v.st_warm+math.clamp(q.delta_time,0,0.05)'), clear(),
      ], when(`v.st_emit||(v.st_ready&&v.st_live_age<${LIFETIME})`, captureFrame(), [
        clear(), set('v.st_last_time', 'q.life_time'), set('v.st_previous_attack', 'v.st_attack'),
      ])),
    ]),
  ], [clear(), set('v.st_warm', 0)]));
}

// Each ribbon quad uses TWO mesh triangles. The three-bone affine fit maps its 3 vertices
// exactly. Shared vertices therefore remain joined even when the sword twists.
function triangleFit(i) {
  return flat([
    AX.map(a => set('t.m' + a, `(t.p${a}+(t.q${a}+t.r${a})*.5)*.5`)),
    AX.map(a => set('t.h' + a, `t.r${a}-t.q${a}`)),
    AX.map(a => set('t.i' + a, `t.p${a}-(t.q${a}+t.r${a})*.5`)),
    set('t.la', length('t.h')),
    when('t.la>0.0001', [
      AX.map(a => set('t.f' + a, `t.h${a}/t.la`)),
      set('t.lb', dot('t.i', 't.f')),
      AX.map(a => set('t.i' + a, `t.i${a}-t.lb*t.f${a}`)),
      set('t.ld', length('t.i')),
      when('t.ld>0.0001', [
        AX.map(a => set('t.k' + a, `t.i${a}/t.ld`)),
        set('t.se', '(t.la+t.ld)*.5'), set('t.sf', '(t.la-t.ld)*.5'), set('t.sg', 't.lb*.5'),
        set('t.sq', 'math.sqrt(t.se*t.se+t.sg*t.sg)'), set('t.sw', 'math.sqrt(t.sf*t.sf+t.sg*t.sg)'),
        set('t.a1', 'math.atan2(t.sg,t.sf)'), set('t.a2', 'math.atan2(-t.sg,t.se)'),
        set('t.ph', '(t.a2+t.a1)*.5'), set('t.cp', 'math.cos(t.ph)'), set('t.sp', 'math.sin(t.ph)'),
        set('t.u0', 't.cp*t.fx+t.sp*t.kx'), set('t.u1', 't.cp*t.fy+t.sp*t.ky'), set('t.u2', 't.cp*t.fz+t.sp*t.kz'),
        set('t.u3', 't.cp*t.kz-t.sp*t.fz'), set('t.u4', 't.fx*t.ky-t.fy*t.kx'),
        // Stable Euler extraction at the vertical singularity.
        when('math.abs(t.u2)>0.999999', [
          set(field(i, 'rx'), '(t.u2<0?-1:1)*math.atan2(t.cp*t.kx-t.sp*t.fx,t.cp*t.ky-t.sp*t.fy)'),
          set(field(i, 'ry'), 't.u2<0?90:-90'), set(field(i, 'rz'), 0),
        ], [
          set(field(i, 'rx'), '-math.atan2(t.u3,t.u4)'),
          set(field(i, 'ry'), 'math.asin(math.clamp(-t.u2,-1,1))'),
          set(field(i, 'rz'), '-math.atan2(t.u1,t.u0)'),
        ]),
        AX.map(a => set(field(i, 'p' + a), 't.m' + a)),
        set(field(i, 'sx'), 't.sq+t.sw'), set(field(i, 'sy'), 'math.max(t.sq-t.sw,0)'),
        set(field(i, 'iz'), '(t.a1-t.a2)*.5'), set(field(i, 'visible'), 1),
      ]),
    ]),
  ]);
}

function meshNodes(i) {
  const s = i >> 1, newer = s === 0 ? 'live' : 'h' + (s - 1), older = 'h' + s;
  return flat(when(`(${field(i, 'stamp')}??-1)!=(v.st_frame??0)`, [
    set(field(i, 'stamp'), 'v.st_frame'), set(field(i, 'visible'), 0),
    set(field(i, 'sx'), 0), set(field(i, 'sy'), 0),
    when(`v.st_active&&v.st_ready&&${age(newer)}<${LIFETIME}&&${age(older)}<${LIFETIME}`, [
      // Taper old cross-sections about the configured anchor.
      ...[[newer, 'a', 'b'], [older, 'c', 'd']].map(([slot, aName, bName]) => [
        set('t.width', curveMolang(config.width,`math.clamp(${age(slot)}/${LIFETIME},0,1)`)),
        AX.map(a => [
          set('t.mid', `math.lerp(${point(slot, 'a', a)},${point(slot, 'b', a)},${config.width.anchor})`),
          set('t.half', `(${point(slot, 'b', a)}-${point(slot, 'a', a)})*t.width`),
          set(`t.${aName}${a}`, `t.mid-t.half*${config.width.anchor}`), set(`t.${bName}${a}`, `t.mid+t.half*${1-config.width.anchor}`),
        ]),
      ]),
      ...['p', 'q', 'r'].map((dest, k) => AX.map(a => set('t.' + dest + a, 't.' + (i % 2 ? ['b', 'd', 'c'] : ['a', 'b', 'c'])[k] + a))),
      // Query positions include the parent's animated root. Undo it once,
      // because these geometry bones inherit that root again at render time.
      ...['p', 'q', 'r'].map(dest => [
        AX.map(a => set('t.d' + a, `t.${dest}${a}-v.st_root_${a}`)),
        AX.map((a, k) => set('t.' + dest + a, `(${AX.map((d, j) => `v.st_root${j}${k}*t.d${d}`).join('+')})/v.st_root_s${a}`)),
      ]),
      triangleFit(i),
    ]),
  ]));
}

function animatedBones() {
  const bones = {};
  for (let i = 0; i < SEGMENTS * 2; i++) {
    const prefix = toMolang(meshNodes(i));
    const value = (key, fallback = 0) => `${prefix}return (v.st_active??0)&&(v.st_ready??0)?(${field(i, key)}??${fallback}):${fallback};`;
    bones['st_strip' + i] = { position: AX.map(a => value('p' + a)), rotation: ['rx', 'ry', 'rz'].map(k => value(k)) };
    bones['st_strip' + i + '_scale'] = { scale: [value('sx'), value('sy'), 1] };
    bones['st_strip' + i + '_mesh'] = { rotation: [0, 0, value('iz')] };
  }
  return bones;
}


return {initialize,captureNodes,animatedBones,triangleFit,meshNodes,preAnimation};
}
