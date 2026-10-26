import React from 'react';
import records from '../../../system/framework-qc/pm-open-issues.json';

function StoredValue({value}: {value:any}) {
  if (value == null) return <span>Not recorded</span>;
  if (typeof value !== 'object') return /^https?:\/\//.test(String(value)) ? <a href={String(value)}>{String(value)}</a> : <span>{String(value)}</span>;
  if (Array.isArray(value)) return <ul>{value.map((v,i)=><li key={i}><StoredValue value={v}/></li>)}</ul>;
  return <dl>{Object.entries(value).map(([key,v])=><React.Fragment key={key}><dt>{key.replaceAll('_',' ')}</dt><dd><StoredValue value={v}/></dd></React.Fragment>)}</dl>;
}
export default function ScientificTransparencyAudit({data}:{data:any}) {
  if (!data?.scientific_reconstruction_history?.length && !data?.intervention_adjudications?.length && !data?.mission_reconciliation) return null;
  const issues=records.issues.filter(i=>i.pm_id===data.pm_id);
  return <section aria-label="Scientific reconstruction and decision history">
    <h3>Scientific reconstruction &amp; decision history</h3>
    {data.mission_reconciliation && <details><summary>Mission clarification — preserved history</summary><StoredValue value={data.mission_reconciliation}/></details>}
    {(data.intervention_adjudications || []).map((r:any)=><section id={r.id.toLowerCase()} key={r.id}>
      <h4>{r.title} — {r.status.replaceAll('-',' ')}</h4>
      <p>{r.reason}</p><p><strong>What would change the decision:</strong> {r.resolution_criterion}</p>
      <details><summary>Decision provenance</summary><StoredValue value={r}/></details>
    </section>)}
    <h4>Open Issue scope and decision history</h4>
    {issues.map((r:any)=><details key={r.id} id={`${r.id.toLowerCase()}-history`}>
      <summary>{r.id} — {r.title || r.question} · {r.scope_disposition || r.status}</summary>
      <StoredValue value={r}/>
    </details>)}
    {(data.scientific_reconstruction_history || []).map((h:any)=><section key={h.version}>
      <h4>Previous mission and evidence — version {h.version}</h4>
      <p>{h.previous_title}: {h.previous_mission}</p><p>{h.decision}</p>
      {(h.records?.scientific_findings || []).map((f:any)=><details id={f.id.toLowerCase()} key={f.id}>
        <summary>{f.id} — {f.finding_label} · Historical evidence</summary>
        <p>{f.finding_statement}</p><p>This is preserved evidence from the previous mission, not an active endocrine Finding or a newly approved intervention.</p>
        <StoredValue value={f}/>
      </details>)}
      <details><summary>Historical interventions, KCs, assessments and other scientific records</summary><StoredValue value={Object.fromEntries(Object.entries(h.records || {}).filter(([k])=>k!=='scientific_findings'))}/></details>
    </section>)}
    {data.scientific_reconstruction_review && <details><summary>Stage 2A/2B endocrine assessment and retrieval boundaries</summary><StoredValue value={data.scientific_reconstruction_review}/></details>}
  </section>;
}
