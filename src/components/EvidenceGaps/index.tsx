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
  if (!rows.length) return null;
  return <section id={panelId} role="tabpanel" className={styles.section} aria-labelledby="evidence-gaps-tab">
    <h2 id="evidence-gaps-heading" tabIndex={-1}><HalfFilledFlask /> Evidence Gaps</h2>
    <p>Available research does not yet establish the specific relationships described below. These gaps and completed non-admissions are not intervention recommendations.</p>
    {rows.map((row,index) => <EvidenceDisclosure key={row.id} id={row.id} label={`Evidence Gap ${index+1}`} title={row.title} status={row.disposition === 'Not admitted' ? 'Not Admitted' : undefined}>
      <p><strong>Record ID:</strong> {row.id}</p>
      <p><strong>{row.disposition === 'Not admitted' ? 'Considered exposure:' : 'What the evidence establishes:'}</strong> {row.considered}</p>
      {row.disposition === 'Not admitted' && <ul>{(row.finding_ids || []).map(id => {const finding=findings.find(f=>f.id===id);return finding ? <li key={id}><a href={'?review=1#'+id.toLowerCase()}>{id}</a>: {finding.finding_statement}</li> : null;})}</ul>}
      {row.cannot_establish && <p><strong>What it cannot establish:</strong> {row.cannot_establish}</p>}
      {row.affected_relationship && <p><strong>Affected relationship:</strong> {row.affected_relationship}</p>}
      <p><strong>Current boundary:</strong> {row.reason}</p>
      <p><strong>What would resolve or change the decision:</strong> {row.resolution}</p>
      <a href={row.href}>Evidence and decision record</a>
      {row.finding_ids?.map(id => <React.Fragment key={id}>{' · '}<a href={'?review=1#' + id.toLowerCase()}>{id}</a></React.Fragment>)}
      {row.decision_ref && <> · <a href={'?open-issues=1#' + row.decision_ref.toLowerCase()}>Related Open Issue</a></>}
    </EvidenceDisclosure>)}
  </section>;
}
