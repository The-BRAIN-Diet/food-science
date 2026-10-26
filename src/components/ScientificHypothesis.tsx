import React from 'react';
/** Hypotheses have no SEC indicator, dietary action or automatic mechanism admission. */
export default function ScientificHypothesis({hypothesis:h}: {hypothesis:any}) {
 const list=(items:any[]) => <ul>{items.map((x,i)=><li key={i}>{typeof x==='string'?x:JSON.stringify(x)}</li>)}</ul>;
 const roles=[['supporting','Supporting Findings'],['contradictory_or_null','Contradictory or null Findings'],['contextual','Contextual Findings']] as const;
 return <details id={h.id.toLowerCase()} className="scientific-hypothesis" style={{border:'1px dashed #667085',borderRadius:6,padding:'0.6rem 0.8rem',margin:'0.75rem 0'}}>
  <summary style={{cursor:'pointer',fontWeight:600}}>Hypothesis-{h.id.split('-H')[1]} — {h.title} <span className="hypothesis-status" style={{fontSize:'0.85em',border:'1px solid #667085',borderRadius:4,padding:'0.1em 0.4em',marginLeft:'0.5em'}}>{h.status}</span></summary>
  <p><strong>Scientific hypothesis.</strong> Scientific admission is required before any proposed mechanism relationship can be approved, including when a hypothesis is marked Supported.</p>
  <p><strong>Proposition:</strong> {h.proposition}</p><p><strong>Proposed direction:</strong> {h.proposed_direction}</p><p><strong>Rationale:</strong> {h.rationale}</p>
  {roles.map(([role,title])=><section key={role}><strong>{title}</strong>{h.finding_links[role].length?<ul>{h.finding_links[role].map((f:any)=><li key={f.pm_id+f.finding_id}><a href={f.href}>{f.pm_id} / {f.label||f.finding_id}</a> — {f.explanation}</li>)}</ul>:<p>None identified as directly testing this proposition.</p>}</section>)}
  <strong>Source evidence and its role</strong><ul>{h.evidence_sources.map((s:any)=><li key={s.study_id}><a href={s.url}>{s.label}</a> ({s.role}) — {s.proposition} {s.limitations}</li>)}</ul>
  <p>References to the same study or cohort are not independent evidence. Finding scores are not inherited.</p>
  <strong>Principal limitations</strong>{list(h.limitations)}<strong>Alternative or interacting explanations</strong>{list(h.alternative_explanations)}<strong>Evidence required</strong>{list(h.required_evidence)}
  <strong>Historical provenance</strong>{list(h.provenance)}{h.historical_relationship&&<><p><strong>Historical page reference:</strong> {h.historical_relationship.page_pm} → <a href={h.historical_relationship.href}>{h.historical_relationship.linked_pm}</a></p><p><strong>Original explanation:</strong> {h.historical_relationship.original_explanation}</p><p><strong>Prior review explanation:</strong> {h.historical_relationship.review_explanation}</p></>}<p><strong>Reviewed:</strong> {h.review_date}. <code>{h.id}</code></p>
 </details>;
}
