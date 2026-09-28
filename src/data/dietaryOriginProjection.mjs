function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function labelsOverlap(left, right) {
  const a = normalize(left)
  const b = normalize(right)
  if (!a || !b) return false
  const paddedA = ` ${a} `
  const paddedB = ` ${b} `
  return a === b || paddedA.includes(paddedB) || paddedB.includes(paddedA)
}

function validSupplementaryRows(frontMatter) {
  const rows = Array.isArray(frontMatter?.nutrition_supplementary_sources)
    ? frontMatter.nutrition_supplementary_sources
    : []
  return rows.filter((row) => {
    if (!row || typeof row !== "object") return false
    if (!String(row.label || "").trim() || !String(row.source_note || "").trim()) return false
    if (row.public_display === "internal-only") return false
    const quantitative =
      typeof row.value === "number" && typeof row.unit === "string" && !Number.isNaN(row.value)
    const qualitative =
      String(row.amount_display || "").trim().length > 0 ||
      String(row.status || "").trim().length > 0
    return quantitative || qualitative
  })
}

function evidenceLinks(evidenceSource) {
  const citationKeys = Array.isArray(evidenceSource?.citation_keys)
    ? evidenceSource.citation_keys.map(String).filter(Boolean)
    : []
  const findingIds = Array.isArray(evidenceSource?.finding_ids)
    ? evidenceSource.finding_ids.map(String).filter(Boolean)
    : []
  return {citationKeys, findingIds}
}

/**
 * Project canonical PM/KC dietary atoms upstream into validated Food rows.
 *
 * No Food relationship is inferred from prose or tags. A Food joins a dietary
 * input only through a supported public supplementary composition row.
 */
export function buildDietaryOriginProjection(docs, {target, pmId}) {
  const allDocs = Array.isArray(docs) ? docs : []
  const pmDoc = allDocs.find((doc) => doc?.frontMatter?.pm_id === pmId)
  if (!pmDoc) return null

  const fm = pmDoc.frontMatter || {}
  const atoms = Array.isArray(fm.dietary_input_traceability)
    ? fm.dietary_input_traceability
    : []
  const levers = Array.isArray(fm.dietary_lever_atoms) ? fm.dietary_lever_atoms : []
  const atomById = new Map(atoms.map((atom) => [atom.atom_id, atom]))
  const leverById = new Map(levers.map((lever) => [lever.atom_id, lever]))

  const bridgeLever = levers.find(
    (lever) =>
      lever?.requirement_classification === "derived" &&
      normalize(lever?.derived_target) === normalize(target),
  )
  const bridgeAtom = bridgeLever ? atomById.get(bridgeLever.atom_id) : null

  const foods = allDocs.filter((doc) => String(doc?.permalink || "").includes("/foods/"))
  const kcRelationships = Array.isArray(fm.pm_kc_relationships) ? fm.pm_kc_relationships : []
  const pathways = []
  const seenAtoms = new Set()

  for (const relationship of kcRelationships) {
    const constituents = Array.isArray(relationship?.constituent_relationships)
      ? relationship.constituent_relationships
      : []
    const kcDoc = allDocs.find((doc) => doc?.frontMatter?.kc_id === relationship.kc_id)
    const kcAtoms = Array.isArray(kcDoc?.frontMatter?.kc_input_traceability)
      ? kcDoc.frontMatter.kc_input_traceability
      : []

    for (const constituent of constituents) {
      const atom = atomById.get(constituent.pm_atom_id)
      if (!atom || seenAtoms.has(atom.atom_id)) continue
      seenAtoms.add(atom.atom_id)
      const kcAtom = kcAtoms.find((candidate) => candidate.atom_id === constituent.kc_atom_id)
      const matchedFoods = []

      for (const food of foods) {
        for (const row of validSupplementaryRows(food.frontMatter)) {
          if (!labelsOverlap(row.label, atom.input)) continue
          matchedFoods.push({
            title: food.title,
            permalink: food.permalink,
            description: food.description,
            edge: {
              relationship: "provides dietary substrate",
              inputLabel: row.label,
              sourceNote: row.source_note,
              status: row.amount_display || row.status || null,
              key: row.key || null,
            },
          })
        }
      }

      pathways.push({
        atom,
        kcAtom: kcAtom || null,
        substrateHref: kcDoc?.permalink || pmDoc.permalink,
        relationshipMetadata: {
          relationshipLayer: leverById.get(atom.atom_id)?.relationship_layer || "kc-relevance",
          kcId: relationship.kc_id,
          kcAtomId: constituent.kc_atom_id || null,
          kcMembershipStatus: constituent.kc_membership_status || null,
          bridgeClassification: bridgeLever?.requirement_classification || null,
          derivedTarget: bridgeLever?.derived_target || null,
        },
        evidence: evidenceLinks(atom.evidence_source),
        foods: Array.from(
          new Map(matchedFoods.map((food) => [`${food.permalink}:${food.edge.key}`, food])).values(),
        ).sort((a, b) => a.title.localeCompare(b.title)),
      })
    }
  }

  return {
    target,
    pm: {
      id: pmId,
      title: pmDoc.title,
      permalink: pmDoc.permalink,
    },
    bridge: bridgeAtom
      ? {
          atom: bridgeAtom,
          lever: bridgeLever,
          evidence: evidenceLinks(bridgeAtom.evidence_source),
        }
      : null,
    pathways,
  }
}
