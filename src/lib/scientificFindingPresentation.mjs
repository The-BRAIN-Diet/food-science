/** Reader labels are derived; canonical identities and anchors never change. */
export function shortFindingId(id) {
  const match=/^PM\d+-F(\d+)$/.exec(String(id || ''));
  return match ? 'SF'+match[1] : String(id || '');
}

export function findingReaderLabel(finding) {
  const label=String(finding?.finding_label || '').trim();
  const id=shortFindingId(finding?.id);
  return label ? (/^PM\d+-F\d+$/.test(finding?.id || '') ? `${id} — ${label}` : label) : id;
}

/** Only selected canonical interventions with explicit evidence links qualify. */
export function findingInterventionLinks(data,findingId) {
  return [['system_optimisation_practices','SOP','#pm-lever-optimisation'],['lifestyle_priorities','Lifestyle Lever','#pm-lever-lifestyle']].flatMap(([field,kind,href])=>
    (data?.[field] || []).filter(row=>row.atom_id && row.input &&
      !['proposed','retired','rejected','unresolved'].includes(row.status) &&
      (row.description_finding_id===findingId || row.evidence_source?.finding_ids?.includes(findingId)))
      .map(row=>({id:row.atom_id,label:row.input,kind,href})));
}
