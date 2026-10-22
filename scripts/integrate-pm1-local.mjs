// Local-only projection through the existing canonical PM generators.
import fs from 'node:fs';
import matter from 'gray-matter';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
import {secAssessmentHash,validateSecRegistry} from './lib/sec-assessments.mjs';

const dir='review/pm1-reassessment';
const read=p=>fs.readFileSync(p,'utf8');
const manifest=JSON.parse(read(dir+'/baseline-manifest.json'));
const baseline=read(dir+'/baseline.mdx');
if(read(manifest.canonical)!==baseline)throw Error('Canonical PM1 differs from reviewed baseline; do not overwrite');
const draft=matter(read(dir+'/proposed-pm1.mdx'));
const data=draft.data;
const records=JSON.parse(read(dir+'/assessments-v1.json'));
const registryFile='system/sec-assessments/registry.json';
const previous=JSON.parse(read(registryFile));
const registry=structuredClone(previous);
if(registry.assessments.some(e=>e.record.pmId===data.pm_id))throw Error('PM1 already integrated; do not overwrite assessment history');
data.system_optimisation_practices=[];
data.lifestyle_priorities=[];
data.intervention_dominance_assessment.principal_route_selection.rationale='Dietary Requirements remains the principal supply route: feeding interventions directly deliver the indispensable precursor pool across relevant protein sources. The preparation experiment remains evidence, not a selected or registered SOP pending exact-scope adjudication.';
for(const original of records) {
  registry.assessments.push({sha256:secAssessmentHash(original),record:original});
  const record=structuredClone(original);
  record.recordVersion++;
  record.previousAssessments=[original];
  record.history.push({date:'2026-10-18',decision:'User authorised application to the actual local canonical PM in this isolated checkout. Scores and evidence judgements unchanged; no human scientific review inferred. Tyrosine admission remains Unset. The preparation SOP is not selected or registered pending exact-scope confirmation.'});
  if(record.findingId==='PM1-F5')record.limitations.push('Intervention disposition: the matched 135 g lean-beef preparation experiment in ten older men remains scientific evidence only. No approved canonical preparation SOP or food-strategy registration is established; exact intervention scope awaits confirmation.');
  if(record.findingId==='PM1-F3')record.limitations.push('Tyrosine Direct/Derived dietary admission remains Unset pending separate adjudication. Curated PAH reaction provenance does not change the six-atom dietary decision.');
  const sha256=secAssessmentHash(record);
  registry.assessments.push({sha256,record});
  const finding=data.scientific_findings.find(f=>f.id===record.findingId);
  if(finding.finding_statement!==record.proposition)throw Error('Proposition mismatch');
  finding.sec_assessment_ref={id:record.id,version:record.recordVersion,sha256};
}
const issues=validateSecRegistry(registry,{previous});
if(issues.length)throw Error(JSON.stringify(issues));
for(const field of manifest.preserved)if(JSON.stringify(data[field])!==JSON.stringify(matter(baseline).data[field]))throw Error('Protected scientific data changed: '+field);
let body=draft.content;
const sopStart=body.indexOf('<div class="brs-fm-hub-item" data-brs-fm-hub>',body.indexOf('## 3. Intervention Levers'));
const lifestyleStart=body.indexOf('<div class="brs-fm-hub-item" data-brs-fm-hub>',body.indexOf('<strong>3.3 Lifestyle Levers</strong>')-240);
if(sopStart<0||lifestyleStart<=sopStart)throw Error('Unexpected intervention section layout');
body=body.slice(0,sopStart)+`<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>3.2 System Optimisation Practices</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

No PM-specific preparation protocol is currently selected. The qualified preparation experiment and pending intervention disposition remain in [PM1-F5](#pm1-f5) and its Evidence & Audit assessment.

</div>
</div>
</div>

`+body.slice(lifestyleStart);
const start=body.indexOf('### 4.1 Scientific Findings'),end=body.indexOf('## 5.',start);
if(start<0||end<0)throw Error('Unexpected Findings section');
body=body.slice(0,start)+expectedFindingsSection(data,body).block+'\n\n'+body.slice(end);
body="import ScientificFinding from '@site/src/components/ScientificFinding';\n\n"+body.trim()+'\n';
const archive='system/sec-assessments/history/pm1-before-local-integration.mdx';
if(fs.existsSync(archive))throw Error('History archive exists; do not overwrite');
fs.writeFileSync(archive,baseline);
fs.writeFileSync(registryFile,JSON.stringify(registry,null,2)+'\n');
fs.writeFileSync(manifest.canonical,matter.stringify(body,data,{lineWidth:9999}).trimEnd()+'\n');
console.log('Integrated PM1 locally using canonical Findings and SEC components; no selected SOP or lifestyle registration; original assessment versions preserved.');
