import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import JSZip from 'jszip';
import {Vector3,Quaternion,Euler} from 'three';
import {defaults,clone,validate,curveValue} from '../src/config.js';
import {importPacks,indexResources,descriptionOf} from '../src/resources.js';
import {generate,exportPack,unwrapResources,resourceKey} from '../src/export.js';
import {createRuntime} from '../src/core/runtime.js';
import {compileJs,MATH,strict,toMolang,checkMolang} from '../src/core/molanguage.js';
import {TrailHistory} from '../src/preview/history.js';
const files=new Map();async function walk(dir,prefix=''){for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.isDirectory())await walk(path.join(dir,e.name),prefix+e.name+'/');else files.set(prefix+e.name,new Uint8Array(await fs.readFile(path.join(dir,e.name))));}}
await walk('examples/source');const resources=indexResources(files),model=resources.geometries.get('geometry.sword_trail.sword'),config=defaults('minecraft:diamond_sword','default',model);
function simulation(c=clone(config)){
  const runtime=createRuntime(c,{a:'a',b:'b'}),init=compileJs(runtime.initialize()),capture=compileJs(runtime.captureNodes());
  const v=strict({}),s={time:0,dt:1/60,position:[0,0,0],yaw:0,pitch:0,a:[0,9,0],b:[0,20.5,0]},trs=p=>({t:{x:p[0],y:p[1],z:p[2]},r:{x:0,y:0,z:0},s:{x:1,y:1,z:1}});
  const q={life_time:()=>s.time,anim_time:()=>s.time,delta_time:()=>s.dt,is_riding:()=>0,body_y_rotation:()=>s.yaw,camera_rotation:i=>i?s.yaw:s.pitch,position:i=>s.position[i],bone_orientation_trs:n=>trs(n==='a'?s.a:n==='b'?s.b:[0,0,0])};
  init(v,q,MATH);v.st_active=1;v.st_emit=1;v.st_attack=.4;v.st_warm=.1;v.st_bone_clock=0;
  return {...s,v,q,runtime,state:s,step(dt=1/60){s.dt=dt;s.time+=dt;capture(v,q,MATH);},capture(){capture(v,q,MATH);}};
}
test('configuration validates references, curves, expressions and budget',()=>{
  validate(config,model);for(const mutate of [c=>c.points.a.bone='missing',c=>c.width.keys=[[0,1],[0,0],[1,0]],c=>c.emitCondition='v.a=1;',c=>c.lifetime=2,c=>c.opacity.value=Infinity]){const c=clone(config);mutate(c);assert.throws(()=>validate(c,model));}
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
  const output=indexResources(generate(r,[config]).files),ribbon=output.geometries.get('geometry.'+resourceKey(config)+'.ribbon');assert.deepEqual(ribbon.bones[0].binding,root.binding);assert.deepEqual(ribbon.bones[1].pivot,root.pivot);assert.deepEqual(ribbon.bones[3].cubes[0].origin,[2.5,6.5,-2]);
});

test('constant opacity shares one renderer while varying opacity has independent segments',()=>{
  for(const variable of [false,true]){const c=clone(config);if(variable)c.opacity.keys=[[0,1],[1,0]];const out=indexResources(generate(resources,[c]).files),id=resourceKey(c);const rc=out.json.get('render_controllers/simple_trail/'+id+'.json').render_controllers;assert.equal(Object.keys(rc).length,variable?8:1);}
});

