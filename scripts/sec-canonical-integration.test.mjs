import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import matter from 'gray-matter';
import {compile} from '@mdx-js/mdx';
import {loadSecRegistry,validateSecRegistry,resolveSecAssessment,secTotals} from './lib/sec-assessments.mjs';
import {checkScientificFindings,authoredFindingLessons} from './lib/scientific-findings-gate.mjs';
import {validateScientificFindings} from './lib/scientific-findings.mjs';
import {validateDietaryLeverAtoms} from './lib/dietary-lever-atoms.mjs';
import {buildDietaryLeverDisclosureMap,dietaryLeverBulletKey} from './lib/dietary-lever-disclosure.mjs';
import {validatePmReferenceIntegrity,replacePmReferencesSection,renderNumberedPmReferencesSection} from './lib/pm-reference-index.mjs';

const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const review=json('review/sec-integration/reconciliation.json'),history=json('system/sec-assessments/integration-history.json');
const registry=loadSecRegistry(),records=json('review/sec-integration/assessments.json');
const pages=review.records.map(r=>({...r,...matter(read(r.canonical)),before:matter(read(history.archives.find(a=>a.pmId===r.pmId).path))}));

test('exactly three canonical PMs changed; source archives match baseline bytes and hashes',()=>{
  const changed=execFileSync('git',['diff','--name-only','--','docs/biological-targets'],{encoding:'utf8'}).trim().split('\n').sort();
  assert.deepEqual(changed,pages.map(p=>p.canonical).sort());
  for(const a of history.archives) {
    const p=pages.find(p=>p.pmId===a.pmId),source=read(a.path);
    assert.equal(createHash('sha256').update(source).digest('hex'),a.sha256);
    assert.equal(source,execFileSync('git',['show',history.baseline+':'+p.canonical],{encoding:'utf8',maxBuffer:10e6}));
  }
});

test('all accepted propositions are pinned; every earlier pilot snapshot and score is retained',()=>{
  assert.deepEqual(validateSecRegistry(registry),[]);
  assert.equal(pages.flatMap(p=>p.data.scientific_findings).length,22);
  for(const p of pages)for(const f of p.data.scientific_findings) {
    const resolved=resolveSecAssessment(registry,{pmId:p.pmId,finding:f});assert.equal(resolved.kind,'resolved',f.id);
    const original=records.find(r=>r.pmId===p.pmId&&r.findingId===f.id);
    assert.equal(resolved.record.recordVersion,original.recordVersion+1);
    assert.equal(resolved.record.assessmentStatus,original.assessmentStatus);
    assert.deepEqual(resolved.record.factors,original.factors);
    assert.deepEqual(resolved.record.conditional,original.conditional);
    assert.equal(f.synthesised_evidence_confidence,'not-yet-scored');
    assert.deepEqual(resolved.record.previousAssessments.at(-1),original);
    assert.equal(p.data.review_status,p.before.data.review_status);
  }
  function retained(r) {
    const snapshot=registry.assessments.find(e=>e.record.id===r.id&&e.record.recordVersion===r.recordVersion)?.record;
    assert.ok(snapshot,r.id+' v'+r.recordVersion);
    for(const key of Object.keys(r))assert.deepEqual(snapshot[key],r[key],r.id+':'+key);
    for(const old of r.previousAssessments||[])retained(old);
  }
  records.forEach(retained);
});

test('canonical science, dietary atoms, KC decisions, food composition and old references are preserved as approved',()=>{
  for(const p of pages) {
    for(const key of ['mission','dietary_input_traceability','dietary_lever_atoms','dietary_lever_presentations','pm_kc_relationships','kc_applicability_adjudications','kc_distinctness_review','key_constraints'])assert.deepEqual(p.data[key],p.before.data[key],p.pmId+':'+key);
    assert.deepEqual(p.data.references.slice(0,p.before.data.references.length),p.before.data.references);
    const issues=[];validateDietaryLeverAtoms(p.data,issues,{entityLabel:p.pmId});assert.deepEqual(issues,[]);
    assert.deepEqual(validateScientificFindings(p.data,[],{entityLabel:p.pmId}),[]);
  }
  for(const path of ['src/data/inputSubstanceFood.generated.json','src/data/inputSubstanceFood.brs2.generated.json','registry/substances.json','static/bibtex/BRAIN-diet.bib','system/framework-qc/pm-open-issues.json']) {
    if(!fs.existsSync(path))continue;
    const tracked=execFileSync('git',['ls-files','--',path],{encoding:'utf8'}).trim();
    if(tracked)assert.equal(read(path),execFileSync('git',['show','HEAD:'+path],{encoding:'utf8',maxBuffer:30e6}));
  }
});

