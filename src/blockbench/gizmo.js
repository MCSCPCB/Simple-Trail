import {TransformControls} from '../vendor/transform-controls.js';
export class Gizmo{
  constructor(controller){this.controller=controller;this.events=[];this.controls=null;this.drag=null;for(const kind of ['down','move','up']){const fn=e=>this.pointer(e,kind);document.addEventListener('pointer'+kind,fn,true);this.events.push(['pointer'+kind,fn]);}const cancel=()=>this.cancel();document.addEventListener('pointercancel',cancel,true);this.events.push(['pointercancel',cancel]);const escape=e=>{if(e.key==='Escape'&&this.drag){e.preventDefault();e.stopImmediatePropagation();this.cancel();}};document.addEventListener('keydown',escape,true);this.events.push(['keydown',escape]);}
  attach(){
    if(!this.controller.active())return this.clear();const p=this.controller.preview;if(!p.state)return;
    const selected=this.controller.state.selected,target=selected==='root'?p.wrapper:p.markers[selected];if(!target)return this.clear();
    if(!this.controls){const surface=document.createElement('canvas');this.controls=new TransformControls(Preview.selected.camera,surface);surface.ownerDocument.removeEventListener('pointerup',this.controls._onPointerUp);scene.add(this.controls);this.controls.setSize(.8);
      this.controls.addEventListener('mouseDown',()=>{this.drag={preview:this.currentPreview,orbit:this.currentPreview.controls.enabled,position:this.controls.object.position.clone(),quaternion:this.controls.object.quaternion.clone()};this.currentPreview.controls.enabled=false;});
      this.controls.addEventListener('mouseUp',()=>this.finish());
    }
    this.controls.attach(target);this.controls.setMode(selected==='root'&&this.controller.state.tool==='rotate'?'rotate':'translate');this.controls.setSpace('world');this.controls.camera=Preview.selected.camera;Transformer.visible=false;
  }
  clear(){this.controls?.detach();}
  pointer(e,kind){if(!this.controller.active())return;const preview=this.drag?.preview??Preview.all.find(p=>!p.offscreen&&p.canvas===e.target);if(!preview)return;const rect=preview.canvas.getBoundingClientRect(),pointer={x:(e.clientX-rect.left)/rect.width*2-1,y:-(e.clientY-rect.top)/rect.height*2+1,button:kind==='move'?-1:e.button};
    const controls=this.controls;if(controls?.object){controls.camera=preview.camera;controls.updateMatrixWorld(true);if(!this.drag)controls.pointerHover(pointer);if(this.drag||controls.axis&&(kind==='move'||e.button===0)){e.stopImmediatePropagation();e.preventDefault();if(kind==='down'){this.currentPreview=preview;controls.pointerDown(pointer);}else if(kind==='move')controls.pointerMove(pointer);else controls.pointerUp(pointer);return;}}
    if(kind==='down'&&e.button===0){const ray=new THREE.Raycaster();ray.setFromCamera(pointer,preview.camera);const hit=ray.intersectObjects(Object.values(this.controller.preview.markers))[0];if(hit){e.stopImmediatePropagation();e.preventDefault();this.controller.select(hit.object.userData.trailPoint);}}
  }
  finish(){if(!this.drag)return;this.drag.preview.controls.enabled=this.drag.orbit;this.drag=null;const key=this.controller.state.selected;if(key!=='root'){const config=Project.simple_trail.config,p=config.points[key],bone=Group.all.find(g=>g.name===p.bone),node=this.controller.preview.markers[key];this.controller.change('points.'+key+'.position',[-node.position.x-bone.origin[0],node.position.y+bone.origin[1],node.position.z+bone.origin[2]]);}}
  cancel(){if(!this.drag)return;this.controls.object.position.copy(this.drag.position);this.controls.object.quaternion.copy(this.drag.quaternion);this.drag.preview.controls.enabled=this.drag.orbit;this.drag=null;this.controls.dragging=false;this.controls.axis=null;}
  dispose(){this.cancel();this.clear();this.controls?.removeFromParent();this.controls?.dispose();for(const [event,fn]of this.events)document.removeEventListener(event,fn,true);}
}
