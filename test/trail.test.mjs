import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import JSZip from 'jszip';
import {inflateSync} from 'node:zlib';
import {Vector3,Quaternion,Euler} from 'three';
import {trailGradient} from '../src/assets.js';
import {defaults,clone,validate,curveValue,normalize,segmentCount,presetOf,TRIGGERS,MAX_SEGMENTS,fitInterval,referenceRoot} from '../src/config.js';
import {importPacks,indexResources,descriptionOf} from '../src/resources.js';
import {generate,exportPack,unwrapResources,resourceKey} from '../src/export.js';
import {createRuntime} from '../src/core/runtime.js';
import {modelSpaceSetup} from '../src/core/space.js';
import {compileJs,MATH,strict,toMolang,checkMolang} from '../src/core/molanguage.js';
import {TrailHistory} from '../src/preview/history.js';
const files=new Map();async function walk(dir,prefix=''){for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.isDirectory())await walk(path.join(dir,e.name),prefix+e.name+'/');else files.set(prefix+e.name,new Uint8Array(await fs.readFile(path.join(dir,e.name))));}}
await walk('test/fixtures/sword');const resources=indexResources(files),model=resources.geometries.get('geometry.sword_trail.sword'),config=defaults('minecraft:diamond_sword','default',model);
function simulation(c=clone(config)){
  const runtime=createRuntime(c,{a:'a',b:'b',root:referenceRoot(c,model)}),init=compileJs(runtime.initialize()),capture=compileJs(runtime.captureNodes());
  const v=strict({}),s={time:0,dt:1/60,position:[0,0,0],yaw:0,pitch:0,a:[0,9,0],b:[0,20.5,0]},trs=p=>({t:{x:p[0],y:p[1],z:p[2]},r:{x:0,y:0,z:0},s:{x:1,y:1,z:1}});
  const q={life_time:()=>s.time,anim_time:()=>s.time,delta_time:()=>s.dt,is_riding:()=>0,body_y_rotation:()=>s.yaw,camera_rotation:i=>i?s.yaw:s.pitch,position:i=>s.position[i],bone_orientation_trs:n=>trs(n==='a'?s.a:n==='b'?s.b:[0,0,0])};
  init(v,q,MATH);v.st_active=1;v.st_emit=1;v.st_attack=.4;v.st_warm=.1;v.st_bone_clock=0;
  return {...s,v,q,runtime,state:s,step(dt=1/60){s.dt=dt;s.time+=dt;capture(v,q,MATH);},capture(){capture(v,q,MATH);}};
}
test('configuration validates references, curves, expressions and budget',()=>{
  validate(config,model);for(const mutate of [c=>c.points.a.bone='missing',c=>c.width.keys=[[0,1],[0,0],[1,0]],c=>c.emitCondition='v.a=1;',c=>c.lifetime=2,c=>c.lifetime=Infinity]){const c=clone(config);mutate(c);assert.throws(()=>validate(c,model));}
  assert.equal(curveValue(config.width,.5),.25);
  const unsafe=clone(model);unsafe.bones[1].name="bad'name";assert.throws(()=>validate(config,unsafe),/Bone names/);
});

test('edited models survive reimport without modifying shared source geometry bytes',()=>{
  const r=indexResources(new Map(files)),edited=clone(model);edited.bones[1].pivot=[1,2,3];r.geometries.set(model.description.identifier,edited);
  const result=generate(r,[config]),clean=unwrapResources(indexResources(result.files));
  assert.deepEqual(clean.geometries.get(model.description.identifier),edited);
  assert.deepEqual(result.files.get('models/entity/sword.geo.json'),files.get('models/entity/sword.geo.json'));
  const again=indexResources(generate(clean,[config]).files);assert.deepEqual(again.geometries.get('geometry.'+resourceKey(config)+'.source').bones[1].pivot,[1,2,3]);
});

