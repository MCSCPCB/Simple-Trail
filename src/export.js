import JSZip from 'jszip';
import {clone,normalize,validate,segmentCount} from './config.js';
import {descriptionOf,indexResources,parseJson} from './resources.js';
import {createRuntime} from './core/runtime.js';
import {toMolang,checkMolang} from './core/molanguage.js';
import {trailGradient} from './assets.js';
import {triangleVertices,segmentUvs} from './core/ribbon.js';
import {modelSpaceSetup} from './core/space.js';
import {fail} from './i18n.js';

const encode=v=>new TextEncoder().encode(JSON.stringify(v,null,2)+'\n');
const materialPath='materials/entity.material';
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0).toString(16);};
export const resourceKey=c=>'st_'+hash(c.attachable+'|'+c.geometry);
export function unwrapResources(resources){
  const meta=resources.json.get('simple_trail/project.json');if(!meta)return resources;
  if(meta.format_version!==1||!Array.isArray(meta.files)||!meta.originals)fail('generated_meta');
  const files=new Map(resources.files);
  for(const p of meta.files){if(!/^(models\/entity|animations|animation_controllers|render_controllers|materials|textures)\/simple_trail\//.test(p)||p.includes('..'))fail('generated_path',[p]);files.delete(p);}
  for(const [p,v]of Object.entries(meta.originals)){if(!/^attachables\/.+\.json$/.test(p)||p.includes('..'))fail('attachable_backup',[p]);files.set(p,encode(v));}
  if(Object.hasOwn(meta,'materialBackup')){if(meta.materialBackup===null)files.delete(materialPath);else if(typeof meta.materialBackup==='string')files.set(materialPath,Uint8Array.from(atob(meta.materialBackup),c=>c.charCodeAt(0)));else fail('material_backup');}
  files.delete('simple_trail/project.json');const clean=indexResources(files);clean.savedConfigs=meta.configs.map(normalize);for(const [id,model]of Object.entries(meta.models??{}))if(clean.geometries.has(id))clean.geometries.set(id,clone(model));return clean;
}
export function generate(resources,configs){
  const files=new Map(resources.files),written=[],originals={},models={},savedConfigs=[];
  const originalMaterial=files.get(materialPath);
  const materialDoc=originalMaterial?parseJson(new TextDecoder().decode(originalMaterial),materialPath):{materials:{version:'1.0.0'}};
  const write=(p,v)=>{if(files.has(p))fail('generated_exists',[p]);files.set(p,v instanceof Uint8Array?v:encode(v));written.push(p);};
  const seen=new Set();
  for(const input of configs){
    const record=resources.attachables.get(input.attachable);if(!record)fail('missing_attachable',[input.attachable]);
    if(seen.has(input.attachable))fail('one_geometry');seen.add(input.attachable);
    const source=descriptionOf(record),geometry=resources.geometries.get(source.geometry?.[input.geometry]);if(!geometry)fail('missing_geometry',[input.geometry]);
    const c=validate(input,geometry),id=resourceKey(c),N=segmentCount(c),names={a:id+'_a',b:id+'_b',root:id+'_root'};models[geometry.description.identifier]=clone(geometry);savedConfigs.push(c);
    const runtime=createRuntime(c,names);
    const rawBones=runtime.animatedBones(),generatedBones=new Set(Object.keys(rawBones));
    // Only generated keys and unquoted variable references are namespaced.
    // Source bone names inside query strings must survive verbatim.
    const remap=value=>typeof value==='string'?(generatedBones.has(value)?id+value.slice(2):value.split(/('(?:\\.|[^'\\])*')/g).map((part,i)=>i%2?part:part.replace(/\bv\.st_/g,'v.'+id+'_')).join('')):Array.isArray(value)?value.map(remap):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([k,v])=>[remap(k),remap(v)])):value;
    const model=clone(geometry);model.description.identifier='geometry.'+id+'.source';
    for(const end of ['a','b']){if(model.bones.some(b=>b.name===names[end]))fail('marker_collision');model.bones.push({name:names[end],parent:c.points[end].bone,pivot:c.points[end].position});}
    write(`models/entity/simple_trail/${id}.source.geo.json`,{format_version:'1.16.0','minecraft:geometry':[model]});
    // Samples already include the source's binding/inherited player pose. A
    // private, unbound root draws that actor-space history without applying a
    // newer hand pose again. The source skeleton and its animations stay intact.
    if(geometry.bones.some(b=>b.name===names.root))fail('marker_collision');
    const pivot=[0,0,0],root={name:names.root,pivot:clone(pivot)};
    const ribbon={description:{identifier:'geometry.'+id+'.ribbon',texture_width:16,texture_height:16,visible_bounds_width:16,visible_bounds_height:16,visible_bounds_offset:[0,0,0]},bones:[root]};
    for(let i=0;i<N*2;i++){
      const n=id+'_strip'+i,s=i>>1;
      // Fixed history samples share one scrolling texture; only the live strip
      // needs a separate UV scale because it can be shorter than one interval.
      const uv=s===0?segmentUvs(0,1):segmentUvs((s-1)*c.sampleInterval/c.lifetime,s*c.sampleInterval/c.lifetime);
      ribbon.bones.push({name:n,parent:names.root,pivot:clone(pivot)},{name:n+'_scale',parent:n,pivot:clone(pivot)},{name:n+'_mesh',parent:n+'_scale',pivot:clone(pivot),poly_mesh:{
        normalized_uvs:true,positions:triangleVertices.map(v=>v.map((x,k)=>x+pivot[k])),normals:[[0,0,1]],
        uvs:uv[i%2].map(([u,v])=>[u,1-v]),polys:[[[0,0,0],[1,0,1],[2,0,2],[0,0,0]]],
      }});
    }
    write(`models/entity/simple_trail/${id}.ribbon.geo.json`,{format_version:'1.21.0','minecraft:geometry':[ribbon]});
    const capture=remap(toMolang(runtime.captureNodes())),initialize=remap(toMolang(runtime.initialize())),bones=remap(rawBones);
    const preAnimation=remap(runtime.preAnimation)+`v.${id}_active?{${modelSpaceSetup(resources,source,id)}};`;
    for(const s of [capture,initialize,preAnimation,...Object.values(bones).flatMap(b=>Object.values(b).flat())])if(typeof s==='string'){checkMolang(s,id);if(s.length>61500)fail('molang_size');}
    write(`animations/simple_trail/${id}.json`,{format_version:'1.10.0',animations:{['animation.'+id+'.display']:{loop:true,bones}}});
    write(`animation_controllers/simple_trail/${id}.json`,{format_version:'1.10.0',animation_controllers:{['controller.animation.'+id+'.capture']:{initial_state:'a',states:{a:{transitions:[{b:'1'}],on_exit:[capture]},b:{transitions:[{a:'1'}],on_exit:[capture]}}}}});
    const doc=clone(record.value),d=doc['minecraft:attachable'].description;originals[record.file]=clone(record.value);
    d.geometry[c.geometry]=model.description.identifier;
    if(d.geometry[id]||d.animations?.[id+'_display']||d.materials?.[id])fail('alias_collision');
    d.geometry[id]=ribbon.description.identifier;d.queryable_geometry=c.geometry;
    d.animations={...d.animations,[id+'_display']:'animation.'+id+'.display',[id+'_capture']:'controller.animation.'+id+'.capture'};
    d.scripts??={};for(const k of ['initialize','pre_animation','animate'])if(d.scripts[k]!==undefined&&!Array.isArray(d.scripts[k]))fail('scripts_array',[k]);
    d.scripts.initialize=[...(d.scripts.initialize??[]),initialize];d.scripts.pre_animation=[...(d.scripts.pre_animation??[]),preAnimation];d.scripts.animate=[...(d.scripts.animate??[]),id+'_display',id+'_capture'];
    const texturePath='textures/simple_trail/'+id;
    write(texturePath+'.png',trailGradient);
    const materialName=id+'_ribbon';
    if(Object.keys(materialDoc.materials).some(k=>k.split(':')[0]===materialName))fail('alias_collision');
    // A&S entity alpha blending and UV animation; opacity is supplied by the PNG.
    materialDoc.materials[materialName+':entity_emissive']={'+states':['Blending','DisableCulling','DisableDepthWrite'],'+defines':['USE_UV_ANIM'],'-defines':['FANCY'],blendSrc:'SourceAlpha',blendDst:'OneMinusSrcAlpha','+samplerStates':[{samplerIndex:0,textureFilter:'Bilinear',textureWrap:'Clamp'}]};
    d.textures={...d.textures,[id]:texturePath};d.materials={...d.materials,[id]:materialName};
    const active=`(v.${id}_active??0)&&(v.${id}_ready??0)`,live=`math.clamp((v.${id}_live_age??0)/${c.lifetime},0,1)`,history=`math.clamp((v.${id}_h0_age??0)/${c.lifetime},0,1)`;
    const controllers={};
    for(let pass=0;pass<Math.min(N,2);pass++){
      const visibility=[{'*':false},...Array.from({length:pass?(N-1)*2:2},(_,j)=>({[id+'_strip'+(pass?j+2:j)+'_mesh']:active}))];
      controllers['controller.render.'+id+'.segment'+pass]={geometry:'Geometry.'+id,rebuild_animation_matrices:true,materials:[{'*':'Material.'+id}],textures:['Texture.'+id],part_visibility:visibility,uv_anim:{offset:[0,pass?history:live],scale:[1,pass?1:`math.max(0,${history}-${live})`]}};
    }
    d.render_controllers=[...(d.render_controllers??[]),...Object.keys(controllers)];
    write(`render_controllers/simple_trail/${id}.json`,{format_version:'1.8.0',render_controllers:controllers});files.set(record.file,encode(doc));
  }
  const materialMeta={};
  if(configs.length){files.set(materialPath,encode(materialDoc));materialMeta.materialBackup=originalMaterial?btoa(Array.from(originalMaterial,b=>String.fromCharCode(b)).join('')):null;}
  files.set('simple_trail/project.json',encode({format_version:1,configs:savedConfigs,files:written,originals,models,...materialMeta}));return {files,generated:written};
}
export async function exportPack(resources,configs){const result=generate(resources,configs),zip=new JSZip();for(const [p,b]of result.files)zip.file(p,b);return zip.generateAsync({type:'uint8array',compression:'DEFLATE',compressionOptions:{level:6}});}
