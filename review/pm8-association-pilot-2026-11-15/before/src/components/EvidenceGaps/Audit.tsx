import React from 'react';
import records from '../../../system/framework-qc/pm-open-issues.json';
import EvidenceDisclosure from './Disclosure';

function StoredValue({value}: {value:any}) {
  if (value == null) return <span>Not recorded</span>;
  if (typeof value !== 'object') return /^https?:\/\//.test(String(value)) ? <a href={String(value)}>{String(value)}</a> : <span>{String(value)}</span>;
  if (Array.isArray(value)) return <ul>{value.map((v,i)=><li key={i}><StoredValue value={v}/></li>)}</ul>;
  return <dl>{Object.entries(value).map(([key,v])=><React.Fragment key={key}><dt>{key.replaceAll('_',' ')}</dt><dd><StoredValue value={v}/></dd></React.Fragment>)}</dl>;
}
export default function ScientificTransparencyAudit({data}:{data:any}) {
  if (!data?.scientific_reconstruction_history?.length && !data?.intervention_adjudications?.length && !data?.mission_reconciliation) return null;
  const issues=records.issues.filter(i=>i.pm_id===data.pm_id);
  const RecordDisclosure=({id,label,title,children}:{id:string;label:string;title:string;children:React.ReactNode})=>data.evidence_tabs_version === 1 ? <EvidenceDisclosure id={id} label={label} title={title}>{children}</EvidenceDisclosure> : <details id={id}><summary>{title}</summary>{children}</details>;
  return <section aria-label="Scientific reconstruction and decision history">
    <h3>Scientific reconstruction &amp; decision history</h3>
    {data.mission_reconciliation && <RecordDisclosure id={`${data.pm_id.toLowerCase()}-mission-history`} label="Mission history" title="Mission clarification — preserved history"><StoredValue value={data.mission_reconciliation}/></RecordDisclosure>}
    {(data.intervention_adjudications || []).map((r:any,index:number)=><RecordDisclosure id={r.id} key={r.id} label={`Decision ${index+1} · ${r.id}`} title={`${r.title} — ${r.status.replaceAll('-',' ')}`}>
      <p>{r.reason}</p><p><strong>What would change the decision:</strong> {r.resolution_criterion}</p>
      <StoredValue value={r}/>
    </RecordDisclosure>)}
    {issues.length > 0 && <h4>Open Issue scope and decision history</h4>}
    {issues.map((r:any)=><RecordDisclosure key={r.id} id={`${r.id.toLowerCase()}-history`} label={r.id} title={`Open Issue history — ${r.title || r.question} · ${r.scope_disposition || r.status}`}>
      <StoredValue value={r}/>
    </RecordDisclosure>)}
    {(data.scientific_reconstruction_history || []).map((h:any)=><section key={h.version}>
      <h4>Previous mission and evidence — version {h.version}</h4>
      <p>{h.previous_title}: {h.previous_mission}</p><p>{h.decision}</p>
      {(h.records?.scientific_findings || []).map((f:any)=><RecordDisclosure id={f.id} key={f.id} label={f.id} title={`${f.finding_label} · Historical evidence`}>
        <p>{f.finding_statement}</p><p>This is preserved evidence from the previous mission, not an active endocrine Finding or a newly approved intervention.</p>
        <StoredValue value={f}/>
      </RecordDisclosure>)}
      <RecordDisclosure id={`pm8-history-${h.version}-records`} label={`History ${h.version}`} title="Historical interventions, KCs, assessments and other scientific records"><StoredValue value={Object.fromEntries(Object.entries(h.records || {}).filter(([k])=>k!=='scientific_findings'))}/></RecordDisclosure>
    </section>)}
    {data.scientific_reconstruction_review && <RecordDisclosure id={`${data.pm_id.toLowerCase()}-stage2-review`} label="Stage 2A/2B review" title="Endocrine assessment and retrieval boundaries"><StoredValue value={data.scientific_reconstruction_review}/></RecordDisclosure>}
  </section>;
}
