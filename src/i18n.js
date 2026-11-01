import en from '../lang/en.json' with {type:'json'};
import zh from '../lang/zh.json' with {type:'json'};
export function registerTranslations(){Language.addTranslations('en',en);Language.addTranslations('zh',zh);}
export function t(key,args=[]){const id='trail.'+key,fallback=(en[id]??key).replace(/%(\d+)/g,(_,n)=>args[n]??'');return typeof globalThis.tl==='function'?tl(id,args,fallback):fallback;}
export function fail(key,args=[]){throw new Error(t('error.'+key,args));}
