// Generates review-only proposals. Never writes canonical PMs or production metadata.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {execFileSync} from 'node:child_process';
import {audit, sf2Audit} from '../src/components/SecCalibrationPreview/assessmentAudit.mjs';
import {expandedGlycaemicAudits, proposedSops, proposedLifestyle, stage2Findings, stage2Candidates, stage2Studies} from '../src/components/SecCalibrationPreview/glycaemicStage2.mjs';
import {sameAudits} from '../src/components/SecCalibrationPreview/sameAudit.mjs';

const date = '2026-10-18';
const canonicalMain=execFileSync('git',['rev-parse','FETCH_HEAD'],{encoding:'utf8'}).trim();
const output = 'review/sec-integration';
const definitions = [
  {slug:'gaba', pmId:'BRS1-FM4-PM9', canonical:'docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx'},
  {slug:'glycaemic-variability', pmId:'BRS6-FM1-PM2', canonical:'docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation.mdx'},
  {slug:'same-synthesis', pmId:'BRS2-FM1-PM3', canonical:'docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx'},
];
const clone = value => JSON.parse(JSON.stringify(value));
const archive = record => ({...clone(record), previousAssessments:clone(record.previousAssessments || [])});
const refresh = (record, changes, decision) => ({
  ...archive(record), ...changes, recordVersion:record.recordVersion + 1,
  previousAssessments:[...clone(record.previousAssessments || []), clone(record)],
  history:[...clone(record.history), {date, decision}],
});
const records = [];
const reconciliation = [];
const nullFactors = {D:null,B:null,P:null,R:null};
const methodology = audit.methodology;
const archivedLabels = ['Complementary protein pairing/distributed protein','Soaking or sprouting phytate-rich foods','Gentle fish cooking/EPA-DHA preservation','Meal timing/circadian eating','Physical activity/stress recovery'];
const approvedF6 = 'In the high-dose vitamin B6 trial, self-reported anxiety decreased within the B6 group, but the change-versus-placebo interaction was not significant (p=0.140). The visual surround-suppression interaction was significant (p=0.011). GABA synthesis was not measured.';
const oldFieldRationale='The closest human trial found that high-dose vitamin B6 reduced self-reported anxiety and strengthened an inhibitory visual assay, but it measured neither GABA nor GABA synthesis';
const newFieldRationale='The high-dose B6 group improved from baseline, but the anxiety change-versus-placebo interaction was inconclusive (p=0.140); the visual surround-suppression interaction was positive (p=0.011). Neither GABA nor GABA synthesis was measured';
const unscored = (finding, pmId) => ({
  id:pmId.toLowerCase()+'-'+finding.id.toLowerCase()+'-v1-assessment',
  findingId:finding.id, pmId, title:finding.finding_label, recordVersion:1,
  proposition:finding.finding_statement, canonicalProposition:finding.finding_statement,
  canonicalRecord:clone(finding), assessmentStatus:'not-scored',
  factors:clone(nullFactors), rawScore:null, adjustedScore:null, humanReview:null,
  unscoredReason:finding.id.includes('IC') ? 'Interpretive constraint' : 'Contextual evidence; assessment incomplete',
  lastEvidenceAssessmentDate:date,
  rationale:{
    D:'The source endpoint and model are documented below; concentration, behaviour and synthesis flux are not interchangeable.',
    B:'Not assigned: source-specific methods have not been sufficiently reappraised to establish a complete factor judgement in this consolidation.',
    P:'Not assigned: uncertainty of the exact scoped proposition is not inferred from sample size or significance alone.',
    R:'Independent replication was not established in this assessment. Cohort overlap and heterogeneous regional or behavioural endpoints prohibit automatic replication credit.',
  },
  limitations:[finding.synthesis_limitations, 'No new PM-specific intervention or clinical efficacy is admitted from this contextual record.'],
  sources:{
    supporting:(finding.evidence_considered || []).map(e=>e.citation_key).filter(Boolean),
    contextual:(finding.connected_supportive_evidence || []).map(e=>e.citation_key).filter(Boolean),
    contradictory:[], contradictoryAssessment:'Original positive, null and contradictory results are preserved in the complete proposed Finding and canonicalRecord. No literature-wide absence claim is made.',
    targetedChecks:[], retrievalLimited:[],
  },
  process:'Codex three-PM V1 consolidation, version 1; reused pilot appraisals and bounded targeted primary-source check; no human review',
  methodology, history:[{date, decision:'Context retained with original identity and evidence. No manufactured SEC total; no human-review or intervention admission inferred.'}],
});

