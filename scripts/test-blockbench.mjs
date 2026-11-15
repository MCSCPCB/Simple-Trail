import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import JSZip from 'jszip';
import {connect} from './cdp.mjs';
const files=new Map();
async function walk(dir,prefix=''){for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.isDirectory())await walk(path.join(dir,e.name),prefix+e.name+'/');else files.set(prefix+e.name,await fs.readFile(path.join(dir,e.name)));}}
await walk('test/fixtures/sword');
const packZip=new JSZip();for(const [p,b] of files)packZip.file(p,b);
const pack=await packZip.generateAsync({type:'base64'});
const c=await connect(),english=process.argv.includes('--english');
const until=expr=>c.evaluate(`(async()=>{const end=Date.now()+15000;while(!(${expr})){if(Date.now()>end)throw new Error('Timed out: '+${JSON.stringify(expr)});await new Promise(r=>setTimeout(r,30));}return true;})()`);
await fs.mkdir('test/output',{recursive:true});
try{
  assert.match(await c.evaluate(`Blockbench.argv.join(' ')`),/trail-bb-test-profile/);
  await c.evaluate(`(async()=>{for(const p of [...ModelProject.all]){p.saved=true;await p.close(true);}for(const p of [...Plugins.all].filter(p=>p.id==='simple_trail'))p.uninstall();Language.code=${english?"'en'":"'zh'"};newProject(Formats.bedrock);Project.name='Test anchor';Project.saved=true;})()`);
  await c.send('Emulation.setFocusEmulationEnabled',{enabled:true});await c.send('Runtime.discardConsoleEntries');c.events.length=0;
  await c.evaluate(`(async()=>{await new Plugin().loadFromFile({path:${JSON.stringify(path.resolve('dist/simple_trail.js'))}},false);window.st={get s(){return Interface.Panels.trail_structure.vue.s;},get v(){return Interface.Panels.trail_structure.vue;},get p(){return Interface.Panels.trail_properties.vue;},get config(){return Project.simple_trail.config;},get wrapper(){return Group.all.find(g=>!g.parent?.mesh).mesh.parent;}};})()`);
  const importPack=(name,data=pack)=>c.evaluate(`(()=>{const old=Blockbench.import;Blockbench.import=(o,cb)=>cb([{name:${JSON.stringify(name)},content:Uint8Array.from(atob(${JSON.stringify(data)}),x=>x.charCodeAt(0))}]);try{BarItems.trail_import_pack.trigger();}finally{Blockbench.import=old;}})()`);
  const exportDialog=(prepare='')=>c.evaluate(`(async()=>{const original=Blockbench.export;let bytes;Blockbench.export=o=>{bytes=o.content;};try{BarItems.trail_export_pack.trigger();const end=Date.now()+15000;while(Dialog.open?.id!=='trail_export'){if(Date.now()>end)throw Error('No export dialog');await new Promise(r=>setTimeout(r,30));}${prepare}Dialog.open.confirm();while(!bytes){if(Date.now()>end)throw Error('No exported pack');await new Promise(r=>setTimeout(r,30));}return await new Promise(resolve=>{const r=new FileReader();r.onload=()=>resolve(r.result.split(',')[1]);r.readAsDataURL(bytes);});}finally{Blockbench.export=original;}})()`);
  await importPack('Sword Trail.mcpack');await until(`st.s.packName==='Sword Trail.mcpack'&&!st.s.busy&&Dialog.open?.id==='trail_browser'`);
  assert.equal(await c.evaluate(`Dialog.open.content_vue.rows.length`),1);
  await c.evaluate(`Dialog.open.content_vue.open(st.s.rows[0])`);
  await until(`st.s.configured&&!st.s.busy&&st.s.linked`);
  assert.deepEqual(await c.evaluate(`[Modes.selected.id,st.config.attachable,st.s.error,TextureMesh.all.length]`),['trail','minecraft:diamond_sword','',1]);
  assert.deepEqual(await c.evaluate(`[Interface.Panels.trail_structure.node.offsetHeight>0,Interface.Panels.trail_properties.node.offsetHeight>0]`),[true,true]);
  // The structure panel carries no buttons once linked, and the whole attachable is selected first.
  assert.equal(await c.evaluate(`Interface.Panels.trail_structure.node.querySelectorAll('button').length`),0);assert.equal(await c.evaluate(`st.s.selected`),'root');
  assert.equal(await c.evaluate(`Interface.Panels.trail_properties.node.querySelectorAll('.st-advanced input[type=checkbox]').length`),1);
  assert.equal(await c.evaluate(`Interface.Panels.trail_properties.node.querySelectorAll('input[type=color]').length`),0);
  assert.equal(await c.evaluate(`Interface.Panels.trail_properties.node.querySelectorAll('.st-curve').length`),1);
  assert.deepEqual(await c.evaluate(`['color','opacity','blend','unlit','root','worldScale','teleportDistance','texture'].filter(k=>Object.hasOwn(st.config,k))`),[]);
  assert.equal(await c.evaluate(`Toolbars.tools.children.filter(x=>x.id==='trail_move_tool').length`),1);
  const original=await c.evaluate(`JSON.stringify(st.config)`);
  assert.equal(await c.evaluate(`Interface.Panels.trail_properties.node.querySelectorAll('.st-advanced label').length`),4);
  assert.equal(await c.evaluate(`st.config.teleportTrail`),false);
  await c.evaluate(`Interface.Panels.trail_properties.node.querySelector('.st-advanced input[type=checkbox]').click()`);
  assert.equal(await c.evaluate(`st.config.teleportTrail`),true);
  await c.evaluate(`Undo.undo()`);assert.equal(await c.evaluate(`JSON.stringify(st.config)`),original);
  for(const [value,anchor] of [['a_to_b',1],['b_to_a',0],['center',.5]]){await c.evaluate(`st.p.setShrinkDirection('${value}')`);assert.equal(await c.evaluate(`st.config.width.anchor`),anchor);}
  assert.equal(await c.evaluate(`JSON.stringify(st.config)`),original);
  const moveHandle=async selected=>c.evaluate(`(()=>{st.v.select('${selected}');BarItems.trail_move_tool.select();const g=scene.children.find(o=>o._gizmo);g.updateMatrixWorld(true);const m=g._gizmo.gizmo.translate.children.find(m=>m.name==='Y'&&m.isMesh&&m.visible);m.geometry.computeBoundingBox();const p=m.localToWorld(m.geometry.boundingBox.getCenter(new THREE.Vector3())).project(Preview.selected.camera),r=Preview.selected.canvas.getBoundingClientRect();return {x:r.left+(p.x+1)*r.width/2,y:r.top+(1-p.y)*r.height/2};})()`);
  const mouse=async(type,p,button='none')=>c.send('Input.dispatchMouseEvent',{type,...p,button,buttons:button==='left'?1:0,clickCount:1});
  let handle=await moveHandle('a');await mouse('mouseMoved',handle);await mouse('mousePressed',handle,'left');await mouse('mouseMoved',{x:handle.x,y:handle.y-40},'left');await mouse('mouseReleased',{x:handle.x,y:handle.y-40},'left');
  assert.ok(await c.evaluate(`st.config.points.a.position[1]>10`),'Dragging the endpoint handle changes its configuration');await c.evaluate(`Undo.undo()`);assert.equal(await c.evaluate(`JSON.stringify(st.config)`),original);
  handle=await moveHandle('root');await mouse('mouseMoved',handle);await mouse('mousePressed',handle,'left');await mouse('mouseMoved',{x:handle.x,y:handle.y-35},'left');
  assert.ok(await c.evaluate(`st.wrapper.position.length()>1`),'Dragging the whole attachable changes the preview transform');
  await c.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await mouse('mouseReleased',{x:handle.x,y:handle.y-35},'left');assert.ok(await c.evaluate(`st.wrapper.position.length()<.0001`));assert.equal(await c.evaluate(`JSON.stringify(st.config)`),original);
  handle=await c.evaluate(`(()=>{BarItems.trail_rotate_tool.select();const g=scene.children.find(o=>o._gizmo);g.updateMatrixWorld(true);const m=g._gizmo.gizmo.rotate.children.find(m=>m.name==='E'&&m.isLine),p=m.localToWorld(new THREE.Vector3().fromBufferAttribute(m.geometry.attributes.position,8)).project(Preview.selected.camera),r=Preview.selected.canvas.getBoundingClientRect();return {x:r.left+(p.x+1)*r.width/2,y:r.top+(1-p.y)*r.height/2};})()`);
  await mouse('mouseMoved',handle);await mouse('mousePressed',handle,'left');await mouse('mouseMoved',{x:handle.x+30,y:handle.y-20},'left');assert.ok(await c.evaluate(`st.wrapper.quaternion.angleTo(new THREE.Quaternion())>.05`),'Rotation handle rotates the whole attachable');
  await c.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await mouse('mouseReleased',{x:handle.x+30,y:handle.y-20},'left');assert.ok(await c.evaluate(`st.wrapper.quaternion.angleTo(new THREE.Quaternion())<.0001`));await c.evaluate(`void BarItems.trail_move_tool.select()`);
  await c.evaluate(`st.p.setLifetime(2)`);assert.deepEqual(await c.evaluate(`[st.config.lifetime,st.config.sampleInterval,st.s.error]`),[2,.063,'']);await c.evaluate(`Undo.undo()`);assert.equal(await c.evaluate(`JSON.stringify(st.config)`),original);
  await c.evaluate(`st.p.set('points.a.position',[1,9,0])`);assert.deepEqual(await c.evaluate(`st.config.points.a.position`),[1,9,0]);
  await c.evaluate(`Undo.undo()`);assert.deepEqual(await c.evaluate(`st.config.points.a.position`),[0,9,0]);
  await c.evaluate(`Undo.redo()`);assert.deepEqual(await c.evaluate(`st.config.points.a.position`),[1,9,0]);await c.evaluate(`Undo.undo()`);
  // Use the actual curve component's keyboard operation to edit a key.
  await c.evaluate(`(()=>{const editor=Interface.Panels.trail_properties.vue.$children.find(x=>x.$options.name!=='select-input'&&x.$options.props?.maximum);editor.key({key:'ArrowDown',preventDefault(){}},0);})()`);
  assert.ok(await c.evaluate(`st.config.width.keys[0][1]<1`));await c.evaluate(`Undo.undo()`);
  await c.evaluate(`st.v.select('root');st.v.run('swing')`);await new Promise(r=>setTimeout(r,250));await c.evaluate(`st.v.run('play')`);
  const meshes=await c.evaluate(`scene.children.flatMap(g=>g.children??[]).filter(m=>m.isMesh&&m.geometry?.attributes?.position?.array?.length===18&&m.visible).map(m=>Array.from(m.geometry.attributes.position.array))`);
  assert.ok(meshes.length>1&&meshes.some(v=>v.some(x=>Math.abs(x)>.01)),'A moving sword produces visible triangles');
  await until(`scene.children.flatMap(g=>g.children??[]).some(m=>m.geometry?.attributes?.position?.array?.length===18&&m.material.map?.image?.complete)`);
  await c.screenshot('test/output/preview-'+(english?'en':'zh')+'.png');await c.evaluate(`st.v.run('reset')`);
  // Model metadata and texture meshes survive export and project persistence.
  const exported=await exportDialog();
  const bytes=Buffer.from(exported,'base64'),zip=await JSZip.loadAsync(bytes);assert.ok(zip.file('simple_trail/project.json'));await fs.writeFile('test/output/blockbench-export.mcpack',bytes);
  const meta=JSON.parse(await zip.file('simple_trail/project.json').async('string'));assert.equal(meta.configs.length,1);assert.equal(meta.configs[0].attachable,'minecraft:diamond_sword');
  for(const key of ['color','opacity','blend','unlit','root','worldScale','teleportDistance','texture'])assert.equal(Object.hasOwn(meta.configs[0],key),false);
  for(const file of meta.files.filter(p=>p.startsWith('render_controllers/'))){const rc=JSON.parse(await zip.file(file).async('string')).render_controllers;assert.equal(Object.keys(rc).length,2);for(const controller of Object.values(rc)){assert.equal(Object.hasOwn(controller,'color'),false);assert.equal(Object.hasOwn(controller,'ignore_lighting'),false);assert.ok(controller.uv_anim);}}
  assert.equal(await c.evaluate(`JSON.stringify(st.config)`),original);
  await c.evaluate(`window.trailSaved=Codecs.project.compile({raw:true});Project.saved=true;void Project.close(true)`);
  await until(`ModelProject.all.length===1`);
  await c.evaluate(`Codecs.project.load(trailSaved,{path:'',no_file:true});void Modes.options.trail.select()`);
  await until(`st.s.configured`);assert.equal(await c.evaluate(`JSON.stringify(st.config)`),original);
  assert.ok(await c.evaluate(`st.s.linked`));
  // Importing the generated package unwraps exactly one configuration.
  await importPack('reimport.mcpack',exported);
  await until(`st.s.packName==='reimport.mcpack'&&!st.s.busy`);assert.equal(await c.evaluate(`st.s.rows.length`),1);assert.equal(await c.evaluate(`st.s.rows[0].status`),'ready');await c.evaluate(`void Dialog.open?.hide()`);
  // Two aliases may share a model, but only one query geometry can be exported.
  await fs.writeFile('test/output/fixture.mcpack',Buffer.from(pack,'base64'));
  const multi=await JSZip.loadAsync(await fs.readFile('test/output/fixture.mcpack')),doc=JSON.parse(await multi.file('attachables/diamond_sword.json').async('string'));
  doc['minecraft:attachable'].description.geometry.alternate=doc['minecraft:attachable'].description.geometry.default;multi.file('attachables/diamond_sword.json',JSON.stringify(doc));const multiBytes=await multi.generateAsync({type:'base64'});
  await importPack('multi.mcpack',multiBytes);
  await until(`st.s.packName==='multi.mcpack'&&!st.s.busy`);await c.evaluate(`Dialog.open.content_vue.open(st.s.rows.find(r=>r.alias==='alternate'))`);await until(`st.config.geometry==='alternate'&&!st.s.busy`);
  await c.evaluate(`BarItems.trail_browser.trigger()`);await until(`Dialog.open?.id==='trail_browser'`);await c.evaluate(`Dialog.open.content_vue.open(st.s.rows.find(r=>r.alias==='default'))`);await until(`st.config.geometry==='default'&&!st.s.busy`);
  const picked=async prepare=>JSON.parse(await (async()=>{const zipBytes=Buffer.from(await exportDialog(prepare),'base64'),z=await JSZip.loadAsync(zipBytes);return z.file('simple_trail/project.json').async('string');})()).configs.map(x=>x.geometry);
  // Only one geometry per attachable is exported; checking another alias replaces the first.
  assert.deepEqual(await picked(``),['default']);
  assert.deepEqual(await picked(`const rows=Dialog.open.content_vue.rows;rows.find(r=>r.alias==='alternate').selected=true;Dialog.open.content_vue.toggle(rows.find(r=>r.alias==='alternate'));`),['alternate']);
  const errors=c.events.filter(e=>e.method==='Runtime.exceptionThrown'||e.method==='Runtime.consoleAPICalled'&&e.params.type==='error');assert.deepEqual(errors.map(e=>e.params.exceptionDetails?.text??e.params.args?.map(a=>a.description??a.value).join(' ')),[]);
  console.log(JSON.stringify({language:english?'en':'zh',import:true,curves:true,gizmoMove:true,gizmoRotate:true,cancelDrag:true,undoRedo:true,previewTriangles:meshes.length,saveReopen:true,exportReimport:true,geometrySelection:true,appearanceRemoved:true,consoleErrors:errors.length}));
}finally{c.close();}
