import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
// Publish an already reviewed canonical-derived snapshot. Never query or replace composition.
const source=process.argv[2];if(!source)throw Error('Pass the validated local food-wheel.html path');
const output='static/explore/food-wheel',input=fs.readFileSync(source,'utf8'),split=input.split('<script>const DATA=');
if(split.length!==2)throw Error('Unexpected reviewed HTML format');
const mark=split[1].indexOf(';const $='),data=JSON.parse(split[1].slice(0,mark));let runtime=split[1].slice(mark+1);
const selections=data.canonicalNetworks.topFive.selections;
if(data.foods.length!==64||selections.length!==586||new Set(selections.map(e=>e.pm_id+'|'+e.substance_id)).size!==119)throw Error('Release counts changed');
// Published evidence details already carry selected source quantities and limitations.
// Internal complete-record dumps and unselected audit rows remain in review artifacts.
for(const food of data.foods)delete food.canonical_composition;
runtime=runtime.replace(/\+\(focus\.kind==='food'\?`<details><summary>Complete canonical nutritional record<\/summary>[\s\S]*?<\/details>`:''\)/,'');
if(runtime.includes('canonical_composition'))throw Error('Internal dump removal failed');
data.release={date:'2026-11-07',source_sha256:crypto.createHash('sha256').update(input).digest('hex'),source_head:'521036b1d6c212e58c660f0f985e47617a71a716',source_state:'Reviewed canonical working-tree snapshot; source hashes identify the exact composition records. May differ from currently published canonical pages.',selection:'Relative Source Power >=10% (provisional), maximum five per admitted PM–substance target, minimum two compatible foods',covered_targets:119,total_targets:151};
// Remove machine-specific provenance fields; source-record identifiers remain relative.
const roots=new Set();function findRoots(o){if(!o||typeof o!=='object')return;for(const [k,v]of Object.entries(o)){if(['root','repo_root','worktree','cwd','source_checkout'].includes(k)&&typeof v==='string')roots.add(v);else findRoots(v);}}findRoots(data);
function sanitize(obj){if(Array.isArray(obj))return obj.map(sanitize);if(obj&&typeof obj==='object')return Object.fromEntries(Object.entries(obj).filter(([k])=>!['root','repo_root','worktree','cwd','source_checkout'].includes(k)).map(([k,v])=>[k,sanitize(v)]));if(typeof obj==='string')for(const root of roots)if(obj.startsWith(root+'/'))obj=obj.slice(root.length+1);return typeof obj==='string'?obj.replaceAll('http://127.0.0.1:3145','https://thebraindiet.org').replaceAll('http://localhost:3145','https://thebraindiet.org'):obj;}
const clean=sanitize(data);let shell=split[0].replace('BRAIN integrated food chord wheel — local review','BRAIN Food Wheel').replace('LOCAL REVIEW — Canonical Food → Substance → BRS/BRS-X','BRAIN Food Wheel — Food → Substance → BRS/BRS-X').replace('<a href="TOP-FOODS.md">','<a href="about.html">Scope &amp; evidence</a> · <a href="/">BRAIN home</a> · <a href="TOP-FOODS.md">');
const html=shell+'<script>const DATA='+JSON.stringify(clean).replaceAll('<','\\u003c')+';'+runtime;
if(/localhost|127\.0\.0\.1|\/Users\//i.test(html))throw Error('Private/local reference in release');
fs.mkdirSync(output,{recursive:true});fs.writeFileSync(output+'/index.html',html);
fs.copyFileSync(path.join(path.dirname(source),'food-wheel.svg'),output+'/food-wheel.svg');
for(const file of ['TOP-FOODS.md','GAP-LEDGER.md'])fs.copyFileSync(path.join(path.dirname(source),file),output+'/'+file);
fs.writeFileSync(output+'/MULTI-TARGET-FOODS.md','# Qualified target coverage\n\nDistinct PM–substance connections, not clinical efficacy or nutrient density.\n\n|Food|Qualified targets|\n|---|---:|\n'+clean.foods.map(f=>'|'+f.title+'|'+f.targets+'|').join('\n')+'\n');
console.log('Prepared public snapshot',clean.foods.length,selections.length);
