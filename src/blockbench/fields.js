let numericId=0;
// Blockbench number slider: drag to scrub, click to type. Scrubbing only previews; releasing commits one undo step.
const NumberInput={
  props:['value','min','max','step','axis','label'],
  data(){return {draft:null};},
  mounted(){
    const vm=this;
    this.slider=new NumSlider('trail_value_'+(++numericId),{
      name:this.axis?`${this.label} ${this.axis}`:this.label,private:true,color:this.axis?.toLowerCase(),
      settings:{min:this.min,max:this.max,default:Math.max(this.min??0,0)},
      getInterval(event={}){return (vm.step??.1)*(event.shiftKey?.25:1)*(event.ctrlOrCmd?.1:1);},
      get(){return vm.draft??vm.value??0;},
      onBefore(){vm.start=vm.value??0;vm.draft=vm.start;},
      change(modify){const next=modify(vm.draft??vm.value??0);if(!Number.isFinite(next))return;vm.draft=Math.min(vm.max??Infinity,Math.max(vm.min??-Infinity,next));vm.$emit('preview',vm.draft);},
      onAfter(){const value=vm.draft;vm.draft=null;if(value!==null&&value!==vm.start)vm.$emit('change',value);else vm.$emit('cancel');vm.$nextTick(()=>vm.slider?.update());}
    });
    this.$el.append(this.slider.node);this.slider.update();
  },
  watch:{
    value(){this.slider?.update();},
    min(value){if(this.slider){this.slider.settings.min=value;this.slider.update();}},
    max(value){if(this.slider){this.slider.settings.max=value;this.slider.update();}}
  },
  beforeDestroy(){this.slider?.delete();this.slider=null;},
  template:`<div class="st-number-input"></div>`
};
const Field={
  components:{'st-input':NumberInput},props:['label','value','min','max','step','tip'],
  template:`<div class="st-field" :title="tip"><span>{{ label }}</span><st-input :label="label" :value="value" :min="min" :max="max" :step="step" @preview="$emit('preview',$event)" @change="$emit('change',$event)" @cancel="$emit('cancel')"></st-input></div>`
};
// Edits one axis and emits the whole vector.
const Vector={
  components:{'st-input':NumberInput},props:['label','value','min','step','reset','resetTip','note'],
  methods:{compose(i,n){const v=[...this.value];v[i]=n;return v;}},
  template:`<div class="st-vector"><div class="st-vector-label"><span>{{ label }}</span><span v-if="note" class="st-tag">{{ note }}</span><i v-if="reset" class="material-icons st-reset" :title="resetTip" @click="$emit('reset')">replay</i></div>
    <div><st-input v-for="(axis,i) in ['X','Y','Z']" :key="axis" :axis="axis" :label="label" :value="value[i]" :min="min" :step="step" @preview="$emit('preview',compose(i,$event))" @change="$emit('change',compose(i,$event))" @cancel="$emit('cancel')"></st-input></div></div>`
};


export {NumberInput,Field,Vector};
