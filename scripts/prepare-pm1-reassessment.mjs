// Review-only mechanical projection of the authored PM1 adjudication.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import matter from 'gray-matter';
import {date,pmId,sources,candidates,findingChanges,sourceMeasurements} from '../review/pm1-reassessment/evidence.mjs';
import {secTotals} from '../src/lib/secAssessments.mjs';
import {renderNumberedPmReferencesSection,replacePmReferencesSection,buildPmReferenceRecordIndex} from './lib/pm-reference-index.mjs';

const canonical='docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx';
const out='review/pm1-reassessment';
const original=fs.readFileSync(canonical,'utf8');
const baseline=out+'/baseline.mdx';
if(fs.existsSync(baseline)&&fs.readFileSync(baseline,'utf8')!==original)throw Error('Baseline changed; adjudication required');
fs.mkdirSync(out,{recursive:true});
if(!fs.existsSync(baseline))fs.copyFileSync(canonical,baseline);
const {data,content}=matter(original), clone=x=>JSON.parse(JSON.stringify(x));
const before=clone(data);
const previousFindings=clone(data.scientific_findings);
const external=sources.filter(s=>s.id!=='gorissen2020');
const localKey=s=>'stage2-ref-pm1-'+s.id;
const sourceEvidence=s=>({label:s.title,citation_key:localKey(s),href:'?review=0#'+localKey(s),data_level:'Human Mechanistic',evidence_source:'bounded-external-search',exposure_context:s.protocol,directional_finding:s.result,
  assessment:{study:s.design,population:s.design,result:s.result,effect_magnitude:sourceMeasurements[s.id]||'Source-specific endpoint and uncertainty: '+s.uncertainty,evidence_summary:s.result,limitations:s.uncertainty+' '+s.independence}});
data.scientific_findings=Object.entries(findingChanges).map(([id,c])=>{
  const old=previousFindings.find(f=>f.id===id);
  const evidence=[...(old?.evidence_considered||[])];
  for(const key of c.sources){const s=sources.find(s=>s.id===key);if(key!=='gorissen2020')evidence.push(sourceEvidence(s));}
  return {...clone(old||{id,presentation:'mechanistic-basis',fm_rollup:false}),finding_label:c.title,finding_statement:c.proposition,finding_summary:c.summary,
    finding_interpretation:'Scope is circulating provision and the exact measured endpoint, not brain entry, neurotransmitter efficacy or a clinical recommendation.',synthesis:c.synthesis,synthesis_limitations:c.limitation,
    synthesised_evidence_confidence:'not-yet-scored',evidence_considered:evidence,evidence_dependency:['Shared sources with PM1-F1 and PM1-F2 are reused for distinct propositions, not independent replication. Pooled studies, thesis chapters and journal reports may overlap.']};
});
const sop={atom_id:'PM1-SOP-REVIEW-1',input:'Minced beef rather than steak in the studied older-men protocol',input_type:'food preparation',biological_role:findingChanges['PM1-F5'].proposition,
  evidence_source:{finding_ids:['PM1-F5'],citation_keys:['stage2-ref-pm1-pennings2013']},evidence_limitation:findingChanges['PM1-F5'].limitation,dietary_input:true,
  dietary_input_note:'Dietary preparation SOP, not a new nutritional capacity requirement. Identity is preview-local pending registration approval.',optimisation_category:'food_prep',description_finding_id:'PM1-F5',
  reader_description:'Matched 135 g lean-beef preparations in ten older men; six-hour tracer measurement. This is not a universal intake or preparation prescription.'};
data.system_optimisation_practices=[sop];
data.lifestyle_priorities=[];
data.pending_actions=[...(data.pending_actions||[]),{action:'PM1 review: adjudicate dietary tyrosine contribution separately from indispensability; preserve existing Unset admission pending approval.',status:'scientific-approval-required'},
  {action:'Register an immutable SOP identity and reconcile strategy roll-up only if the proposed preparation relationship is approved. No food-strategy ID or food mapping invented.',status:'scientific-approval-required'}];