test('nonzero and bound roots keep the ribbon in the source reference frame',()=>{
  const r=indexResources(new Map(files)),edited=clone(model),root=edited.bones[0];root.pivot=[3,7,-2];root.binding='q.item_slot_to_bone_name(c.item_slot)';r.geometries.set(model.description.identifier,edited);
  root.poly_mesh={positions:[[3,7,-2]],polys:[]};
  const output=indexResources(generate(r,[config]).files),ribbon=output.geometries.get('geometry.'+resourceKey(config)+'.ribbon');assert.deepEqual(ribbon.bones[0].binding,root.binding);assert.deepEqual(ribbon.bones[1].pivot,root.pivot);assert.deepEqual(ribbon.bones[3].poly_mesh.positions,[[3,7.5,-2],[2.5,6.5,-2],[3.5,6.5,-2]]);assert.equal(ribbon.bones[0].poly_mesh,undefined);
});

test('export preserves source bone names that resemble generated names',()=>{
  for(const rootName of ['st_strip_grip','st_strip0','v.st_root']){
    const r=indexResources(new Map(files)),edited=clone(model),oldRoot=referenceRoot(config,model);
    for(const bone of edited.bones){if(bone.name===oldRoot)bone.name=rootName;if(bone.parent===oldRoot)bone.parent=rootName;}
    r.geometries.set(model.description.identifier,edited);
    const c=clone(config);
    for(const point of Object.values(c.points))if(point.bone===oldRoot)point.bone=rootName;
    const out=indexResources(generate(r,[c]).files),id=resourceKey(c);
    const source=out.geometries.get('geometry.'+id+'.source'),ribbon=out.geometries.get('geometry.'+id+'.ribbon');
    assert.ok(source.bones.some(b=>b.name===rootName));assert.equal(ribbon.bones[0].name,rootName);
    const capture=out.json.get('animation_controllers/simple_trail/'+id+'.json').animation_controllers['controller.animation.'+id+'.capture'].states.a.on_exit.join('');
    const queriedBones=[...capture.matchAll(/q\.bone_orientation_trs\('([^']+)'\)/g)].map(m=>m[1]);
    assert.ok(queriedBones.includes(rootName));
    for(const name of queriedBones)assert.ok(source.bones.some(b=>b.name===name),`Missing queried bone: ${name}`);
    const display=out.json.get('animations/simple_trail/'+id+'.json').animations['animation.'+id+'.display'];
    for(const name of Object.keys(display.bones)){assert.ok(name.startsWith(id+'_strip'));assert.ok(ribbon.bones.some(b=>b.name===name),`Missing animated bone: ${name}`);}
  }
});

test('export ignores retired appearance settings and batches history into one of two renderers',()=>{
  const legacy={...clone(config),color:'#ff0000',opacity:{keys:[[0,1],[1,0]]},blend:'alpha',unlit:false};
  const baseline=generate(resources,[config]),result=generate(resources,[legacy]),out=indexResources(result.files),id=resourceKey(config);
  const rc=out.json.get('render_controllers/simple_trail/'+id+'.json').render_controllers;
  assert.equal(Object.keys(rc).length,2);
  assert.equal(Object.values(rc)[0].part_visibility.length,3);
  assert.equal(Object.values(rc)[1].part_visibility.length,1+(segmentCount(config)-1)*2);
  for(const p of result.generated){assert.deepEqual(result.files.get(p),baseline.files.get(p),p);if(p.endsWith('.json'))assert.doesNotMatch(new TextDecoder().decode(result.files.get(p)),/"(?:color|opacity|ignore_lighting|blendSrc|blendDst|unlit)"/);}
  assert.deepEqual(out.json.get('simple_trail/project.json').configs,[config]);
  assert.deepEqual(result.files.get('simple_trail/project.json'),baseline.files.get('simple_trail/project.json'));
  assert.deepEqual(legacy.opacity.keys,[[0,1],[1,0]],'normalization must not mutate the input');
});

test('gradient has no triangle cutouts and fades once along the whole trail',()=>{
  const png=Buffer.from(trailGradient),chunks={};
  for(let p=8;p<png.length;){const length=png.readUInt32BE(p),type=png.toString('ascii',p+4,p+8);(chunks[type]??=[]).push(png.subarray(p+8,p+8+length));p+=length+12;}
  const header=chunks.IHDR[0],width=header.readUInt32BE(0),height=header.readUInt32BE(4),channels=header[9]===6?4:1;
  assert.equal(header[8],8);assert.ok([3,6].includes(header[9]));
  const raw=inflateSync(Buffer.concat(chunks.IDAT)),stride=width*channels,pixels=[];
  const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};
  let previous=new Uint8Array(stride);
  for(let y=0;y<height;y++){
    const row=new Uint8Array(stride),offset=y*(stride+1),filter=raw[offset];
    for(let x=0;x<stride;x++){const a=x>=channels?row[x-channels]:0,b=previous[x],c=x>=channels?previous[x-channels]:0;row[x]=(raw[offset+x+1]+[0,a,b,Math.floor((a+b)/2),paeth(a,b,c)][filter])&255;}
    pixels.push(Array.from({length:width},(_,x)=>channels===4?row[x*4+3]:(chunks.tRNS?.[0][row[x]]??255)));previous=row;
  }
  const middle=Math.floor(width/2);assert.ok(pixels[0][middle]>100&&pixels[0][middle]<255);
  for(let y=1;y<height;y++)assert.ok(pixels[y][middle]<=pixels[y-1][middle]);
  for(let y=0;y<height*.6;y++)for(let x=Math.ceil(width*.1);x<width*.9;x++)assert.equal(pixels[y][x],pixels[0][middle]);
  assert.equal(pixels.at(-1)[middle],0);assert.equal(pixels[0][0],0);assert.equal(pixels[0].at(-1),0);
  const output=generate(resources,[config]);assert.deepEqual(output.files.get('textures/simple_trail/'+resourceKey(config)+'.png'),trailGradient);
});

