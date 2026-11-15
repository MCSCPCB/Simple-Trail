import {build} from 'esbuild';
import {readFile} from 'node:fs/promises';
const controls=await readFile('src/vendor/THREE-LICENSE.txt','utf8'),zip=(await readFile('node_modules/jszip/LICENSE.markdown','utf8')).split('GPL version 3')[0],pako=await readFile('node_modules/pako/LICENSE','utf8');
await build({entryPoints:['src/index.js'],outfile:'dist/simple_trail.js',bundle:true,format:'iife',target:['chrome102'],charset:'utf8',legalComments:'none',banner:{js:'// Simple Trail 0.1.0'},footer:{js:'/* Three.js TransformControls\n'+controls+'*/\n/* JSZip\n'+zip+'*/\n/* Pako\n'+pako+'*/'}});
