import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import matter from 'gray-matter';

const [baseline,out] = process.argv.slice(2);
const read = file => JSON.parse(fs.readFileSync(file));
const hash = file => fs.existsSync(file) ? crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex') : null;
const changed = execFileSync('git',['diff','--cached','--name-only','--no-renames','-z',baseline]).toString().split('\0').filter(Boolean);
const scientificChanges = [];
for (const file of changed.filter(f=>f.startsWith('docs/biological-targets/') && /\.mdx?$/.test(f))) {
 let before = {};
 try { before = matter(execFileSync('git',['show',baseline+':'+file],{encoding:'utf8',stdio:['ignore','pipe','ignore']})).data; }
 catch { /* Added page. The release manifest also records the baseline file status. */ }
 const after = fs.existsSync(file) ? matter(fs.readFileSync(file,'utf8')).data : {};
 if (!before.pm_id && !after.pm_id) continue;
 for (const field of new Set([...Object.keys(before),...Object.keys(after)])) {
  if (JSON.stringify(before[field]) !== JSON.stringify(after[field])) scientificChanges.push({file,pm:after.pm_id||before.pm_id,field});
 }
}
const mismatches = {};
for (const [name, entries] of Object.entries({approved:read('system/ranked-food-publication-sources.json').files,snapshot:read('src/data/rankedFoodSources.generated.json').source_hashes})) {
 mismatches[name]=Object.entries(entries).filter(([file,expected])=>hash(file)!==expected).map(([file,expected])=>({file,expected,actual:hash(file)}));
}
const issues=[];
const foodIds=new Map();
for (const file of fs.readdirSync('docs/foods').filter(f=>/\.mdx?$/.test(f))) {
 const fm=matter(fs.readFileSync('docs/foods/'+file,'utf8')).data;
 const id=fm.id||file.replace(/\.mdx?$/,'');
 if(foodIds.has(id))issues.push('Duplicate food ID '+id+' in '+foodIds.get(id)+' and '+file);
 foodIds.set(id,file);
}
const explorer=read('static/explore/pm-explorer/pm-sources.json');
const registry=read('registry/substances.json');
const pms=new Map(explorer.pms.map(p=>[p.id,p]));
for(const row of explorer.foods) {
 if(!foodIds.has(row.food)||!pms.has(row.pm)||!registry[row.substance])issues.push('Unresolved displayed identity '+[row.pm,row.substance,row.food]);
}
for(const [pm,substance,foods] of [['BRS5-FM1-PM1','glutamine',['beef','eggs','tofu']],['BRS5-FM2-PM6','ellagitannins',['walnuts']]]) {
 const rows=explorer.foods.filter(r=>r.pm===pm&&r.substance===substance);
 if(JSON.stringify(rows.map(r=>r.food).sort())!==JSON.stringify(foods)||rows.some(r=>r.rank!=null || (substance==='glutamine' && r.food==='eggs' ? !(r.measurement_kind==='estimated' && r.observations.length===1 && r.observations[0].value===0.559 && r.observations[0].rank_eligible===false && r.observations[0].source_url==='https://doi.org/10.1038/ejcn.2009.110') : r.layer!=='Presence-only, unranked'||r.observations.length||!r.presence_records?.some(p=>p.source_url))))issues.push(pm+' occurrence contract');
}
const pm6=matter(fs.readFileSync(pms.get('BRS5-FM2-PM6').file,'utf8')).data;
const conversion=pm6.dietary_input_assessments.find(r=>r.atom_id==='PM6-DIT-2');
if(conversion?.active_target_id!=='ellagic-acid'||conversion.projection_status!=='blocked')issues.push('Ellagitannin conversion hold');
fs.writeFileSync(path.join(out,'scientific-review.json'),JSON.stringify(scientificChanges,null,2));
fs.writeFileSync(path.join(out,'snapshot-mismatches.json'),JSON.stringify(mismatches,null,2));
console.log(JSON.stringify({changedPMFields:scientificChanges.length,issues:[...new Set(issues)],approvedMismatches:mismatches.approved.length,snapshotMismatches:mismatches.snapshot.length},null,2));
process.exitCode=issues.length||mismatches.approved.length||mismatches.snapshot.length?1:scientificChanges.length?2:0;