test('exported UV animation agrees with sample ages across both renderers and every shared edge',()=>{
  const out=indexResources(generate(resources,[config]).files),id=resourceKey(config),ribbon=out.geometries.get('geometry.'+id+'.ribbon');
  const rc=Object.values(out.json.get('render_controllers/simple_trail/'+id+'.json').render_controllers),s=simulation();
  const evaluate=expr=>{const v=strict(Object.fromEntries(Object.entries(s.v).map(([k,x])=>[k.replace(/^st_/,id+'_'),x])));compileJs([{kind:'set',name:'v.result',expr:String(expr)}])(v,{},MATH);return v.result;};
  let checked=0;
  for(const [dt,emit] of [[.016,1],[.016,1],[.047,1],[.001,1],[.083,1],[.016,0],[.033,0],[.016,1]]){
    s.v.st_emit=emit;s.step(dt);
    const strips=[];
    for(let seg=0;seg<segmentCount(config);seg++){
      const newer=s.v['st_'+(seg===0?'live':'h'+(seg-1))+'_age']/config.lifetime,older=s.v['st_h'+seg+'_age']/config.lifetime;
      if(newer>=1||older>=1)continue;
      const render=rc[seg===0?0:1],offset=evaluate(render.uv_anim.offset[1]),scale=evaluate(render.uv_anim.scale[1]);
      const uv=[0,1].map(j=>ribbon.bones.find(b=>b.name===id+'_strip'+(2*seg+j)+'_mesh').poly_mesh.uvs.map(([u,v])=>[u,offset+(1-v)*scale]));
      const expected=[[[0,newer],[1,newer],[0,older]],[[1,newer],[1,older],[0,older]]];
      for(let j=0;j<2;j++)for(let k=0;k<3;k++)for(let axis=0;axis<2;axis++)assert.ok(Math.abs(uv[j][k][axis]-expected[j][k][axis])<1e-7);
      assert.deepEqual(uv[0][1],uv[1][0]);assert.deepEqual(uv[0][2],uv[1][2]);
      strips.push(uv);checked++;
    }
    for(let i=1;i<strips.length;i++)for(const [a,b] of [[strips[i-1][0][2],strips[i][0][0]],[strips[i-1][1][1],strips[i][0][1]]])assert.ok(Math.hypot(a[0]-b[0],a[1]-b[1])<1e-7);
  }
  assert.ok(checked>15);
});

