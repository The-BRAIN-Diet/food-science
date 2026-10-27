import {canonicalContainsRelationships} from "./foodSubstanceRelationships.mjs"

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

function dietaryInputLabel(value) {
  if (value === true) return "Yes"
  if (value === false) return "No"
  return "Unset"
}

function typeLabel(mode) {
  if (mode === "capacity-requirement") return "Type A — Capacity"
  if (mode === "state-regulation") return "Type B — Regulation"
  return null
}

/**
 * Qualified butyrate specificity is read from the atom's own role and limitation.
 * Short-chain-fatty-acid evidence is not upgraded into a butyrate yield.
 */
function conversionClaim(atom) {
  const role = String(atom?.biological_role || "")
  const limit = String(atom?.evidence_limitation || "")
  const blob = `${role}\n${limit}`
  if (/equivalent butyrate response|increased butyrate proportions|increased faecal butyrate/i.test(blob)) {
    return {
      butyrateSpecificity: "preparation-specific-butyrate",
      label:
        "derived microbial fermentation; preparation-specific butyrate response, ordinary-food yield not established",
    }
  }
  if (
    /butyrate/i.test(blob) &&
    /does not|do not|not establish|cannot be assigned|from butyrate|no independent/i.test(blob)
  ) {
    return {
      butyrateSpecificity: "butyrate-yield-not-established",
      label: "derived microbial fermentation; butyrate-specific yield not established",
    }
  }
  if (/short-chain fatty acid|\bscfa\b/i.test(role)) {
    return {
      butyrateSpecificity: "scfa-not-butyrate-specific",
      label:
        "derived microbial fermentation to short-chain fatty acids; butyrate-specific effect not established",
    }
  }
  if (/hydrolysis/i.test(blob)) {
    return {
      butyrateSpecificity: "not-applicable",
      label: "hydrolysis can release the constituent; no microbial yield is assigned",
    }
  }
  return {
    butyrateSpecificity: "microbial-conversion-unspecified",
    label: "derived microbial fermentation",
  }
}

function rangeDisplay(row) {
  const range = row?.range
  if (!Array.isArray(range) || range.length !== 2) return null
  const [low, high] = range
  if (typeof low !== "number" || typeof high !== "number" || Number.isNaN(low) || Number.isNaN(high)) return null
  return [low + "–" + high, String(row.unit || "").trim(), String(row.basis || "").trim()].filter(Boolean).join(" ")
}

function substrateAmountFor(frontMatter, edge) {
  const rows = Array.isArray(frontMatter?.nutrition_supplementary_sources)
    ? frontMatter.nutrition_supplementary_sources
    : []
  for (const row of rows) {
    if (!row || row.public_display === "internal-only") continue
    if (!labelsOverlap(row.label, edge.substance)) continue
    if (
      row.preparation_state &&
      edge.preparation_state &&
      normalize(row.preparation_state) !== normalize(edge.preparation_state)
    ) continue
    const display = rangeDisplay(row)
    if (display) return display
  }
  return null
}

function quantifiedDirectContent(edge) {
  if (edge?.presence_status !== "presence_and_amount_supported") return false
  if (typeof edge.value === "number" && !Number.isNaN(edge.value)) return true
  if (typeof edge.amount === "number" && !Number.isNaN(edge.amount)) return true
  return /\d/.test(`${edge.amount_display || ""} ${edge.description || ""}`)
}

function substrateAtomsFor(atoms, levers, target) {
  const targetAtom = atoms.find((atom) => normalize(atom.input) === normalize(target)) || null
  const product =
    targetAtom &&
    targetAtom.dietary_input === false &&
    /biochemical|product/.test(normalize(targetAtom.input_type))
  if (product) {
    return atoms.filter(
      (atom) =>
        atom !== targetAtom &&
        atom.dietary_input === true &&
        /substrate/.test(normalize(atom.input_type)),
    )
  }
  const derived = levers.find(
    (lever) =>
      lever?.requirement_classification === "derived" &&
      normalize(lever?.derived_target) === normalize(target),
  )
  if (!derived) return []
  const derivedAtom = atoms.find((atom) => atom.atom_id === derived.atom_id)
  return derivedAtom ? [derivedAtom] : []
}