function replaceInterventions(body, section, replacement) {
  const start = body.indexOf('<strong>'+section+' ');
  if (start < 0) throw new Error('Missing intervention section '+section);
  const panel = body.indexOf('<div class="brs-fm-hub-panel" hidden>', start);
  const end = body.indexOf('\n</div>\n</div>\n</div>', panel);
  if (panel < 0 || end < 0) throw new Error('Unexpected intervention structure');
  const contentStart = panel + '<div class="brs-fm-hub-panel" hidden>'.length;
  return body.slice(0,contentStart)+'\n\n'+replacement+'\n'+body.slice(end);
}
function rewriteFindingCalls(body, findings) {
  return body.replace(/<(?:CalibrationFinding|GlycaemicFinding|SameFinding) finding=\{(\{[^\n]+\})\} \/>/g, (whole,json) => {
    const original=JSON.parse(json), replacement=findings.find(f=>f.id===original.id);
    if (!replacement) throw new Error('Unresolved Finding '+original.id);
    const merged={...original,...replacement};
    for(const field of ['evidence_considered','connected_supportive_evidence']) if(Array.isArray(replacement[field])) {
      merged[field]=replacement[field].map(e=>({...original[field]?.find(old=>old.citation_key===e.citation_key && e.citation_key),...e}));
    }
    return '<V1Finding finding={'+JSON.stringify(merged)+'} />';
  });
}

