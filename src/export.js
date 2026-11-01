import JSZip from 'jszip';
import {clone,validate,curveMolang} from './config.js';
import {descriptionOf,indexResources,parseJson} from './resources.js';
import {createRuntime} from './core/runtime.js';
import {toMolang,checkMolang} from './core/molanguage.js';
import {triangle} from './assets.js';

const encode=v=>new TextEncoder().encode(JSON.stringify(v,null,2)+'\n');
const materialPath='materials/entity.material';
const base64=bytes=>btoa(Array.from(bytes,b=>String.fromCharCode(b)).join(''));
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0).toString(16);};
export const resourceKey=c=>'st_'+hash(c.attachable+'|'+c.geometry);
export function unwrapResources(resources){
  const meta=resources.json.get('simple_trail/project.json');if(!meta)return resources;
  if(meta.format_version!==1||!Array.isArray(meta.files)||!meta.originals)throw new Error('Invalid generated trail metadata.');
  const files=new Map(resources.files);
  for(const p of meta.files){if(!/^(models\/entity|animations|animation_controllers|render_controllers|materials|textures)\/simple_trail\//.test(p)||p.includes('..'))throw new Error('Invalid generated resource path.');files.delete(p);}
  for(const [p,v]of Object.entries(meta.originals)){if(!/^attachables\/.+\.json$/.test(p)||p.includes('..'))throw new Error('Invalid attachable backup.');files.set(p,encode(v));}
  if(Object.hasOwn(meta,'materialBackup')){if(meta.materialBackup===null)files.delete(materialPath);else if(typeof meta.materialBackup==='string')files.set(materialPath,Uint8Array.from(atob(meta.materialBackup),c=>c.charCodeAt(0)));else throw new Error('Invalid material backup.');}
  files.delete('simple_trail/project.json');const clean=indexResources(files);clean.savedConfigs=clone(meta.configs);for(const [id,model]of Object.entries(meta.models??{}))if(clean.geometries.has(id))clean.geometries.set(id,clone(model));return clean;
}
export function generate(resources,configs){
  if(!resources.json.get('manifest.json')?.modules?.some(m=>m.type==='resources'))throw new Error('Export requires a resource pack manifest.json. Include it in the imported archive.');
  const files=new Map(resources.files),written=[],originals={},models={};
  // Bedrock loads entity materials from this registered file, not arbitrary
  // .material files in asset subdirectories. Keep its existing definitions.
  const materialBytes=files.get(materialPath),materialDoc=materialBytes?parseJson(new TextDecoder().decode(materialBytes),materialPath):{materials:{version:'1.0.0'}};
  if(!materialDoc.materials||typeof materialDoc.materials!=='object'||Array.isArray(materialDoc.materials))throw new Error('Invalid materials/entity.material.');
  const addMaterial=(key,value)=>{const name=key.split(':')[0];if(Object.keys(materialDoc.materials).some(k=>k.split(':')[0]===name))throw new Error(`Material name already exists: ${name}`);materialDoc.materials[key]=value;};
  const write=(p,v)=>{if(files.has(p))throw new Error(`Generated path already exists: ${p}`);files.set(p,v instanceof Uint8Array?v:encode(v));written.push(p);};
  const seen=new Set();
  for(const input of configs){
    const record=resources.attachables.get(input.attachable);if(!record)throw new Error(`Missing attachable: ${input.attachable}`);
    if(seen.has(input.attachable))throw new Error('Configure one query geometry per attachable.');seen.add(input.attachable);
    const source=descriptionOf(record),geometry=resources.geometries.get(source.geometry?.[input.geometry]);if(!geometry)throw new Error(`Missing geometry: ${input.geometry}`);
    const c=validate(input,geometry),id=resourceKey(c),N=Math.ceil(c.lifetime/c.sampleInterval),names={a:id+'_a',b:id+'_b'};models[geometry.description.identifier]=clone(geometry);
    const runtime=createRuntime(c,names);
    const remap=value=>typeof value==='string'?value.replace(/\bv\.st_/g,'v.'+id+'_').replace(/\bst_strip/g,id+'_strip'):Array.isArray(value)?value.map(remap):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([k,v])=>[remap(k),remap(v)])):value;
    const model=clone(geometry);model.description.identifier='geometry.'+id+'.source';
    for(const end of ['a','b']){if(model.bones.some(b=>b.name===names[end]))throw new Error('Marker name collision.');model.bones.push({name:names[end],parent:c.points[end].bone,pivot:c.points[end].position});}
    write(`models/entity/simple_trail/${id}.source.geo.json`,{format_version:'1.16.0','minecraft:geometry':[model]});
    const root=clone(geometry.bones.find(b=>b.name===c.root));delete root.cubes;delete root.texture_meshes;delete root.locators;
    const pivot=root.pivot??[0,0,0];
    const ribbon={description:{identifier:'geometry.'+id+'.ribbon',texture_width:16,texture_height:16,visible_bounds_width:16,visible_bounds_height:16,visible_bounds_offset:[0,0,0]},bones:[root]};
    for(let i=0;i<N*2;i++){const n=id+'_strip'+i;ribbon.bones.push({name:n,parent:c.root,pivot:clone(pivot)},{name:n+'_scale',parent:n,pivot:clone(pivot)},{name:n+'_mesh',parent:n+'_scale',pivot:clone(pivot),cubes:[{origin:[pivot[0]-.5,pivot[1]-.5,pivot[2]],size:[1,1,0],uv:{north:{uv:[0,0],uv_size:[16,16]}}}]});}
    write(`models/entity/simple_trail/${id}.ribbon.geo.json`,{format_version:'1.21.0','minecraft:geometry':[ribbon]});
    const capture=remap(toMolang(runtime.captureNodes())),initialize=remap(toMolang(runtime.initialize())),bones=remap(runtime.animatedBones());
    for(const s of [capture,initialize,remap(runtime.preAnimation),...Object.values(bones).flatMap(b=>Object.values(b).flat())])if(typeof s==='string'){checkMolang(s,id);if(s.length>61500)throw new Error('A Molang expression exceeds 61,500 characters. Reduce sampling density or curve keys.');}
    write(`animations/simple_trail/${id}.json`,{format_version:'1.10.0',animations:{['animation.'+id+'.display']:{loop:true,bones}}});
    write(`animation_controllers/simple_trail/${id}.json`,{format_version:'1.10.0',animation_controllers:{['controller.animation.'+id+'.capture']:{initial_state:'a',states:{a:{transitions:[{b:'1'}],on_exit:[capture]},b:{transitions:[{a:'1'}],on_exit:[capture]}}}}});
    const doc=clone(record.value),d=doc['minecraft:attachable'].description;originals[record.file]=clone(record.value);
    d.geometry[c.geometry]=model.description.identifier;
    if(d.geometry[id]||d.animations?.[id+'_display']||d.materials?.[id])throw new Error('Generated alias collision.');
    d.geometry[id]=ribbon.description.identifier;d.queryable_geometry=c.geometry;
    d.animations={...d.animations,[id+'_display']:'animation.'+id+'.display',[id+'_capture']:'controller.animation.'+id+'.capture'};
    d.scripts??={};for(const k of ['initialize','pre_animation','animate'])if(d.scripts[k]!==undefined&&!Array.isArray(d.scripts[k]))throw new Error(`Expected scripts.${k} to be an array.`);
    d.scripts.initialize=[...(d.scripts.initialize??[]),initialize];d.scripts.pre_animation=[...(d.scripts.pre_animation??[]),remap(runtime.preAnimation)];d.scripts.animate=[...(d.scripts.animate??[]),id+'_display',id+'_capture'];
    const texturePath=c.texture.replace(/\.png$/i,'')||'textures/simple_trail/'+id;
    if(c.texture&&!resources.files.has(texturePath+'.png'))throw new Error(`Missing trail texture: ${texturePath}.png`);
    if(!c.texture)write(texturePath+'.png',triangle);
    d.textures={...d.textures,[id]:texturePath};d.materials={...d.materials,[id]:id+'_ribbon'};
    addMaterial(id+'_base:'+(c.unlit?'entity_emissive':'entity'),{'+states':['Blending','DisableCulling','DisableDepthWrite'],'+defines':['USE_UV_ANIM'],'-defines':['FANCY'],blendSrc:'One',blendDst:c.blend==='additive'?'One':'OneMinusSourceAlpha'});
    addMaterial(id+'_repeat:'+id+'_base',{blendSrc:'SourceAlpha','+samplerStates':[{samplerIndex:0,textureWrap:'Repeat'}]});
    addMaterial(id+'_ribbon:'+id+'_repeat',{'+samplerStates':[{samplerIndex:0,textureFilter:'Bilinear'}]});
    const color=c.color.match(/\w\w/g).map(h=>parseInt(h,16)/255),controllers={};
    // Variable opacity needs one renderer per segment. Constant opacity shares
    // one renderer, retaining the original Sword Trail draw-call cost.
    const variableAlpha=c.opacity.keys.some(k=>k[1]!==c.opacity.keys[0][1]);
    for(let s=0;s<(variableAlpha?N:1);s++){const age=s===0?'live':'h'+(s-1),controller='controller.render.'+id+'.segment'+s;
      const alpha=`(${c.opacity.value})*(${curveMolang(c.opacity,`math.clamp((v.${id}_${age}_age??${c.lifetime})/${c.lifetime},0,1)`)})`;
      const visibility=Array.from({length:N*2},(_,i)=>({[id+'_strip'+i+'_mesh']:!variableAlpha||(i>>1)===s?`(v.${id}_active??0)&&(v.${id}_ready??0)`:false}));
      controllers[controller]={geometry:'Geometry.'+id,rebuild_animation_matrices:true,materials:[{'*':'Material.'+id}],textures:['Texture.'+id],part_visibility:visibility,color:{r:color[0],g:color[1],b:color[2],a:alpha},ignore_lighting:c.unlit};
      d.render_controllers=[...(d.render_controllers??[]),controller];
    }
    write(`render_controllers/simple_trail/${id}.json`,{format_version:'1.8.0',render_controllers:controllers});files.set(record.file,encode(doc));
  }
  files.set(materialPath,encode(materialDoc));
  files.set('simple_trail/project.json',encode({format_version:1,configs:clone(configs),files:written,originals,models,materialBackup:materialBytes?base64(materialBytes):null}));return {files,generated:written};
}
export async function exportPack(resources,configs){const result=generate(resources,configs),zip=new JSZip();for(const [p,b]of result.files)zip.file(p,b);return zip.generateAsync({type:'uint8array',compression:'DEFLATE',compressionOptions:{level:6}});}