function foodJoins(atom, foods) {
  const canonical = []
  const provisionalNotes = []
  for (const food of foods) {
    const contains = canonicalContainsRelationships(food.frontMatter).filter((edge) =>
      labelsOverlap(edge.substance, atom.input),
    )
    if (contains.length) {
      for (const edge of contains) {
        canonical.push({
          title: food.title,
          permalink: food.permalink,
          description: food.description,
          verification: "canonical",
          edge: {
            relationship: edge.relationship,
            classification: "direct-composition",
            inputLabel: edge.substance,
            sourceNote: edge.evidence_source || edge.description || "",
            preparation: edge.preparation_state || null,
            presence: edge.presence_status || null,
            limitation: edge.material_limitations || null,
            substrateAmount: substrateAmountFor(food.frontMatter, edge),
            butyrateQuantity: null,
            key: `${edge.substance}:${edge.preparation_state || ""}`,
          },
        })
      }
      continue
    }
    for (const row of validSupplementaryRows(food.frontMatter)) {
      if (!labelsOverlap(row.label, atom.input)) continue
      provisionalNotes.push({
        title: food.title,
        permalink: food.permalink,
        label: row.label,
        sourceNote: row.source_note,
        status: row.amount_display || row.status || null,
        limitation:
          "This supplementary composition note is not a canonical contains relationship and is not a verified pathway. No butyrate quantity is inferred.",
      })
    }
  }
  return {
    foods: Array.from(
      new Map(canonical.map((food) => [`${food.permalink}:${food.edge.key}`, food])).values(),
    ).sort((a, b) => a.title.localeCompare(b.title)),
    provisionalNotes: Array.from(
      new Map(provisionalNotes.map((note) => [`${note.permalink}:${note.label}`, note])).values(),
    ).sort((a, b) => a.title.localeCompare(b.title)),
  }
}

/**
 * Project canonical food composition and PM substrate atoms for one metabolite.
 * Food joins use canonical contains relationships. A supplementary note is retained
 * only as an unverified gap. No butyrate yield is calculated from substrate quantity.
 */
export function buildDietaryOriginProjection(docs, {target, pmId}) {
  const allDocs = Array.isArray(docs) ? docs : []
  const pmDoc = allDocs.find((doc) => doc?.frontMatter?.pm_id === pmId)
  if (!pmDoc) return null

  const fm = pmDoc.frontMatter || {}
  const atoms = Array.isArray(fm.dietary_input_traceability) ? fm.dietary_input_traceability : []
  const levers = Array.isArray(fm.dietary_lever_atoms) ? fm.dietary_lever_atoms : []
  const leverById = new Map(levers.map((lever) => [lever.atom_id, lever]))
  const foods = allDocs.filter((doc) => String(doc?.permalink || "").includes("/foods/"))
  const targetAtom = atoms.find((atom) => normalize(atom.input) === normalize(target)) || null

  const directFoodContent = []
  for (const food of foods) {
    for (const edge of canonicalContainsRelationships(food.frontMatter)) {
      if (!labelsOverlap(edge.substance, target)) continue
      const quantified = quantifiedDirectContent(edge)
      directFoodContent.push({
        title: food.title,
        permalink: food.permalink,
        edge: {
          relationship: edge.relationship,
          classification: "direct-food-content",
          quantity: quantified ? edge.amount_display || edge.value || null : null,
          unit: quantified ? edge.unit || null : null,
          sourceNote: edge.evidence_source || edge.description || "",
          preparation: edge.preparation_state || null,
        },
      })
    }
  }
  directFoodContent.sort((a, b) => a.title.localeCompare(b.title))

  const pathways = substrateAtomsFor(atoms, levers, target).map((atom) => {
    const lever = leverById.get(atom.atom_id) || null
    const identity = atom.canonical_identity?.status === "resolved" ? atom.canonical_identity : null
    const conversion = conversionClaim(atom)
    const joined = foodJoins(atom, foods)
    return {
      atom,
      substrateHref: identity?.substance_href || null,
      identityStatus: atom.canonical_identity?.status || "unresolved",
      evidence: evidenceLinks(atom.evidence_source),
      foods: joined.foods,
      provisionalNotes: joined.provisionalNotes,
      conversion,
      relationshipMetadata: {
        relationshipLayer: lever?.relationship_layer || null,
        requirementClassification: lever?.requirement_classification || null,
        relationshipMode: lever?.relationship_mode || null,
        typeLabel: typeLabel(lever?.relationship_mode),
        dietaryInput: dietaryInputLabel(atom.dietary_input),
        dietaryInputNote: atom.dietary_input_note || null,
        productRelationship: "derived",
        butyrateSpecificity: conversion.butyrateSpecificity,
      },
    }
  })

  return {
    target,
    pm: {id: pmId, title: pmDoc.title, permalink: pmDoc.permalink},
    product: targetAtom
      ? {
          input: targetAtom.input,
          inputType: targetAtom.input_type,
          biologicalRole: targetAtom.biological_role,
          evidence: evidenceLinks(targetAtom.evidence_source),
          limitation: targetAtom.evidence_limitation || null,
          dietaryInput: targetAtom.dietary_input ?? null,
          dietaryInputLabel: dietaryInputLabel(targetAtom.dietary_input),
          admittedDietaryRequirement: targetAtom.dietary_input === true,
        }
      : null,
    directFoodContent,
    pathways,
  }
}

