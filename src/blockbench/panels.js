import {t} from '../i18n.js';
import {TRIGGERS,presetOf,segmentCount,fitInterval,MAX_SEGMENTS} from '../config.js';
import {Field,Vector} from './fields.js';
import {CurveEditor} from './curve.js';
import {browserDialog,exportDialog} from './dialogs.js';

const POINTS=['root','a','b'];
const ICONS={root:'open_with',a:'adjust',b:'adjust'};
const SHRINK_DIRECTIONS={a_to_b:1,b_to_a:0,center:.5};

export function createPanels(controller){
  const run=(method,...args)=>controller.safe(()=>controller[method](...args));
  const structure=new Panel('trail_structure',{
    name:t('panel_structure'),icon:'timeline',resizable:true,growable:true,
    condition:{modes:['trail']},default_position:{slot:'left_bar',float_position:[0,0],float_size:[300,400],height:400},
    menu:new Menu([
      {id:'trail_menu_browser',name:t('menu_browser'),icon:'inventory_2',click:()=>browserDialog(controller)},'_',
      {id:'trail_menu_import_config',name:t('import_config'),icon:'file_upload',condition:()=>controller.state.configured,click:()=>run('importConfig')},
      {id:'trail_menu_export_config',name:t('export_config'),icon:'file_download',condition:()=>controller.state.configured,click:()=>run('exportConfig')},
      {id:'trail_menu_export',name:t('menu_export'),icon:'timeline',click:()=>exportDialog(controller)}
    ]),
    component:{
      data:()=>({s:controller.state,points:POINTS,icons:ICONS}),
      methods:{t,run,browse(){browserDialog(controller);},select(key){controller.select(key);}},
      template:`<div class="st-structure">
        <div v-if="!s.configured" class="st-empty-state">
          <p>{{ t('empty_state') }}</p>
          <button @click="run('choosePack')">{{ t('import_pack_button') }}</button>
          <button v-if="s.rows.length" @click="browse">{{ t('menu_browser') }}</button>
        </div>
        <template v-else>
          <div class="st-bar">
            <div class="tool" :title="t(s.running?'pause_preview':'play_preview')" @click="run('play')"><i class="material-icons">{{ s.running?'pause':'play_arrow' }}</i></div>
            <div class="tool" :title="t('test_swing')" @click="run('swing')"><i class="material-icons">gesture</i></div>
            <div class="tool" :title="t('reset_preview')" @click="run('reset')"><i class="material-icons">replay</i></div>
          </div>
          <h3 class="st-heading"><i class="material-icons">timeline</i><span class="st-ellipsis" :title="s.config.attachable">{{ s.config.attachable }}</span></h3>
          <ul class="st-tree" role="tree">
            <li v-for="key in points" :key="key" role="treeitem" :aria-selected="s.selected===key" class="st-row" :class="{selected:s.selected===key}" :title="key==='root'?t('point_root_tip'):''" @click="select(key)">
              <i class="material-icons">{{ icons[key] }}</i><span class="st-label">{{ t('point_'+key) }}</span>
            </li>
          </ul>
          <div v-if="!s.linked" class="st-link"><p class="st-note">{{ t('link_unloaded') }}</p><button @click="run('choosePack')">{{ t('import_pack_button') }}</button></div>
        </template>
      </div>`
    }
  });
  structure.snap_menu=new Menu([...structure.menu.structure,'_',...structure.snap_menu.structure]);
  const properties=new Panel('trail_properties',{
    name:t('panel_properties'),icon:'tune',resizable:true,growable:true,insert_after:'trail_structure',
    condition:{modes:['trail'],method:()=>controller.state.configured},default_position:{slot:'right_bar',float_position:[0,0],float_size:[300,400],height:400},
    component:{
      components:{'st-field':Field,'st-vector':Vector,'st-curve':CurveEditor},
      data:()=>({s:controller.state}),
      computed:{
        c(){return this.s.config;},
        point(){return this.s.selected==='a'||this.s.selected==='b'?this.s.selected:null;},
        boneOptions(){return Object.fromEntries(this.s.bones.map(n=>[n,n]));},
        preset(){return this.s.custom?'custom':presetOf(this.c.emitCondition);},
        triggers(){return {attack:t('trigger_attack'),held:t('trigger_held'),custom:t('custom')};},
        spaces(){return {view_model:t('space_view_model'),world:t('space_world')};},
        shrinkDirection(){return Object.keys(SHRINK_DIRECTIONS).find(key=>SHRINK_DIRECTIONS[key]===this.c.width.anchor)??'saved';},
        shrinkOptions(){
          const options=Object.fromEntries(Object.keys(SHRINK_DIRECTIONS).map(key=>[key,t('anchor_'+key)]));
          if(this.shrinkDirection==='saved')options.saved=t('anchor_saved');
          return options;
        },
        // A longer lifetime raises the interval, so the segment budget is never exceeded.
        minInterval(){return fitInterval(this.c.lifetime,.008);},
        segments(){return segmentCount(this.c);}
      },
      methods:{
        t,
        set(path,value){if(!controller.change(path,value))this.$forceUpdate();},
        bone(key,value){controller.setPointBone(key,value);},
        setShrinkDirection(value){if(Object.hasOwn(SHRINK_DIRECTIONS,value))this.set('width.anchor',SHRINK_DIRECTIONS[value]);},
        setLifetime(value){if(!controller.edit(config=>{config.lifetime=value;config.sampleInterval=fitInterval(value,config.sampleInterval);}))this.$forceUpdate();},
        choose(value){this.s.custom=value==='custom';if(value!=='custom')this.set('emitCondition',TRIGGERS[value]);}
      },
      template:`<div class="st-properties">
        <p v-if="s.error" class="st-error">{{ s.error }}</p>
        <template v-if="c">
          <section v-if="point" :key="'point_'+point"><h4>{{ t('point_'+point) }}</h4>
            <label class="st-field"><span>{{ t('bone') }}</span><select-input :value="c.points[point].bone" :options="boneOptions" @input="bone(point,$event)"></select-input></label>
            <st-vector :label="t('position')" :value="c.points[point].position" :step=".25" @change="set('points.'+point+'.position',$event)"></st-vector>
          </section>
          <section><h4>{{ t('section_trigger') }}</h4>
            <label class="st-field"><span>{{ t('trigger') }}</span><select-input :value="preset" :options="triggers" @input="choose"></select-input></label>
            <template v-if="preset==='custom'">
              <label class="st-expression"><span>{{ t('custom_condition') }}</span><input class="dark_bordered focusable_input" :value="c.emitCondition" @change="set('emitCondition',$event.target.value)"></label>
              <p class="st-note">{{ t('condition_tip') }}</p>
            </template>
          </section>
          <section><h4>{{ t('section_trail') }}</h4>
            <st-field :label="t('lifetime')" :tip="t('lifetime_tip')" :value="c.lifetime" :min=".025" :max="2" :step=".025" @change="setLifetime($event)"></st-field>
            <st-curve :label="t('width_curve')" :tip="t('curve_tip')" :value="c.width" :maximum="2" @change="set('width',$event)"></st-curve>
          </section>
          <details class="st-advanced"><summary><i class="fa fa-angle-right st-fold"></i>{{ t('section_advanced') }}</summary>
            <st-field :label="t('interval')" :tip="t('interval_tip')" :value="c.sampleInterval" :min="minInterval" :max=".1" :step=".005" @change="set('sampleInterval',$event)"></st-field>
            <p class="st-note">{{ t('segments',[segments,${MAX_SEGMENTS}]) }}</p>
            <label class="st-field" :title="t('anchor_tip')"><span>{{ t('anchor') }}</span><select-input :value="shrinkDirection" :options="shrinkOptions" @input="setShrinkDirection"></select-input></label>
            <label class="st-field" :title="t('fp_space_tip')"><span>{{ t('fp_space') }}</span><select-input :value="c.firstPersonSpace" :options="spaces" @input="set('firstPersonSpace',$event)"></select-input></label>
            <label class="st-toggle" :title="t('teleport_tip')"><input type="checkbox" :checked="c.teleportTrail" @change="set('teleportTrail',$event.target.checked)"><span>{{ t('teleport') }}</span></label>
          </details>
        </template>
      </div>`
    }
  });
  return [structure,properties];
}

