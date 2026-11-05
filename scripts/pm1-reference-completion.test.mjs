import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import matter from 'gray-matter';
import {compile} from '@mdx-js/mdx';
import {loadSecRegistry,resolveInterventionSecAssessment,validateSecRegistry} from './lib/sec-assessments.mjs';
import {validateIntervention} from './lib/intervention-moa-contract.mjs';
const path='docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx';
const before=matter(fs.readFileSync('review/pm1-reference-completion-2026-11-03/before.mdx','utf8')).data;
const {data:after,content}=matter(fs.readFileSync(path,'utf8'));
const registry=loadSecRegistry();
test('PM1 mission, dietary admissions, Principles, KCs and lifestyle decisions remain unchanged',()=>{
 for(const key of ['mission','pm_id','parent_fm','parent_brs','scientific_principles','dietary_input_traceability','dietary_lever_atoms','key_constraints','pm_kc_relationships','lifestyle_priorities'])assert.deepEqual(after[key],before[key],key);
 assert.deepEqual(after.system_optimisation_practices.map(x=>x.atom_id),[...before.system_optimisation_practices.map(x=>x.atom_id),'PM1-SOP-WHEY-CASEIN-1']);
});
test('F3 physiology is separated from reaction identity; unrelated propositions preserved',()=>{
 for(const f of before.scientific_findings){const n=after.scientific_findings.find(x=>x.id===f.id);assert.ok(n);if(f.id!=='PM1-F3')assert.equal(n.finding_statement,f.finding_statement);}
 assert.match(after.scientific_findings.find(x=>x.id==='PM1-F3').finding_statement,/Human tracer/);
});
test('historical SEC snapshots are immutable',()=>{
 const previous=JSON.parse(execFileSync('git',['show','HEAD:system/sec-assessments/registry.json'],{encoding:'utf8',maxBuffer:20e6}));
 assert.deepEqual(validateSecRegistry(registry,{previous}),[]);
 for(const old of previous.assessments)assert.ok(registry.assessments.some(x=>JSON.stringify(x)===JSON.stringify(old)));
});
test('SOPs own exact assessments and retain qualified mechanisms and typed limitations',()=>{
 for(const x of after.system_optimisation_practices){const r=resolveInterventionSecAssessment(registry,{pmId:after.pm_id,intervention:x});assert.equal(r.kind,'resolved',JSON.stringify(r.errors));assert.equal(r.record.findingId,undefined);assert.deepEqual(validateIntervention({...x,intervention:x.title||x.intervention||x.atom_id,interventionType:'food preparation'}),[]);if(x.biologicalRelationship.moa.summary)assert.match(content,new RegExp(x.biologicalRelationship.moa.summary));else assert.equal(x.biologicalRelationship.moa.status,'unresolved');}
});
test('PM1 compiles with existing tabs, six atoms and Section 4 assessment anchors',async()=>{
 await compile(content);assert.equal(after.evidence_tabs_version,1);assert.equal(after.evidence_gaps_tab,true);assert.equal(after.scientific_findings_placement,'section-4');
 assert.ok(content.indexOf('<EvidenceAudit')>content.indexOf('## 4.'));
 assert.equal((content.match(/<PilotInterventionDisclosure /g)||[]).length,3);
 assert.doesNotMatch(content,/deferred-stage2ab-2026-10-23|<ul>[\s\S]*?<\/ul><\/p>/);
});
test('assessment families preserve order, default collapse and regeneration boundary',()=>{
 assert.equal(after.section4_assessment_groups,true);
 const end=content.indexOf('{/* section4-findings:end */}');
 assert.ok(end>content.lastIndexOf('<ScientificFinding'));
 assert.ok(content.indexOf('id="pm1-sop-assessment-group"')>end);
 assert.ok(content.indexOf('<EvidenceAudit')>end);
 assert.match(content,/Scientific Findings \(6\)<\/strong>/);
 assert.match(content,/System Optimisation Practices \(3\)<\/strong>/);
 const output=execFileSync('node',['scripts/sync-pm-scientific-findings.mjs','--dry-run','--pm','BRS1-FM1-PM1'],{encoding:'utf8'});
 assert.match(output,/0 would update, 1 unchanged/);
});
