import {t,fail} from '../i18n.js';
import {clone,defaults,validate,normalize,presetOf} from '../config.js';
import {importPacks,descriptionOf,parseJson} from '../resources.js';
import {exportPack,unwrapResources} from '../export.js';
import {TrailPreview} from './preview.js';
import {Gizmo} from './gizmo.js';
import {browserDialog} from './dialogs.js';

const readAsDataURL=bytes=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(new Blob([bytes],{type:'image/png'}));});

export class Controller{
  constructor(){
    this.resources=null;this.configs=new Map();this.enabled=new Set();this.browser=null;this.packKey='';
    // selected: 'root' is the whole attachable, 'a' and 'b' are the two end points.
    this.state={packName:'',rows:[],search:'',current:'',busy:false,configured:false,config:null,bones:[],selected:'root',tool:'move',running:false,error:'',linked:false,custom:false,customFor:''};
    this.preview=new TrailPreview(this);this.gizmo=new Gizmo(this);
  }
  safe(fn){try{const result=fn();if(result?.catch)result.catch(e=>this.error(e));return result;}catch(e){this.error(e);}}
  error(e){console.error(e);Blockbench.showMessageBox({title:t('error_title'),message:e.message??String(e),buttons:[t('close')]});}
  active(){return Modes.selected?.id==='trail'&&!!Project?.simple_trail?.config;}
  get data(){return Project?.simple_trail?.config?Project.simple_trail:null;}
  key(r){return r.id+'|'+r.alias;}
  model(){return this.data?.model;}

  // Pack import and the attachable list
  choosePack(){
    Blockbench.import({type:t('pack'),extensions:['mcpack','zip','mcaddon'],readtype:'buffer',resource_id:'simple_trail_pack'},files=>{
      if(files[0])this.safe(async()=>{await this.importFile(files[0]);browserDialog(this);});
    });
  }
  async importFile(file){
    this.state.busy=true;
    try{
      const packs=await importPacks(file.content);
      if(packs.length===1)this.usePack(packs[0],file.name);
      else new Dialog('trail_pack_select',{title:t('choose_pack'),form:{pack:{label:t('pack'),type:'select',options:Object.fromEntries(packs.map((p,i)=>[i,p.name||file.name])),value:'0'}},
        onConfirm:v=>{this.usePack(packs[Number(v.pack)],file.name);browserDialog(this);}}).show();
    }finally{this.state.busy=false;}
  }
  usePack(pack,name){
    this.preview.disposeScene();this.gizmo.clear();
    this.resources=unwrapResources(pack.resources);
    this.packKey=this.resources.json.get('manifest.json')?.header?.uuid??name;
    this.configs=new Map((this.resources.savedConfigs??[]).map(c=>[c.attachable+'|'+c.geometry,c]));
    this.enabled=new Set(this.configs.keys());
    this.state.packName=name;this.state.rows=[];this.state.current='';
    for(const [id,record] of this.resources.attachables){
      for(const [alias,gid] of Object.entries(descriptionOf(record).geometry??{})){
        const model=this.resources.geometries.get(gid),row={id,alias,key:id+'|'+alias,geometry:gid,status:'new',error:''};
        if(!model?.bones?.length)row.error=t('error.missing_geometry',[gid]);
        else try{validate(this.configs.get(row.key)??defaults(id,alias,model),model);}catch(e){row.error=e.message;}
        this.state.rows.push(row);
      }
    }
    // Open projects of this pack keep their unsaved configuration and model edits.
    for(const project of ModelProject.all){
      const d=project.simple_trail;
      if(d?.config&&d.packKey===this.packKey&&this.state.rows.some(r=>r.key===d.key)){
        this.configs.set(d.key,clone(d.config));this.resources.geometries.set(d.model.description.identifier,clone(d.model));
        if(!this.state.rows.some(r=>r.id===d.config.attachable&&this.enabled.has(r.key)))this.enabled.add(d.key);
      }
    }
    this.refresh();
  }
  // Each attachable exports one geometry, so enabling one alias disables the others.
  setEnabled(row,enabled){
    if(row.error||!this.configs.has(row.key))return;
    if(enabled){for(const other of this.state.rows)if(other.id===row.id)this.enabled.delete(other.key);this.enabled.add(row.key);}
    else this.enabled.delete(row.key);
  }
  async openRow(row){
    if(!row||row.error)return;
    this.state.busy=true;
    try{
      const existing=ModelProject.all.find(p=>p.simple_trail?.key===row.key&&p.simple_trail.packKey===this.packKey);
      if(existing){existing.select();this.setEnabled(row,true);Modes.options.trail.select();this.refresh();this.browser?.hide();return;}
      this.preview.disposeScene();this.gizmo.clear();
      const model=clone(this.resources.geometries.get(row.geometry)),record=this.resources.attachables.get(row.id),client=clone(descriptionOf(record));
      const config=validate(this.configs.get(row.key)??defaults(row.id,row.alias,model),model);
      newProject(Formats.bedrock);Project.name=row.id.replace(':','_');
      Project.export_path='trail://'+row.key;Codecs.bedrock.parse({format_version:'1.16.0','minecraft:geometry':[model]},'');Project.export_path='';
      Project.simple_trail={packKey:this.packKey,key:row.key,client,model,config};
      this.configs.set(row.key,clone(config));this.setEnabled(row,true);this.state.selected='root';
      const animations=Object.fromEntries(Object.values(client.animations??{}).filter(id=>this.resources.animations.has(id)).map(id=>[id,this.resources.animations.get(id)]));
      if(Object.keys(animations).length)(typeof AnimationCodec==='undefined'?Animator:AnimationCodec.codecs.bedrock).loadFile({path:'',json:{format_version:'1.10.0',animations}});
      const texPath=Object.values(client.textures??{}).find(p=>this.resources.files.has(p+'.png'));
      if(texPath){
        const url=await readAsDataURL(this.resources.files.get(texPath+'.png')),texture=new Texture({name:'texture.png',keep_size:true});
        await new Promise(resolve=>{texture.load_callback=resolve;texture.img.addEventListener('error',resolve,{once:true});texture.fromDataURL(url).add(false);});
        for(const cube of Cube.all)cube.applyTexture(texture,true);
      }
      Project.saved=false;Canvas.updateAll();
      Preview.selected?.loadAnglePreset?.({position:[-32,22,-40],target:[0,11,0],projection:'perspective'});
      Modes.options.trail.select();this.browser?.hide();this.refresh();
    }finally{this.state.busy=false;}
  }

