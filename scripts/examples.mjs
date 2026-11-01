import fs from 'node:fs/promises';
import path from 'node:path';
import JSZip from 'jszip';
import {indexResources} from '../src/resources.js';
import {defaults} from '../src/config.js';
import {exportPack} from '../src/export.js';
const files=new Map();
async function walk(dir,prefix=''){for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.isDirectory())await walk(path.join(dir,e.name),prefix+e.name+'/');else files.set(prefix+e.name,new Uint8Array(await fs.readFile(path.join(dir,e.name))));}}
await walk('examples/source');const r=indexResources(files),c=defaults('minecraft:diamond_sword','default',r.geometries.get('geometry.sword_trail.sword'));
await fs.writeFile('examples/sword_trail.trail.json',JSON.stringify(c,null,2)+'\n');await fs.writeFile('examples/sword_trail.mcpack',await exportPack(r,[c]));
const zip=new JSZip();for(const [p,b]of files)zip.file(p,b);await fs.writeFile('examples/sword_trail_source.mcpack',await zip.generateAsync({type:'uint8array',compression:'DEFLATE'}));
console.log('Built Sword Trail source pack, configured pack and trail configuration.');
