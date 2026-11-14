/** Bounded controlled scientific test. Does not write PMs, admissions, ontology edges or scores. */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
import {projectFoodTargets,renderTarget,renderCoverageWarning,escapeHtml} from '../src/lib/foodTargetTraceability.mjs';
import {assessAdmission} from '../src/lib/dietaryInputGovernance.mjs';
const dir='review/brs5-pm5-controlled-2026-10-23';
const file='docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx';
const pm=matter(fs.readFileSync(file,'utf8')).data;
const mapping=buildInputSubstanceFood(process.cwd(),{brs:'BRS5'});
const target=mapping.relationships.filter(r=>r.pm===pm.pm_id&&r.presentations.some(p=>p.section==='3.1.1'));
const registry=JSON.parse(fs.readFileSync('registry/substances.json'));
const research=JSON.parse(fs.readFileSync(path.join(dir,'scoped-food-research.json')));
const existing=JSON.parse(fs.readFileSync('system/food-target-research.json')).targets;
const projection=projectFoodTargets({relationships:target,substances:registry,research:[...existing,...research],foodSources:mapping.food_sources});
const study=pm.scientific_findings[0].evidence_considered;
const evidence=(statement,sources)=>({status:'established',statement,sources});
const assessed=target.map(r=>{
 const source=r.input==='Pectin'?'https://pmc.ncbi.nlm.nih.gov/articles/PMC6004267/':r.input==='Resistant potato starch'?'https://journals.asm.org/doi/10.1128/mbio.02566-18':'https://pmc.ncbi.nlm.nih.gov/articles/PMC10901090/';
 const draft={atom_id:r.id.split('::')[1],status:'admitted',type:'A',classification:'direct',operation:pm.mission,canonical_substance_id:r.substance_id,functional_dependency:evidence('The identified carbohydrate supplies microbial fermentation capacity; not nutritional indispensability or a guaranteed increase in butyrate.',[source]),dietary_supply:evidence('The specified input was administered experimentally or has separately supported qualitative food supply.',r.input==='Pectin'?['https://pubmed.ncbi.nlm.nih.gov/37327923/']:[source]),food_target_research:{completed:true,sources_examined:['registry/substances.json',file,'docs/foods/apples.md','docs/foods/chicory-root.md','system/food-target-research.json'],targeted_searches:[path.join(dir,'retrieval-log.json')]}};
 return {input:r.input,type:'A',classification:'direct',canonical_id:r.substance_id,historical_admission:r.scientific_admission,prospective_assessment:assessAdmission(r,draft,{substances:registry}),draft_test_metadata:draft,qualification:'Test metadata only; existing PM admissions have not been rewritten or newly approved.'};
});
const potato=projection.relationships.find(r=>r.input==='Resistant potato starch');
const exposureMismatch=potato.food_targets.filter(f=>!/potato.*starch.*(?:type.?2|native|unmodified|raw)/i.test([f.material,f.preparation].join(' ')));
const fos=study.find(s=>s.citation_key==='van_trijp_intraintestinal_2024');
const pectin=study.find(s=>s.citation_key==='pascale_potential_2022');
const checks=[
 {id:'specific-input-food-exposure',pass:exposureMismatch.length===0,detail:'Generic resistant-starch composition must not be presented as supply of the specific potato-RS2 intervention.',affected_foods:exposureMismatch.map(f=>f.food_id)},
 {id:'fos-gos-source-site-and-tracer',pass:/ileum/i.test(JSON.stringify(fos))&&/infus/i.test(JSON.stringify(fos)),detail:'The source assessment must preserve the sampled-site null and distinguish SCFA infusion from substrate conversion.'},
 {id:'pectin-evidence-publication-type',pass:/systematic review/i.test([pectin.study_exposure,pectin.assessment?.study,pectin.assessment?.limitations].join(' ')),detail:'Pascale is review-level evidence, not independent primary cellular replication.'},
 {id:'pectin-provisional-food-display',pass:projection.relationships.find(r=>r.input==='Pectin').food_targets.some(f=>f.food_id==='apples'&&f.mapping_status==='research-supported-provisional'),detail:'Target-scoped food research recovers credible apple pectin composition without writing a canonical edge.'},
 {id:'no-stale-rs-composition-queue',pass:!projection.cursor_queue.some(q=>q.target_entity==='resistant-starch'&&q.relationship_type==='contains'),detail:'Existing verified class-level edges remain recognised; trial matching is a different question.'},
 {id:'inulin-not-auto-admitted',pass:!projection.manuscript_rows.some(r=>r.canonical_substance_id==='inulin'),detail:'A researched prospective input is not automatically admitted into the unchanged PM.'}
];
const screened=projection.manuscript_rows.map(r=>{
 if(r.dietary_input!=='Resistant potato starch')return {...r,scientific_export_qualification:'Conditional substrate supply, not an established whole-food butyrate or brain effect.'};
 return {...r,food_target:null,food_title:null,food_material:null,food_evidence:null,reconciled_sources:[],material_equivalence_status:null,material_equivalence_reason:null,ontology_relationship_status:'input-exposure-unresolved',ontology_connections:{...r.ontology_connections,food:'unresolved'},mapping_status:'unresolved',preparation:null,missing_ontology_edge:null,prospective_admission_status:'unresolved',canonical_identity_scope:'Existing resistant-starch parent class; binding to the specific assessed preparation remains unresolved',scientific_export_qualification:'Food supply of the trial-specific potato RS2 material is not established by the generic resistant-starch food edge. This does not invalidate class-level composition.',related_family_foods:potato.food_targets.map(f=>({food_id:f.food_id,material:f.material,preparation:f.preparation,mapping_status:f.mapping_status})),related_family_mapping_status:r.mapping_status};
});
// A single unresolved material-specific supply record replaces misleading multiple parent-class food matches.
const usable=[...new Map(screened.map(r=>[JSON.stringify([r.pm,r.dietary_input,r.food_target]),r])).values()];
const queue=[...projection.cursor_queue,{source_entity:'PM5-DIT-1',target_entity:'resistant-starch',relationship_type:'exposure-specificity-review',canonical_ids:{parent_substance:'resistant-starch'},candidate_food:null,material:'Trial-specific unmodified potato RS2',preparation:'Not interchangeable with cooked/cooled RS3',evidence:['https://journals.asm.org/doi/10.1128/mbio.02566-18'],affected_pms:[pm.pm_id],missing_edge:'Specific assessed input → exposure-matched food/formulation identity is unresolved; existing class food edges are not missing.',required_action:'Resolve scientific input granularity and trial/material linkage before exporting ordinary-food targets; do not fabricate an edge or infer equivalent effect.',verification_status:'requires-scientific-input-reconciliation'}];
const result={baseline:'96b08913b917fffb8c96862ac4aab50a46a8d4fe',pm_id:pm.pm_id,title:pm.title,mission:pm.mission,stage2a:'bounded source adjudication complete; material issues recorded',stage2b:'controlled extraction run; current canonical PM is not cleared for rapid export',status:checks.every(c=>c.pass)?'PASS WITH LIMITATIONS':'BLOCK',checks,gate_results:assessed.map(x=>({input:x.input,...x.prospective_assessment})),raw_rows:projection.manuscript_rows.length,screened_rows:usable.length,scope:'Scoped research/adjudication test only. Canonical decisions, PM source, food records, registry, governance and scores remain unchanged.'};
for(const[name,data]of Object.entries({'controlled-result.json':result,'stage2b-assessment.json':assessed,'raw-target-extraction.json':projection.manuscript_rows,'scientifically-screened-manuscript.json':usable,'related-rs-family-foods.json':{qualification:'Verified class composition only; not food supply of trial-specific potato RS2 or evidence of equivalent butyrate response',foods:potato.food_targets},'target-repair-queue.json':queue}))fs.writeFileSync(path.join(dir,name),JSON.stringify(data,null,2)+'\n');
const html='<!doctype html><meta charset="utf-8"><title>BRS5 PM5 controlled evidence test</title><style>body{font:17px/1.6 system-ui;max-width:1000px;margin:2em auto}section{border-top:1px solid #bbb;padding:1em}a{color:#16634c}</style><h1>'+escapeHtml(pm.pm_id+' — '+pm.title)+'</h1><p>Controlled test: BLOCK. Diagnostic rendering only; no canonical PM change or approved food-efficacy claim.</p>'+projection.relationships.map(r=>{
 const warnings=[...r.coverage_warnings];if(r.input==='Resistant potato starch')warnings.unshift('Resistant potato starch → foods: specific trial-exposure match unresolved; verified parent-class foods below are not trial-matched supplies.');
 const atoms=[['Input',r.input],['Input type',r.input_type],['Biological role',r.biological_role],['Evidence source',JSON.stringify(r.evidence)],['Limitation',r.limitation],['Dietary input',r.dietary_input?'Yes':'Unset']];
 return '<section><h2>'+escapeHtml(r.input)+'</h2><details open><summary>Six scientific atoms</summary>'+renderCoverageWarning(warnings)+atoms.map(([k,v])=>'<p><b>'+k+'</b> = '+escapeHtml(v)+'</p>').join('')+'</details><p>Type A — Direct to microbial production; downstream metabolite signalling would require a separate Derived assessment.</p><details open><summary>Food composition targets — diagnostic scope</summary><ul>'+r.food_targets.map(f=>'<li>'+renderTarget(f)+'</li>').join('')+'</ul></details></section>';
}).join('');
fs.writeFileSync(path.join(dir,'controlled-render.html'),html);
console.log(JSON.stringify(result,null,2));
if(result.status==='BLOCK')process.exitCode=1;
