import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {reconcileFoodTargets,verifiedFoodTarget} from '../src/lib/foodTargetReconciliation.mjs';
import {canonicalContainsRelationships} from '../src/data/foodSubstanceRelationships.mjs';
import {buildInputSubstanceFood,normalize} from './lib/input-substance-food.mjs';
import {inputEligibility,assessAdmission} from '../src/lib/dietaryInputGovernance.mjs';
const root=process.cwd(),dir='system/generated/dietary-food-targets';fs.mkdirSync(dir,{recursive:true});
const reports=[],queue=new Map(),rollup=[],materialReviews=[],registry=JSON.parse(fs.readFileSync('registry/substances.json'));
function mergeQueue(q){const key=JSON.stringify([q.source_entity,q.target_entity,q.relationship_type,q.material,q.preparation]);const old=queue.get(key);if(old){old.affected_pms=[...new Set([...old.affected_pms,...q.affected_pms])];old.evidence=[...new Map([...old.evidence,...q.evidence].map(e=>[JSON.stringify(e),e])).values()];}else queue.set(key,q);}
for(let n=1;n<=6;n++) {
 const data=buildInputSubstanceFood(root,{brs:`BRS${n}`});
 data.cursor_queue.forEach(mergeQueue);rollup.push(...data.manuscript_rows);
 materialReviews.push(...data.manuscript_rows.filter(r=>r.material_equivalence_status==='review-required'));
 for(const r of data.relationships.filter(r=>r.presentations?.some(p=>p.section==='3.1.1'))) {
  const e=inputEligibility(r.input_type,'3.1.1',r.input);
  if(e.eligible&&r.ontology_connections?.identity==='unresolved')mergeQueue({source_entity:r.id,target_entity:r.input,relationship_type:'identity-resolution',canonical_ids:{substance:r.substance_id||null},candidate_food:null,material:null,preparation:null,evidence:[r.evidence],affected_pms:[r.pm],missing_edge:`${r.id} → canonical substance/substrate identity`,required_action:'Resolve against existing identities and aliases. Do not create duplicates or reapprove the PM admission.',verification_status:'requires-identity-reconciliation'});
  if(e.eligible&&r.ontology_connections?.conversion==='unresolved')mergeQueue({source_entity:r.substance_id||r.id,target_entity:r.derived_target||r.scientific_assessment?.active_target_id||'Active target unresolved',relationship_type:'precursor-conversion',canonical_ids:{precursor:r.substance_id||null,active_target:r.scientific_assessment?.active_target_id||null},candidate_food:null,material:null,preparation:null,evidence:[r.evidence],affected_pms:[r.pm],missing_edge:`${r.input} → ${r.derived_target||'active target'}: structured conversion pathway`,required_action:'Independently verify active identity, intermediates, conversion evidence and dependencies; preserve the historical scientific decision. No automatic food or pathway edge.',verification_status:'requires-pathway-reconciliation'});

  if(!e.eligible||r.admission_errors?.length||r.food_target_mapping==='unresolved')reports.push({pm:r.pm,id:r.id,input:r.input,eligibility:e,admission_basis:r.admission_basis,issues:r.admission_errors,ontology_connections:r.ontology_connections,food_target_mapping:r.food_target_mapping,action:'Historical admission preserved. Reconcile only in an approved PM-specific assessment.'});
 }
}
// Retain researched edge proposals even when no PM currently admits the precursor.
const research=JSON.parse(fs.readFileSync('system/food-target-research.json')).targets;
// Check the actual canonical food file even when no PM currently admits this precursor.
const canonicalResearch=[];
for(const f of research) {
 const file=path.join(root,'docs/foods',f.food_id+'.md');
 if(!fs.existsSync(file))continue;
 const data=matter(fs.readFileSync(file,'utf8')).data;
 for(const edge of canonicalContainsRelationships(data)) {
  const id=Object.entries(registry).find(([id,s])=>[id,s.title,...s.aliases||[]].some(name=>normalize(name)===normalize(edge.substance)))?.[0];
  if(id!==f.substance_id)continue;
  const source={food_id:f.food_id,substance_id:id,relationship:edge.relationship==='direct-food-occurrence'?'contains':edge.relationship,material:edge.evidence_material||data.nutrition_source?.food_name||data.title,preparation:Object.hasOwn(edge,'preparation_state')?edge.preparation_state:data.preparation_state||data.food_identity?.preparation||null,presence_records:[{record:`docs/foods/${f.food_id}.md#substance_relationships/${encodeURIComponent(edge.substance)}`,evidence:edge.evidence_source||edge.evidence_basis||null,citation_keys:edge.citation_keys||[],source_url:edge.source_url||null,source_reference:edge.source_reference||null,limitations:edge.material_limitations||edge.description||null}]};
  const verified=verifiedFoodTarget(source);if(verified)canonicalResearch.push(verified);
 }
}
const ledgerReconciliation=reconcileFoodTargets([...canonicalResearch,...research.map(f=>({...f,relationship:'contains',mapping_status:'research-supported-provisional'}))]);
for(const f of ledgerReconciliation.foods.filter(f=>f.mapping_status==='research-supported-provisional')) {
 const review=f.material_equivalence_status==='review-required';
 mergeQueue({source_entity:f.food_id,target_entity:f.substance_id,relationship_type:review?'material-equivalence-review':'contains',canonical_ids:{food:f.food_id,substance:f.substance_id},candidate_food:f.food_title,material:f.material,preparation:f.preparation,evidence:[f.evidence],affected_pms:rollup.filter(r=>r.canonical_substance_id===f.substance_id).map(r=>r.pm).filter((p,i,a)=>a.indexOf(p)===i),missing_edge:review?`${f.food_id} → ${f.substance_id}: material equivalence unverified; not a confirmed missing edge`:`docs/foods/${f.food_id}.md#substance_relationships: contains ${f.substance_id} (${f.preparation}; ${f.material})`,required_action:review?'Verify material/preparation and provenance equivalence against the existing edge before proposing any ontology repair.':'Cursor must independently verify the cited evidence and exact material before creating an ontology edge. No PM admission implied.',verification_status:review?'requires-material-equivalence-review':'pending-independent-verification'});
}
fs.writeFileSync(path.join(dir,'research-ledger-reconciliation.json'),JSON.stringify({qualification:'Research ledger history retained unchanged. Matching does not independently revalidate composition science.',resolved:ledgerReconciliation.resolutions,remaining:ledgerReconciliation.foods.filter(f=>f.mapping_status==='research-supported-provisional')},null,2)+'\n');
fs.writeFileSync(path.join(dir,'material-equivalence-reviews.json'),JSON.stringify(materialReviews,null,2)+'\n');
fs.writeFileSync(path.join(dir,'cursor-repair-queue.json'),JSON.stringify({schema_version:1,items:[...queue.values()]},null,2)+'\n');
fs.writeFileSync(path.join(dir,'manuscript-rollup.json'),JSON.stringify({schema_version:1,qualification:'Historical admissions retained as recorded; new gates have not scientifically reapproved them. Food delivery is not PM efficacy.',records:rollup},null,2)+'\n');
// Preserve the combined export locally; commit per-BRS shards under the repository's 1 MiB file limit.
for(let n=1;n<=6;n++) fs.writeFileSync(path.join(dir,`manuscript-rollup-brs${n}.json`),JSON.stringify({schema_version:1,qualification:'Historical admissions preserved; food delivery is not PM efficacy.',records:rollup.filter(r=>r.brs===`BRS${n}`)},null,2)+'\n');
fs.writeFileSync(path.join(dir,'reconciliation.json'),JSON.stringify(reports,null,2)+'\n');
const cell=v=>String(v??'').replaceAll('|','/').replaceAll('\n',' ');
fs.writeFileSync(path.join(dir,'cursor-repair-summary.md'),'# Food ontology repair queue\n\nOutstanding food-edge, material-equivalence, identity and conversion tasks. Material reviews do not establish a missing edge. Cursor must independently verify every proposed repair; none is written automatically. Empty affected-PM lists mean prospective coverage rather than a new PM admission.\n\n| Food | Substance | Preparation | Affected PMs | Verification |\n|---|---|---|---|---|\n'+[...queue.values()].map(q=>'| '+[q.candidate_food||q.source_entity,q.target_entity,q.preparation,q.affected_pms.join(', ')||'No current admitted input',q.verification_status].map(cell).join(' | ')+' |').join('\n')+'\n');
console.log(JSON.stringify({rollup_records:rollup.length,repair_items:queue.size,reconciliation_records:reports.length}));
