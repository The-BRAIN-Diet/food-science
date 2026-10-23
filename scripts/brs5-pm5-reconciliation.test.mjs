import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import matter from 'gray-matter';
import {load} from 'cheerio';
import {inspectPm5,runRetest,PM5_FILE,REVIEW_DIR} from './run-brs5-pm5-retest.mjs';
import {assessAdmission} from '../src/lib/dietaryInputGovernance.mjs';
import {projectFoodTargets,renderTarget,renderCoverageWarning} from '../src/lib/foodTargetTraceability.mjs';
import {validateInputGovernance} from './lib/dietary-input-governance.mjs';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
import {validatePmReferenceIntegrity} from './lib/pm-reference-index.mjs';
const {pm,data,relationships,rows,queue}=inspectPm5();
const registry=JSON.parse(fs.readFileSync('registry/substances.json'));
const rs=relationships.find(r=>r.input==='Resistant starch'),pectin=relationships.find(r=>r.input==='Pectin'),fos=relationships.find(r=>r.id.endsWith('PM5-DIT-2'));
const studies=pm.data.scientific_findings[0].evidence_considered;
const source=key=>studies.find(s=>s.citation_key===key);

test('RS class passes Capacity/Direct admission; an unsupported product binding does not',()=>{
 assert.equal(assessAdmission(rs,rs.scientific_assessment,{substances:registry}).status,'admitted');
 const product={...rs,input:'Resistant potato starch'};
 assert.ok(assessAdmission(product,rs.scientific_assessment,{substances:registry}).errors.includes('canonical-input-identity-mismatch'));
 const noDependency=structuredClone(rs.scientific_assessment);noDependency.functional_dependency.status='unresolved';
 assert.equal(assessAdmission(rs,noDependency,{substances:registry}).status,'unresolved');
});
test('class evidence is independent of Baxter; its effect remains formulation-specific',()=>{
 assert.ok(rs.scientific_assessment.functional_dependency.sources.some(s=>s.includes('ismej')));
 assert.ok(rs.scientific_assessment.functional_dependency.sources.some(s=>s.includes('200600106')));
 const b=source('baxter_fermentable_fibers_2019');
 assert.match(b.study_exposure,/potato starch/);assert.match(b.study_finding,/resistant potato\s+starch/);
 assert.doesNotMatch(rs.biological_role,/increased.*butyrate/i);
 assert.match(rs.limitation,/does not establish an equivalent butyrate response/);
});
test('verified class composition sources retain preparation and no inherited efficacy',()=>{
 assert.deepEqual(rs.food_targets.map(f=>f.food_id).sort(),['bananas','black-beans','chickpeas','potatoes']);
 for(const f of rs.food_targets){assert.equal(f.mapping_status,'verified');assert.ok(f.preparation);assert.doesNotMatch(renderTarget(f),/food-target-info/);}
 assert.match(rs.food_targets.find(f=>f.food_id==='potatoes').preparation,/chill|cool/i);
 for(const r of rows.filter(r=>r.canonical_substance_id==='resistant-starch'))assert.ok(r.limitations.some(x=>x.includes('does not establish an equivalent butyrate response')));
 assert.equal(queue.some(q=>q.target_entity==='resistant-starch'),false);
});
test('van Trijp anatomical null, measured concentrations, separate product tracer and inference remain distinct',()=>{
 const v=source('van_trijp_intraintestinal_2024');assert.equal(v.data_level,'Human Study');
 assert.match(v.study_finding,/distal-ileal/);assert.match(v.study_finding,/One proximal-colonic participant/);assert.match(v.study_finding,/unlabelled SCFA concentrations/);
 assert.match(v.study_finding,/do not directly measure FOS\/GOS-to-SCFA conversion/);
 assert.match(v.assessment.limitations,/does not disprove colonic fermentation/);
 assert.match(v.assessment.limitations,/indirect/);assert.match(v.assessment.limitations,/inferred, not direct/);
});
test('Pascale is secondary synthesis, Bang primary cultures with material/medium limits',()=>{
 const r=source('pascale_potential_2022'),b=source('bang_pectin_2018');
 assert.match(r.study_exposure,/Secondary systematic-review/);assert.match(r.assessment.retrieval_scope,/Systematic-review full text/);
 assert.doesNotMatch(r.assessment.retrieval_scope,/Primary abstract/);
 assert.match(b.study_exposure,/purified citrus-peel/);assert.match(b.assessment.population,/Three.*male.*rumen fluid/);
 assert.match(b.assessment.limitations,/whole apples.*not tested/);
 assert.match(pectin.limitation,/not equivalent/);
});
test('FOS/GOS historical mixture remains visible but cannot be readmitted or exported',()=>{
 assert.equal(fos.scientific_assessment.type,'A');assert.equal(fos.scientific_assessment.classification,'direct');
 assert.equal(fos.scientific_admission,'unresolved');assert.equal(fos.scientific_assessment.review_required,true);
 assert.ok(fos.input.includes('studied preparation'));assert.equal(fos.dietary_input,true);
 assert.equal(rows.some(r=>r.canonical_substance_id==='fructo-galacto-oligosaccharides'),false);
 assert.match(fos.coverage_warnings.join(' '),/Scientific admission requires review/);
 const pretendAdmitted=structuredClone(fos.scientific_assessment);pretendAdmitted.status='admitted';
 assert.equal(assessAdmission(fos,pretendAdmitted,{substances:registry}).status,'unresolved');
 assert.ok(pm.data.dietary_input_reconciliation_history.some(h=>h.previous_record.atom_id==='PM5-DIT-2'));
});
test('documented review is not a gate bypass or an undocumented unresolved record',()=>{
 const issues=[];validateInputGovernance(pm.data,issues,{content:pm.content,entityLabel:pm.data.pm_id});assert.deepEqual(issues,[]);
 const copy=structuredClone(pm.data);delete copy.dietary_input_assessments[1].review_reason;
 const bad=[];validateInputGovernance(copy,bad,{content:pm.content,entityLabel:pm.data.pm_id});assert.ok(bad.some(i=>i.code==='input_admission_unresolved'));
});
test('apple source remains provisional with one pending-link warning, icon and actionable request',()=>{
 const a=pectin.food_targets.find(f=>f.food_id==='apples');assert.equal(a.mapping_status,'research-supported-provisional');
 const $=load(renderTarget(a));assert.equal($('.food-target-info').length,1);assert.equal($('a').first().attr('style'),undefined);
 assert.match($('.food-target-info').attr('title'),/Apples.*Pectin: food ontology link pending/);
 assert.ok(a.evidence.sources.some(s=>s.includes('125410')));assert.match(a.limitations,/No per-100-g/);
 assert.equal(queue.filter(q=>q.source_entity==='apples'&&q.target_entity==='pectin').length,1);
 const food=matter(fs.readFileSync('docs/foods/apples.md','utf8')).data;
 assert.equal(JSON.stringify(food.substance_relationships||[]).toLowerCase().includes('pectin'),false);
});
test('PM-scoped composition research does not alter another PM admission or food display',()=>{
 const ledger=JSON.parse(fs.readFileSync('system/food-target-research.json')).targets;
 const a=ledger.find(f=>f.food_id==='apples'&&f.substance_id==='pectin');assert.deepEqual(a.pm_ids,['BRS5-FM2-PM5']);
 const another={...pectin,pm:'BRS5-FM1-PM1'};
 const p=projectFoodTargets({relationships:[another],substances:registry,research:ledger,foodSources:[]});assert.equal(p.relationships[0].food_targets.length,0);
});
test('inulin remains unadmitted and no direct butyrate food source is inferred',()=>{
 assert.equal(rows.some(r=>r.canonical_substance_id==='inulin'),false);
 assert.equal(rows.some(r=>r.canonical_substance_id==='butyrate'),false);
 assert.equal(rows.some(r=>r.delivery==='direct-input-source'&&/butyrate/i.test(r.dietary_input)),false);
});
test('source/result duplicates and generated Scientific Findings agree exactly',()=>{
 for(const s of studies){assert.equal(s.directional_finding,s.study_finding);assert.equal(s.study_finding,s.assessment.result);assert.equal(s.assessment.result,s.assessment.evidence_summary);assert.equal(s.study_exposure,s.assessment.study);}
 assert.ok(pm.content.includes(expectedFindingsSection(pm.data,pm.content).block));
 const issues=[];validatePmReferenceIntegrity(pm.data.references,pm.content,issues,{entityLabel:pm.data.pm_id});assert.deepEqual(issues,[]);
});
test('mission, downstream finding, scores, food/registry records and historical provenance remain intact',()=>{
 const old=matter(execFileSync('git',['show','96b08913b917fffb8c96862ac4aab50a46a8d4fe:'+PM5_FILE],{encoding:'utf8'})).data;
 assert.equal(pm.data.mission,old.mission);assert.deepEqual(pm.data.scientific_findings[1],old.scientific_findings[1]);assert.deepEqual(pm.data.phenome_relationships,old.phenome_relationships);
 assert.ok(pm.data.scientific_findings.every(f=>f.synthesised_evidence_confidence==='not-yet-scored'));
 const changed=execFileSync('git',['diff','--name-only','96b08913b917fffb8c96862ac4aab50a46a8d4fe'],{encoding:'utf8'}).trim().split('\n');
 assert.equal(changed.some(f=>/^(docs\/foods\/|registry\/|system\/sec)/.test(f)),false);
 for(const h of pm.data.dietary_input_reconciliation_history)assert.deepEqual(h.previous_record,old.dietary_input_traceability.find(a=>a.atom_id===h.previous_record.atom_id));
});
test('actual PM MDX and Finding component compile; warning precedes precisely six atoms',async()=>{
 const result=await runRetest();assert.equal(result.status,'PASS WITH LIMITATIONS');assert.ok(result.checks.every(c=>c.pass));
 const $=load(fs.readFileSync(REVIEW_DIR+'/controlled-render.html','utf8'));
 const p=$('[data-atom="PM5-DIT-3"]');assert.equal(p.find('[data-atom-key]').length,6);
 assert.equal(p.find('details').first().children().eq(1).attr('class'),'food-target-coverage-warning');
 assert.match(p.find('.food-target-coverage-warning').text(),/Apples.*Pectin: food ontology link pending/);
 assert.equal(p.find('.food-target-info').length,1);
 const actual=fs.readFileSync(REVIEW_DIR+'/compiled-pm.html','utf8');assert.match(actual,/Secondary systematic-review/);assert.match(actual,/Separately infused labelled SCFAs/);assert.match(actual,/bovine rumen fluid/);
});
