/** Presence, quantity and source ranking are independent scientific decisions. */
export function establishedPresenceBasis(edge) {
  return edge?.presence_status === "established_presence_citation_pending" &&
    ["authoritative-composition-record", "accepted-scientific-decision", "documented-food-specific-literature"].includes(edge?.evidence_basis?.kind) &&
    typeof edge.evidence_basis.record === "string" && edge.evidence_basis.record.trim().length > 0 &&
    typeof edge.evidence_basis.rationale === "string" && edge.evidence_basis.rationale.trim().length > 0
}

export function canonicalFoodRelationships(fm) {
  const rows = Array.isArray(fm?.substance_relationships) ? fm.substance_relationships : []
  return rows.filter((edge) => {
    if (!edge || typeof edge.substance !== "string" || typeof edge.relationship !== "string") return false
    if (edge.evidence_status === "rejected") return false
    if (edge.evidence_status === "unresolved" && !establishedPresenceBasis(edge)) return false
    if (edge.recovery_origin === "legacy-tag-migration" && !establishedPresenceBasis(edge) && (edge.evidence_status !== "supported" || !edge.evidence_source || !edge.evidence_material)) return false
    if (edge.requires_supplementary_key && !(fm.nutrition_supplementary_sources || []).some((row) => row.key === edge.requires_supplementary_key)) return false
    return true
  })
}
export function canonicalContainsRelationships(fm) {
  return canonicalFoodRelationships(fm).filter((edge) => ["contains", "direct-food-occurrence"].includes(edge.relationship))
}

/** Pending canonical decisions also block table/tag fallback on the reciprocal food page. */
export function pendingFoodRelationship(fm, label, overlaps) {
  if (canonicalContainsRelationships(fm).some(edge => overlaps(edge.substance, label))) return false
  return (fm?.substance_review_candidates || []).some(candidate => overlaps(candidate, label)) ||
    (fm?.substance_relationships || []).some(edge => typeof edge.substance === "string" && overlaps(edge.substance, label) && ["unresolved", "rejected"].includes(edge.evidence_status))
}
