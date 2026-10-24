import React from 'react';
import {useLocation} from '@docusaurus/router';
import ScientificFinding, {type ScientificFindingData} from '../ScientificFinding';
import PmDietaryLeverEnhancer from '../PmDietaryLeverEnhancer';
import EvidenceConfidenceIndicator from '../EvidenceConfidenceIndicator';
import {SameFinding} from './SamePreview';
import {assessmentPresentation} from './auditPresentation.mjs';
import assessments from '../../../review/sec-integration/assessments.json';
import reconciliation from '../../../review/sec-integration/reconciliation.json';
import styles from './styles.module.css';

export function V1Intro({pmId}: {pmId:string}) {
  return <aside className={styles.notice} role="note">
    <h1>{{'BRS1-FM4-PM9':'Gamma-aminobutyric acid (GABA) Synthesis Capacity','BRS6-FM1-PM2':'Glycaemic Variability Regulation','BRS2-FM1-PM3':'S-adenosylmethionine (SAMe) Synthesis'}[pmId]} — Proposed V1</h1>
    <p>Scientific review draft. Canonical records, accepted dietary relationships and earlier pilot histories remain unchanged. Proposed intervention selections and numerical Synthesised Evidence Confidence (SEC) integration require approval before rollout.</p>
    <a href="?review=1">Evidence &amp; Audit</a>
  </aside>;
}

export function V1Finding({finding}: {finding:ScientificFindingData}) {
  if(['PM3-F1','PM3-F4'].includes(finding.id)) return <SameFinding finding={finding}/>;
  const record=assessments.find(r=>r.findingId===finding.id);
  if(!record) return <ScientificFinding finding={finding}/>;
  const view=assessmentPresentation(record);
  return <div className={styles.finding} data-sec-finding={finding.id}>
    <div className={styles.confidence} data-sec-assessment-status={view.status}>
      <strong>{finding.id} · {view.statusLabel}</strong>
      <EvidenceConfidenceIndicator score={view.score} srPrefix="Synthesised Evidence Confidence"/>
      <a href={'?review=1#'+record.id}>Evidence &amp; Audit assessment</a>
    </div>
    <ScientificFinding finding={{...finding,synthesised_evidence_confidence:view.readout+' · '+view.statusLabel}}/>
    {finding.id==='PM9-F1' && <p id="pm9-f1-curated">Reaction and cofactor provenance: <a href="#pm-curated-1">[C1] Rhea</a> · <a href="#pm-curated-2">[C2] Reactome</a> · <a href="#pm-curated-3">[C3] Reactome</a> · <a href="#pm-curated-4">[C4] UniProt</a> · <a href="#pm-curated-5">[C5] UniProt</a>. These annotations do not establish human dietary responsiveness or experimental replication.</p>}
  </div>;
}

export function V1ExtraFindings({pmId}:{pmId:string}) {
  return <>{assessments.filter(r=>r.pmId===pmId && (pmId==='BRS2-FM1-PM3'?r.findingId==='PM3-F5':Number(r.findingId.split('-F')[1])>=5)).map(r=>
    <V1Finding key={r.id} finding={{id:r.findingId,finding_label:r.title,finding_statement:r.proposition,finding_summary:r.proposition,
      synthesis:r.proposition,synthesis_limitations:r.limitations.join(' '),synthesised_evidence_confidence:'not-yet-scored',
      evidence_considered:r.sources.targetedChecks.map(s=>({label:s.doi,href:'https://doi.org/'+s.doi,evidence_source:'bounded-external-search',directional_finding:s.assessment}))}}/>
  )}</>;
}

export function V1Enhancements({data}:{data:Record<string,unknown>}) {
  return <PmDietaryLeverEnhancer frontMatter={data}/>;
}

export function V1Interventions({section,data}:{section:string;data:any}) {
  const rows=section==='3.2'?data.system_optimisation_practices:data.lifestyle_priorities;
  return <><p>{section==='3.2'?'Defined dietary protocols':'Defined activity protocols'} tested in the stated diabetes/prediabetes settings; not general prescriptions.</p>
    <ul>{rows.map(row=><li key={row.atom_id}>{row.input}</li>)}</ul>
    <p><a href="?review=1#v1-intervention-decisions">Protocol selection, evidence and limitations</a></p>
    <p>Medication, hypoglycaemia risk, exercise capacity and suitability of an early eating window require individual assessment.</p>
  </>;
}

export function V1DecisionAudit() {
  const location=useLocation();
  const slug=location.pathname.replace(/\/$/,'').split('/').pop();
  const record=reconciliation.records.find(r=>r.slug===slug);
  if(!record)return null;
  return <div id="v1-intervention-decisions" className="brs-fm-hub-item brain-sf-disclosure" data-brs-fm-hub>
    <div className="brs-fm-hub-shell">
      <button type="button" className="brs-fm-hub-summary" aria-expanded="false"><span className="brs-fm-hub-chevron" aria-hidden="true"/><strong>V1 scientific and intervention decisions · {reconciliation.date}</strong></button>
      <div className="brs-fm-hub-panel" hidden>
        <ul>{record.changes.map(change=><li key={change}>{change}</li>)}</ul>
        <p>{record.dietaryDecisions}</p>
        <p>{record.selectedSops.length} proposed SOPs; {record.selectedLifestyle.length} proposed lifestyle levers. Three is a ceiling, not a quota. Proposed admissions are separate from SEC confidence.</p>
        {[...record.selectedSops,...record.selectedLifestyle].map(row=><p key={row.atom_id}><strong>{row.input}</strong> · <a href={'?review=0#'+row.description_finding_id.toLowerCase()}>{row.description_finding_id}</a> · {row.evidence_limitation}</p>)}
        <h4>Retained candidates and ownership follow-up</h4>
        {record.slug==='glycaemic-variability' && <p><a href="/docs/system/sec-calibration/glycaemic-variability?review=1#glycaemic-stage2-adjudication">Original bounded intervention landscape, full source appraisal and recovery history</a></p>}
        <ul>{record.candidateDecisions.map(row=><li key={row.id}><strong>{row.candidate}</strong>: {row.decision}. {row.reason} {row.owner}</li>)}</ul>
        <p>Retired public advice is preserved in the reconciliation archive and unchanged canonical source, not scientifically erased or automatically admitted to another PM.</p>
        <h4>Intervention-category review</h4>
        <ul>{record.hubReview.map(([category,decision])=><li key={category}><strong>{category}:</strong> {decision}</li>)}</ul>
        <h4>Remaining scientific questions</h4><ul>{record.unresolved.map(item=><li key={item}>{item}</li>)}</ul>
        <p>Assessment status does not establish evidence-review completion or correction resolution. Missing records remain unavailable, not implicitly clean.</p>
      </div>
    </div>
  </div>;
}
