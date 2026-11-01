import {curveValue} from '../config.js';
const lerp=(a,b,u)=>a.map((v,i)=>v+(b[i]-v)*u);
export class TrailHistory {
  constructor(config){this.config=config;this.reset();}
  reset(){this.live=null;this.samples=[];this.acc=0;this.emitting=false;this.time=0;}
  update(dt,a,b,emit=true){
    const c=this.config;dt=Math.max(0,dt);if(dt>.15)this.reset();this.time+=dt;
    if(emit){if(!this.live||!this.emitting){this.samples=[];this.acc=0;this.live={a:[...a],b:[...b],time:this.time};this.samples.push({...this.live});}
      else{let at=c.sampleInterval-this.acc;while(at<=dt+1e-8){const u=dt?at/dt:1;this.samples.unshift({a:lerp(this.live.a,a,u),b:lerp(this.live.b,b,u),time:this.time-dt+at});at+=c.sampleInterval;}
        const total=this.acc+dt;this.acc=Math.max(0,total-Math.floor((total+1e-8)/c.sampleInterval)*c.sampleInterval);this.samples.length=Math.min(this.samples.length,Math.ceil(c.lifetime/c.sampleInterval));this.live={a:[...a],b:[...b],time:this.time};}
    }this.emitting=emit;
  }
  segments(){
    const c=this.config,all=[this.live,...this.samples].filter(Boolean),out=[];
    const shrink=s=>{const u=(this.time-s.time)/c.lifetime,w=curveValue(c.width,u),mid=lerp(s.a,s.b,c.width.anchor);return {a:lerp(mid,s.a,w),b:lerp(mid,s.b,w),alpha:c.opacity.value*curveValue(c.opacity,u),age:u};};
    for(let i=0;i<all.length-1;i++){const n=shrink(all[i]),o=shrink(all[i+1]);if(n.age>=1||o.age>=1)continue;out.push({triangles:[[n.a,n.b,o.a],[n.b,o.b,o.a]],alpha:n.alpha});}return out;
  }
}
