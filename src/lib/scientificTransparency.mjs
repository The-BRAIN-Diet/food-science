import {currentPmOpenIssues} from '../data/pmOpenIssues.mjs';
export function evidenceGapItems(issues, pmId, adjudications = [], gaps = undefined) {
  const active = currentPmOpenIssues(issues, pmId).map(issue => ({
    id: issue.id, title: issue.title || issue.question, disposition: issue.status,
    considered: issue.question, reason: issue.claim_boundary,
    resolution: issue.resolution_needs,
    href: `?open-issues=1#${issue.id.toLowerCase()}`,
  }));
  const completed = adjudications.filter(row => row.status === 'not-admitted' && row.show_in_gap_summary === true).map(row => ({
    id: row.id, title: row.title, disposition: 'Not admitted', considered: row.title, finding_ids: row.finding_ids, cannot_establish: row.reason, affected_relationship: row.question,
    reason: row.reason, resolution: row.resolution_criterion,
    href: `?review=1#${row.id.toLowerCase()}`,
  }));
  if (Array.isArray(gaps)) return [
    ...gaps.map(gap => ({...gap, disposition: 'Evidence gap', considered: gap.establishes, reason: gap.missing_link, resolution: gap.required_evidence, href: '?review=1#' + gap.finding_ids[0].toLowerCase()})),
    ...completed,
  ];
  return [...active, ...completed];
}
export function historicalFindingIds(data) {
  return (data?.scientific_reconstruction_history || []).flatMap(h => h.records?.scientific_findings || []).map(f => String(f.id).toLowerCase());
}
export function transparencyErrors(data, issues) {
  const errors = [], activeIds = new Set((data.scientific_findings || []).map(f => f.id));
  if (data.open_issues_policy === 'evidence-gaps-only' && issues.some(issue => issue.pm_id === data.pm_id)) errors.push('PM uses Evidence Gaps only; Open Issues require explicit policy approval before creation');
  const historical = historicalFindingIds(data);
  if ([...activeIds].some(id => historical.includes(id.toLowerCase()))) errors.push('Historical Finding identity reused as an active proposition');
  const decisions = data.intervention_adjudications || [];
  for (const row of decisions) {
    if (!row.id || !row.title || !row.reason || !row.resolution_criterion || !row.history?.length) errors.push('Intervention decision requires identity, rationale, criterion and history');
    if (!['admitted','under-investigation','not-admitted','retired'].includes(row.status)) errors.push('Invalid intervention disposition');
  }
  for (const field of ['system_optimisation_practices','lifestyle_priorities']) {
    for (const row of data[field] || []) if (row.status && row.status !== 'admitted') errors.push(`${field}: only admitted interventions may be promoted`);
  }
  for (const issue of currentPmOpenIssues(issues, data.pm_id)) {
    if (issue.scope_disposition && issue.scope_disposition !== 'retain') errors.push('Inactive issue projected as active');
  }
  if (data.evidence_tabs_version === 1) {
    const ids = new Set(), sourceKeys = new Set((data.scientific_findings || []).flatMap(f => (f.evidence_considered || []).map(e => e.citation_key)));
    for (const gap of data.evidence_gaps || []) {
      for (const field of ['id','title','establishes','cannot_establish','missing_link','required_evidence','affected_relationship']) if (!gap[field]) errors.push(`Evidence gap missing ${field}`);
      if (ids.has(gap.id)) errors.push('Duplicate evidence gap ID');
      ids.add(gap.id);
      if (!gap.finding_ids?.length || gap.finding_ids.some(id => !activeIds.has(id))) errors.push('Evidence gap has unresolved Finding reference');
      if (!gap.citation_keys?.length || gap.citation_keys.some(key => !sourceKeys.has(key))) errors.push('Evidence gap has unresolved source reference');
      if (gap.decision_ref && !issues.some(i => i.id === gap.decision_ref && i.pm_id === data.pm_id)) errors.push('Evidence gap has unresolved issue reference');
    }
  }
  return errors;
}
