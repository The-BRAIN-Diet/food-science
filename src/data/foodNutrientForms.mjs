import {canonicalContainsRelationships, establishedPresenceBasis} from './foodSubstanceRelationships.mjs';

const B3_FORMS = new Set(['nicotinamide', 'nicotinic-acid']);
const UNKNOWN_PREPARATION = /^(unknown|unspecified|not reported|not established)$/i;
const text = value => typeof value === 'string' ? value.trim() : '';
const normalize = value => text(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const reference = value => /^#food-source-\d+$/.test(text(value)) ? text(value) : null;
const publicRecord = row => !['internal-only', 'excluded-error', 'substance-only'].includes(row.public_display);
const supported = row => row.evidence_status === 'supported' || establishedPresenceBasis(row);

/** Navigate to visible food References without dropping other URL parameters. */
export function foodFormReferenceHref(sourceReference, location) {
  const anchor = reference(sourceReference);
  if (!anchor) return null;
  const params = new URLSearchParams(location.search || '');
  params.delete('advanced');
  const search = params.toString();
  return `${location.pathname}${search ? '?' + search : ''}${anchor}`;
}

/** Read-only B3 pilot. Existing evidence decisions admit records, never numeric values alone. */
export function projectFoodNutrientForms(food, registry, documentationLinks) {
  const observations = [], issues = [];
  const foodId = text(food.id);
  if (!foodId) return {observations, issues};
  const rows = Array.isArray(food.nutrition_supplementary_sources) ? food.nutrition_supplementary_sources : [];
  const edges = canonicalContainsRelationships(food);
  const visible = row => publicRecord({...row, public_display: row.public_display || food.public_display?.[row.key] || food.public_display?.[row.substance_id] || food.public_display?.[row.label || row.substance]});
  const keyCounts = new Map();
  for (const row of rows) if (text(row?.key)) keyCounts.set(row.key, (keyCounts.get(row.key) || 0) + 1);
  const identity = row => {
    const id = row.substance_id;
    const entry = B3_FORMS.has(id) && registry[id];
    if (!entry || entry.parent_substance_id !== 'vitamin-b3' || !registry['vitamin-b3']) return null;
    const href = documentationLinks[normalize(id)];
    const expected = `/docs/substances/${registry['vitamin-b3'].path?.replace(/\.mdx?$/, '')}#${entry.page_anchor}`;
    return {substance_id: id, title: id === 'nicotinamide' && entry.aliases?.includes('Niacinamide') ? `${entry.title} (Niacinamide)` : entry.title,
      href: href === expected ? href : null};
  };
  const report = (row, reason) => issues.push({food_id: foodId, substance_id: row.substance_id, key: row.key || row.relationship_id || null, reason});
  const held = row => (food.nutrition_value_reviews || []).some(review => {
    if (review.correction_status === 'resolved' && !review.exclude_from_food_lists) return false;
    const key = review.nutrient_key || review.key;
    // Unscoped reviews cannot establish that a new form-specific quantity is approved.
    return key ? key === row.key : review.substance_id ? review.substance_id === row.substance_id : review.correction_status === 'pending';
  });
  function observation(row, entity, id, sourceReference, quantity, supplementaryKey = null) {
    const preparation = text(row.preparation_state);
    if (!entity.href) report(row, 'documentation-link-unavailable');
    return {...entity, id, food_id: foodId, supplementary_key: supplementaryKey,
      value: quantity ? row.value : null, range: quantity && Array.isArray(row.range) ? [...row.range] : null,
      unit: quantity ? row.unit : null, basis: text(row.basis) || null,
      preparation: preparation && !UNKNOWN_PREPARATION.test(preparation) ? preparation : null,
      material: text(row.evidence_material || row.material) || null,
      source_reference: sourceReference, source_url: text(row.source_url) || null,
      limitation: [row.public_note, row.notes, row.material_limitations].map(text).filter(Boolean).join(' '),
      provenance: text(row.source_note || row.evidence_source),
      quantity_status: quantity ? 'supported' : 'not-established'};
  }
  for (const row of rows) {
    if (!row || typeof row !== 'object') continue;
    const entity = identity(row);
    if (!entity) continue;
    if (!visible(row) || row.evidence_status === 'rejected' || row.evidence_status === 'unresolved' && !establishedPresenceBasis(row) || row.analyte_scope === 'combined') continue;
    const contradicted = (food.substance_relationships || []).some(edge => edge.substance_id === row.substance_id &&
      (!edge.requires_supplementary_key || edge.requires_supplementary_key === row.key) &&
      (edge.evidence_status === 'rejected' || edge.evidence_status === 'unresolved' && !establishedPresenceBasis(edge)));
    if (contradicted) {report(row, 'conflicting-presence-decision');continue;}
    if (!text(row.key) || keyCounts.get(row.key) !== 1) {report(row, 'missing-or-duplicate-observation-key');continue;}
    const bound = edges.filter(edge => edge.substance_id === row.substance_id && edge.requires_supplementary_key === row.key && supported(edge));
    const presence = supported(row) || bound.length > 0;
    const sourceReference = reference(row.source_reference);
    if (!presence || !sourceReference || !text(row.source_note)) {report(row, 'display-evidence-or-reference-unresolved');continue;}
    const numeric = Number.isFinite(row.value) && row.value >= 0;
    const range = Array.isArray(row.range) && row.range.length === 2 && row.range.every(Number.isFinite) && row.range[0] >= 0 && row.range[1] >= row.range[0];
    const amountDecision = !/amount_unavailable|citation_pending/.test(row.presence_status || '') &&
      (row.evidence_status === 'supported' || bound.some(edge => edge.presence_status === 'presence_and_amount_supported'));
    const quantity = Boolean((numeric || range) && text(row.unit) && text(row.basis) && amountDecision &&
      !text(row.status) && !text(row.amount_display) && !row.quantity_citation_pending && !held(row) && !/estimate|representative|approximate/i.test(row.source_group || ''));
    if ((numeric || range) && !quantity) report(row, 'quantity-not-verified');
    observations.push(observation(row, entity, `${foodId}::nutrition_supplementary_sources/${row.key}`, sourceReference, quantity, row.key));
  }
  // Presence-only relationships need their own existing stable ID and public citation.
  for (const edge of edges) {
    const entity = identity(edge);
    if (!entity || !visible(edge) || !supported(edge) || edge.requires_supplementary_key) continue;
    const id = text(edge.relationship_id || edge.recovery_audit);
    const sourceReference = reference(edge.source_reference);
    if (!id || !sourceReference) {report(edge, 'presence-observation-id-or-reference-unresolved');continue;}
    observations.push(observation(edge, entity, `${foodId}::substance_relationships/${id}`, sourceReference, false));
  }
  const unique = new Map(), conflicting = new Set();
  for (const row of observations) {
    if (unique.has(row.id) && JSON.stringify(unique.get(row.id)) !== JSON.stringify(row)) {
      conflicting.add(row.id);issues.push({food_id: foodId, substance_id: row.substance_id, reason: 'conflicting-observation-id'});
    } else unique.set(row.id, row);
  }
  return {observations: [...unique.values()].filter(row => !conflicting.has(row.id)), issues};
}