test('archives without a manifest export and reimport without adding a manifest',async()=>{
  const r=indexResources(new Map([...files].filter(([p])=>p!=='manifest.json')));
  const bytes=await exportPack(r,[config]),zip=await JSZip.loadAsync(bytes);
  assert.equal(zip.file('manifest.json'),null);
  assert.ok(zip.file('attachables/diamond_sword.json'));
  assert.ok(zip.file('animations/simple_trail/'+resourceKey(config)+'.json'));
  const [pack]=await importPacks(bytes),clean=unwrapResources(pack.resources);
  assert.deepEqual(clean.savedConfigs,[config]);
  assert.deepEqual(descriptionOf(clean.attachables.get(config.attachable)),descriptionOf(r.attachables.get(config.attachable)));
  assert.equal(clean.files.has('manifest.json'),false);
});

test('export validates user emission expressions as well as generated sampling code',()=>{
  assert.throws(()=>generate(resources,[{...clone(config),emitCondition:'math.sin(1,2)'}]),/takes 1 arguments/);
  assert.throws(()=>generate(resources,[{...clone(config),emitCondition:'v.a+v.b??0'}]),/direct variable/);
});
test('export preserves originals, isolates geometry and reimports without accumulating trails',async()=>{
  const before=JSON.stringify([...resources.json]),result=generate(resources,[config]);
  assert.equal(JSON.stringify([...resources.json]),before);
  for(const [p,b]of files)if(!p.startsWith('attachables/')&&p!=='materials/entity.material')assert.deepEqual(result.files.get(p),b,p);
  const d=indexResources(result.files).attachables.get(config.attachable);assert.equal(descriptionOf(d).scripts.animate[0].st_hold_first,'c.is_first_person');assert.notEqual(descriptionOf(d).geometry.default,'geometry.sword_trail.sword');
  const [pack]=await importPacks(await exportPack(resources,[config]));const clean=unwrapResources(pack.resources);
  assert.deepEqual(clean.savedConfigs,[config]);assert.deepEqual(descriptionOf(clean.attachables.get(config.attachable)),descriptionOf(resources.attachables.get(config.attachable)));
  assert.deepEqual(clean.files.get('materials/entity.material'),files.get('materials/entity.material'));
  const second=generate(clean,[config]);assert.deepEqual([...second.files.keys()].sort(),[...result.files.keys()].sort());
});

test('export registers alpha blending in entity.material while preserving original definitions',()=>{
  const f=new Map(files),doc=clone(resources.attachables.get(config.attachable).value);doc['minecraft:attachable'].description.identifier='custom:staff';f.set('attachables/staff.json',new TextEncoder().encode(JSON.stringify(doc)));const r=indexResources(f);
  const sourceRenderer=clone(resources.json.get('render_controllers/sword.render.json'));Object.assign(Object.values(sourceRenderer.render_controllers)[0],{color:{r:1,g:.5,b:.2,a:.7},ignore_lighting:true});
  f.set('render_controllers/sword.render.json',new TextEncoder().encode(JSON.stringify(sourceRenderer)));
  const result=generate(indexResources(f),[config,{...clone(config),attachable:'custom:staff'}]);
  assert.equal(result.generated.some(p=>p.startsWith('materials/')),false);
  const exportedMaterials=JSON.parse(new TextDecoder().decode(result.files.get('materials/entity.material'))).materials;
  for(const [name,value] of Object.entries(JSON.parse(new TextDecoder().decode(f.get('materials/entity.material'))).materials))assert.deepEqual(exportedMaterials[name],value);
  assert.deepEqual(result.files.get('render_controllers/sword.render.json'),f.get('render_controllers/sword.render.json'));
  for(const record of indexResources(result.files).attachables.values()){
    const d=descriptionOf(record),id=resourceKey({attachable:d.identifier,geometry:'default'});
    assert.equal(d.materials[id],id+'_ribbon');
    const m=exportedMaterials[d.materials[id]+':entity_emissive'];assert.equal(m.blendSrc,'SourceAlpha');assert.equal(m.blendDst,'OneMinusSrcAlpha');assert.ok(m['+defines'].includes('USE_UV_ANIM'));assert.ok(m['+states'].includes('DisableDepthWrite'));
    for(const [alias,material] of Object.entries(descriptionOf(r.attachables.get(d.identifier)).materials))assert.equal(d.materials[alias],material);
  }
  assert.deepEqual(unwrapResources(indexResources(result.files)).files.get('materials/entity.material'),f.get('materials/entity.material'));
});

