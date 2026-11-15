import {TrailHistory} from '../preview/history.js';
import {trailGradient} from '../assets.js';
import {segmentCount} from '../config.js';
export class TrailPreview {
  constructor(controller){this.controller=controller;this.running=false;this.state=null;this.markers={};this.raf=0;}
  setup(){
    this.disposeScene();if(!Project?.simple_trail?.config)return;
    const config=Project.simple_trail.config;this.project=Project;this.wrapper=new THREE.Group();this.wrapper.name='simple_trail_preview';
    const tops=Group.all.filter(g=>!(g.parent instanceof Group));this.saved=tops.map(g=>({mesh:g.mesh,parent:g.mesh.parent}));
    (this.saved[0]?.parent??Project.model_3d).add(this.wrapper);for(const x of this.saved)this.wrapper.add(x.mesh);
    this.history=new TrailHistory(config);this.group=new THREE.Group();scene.add(this.group);
    for(const [key,p]of Object.entries(config.points)){
      const bone=Group.all.find(g=>g.name===p.bone);if(!bone)continue;
      const marker=new THREE.Mesh(new THREE.SphereGeometry(.25,12,8),new THREE.MeshBasicMaterial({color:key==='a'?0x37c99d:0xf4b24f,depthTest:false,transparent:true,opacity:.9}));
      marker.position.set(-p.position[0]-bone.origin[0],p.position[1]-bone.origin[1],p.position[2]-bone.origin[2]);marker.userData.trailPoint=key;marker.renderOrder=1000;bone.mesh.add(marker);this.markers[key]=marker;
    }
    this.meshes=[];
    for(let i=0;i<segmentCount(config);i++){
      const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(18),3));
      geo.setAttribute('uv',new THREE.BufferAttribute(new Float32Array(12),2));
      const mat=new THREE.MeshBasicMaterial({side:THREE.DoubleSide,transparent:true,depthWrite:false,blending:THREE.NormalBlending});
      const mesh=new THREE.Mesh(geo,mat);mesh.frustumCulled=false;mesh.visible=false;this.group.add(mesh);this.meshes.push(mesh);
    }
    const bytes=trailGradient;
    if(bytes){const url=URL.createObjectURL(new Blob([bytes],{type:'image/png'})),group=this.group;new THREE.TextureLoader().load(url,texture=>{URL.revokeObjectURL(url);if(this.group!==group){texture.dispose();return;}texture.minFilter=texture.magFilter=THREE.LinearFilter;texture.wrapS=texture.wrapT=THREE.ClampToEdgeWrapping;texture.generateMipmaps=false;texture.flipY=false;this.texture=texture;for(const mesh of this.meshes){mesh.material.map=texture;mesh.material.needsUpdate=true;}},undefined,()=>URL.revokeObjectURL(url));}
    this.state={project:Project};
  }
  start(){if(!this.state)this.setup();if(!this.state)return;this.running=true;this.last=performance.now();this.tick();}
  pause(){this.running=false;cancelAnimationFrame(this.raf);this.controller.state.running=false;}
  tick(){if(!this.running||Project!==this.project){this.pause();return;}const time=performance.now(),dt=Math.min((time-this.last)/1000,.2);this.last=time;
    if(this.demoStart){const u=Math.min((time-this.demoStart)/600,1);this.wrapper.rotation.set(.2*Math.sin(u*Math.PI),.35*Math.sin(u*Math.PI),(-65+130*u)*Math.PI/180);if(u===1)this.demoStart=0;}
    this.wrapper.updateMatrixWorld(true);const a=this.markers.a?.getWorldPosition(new THREE.Vector3()),b=this.markers.b?.getWorldPosition(new THREE.Vector3());
    if(a&&b){const owner=this.wrapper.getWorldPosition(new THREE.Vector3()).multiplyScalar(1/16).toArray();this.history.update(dt,a.toArray(),b.toArray(),true,owner);const segments=this.history.segments();this.meshes.forEach((mesh,i)=>{const s=segments[i];mesh.visible=!!s;if(!s)return;mesh.geometry.attributes.position.array.set(s.triangles.flat(2));mesh.geometry.attributes.position.needsUpdate=true;mesh.geometry.attributes.uv.array.set(s.uvs.flat(2));mesh.geometry.attributes.uv.needsUpdate=true;});}
    this.raf=requestAnimationFrame(()=>this.tick());
  }
  swing(){if(!this.state)this.setup();this.demoStart=performance.now();if(!this.running)this.start();}
  clearTrail(){this.history?.reset();for(const mesh of this.meshes??[])mesh.visible=false;}
  reset(){this.pause();this.clearTrail();if(this.wrapper){this.wrapper.position.set(0,0,0);this.wrapper.rotation.set(0,0,0);this.wrapper.updateMatrixWorld(true);}this.demoStart=0;}
  disposeScene(){this.pause();for(const marker of Object.values(this.markers)){marker.removeFromParent();marker.geometry.dispose();marker.material.dispose();}this.markers={};for(const m of this.meshes??[]){m.geometry.dispose();m.material.dispose();}this.texture?.dispose();this.texture=null;this.group?.removeFromParent();this.group=null;for(const s of this.saved??[])s.parent?.add(s.mesh);this.wrapper?.removeFromParent();this.saved=[];this.state=null;this.wrapper=null;}
  dispose(){this.disposeScene();}
}
