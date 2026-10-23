// Adapt only new PM2 audit references to the existing source-link contract.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import matter from 'gray-matter';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
import {renderPmPhenomeSectionBody} from './lib/phenome-relationships.mjs';
import {secAssessmentHash,validateSecRegistry} from './lib/sec-assessments.mjs';
const file='docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx',registryFile='system/sec-assessments/registry.json';
const read=p=>fs.readFileSync(p,'utf8'),pm=matter(read(file));
const previous=JSON.parse(read(registryFile)),registry=structuredClone(previous);
if(previous.assessments.some(e=>e.record.pmId===pm.data.pm_id&&e.record.recordVersion>1))throw Error('Already finalised; do not overwrite');
for(const f of pm.data.scientific_findings){
 const entry=previous.assessments.find(e=>e.sha256===f.sec_assessment_ref.sha256);
 if(!entry||entry.record.pmId!==pm.data.pm_id)throw Error('Missing exact PM2 assessment');
 const r=structuredClone(entry.record);
 r.recordVersion=2;r.previousAssessments=[entry.record];
 r.sources.supporting=f.id==='PM2-F1'?['stage2-ref-pm2-curated-c1','stage2-ref-pm2-curated-c2']:['wurtman_effects_2003','ashley_breakfast_1985',...(f.id==='PM2-F2'?['stage2-ref-pm2-protein2013']:[])];
 // Contextual studies are linked by DOI in the existing targeted-check list;
 // they have no global scholarly bibliography keys in this checkout.
 r.sources.contextual=[];
 r.sources.targetedChecks.push(
 {doi:'10.1093/ajcn/81.5.1026',role:'contextual functional evidence, not ordinary-meal replication',access:'Full institutional manuscript; methods and reported results examined.',assessment:'Twenty-eight healthy adults with/without mild sleep complaints; enriched-protein crossover measured next-morning attention. Does not prove LAT1 mediation or ordinary-meal benefit.'},
 {doi:'10.3390/nu17071196',role:'contextual null/contrary functional evidence',access:'Scite full-text methods and results examined.',assessment:'Twenty-four sportspeople, seven-day randomised double-blind crossover; no general sleep/performance improvement and some adverse-direction endpoints. Different protocol; plasma target engagement not established by the examined outcome report.'},
 );
 if(r.assessmentStatus==='not-scored')r.unscoredReason=f.id==='PM2-F1'?'Curated biochemical provenance; not numerically scored':'Interpretive boundary; not numerically scored';
 r.methodology.version='Source snapshot SHA-256 '+createHash('sha256').update(read(r.methodology.source)).digest('hex');
 r.history.push({date:'2026-10-19',decision:'Finalise PM-local supporting source anchors and DOI-linked contextual evidence using the existing audit renderer. Preserve version 1, exact proposition, factors and score. No new bibliography record or scientific admission.'});
 const sha256=secAssessmentHash(r);registry.assessments.push({sha256,record:r});f.sec_assessment_ref={id:r.id,version:2,sha256};
}
const issues=validateSecRegistry(registry,{previous});if(issues.length)throw Error(JSON.stringify(issues));
let body=pm.content;
const start=body.indexOf('### 4.1 Scientific Findings'),end=body.indexOf('## 5.',start);
body=body.slice(0,start)+expectedFindingsSection(pm.data,body).block+'\n\n'+body.slice(end);
const p=body.indexOf('## 7. Phenome Connections'),refs=body.indexOf('## 8. References',p);
body=body.slice(0,p)+renderPmPhenomeSectionBody(pm.data.phenome_relationships,{sectionNum:7,findingData:pm.data})+'\n\n'+body.slice(refs);
fs.writeFileSync(registryFile,JSON.stringify(registry,null,2)+'\n');
fs.writeFileSync(file,matter.stringify(body,pm.data,{lineWidth:9999}).trimEnd()+'\n');