test('material merging is reversible and upgrades legacy material backups and configs',()=>{
  const f=new Map(files);f.delete('materials/entity.material');const result=generate(indexResources(f),[config]);assert.equal(result.files.has('materials/entity.material'),true);assert.equal(unwrapResources(indexResources(result.files)).files.has('materials/entity.material'),false);
  for(const backup of [undefined,null,Buffer.from(files.get('materials/entity.material')).toString('base64')]){
    const legacy=generate(resources,[config]),meta=JSON.parse(new TextDecoder().decode(legacy.files.get('simple_trail/project.json'))),p='materials/simple_trail/'+resourceKey(config)+'.material';
    meta.files.push(p);meta.configs[0].color='#123456';meta.configs[0].opacity={keys:[[0,1],[1,0]]};
    if(backup!==undefined){meta.materialBackup=backup;legacy.files.set('materials/entity.material',new TextEncoder().encode('{"materials":{"version":"1.0.0","old_trail:entity":{}}}'));}
    else{delete meta.materialBackup;legacy.files.set('materials/entity.material',files.get('materials/entity.material'));}
    legacy.files.set(p,new TextEncoder().encode('{}'));legacy.files.set('simple_trail/project.json',new TextEncoder().encode(JSON.stringify(meta)));
    const clean=unwrapResources(indexResources(legacy.files));assert.deepEqual(clean.savedConfigs,[config]);
    const upgraded=generate(clean,clean.savedConfigs);assert.equal(upgraded.files.has(p),false);
    const restored=unwrapResources(indexResources(upgraded.files));
    if(backup===null)assert.equal(restored.files.has('materials/entity.material'),false);
    else assert.deepEqual(restored.files.get('materials/entity.material'),files.get('materials/entity.material'));
    assert.equal(Object.hasOwn(indexResources(upgraded.files).json.get('simple_trail/project.json'),'materialBackup'),true);
  }
});
test('different attachables sharing a model have independent resources and preserve pack bytes',()=>{
  const f=new Map(files),doc=clone(resources.attachables.get(config.attachable).value);doc['minecraft:attachable'].description.identifier='custom:staff';f.set('attachables/staff.json',new TextEncoder().encode(JSON.stringify(doc)));f.set('opaque.bin',new Uint8Array([1,2,3]));const r=indexResources(f),other={...clone(config),attachable:'custom:staff'},out=generate(r,[config,other]);
  assert.notEqual(resourceKey(config),resourceKey(other));assert.deepEqual(out.files.get('opaque.bin'),f.get('opaque.bin'));assert.deepEqual(out.files.get('models/entity/sword.geo.json'),files.get('models/entity/sword.geo.json'));
});
test('mcaddon import finds resource packs and rejects path traversal',async()=>{
  const inner=await exportPack(resources,[config]),zip=new JSZip();zip.file('rp.mcpack',inner);zip.file('bp/manifest.json',JSON.stringify({modules:[{type:'data'}]}));assert.equal((await importPacks(await zip.generateAsync({type:'uint8array'}))).length,1);
  const evil=new JSZip();evil.file('../bad.json','{}');await assert.rejects(()=>importPacks(evil.generateAsync({type:'uint8array'})),/path/);
});
test('runtime samples once, expires, restarts and clears after teleport',()=>{
  const s=simulation();s.step();s.state.a=[2,9,0];s.state.b=[2,20.5,0];s.step(.025);assert.ok(Math.abs(s.v.st_h0_ax-2)<1e-8);const frame=s.v.st_frame;s.capture();assert.equal(s.v.st_frame,frame);
  s.v.st_emit=0;for(let i=0;i<20;i++)s.step();assert.equal(s.v.st_ready,0);
  s.v.st_emit=1;s.step();assert.equal(s.v.st_live_age,0);s.state.position[0]=10;s.step();assert.equal(s.v.st_h1_age,config.lifetime+1);
});
test('third-person history stays at its world position when the owner moves',()=>{
  const s=simulation();s.step();s.step(.025);s.v.st_emit=0;s.state.position[0]=.25;s.step(.025);assert.ok(Math.abs(s.v.st_h0_ax+.25*16/.9375)<1e-5);
});