test('GABA approved corrections and conditional scores survive; lesson remains byte-identical beside F1',()=>{
  const p=pages.find(p=>p.slug==='gaba'),f=id=>p.data.scientific_findings.find(f=>f.id===id);
  assert.match(f('PM9-F1').finding_statement,/suggests potentially recruitable/);
  assert.doesNotMatch(p.data.scientific_findings_intro,/principally.*reserve|governs reserve/);
  assert.match(f('PM9-F2').evidence_considered.find(e=>e.citation_key==='tang_crystal_2005').assessment.population,/sheep/);
  assert.match(f('PM9-F6').finding_statement,/p=0.140/);assert.match(f('PM9-F6').finding_statement,/p=0.011/);
  assert.deepEqual(p.data.system_optimisation_practices,[]);assert.deepEqual(p.data.lifestyle_priorities,[]);
  const lesson=authoredFindingLessons(p.content).get('PM9-F1');assert.ok(lesson);
  const old=p.before.content.slice(p.before.content.indexOf('<div id="brs1-4-9-f1-l1"'),p.before.content.indexOf('<ScientificFinding finding={{"id":"PM9-F2"')).trim();
  assert.ok(lesson.includes(old));
  assert.ok(p.content.indexOf('scientific-lesson:PM9-F1:start')>p.content.indexOf('<ScientificFinding finding={{"id":"PM9-F1"'));
  assert.ok(p.content.indexOf('scientific-lesson:PM9-F1:end')<p.content.indexOf('<ScientificFinding finding={{"id":"PM9-F2"'));
});

test('glycaemic protocols have immutable identities, exact six atoms and bounded Finding links',()=>{
  const p=pages.find(p=>p.slug==='glycaemic-variability');
  assert.equal(p.data.scientific_findings.length,8);
  assert.deepEqual(p.data.system_optimisation_practices.map(r=>r.atom_id),['PM2-SOP-2','PM2-SOP-3']);
  assert.deepEqual(p.data.lifestyle_priorities.map(r=>r.atom_id),['PM2-LIFE-2','PM2-LIFE-3']);
  const map=buildDietaryLeverDisclosureMap(p.data);
  for(const [section,rows] of [['3.2',p.data.system_optimisation_practices],['3.3',p.data.lifestyle_priorities]])for(const r of rows) {
    const f=p.data.scientific_findings.find(f=>f.id===r.description_finding_id);assert.ok(f);
    assert.equal(r.biological_role,f.finding_statement);assert.equal(r.dietary_input,section==='3.2');
    const disclosure=map.get(dietaryLeverBulletKey(r.input,'',section));assert.ok(disclosure,r.atom_id);
    assert.ok(disclosure.evidenceReferences.length);assert.ok(disclosure.supportingFinding);
  }
  assert.ok(p.data.scientific_findings.find(f=>f.id==='PM2-F2'));
  assert.ok(!p.data.system_optimisation_practices.some(r=>r.description_finding_id==='PM2-F2'));
  const r=resolveSecAssessment(registry,{pmId:p.pmId,finding:p.data.scientific_findings[0]}).record;
  assert.equal(r.adjustedScore,4);assert.ok(r.previousAssessments.some(v=>v.adjustedScore===2));
});

