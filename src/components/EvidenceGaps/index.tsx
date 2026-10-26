import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import records from '../../../system/framework-qc/pm-open-issues.json';
import {evidenceGapItems} from '../../lib/scientificTransparency.mjs';
import styles from './styles.module.css';

/** Lucide flask-conical outline (ISC; lucide-icons/lucide), with local liquid fill. No icon dependency. */
export function HalfFilledFlask() {
  return <svg className={styles.flask} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M6.453 15h11.094l2.208 4.04A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96Z" fill="currentColor" fillOpacity=".22" stroke="none" />
    <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
    <path d="M6.453 15h11.094M8.5 2h7" />
  </svg>;
}
export default function EvidenceGaps() {
  const {frontMatter} = useDoc();
  const data = frontMatter as any;
  const rows = evidenceGapItems(records.issues, data.pm_id, data.intervention_adjudications);
  if (!rows.length) return null;
  return <section className={styles.section} aria-labelledby="evidence-gaps-heading">
    <h3 id="evidence-gaps-heading"><HalfFilledFlask /> Evidence Gaps &amp; Open Questions</h3>
    <p>These questions and completed decisions explain important gaps in the admitted interventions. They are not recommendations.</p>
    {rows.map(row => <details key={row.id} className={styles.item}>
      <summary>{row.title} <span className={styles.status}>{row.disposition === 'under-investigation' ? 'Under investigation' : row.disposition === 'open' ? 'Open' : row.disposition}</span></summary>
      <p><strong>Considered:</strong> {row.considered}</p>
      <p><strong>Current boundary:</strong> {row.reason}</p>
      <p><strong>What would resolve or change the decision:</strong> {row.resolution}</p>
      <a href={row.href}>Evidence and decision record</a>
    </details>)}
  </section>;
}
