import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import cp from 'node:child_process';import matter from 'gray-matter';import {fileURLToPath} from 'node:url';
import {buildInputSubstanceFood} from '../../scripts/lib/input-substance-food.mjs';
import {selectRankedFoodSources} from '../../src/data/rankedFoodSources.mjs';
import {partitionPublicationSources} from '../../scripts/lib/ranked-publication-sources.mjs';
import {attributeSharedReferencePanels} from '../../scripts/lib/shared-reference-attribution.mjs';
import {assessAdmission} from '../../src/lib/dietaryInputGovernance.mjs';
import {scoreFoods} from '../analytical-rollup/score.mjs';
const dir=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(dir,'../..'),hash=x=>crypto.createHash('sha256').update(x).digest('hex'),read=f=>JSON.parse(fs.readFileSync(path.join(root,f))),git=(...a)=>cp.execFileSync('git',a,{cwd:root,encoding:'utf8'}).trim();process.chdir(root);
const config=JSON.parse(fs.readFileSync(dir+'/config.v1.json')),manifest=read('system/ranked-food-publication-sources.json'),policy=read('system/ranked-food-source-policy.json'),registry=read('registry/substances.json');
const before=process.argv.includes('--before');
const m=before ? JSON.parse(fs.readFileSync(dir+'/intake-map.json')) : buildInputSubstanceFood(root,{brs:'BRS-X',includeProfileConstituents:true,analysisCompositionOnly:false});
const pmIds=new Set(m.coverage.filter(c=>c.record.includes('/ecs/')).map(c=>c.pm_id));
const allRelationships=m.relationships;
m.coverage=m.coverage.filter(c=>pmIds.has(c.pm_id));
m.relationships=m.relationships.filter(r=>pmIds.has(r.pm));
const relevantSubstances=new Set(m.relationships.map(r=>r.substance_id).filter(Boolean));
m.food_sources=m.food_sources.filter(s=>relevantSubstances.has(s.substance_id));
const scopedGap=g=>g.pm_id?pmIds.has(g.pm_id):g.relationship_id?m.relationships.some(r=>r.id===g.relationship_id):g.substance_id?relevantSubstances.has(g.substance_id):g.food_id?m.food_sources.some(s=>s.food_id===g.food_id):false;
const rules=['system/dietary-input-historical-baseline.json','system/dietary-input-identity-reconciliations.json','system/ranked-food-publication-sources.json','system/ranked-food-source-policy.json','src/data/rankedFoodSources.generated.json','src/data/rankedFoodSources.mjs','src/data/relatedSubstanceRelationships.mjs','src/lib/aggregateFoodComposition.mjs','src/lib/aminoAcidProfileSources.mjs','scripts/lib/input-substance-food.mjs','scripts/lib/dietary-input-governance.mjs','src/lib/dietaryInputGovernance.mjs','scripts/lib/ranked-publication-sources.mjs','scripts/lib/shared-reference-attribution.mjs'];
const source_hashes=Object.fromEntries([...new Set([...m.source_records,...rules,'review/brsx-ecs-analytical-rollup-2026-11-17/config.v1.json','review/analytical-rollup/score.mjs','review/brsx-ecs-analytical-rollup-2026-11-17/run.mjs','review/brsx-ecs-analytical-rollup-2026-11-17/usda-exact-source-extract.json','review/brsx-ecs-analytical-rollup-2026-11-17/validate.mjs','review/brsx-ecs-analytical-rollup-2026-11-17/report.mjs'])].filter(f=>fs.existsSync(f)).sort().map(f=>[f,hash(fs.readFileSync(f))]));
if(before)Object.assign(source_hashes,JSON.parse(fs.readFileSync(dir+'/intake.json')).hashes);
const publicationByFile=Object.fromEntries([...new Set(m.food_sources.map(s=>s.food_record))].map(f=>[f,!manifest.files[f]?'unlisted-excluded':source_hashes[f]===manifest.files[f]?'pin-matched':'listed-publication-pin-pending']));
const admissions=[];
function admission(r,visited=new Set()){
 if(visited.has(r.id))return {eligible:false,basis:'supply cycle'};visited.add(r.id);
 if(r.dietary_input!==true)return {eligible:false,basis:'dietary input is not Yes'};
 if(!r.substance_id)return {eligible:false,basis:'unresolved dietary identity'};
 if(r.network_activation==='held'||r.projection_status==='held')return {eligible:false,basis:'publication hold'};
 if(['unresolved','rejected'].includes(r.scientific_assessment?.status))return {eligible:false,basis:'explicit '+r.scientific_assessment.status};
 if(r.scientific_assessment?.status==='admitted'){let a=assessAdmission(r,r.scientific_assessment,{substances:registry});if(a.status==='admitted')return {eligible:true,basis:'explicit assessment',assessment:a};return {eligible:false,basis:'assessment validation unresolved',assessment:a};}
 if(r.historical_admission)return {eligible:true,basis:'valid preserved historical fingerprint'};
 if(r.accounting==='B'){const owners=r.upstream.flatMap(u=>u.relationship_ids||[]).map(id=>allRelationships.find(x=>x.id===id)).filter(Boolean);if(owners.some(o=>admission(o,new Set(visited)).eligible))return {eligible:true,basis:'explicit upstream supply reference to admitted owner',owners:owners.map(o=>o.id)};}
 if(r.accounting==='C'&&r.members.some(x=>x.membership==='admitted'&&x.source_record))return {eligible:true,basis:'established KC applicability and admitted constituent',members:r.members};
 return {eligible:false,basis:'no explicit/preserved admission or established supply route'};
}
for(const r of m.relationships)admissions.push({...r,admission:admission(r)});
const eligible=admissions.filter(r=>r.admission.eligible&&['A','B','C','D'].includes(r.accounting));
const docs=fs.readdirSync('docs/foods').filter(f=>/\.mdx?$/.test(f)).map(f=>matter(fs.readFileSync('docs/foods/'+f,'utf8')).data);const panels=new Map();for(const d of docs){if(d.retired_identity||!d.nutrition_source?.fdc_id)continue;let s=d.nutrition_source,key=[s.database,s.fdc_id,s.food_name,s.basis].join('|');if(!panels.has(key))panels.set(key,[]);panels.get(key).push(d.id);}
const duplicates=[...panels].filter(([,ids])=>ids.length>1).map(([source,food_ids])=>({source,food_ids}));
const partition=partitionPublicationSources(m.food_sources,manifest),sources=attributeSharedReferencePanels(partition.eligible,duplicates,policy);
const pools=[],rows=[],excluded=[];
for(const sub of [...new Set(eligible.map(r=>r.substance_id))].sort()){
 const sourcePool=sources.filter(s=>s.substance_id===sub),out=selectRankedFoodSources(sourcePool,Number.MAX_SAFE_INTEGER,{retainFoodForms:true});
 const selected=out.selected.filter(r=>r.relative_power>=config.minimum_rsp_inclusive);
 pools.push({substance_id:sub,source_count:sourcePool.length,observation_count:sourcePool.flatMap(s=>s.observations).length,comparisons:out.comparisons,scored_at_least_10:out.selected.length,retained_at_least_20:selected.length,candidates:out.selected});
 excluded.push(...out.excluded.map(x=>({...x,substance_id:sub})),...out.selected.filter(r=>r.relative_power<20).map(r=>({...r,substance_id:sub,reason:'Below inclusive analytical RSP 20'})));
 for(const r of selected){const s=sourcePool.find(s=>s.id===r.source_id);for(const rel of eligible.filter(x=>x.substance_id===sub)){
 const held=policy.target_holds.find(h=>h.target_id===rel.pm+'|'+sub);if(held){excluded.push({substance_id:sub,food_id:r.food_id,pm_id:rel.pm,reason:held.reason});continue;}
 rows.push({row_id:rel.id+'|'+r.observation.record,brs:config.scope,pm_id:rel.pm,relationship_id:rel.id,admission_basis:rel.admission.basis,accounting:rel.accounting,substance_id:sub,food_id:r.food_id,food_name:s.food_title,rsp:r.relative_power,comparison_group:r.comparison_group,material:r.observation.material||s.material,preparation:r.preparation,amount:r.observation.value,unit:r.observation.unit,basis:r.observation.basis,source_id:r.source_id,source_record:r.observation.record,food_record:s.food_record,publication_status:publicationByFile[s.food_record],observation:r.observation,source_evidence:s.presence_records,analytically_excluded:config.excluded_from_score.includes(sub)});
 }}
}
const rankings=scoreFoods(rows,config),strict=scoreFoods(rows.filter(r=>r.publication_status==='pin-matched'),config);
const output={before_corrections:before,baseline_map_sha256:before?hash(fs.readFileSync(dir+'/intake-map.json')):null,qualified_source_records:sources,contextual_nonadmitted_sources:sources.filter(s=>!eligible.some(r=>r.substance_id===s.substance_id)),duplicate_panels:duplicates,snapshot:{checkout:root,branch:git('branch','--show-current'),commit:git('rev-parse','HEAD'),working_tree:git('status','--short'),source_hashes,input_hash:hash(JSON.stringify(source_hashes)),frozen_snapshot_id:read('src/data/rankedFoodSources.generated.json').snapshot_id},config,counts:{pms:m.coverage.length,relationships:m.relationships.length,eligible:eligible.length,substances:pools.length,component_rows:rows.length,after_sodium:rows.filter(r=>!r.analytically_excluded).length},admissions,pools,rows,excluded,publication_exclusions:partition.excluded,publicationByFile,rankings,strict_pin_matched_row_sensitivity:strict,coverage:m.coverage,gaps:m.gaps.filter(scopedGap),conflicts:m.conflicts.filter(scopedGap),unscored_sources:sources.filter(s=>!rows.some(r=>r.source_id===s.id)).filter(s=>eligible.some(r=>r.substance_id===s.substance_id))};
fs.writeFileSync(dir+(before?'/before-corrections-analysis.json':'/analysis.json'),JSON.stringify(output,null,2)+'\n');console.log(output.counts);console.log(Object.fromEntries(Object.entries(rankings).map(([k,v])=>[k,v.length])));console.log(rankings.combined.slice(0,8).map(r=>[r.food_id,r.score]));
