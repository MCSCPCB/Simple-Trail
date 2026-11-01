import {registerTranslations,t} from './i18n.js';
import {Controller} from './blockbench/controller.js';
import {registerInterface} from './blockbench/interface.js';
import {clone} from './config.js';
let controller,property,disposeInterface;const listeners=[];
const on=(event,listener,target=Blockbench)=>{target.on(event,listener);listeners.push([target,event,listener]);};
registerTranslations();
Plugin.register('simple_trail',{title:'Simple Trail',author:'MCSCPCB',description:t('description'),icon:'timeline',version:'0.1.0',min_version:'4.12.0',variant:'both',tags:['Minecraft: Bedrock Edition','Animation'],
  onload(){property=new Property(ModelProject,'object','simple_trail',{default:{},exposed:false,merge(project,data){if(data.simple_trail?.config)project.simple_trail=clone(data.simple_trail);}});controller=new Controller();disposeInterface=registerInterface(controller);
    on('select_project',()=>controller.refresh());on('select_no_project',()=>controller.refresh());on('unselect_project',()=>controller.leaveMode());
    on('finished_edit',()=>controller.safe(()=>{controller.syncGeometry();controller.refresh();}));
    on('create_undo_save',({save,aspects})=>{if(aspects.trail)save.trail=clone(Project.simple_trail??{});});
    on('load_undo_save',({save})=>{if(save.trail){controller.leaveMode();Project.simple_trail=clone(save.trail);controller.refresh();}});
    on('save_project',({model})=>{if(Project.simple_trail?.config){controller.syncGeometry();model.simple_trail=clone(Project.simple_trail);}});
    on('parsed',()=>controller.refresh(),Codecs.project);controller.refresh();
  },onunload(){for(const [target,event,fn]of listeners.splice(0))target.removeListener(event,fn);disposeInterface?.();controller?.dispose();property?.delete();}
});
