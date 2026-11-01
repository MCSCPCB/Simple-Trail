import JSZip from 'jszip';
export function parseJson(source,label='JSON'){
  let text='',quoted=false,escaped=false;
  for(let i=0;i<source.length;i++){const c=source[i],n=source[i+1];if(quoted){text+=c;if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;continue;}if(c==='"'){quoted=true;text+=c;continue;}if(c==='/'&&n==='/'){while(i<source.length&&source[i]!=='\n')i++;text+='\n';continue;}if(c==='/'&&n==='*'){i+=2;while(i<source.length&&!(source[i]==='*'&&source[i+1]==='/'))i++;i++;text+=' ';continue;}text+=c;}
  try{return JSON.parse(text.replace(/^\uFEFF/,''));}catch{throw new Error(`Invalid JSON: ${label}`);}
}
export const descriptionOf=r=>r.value['minecraft:attachable'].description;
export function indexResources(files){
  const r={files,json:new Map(),attachables:new Map(),geometries:new Map(),geometryFiles:new Map(),animations:new Map()};
  for(const [path,bytes]of files){if(!/\.json$/i.test(path)||!(/^(attachables|models|animations|animation_controllers|render_controllers|simple_trail)\//.test(path)||path==='manifest.json'))continue;
    const v=parseJson(typeof bytes==='string'?bytes:new TextDecoder().decode(bytes),path);r.json.set(path,v);
    const d=v['minecraft:attachable']?.description;if(d){if(r.attachables.has(d.identifier))throw new Error(`Duplicate attachable: ${d.identifier}`);r.attachables.set(d.identifier,{file:path,value:v});}
    for(const g of v['minecraft:geometry']??[]){const id=g.description.identifier;if(r.geometries.has(id))throw new Error(`Duplicate geometry: ${id}`);r.geometries.set(id,g);r.geometryFiles.set(id,path);}
    for(const [id,a]of Object.entries(v.animations??{}))r.animations.set(id,a);
  }return r;
}
export async function importPacks(data){
  const found=[],budget={bytes:0,count:0};
  async function walk(data,depth=0,label=''){if(depth>2)throw new Error('Archive nesting exceeds two levels.');const zip=await JSZip.loadAsync(data),files=new Map();
    for(const e of Object.values(zip.files)){if(e.dir)continue;const p=e.unsafeOriginalName??e.name;if(p.startsWith('/')||p.includes('\\')||p.includes(':')||p.split('/').some(s=>s==='..'||!s))throw new Error(`Invalid archive path: ${p}`);
      budget.bytes+=e._data?.uncompressedSize??0;if(++budget.count>20000||budget.bytes>256*1024*1024)throw new Error('Archive exceeds 256 MB or 20,000 entries.');files.set(e.name,await e.async('uint8array'));}
    const roots=[];for(const [p,b]of files)if(/(^|\/)manifest.json$/.test(p)){const m=parseJson(new TextDecoder().decode(b),p);if(m.modules?.some(x=>x.type==='resources'))roots.push({prefix:p.slice(0,-13),manifest:m});}
    for(const {prefix,manifest}of roots){const part=new Map([...files].filter(([p])=>p.startsWith(prefix)&&!roots.some(x=>x.prefix!==prefix&&x.prefix.startsWith(prefix)&&p.startsWith(x.prefix))).map(([p,b])=>[p.slice(prefix.length),b]));const r=indexResources(part);if(r.attachables.size)found.push({name:manifest.header?.name??label,resources:r});}
    if(!roots.length&&[...files.keys()].some(p=>p.startsWith('attachables/'))){const r=indexResources(files);if(r.attachables.size)found.push({name:label||'Resource Pack',resources:r});}
    for(const [p,b]of files)if(/\.(mcpack|zip|mcaddon)$/i.test(p))await walk(b,depth+1,p);
  }await walk(data);if(!found.length)throw new Error('No resource packs with attachables were found.');return found;
}
