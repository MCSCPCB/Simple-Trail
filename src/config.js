import { parseExpression } from './core/parse.mjs';
export const clone = value => JSON.parse(JSON.stringify(value));
export const DEFAULT_CONDITION = "c.item_slot=='main_hand'&&v.trail_attack>0.015&&v.trail_attack<0.88";
export const curveValue = (curve, u) => {
  u=Math.max(0,Math.min(1,u)); const keys=curve.keys;
  let i=1; while(i<keys.length-1&&u>keys[i][0])i++;
  const [a,b]=[keys[i-1],keys[i]], v=a[1]+(b[1]-a[1])*(u-a[0])/(b[0]-a[0]);
  return Math.pow(Math.max(0,v),curve.exponent);
};
export function curveMolang(curve,u){
  const keys=curve.keys; let out=String(keys.at(-1)[1]);
  for(let i=keys.length-2;i>=0;i--){const a=keys[i],b=keys[i+1];out=`${u}<${b[0]}?math.lerp(${a[1]},${b[1]},(${u}-${a[0]})/${b[0]-a[0]}):(${out})`;}
  return `math.pow(math.max(0,(${out})),${curve.exponent})`;
}
export function defaults(attachable,geometry,model){
  const roots=model.bones.filter(b=>!b.parent), root=roots[0]?.name??'root';
  const bone=model.bones.find(b=>b.name==='sword')??model.bones.find(b=>b.cubes?.length||b.texture_meshes?.length)??roots[0];
  const a=model.bones.find(b=>b.name==='st_blade_base'),b=model.bones.find(b=>b.name==='st_blade_tip');
  return {format_version:1,attachable,geometry,root,
    points:{a:{bone:a?.parent??bone.name,position:clone(a?.pivot??bone.pivot??[0,0,0])},b:{bone:b?.parent??bone.name,position:clone(b?.pivot??[...(bone.pivot??[0,0,0])].map((v,i)=>v+(i===1?10:0))) }},
    emitCondition:DEFAULT_CONDITION,lifetime:.2,sampleInterval:.025,
    width:{keys:[[0,1],[1,0]],exponent:2,anchor:.5},opacity:{keys:[[0,1],[1,1]],exponent:1,value:.38},
    color:'#b8e0ff',texture:'',blend:'additive',unlit:true,firstPersonSpace:'view_model',worldScale:.9375,teleportDistance:2};
}
export function validate(config,model){
  const c=clone(config);const bad=message=>{throw new Error(message);};
  if(c.format_version!==1)bad('Unsupported trail configuration version.');
  for(const k of ['attachable','geometry','root'])if(typeof c[k]!=='string'||!c[k])bad(`Missing ${k}.`);
  const names=new Set(model.bones.map(b=>b.name));
  for(const name of names)if(typeof name!=='string'||!name||/[\x00-\x1f'\\]/.test(name))bad('Bone names cannot contain control characters, quotes or backslashes.');
  if(names.size!==model.bones.length)bad('Duplicate bone names.');
  const map=new Map(model.bones.map(b=>[b.name,b]));
  for(const b of model.bones){const seen=new Set();let n=b;while(n){if(seen.has(n.name))bad('Cyclic bone hierarchy.');seen.add(n.name);if(n.parent&&!map.has(n.parent))bad(`Missing parent: ${n.parent}`);n=map.get(n.parent);}}
  if(!names.has(c.root)||map.get(c.root).parent)bad('The reference root must be a top-level bone.');
  for(const end of ['a','b']){const p=c.points?.[end];if(!p||!names.has(p.bone))bad(`Missing endpoint bone: ${p?.bone??end}`);if(!Array.isArray(p.position)||p.position.length!==3||p.position.some(v=>!Number.isFinite(v)))bad('Endpoint positions must contain three finite numbers.');}
  const range=(v,a,b,key)=>{if(!Number.isFinite(v)||v<a||v>b)bad(`${key}: ${a}–${b}`);};
  range(c.lifetime,.025,2,'lifetime');range(c.sampleInterval,.008, .1,'sampleInterval');
  if(Math.ceil(c.lifetime/c.sampleInterval)>32)bad('Use at most 32 history segments. Increase the sampling interval or shorten the lifetime.');
  range(c.width?.anchor,0,1,'anchor');range(c.opacity?.value,0,1,'opacity');range(c.worldScale,.01,10,'worldScale');range(c.teleportDistance,.1,128,'teleportDistance');
  for(const name of ['width','opacity']){const v=c[name];range(v.exponent,.1,8,`${name} exponent`);if(!Array.isArray(v.keys)||v.keys.length<2||v.keys.length>12)bad('Curves need 2–12 keys.');let last=-1;for(const p of v.keys){if(!Array.isArray(p)||p.length!==2)bad('Invalid curve key.');range(p[0],0,1,'key time');range(p[1],0,name==='width'?4:1,'key value');if(p[0]<=last)bad('Curve times must increase.');last=p[0];}if(v.keys[0][0]!==0||v.keys.at(-1)[0]!==1)bad('Curves must start at 0 and end at 1.');}
  if(!/^#[0-9a-f]{6}$/i.test(c.color))bad('Invalid color.');
  if(!['additive','alpha'].includes(c.blend)||!['view_model','world'].includes(c.firstPersonSpace)||typeof c.unlit!=='boolean')bad('Invalid rendering settings.');
  if(typeof c.emitCondition!=='string'||!c.emitCondition.trim()||c.emitCondition.length>2000)bad('Invalid emission expression.');
  parseExpression(c.emitCondition);
  if(typeof c.texture!=='string'||c.texture.includes('..')||c.texture.includes(':'))bad('Invalid texture path.');
  return c;
}
