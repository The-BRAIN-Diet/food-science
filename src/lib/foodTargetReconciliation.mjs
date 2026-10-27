import {verifiedAggregateEvidence} from './aggregateFoodComposition.mjs';
/** Technical exposure reconciliation; never creates canonical food edges or scientific admissions. */
const norm = value => String(value || '').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const unique = xs => [...new Map(xs.map(x => [JSON.stringify(x), x])).values()];
const visible = e => !['internal-only', 'excluded-error', 'substance-only'].includes(e.public_display) && e.evidence_status !== 'rejected';
export function structuredEvidence(food) {
  return (food.presence_records || []).filter(visible).filter(e => (String(e.record || '').includes('#substance_relationships/') && (e.evidence || e.citation_keys?.length)) || verifiedAggregateEvidence(e));
}
export function verifiedFoodTarget(food) {
  const evidence = structuredEvidence(food);
  return evidence.length ? {...food, relationship: food.relationship || 'contains', mapping_status: 'verified', evidence} : null;
}
function evidenceRows(food) {
  return [food.evidence, ...(food.presence_records || []), ...(food.observations || [])].flat().filter(Boolean);
}
function urls(food) {
  return new Set(evidenceRows(food).flatMap(e => [...(e.sources || []), e.source_url].filter(Boolean)).map(s => String(s).replace(/\/$/, '')));
}
function sameSource(a, b) { const au = urls(a); return [...urls(b)].some(u => au.has(u)); }
function sharedSourceAnchor(a, b) {
  const anchors = food => evidenceRows(food).map(e => e.source_reference || e.nutrition_source?.source_reference).filter(s => /^#food-source-\d+$/.test(s || ''));
  return anchors(a).some(s => anchors(b).includes(s));
}
function contextConflict(a, b) {
  // Explicit context fields are decisive; unstructured descriptions are never treated as interchangeable brands/samples.
  for (const field of ['brand', 'product_id', 'fortification', 'cultivar', 'sample_id', 'substance_form', 'measurement_context']) {
    const av = a.material_context?.[field], bv = b.material_context?.[field];
    if (av && bv && norm(av) !== norm(bv)) return field;
  }
  if (a.chemical_form && b.chemical_form && norm(a.chemical_form) !== norm(b.chemical_form)) return 'substance form';
  const text = f => norm([f.material, f.preparation].join(' '));
  const at = text(a), bt = text(b);
  if ((/\bunfortified\b/.test(at) && /\bfortified\b/.test(bt)) || (/\bunfortified\b/.test(bt) && /\bfortified\b/.test(at))) return 'fortification';
  if ((/\braw\b/.test(a.preparation || '') && /\b(cooked|boiled|baked)\b/.test(b.preparation || '')) || (/\braw\b/.test(b.preparation || '') && /\b(cooked|boiled|baked)\b/.test(a.preparation || ''))) return 'raw/cooked state';
  if (norm(a.preparation) !== norm(b.preparation) && ((/^(?:reheated|hot)\b/i.test(a.preparation || '') && /^(?:cooled|chilled)\b/i.test(b.preparation || '')) || (/^(?:reheated|hot)\b/i.test(b.preparation || '') && /^(?:cooled|chilled)\b/i.test(a.preparation || '')))) return 'service temperature';
  return null;
}
export function compareFoodExposure(a, b) {
  if (a.food_id !== b.food_id || a.substance_id !== b.substance_id || (a.relationship || 'contains') !== (b.relationship || 'contains')) return {status: 'different-identity'};
  const conflict = contextConflict(a, b);
  if (conflict) return {status: 'distinct', reason: `Different ${conflict}; contexts retained separately.`};
  if (norm(a.preparation) !== norm(b.preparation)) return {status: 'review-required', reason: 'Preparation equivalence is not established.'};
  const am = norm(a.material), bm = norm(b.material);
  if (am && am === bm && sameSource(a, b)) return {status: 'equivalent', reason: 'Same canonical identities, material, preparation and composition source.'};
  // A shared local provenance anchor plus the same source and full product-name prefix binds
  // explanatory suffixes to the same existing source record (e.g. fortified Engevita with B12).
  // Merely sharing a website, preparation or generic food name is insufficient.
  const suffix = am.startsWith(bm + ' ') ? am.slice(bm.length + 1) : bm.startsWith(am + ' ') ? bm.slice(am.length + 1) : '';
  const descriptiveSuffix = ['dried inactive saccharomyces cerevisiae', 'fat duck'].includes(suffix);
  if (am && bm && sameSource(a, b) && sharedSourceAnchor(a, b) && descriptiveSuffix) {
    return {status: 'equivalent', reason: 'Same explicit food-source anchor, composition source, preparation and complete product/material name; descriptive suffix retained in provenance.'};
  }
  return {status: 'review-required', reason: 'Material, brand/fortification, cultivar or analytical-sample equivalence is not established by the recorded provenance.'};
}
export function reconcileFoodTargets(targets) {
  const verified = targets.filter(t => t.mapping_status === 'verified').map(t => ({...t}));
  const unresolved = [], resolutions = [];
  for (const candidate of targets.filter(t => t.mapping_status !== 'verified')) {
    const peers = verified.filter(v => v.food_id === candidate.food_id && v.substance_id === candidate.substance_id && (v.relationship || 'contains') === (candidate.relationship || 'contains'));
    const comparisons = peers.map(v => ({v, result: compareFoodExposure(v, candidate)}));
    const match = comparisons.find(c => c.result.status === 'equivalent');
    if (match) {
      const v = match.v;
      v.evidence = unique([v.evidence, candidate.evidence].flat().filter(Boolean));
      v.observations = unique([...(v.observations || []), ...(candidate.observations || [])]);
      v.presence_records = unique([...(v.presence_records || []), ...(candidate.presence_records || [])]);
      v.reconciled_sources = unique([...(v.reconciled_sources || []), {material: candidate.material, preparation: candidate.preparation, evidence: candidate.evidence, limitations: candidate.limitations || null, reason: match.result.reason}]);
      resolutions.push({food_id: candidate.food_id, substance_id: candidate.substance_id, material: candidate.material, preparation: candidate.preparation, status: 'verified-equivalent', canonical_material: v.material, canonical_preparation: v.preparation, canonical_evidence: v.evidence, candidate_evidence: candidate.evidence, reason: match.result.reason});
    } else {
      const review = comparisons.find(c => c.result.status === 'review-required');
      const state = review ? 'review-required' : peers.length ? 'distinct' : 'not-applicable';
      const record = {...candidate, material_equivalence_status: state, ontology_relationship_status: review ? 'material-equivalence-review' : 'missing-context-edge'};
      if (peers.length) {
        record.display_material_context = true;
        record.material_equivalence_reason = review?.result.reason || comparisons[0].result.reason;
        for (const {v} of comparisons) v.display_material_context = true;
      }
      unresolved.push(record);
    }
  }
  // Identical output objects may arrive through multiple projections. Preserve distinct evidence/material contexts.
  return {foods: unique([...verified, ...unresolved]), resolutions};
}