for (const def of definitions) {
  const mainSource=execFileSync('git',['show',canonicalMain+':'+def.canonical],{encoding:'utf8',maxBuffer:10e6});
  if(mainSource!==fs.readFileSync(def.canonical,'utf8')) throw new Error('Canonical baseline diverged; adjudicate before regenerating '+def.canonical);
  const canonical=matter(fs.readFileSync(def.canonical,'utf8'));
  const pilot=matter(fs.readFileSync('docs/system/sec-calibration/'+def.slug+'.mdx','utf8'));
  const data=clone(canonical.data);
  let local=[], selectedSops=[], selectedLife=[], changes=[];
  if (def.slug==='gaba') {
    local = data.scientific_findings.map(f=> {
      if (f.id==='PM9-F1') return refresh(audit,{},'V1 review: retained conditional 4/8 and unresolved B/P/R. Curated reaction identity is separate from inferred human reserve capacity; no promotion.');
      if (f.id==='PM9-F2') return refresh(sf2Audit,{},'V1 review: retained conditional 5/8; pivotal methods/speciation and replication gaps remain material. Corrected activation route and Tang species in draft, not canonical.');
      const r=unscored(f,def.pmId);
      if (f.id==='PM9-F6') {
        r.title='B6 trial: anxiety comparator and visual endpoint';
        r.proposition=approvedF6;
        r.scopeNote='Original trial wording is corrected, not evidence-supported rejection of B6: within-arm significance does not establish a treatment-by-time interaction. No GABA-specific intervention admission.';
        r.sources.targetedChecks=[{doi:'10.1002/hup.2852',role:'Contextual intervention; positive visual endpoint and inconclusive anxiety comparator',access:'Scite full-text blinding, analysis, exclusion and Results sections appraised',assessment:'Computer-numbered double-blind bottles; five phases and outcome-specific exclusions. Anxiety interaction F(1,173)=2.20, p=0.140, versus within-B6 d=0.37. Visual interaction F(1,202)=6.58, p=0.011. Different endpoints and subsamples; no GABA, PLP or synthesis measurement.'}];
        r.limitations.unshift('Anxiety efficacy versus placebo was not established by the reported interaction; significance within one arm and not the other is not a between-arm effect.');
      }
      if (f.id==='PM9-F7') {
        r.sources.retrievalLimited=[{doi:'10.1016/j.nbd.2023.106165',url:'https://pubmed.ncbi.nlm.nih.gov/37230180/',limitation:'Scite supplied no readable text; targeted publisher/PubMed/repository discovery located the open-access report and a preprint lead, but full experimental methods were not appraised here. B/P/R remain unresolved. Not negative evidence.'}];
      }
      return r;
    });
    for (const f of data.scientific_findings) {
      const r=local.find(r=>r.findingId===f.id);
      f.finding_statement=r.proposition; f.finding_summary=r.proposition;
      if (f.id==='PM9-F1') {
        f.finding_label='GAD cofactor occupancy and regulatory capacity';
        f.synthesis=r.proposition;
        f.synthesis_limitations=r.limitations.join(' ');
      }
      if (f.id==='PM9-F2') {
        f.finding_label='PDXK metal-nucleotide regulation in vitro';
        f.synthesis='Pyridoxal kinase (PDXK) phosphorylates vitamin B6 vitamers. Pyridoxine-5′-phosphate oxidase (PNPO) completes activation of phosphorylated pyridoxine/pyridoxamine to pyridoxal 5′-phosphate (PLP). The experimentally assessed metal/nucleotide effects depend on assay conditions; MgATP evidence prevents a universal zinc-preference claim. PLP is used by many enzyme systems, not selectively by glutamate decarboxylase.';
        f.synthesis_limitations=r.limitations.join(' ');
        for(const e of f.evidence_considered) if(e.citation_key==='tang_crystal_2005') {
          e.directional_finding='Sheep-brain PDXK structural study; contextual binding evidence, not a human zinc-regulation replication.';
          e.assessment={...e.assessment,population:'Purified sheep-brain pyridoxal kinase; no human participants.',study:'Crystallographic inhibitor-binding study of sheep-brain pyridoxal kinase.',result:e.directional_finding,evidence_summary:e.directional_finding};
        }
      }
      if(f.id==='PM9-F6') {
        f.synthesis=approvedF6;f.finding_label='B6 trial: anxiety comparison and visual inhibition differ';f.synthesis_limitations=r.limitations.join(' ');
        for(const e of f.evidence_considered) if(e.citation_key==='field_high-dose_2022') {
          e.directional_finding=approvedF6;
          e.assessment={...e.assessment,result:approvedF6,effect_magnitude:'Within-B6 anxiety d=0.37; treatment-by-time interaction p=0.140. Visual surround interaction p=0.011.',evidence_summary:'Inconclusive anxiety comparator and a positive inhibitory-visual endpoint, without measurement of GABA synthesis.'};
        }
      }
      if(f.id==='PM9-F7') {
        f.synthesis=f.synthesis.replace('This is the only evidence that manipulates GABA synthesis itself and measures behaviour','Among the sources assessed here, this genetic perturbation of one GAD isoform also measures behaviour');
        for(const e of f.evidence_considered) if(e.assessment?.evidence_summary) e.assessment.evidence_summary=e.assessment.evidence_summary.replace('The only available evidence manipulating GABA synthesis and measuring behaviour.','A reviewed genetic GAD65 perturbation with behavioural endpoints.');
      }
      if(f.id==='PM9-F5') f.synthesis_limitations=f.synthesis_limitations.replace('no directional claim about GABA and sleep can currently be made','these three studies do not establish a uniform directional GABA-concentration difference in insomnia');
    }
    for(const relationship of data.phenome_relationships) {
      relationship.rationale=relationship.rationale.replace(oldFieldRationale,newFieldRationale)
        .replace('There is no human evidence linking GABA synthesis capacity to social engagement','Direct human evidence linking GABA synthesis capacity to social engagement was not established in the assessed sources');
    }
    changes=[
      'Retain F1 conditional 4/8 and F2 conditional 5/8; align statement, summary and synthesis to the assessed propositions.',
      'Correct PDXK/PNPO activation and Tang sheep-brain identity; retain original study citations and archive.',
      'Correct F6 anxiety comparator: p=0.140 interaction, not established efficacy versus placebo; preserve positive visual result.',
      'Preserve F3-F7 and IC1 as bounded contextual/interpretive records, with explicit unscored audit assessments.',
      'Remove generic legacy preparation and lifestyle advice from proposed public interventions; retain original body in canonical archive.',
    ];
  } else if(def.slug==='glycaemic-variability') {
    local=expandedGlycaemicAudits.map(archive);
    const old=local.find(r=>r.findingId==='PM2-F1');
    const narrowed='In an uncontrolled cohort of 13 sedentary adults with type 2 diabetes, seven days of aerobic training were associated with lower glucose range and selected excursion measures; high-glucose excursion frequency and duration remained statistically inconclusive.';
    local=local.map(r=>r===old?refresh(r,{
      proposition:narrowed, factors:{D:2,B:1,P:1,R:0}, rawScore:4,adjustedScore:4,
      scopeNote:'Scoped observed change in 13 sedentary adults with type 2 diabetes: baseline monitoring versus the final days of seven supervised exercise sessions. No causal attribution, universal exercise effect or all-endpoint improvement is asserted.',
      capRationale:'No existing cap triggered for the explicitly observational before/after proposition. The prior causal all-endpoint claim remains archived at adjusted 2/8; no controls were added.',
      rationale:{...r.rationale,B:'For the scoped observed cohort change, controlled meals, supervised sessions and within-person monitoring provide partial protection; time trends, selection and no concurrent control preclude a causal interpretation. Bias Protection 1 applies only after the claim was explicitly narrowed, not retroactively to the old causal claim.',P:'Observed range and selected low-glucose measures changed; high-glucose frequency (p=0.07) and duration (p=0.06) remain inconclusive. The revised proposition preserves those distinctions. Small-cohort endpoint and magnitude uncertainty warrants Precision 1, not a claim of universal improvement or equivalence.'},
      limitations:['Uncontrolled before/after association, not demonstrated exercise causation or all-endpoint improvement.',...r.limitations.slice(1)],
      recommendation:'V1 proposes the explicitly observational wording above. The old causal claim and its 2/8 assessment remain archived; no confidence is transferred to broader aerobic advice.',
    },'V1: explicitly narrowed causal all-endpoint wording to observed cohort changes with inconclusive high-excursion endpoints. New proposition assessed 4/8; previous raw 3/adjusted 2 and history preserved.'):r);
    selectedSops=clone(proposedSops.filter(r=>r.description_finding_id!=='PM2-F2')).map((r,i)=>({...r,atom_id:'PM2-SOP-'+(i+2)}));
    selectedLife=clone(proposedLifestyle).map((r,i)=>({...r,atom_id:'PM2-LIFE-'+(i+2)}));
    data.system_optimisation_practices=selectedSops;
    data.lifestyle_priorities=selectedLife;
    const all=[...data.scientific_findings,...clone(stage2Findings)];
    for(const f of all) {
      const r=local.find(r=>r.findingId===f.id);
      f.finding_statement=r.proposition; f.finding_summary=r.proposition;
      if(f.id==='PM2-F1') {f.finding_label='Short training and observed glucose excursions';f.synthesis=r.proposition;f.synthesis_limitations=r.limitations.join(' ');for(const e of f.evidence_considered){e.directional_finding=r.proposition;}}
      if(f.id==='PM2-F3') {f.synthesis='The original cohort association was not reproduced in an independent better-controlled diabetes sample using mass spectrometry. Population and assay differences constrain generalisation; this is not a causal oxidative-stress claim.';f.synthesis_limitations=r.limitations.join(' ');}
    }
    data.scientific_findings=all;
    const canonicalRoute='/'+def.canonical.replace(/\.mdx$/,'');
    data.references=[...data.references,...stage2Studies.map(s=>'['+s.author+']('+canonicalRoute+'#stage2-ref-'+s.id+')')];
    changes=[
      'F1 narrowed and explicitly reassessed: old causal 2/8 archived; scoped observational proposition 4/8.',
      'F2 acute fish/rice evidence and 4/8 retained, but not a leading SOP: only acute meal dispersion, narrow food/population protocol and limited transportability.',
      'F3 association includes independent null evidence; F4 remains acute exposure context, not a PM2 variability intervention.',
      'Select two dietary SOPs (grain processing package, early/front-loaded eating) and two lifestyle protocols (interval walking, brief vigorous bouts), each with exact Finding and six-atom evidence links.',
      'Retire broad legacy aerobic advice and fish/rice leading placement in the draft only; preserve source records and candidate decisions.',
    ];
  } else {
    local=sameAudits.map(archive);
    for(const f of data.scientific_findings) {
      const r=local.find(r=>r.findingId===f.id);
      f.finding_summary=r.proposition;
      if(f.id==='PM3-F1') f.synthesis='The MAT reaction and catalytic participants have curated provenance. Human MAT2A studies support conflicting ATP-first and rapid-equilibrium random substrate-binding models; no settled universal order is asserted. MAT2B stability is assessed separately in proposed F5.';
    }
    const experimental=local.find(r=>r.findingId==='PM3-F5');
    data.scientific_findings.push({
      id:'PM3-F5',finding_label:experimental.title,finding_statement:experimental.proposition,finding_summary:experimental.proposition,
      synthesis:'Purified-enzyme activity decay and mammalian-cell perturbation/rescue support a stability contribution, with non-identical endpoints. Additional allosteric/catalytic regulation remains possible.',
      synthesis_limitations:experimental.limitations.join(' '),synthesised_evidence_confidence:'not-yet-scored',
      evidence_considered:experimental.sources.targetedChecks.map(s=>({label:s.doi,href:'https://doi.org/'+s.doi,evidence_source:'bounded-external-search',directional_finding:s.assessment})),
    });
    changes=[
      'F1/F4 become unscored curated biochemical provenance in proposed reader presentation, retaining identities and complete historical evidence.',
      'F2/F3 remain bounded evidence gaps, IC1 remains interpretive, F5 proposed experimental stability synthesis retains provisional 5/8.',
      'Explicitly retain conflicting ATP-first versus random substrate-binding models; do not assert settled kinetic order.',
      'Remove unsupported legume-preparation SOPs from public draft; no PM3-specific lifestyle protocol admitted.',
    ];
  }
  records.push(...local);
  if(def.slug!=='glycaemic-variability') {
    data.system_optimisation_practices=[];
    data.lifestyle_priorities=[];
  }
  let body=pilot.content.replace(/^import .*\n/gm,'').replace(/^export const previewDisplayData = .*\n/gm,'');
  body=body.replace(/<(?:PreviewIntro|GlycaemicPreviewIntro|SamePreviewIntro) \/>/g,'<V1Intro pmId="'+def.pmId+'" />');
  body=body.replace(/<PreviewEnhancements data=\{previewDisplayData\} \/>/g,'<PreviewEnhancements data={previewDisplayData} />');
  body=body.replace(/<GlycaemicPreviewEnhancements data=\{previewDisplayData\} \/>/g,'<V1Enhancements data={previewDisplayData} />');
  body=body.replace(/<SamePreviewEnhancements data=\{previewDisplayData\} \/>/g,'<SamePreviewEnhancements data={previewDisplayData} />');
  body=rewriteFindingCalls(body,data.scientific_findings);
  body=body.replace(/<GlycaemicStage2Findings \/>/g,'<V1ExtraFindings pmId="'+def.pmId+'" />');
  body=body.replace(/<SameExperimentalFinding \/>/g,'<V1ExtraFindings pmId="'+def.pmId+'" />');
  body=body.replace(/<GlycaemicInterventions section="3\.[23]" \/>/g,'');
  for(const section of ['3.2','3.3']) {
    const rows=section==='3.2'?selectedSops:selectedLife;
    const prose=rows.length?'<V1Interventions section="'+section+'" data={previewDisplayData} />':'No PM-specific '+(section==='3.2'?'optimisation protocol':'lifestyle protocol')+' is admitted in this draft.';
    body=replaceInterventions(body,section,prose);
  }
  if(def.slug==='gaba') {
    body=body.replace('Vitamin B6 in food is the dietary route to the cofactor, and it mainly affects reserve capacity rather than everyday output.','Dietary vitamin B6 supplies the cofactor precursor. Experimental isoform differences suggest potentially recruitable capacity; ordinary dietary enhancement of human brain synthesis is not established.');
    body=body.replace('A high-dose vitamin B6 trial reduced anxiety scores without measuring GABA, so it does not set a dose for this mechanism.','A high-dose vitamin B6 trial did not establish an anxiety improvement versus placebo and did not measure GABA synthesis; it does not set a dose for this mechanism.');
    body=body.replace(oldFieldRationale,newFieldRationale)
      .replace('There is no human evidence linking GABA synthesis capacity to social engagement','Direct human evidence linking GABA synthesis capacity to social engagement was not established in the assessed sources')
      .replace('GAD65 is substantially apoenzyme and recruitable by additional cofactor while GAD67 is largely holoenzyme, so cofactor sufficiency principally governs reserve rather than basal synthesis','Experimental differences in GAD65/GAD67 cofactor occupancy suggest potentially recruitable catalytic capacity; its physiological importance in the human brain remains uncertain')
      .replace('Enzyme evidence distinguishes largely cofactor-saturated GAD67, which sustains basal synthesis, from a recruitable GAD65 pool: PLP availability can therefore influence reserve synthesis capacity rather than simply determine the resting rate.','Experimental GAD65/GAD67 cofactor-occupancy differences suggest potentially recruitable synthesis capacity. This is not a demonstrated reserve response to ordinary dietary vitamin B6 in the human brain.');
    body=body.replace(/<CalibrationExamples \/>/g,'');
  }
  if(def.slug==='glycaemic-variability') {
    body=body.replace('In people with type 2 diabetes, short aerobic training reduced measured excursions.','In a small uncontrolled type 2 diabetes cohort, short aerobic training was associated with selected excursion changes.');
    body=body.replace('Reducing excessive excursions improves the measured glycaemic profile in the studied diabetes context.','Selected protocols changed measured glucose-dispersion endpoints in the studied diabetes cohorts; this does not establish a clinical or cognitive benefit.');
    body=body.replace('Seven days of aerobic training reduced excursion frequency, magnitude and duration in type 2 diabetes.','Short aerobic training was associated with selected excursion changes in an uncontrolled diabetes cohort; high-excursion frequency and duration remained inconclusive.');
  }
  const displayKeys=['pm_id','dietary_input_traceability','dietary_lever_atoms','dietary_lever_presentations','references','system_optimisation_practices','lifestyle_priorities'];
  const display=Object.fromEntries(displayKeys.filter(k=>data[k]!==undefined).map(k=>[k,data[k]]));
  display.scientific_findings=data.scientific_findings.map(f=>({id:f.id,finding_label:f.finding_label}));
  const imports=[
    "import {V1Finding, V1Intro, V1Enhancements, V1Interventions, V1ExtraFindings} from '@site/src/components/SecCalibrationPreview/V1Preview';",
    "import {PreviewEnhancements, CuratedReferenceList} from '@site/src/components/SecCalibrationPreview';",
    "import {SamePreviewEnhancements, SameReferences} from '@site/src/components/SecCalibrationPreview/SamePreview';",
    "import {GlycaemicStage2References} from '@site/src/components/SecCalibrationPreview/GlycaemicInterventionPreview';",
  ].join('\n');
  const fullBody=imports+'\n\nexport const previewDisplayData = '+JSON.stringify(display)+';\n\n'+body.trim()+'\n';
  const fm={id:'sec-v1-'+def.slug,title:data.title+' — Proposed V1',slug:'/system/sec-calibration/v1/'+def.slug,hide_title:true,list_image:data.list_image || '/img/biological-targets/'+(def.slug==='gaba'?'brs1':def.slug==='same-synthesis'?'brs2':'brs6')+'-portrait-thumbnail.png'};
  fs.mkdirSync(output+'/drafts',{recursive:true});
  fs.mkdirSync('docs/system/sec-calibration/v1',{recursive:true});
  // Canonical-shaped drafts stay outside docs, so scientific identities cannot register.
  fs.writeFileSync(output+'/drafts/'+def.slug+'.mdx',matter.stringify(fullBody,data));
  fs.writeFileSync('docs/system/sec-calibration/v1/'+def.slug+'.mdx',matter.stringify(fullBody,fm));
  const originalSections=canonical.content.match(/^## \d+\.[^\n]*/gm) || [];
  reconciliation.push({...def,originalSections,changes,
    dietaryDecisions:'Existing dietary_input_traceability, dietary_lever_atoms, dietary_lever_presentations and KC decisions preserved without scientific reclassification.',
    selectedSops,selectedLifestyle:selectedLife,
    hubReview:def.slug==='gaba'?[
      ['Food Preparation & Delivery','Generic protein pairing, sprouting and fish-preparation advice does not establish the PM9 glutamate/PLP relationship; not selected. Existing B6 dietary provision is preserved.'],
      ['Conditional Supplementation','Field B6 trial: visual endpoint positive, anxiety comparator inconclusive and GABA synthesis unmeasured. Severe deficiency/genetic cofactor-inactivation evidence is not ordinary dietary enhancement; no high-dose SOP selected.'],
      ['Dietary & Fasting Protocols','Existing Erecinska synaptosome and Zhang ketotic-rat tracer evidence is contextual. Label incorporation, metabolic adaptation and species limits prevent a general human ketogenic/GAD recommendation; retain for protocol-specific follow-up, not scientific rejection.'],
      ['Light & Circadian Optimisation','Legacy meal-timing assertion lacks an attached exact GAD/PLP protocol or established chain in the assessed records. No light/circadian intervention admitted for V1; no literature-wide absence claim.'],
      ['Stress & Autonomic Regulation','Generic stress-recovery advice has no exact PM9 synthesis relationship established in the assessed records; not selected as a protocol. Concentration or signalling changes cannot silently become synthesis-capacity claims.'],
      ['Lifestyle Priorities','Generic exercise/timing assertions are not PM9-specific public levers on the reviewed evidence. Relevant behaviour and concentration evidence remains contextual, not discarded.'],
    ]:def.slug==='same-synthesis'?[
      ['Food Preparation & Delivery','Legume cooking/protein preparation concerns delivery and meal quality, not an independently established MAT-optimisation protocol. Methionine/protein delivery records remain intact.'],
      ['Conditional Supplementation','Exogenous SAMe or combined folate/B12 mood-treatment evidence does not isolate endogenous MAT capacity. Accepted upstream supply remains; no supplementation SOP inferred.'],
      ['Dietary & Fasting Protocols','Corrillero dietary-pattern study measures circulating pools, not isolated MAT flux. Wan 2024 ketogenic liver-tumour work has a specific pathological model and different objective; not a general healthy-brain optimisation recommendation.'],
      ['Light & Circadian Optimisation','No exact light/timing MAT-capacity relationship established in the reviewed source set; no V1 protocol, without asserting that none could exist.'],
      ['Stress & Autonomic Regulation','Generic demand/ATP plausibility is not an independently supported MAT-specific intervention relationship; no protocol selected.'],
      ['Lifestyle Priorities','Intracellular ATP dependence does not establish exercise, sleep or timing prescriptions for SAMe synthesis; candidate-specific evidence remains a future improvement.'],
    ]:[
      ['Food Preparation & Delivery','Aberg processing package selected; resistant-starch/cooling distinctions and meal-specific versus daily outcomes retained.'],
      ['Conditional Supplementation','No generic nutrient-capacity requirement or supplement effect on PM2 variability inferred from exposure-only results.'],
      ['Dietary & Fasting Protocols','Early/front-loaded eating selected; exact fish/rice evidence retained but not leading. Whey, vinegar and complex preloads retain protocol-specific positive/null outcomes in original candidate audit.'],
      ['Light & Circadian Optimisation','Early eating is the tested dietary package, not proof of a light-specific or isolated clock mechanism.'],
      ['Stress & Autonomic Regulation','Original bounded screen retained contextual/mixed results; no isolated PM2 protocol selected.'],
      ['Lifestyle Priorities','Interval walking and brief vigorous bouts selected with population/medication boundaries; post-meal walking and sitting-break exposure evidence is not automatically variability evidence.'],
    ],
    archivedInterventions:def.slug==='gaba'?archivedLabels:def.slug==='same-synthesis'?['Soak/cook legumes for methionine provision','Gentle preparation of mixed protein sources']:canonical.data.system_optimisation_practices.concat(canonical.data.lifestyle_priorities),
    candidateDecisions:def.slug==='glycaemic-variability'?stage2Candidates.map(r=>r.id==='sequence'?{...r,decision:'Retained evidence; not selected for leading V1 SOP',reason:'Acute fish/rice dispersion is relevant but narrow; direct daylong food-package and early-eating evidence takes priority. Not scientifically rejected.'}:r):[],
    unresolved:def.slug==='gaba'?['F1 and F2 B/P/R verification remains conditional; no promotion.','Contextual F3-F7 complete SEC appraisals remain unfinished; no synthesis or intervention efficacy inferred.']:
      def.slug==='same-synthesis'?['Substrate-binding order remains unresolved.','KC2 remains unresolved; B12 route retained through PM1, no new PM3 admission.']:
      ['New intervention admissions and proposed identifier allocation require approval.','Touhamy and Dempsey targeted recovery gaps remain parked; not prerequisites for selecting other well-appraised protocols.'],
  });
}
fs.writeFileSync(output+'/assessments.json',JSON.stringify(records,null,2)+'\n');
fs.writeFileSync(output+'/reconciliation.json',JSON.stringify({date,canonicalMain,base:'98f7294088f1475c101cb0ff01ae11dc74d4af51',records:reconciliation},null,2)+'\n');
console.log('Generated three isolated complete drafts, three previews and '+records.length+' versioned assessment records. No canonical writes.');
