/** PM8-only presentation metadata. Never consumed by admission/ranking extraction. */
export function associationPilot(data) {
  return data?.pm_id === 'BRS6-FM4-PM8' && data?.sf_association_pilot?.version === 1 ? data.sf_association_pilot : null;
}
export function findingAssociations(data, id) {
  return associationPilot(data)?.associations.find(a => a.finding_id === id);
}
export function pilotInvestigations(data) {
  return (associationPilot(data)?.investigations || []).map(entry => {
    const gap = entry.source_type === 'evidence_gap';
    const source = (gap ? data.evidence_gaps : data.intervention_adjudications).find(s => s.id === entry.source_id);
    if (!source) throw new Error(`PM8 investigation references missing record ${entry.source_id}`);
    return {...entry, source, question: gap ? source.title : source.question,
      affected: gap ? source.affected_relationship : source.title,
      established: gap ? source.establishes : source.reason,
      missing: gap ? source.missing_link : source.resolution_criterion,
      required: gap ? source.required_evidence : source.resolution_criterion,
      finding_ids: source.finding_ids || []};
  });
}
export function pilotErrors(data) {
  const p=associationPilot(data);if(!p)return [];
  const errors=[],findings=new Set(data.scientific_findings.map(f=>f.id));
  const ids=new Set([data.pm_id,...['system_optimisation_practices','lifestyle_priorities','dietary_input_traceability','scientific_hypotheses','intervention_adjudications'].flatMap(k=>(data[k]||[]).map(r=>r.atom_id||r.id))]);
  for(const a of p.associations){if(!findings.has(a.finding_id))errors.push(`Missing SF ${a.finding_id}`);for(const t of a.targets)if(!ids.has(t.record_id))errors.push(`Missing association target ${t.record_id}`);}
  for(const i of p.investigations || []){const list=i.source_type==='evidence_gap'?data.evidence_gaps:data.intervention_adjudications;if(!list.some(r=>r.id===i.source_id))errors.push(`Missing investigation source ${i.source_id}`);if(i.review_state==='open'&&!i.next_action?.trim())errors.push(`No active action for ${i.source_id}`);for(const id of i.decision_refs||[])if(!ids.has(id))errors.push(`Missing decision ${id}`);}
  return errors;
}