export const styles=`
  #panel_trail_structure, #panel_trail_properties {overflow-y:auto; overflow-x:hidden; min-height:0;}
  #panel_trail_structure > .panel_vue_wrapper, #panel_trail_properties > .panel_vue_wrapper {flex:0 0 auto; overflow:visible;}
  .st-structure {padding:0 0 6px;}
  .st-bar {display:flex; align-items:center; gap:2px; padding:2px 6px; border-bottom:1px solid var(--color-border);}
  .st-bar .tool {width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer; border-radius:3px;}
  .st-bar .tool:hover {background:var(--color-button);}
  .st-heading {display:flex; align-items:center; gap:6px; margin:8px 8px 4px; font-size:1.1em; font-weight:normal;}
  .st-tree {list-style:none; margin:0; padding:2px 0;}
  .st-row {display:flex; align-items:center; gap:6px; height:28px; padding:0 6px 0 12px; cursor:pointer; white-space:nowrap; color:var(--color-text);}
  .st-row:hover {background:var(--color-button);}
  .st-row.selected {background:var(--color-selected);}
  .st-row .st-label {min-width:0; overflow:hidden; text-overflow:ellipsis;}
  .st-empty-state, .st-link {padding:12px; display:flex; flex-direction:column; gap:8px; color:var(--color-subtle_text); white-space:normal;}
  .st-properties {padding:4px 10px 10px;}
  .st-properties section {margin:10px 0; padding-top:6px; border-top:1px solid var(--color-border);}
  .st-properties section:first-child {border-top:none; margin-top:4px;}
  .st-properties h4 {margin:0 0 4px; font-size:1em; color:var(--color-subtle_text); font-weight:normal;}
  .st-field {display:grid; grid-template-columns:minmax(70px,42%) minmax(0,1fr); align-items:center; gap:8px; margin:5px 0; min-height:24px;}
  .st-field > .bb-select {min-width:0; width:100%; height:24px; line-height:24px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
  .st-vector {margin:8px 0;}
  .st-vector-label {display:flex; align-items:center; gap:6px; margin-bottom:2px; color:var(--color-subtle_text);}
  .st-vector > div:last-child {display:flex; gap:4px;}
  .st-number-input {display:flex; flex:1; min-width:0;}
  .st-number-input .nslide_tool {width:100%; min-width:0; margin:0; height:24px;}
  .st-number-input .nslide {width:100%; min-width:0; height:24px; line-height:24px; text-align:center;}
  .st-expression {display:block; margin:6px 0;}
  .st-expression input {display:block; width:100%; margin-top:3px;}
  .st-note {margin:4px 0; color:var(--color-subtle_text); white-space:normal; font-size:.92em;}
  .st-error {margin:6px 0; color:var(--color-error); white-space:normal;}
  .st-advanced {margin-top:10px; padding-top:6px; border-top:1px solid var(--color-border);}
  .st-advanced summary {cursor:pointer; color:var(--color-subtle_text); margin:0 0 4px;}
  .st-advanced .st-fold {width:12px; text-align:center; transition:transform .1s;}
  .st-advanced[open] .st-fold {transform:rotate(90deg);}
  .st-toggle {display:flex; align-items:center; gap:8px; margin:8px 0; cursor:pointer;}
  .st-curve {margin:8px 0;}
  .st-curve svg {width:100%; display:block; touch-action:none;}
  .st-curve .st-axis {fill:none; stroke:var(--color-border);}
  .st-curve .st-curve-line {fill:none; stroke:var(--color-accent); stroke-width:2;}
  .st-curve circle {fill:var(--color-accent); cursor:move;}
  .st-curve circle:focus {outline:2px solid var(--color-text);}
  .st-curve text {fill:var(--color-subtle_text); font-size:11px;}
  .st-grow {flex:1; min-width:0;}
  .st-ellipsis {overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
  .st-muted {color:var(--color-subtle_text);}
  .st-browser, .st-export {display:flex; flex-direction:column; gap:6px;}
  .st-browser-bar, .st-export-bar {display:flex; align-items:center; gap:6px;}
  .st-export-bar a {color:var(--color-accent);}
  .st-entity-list {list-style:none; margin:0; padding:0; max-height:48vh; min-height:120px; overflow:auto; border:1px solid var(--color-border); background:var(--color-back);}
  .st-entity-list li {display:flex; align-items:center; gap:8px; padding:4px 8px; cursor:default;}
  .st-entity-list li:hover {background:var(--color-button);}
  .st-entity-list li.selected {background:var(--color-selected);}
  .st-entity-list li.st-unavailable {opacity:.55;}
  .st-entity-list li.st-empty {justify-content:center; color:var(--color-subtle_text); padding:24px 8px;}
  .st-export-list {max-height:32vh;}
  .st-status {font-size:.9em; color:var(--color-subtle_text); white-space:nowrap;}
  .st-status-invalid {color:var(--color-error);}
`;