  // The model of the open project, written back into the pack on export
  syncGeometry(){
    if(!this.data||Format?.id!=='bedrock')return;
    const model=Codecs.bedrock.compile({raw:true,visible_box:false})['minecraft:geometry'][0];if(!model)return;
    const old=this.data.model;
    for(const b of model.bones){const previous=old.bones.find(x=>x.name===b.name);if(previous)for(const key of ['binding','texture_meshes'])if(b[key]===undefined&&previous[key]!==undefined)b[key]=clone(previous[key]);}
    model.description={...old.description,...model.description,identifier:old.description.identifier};this.data.model=model;
    if(this.resources&&this.data.packKey===this.packKey)this.resources.geometries.set(model.description.identifier,clone(model));
  }
  refresh(){
    const d=this.data,state=this.state;
    if(d)d.config=normalize(d.config);
    state.configured=!!d;state.config=d?clone(d.config):null;state.bones=d?d.model.bones.map(b=>b.name):[];
    state.linked=!!d&&this.packKey===d.packKey;state.error='';
    if(d){
      try{validate(d.config,d.model);}catch(e){state.error=e.message;}
      if(state.linked)this.configs.set(d.key,clone(d.config));
      if(state.customFor!==d.key){state.customFor=d.key;state.custom=false;}
      if(presetOf(d.config.emitCondition)==='custom')state.custom=true;
    }
    for(const r of state.rows)r.status=r.error?'invalid':this.configs.has(r.key)?'ready':'new';
    state.running=this.preview.running;
    if(this.active()&&!this.gizmo.drag){this.preview.setup();this.gizmo.attach();}
    updateInterfacePanels();
  }
  select(key){this.state.selected=key;this.gizmo.attach();}

  // Edits go through one validated, undoable path. Returns false if rejected.
  edit(mutate,label=t('edit_label')){
    const d=this.data;if(!d)return false;
    try{
      const config=clone(d.config);mutate(config);const valid=validate(config,d.model);
      const running=this.preview.running;
      Undo.initEdit({trail:true});d.config=valid;Undo.finishEdit(label);Project.saved=false;this.refresh();
      if(running){this.preview.start();this.state.running=true;}
      return true;
    }catch(e){this.error(e);this.refresh();return false;}
  }
  change(path,value){
    return this.edit(config=>{const parts=path.split('.');let node=config;for(const p of parts.slice(0,-1))node=node[p];node[parts.at(-1)]=value;});
  }
  setPointBone(key,bone){this.change('points.'+key,{bone,position:clone(this.data.model.bones.find(b=>b.name===bone)?.pivot??[0,0,0])});}

  // Configuration files
  importConfig(){
    Blockbench.import({type:t('config'),extensions:['json'],readtype:'text'},files=>{
      if(!files[0])return;
      this.safe(()=>{
        const c=parseJson(files[0].content,files[0].name);
        if(c.attachable!==this.data.config.attachable||c.geometry!==this.data.config.geometry)fail('config_target');
        const valid=validate(c,this.model());
        Undo.initEdit({trail:true});this.data.config=valid;Undo.finishEdit(t('import_config'));Project.saved=false;this.refresh();
      });
    });
  }
  exportConfig(){
    if(!this.data)return;
    Blockbench.export({type:t('config'),extensions:['json'],name:this.data.config.attachable.replace(':','_')+'.trail',content:JSON.stringify(normalize(this.data.config),null,2)});
  }

  // keys: configurations to include, one per attachable
  async exportPack({name,keys}){
    this.state.busy=true;
    try{
      if(!this.resources)fail('import_first');
      this.syncGeometry();this.refresh();
      const configs=keys.filter(key=>this.configs.has(key)).map(key=>this.configs.get(key));
      if(!configs.length)fail('no_selection');
      const bytes=await exportPack(this.resources,configs);
      Blockbench.export({type:t('pack'),extensions:['mcpack'],name,savetype:'zip',content:new Blob([bytes],{type:'application/zip'})});
    }finally{this.state.busy=false;}
  }

  // Preview
  play(){if(this.preview.running)this.preview.pause();else this.preview.start();this.state.running=this.preview.running;}
  swing(){this.preview.swing();this.state.running=this.preview.running;}
  reset(){this.preview.reset();this.state.running=false;this.gizmo.attach();}
  enterMode(){this.refresh();}
  leaveMode(){this.gizmo.cancel();this.gizmo.clear();this.preview.disposeScene();}
  dispose(){this.leaveMode();this.gizmo.dispose();this.browser?.delete?.();}
}
