import {t} from '../i18n.js';
import {createPanels,styles} from './panels.js';
import {browserDialog,exportDialog} from './dialogs.js';

// Trail mode sits next to Edit and Animate; all trail editing happens there.
export function registerInterface(c){
  const items=[];
  const mode=new Mode('trail',{name:t('mode'),icon:'timeline',default_tool:'trail_move_tool',selectElements:false,condition:()=>Format?.id==='bedrock',onSelect:()=>c.enterMode(),onUnselect:()=>c.leaveMode()});
  Modes.vue?.$forceUpdate();
  // Only the whole attachable can rotate, so the rotate tool selects it.
  const tool=(id,icon,key,name,value)=>{
    while(Toolbars.tools.children.some(x=>x.id===id))Toolbars.tools.remove(id);
    const item=new Tool(id,{name:t(name),description:t(name+'_tip'),icon,category:'tools',modes:['trail'],selectElements:false,transformerMode:'hidden',keybind:new Keybind({key}),
      onSelect(){c.state.tool=value;if(value==='rotate')c.state.selected='root';c.gizmo.attach();}});
    items.push(item);return item;
  };
  [tool('trail_move_tool','icon-gizmo','v','tool_move','move'),tool('trail_rotate_tool','sync','r','tool_rotate','rotate')].forEach((item,i)=>Toolbars.tools.add(item,i));
  const action=(id,options,menu)=>{const item=new Action(id,{category:'file',...options});items.push(item);if(menu)MenuBar.addAction(item,menu);return item;};
  action('trail_import_pack',{name:t('menu_import'),icon:'timeline',click:()=>c.choosePack()},'file.import');
  action('trail_export_pack',{name:t('menu_export'),icon:'timeline',click:()=>exportDialog(c)},'file.export');
  action('trail_browser',{name:t('menu_browser'),icon:'inventory_2',category:'tools',click:()=>browserDialog(c)},'tools');
  action('trail_play',{name:t('play_preview'),icon:'play_arrow',category:'animation',keybind:new Keybind({key:32}),condition:{modes:['trail'],method:()=>c.state.configured},click:()=>c.safe(()=>c.play())});
  const panels=createPanels(c),css=Blockbench.addCSS(styles);
  return function dispose(){
    if(Modes.selected?.id==='trail')Modes.options.edit.select();
    for(const item of items){if(item instanceof Tool)Toolbars.tools.remove(item);item.delete();}
    for(const p of panels){p.vue?.$destroy();p.delete();}
    css.delete();mode.delete();
    const i=Keybinds.actions.indexOf(mode);if(i>=0)Keybinds.actions.splice(i,1);
    Modes.vue?.$forceUpdate();updateInterfacePanels();
  };
}
