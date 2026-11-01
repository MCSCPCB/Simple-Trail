import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import JSZip from 'jszip';
import {connect} from './cdp.mjs';
const c=await connect(),english=process.argv.includes('--english');
const until=expr=>c.evaluate(`(async()=>{const end=Date.now()+15000;while(!(${expr})){if(Date.now()>end)throw new Error('Timed out: '+${JSON.stringify(expr)});await new Promise(r=>setTimeout(r,30));}return true;})()`);
await fs.mkdir('test/output',{recursive:true});
try{
  assert.match(await c.evaluate(`Blockbench.argv.join(' ')`),/trail-bb-test-profile/);
  await c.evaluate(`(async()=>{for(const p of [...Plugins.all].filter(p=>p.id==='simple_trail'))p.uninstall();for(const p of [...ModelProject.all]){p.saved=true;await p.close(true);}Language.code=${english?"'en'":"'zh'"};})()`);
  await c.send('Emulation.setFocusEmulationEnabled',{enabled:true});await c.send('Runtime.discardConsoleEntries');c.events.length=0;
  await c.evaluate(`(async()=>{await new Plugin().loadFromFile({path:${JSON.stringify(path.resolve('dist/simple_trail.js'))}},false);window.st={get s(){return Interface.Panels.trail_structure.vue.s;},get v(){return Interface.Panels.trail_structure.vue;},get p(){return Interface.Panels.trail_properties.vue;},get config(){return Project.simple_trail.config;},get wrapper(){return Group.all.find(g=>!g.parent?.mesh).mesh.parent;}};BarItems.trail_example.trigger();})()`);
  await until(`st.s.configured&&!st.s.busy&&st.s.linked`);
  assert.deepEqual(await c.evaluate(`[Modes.selected.id,st.config.attachable,st.s.error,TextureMesh.all.length]`),['trail','minecraft:diamond_sword','',1]);
  assert.deepEqual(await c.evaluate(`[Interface.Panels.trail_structure.node.offsetHeight>0,Interface.Panels.trail_properties.node.offsetHeight>0]`),[true,true]);
  assert.equal(await c.evaluate(`Toolbars.tools.children.filter(x=>x.id==='trail_move_tool').length`),1);
  const original=await c.evaluate(`JSON.stringify(st.config)`);
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
  const exported=await c.evaluate(`(async()=>{const original=Blockbench.export;let bytes;Blockbench.export=o=>{bytes=o.content;};try{st.v.run('export');const end=Date.now()+15000;while(!bytes){if(Date.now()>end)throw Error('No exported pack');await new Promise(r=>setTimeout(r,30));}return await new Promise(resolve=>{const r=new FileReader();r.onload=()=>resolve(r.result.split(',')[1]);r.readAsDataURL(bytes);});}finally{Blockbench.export=original;}})()`);
  const bytes=Buffer.from(exported,'base64'),zip=await JSZip.loadAsync(bytes);assert.ok(zip.file('simple_trail/project.json'));await fs.writeFile('test/output/blockbench-export.mcpack',bytes);
  const meta=JSON.parse(await zip.file('simple_trail/project.json').async('string'));assert.equal(meta.configs.length,1);assert.equal(meta.configs[0].attachable,'minecraft:diamond_sword');
  assert.equal(await c.evaluate(`JSON.stringify(st.config)`),original);
  await c.evaluate(`(async()=>{window.trailSaved=Codecs.project.compile({raw:true});Project.saved=true;await Project.close(true);Codecs.project.load(trailSaved,{path:'',no_file:true});Modes.options.trail.select();})()`);
  await until(`st.s.configured`);assert.equal(await c.evaluate(`JSON.stringify(st.config)`),original);
  assert.ok(await c.evaluate(`st.s.linked`));
  // Importing the generated package unwraps exactly one configuration.
  await c.evaluate(`(()=>{const old=Blockbench.import;Blockbench.import=(o,cb)=>cb([{name:'reimport.mcpack',content:Uint8Array.from(atob(${JSON.stringify(exported)}),x=>x.charCodeAt(0))}]);try{BarItems.trail_import_pack.trigger();}finally{Blockbench.import=old;}})()`);
  await until(`st.s.packName==='reimport.mcpack'&&!st.s.busy`);assert.equal(await c.evaluate(`st.s.rows.length`),1);assert.equal(await c.evaluate(`st.s.rows[0].configured`),true);await c.evaluate(`void Dialog.open?.hide()`);
  // Two aliases may share a model, but only one query geometry can be exported.
  const multi=await JSZip.loadAsync(await fs.readFile('examples/sword_trail_source.mcpack')),doc=JSON.parse(await multi.file('attachables/diamond_sword.json').async('string'));
  doc['minecraft:attachable'].description.geometry.alternate=doc['minecraft:attachable'].description.geometry.default;multi.file('attachables/diamond_sword.json',JSON.stringify(doc));const multiBytes=await multi.generateAsync({type:'base64'});
  await c.evaluate(`(()=>{const old=Blockbench.import;Blockbench.import=(o,cb)=>cb([{name:'multi.mcpack',content:Uint8Array.from(atob(${JSON.stringify(multiBytes)}),x=>x.charCodeAt(0))}]);try{BarItems.trail_import_pack.trigger();}finally{Blockbench.import=old;}})()`);
  await until(`st.s.packName==='multi.mcpack'&&!st.s.busy`);await c.evaluate(`Dialog.open.content_vue.open(st.s.rows.find(r=>r.alias==='alternate'))`);await until(`st.config.geometry==='alternate'&&!st.s.busy`);
  assert.deepEqual(await c.evaluate(`st.s.rows.filter(r=>r.enabled).map(r=>r.alias)`),['alternate']);
  await c.evaluate(`st.v.browser();Dialog.open.content_vue.enable(st.s.rows.find(r=>r.alias==='default'),true)`);assert.deepEqual(await c.evaluate(`st.s.rows.filter(r=>r.enabled).map(r=>r.alias)`),['default']);await c.evaluate(`void Dialog.open.hide()`);
  // Lit preview geometry has actual normals, including after asynchronous texture loading.
  await c.evaluate(`st.p.set('unlit',false);st.v.run('swing')`);await new Promise(r=>setTimeout(r,180));await c.evaluate(`st.v.run('play')`);
  assert.ok(await c.evaluate(`scene.children.flatMap(g=>g.children??[]).some(m=>m.visible&&m.material?.isMeshLambertMaterial&&Array.from(m.geometry.attributes.normal?.array??[]).some(n=>Math.abs(n)>.1))`));await c.evaluate(`st.v.run('reset')`);
  const errors=c.events.filter(e=>e.method==='Runtime.exceptionThrown'||e.method==='Runtime.consoleAPICalled'&&e.params.type==='error');assert.deepEqual(errors.map(e=>e.params.exceptionDetails?.text??e.params.args?.map(a=>a.description??a.value).join(' ')),[]);
  console.log(JSON.stringify({language:english?'en':'zh',import:true,curves:true,gizmoMove:true,gizmoRotate:true,cancelDrag:true,undoRedo:true,previewTriangles:meshes.length,saveReopen:true,exportReimport:true,geometrySelection:true,litPreview:true,consoleErrors:errors.length}));
}finally{c.close();}
