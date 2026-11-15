import {parseJson} from '../resources.js';
import {parseExpression} from './parse.mjs';
import {printExpression} from './syntax.mjs';

// As in Simple Ragdoll, model_scale supplies units and scripts.scale is a
// separate client transform. Bone scale is already included in queried TRS.
export function modelSpaceSetup(resources,attachable,id){
  let player;
  for(const [path,bytes] of resources.files){
    if(!/^entity\/.+\.json$/i.test(path))continue;
    const doc=parseJson(typeof bytes==='string'?bytes:new TextDecoder().decode(bytes),path);
    const d=doc['minecraft:client_entity']?.description;
    if(d?.identifier==='minecraft:player'){player=d;break;}
  }
  const vector=value=>Array.isArray(value)?value:[value,value,value];
  const ownerScale=vector(player?player.scripts?.scale??1:.9375);
  const localScale=vector(attachable.scripts?.scale??1);
  const statements=[],reads=new Map();
  // Each query/read must run in the owner's context, not the attachable's.
  // Do not assume that ->(an arbitrary expression) is supported by Molang.
  const owner=n=>{
    if((n.kind==='read'||n.kind==='call')&&n.path[0]!=='math'){
      const key=printExpression(n);
      if(!reads.has(key)){
        const name=`t.${id}_scale_read${reads.size}`;
        reads.set(key,name);
        const value=n.kind==='call'?{...n,args:n.args.map(owner)}:n;
        statements.push(`${name}=c.owning_entity->${printExpression(value)};`);
      }
      return {kind:'read',path:reads.get(key).split('.')};
    }
    if(n.kind==='unary')return {...n,value:owner(n.value)};
    if(n.kind==='binary')return {...n,left:owner(n.left),right:owner(n.right)};
    if(n.kind==='if')return {...n,test:owner(n.test),yes:owner(n.yes),no:owner(n.no)};
    if(n.kind==='call')return {...n,args:n.args.map(owner)};
    return n;
  };
  const expression=value=>parseExpression(typeof value==='string'?value.trim().replace(/^return\s+/i,'').replace(/;\s*$/,''):value);
  const scales=ownerScale.map((v,i)=>({owner:printExpression(owner(expression(v))),local:printExpression(expression(localScale[i]))}));
  const units=`t.${id}_actor_units`,size=`t.${id}_client_size`;
  return statements.join('')+`${units}=c.owning_entity->q.model_scale;${units}=${units}??0.0625;${units}=${units}>0?${units}:0.0625;`+
    scales.map((s,i)=>`${size}=(${s.owner})*(${s.local});v.${id}_units_${'xyz'[i]}=${units}*(math.abs(${size})>0.00001?${size}:1);`).join('');
}
