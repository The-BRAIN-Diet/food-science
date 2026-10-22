// One bounded mechanical projection of the approved review artifacts.
// Refuse unrelated pages and preserve original sources and every pilot record.
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import matter from 'gray-matter';
import {secAssessmentHash,validateSecRegistry} from './lib/sec-assessments.mjs';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
import {renderPmPhenomeSectionBody} from './lib/phenome-relationships.mjs';
import {renderNumberedPmReferencesSection} from './lib/pm-reference-index.mjs';
import {stage2Studies} from '../src/components/SecCalibrationPreview/glycaemicStage2.mjs';

const read=p=>fs.readFileSync(p,'utf8'),clone=x=>structuredClone(x);
const review=JSON.parse(read('review/sec-integration/reconciliation.json'));
const assessments=JSON.parse(read('review/sec-integration/assessments.json'));
const out='system/sec-assessments';
if(JSON.parse(read(out+'/registry.json')).assessments.length)throw Error('Registry already populated; do not rerun integration over existing work');
const snapshots=new Map(),pins=new Map(),archives=[],registrations=[];
function snapshot(original) {
  for(const old of original.previousAssessments||[])snapshot(old);
  const key=original.id+'::'+original.recordVersion;
  if(snapshots.has(key))return;
  const r=clone(original);
  r.factorStates=Object.fromEntries(['D','B','P','R'].map(k=>[k,r.assessmentStatus==='conditional'?(k==='D'?'established':'conditional'):r.factors[k]===null?'unresolved':'established']));
  if(r.assessmentStatus==='codex-provisional')r.assessmentComplete=true;
  const entry={sha256:secAssessmentHash(r),record:r};snapshots.set(key,entry);
  return entry;
}
for(const original of assessments) {
  snapshot(original);
  // A new integration version records approval without re-writing pilot history.
  const accepted=clone(original);accepted.recordVersion++;
  accepted.previousAssessments=[...(accepted.previousAssessments||[]),clone(original)];
  accepted.history.push({date:'2026-10-18',decision:'User authorised controlled canonical integration of this exact reviewed proposition. Assessment maturity and scores unchanged; this is not qualified human scientific review.'});
  const entry=snapshot(accepted);pins.set(accepted.pmId+'::'+accepted.findingId,entry);
}
const registry={schemaVersion:1,assessments:[...snapshots.values()]};
const issues=validateSecRegistry(registry);if(issues.length)throw Error(JSON.stringify(issues,null,2));
const outputs=[];
for(const def of review.records) {
  const original=execFileSync('git',['show',review.base+':'+def.canonical],{encoding:'utf8',maxBuffer:10e6});
  if(read(def.canonical)!==original)throw Error('Unreviewed canonical edits: '+def.canonical);
  const draft=matter(read('review/sec-integration/drafts/'+def.slug+'.mdx'));
  const baseline=matter(original),data=draft.data;
  data.scientific_findings_intro=draft.content.split('### 4.1 Scientific Findings')[1].split('<V1Finding')[0].replace(/^\s*#### Summary\s*/,'').trim();
  for(const field of ['dietary_input_traceability','dietary_lever_atoms','dietary_lever_presentations','pm_kc_relationships','kc_applicability_adjudications','key_constraints'])if(JSON.stringify(data[field])!==JSON.stringify(baseline.data[field]))throw Error('Unapproved dietary/KC change: '+field);
  for(const f of data.scientific_findings) {
    const entry=pins.get(data.pm_id+'::'+f.id);if(!entry)throw Error('Missing approved assessment '+f.id);
    if(f.finding_statement!==entry.record.proposition)throw Error('Proposition mismatch '+f.id);
    f.sec_assessment_ref={id:entry.record.id,version:entry.record.recordVersion,sha256:entry.sha256};
    if(data.pm_id==='BRS2-FM1-PM3'&&['PM3-F1','PM3-F4'].includes(f.id))f.finding_label='Biochemical provenance: '+(f.id==='PM3-F1'?'MAT reaction':'methionine regeneration');
    if(data.pm_id==='BRS6-FM1-PM2'&&Number(f.id.split('-F')[1])>=5) {
      const e=f.evidence_considered[0],source=stage2Studies.find(s=>e.href==='#stage2-ref-'+s.id);
      e.citation_key='stage2-ref-'+source.id;
      e.assessment.effect_magnitude=source.result;
      e.assessment.evidence_summary=source.result+' '+source.limitation;
      f.synthesis=source.result+' '+source.limitation;
    }
    if(data.pm_id==='BRS2-FM1-PM3'&&f.id==='PM3-F5') {
      f.finding_label='MAT2B and MAT2A stability';
      f.evidence_dependency=['Bailey et al. (2021) is also used by PM3-F1 and PM3-F4. Reuse for the stability proposition is not independent replication.'];
      const sources=entry.record.sources.targetedChecks;
      f.evidence_considered.forEach((e,i)=>{
        const s=sources[i],key='same-study-'+(i+1);
        e.citation_key=key;e.href='#'+key;e.data_level='Cellular / Molecular';
        e.assessment={study:s.role,population:'Purified human enzyme, mammalian cellular or structural experiments as specified in the source appraisal; no dietary human intervention.',result:s.assessment,effect_magnitude:s.assessment,evidence_summary:s.assessment,limitations:entry.record.limitations.join(' ')+' '+s.access};
        data.references.push('['+s.doi+'](/'+def.canonical.replace(/\.mdx$/,'')+'#'+key+')');
      });
      f.evidence_considered[0].citation_key='bailey_human_mat2a_2021';
      f.evidence_considered[0].href='/docs/papers/BRAIN-Diet-References#bailey_human_mat2a_2021';
      data.references.splice(baseline.data.references.length,1);
    }
  }
  if(data.pm_id==='BRS6-FM1-PM2') {
    const allBefore=Object.values(baseline.data).filter(Array.isArray).flat().filter(x=>x?.atom_id).map(x=>x.atom_id);
    for(const row of [...data.system_optimisation_practices,...data.lifestyle_priorities]) {
      if(allBefore.includes(row.atom_id))throw Error('New protocol reuses old identity '+row.atom_id);
      if(row.dietary_input) {
        // Initial seeding follows the existing exact protocol-name/category rule.
        row.food_strategy_id='food-strategy-'+createHash('sha256').update(row.input+'::'+row.optimisation_category).digest('hex').slice(0,12);
        row.food_strategy_scope=row.optimisation_category==='food_prep'?'food-preparation':'dietary-protocol';
      }
      registrations.push({pmId:data.pm_id,atomId:row.atom_id,foodStrategyId:row.food_strategy_id||null,sourceFinding:row.description_finding_id,input:row.input});
    }
  }
  let body=draft.content.replace(/^import .*\n/gm,'').replace(/^export const previewDisplayData = .*\n/gm,'');
  body=body.replace(/<V1Intro[^>]+\/>\s*/g,'').replace(/<(?:PreviewEnhancements|SamePreviewEnhancements|V1Enhancements)[^>]+\/>\s*/g,'');
  body=body.replace(/<V1Interventions section="(3\.[23])" data=\{previewDisplayData\} \/>/g,(_,section)=>{
    const rows=section==='3.2'?data.system_optimisation_practices:data.lifestyle_priorities;
    return 'Tested protocols in the stated study populations, not general prescriptions.\n\n'+rows.map(r=>'- '+r.input).join('\n')+'\n\nMedication, hypoglycaemia risk, exercise capacity and eating-window suitability require individual assessment.';
  }).replace(/No PM-specific (optimisation|lifestyle) protocol is admitted in this draft\./g,'No PM-specific $1 protocol is currently selected.');
  if(def.slug==='gaba') {
    const start=body.indexOf('<div id="brs1-4-9-f1-l1"'),end=body.indexOf('<V1Finding',start);
    if(start<0||end<0)throw Error('Missing preserved GABA lesson');
    const lesson=body.slice(start,end).trim();
    body=body.slice(0,start)+'{/* scientific-lesson:PM9-F1:start */}\n'+lesson+'\n{/* scientific-lesson:PM9-F1:end */}\n\n'+body.slice(end);
  }
  const expected=expectedFindingsSection(data,body);
  const begin=body.indexOf('### 4.1 Scientific Findings'),end=body.indexOf('## 5.',begin);
  body=body.slice(0,begin)+expected.block+'\n\n'+body.slice(end);
  const phenome=body.indexOf('## 7. Phenome Connections'),refs=body.indexOf('## 8. References',phenome);
  body=body.slice(0,phenome)+renderPmPhenomeSectionBody(data.phenome_relationships||[],{sectionNum:7,findingData:data})+'\n\n'+body.slice(refs);
  const refStart=body.indexOf('## 8. References');
  let extra='';
  if(def.slug==='glycaemic-variability')extra='\n\n'+stage2Studies.map(s=>'<p id="stage2-ref-'+s.id+'">'+s.author+'. '+s.title+'. <a href="https://doi.org/'+s.doi+'">'+s.doi+'</a>. '+s.access+'</p>').join('\n\n');
  if(def.slug==='same-synthesis')extra='\n\n'+pins.get(data.pm_id+'::PM3-F5').record.sources.targetedChecks.map((s,i)=>'<p id="same-study-'+(i+1)+'"><a href="https://doi.org/'+s.doi+'">'+s.doi+'</a>. '+s.role+'. '+s.access+'</p>').join('\n\n');
  body=body.slice(0,refStart)+renderNumberedPmReferencesSection(data.references)+'\n\n### PM-local source records'+extra;
  if(def.slug!=='glycaemic-variability')body+='\n\n<PmCuratedReferences pmId="'+data.pm_id+'" />';
  const display={pm_id:data.pm_id,dietary_lever_presentations:data.dietary_lever_presentations};
  body="import ScientificFinding from '@site/src/components/ScientificFinding';\n"+(def.slug==='gaba'?"import AccessibleMermaid from '@site/src/components/AccessibleMermaid';\n":'')+(def.slug!=='glycaemic-variability'?"import {PmCuratedEvidence, PmCuratedReferences} from '@site/src/components/PmCuratedProvenance';\n\n<PmCuratedEvidence data={"+JSON.stringify(display)+"} />\n":'')+'\n'+body.trim()+'\n';
  if(/<V1|PreviewEnhancements|CalibrationFinding|SameFinding/.test(body))throw Error('Preview wrapper remains');
  outputs.push([def.canonical,matter.stringify(body,data,{lineWidth:9999})]);
  archives.push({pmId:data.pm_id,path:out+'/history/'+def.slug+'-before-v1.mdx',sha256:createHash('sha256').update(original).digest('hex')});
  outputs.push([archives.at(-1).path,original]);
}
outputs.push([out+'/registry.json',JSON.stringify(registry,null,2)+'\n']);
outputs.push([out+'/integration-history.json',JSON.stringify({version:1,date:'2026-10-18',approval:'User: Scientific Approval: Three-PM V1 Integration',baseline:review.base,archives,registrations,retiredRelationships:[{id:'BRS6-FM1-PM2::PM2-SOP-1',food_strategy_id:'food-strategy-053016fdaaca',preserved:'BRS6-FM1-PM1::PM1-SOP-2',reason:'Retained acute scientific evidence, not selected leading PM2 SOP'}]},null,2)+'\n']);
// Validate everything above before the first write.
for(const [file,text] of outputs){fs.mkdirSync(file.slice(0,file.lastIndexOf('/')),{recursive:true});fs.writeFileSync(file,text);}
console.log('Integrated exactly three approved PMs; '+registry.assessments.length+' immutable snapshots; original sources archived.');