test('teleport switch bridges jumps only when enabled and does not cap total trail length',()=>{
  for(const teleportTrail of [false,true]){
    const s=simulation({...clone(config),teleportTrail});s.step();s.step(.025);
    s.state.position[0]=10;s.step(.025);
    if(teleportTrail){assert.ok(s.v.st_h1_age<config.lifetime);assert.ok(s.v.st_h1_ax<-100);}
    else {assert.equal(s.v.st_h1_age,config.lifetime+1);assert.equal(s.v.st_h0_ax,0);}
  }
  // Moving more than two blocks in total is fine; only each consecutive jump matters.
  const s=simulation();s.step();s.step(.025);
  for(let i=0;i<4;i++){s.state.position[0]+=1;s.step(.025);}
  assert.ok(s.v.st_h4_age<config.lifetime);assert.ok(s.v.st_h4_ax<-2*16/.9375);
  for(const distance of [2,2.001]){const x=simulation();x.step();x.step(.025);x.state.position[0]=distance;x.step(.025);assert.equal(x.v.st_h1_age>config.lifetime,distance>2);}
});

test('old distance options migrate with positive switch polarity and retired fields are dropped',()=>{
  for(const distance of [undefined,0,2,8]){
    const c=clone(config);delete c.teleportTrail;Object.assign(c,{teleportDistance:distance,root:'obsolete',worldScale:7,texture:'missing.png'});
    const normalized=validate(c,model);assert.equal(normalized.teleportTrail,distance===0);
    for(const key of ['root','worldScale','texture','teleportDistance'])assert.equal(Object.hasOwn(normalized,key),false);
    const output=indexResources(generate(resources,[c]).files);assert.deepEqual(output.json.get('simple_trail/project.json').configs,[normalized]);
  }
  assert.equal(normalize({...clone(config),teleportTrail:false,teleportDistance:0}).teleportTrail,false);
  assert.throws(()=>validate({...clone(config),teleportTrail:2},model),/Teleport Trail/);
});

test('automatic reference root follows the endpoint ancestry instead of unrelated file order',()=>{
  const edited=clone(model);edited.bones.unshift({name:'unrelated',pivot:[99,99,99]});
  const r=indexResources(new Map(files));r.geometries.set(model.description.identifier,edited);
  const out=indexResources(generate(r,[config]).files),ribbon=out.geometries.get('geometry.'+resourceKey(config)+'.ribbon');
  assert.equal(ribbon.bones[0].name,model.bones[0].name);assert.notEqual(ribbon.bones[0].name,'unrelated');
});

test('history stays fixed in world space when actor scale, position and yaw change together',()=>{
  const s=simulation(),originalUnits=.9375/16;s.state.a=[3,9,-2];s.state.b=[4,20,1];
  s.step();s.step(.025);s.v.st_emit=0;
  // Anisotropic client scale and actor scaling share the same conversion boundary.
  const units=[.5/16,2/16,1.5/16];for(let i=0;i<3;i++)s.v['st_units_'+'xyz'[i]]=units[i];
  s.state.position=[.25,.1,-.2];s.state.yaw=37;s.step(.025);
  for(const [end,p] of [['a',[3,9,-2]],['b',[4,20,1]]]){
    const [x,y,z]=[...'xyz'].map((axis,i)=>s.v['st_h0_'+end+axis]*units[i]);
    const world=[s.state.position[0]+MATH.cos(37)*x+MATH.sin(37)*z,s.state.position[1]+y,s.state.position[2]+MATH.sin(37)*x-MATH.cos(37)*z];
    const expected=[p[0]*originalUnits,p[1]*originalUnits,-p[2]*originalUnits];
    for(let i=0;i<3;i++)assert.ok(Math.abs(world[i]-expected[i])<1e-8);
  }
});

