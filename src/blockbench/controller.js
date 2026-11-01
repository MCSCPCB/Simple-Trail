import {t} from '../i18n.js';
import {clone,defaults,validate} from '../config.js';
import {importPacks,descriptionOf,parseJson} from '../resources.js';
import {exportPack,unwrapResources} from '../export.js';
import {TrailPreview} from './preview.js';
import {Gizmo} from './gizmo.js';
import {browserDialog} from './dialogs.js';
import example from '../../examples/sword_trail.mcpack';

export class Controller{
  constructor(){this.resources=null;this.configs=new Map();this.enabled=new Set();this.browser=null;this.state={packName:'',rows:[],search:'',current:'',busy:false,configured:false,config:null,bones:[],selected:'a',tool:'move',running:false,emit:true,helpers:true,wireframe:false,error:'',linked:false};this.preview=new TrailPreview(this);this.gizmo=new Gizmo(this);}
  safe(fn){try{const result=fn();if(result?.catch)result.catch(e=>this.error(e));return result;}catch(e){this.error(e);}}
  error(e){console.error(e);Blockbench.showMessageBox({title:t('error'),message:e.message??String(e),buttons:[t('close')]});}
  active(){return Modes.selected?.id==='trail'&&!!Project?.simple_trail?.config;}
  get data(){return Project?.simple_trail?.config?Project.simple_trail:null;}
  key(r){return r.id+'|'+r.alias;}
  async importFile(file){this.state.busy=true;try{const packs=await importPacks(file.content);if(packs.length===1)this.usePack(packs[0],file.name);else new Dialog('trail_pack_select',{title:t('choose_pack'),form:{pack:{label:t('pack'),type:'select',options:Object.fromEntries(packs.map((p,i)=>[i,p.name])),value:'0'}},onConfirm:v=>{this.usePack(packs[Number(v.pack)],file.name);browserDialog(this);}}).show();}finally{this.state.busy=false;}}
  usePack(pack,name){this.preview.disposeScene();this.gizmo.clear();this.resources=unwrapResources(pack.resources);this.packKey=this.resources.json.get('manifest.json')?.header?.uuid??name;this.configs=new Map((this.resources.savedConfigs??[]).map(c=>[c.attachable+'|'+c.geometry,c]));this.state.packName=name;this.state.rows=[];
    this.enabled=new Set(this.configs.keys());
    for(const [id,r]of this.resources.attachables){const d=descriptionOf(r);for(const [alias,gid]of Object.entries(d.geometry??{})){const model=this.resources.geometries.get(gid);const row={id,alias,key:id+'|'+alias,geometry:gid,configured:false,enabled:false,error:''};if(!model?.bones?.length)row.error=t('missing_geometry',[gid]);else{try{validate(this.configs.get(row.key)??defaults(id,alias,model),model);}catch(e){row.error=e.message;}}this.state.rows.push(row);}}
    for(const project of ModelProject.all){const d=project.simple_trail;if(d?.config&&d.packKey===this.packKey&&this.state.rows.some(r=>r.key===d.key)){this.configs.set(d.key,clone(d.config));this.resources.geometries.set(d.model.description.identifier,clone(d.model));if(!this.state.rows.some(r=>r.id===d.config.attachable&&this.enabled.has(r.key)))this.enabled.add(d.key);}}
    this.refresh();
  }
  choosePack(){Blockbench.import({type:t('pack'),extensions:['mcpack','zip','mcaddon'],readtype:'buffer',resource_id:'simple_trail_pack'},files=>{if(files[0])this.safe(async()=>{await this.importFile(files[0]);browserDialog(this);});});}
  setEnabled(row,enabled){if(row.error||!this.configs.has(row.key))return;if(enabled){for(const other of this.state.rows)if(other.id===row.id)this.enabled.delete(other.key);this.enabled.add(row.key);}else this.enabled.delete(row.key);for(const r of this.state.rows)r.enabled=this.enabled.has(r.key);}
  async openExample(){await this.importFile({name:'Sword Trail.mcpack',content:example});await this.openRow(this.state.rows.find(r=>!r.error));}
  async openRow(row){if(!row||row.error)return;this.state.busy=true;try{
    const existing=ModelProject.all.find(p=>p.simple_trail?.key===row.key&&p.simple_trail.packKey===this.packKey);if(existing){existing.select();Modes.options.trail.select();this.refresh();this.browser?.hide();return;}
    this.preview.disposeScene();this.gizmo.clear();const model=clone(this.resources.geometries.get(row.geometry)),record=this.resources.attachables.get(row.id),client=clone(descriptionOf(record));
    const config=validate(this.configs.get(row.key)??defaults(row.id,row.alias,model),model);
    newProject(Formats.bedrock);Project.name=row.id.replace(':','_');Project.export_path='trail://'+row.key;Codecs.bedrock.parse({format_version:'1.16.0','minecraft:geometry':[model]},'');Project.export_path='';
    Project.simple_trail={packKey:this.packKey,key:row.key,client,model,config};this.configs.set(row.key,clone(config));this.setEnabled(row,true);
    const animations=Object.fromEntries(Object.values(client.animations??{}).filter(id=>this.resources.animations.has(id)).map(id=>[id,this.resources.animations.get(id)]));
    if(Object.keys(animations).length)(typeof AnimationCodec==='undefined'?Animator:AnimationCodec.codecs.bedrock).loadFile({path:'',json:{format_version:'1.10.0',animations}});
    const texPath=Object.values(client.textures??{}).find(p=>this.resources.files.has(p+'.png'));
    if(texPath){const bytes=this.resources.files.get(texPath+'.png'),url=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(new Blob([bytes],{type:'image/png'}));});const texture=new Texture({name:'texture.png',keep_size:true});await new Promise(resolve=>{texture.load_callback=resolve;texture.img.addEventListener('error',resolve,{once:true});texture.fromDataURL(url).add(false);});for(const cube of Cube.all)cube.applyTexture(texture,true);}
    Project.saved=false;Canvas.updateAll();Preview.selected?.loadAnglePreset?.({position:[-32,22,-40],target:[0,11,0],projection:'perspective'});Modes.options.trail.select();this.browser?.hide();this.refresh();
  }finally{this.state.busy=false;}}
  model(){return this.data?.model;}
  syncGeometry(){if(!this.data||Format?.id!=='bedrock')return;const model=Codecs.bedrock.compile({raw:true,visible_box:false})['minecraft:geometry'][0];if(!model)return;
    const old=this.data.model;for(const b of model.bones){const previous=old.bones.find(x=>x.name===b.name);if(previous)for(const key of ['binding','texture_meshes'])if(b[key]===undefined&&previous[key]!==undefined)b[key]=clone(previous[key]);}
    model.description={...old.description,...model.description,identifier:old.description.identifier};this.data.model=model;
    if(this.resources&&this.data.packKey===this.packKey)this.resources.geometries.set(model.description.identifier,clone(model));
  }
  refresh(){const d=this.data;this.state.configured=!!d;this.state.config=d?clone(d.config):null;this.state.bones=d?d.model.bones.map(b=>b.name):[];this.state.linked=!!d&&this.packKey===d.packKey;this.state.error='';if(d){try{validate(d.config,d.model);}catch(e){this.state.error=e.message;}if(this.state.linked)this.configs.set(d.key,clone(d.config));}
    for(const r of this.state.rows){r.configured=this.configs.has(r.key);r.enabled=this.enabled.has(r.key);}this.state.running=this.preview.running;
    if(this.active()&&!this.gizmo.drag){this.preview.setup();this.gizmo.attach();}updateInterfacePanels();
  }
  select(key){this.state.selected=key;this.gizmo.attach();}
  change(path,value){this.safe(()=>{const d=this.data;if(!d)return;const config=clone(d.config),parts=path.split('.');let node=config;for(const p of parts.slice(0,-1))node=node[p];node[parts.at(-1)]=value;validate(config,d.model);const running=this.preview.running;Undo.initEdit({trail:true});d.config=config;Undo.finishEdit(t('edit'));Project.saved=false;this.refresh();if(running){this.preview.start();this.state.running=true;}});}
  setPointBone(key,bone){this.change('points.'+key,{bone,position:clone(this.data.model.bones.find(b=>b.name===bone)?.pivot??[0,0,0])});}
  importConfig(){Blockbench.import({type:t('config'),extensions:['json'],readtype:'text'},files=>{if(!files[0])return;this.safe(()=>{const c=parseJson(files[0].content,files[0].name);if(c.attachable!==this.data.config.attachable||c.geometry!==this.data.config.geometry)throw new Error(t('config_target'));validate(c,this.model());Undo.initEdit({trail:true});this.data.config=c;Undo.finishEdit(t('import_config'));Project.saved=false;this.refresh();});});}
  exportConfig(){if(!this.data)return;Blockbench.export({type:t('config'),extensions:['json'],name:this.data.config.attachable.replace(':','_')+'.trail',content:JSON.stringify(this.data.config,null,2)});}
  async export(){this.state.busy=true;try{if(!this.resources)throw new Error(t('import_first'));this.syncGeometry();this.refresh();const configs=[...this.configs].filter(([key])=>this.enabled.has(key)).map(([,c])=>c);if(!configs.length)throw new Error(t('no_config'));const bytes=await exportPack(this.resources,configs);Blockbench.export({type:t('pack'),extensions:['mcpack'],name:this.state.packName.replace(/\.(mcpack|mcaddon|zip)$/i,'')+' Trail',savetype:'zip',content:new Blob([bytes],{type:'application/zip'})});}finally{this.state.busy=false;}}
  play(){if(this.preview.running)this.preview.pause();else this.preview.start();this.state.running=this.preview.running;}
  swing(){this.preview.swing();this.state.running=this.preview.running;}
  reset(){this.preview.reset();this.state.running=false;this.gizmo.attach();}
  enterMode(){this.refresh();}
  leaveMode(){this.gizmo.cancel();this.gizmo.clear();this.preview.disposeScene();}
  dispose(){this.leaveMode();this.gizmo.dispose();this.browser?.delete?.();}
}
