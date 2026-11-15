import en from '../lang/en.json' with {type:'json'};
import zh from '../lang/zh.json' with {type:'json'};
const format=(text,values)=>text.replace(/%(\d+)/g,(_,i)=>String(values[i]??''));
export function registerTranslations(){Language.addTranslations('en',en);Language.addTranslations('zh',zh);}
export function t(key,values=[]){const id='trail.'+key,fallback=format(en[id]??id,values);return typeof globalThis.tl==='function'?globalThis.tl(id,values,fallback):fallback;}
export const fail=(key,values=[])=>{throw new Error(t('error.'+key,values));};