data.intervention_dominance_assessment={evidence_qualification:{label:data.intervention_dominance,rationale:'Retain the Diet-Dominant qualification for experimentally demonstrated dietary precursor provision, without a superiority claim.',scope_note:'Human dietary tracer appearance and source-specific plasma profiles are not brain neurotransmitter or ADHD outcomes.',routes:[
  {group_id:'3.1',evidence_basis:'intervention-effect',intervention_effect:'Dietary protein ingestion delivers labelled phenylalanine, with source and dose contrasts in human studies.',context:'Human controlled feeding/tracer experiments; mainly healthy adults.',limitations:'Meal source, dose, age and matrix constrain generalisation; adequacy is not enhancement.',evidence_source:{finding_ids:['PM1-F1'],citation_keys:['gorissen_phenylalanine_2020']}},
  {group_id:'3.2',evidence_basis:'intervention-effect',intervention_effect:'Matched mincing-versus-steak changed six-hour dietary phenylalanine appearance.',context:'Ten older men; same-cut beef crossover.',limitations:findingChanges['PM1-F5'].limitation,evidence_source:{finding_ids:['PM1-F5'],citation_keys:['stage2-ref-pm1-pennings2013']}},
]},principal_route_selection:{disposition:'established',selected_groups:['3.1'],rationale:'Dietary Requirements remains the principal supply route: feeding interventions directly deliver the indispensable precursor pool across relevant protein sources. The selected preparation SOP addresses a narrower older-male context, not a replacement for dietary provision.',comparative_limitations:'No head-to-head superiority over all lifestyle or optimisation routes is established. Prominence concerns the mission-specific supply process; it is not a nutrient-benefit ranking.',assessments:[{group_id:'3.1',relevance:'The PM mission is dietary delivery to the circulating amino-acid pool.',directness:'Human labelled dietary-protein experiments measure this supply rather than infer it from food content.',extent:'Repeated feeding experiments show substantial dietary tracer appearance, qualified by five/six-hour windows, source, dose and population. No universal optimum or brain effect.'}]}};
data.scientific_findings_intro='Dietary protein supplies the circulating precursor pool; food structure and source can alter delivery kinetics without proving superior neurotransmitter function. Curated reaction identity, whole-diet adequacy and experimental intervention findings are distinguished below.';
for(const p of data.dietary_lever_presentations)p.short_descriptor=({'PM1-DIT-1':'Essential amino-acid coverage','PM1-DIT-4':'Non-essential amino acid','PM1-DIT-5':'Essential amino acid'})[p.atom_id];
for(const s of external)data.references.push(`[${s.title}](?review=0#${localKey(s)})`);
const assessments=data.scientific_findings.map(f=>{
  const c=findingChanges[f.id],scored=!!c.factors,totals=scored?secTotals(c.factors):null;
  const used=c.sources.map(id=>sources.find(s=>s.id===id));
  return {id:'pm1-'+f.id.toLowerCase()+'-assessment',recordVersion:1,pmId,findingId:f.id,title:c.title,proposition:f.finding_statement,
    assessmentStatus:scored?'codex-provisional':'not-scored',assessmentComplete:scored,factors:scored?c.factors:{D:null,B:null,P:null,R:null},
    factorStates:Object.fromEntries(['D','B','P','R'].map(k=>[k,scored?'established':'unresolved'])),rawScore:totals?.raw??null,adjustedScore:totals?.adjusted??null,
    capRationale:scored?'Directness 2, Bias Protection 1 and Precision 1: no D1/B0/P0 ceiling applies. Replication 0 receives no extra decrement.':'No total calculated; biochemical provenance or incompletely appraised adequacy is not missing evidence scored zero.',
    unscoredReason:c.unscoredReason||null,lastEvidenceAssessmentDate:date,humanReview:null,
    rationale:c.rationale||{D:'Established scope or biochemical identity is documented, but no complete four-factor numerical assessment is asserted.',B:'No source-count-derived score; source-specific design appraisal is not complete for this exact nonexperimental synthesis.',P:'No invented quantitative precision for a curated reaction or general adequacy statement.',R:'Database agreement and reviews are not independent experimental replications.'},
    limitations:[c.limitation,'Evidence-confidence conclusions must distinguish limitations of the underlying scientific evidence from limitations of the framework\'s evidence retrieval and assessment. Absence of verified evidence within an assessment must not be represented as evidence of absence.'],
    sources:{supporting:(f.evidence_considered||[]).map(e=>e.citation_key).filter(Boolean),contextual:[],contradictoryAssessment:'Supporting and null outcomes are endpoint-specific. '+(f.id==='PM1-F1'?'No uniform age impairment is asserted; exercise and newer source studies qualify that inference.':f.id==='PM1-F5'?'No detected total-amino-acid or muscle-synthesis advantage in the same experiment.':f.id==='PM1-F6'?'No significant total five-hour grouped exposure difference; not evidence of equivalence.':'No literature-wide absence assertion.'),
      targetedChecks:used.filter(s=>s.doi).map(s=>({doi:s.doi,role:s.role,access:s.access,assessment:s.design+' '+s.result+' '+(sourceMeasurements[s.id]||'')+' '+s.uncertainty+' '+s.independence})),
      retrievalLimited:used.filter(s=>/abstract|unavailable|not fully|not appraised/i.test(s.access)).map(s=>({doi:s.doi,url:s.url,limitation:s.access+' Effect: no unexamined methods, uncertainty or replication credited.'}))},
    methodology:{name:'Synthesised Evidence Confidence: Directness + Bias Protection + Precision + Replication',version:'SEC calibration rubric and four-state contract, local 2026-10-18 baseline',source:'system/reviews/sec-calibration/SEC-calibration-rubric-proposal.html'},
    process:'Codex PM1 mission-wide bounded Stage 2A/2B reassessment, 2026-10-18; web/PubMed, primary repositories and Scite recovery; no qualified human review inferred.',
    history:[{date,decision:'Original canonical Finding and evidence preserved in baseline.mdx; this is a new review-only assessment version, not canonical admission.'}],previousAssessments:[],
    stoppingRationale:'Mission steps, all five SOP categories and lifestyle candidates screened. Material source, preparation, timing, exercise and newer-evidence questions received targeted retrieval. Remaining access gaps are explicit; no exhaustive-review claim.'};
});
const referenceIndex=buildPmReferenceRecordIndex(data.references);
const readerFinding=f=>({...f,evidence_considered:f.evidence_considered.map(e=>{
  const r=referenceIndex.get(e.citation_key);return r?{...e,canonical_reference:{author_year:r.authorYear,number:r.number,anchor:'#pm-ref-'+r.number}}:e;
})});
let body=content.replace(/<ScientificFinding finding=\{\{[^\n]*\}\} \/>/g,match=>{
  const id=JSON.parse(match.slice('<ScientificFinding finding={'.length,-' />'.length-1)).id;
  const f=data.scientific_findings.find(f=>f.id===id);if(!f)throw Error('Unmatched Finding '+id);
  return `<ScientificFinding finding={${JSON.stringify(readerFinding(f))}} />`;
});
body=body.replace('## BRS1-1-1 - Amino-Acid Availability & Prioritisation','## BRS1-FM1-PM1 - Amino-Acid Availability & Prioritisation');
body=body.replace('Older adults retained slightly less in the circulation than young adults.','The pooled age association was modest and context-dependent.');
body=body.replace('and older adults retained slightly less in the circulation than young adults.','and the older subgroup showed a lower fraction appearing within the measurement window. That pooled association does not establish uniform age-related impairment.');
body=body.replace('Spreading protein across the day was not shown to set this pool.','Timing and distribution are assessed separately; the evidence does not establish a universal schedule for optimising this precursor pool.');
body=body.replace('No intake dose is established.','No neurotransmitter-targeted intake dose is established.');
const oldSopStart=body.indexOf('<p class="brs-hub-sop-category-desc">');
const oldSopEnd=body.indexOf('</div>',oldSopStart);
body=body.slice(0,oldSopStart)+`<div class="brs-fm-hub-item brs-hub-sop-category" data-brs-fm-hub data-brs-sop-category="food_prep">\n<div class="brs-fm-hub-shell">\n<button type="button" class="brs-fm-hub-summary" aria-expanded="false"><span class="brs-fm-hub-chevron" aria-hidden="true"></span><strong>Food Preparation &amp; Delivery</strong></button>\n<div class="brs-fm-hub-panel" hidden>\n<p class="brs-hub-sop-category-desc">A qualified preparation relationship, not general cooking advice.</p>\n\n- ${sop.input}\n\nMatched beef texture altered dietary tracer delivery, not total amino-acid concentrations or brain neurotransmitters. [PM1-F5](#pm1-f5).\n\n</div>\n</div>\n</div>\n\n`+body.slice(oldSopEnd);
body=body.replace('No lifestyle lever is established. Meal timing and protein distribution across the day were not shown to set this precursor pool.','No PM1-specific lifestyle intervention is selected after this assessment. Exercise, sleep and hydration findings remain available in Evidence & Audit; no demonstrated absence of broader benefit is implied.');
const section5=body.indexOf('## 5. BRS Pathways and Connections');
body=body.slice(0,section5)+['PM1-F5','PM1-F6'].map(id=>`<ScientificFinding finding={${JSON.stringify(readerFinding(data.scientific_findings.find(f=>f.id===id)))}} />\n\n`).join('')+body.slice(section5);
body=replacePmReferencesSection(body,renderNumberedPmReferencesSection(data.references));
body+='\n### PM-local source records\n\n'+external.map(s=>`- <span id="${localKey(s)}" />${s.title}. ${s.doi?'DOI: '+s.doi+'. ':''}[Original source](${s.url}). Access checked ${date}. ${s.access}`).join('\n')+'\n';
body+='\n### Curated biochemical references\n\n- <span id="pm-curated-pah" />[C1] UniProtKB, Phenylalanine-4-hydroxylase (PAH), human, accession P00439, entry version 269 (2 September 2026); accessed '+date+'. [Authoritative record](https://www.uniprot.org/uniprotkb/P00439/entry). [Return to PM1-F3](#pm1-f3).\n- <span id="pm-curated-rhea" />[C2] Rhea 20273, phenylalanine hydroxylation reaction; accessed '+date+'. [Authoritative reaction](https://www.rhea-db.org/rhea/20273). [Return to PM1-F3](#pm1-f3).\n\n';
body=body.replace('## 4. Mechanistic Basis','## 4. Mechanistic Basis\n\nPhenylalanine-4-hydroxylase (PAH) contributes to endogenous tyrosine supply. [UniProt C1](#pm-curated-pah) and [Rhea C2](#pm-curated-rhea) establish reaction identity, not an independent dietary cofactor admission.\n');
body+='\n## Scientific Lesson\n\nDietary tracer appearance identifies amino acids arriving from the ingested food. Total plasma concentration also reflects endogenous turnover, tissue uptake and clearance. A higher tracer appearance or earlier peak is therefore not automatically a larger usable brain precursor supply, and neither establishes attention or mood benefit. [PM1-F1](#pm1-f1), [PM1-F5](#pm1-f5), [PM1-F6](#pm1-f6).\n';
fs.writeFileSync(out+'/proposed-pm1.mdx',matter.stringify(body,data));
fs.writeFileSync(out+'/draft-data.json',JSON.stringify(data,null,2)+'\n');
fs.writeFileSync(out+'/assessments-v1.json',JSON.stringify(assessments,null,2)+'\n');
const preserve=['dietary_input_traceability','dietary_lever_atoms','key_constraints','pm_kc_relationships','kc_applicability_adjudications','kc_change_control_flags','kc_adjudication_history','phenome_relationships'];
fs.writeFileSync(out+'/baseline-manifest.json',JSON.stringify({date,canonical,sha256:createHash('sha256').update(original).digest('hex'),preserved:preserve,
  inheritedCanonicalChanges:['BRS1-FM4-PM9','BRS6-FM1-PM2','BRS2-FM1-PM3'],baselineNote:'Full uncommitted integration checkout copied without resetting or committing. Canonical and governing records remain unchanged by PM1 execution.',
  approvalRequired:['All proposed PM1 wording, SOP selection and SEC adoption','Tyrosine independent dietary admission remains Unset pending explicit adjudication','Immutable SOP/food-strategy registration only after scientific approval','PM1 canonical SEC allowlist expansion requires separate schema approval']},null,2)+'\n');
