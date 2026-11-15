import {curveValue,clone} from '../config.js';
import {t} from '../i18n.js';
const KEY_MIN_GAP=.01;
// Piecewise-linear curve editor. Drag a key, double-click to add one, right-click or Delete to remove it.
export const CurveEditor={
  props:['value','maximum','label','tip'],data(){return {draft:null,active:0};},
  computed:{curve(){return this.draft??this.value;},path(){return Array.from({length:81},(_,i)=>`${i?'L':'M'}${12+i/80*216},${116-curveValue(this.curve,i/80)/this.maximum*100}`).join(' ');}},
  methods:{t,x(p){return 12+p[0]*216;},y(p){return 116-p[1]/this.maximum*100;},
    coords(e){const r=this.$refs.svg.getBoundingClientRect();return [Math.max(0,Math.min(1,((e.clientX-r.left)/r.width*240-12)/216)),Math.max(0,Math.min(this.maximum,(116-(e.clientY-r.top)/r.height*140)/100*this.maximum))];},
    begin(e,index){if(e.button!==0)return;e.preventDefault();this.active=index;this.draft=clone(this.value);this.$refs.svg.setPointerCapture(e.pointerId);},
    move(e){if(!this.draft)return;const p=this.coords(e),k=this.draft.keys,i=this.active;p[0]=i===0?0:i===k.length-1?1:Math.max(k[i-1][0]+KEY_MIN_GAP,Math.min(k[i+1][0]-KEY_MIN_GAP,p[0]));this.$set(k,i,p);},
    finish(){if(!this.draft)return;const result=this.draft;this.draft=null;this.$emit('change',result);},
    add(e){if(this.value.keys.length>=12)return;const p=this.coords(e);if(p[0]<=KEY_MIN_GAP||p[0]>=1-KEY_MIN_GAP||this.value.keys.some(k=>Math.abs(k[0]-p[0])<KEY_MIN_GAP))return;const c=clone(this.value);c.keys.push(p);c.keys.sort((a,b)=>a[0]-b[0]);this.$emit('change',c);},
    remove(i){if(i<=0||i>=this.value.keys.length-1)return;const c=clone(this.value);c.keys.splice(i,1);this.active=0;this.$emit('change',c);},
    key(e,i){if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Delete'].includes(e.key))return;e.preventDefault();this.active=i;if(e.key==='Delete')return this.remove(i);const c=clone(this.value),p=c.keys[i];if(e.key==='ArrowUp'||e.key==='ArrowDown')p[1]=Math.max(0,Math.min(this.maximum,p[1]+(e.key==='ArrowUp'?.05:-.05)));else if(i>0&&i<c.keys.length-1)p[0]=Math.max(c.keys[i-1][0]+KEY_MIN_GAP,Math.min(c.keys[i+1][0]-KEY_MIN_GAP,p[0]+(e.key==='ArrowRight'?.01:-.01)));this.$emit('change',c);}
  },
  template:`<div class="st-curve" :title="tip"><div class="st-muted">{{label}}</div><svg ref="svg" viewBox="0 0 240 140" role="img" :aria-label="label" @pointermove="move" @pointerup="finish" @pointercancel="draft=null" @dblclick="add"><path d="M12 16V116H228" class="st-axis"/><path :d="path" class="st-curve-line"/><circle v-for="(p,i) in curve.keys" :key="i" :cx="x(p)" :cy="y(p)" r="5" tabindex="0" role="slider" :aria-label="label+' '+(i+1)" :aria-valuenow="p[1]" :aria-valuemin="0" :aria-valuemax="maximum" @pointerdown="begin($event,i)" @contextmenu.prevent="remove(i)" @keydown="key($event,i)"/><text x="12" y="134">0</text><text x="228" y="134" text-anchor="end">1</text></svg></div>`
};
