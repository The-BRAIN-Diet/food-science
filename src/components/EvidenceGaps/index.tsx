import {associationPilot, pilotInvestigations} from '../../lib/pmAssociationPilot.mjs';
import {findingReaderLabel, shortFindingId} from '../../lib/scientificFindingPresentation.mjs';
import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import records from '../../../system/framework-qc/pm-open-issues.json';
import {evidenceGapItems} from '../../lib/scientificTransparency.mjs';
import styles from './styles.module.css';
import EvidenceDisclosure from './Disclosure';

/** Lucide flask-conical outline (ISC; lucide-icons/lucide), with local liquid fill. No icon dependency. */
export function HalfFilledFlask() {
  return <svg className={styles.flask} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M6.453 15h11.094l2.208 4.04A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96Z" fill="currentColor" fillOpacity=".22" stroke="none" />
    <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
    <path d="M6.453 15h11.094M8.5 2h7" />
  </svg>;
}
export default function EvidenceGaps({panelId = "evidence-gaps-panel"}: {panelId?: string}) {
  const {frontMatter} = useDoc();
  const data = frontMatter as any;
  const rows = evidenceGapItems(records.issues, data.pm_id, data.intervention_adjudications, data.evidence_gaps);
  const findings = [...(data.scientific_findings || []), ...(data.scientific_reconstruction_history || []).flatMap(h => h.records?.scientific_findings || [])];
  const pilot = associationPilot(data);
  if (pilot) {
    const investigations=pilotInvestigations(data);
    return <section id={panelId} role="tabpanel" className={styles.section} aria-labelledby="evidence-gaps-tab">
      <h2 id="evidence-gaps-heading" tabIndex={-1}><HalfFilledFlask /> Investigations</h2>
      <p>Review activity, scientific conclusions and admission decisions are distinct. The linked history retains earlier assessments; non-admission does not establish that a biological relationship is false.</p>
      {['open','awaiting-further-evidence'].map(state => <section key={state}>
        <h3>{state === 'open' ? 'Open Investigations' : 'Non-conclusive — awaiting further evidence'}</h3>
        {!investigations.some(r=>r.review_state===state) && <p>No active next action is recorded. This does not imply scientific clearance or closure.</p>}
        {investigations.filter(r=>r.review_state===state).map(row=><EvidenceDisclosure key={row.source_id} id={row.source_id} label="Investigation" title={row.question}>
          <p><strong>Affected relationship/output:</strong> {row.affected}</p>
          <p><strong>What is established:</strong> {row.established}</p>
          {row.source.cannot_establish && <p><strong>What is not established:</strong> {row.source.cannot_establish}</p>}
          <p><strong>Missing evidence or unresolved link:</strong> {row.missing}</p>
          <p><strong>Why retain this question:</strong> {row.rationale}</p>
          <p><strong>Next action:</strong> {row.next_action}</p>
          <p><strong>Evidence needed:</strong> {row.required}</p>
          <p><strong>Supporting SFs:</strong> {row.finding_ids.length ? row.finding_ids.map(id=>{const f=findings.find(f=>f.id===id);return <span key={id}> <a href={'#'+id.toLowerCase()}>{f ? findingReaderLabel(f,data) : id}</a>; </span>}) : 'No SF association recorded; see the decision provenance.'}</p>
          {row.hypothesis_id && <p><a href={'?'+ '#' + row.hypothesis_id.toLowerCase()}>Hypothesis — {row.hypothesis_id}</a> · Unestablished</p>}
          {[...(row.source_type==='decision'?[row.source_id]:[]),...(row.decision_refs||[])].map(id=><p key={id}><a href={'?review=1#'+id.toLowerCase()}>Decision history — {id}</a></p>)}
        </EvidenceDisclosure>)}
      </section>)}
    </section>;
  }
  if (!rows.length) return null;
  return <section id={panelId} role="tabpanel" className={styles.section} aria-labelledby="evidence-gaps-tab">
    <h2 id="evidence-gaps-heading" tabIndex={-1}><HalfFilledFlask /> Evidence Gaps</h2>
    <p>Available research does not yet establish the specific relationships described below. These gaps and completed non-admissions are not intervention recommendations.</p>
    {rows.map((row,index) => <EvidenceDisclosure key={row.id} id={row.id} label={`Evidence Gap ${index+1}`} title={row.title} status={row.disposition === 'Not admitted' ? 'Not Admitted' : undefined}>
      <p><strong>Record ID:</strong> {row.id}</p>
      <p><strong>{row.disposition === 'Not admitted' ? 'Considered exposure:' : 'What the evidence establishes:'}</strong> {row.considered}</p>
      {row.disposition === 'Not admitted' && <ul>{(row.finding_ids || []).map(id => {const finding=findings.find(f=>f.id===id);return finding ? <li key={id}><a href={'?review=1#'+id.toLowerCase()}>{shortFindingId(id)}</a>: {finding.finding_statement}</li> : null;})}</ul>}
      {row.cannot_establish && <p><strong>What it cannot establish:</strong> {row.cannot_establish}</p>}
      {row.affected_relationship && <p><strong>Affected relationship:</strong> {row.affected_relationship}</p>}
      <p><strong>Current boundary:</strong> {row.reason}</p>
      <p><strong>What would resolve or change the decision:</strong> {row.resolution}</p>
      {row.disposition !== 'Evidence gap' && <a href={row.href}>Evidence and decision record</a>}
      {row.finding_ids?.length > 0 && <span> Related Scientific Findings:</span>}
      {row.finding_ids?.map((id, index) => <React.Fragment key={id}>{index > 0 ? ' · ' : ' '}<a href={'?review=1#' + id.toLowerCase()}>{shortFindingId(id)}</a></React.Fragment>)}
      {row.citation_keys?.length > 0 && <p><strong>Sources:</strong> {row.citation_keys.map((key, index) => <React.Fragment key={key}>{index > 0 && ' · '}<a href={'/docs/papers/BRAIN-Diet-References#' + key}>[{index + 1}]</a></React.Fragment>)}</p>}
      {row.decision_ref && <> · <a href={'?open-issues=1#' + row.decision_ref.toLowerCase()}>Related Open Issue</a></>}
    </EvidenceDisclosure>)}
  </section>;
}