test('raw archives without a manifest cannot silently export an unimportable mcpack',()=>{
  const r=indexResources(new Map([...files].filter(([p])=>p!=='manifest.json')));assert.throws(()=>generate(r,[config]),/manifest.json/);
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

test('all exported trail materials resolve through the registered entity material file',()=>{
  const f=new Map(files),doc=clone(resources.attachables.get(config.attachable).value);doc['minecraft:attachable'].description.identifier='custom:staff';f.set('attachables/staff.json',new TextEncoder().encode(JSON.stringify(doc)));const r=indexResources(f);
  const result=generate(r,[config,{...clone(config),attachable:'custom:staff',blend:'alpha',unlit:false}]);
  assert.equal([...result.files.keys()].filter(p=>p.startsWith('materials/')&&p!=='materials/entity.material').length,0);
  const mat=JSON.parse(new TextDecoder().decode(result.files.get('materials/entity.material'))).materials,original=JSON.parse(new TextDecoder().decode(files.get('materials/entity.material'))).materials;
  for(const [k,v]of Object.entries(original))assert.deepEqual(mat[k],v);
  const byName=new Map(Object.entries(mat).map(([k,v])=>[k.split(':')[0],{parent:k.split(':')[1],value:v}]));
  for(const record of indexResources(result.files).attachables.values()){
    const d=descriptionOf(record),id=resourceKey({attachable:d.identifier,geometry:'default'});let name=d.materials[id],chain=[];
    while(!['entity','entity_emissive'].includes(name)){assert.ok(byName.has(name),`Missing material ${name}`);const m=byName.get(name);chain.push(m.value);name=m.parent;assert.ok(chain.length<10);}
    assert.equal(chain.length,3);assert.ok(chain[2]['+defines'].includes('USE_UV_ANIM'));assert.equal(chain[1]['+samplerStates'][0].textureWrap,'Repeat');assert.equal(chain[0]['+samplerStates'][0].textureFilter,'Bilinear');assert.equal(chain[1].blendSrc,'SourceAlpha');
  }
  assert.deepEqual(unwrapResources(indexResources(result.files)).files.get('materials/entity.material'),f.get('materials/entity.material'));
});

test('new material files are removed on unwrap and legacy nested-material exports can be upgraded',()=>{
  const f=new Map(files);f.delete('materials/entity.material');const result=generate(indexResources(f),[config]);assert.ok(result.files.has('materials/entity.material'));assert.equal(unwrapResources(indexResources(result.files)).files.has('materials/entity.material'),false);
  const legacy=generate(resources,[config]),meta=JSON.parse(new TextDecoder().decode(legacy.files.get('simple_trail/project.json'))),p='materials/simple_trail/'+resourceKey(config)+'.material';delete meta.materialBackup;meta.files.push(p);legacy.files.set(p,new TextEncoder().encode('{}'));legacy.files.set('materials/entity.material',files.get('materials/entity.material'));legacy.files.set('simple_trail/project.json',new TextEncoder().encode(JSON.stringify(meta)));
  const upgraded=generate(unwrapResources(indexResources(legacy.files)),[config]);assert.equal(upgraded.files.has(p),false);assert.ok(new TextDecoder().decode(upgraded.files.get('materials/entity.material')).includes(resourceKey(config)+'_ribbon'));
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
  const s=simulation();s.step();s.step(.025);s.v.st_emit=0;s.state.position[0]=.25;s.step(.025);assert.ok(Math.abs(s.v.st_h0_ax+.25*16/config.worldScale)<1e-5);
});
test('first-person reference modes respond differently to owner motion',()=>{
  for(const mode of ['view_model','world']){const c=clone(config);c.firstPersonSpace=mode;const s=simulation(c);s.v.st_fp=1;s.step();s.step(.025);s.v.st_emit=0;s.state.position[0]=.25;s.step(.025);assert.ok(Math.abs(s.v.st_h0_ax-(mode==='world'?-.25*16/config.worldScale:0))<1e-5);}
});
test('first-person world compensation includes camera pitch',()=>{
  const c=clone(config);c.firstPersonSpace='world';const s=simulation(c);s.v.st_fp=1;s.step();s.step(.025);s.v.st_emit=0;s.state.pitch=45;s.step(.025);
  assert.ok(Math.abs(s.v.st_h0_ay-9/Math.sqrt(2))<1e-6);assert.ok(Math.abs(s.v.st_h0_az-9/Math.sqrt(2))<1e-6);
});
test('triangle fit maps all three vertices to targets, including tilted/skewed planes',()=>{
  const runtime=createRuntime(config,{a:'a',b:'b'}),run=compileJs(runtime.triangleFit(0));
  for(const [p,q,r]of [[[1,4,3],[-2,1,2],[3,2,-1]],[[0,1,0],[-1,0,0],[1,0,0]],[[3,6,5],[3,2,1],[3,2,9]]]){
    const v=strict({}),values={};for(const [name,arr]of [['p',p],['q',q],['r',r]])for(const [i,a]of ['x','y','z'].entries())values[name+a]=arr[i];
    // triangleFit receives temporary input from the surrounding mesh expression.
    const nodes=Object.entries(values).map(([name,value])=>({kind:'set',name:'t.'+name,expr:String(value)}));compileJs([...nodes,...runtime.triangleFit(0)])(v,{},MATH);
    const D=Math.PI/180,outer=new Quaternion().setFromEuler(new Euler(-v.st_mesh0_rx*D,v.st_mesh0_ry*D,-v.st_mesh0_rz*D,'ZYX')),inner=new Quaternion().setFromAxisAngle(new Vector3(0,0,1),-v.st_mesh0_iz*D);
    for(const [i,vertex]of [[0,.5,0],[-.5,-.5,0],[.5,-.5,0]].entries()){const actual=new Vector3(...vertex).applyQuaternion(inner).multiply(new Vector3(v.st_mesh0_sx,v.st_mesh0_sy,1)).applyQuaternion(outer).add(new Vector3(v.st_mesh0_px,v.st_mesh0_py,v.st_mesh0_pz));assert.ok(actual.distanceTo(new Vector3(...[p,q,r][i]))<1e-5);}
  }
});
test('preview uses the same width and opacity settings and retains raw endpoints',()=>{
  const c=clone(config);c.opacity.keys=[[0,1],[1,0]];const h=new TrailHistory(c);h.update(0,[0,0,0],[0,10,0]);h.update(.025,[2,0,0],[2,10,0]);const raw=clone(h.samples);h.update(.05,[2,0,0],[2,10,0],false);assert.deepEqual(h.samples,raw);assert.ok(h.segments()[0].alpha<c.opacity.value);h.update(.14,[2,0,0],[2,10,0],false);h.update(.02,[2,0,0],[2,10,0],false);assert.equal(h.segments().length,0);
});