test('scale setup reads the imported owner expression in owner scope and preserves the definition',()=>{
  const player={format_version:'1.10.0','minecraft:client_entity':{description:{identifier:'minecraft:player',scripts:{scale:'return v.size * q.property(\'test:size\');',variables:{'variable.size':'public'}}}}};
  const input=new Map(files),playerBytes=new TextEncoder().encode(JSON.stringify(player));input.set('entity/player.json',playerBytes);
  const r=indexResources(input),attachable=clone(descriptionOf(r.attachables.get(config.attachable)));attachable.scripts.scale=[2,1,.5];
  const setup=modelSpaceSetup(r,attachable,'check');
  assert.match(setup,/c\.owning_entity->v\.size/);assert.match(setup,/c\.owning_entity->q\.property\('test:size'\)/);assert.match(setup,/c\.owning_entity->q\.model_scale/);
  // Execute the emitted scale statements with distinct owning-entity values.
  const run=new Function('v','q',`const t={},math=Math;${setup.replaceAll('c.owning_entity->v.size','v.owner_size').replaceAll('c.owning_entity->q.model_scale','q.model_scale()').replaceAll('c.owning_entity->q.property','q.property')}`);
  const v={owner_size:1.5};run(v,{model_scale:()=>.125,property:()=>2});
  assert.deepEqual([v.check_units_x,v.check_units_y,v.check_units_z],[.75,.375,.1875]);
  const result=generate(r,[config]);assert.deepEqual(result.files.get('entity/player.json'),playerBytes);
  const fallback=modelSpaceSetup(resources,descriptionOf(resources.attachables.get(config.attachable)),'check');assert.match(fallback,/0\.9375/);
});

test('preview teleport switch follows root displacement, not a fast-moving blade tip',()=>{
  for(const teleportTrail of [false,true]){
    const h=new TrailHistory({...clone(config),teleportTrail});
    h.update(.025,[0,0,0],[0,10,0],true,[0,0,0]);
    h.update(.025,[0,0,0],[80,10,0],true,[0,0,0]);assert.ok(h.samples.length>1);
    h.update(.025,[160,0,0],[160,10,0],true,[10,0,0]);
    assert.equal(h.samples.length===1,!teleportTrail);
    if(teleportTrail)assert.ok(h.samples.some(p=>p.a[0]===0));
  }
});
test('first-person reference modes respond differently to owner motion',()=>{
  for(const mode of ['view_model','world']){const c=clone(config);c.firstPersonSpace=mode;const s=simulation(c);s.v.st_fp=1;s.step();s.step(.025);s.v.st_emit=0;s.state.position[0]=.25;s.step(.025);assert.ok(Math.abs(s.v.st_h0_ax-(mode==='world'?-.25*16/.9375:0))<1e-5);}
});
test('first-person world compensation includes camera pitch',()=>{
  const c=clone(config);c.firstPersonSpace='world';const s=simulation(c);s.v.st_fp=1;s.step();s.step(.025);s.v.st_emit=0;s.state.pitch=45;s.step(.025);
  assert.ok(Math.abs(s.v.st_h0_ay-9/Math.sqrt(2))<1e-6);assert.ok(Math.abs(s.v.st_h0_az-9/Math.sqrt(2))<1e-6);
});
test('triangle fit maps exported mesh vertices to targets, including tilted/skewed planes',()=>{
  const runtime=createRuntime(config,{a:'a',b:'b',root:referenceRoot(config,model)}),ribbon=indexResources(generate(resources,[config]).files).geometries.get('geometry.'+resourceKey(config)+'.ribbon');
  const mesh=ribbon.bones.find(b=>b.poly_mesh),vertices=mesh.poly_mesh.positions.map(p=>p.map((x,i)=>x-mesh.pivot[i]));
  for(const [p,q,r]of [[[1,4,3],[-2,1,2],[3,2,-1]],[[0,1,0],[-1,0,0],[1,0,0]],[[3,6,5],[3,2,1],[3,2,9]]]){
    const v=strict({}),values={};for(const [name,arr]of [['p',p],['q',q],['r',r]])for(const [i,a]of ['x','y','z'].entries())values[name+a]=arr[i];
    // triangleFit receives temporary input from the surrounding mesh expression.
    const nodes=Object.entries(values).map(([name,value])=>({kind:'set',name:'t.'+name,expr:String(value)}));compileJs([...nodes,...runtime.triangleFit(0)])(v,{},MATH);
    const D=Math.PI/180,outer=new Quaternion().setFromEuler(new Euler(-v.st_mesh0_rx*D,v.st_mesh0_ry*D,-v.st_mesh0_rz*D,'ZYX')),inner=new Quaternion().setFromAxisAngle(new Vector3(0,0,1),-v.st_mesh0_iz*D);
    for(const [i,vertex]of vertices.entries()){const actual=new Vector3(...vertex).applyQuaternion(inner).multiply(new Vector3(v.st_mesh0_sx,v.st_mesh0_sy,1)).applyQuaternion(outer).add(new Vector3(v.st_mesh0_px,v.st_mesh0_py,v.st_mesh0_pz));assert.ok(actual.distanceTo(new Vector3(...[p,q,r][i]))<1e-5);}
  }
});
test('preview tapers by width without changing raw endpoints or applying opacity',()=>{
  const h=new TrailHistory(config);h.update(0,[0,0,0],[0,10,0]);h.update(.025,[2,0,0],[2,10,0]);const raw=clone(h.samples);h.update(.05,[2,0,0],[2,10,0],false);assert.deepEqual(h.samples,raw);
  const segment=h.segments()[0],[a,b]=segment.triangles[0];
  assert.ok(Math.abs(new Vector3(...a).distanceTo(new Vector3(...b))-10*curveValue(config.width,.25))<1e-8);assert.equal(Object.hasOwn(segment,'alpha'),false);
  h.update(.14,[2,0,0],[2,10,0],false);h.update(.02,[2,0,0],[2,10,0],false);assert.equal(h.segments().length,0);
});

