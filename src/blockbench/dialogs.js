import {t} from '../i18n.js';

const STATUS={ready:'status_ready',new:'status_new',invalid:'status_invalid'};
const openable=row=>!row.error;

// Attachables of the imported pack. Opening one works like opening a file.
export function browserDialog(controller){
  if(controller.browser){controller.browser.show();return;}
  controller.browser=new Dialog('trail_browser',{
    title:t('browser_title'),width:620,
    component:{
      data:()=>({s:controller.state}),
      computed:{rows(){const q=this.s.search.toLowerCase();return this.s.rows.filter(r=>(r.id+' '+r.alias).toLowerCase().includes(q));}},
      methods:{
        t,openable,
        status(row){return t(STATUS[row.status]);},
        pick(row){this.s.current=row.key;},
        open(row){if(openable(row))controller.safe(()=>controller.openRow(row));},
        importPack(){controller.choosePack();},
        exportPack(){exportDialog(controller);}
      },
      template:`<div class="st-browser">
        <div class="st-browser-bar">
          <i class="material-icons">inventory_2</i>
          <span class="st-grow st-ellipsis" :title="s.packName">{{ s.packName || t('no_pack') }}</span>
          <button @click="importPack" :disabled="s.busy">{{ s.packName ? t('replace_pack_button') : t('import_pack_button') }}</button>
          <button @click="exportPack" :disabled="s.busy || !s.rows.length">{{ t('export_button') }}</button>
        </div>
        <search-bar v-model="s.search"></search-bar>
        <ul class="st-entity-list" role="listbox">
          <li v-for="row in rows" :key="row.key" role="option" :aria-selected="s.current===row.key" :class="{selected: s.current===row.key, 'st-unavailable': !openable(row)}" :title="row.error" @click="pick(row)" @dblclick="open(row)">
            <i class="material-icons">{{ openable(row) ? 'timeline' : 'block' }}</i>
            <div class="st-grow"><div class="st-ellipsis">{{ row.id }}</div><div v-if="row.alias !== 'default' || row.error" class="st-muted st-ellipsis">{{ row.error || row.alias }}</div></div>
            <span class="st-status" :class="'st-status-'+row.status">{{ status(row) }}</span>
          </li>
          <li v-if="!rows.length" class="st-empty">{{ s.packName ? t('no_attachables') : t('no_pack_hint') }}</li>
        </ul>
        <div class="st-muted">{{ t('browser_hint') }}</div>
      </div>`
    },
    buttons:[t('open'),t('close')],
    onConfirm(){const row=controller.state.rows.find(r=>r.key===controller.state.current);if(!row||!openable(row))return false;controller.safe(()=>controller.openRow(row));}
  });
  controller.browser.show();
}

export function exportDialog(controller){
  if(!controller.resources){
    Blockbench.showMessageBox({title:t('export_title'),message:t('error.import_first'),buttons:[t('import_pack_button'),t('cancel')]},button=>{if(button===0)controller.choosePack();});
    return;
  }
  controller.safe(()=>controller.syncGeometry());
  controller.refresh();
  const s=controller.state,rows=s.rows.filter(r=>r.status==='ready').map(r=>({key:r.key,id:r.id,alias:r.alias,selected:controller.enabled.has(r.key)}));
  new Dialog('trail_export',{
    title:t('export_title'),width:540,part_order:['form','component'],
    form:{name:{label:t('pack_name'),type:'text',value:s.packName.replace(/\.(mcpack|mcaddon|zip)$/i,'')+' Trail'}},
    component:{
      data:()=>({rows}),
      computed:{count(){return this.rows.filter(r=>r.selected).length;}},
      methods:{
        t,
        all(value){for(const row of this.rows)row.selected=value&&!this.rows.some(o=>o!==row&&o.id===row.id&&o.selected);},
        // One geometry per attachable: checking an alias unchecks its siblings.
        toggle(row){if(row.selected)for(const o of this.rows)if(o!==row&&o.id===row.id)o.selected=false;}
      },
      template:`<div class="st-export">
        <div class="st-export-bar"><span class="st-grow">{{ t('export_count', [count]) }}</span><a href="#" @click.prevent="all(true)">{{ t('select_all') }}</a><a href="#" @click.prevent="all(false)">{{ t('deselect_all') }}</a></div>
        <ul class="st-entity-list st-export-list">
          <li v-for="row in rows" :key="row.key">
            <label class="st-grow st-check-row"><input type="checkbox" v-model="row.selected" @change="toggle(row)"><span class="st-ellipsis">{{ row.id }}</span><span v-if="row.alias !== 'default'" class="st-muted">{{ row.alias }}</span></label>
          </li>
          <li v-if="!rows.length" class="st-empty">{{ t('no_configured') }}</li>
        </ul>
      </div>`
    },
    buttons:[t('export_confirm'),t('cancel')],
    onConfirm(result){
      const keys=rows.filter(r=>r.selected).map(r=>r.key);
      if(!result.name.trim()||!keys.length)return false;
      for(const key of controller.enabled)controller.enabled.delete(key);
      for(const key of keys)controller.enabled.add(key);
      controller.safe(()=>controller.exportPack({name:result.name.trim(),keys}));
    }
  }).show();
}