/** Project only independently admitted canonical §3.1.3 constituent edges. */
export function buildUpstreamResourceProjection(docs, substanceId, registry) {
  const entry = registry?.[substanceId];
  if (!entry?.path) return [];
  const href = `/docs/substances/${entry.path.replace(/\.mdx?$/, '')}`;
  if (!docs.some(d => d.permalink === href && d.frontMatter?.id === substanceId)) return [];
  const rows = [];
  for (const pm of docs) {
    const data = pm.frontMatter || {};
    if (!data.pm_id || !pm.permalink?.startsWith('/docs/biological-targets/') || data.draft_review_status) continue;
    for (const relationship of data.pm_kc_relationships || []) {
      if (!(data.kc_applicability_adjudications || []).some(a => a.disposition === 'established' && a.kc_id === relationship.kc_id && (a.ikc_id || a.kc_id) === (relationship.ikc_id || relationship.kc_id))) continue;
      const kc = docs.find(d => d.frontMatter?.kc_id === relationship.kc_id && d.permalink?.startsWith('/docs/biological-targets/'));
      for (const constituent of relationship.constituent_relationships || []) {
        if (constituent.disposition !== 'established' || !['supported-upstream-supply','conditional-constraint'].includes(constituent.relationship_type) || constituent.substance_id !== substanceId || constituent.canonical_identity?.status !== 'resolved') continue;
        const membership = (kc?.frontMatter?.individual_key_constraints || []).find(i => i.ikc_id === constituent.ikc_id && i.substance_id === substanceId && i.registration_status === 'registered' && i.identity_status === 'resolved' && i.substance_href === href);
        const kcAtom = (kc?.frontMatter?.kc_input_traceability || []).find(a => a.atom_id === constituent.kc_atom_id && a.ikc_id === membership?.ikc_id && a.ikc_membership === 'admitted');
        const atom = (data.dietary_input_traceability || []).find(a => a.atom_id === constituent.pm_atom_id && a.substance_id === substanceId && a.canonical_identity?.status === 'resolved' && a.canonical_identity?.substance_href === href);
        if (!membership || !kcAtom || atom?.relationship_type !== constituent.relationship_type || !atom?.evidence_limitation || !atom.evidence_source?.citation_keys?.length) continue;
        rows.push({pmId:data.pm_id,parentBrs:data.parent_brs,parentFm:data.parent_fm,pmHref:pm.permalink,kcId:relationship.kc_id,kcHref:kc.permalink,ikcId:membership.ikc_id,substanceId,substanceHref:href,relationshipType:constituent.relationship_type,references:data.references || [],atom});
      }
    }
  }
  return rows;
}