test('legacy configurations keep width behavior but discard all appearance settings',()=>{
  const old={...clone(config),color:'#abcdef',blend:'additive',unlit:true};old.width={keys:[[0,1],[1,0]],exponent:2,anchor:.5};old.opacity={keys:[[0,1],[1,.5]],exponent:1,value:.4};
  const c=normalize(old);
  assert.equal(c.width.exponent,undefined);
  for(const key of ['color','opacity','blend','unlit'])assert.equal(Object.hasOwn(c,key),false);
  for(const u of [0,.25,.5,.9])assert.ok(Math.abs(curveValue(c.width,u)-curveValue(old.width,u))<3e-3);
  validate(old,model);
  assert.ok(Math.abs(curveValue(config.width,.5)-.25)<1e-9,'the default curve is the former quadratic taper');
});
test('segment count ignores floating point noise and the budget is enforced on it',()=>{
  assert.equal(segmentCount({lifetime:.8,sampleInterval:.025}),32);
  assert.equal(segmentCount({lifetime:.225,sampleInterval:.009}),25);
  validate({...clone(config),lifetime:.8,sampleInterval:.025},model);
  assert.throws(()=>validate({...clone(config),lifetime:.9,sampleInterval:.025},model),new RegExp('at most '+MAX_SEGMENTS));
});
test('trigger presets round-trip and unknown conditions are custom',()=>{
  for(const [name,condition] of Object.entries(TRIGGERS)){assert.equal(presetOf(condition),name);validate({...clone(config),emitCondition:condition},model);}
  assert.equal(presetOf('1'),'custom');
});
test('validation errors are readable sentences without code identifiers',()=>{
  const c=clone(config);c.points.a.bone='missing';assert.throws(()=>validate(c,model),/missing/);
  const d=clone(config);d.lifetime=3;assert.throws(()=>validate(d,model),/lifetime must be a number from/);
});
test('any lifetime fits the segment budget once the interval is raised to match',()=>{
  for(let ms=25;ms<=2000;ms+=25){const lifetime=ms/1000,sampleInterval=fitInterval(lifetime,.025);assert.ok(segmentCount({lifetime,sampleInterval})<=MAX_SEGMENTS,String(lifetime));validate({...clone(config),lifetime,sampleInterval},model);}
  assert.equal(fitInterval(.2,.025),.025);
});
