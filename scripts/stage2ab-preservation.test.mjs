import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import matter from 'gray-matter';import {createHash} from 'node:crypto';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';import {renderNumberedPmReferencesSection,validatePmReferenceIntegrity} from './lib/pm-reference-index.mjs';import {validateInputGovernance} from './lib/dietary-input-governance.mjs';
const dir='system/reviews/stage2ab-preservation-2026-10-23',manifest=JSON.parse(fs.readFileSync(dir+'/preservation-manifest.json')),hash=v=>createHash('sha256').update(v).digest('hex');
const BEGIN='{/* stage2ab-preservation-2026-10-23 */}',END='{/* /stage2ab-preservation-2026-10-23 */}';
function withoutReview(text){const start=text.indexOf(BEGIN),end=text.indexOf(END,start);assert.ok(start>=0&&end>start);return text.slice(0,start)+text.slice(end+END.length+2);}
for(const p of manifest.pms)test(p.pm_id+' preserves the complete baseline and adds only authorised review material',()=>{
 const text=fs.readFileSync(p.file,'utf8'),parsed=matter(text),d=parsed.data;
 assert.deepEqual(Object.keys(d),Object.keys(p.fields));
 for(const[k,digest]of Object.entries(p.fields)){
  if(p.allowed_additions&&['scientific_findings','references'].includes(k))continue;
  assert.equal(hash(JSON.stringify(d[k])),digest,'Protected metadata '+k);
 }
 for(let i=0;i<p.existing_findings.length;i++){assert.equal(d.scientific_findings[i].id,p.existing_findings[i].id);assert.equal(hash(JSON.stringify(d.scientific_findings[i])),p.existing_findings[i].sha256);}
 for(let i=0;i<p.existing_references.length;i++)assert.equal(hash(JSON.stringify(d.references[i])),p.existing_references[i]);
 if(p.allowed_additions){assert.deepEqual(d.scientific_findings.slice(p.existing_findings.length).map(f=>f.id),p.allowed_additions.finding_ids);assert.equal(d.references.length,p.existing_references.length+2);}
 else assert.equal(hash(withoutReview(text)),p.original_source_sha256,'Removing only the additive disclosure recovers original bytes');
 const marker=BEGIN;assert.equal(text.split(marker).length,2,'One additive disclosure, no duplicate run');
 let content=withoutReview(parsed.content).trimEnd();const section=expectedFindingsSection(d,content);if(section){assert.ok(content.includes(section.block));content=content.replace(section.block,'__EXISTING_FINDINGS_PRESENTATION__');}
 const refs=renderNumberedPmReferencesSection(d.references,{heading:'## 8. References'});if(content.includes(refs))content=content.replace(refs,'__EXISTING_REFERENCES_PRESENTATION__');
 assert.equal(hash(content.trimEnd()),p.preserved_narrative_sha256,'Original mission/overview/mechanistic lessons/Phenome prose preserved');
 const issues=[];validateInputGovernance(d,issues,{content:parsed.content,entityLabel:p.pm_id});assert.deepEqual(issues,[]);const refIssues=[];validatePmReferenceIntegrity(d.references,parsed.content,refIssues,{entityLabel:p.pm_id});assert.deepEqual(refIssues,p.baseline_reference_issues,'No new reference errors; pre-existing presentation issue retained visibly');
});
test('new thiol Finding remains mechanistic, unscored and independent of any new dietary admission',()=>{const p=manifest.pms.find(p=>p.pm_id==='BRS3-FM2-PM6'),d=matter(fs.readFileSync(p.file,'utf8')).data,f=d.scientific_findings.find(f=>f.id==='PM6-F2');assert.equal(f.synthesised_evidence_confidence,'not-yet-scored');assert.equal(f.fm_rollup,false);assert.equal(f.evidence_considered.length,2);assert.match(f.synthesis_limitations,/not ordinary dietary exposure/);assert.ok(f.evidence_considered.every(s=>s.assessment.retrieval_scope));assert.equal(d.dietary_input_traceability.length,2);});
test('concerns are open proposals, with no automatic deletion, downgrade or reinterpretation',()=>{const p=JSON.parse(fs.readFileSync(dir+'/plan.json'));assert.equal(p.issues.length,5);assert.ok(p.issues.every(i=>i.status.startsWith('open-')&&i.record&&i.proposal&&i.sources.length));const summary=JSON.parse(fs.readFileSync(dir+'/execution-summary.json'));for(const k of ['new_dietary_admissions','changed_existing_admissions','deleted_records','new_food_edges','changed_scores'])assert.equal(summary[k],0);assert.equal(summary.pms,18);});
