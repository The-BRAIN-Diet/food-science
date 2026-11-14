import fs from 'node:fs';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
const dir='review/pm-food-source-coverage-2026-11-06';
let checks=0;const check=(value,message)=>{assert.ok(value,message);checks++;};
const records=JSON.parse(fs.readFileSync(dir+'/carnitine-backfill-results.json'));
for(const r of records){const old=matter(fs.readFileSync(`${dir}/before/${r.food_id}-before-carnitine.md`,'utf8')),now=matter(fs.readFileSync(`docs/foods/${r.food_id}.md`,'utf8'));
 for(const key of Object.keys(old.data))if(!['nutrition_supplementary_sources','substance_relationships'].includes(key)){assert.deepEqual(now.data[key],old.data[key],`${r.food_id}:${key} preserved`);checks++;}
 for(const key of ['nutrition_supplementary_sources','substance_relationships']){assert.deepEqual(now.data[key].slice(1),old.data[key]||[]);checks++;}
 check(now.content.startsWith(old.content),`${r.food_id} authored content preserved`);
 const obs=now.data.nutrition_supplementary_sources[0];check(obs.value===r.value&&obs.uncertainty.value===r.se,'Exact measurement and SE');check(obs.source_url===r.source,'Original DOI');check(now.content.includes(obs.source_reference.slice(1)),'Reference anchor');
}
const q=JSON.parse(fs.readFileSync(dir+'/qualified-network.checkpoint.json'));
for(const network of [q.approved,q.candidate]){const seen=new Set(),groups=new Map();for(const e of network.selections){check(e.edge_id===`${e.food_id}|${e.substance_id}|${e.pm_id}`,'Stable edge');check(!seen.has(e.edge_id),'No duplicate edge');seen.add(e.edge_id);check(e.sources.length>0,'Source required');check(Number.isFinite(e.value)&&e.value>=0,'Quantified');const k=e.pm_id+'|'+e.substance_id;groups.set(k,[...(groups.get(k)||[]),e]);}for(const es of groups.values()){check(es.length<=5,'At most five');check(new Set(es.map(e=>e.comparison_group)).size===1,'Comparable group');check(new Set(es.map(e=>e.food_id)).size===es.length,'Distinct foods');}
 for(const a of q.aggregation.filter(a=>a.network===network.selections[0].network)){const es=network.selections.filter(e=>e.food_id===a.food_id);check(a.score===new Set(es.map(e=>e.substance_id+'|'+e.pm_id)).size,'Independent score');check(a.brs_reach===a.brs_numbered_reach+a.brs_x_reach,'System subtotals');}}
const result={status:'PASS',checks,scope:'Checkpoint integrity and five carnitine backfill preservation checks; not full scientific completeness or publication approval',approved_edges:q.approved.selections.length,candidate_edges:q.candidate.selections.length};fs.writeFileSync(dir+'/checkpoint-validation.json',JSON.stringify(result,null,2));console.log(result);