test('food-strategy projection removes only retired PM2 relationship; PM1 and other PMs are byte-equivalent data',()=>{
  const path='system/generated/food-strategy-rollup/rollup.generated.json';
  const old=JSON.parse(execFileSync('git',['show','HEAD:'+path],{encoding:'utf8'})),now=json(path);
  const other=rows=>rows.filter(r=>r.pm!=='BRS6-FM1-PM2');assert.deepEqual(other(now.relationships),other(old.relationships));
  const fish=now.strategies.find(r=>r.id==='food-strategy-053016fdaaca');assert.deepEqual(fish.relationship_ids,['BRS6-FM1-PM1::PM1-SOP-2']);
  assert.ok(!now.relationships.some(r=>r.id==='BRS6-FM1-PM2::PM2-SOP-1'));
  const rows=now.relationships.filter(r=>r.pm==='BRS6-FM1-PM2');assert.equal(rows.length,2);
  assert.equal(new Set(rows.map(r=>r.strategy_id)).size,2);
  for(const r of rows){assert.deepEqual(r.food_ids,[]);assert.deepEqual(r.substance_ids,[]);assert.ok(now.gaps.some(g=>g.relationship_id===r.id&&g.kind==='canonical-food-substance-links-not-recorded'));}
});

test('SAMe chemistry is unscored provenance, kinetic disagreement retained, F5 model-bounded 5/8',()=>{
  const p=pages.find(p=>p.slug==='same-synthesis');
  assert.match(p.data.scientific_findings_intro,/disagree/);
  for(const id of ['PM3-F1','PM3-F4']) {
    const f=p.data.scientific_findings.find(f=>f.id===id);assert.match(f.finding_label,/Biochemical provenance/);
    assert.equal(resolveSecAssessment(registry,{pmId:p.pmId,finding:f}).record.adjustedScore,null);
  }
  const f=p.data.scientific_findings.find(f=>f.id==='PM3-F5'),r=resolveSecAssessment(registry,{pmId:p.pmId,finding:f}).record;
  assert.match(f.finding_statement,/not an exclusive explanation.*human SAMe synthesis flux/);
  assert.equal(secTotals(r.factors).adjusted,5);assert.deepEqual(p.data.system_optimisation_practices,[]);
  const map=buildDietaryLeverDisclosureMap(p.data),m=p.data.dietary_lever_presentations.find(p=>p.atom_id==='PM3-DIT-1');
  assert.equal(map.get(dietaryLeverBulletKey(m.label,'',m.presentation_section)).atomId,'PM3-DIT-1');
  assert.ok(!p.data.dietary_lever_presentations.some(p=>p.atom_id==='PM3-DIT-5'));
});

test('all three canonical MDX pages compile with only canonical components and consistent numbered references',async()=>{
  for(const p of pages){await compile(p.content);assert.doesNotMatch(p.content,/<V1|<SamePreview|<PreviewEnhancements|<Glycaemic|<Calibration/);assert.deepEqual(validatePmReferenceIntegrity(p.data.references,p.content),[]);}
  assert.deepEqual(checkScientificFindings(process.cwd()).issues,[]);
});

test('verified curated records and canonical audit reuse local anchors and standard disclosure behavior',()=>{
  const require=createRequire(import.meta.url),ts=require('typescript'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
  const js=ts.transpileModule(read('src/components/PmCuratedProvenance.tsx'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  assert.match(js,/data-pm-curated-slot/);
  assert.match(read('src/components/SecAssessment/index.tsx'),/const records=current/);
  assert.match(read('src/components/SecCalibrationPreview/EvidenceAudit.tsx'),/id=\{assessmentRecords \? recordAnchor\(previous\) : undefined\}/);
  assert.match(read('src/components/SecCalibrationPreview/EvidenceAudit.tsx'),/aria-expanded="false"/);
});

test('reference sync preserves the explicit local annex without relaxing numbered-reference integrity',()=>{
  for(const p of pages) {
    const annex=p.content.split('### PM-local source records')[1];assert.ok(annex);
    const regenerated=replacePmReferencesSection(p.content,renderNumberedPmReferencesSection(p.data.references));
    assert.equal(regenerated.split('### PM-local source records')[1].trim(),annex.trim());
    const broken=p.content.replace('id="pm-ref-1"','id="pm-ref-999"');
    assert.ok(validatePmReferenceIntegrity(p.data.references,broken).some(e=>e.code==='pm_reference_anchor_missing'));
    assert.throws(()=>replacePmReferencesSection(p.content+'\n### PM-local source records\n',renderNumberedPmReferencesSection(p.data.references)),/Duplicate/);
  }
});
