import {t} from '../i18n.js';
import {createPanels,extraStyles} from './panels.js';
import {styles} from './styles.js';
import {browserDialog} from './dialogs.js';
export function registerInterface(c){
  const items=[],mode=new Mode('trail',{name:t('mode'),icon:'timeline',default_tool:'trail_move_tool',selectElements:false,condition:()=>Format?.id==='bedrock',onSelect:()=>c.enterMode(),onUnselect:()=>c.leaveMode()});Modes.vue?.$forceUpdate();
  for(const [name,key,icon]of [['move','v','icon-gizmo'],['rotate','r','sync']]){const id='trail_'+name+'_tool';while(Toolbars.tools.children.some(x=>x.id===id))Toolbars.tools.remove(id);const item=new Tool(id,{name:t(name),icon,category:'tools',modes:['trail'],selectElements:false,transformerMode:'hidden',keybind:new Keybind({key}),onSelect(){c.state.tool=name;c.gizmo.attach();}});items.push(item);Toolbars.tools.add(item);}
  const action=(id,name,icon,fn,menu,extra={})=>{const item=new Action(id,{name:t(name),icon,category:'file',click:()=>c.safe(fn),...extra});items.push(item);if(menu)MenuBar.addAction(item,menu);};
  action('trail_import_pack','import_pack','file_upload',()=>c.choosePack(),'file.import');action('trail_export_pack','export_pack','file_download',()=>c.export(),'file.export');action('trail_browser','browser','inventory_2',()=>browserDialog(c),'tools');action('trail_example','example','sports_martial_arts',()=>c.openExample(),'tools');
  action('trail_play','play','play_arrow',()=>c.play(),null,{keybind:new Keybind({key:32}),condition:{modes:['trail'],method:()=>c.state.configured}});
  const panels=createPanels(c),css=Blockbench.addCSS(styles+extraStyles);
  return ()=>{if(Modes.selected?.id==='trail')Modes.options.edit.select();for(const item of items){Toolbars.tools.remove(item);item.delete();}for(const p of panels){p.vue?.$destroy();p.delete();}css.delete();mode.delete();const i=Keybinds.actions.indexOf(mode);if(i>=0)Keybinds.actions.splice(i,1);Modes.vue?.$forceUpdate();updateInterfacePanels();};
}