let previewBody=body.replaceAll('<ScientificFinding finding=','<PM1Finding finding=');
for(const [a,b] of [['3.1 Dietary Requirements','1.1 Dietary Requirements'],['3.1.1 Direct and/or Derived Dietary Requirements','1.1.1 Direct and/or Derived Dietary Requirements'],['3.1.2 Cofactors and Substrates','1.1.2 Cofactors and Substrates'],['3.1.3 Key Constraints','1.1.3 Key Constraints']])previewBody=previewBody.replace('<strong>'+a+'</strong>','<strong>'+b+'</strong>');
previewBody=previewBody.replace('<strong>3.2 System Optimisation Practices</strong>','<strong>3.1 System Optimisation Practices</strong>').replace('<strong>3.3 Lifestyle Levers</strong>','<strong>3.2 Lifestyle Levers</strong>');
previewBody=previewBody.replace('**Intervention Dominance:** Diet-Dominant','**Intervention Dominance:** Diet-Dominant — Dietary Requirements\n\nExperimentally demonstrated dietary supply supports prominence; no comparative clinical superiority is implied.');
const preview='---\nid: sec-pm1-reassessment\ntitle: Amino-Acid Availability & Prioritisation — Stage 2A/2B review\nslug: /system/sec-calibration/pm1-reassessment\nhide_title: true\nlist_image: /img/biological-targets/brs1-portrait-thumbnail.png\n---\n\nimport {PM1Page, PM1Finding, PM1Enhancements} from \'@site/src/components/SecCalibrationPreview/PM1Preview\';\n\n<PM1Page>\n\n'+previewBody+'\n<PM1Enhancements />\n\n</PM1Page>\n';
fs.writeFileSync('docs/system/sec-calibration/pm1-reassessment.mdx',preview);
for(const key of preserve)if(JSON.stringify(data[key])!==JSON.stringify(before[key]))throw Error('Protected field changed: '+key);
console.log('Prepared complete PM1 draft and isolated preview; canonical untouched. '+assessments.length+' assessment records; one proposed SOP; zero selected lifestyle levers.');
