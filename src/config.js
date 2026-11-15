import { parseExpression } from './core/parse.mjs';
import { fail } from './i18n.js';
export const clone = value => JSON.parse(JSON.stringify(value));
export const MAX_SEGMENTS = 32;
export const DISCONTINUITY_DISTANCE = 2;
export const DEFAULT_CONDITION = "c.item_slot=='main_hand'&&v.trail_attack>0.015&&v.trail_attack<0.88";
// Presets offered in the Trigger menu. Anything else is a custom Molang condition.
export const TRIGGERS = {attack: DEFAULT_CONDITION, held: "c.item_slot=='main_hand'"};
export const presetOf = condition => Object.entries(TRIGGERS).find(([, value]) => value === condition)?.[0] ?? 'custom';
// Rounding keeps 0.8 / 0.025 at exactly 32 instead of 32.000000000000004 -> 33.
export const segmentCount = config => Math.ceil(Math.round(config.lifetime / config.sampleInterval * 1e6) / 1e6);
// Smallest sample interval that keeps a lifetime within the segment budget.
export const fitInterval = (lifetime, interval) => Math.max(interval, Math.ceil(Math.round(lifetime / MAX_SEGMENTS * 1e6) / 1e3) / 1e3);
// Curves written by early versions had a power exponent. New curves are plain
// piecewise-linear keys, so the editor draws exactly what is exported.
const exponentOf = curve => curve.exponent ?? 1;
export const curveValue = (curve, u) => {
  u=Math.max(0,Math.min(1,u)); const keys=curve.keys;
  let i=1; while(i<keys.length-1&&u>keys[i][0])i++;
  const [a,b]=[keys[i-1],keys[i]], v=a[1]+(b[1]-a[1])*(u-a[0])/(b[0]-a[0]);
  return Math.pow(Math.max(0,v),exponentOf(curve));
};
export function curveMolang(curve,u){
  const keys=curve.keys; let out=String(keys.at(-1)[1]);
  for(let i=keys.length-2;i>=0;i--){const a=keys[i],b=keys[i+1];out=`${u}<${b[0]}?math.lerp(${a[1]},${b[1]},(${u}-${a[0]})/${b[0]-a[0]}):(${out})`;}
  return exponentOf(curve)===1?`math.max(0,(${out}))`:`math.pow(math.max(0,(${out})),${exponentOf(curve)})`;
}
// Preserve legacy width curves and discard retired appearance settings.
export function normalize(config){
  const c=clone(config);
  const curve=c.width;
  if(curve&&curve.exponent!==undefined){
    if(curve.exponent!==1&&Array.isArray(curve.keys)&&curve.keys.length>1)curve.keys=Array.from({length:11},(_,i)=>[i/10,Number(curveValue(curve,i/10).toFixed(4))]);
    delete curve.exponent;
  }
  c.teleportTrail??=c.teleportDistance===0;
  for(const key of ['color','opacity','blend','unlit','texture','root','worldScale','teleportDistance'])delete c[key];
  return c;
}
export function defaults(attachable,geometry,model){
  const roots=model.bones.filter(b=>!b.parent);
  const bone=model.bones.find(b=>b.name==='sword')??model.bones.find(b=>b.cubes?.length||b.texture_meshes?.length)??roots[0];
  const a=model.bones.find(b=>b.name==='st_blade_base'),b=model.bones.find(b=>b.name==='st_blade_tip');
  return {format_version:1,attachable,geometry,
    points:{a:{bone:a?.parent??bone.name,position:clone(a?.pivot??bone.pivot??[0,0,0])},b:{bone:b?.parent??bone.name,position:clone(b?.pivot??[...(bone.pivot??[0,0,0])].map((v,i)=>v+(i===1?10:0))) }},
    emitCondition:DEFAULT_CONDITION,lifetime:.2,sampleInterval:.025,
    width:{keys:[[0,1],[.25,.5625],[.5,.25],[.75,.0625],[1,0]],anchor:.5},
    firstPersonSpace:'view_model',teleportTrail:false};
}
// Both points are queried in actor space. Use A's top-level ancestor as the
// ribbon frame, irrespective of the order of unrelated roots in the file.
export function referenceRoot(config,model){
  const map=new Map(model.bones.map(b=>[b.name,b]));let bone=map.get(config.points.a.bone);
  while(bone.parent)bone=map.get(bone.parent);
  return bone.name;
}
export function validate(config,model){
  const c=normalize(config);
  if(c.format_version!==1)fail('config_version');
  for(const k of ['attachable','geometry'])if(typeof c[k]!=='string'||!c[k])fail('config_field',[k]);
  const names=new Set(model.bones.map(b=>b.name));
  for(const name of names)if(typeof name!=='string'||!name||/[\x00-\x1f'\\]/.test(name))fail('bone_name');
  if(names.size!==model.bones.length)fail('duplicate_bone');
  const map=new Map(model.bones.map(b=>[b.name,b]));
  for(const b of model.bones){const seen=new Set();let n=b;while(n){if(seen.has(n.name))fail('bone_cycle');seen.add(n.name);if(n.parent&&!map.has(n.parent))fail('bone_parent',[n.parent]);n=map.get(n.parent);}}
  for(const end of ['a','b']){const p=c.points?.[end];if(!p||!names.has(p.bone))fail('endpoint_bone',[p?.bone??end]);if(!Array.isArray(p.position)||p.position.length!==3||p.position.some(v=>!Number.isFinite(v)))fail('endpoint_position');}
  const range=(v,a,b,key)=>{if(!Number.isFinite(v)||v<a||v>b)fail('range',[key,a,b]);};
  range(c.lifetime,.025,2,'lifetime');range(c.sampleInterval,.008,.1,'sampleInterval');
  if(segmentCount(c)>MAX_SEGMENTS)fail('segments',[MAX_SEGMENTS]);
  range(c.width?.anchor,0,1,'anchor');
  if(typeof c.teleportTrail!=='boolean')fail('teleport');
  const width=c.width;
  if(!width||!Array.isArray(width.keys)||width.keys.length<2||width.keys.length>12)fail('curve_keys',['width']);
  let last=-1;
  for(const p of width.keys){if(!Array.isArray(p)||p.length!==2)fail('curve_key',['width']);range(p[0],0,1,'width time');range(p[1],0,4,'width value');if(p[0]<=last)fail('curve_order',['width']);last=p[0];}
  if(width.keys[0][0]!==0||width.keys.at(-1)[0]!==1)fail('curve_ends',['width']);
  if(!['view_model','world'].includes(c.firstPersonSpace))fail('render');
  if(typeof c.emitCondition!=='string'||!c.emitCondition.trim()||c.emitCondition.length>2000)fail('condition');
  parseExpression(c.emitCondition);
  return c;
}
