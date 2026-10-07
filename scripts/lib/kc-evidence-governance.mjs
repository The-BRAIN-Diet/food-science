/**
 * Canonical ownership boundary between KC constituent evidence and PM↔KC relevance.
 * @see system/key-constraint-schema.md
 */

import { INPUT_TYPES, FORBIDDEN_INPUT_TYPES, validateDietaryInputTraceability } from "./dietary-input-traceability.mjs";
import { validateStructuredVitaminLabels } from "./nutrient-naming.mjs";
import { CLAIM_CEILING } from "./dietary-lever-atoms.mjs";
import { RETIRED_KC_IDS, isRetiredKc } from "./kc-registry.mjs";
import { buildPmReferenceKeyIndex } from "./pm-reference-index.mjs";

export const KC_EVIDENCE_REVIEW_STATUSES = new Set(["legacy-unreviewed", "canonical"]);
export const KC_CHANGE_CONTROL_TYPES = new Set([
  "invalid-kc",
  "constituent-challenge",
  "constituent-candidate",
  "new-kc-candidate",
  "ikc-scope-conflict",
  "applicability-retest",
]);
export const KC_CHANGE_CONTROL_STATUSES = new Set([
  "pending-kc-review",
  "resolved-by-kc-review",
]);
export const PM_KC_MEMBERSHIP_STATUSES = new Set([
  "canonical-reviewed",
  "legacy-unreviewed",
  "challenged",
]);

export const KC_APPLICABILITY_DISPOSITIONS = new Set([
  "established",
  "unassessed",
  "unresolved",
  "evidence-supported-non-application",
]);

export const KC_APPLICABILITY_MODES = new Set(["governs", "constrained-by", "supported-upstream-supply", "conditional-constraint"]);

/** KC-layer classification of the same five atoms — not a sixth scientific atom. */
export const CONSTRAINT_STATUSES = new Set([
  "nutritionally-constrained",
  "biochemical-requirement",
  "dietary-input",
  "modulatory",
  "unsupported",
]);

export const IKC_MEMBERSHIP_VALUES = new Set(["admitted", "excluded"]);

/** Statuses that record a relationship but cannot admit iKC membership. */
export const NON_CONSTRAINT_MEMBERSHIP_STATUSES = new Set([
  "biochemical-requirement",
  "dietary-input",
  "modulatory",
  "unsupported",
]);

export function isAdmittedIkcConstituent(row) {
  if (String(row?.ikc_membership || "") === "excluded") return false;
  if (NON_CONSTRAINT_MEMBERSHIP_STATUSES.has(String(row?.constraint_status || ""))) {
    return false;
  }
  if (String(row?.ikc_membership || "") === "admitted") return true;
  return true;
}

const KC_PRESENTATION_OVERRIDE_FIELDS = new Set([
  "input",
  "input_type",
  "biological_role",
  "evidence_source",
  "evidence_limitation",
  "requirement_classification",
  "derived_target",
]);

const PM_KC_RELATIONSHIP_OVERRIDE_FIELDS = new Set([
  "input",
  "input_type",
  "biological_role",
  "pm_biological_role",
  "evidence_source",
  "evidence_limitation",
  "kc_biological_role",
  "kc_evidence_source",
  "kc_evidence_limitation",
  "requirement_classification",
  "derived_target",
]);

function push(issues, code, message) {
  issues.push({ code, message });
}

function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function evidenceSourceHasProvenance(source) {
  return Boolean(
    source &&
      typeof source === "object" &&
      ((Array.isArray(source.finding_ids) && source.finding_ids.length) ||
        (Array.isArray(source.citation_keys) && source.citation_keys.length) ||
        (Array.isArray(source.pathway_resources) && source.pathway_resources.length)),
  );
}

function evidenceIndex(data) {
  return {
    findingIds: new Set((data?.scientific_findings || []).map((finding) => String(finding?.id))),
    citationKeys: new Set(buildPmReferenceKeyIndex(data?.references || []).keys()),
  };
}

function validateEvidenceSource(source, issues, label, codePrefix, index) {
  if (!evidenceSourceHasProvenance(source)) {
    push(
      issues,
      `${codePrefix}_evidence_source`,
      `${label} requires evidence_source with finding_ids, citation_keys, or pathway_resources`,
    );
    return;
  }
  for (const findingId of source?.finding_ids || []) {
    if (!index.findingIds.has(String(findingId))) {
      push(
        issues,
        `${codePrefix}_unknown_finding`,
        `${label} evidence_source references unknown Finding ${findingId}`,
      );
    }
  }
  for (const citationKey of source?.citation_keys || []) {
    if (!index.citationKeys.has(String(citationKey))) {
      push(
        issues,
        `${codePrefix}_unknown_citation`,
        `${label} evidence_source citation_key ${citationKey} is not in the page references`,
      );
    }
  }
}

function kcIdFromLegacyEntry(entry) {
  return parseKeyConstraintRef(entry).kcId;
}

/** Parse `key_constraints` string or object into KC page id + iKC id. */
export function parseKeyConstraintRef(entry) {
  if (entry && typeof entry === "object") {
    const kcId = entry.kc_id || entry.id || null;
    const ikcId = entry.ikc_id || kcId;
    return { kcId: kcId ? String(kcId) : null, ikcId: ikcId ? String(ikcId) : null };
  }
  const text = String(entry || "");
  const kcId = text.match(/BRS\d+\(KC\d+\)/)?.[0] || null;
  const ikcId = text.match(/BRS\d+\(KC\d+\)-IKC\d+/i)?.[0] || kcId;
  return { kcId, ikcId };
}

export function relationshipIkcId(relationship) {
  if (nonEmpty(relationship?.ikc_id)) return String(relationship.ikc_id);
  return relationship?.kc_id ? String(relationship.kc_id) : "";
}

function declaredIkcIds(data) {
  const rows = data?.individual_key_constraints;
  if (Array.isArray(rows) && rows.length) {
    return new Set([...rows.map((row) => row?.ikc_id && String(row.ikc_id)).filter(Boolean), ...(data?.legacy_ikc_references || []).map(row => String(row.ikc_id))]);
  }
  return data?.kc_id ? new Set([String(data.kc_id)]) : new Set();
}

export function buildCanonicalKcIndex(kcFrontMatters = []) {
  const kcIds = new Set();
  const atomIds = new Map();
  const reviewStatus = new Map();
  const ikcIds = new Map();
  const atomIkcIds = new Map();
  const admittedAtomIds = new Map();
  const excludedAtomIds = new Map();
  const excludedInputLabels = new Map();

  for (const data of kcFrontMatters) {
    if (!data?.kc_id || isRetiredKc({ id: data.kc_id })) continue;
    const kcId = String(data.kc_id);
    kcIds.add(kcId);
    const declared = declaredIkcIds(data);
    ikcIds.set(kcId, declared);
    reviewStatus.set(kcId, data.kc_evidence_review_status ? String(data.kc_evidence_review_status) : "");
    const ids = new Set();
    const atomToIkc = new Map();
    const admitted = new Set();
    const excluded = new Set();
    const excludedLabels = new Set();
    for (const row of data.kc_input_traceability || []) {
      if (!row?.atom_id) continue;
      const atomId = String(row.atom_id);
      ids.add(atomId);
      atomToIkc.set(atomId, row.ikc_id ? String(row.ikc_id) : kcId);
      if (isAdmittedIkcConstituent(row)) admitted.add(atomId);
      else {
        excluded.add(atomId);
        if (nonEmpty(row.input)) excludedLabels.add(normalizeDietaryLabel(row.input));
      }
    }
    atomIds.set(kcId, ids);
    atomIkcIds.set(kcId, atomToIkc);
    admittedAtomIds.set(kcId, admitted);
    excludedAtomIds.set(kcId, excluded);
    excludedInputLabels.set(kcId, excludedLabels);
  }

  return { kcIds, atomIds, reviewStatus, ikcIds, atomIkcIds, admittedAtomIds, excludedAtomIds, excludedInputLabels };
}

export function validateKcEmergingSupportEvidence(data, issues, { entityLabel, provenanceIndex = evidenceIndex(data) }) {
  const rows = data?.kc_emerging_support_traceability;
  const presentations = data?.kc_emerging_support_presentations;
  if (!rows?.length && !presentations?.length) return;

  if (!Array.isArray(rows) || rows.length === 0) {
    push(issues, "kc_emerging_support_missing_atoms", `${entityLabel}: Emerging Biological Supports require kc_emerging_support_traceability`);
    return;
  }
  if (!Array.isArray(presentations) || presentations.length === 0) {
    push(issues, "kc_emerging_support_missing_presentations", `${entityLabel}: Emerging Biological Supports require kc_emerging_support_presentations`);
  }

  const atomIds = new Set();
  for (const [index, row] of rows.entries()) {
    const label = `${entityLabel}: kc_emerging_support_traceability[${index}]`;
    const atomId = nonEmpty(row?.atom_id) ? String(row.atom_id) : "";
    if (!atomId) push(issues, "kc_emerging_support_missing_id", `${label} requires atom_id`);
    else if (atomIds.has(atomId)) push(issues, "kc_emerging_support_duplicate_id", `${label} duplicates ${atomId}`);
    else atomIds.add(atomId);

    if (!nonEmpty(row?.input)) push(issues, "kc_emerging_support_missing_input", `${label} requires input`);
    if (!nonEmpty(row?.input_type)) {
      push(issues, "kc_emerging_support_missing_input_type", `${label} requires input_type`);
    } else {
      const inputType = String(row.input_type).trim().toLowerCase();
      if (FORBIDDEN_INPUT_TYPES.has(inputType) || !INPUT_TYPES.has(inputType)) {
        push(issues, "kc_emerging_support_invalid_input_type", `${label} requires a precise canonical input_type; received "${row.input_type}"`);
      }
    }
    if (!nonEmpty(row?.biological_role)) {
      push(issues, "kc_emerging_support_missing_biological_role", `${label} requires biological_role`);
    }
    validateEvidenceSource(row?.evidence_source, issues, label, "kc_emerging_support_missing", provenanceIndex);
    if (!nonEmpty(row?.evidence_limitation)) {
      push(issues, "kc_emerging_support_missing_limitation", `${label} requires evidence_limitation`);
    }
  }

  const presentedIds = new Set();
  const slugs = new Set();
  for (const [index, presentation] of (presentations || []).entries()) {
    const label = `${entityLabel}: kc_emerging_support_presentations[${index}]`;
    const atomId = nonEmpty(presentation?.atom_id) ? String(presentation.atom_id) : "";
    if (!atomId || !atomIds.has(atomId)) {
      push(issues, "kc_emerging_support_presentation_unknown_atom", `${label} must reference a local emerging-support atom_id`);
    } else {
      presentedIds.add(atomId);
    }
    const slug = nonEmpty(presentation?.support_slug) ? String(presentation.support_slug) : "";
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      push(issues, "kc_emerging_support_invalid_slug", `${label} requires a lowercase support_slug`);
    } else if (slugs.has(slug)) {
      push(issues, "kc_emerging_support_duplicate_slug", `${label} duplicates support_slug ${slug}`);
    } else slugs.add(slug);
    if (!nonEmpty(presentation?.label)) {
      push(issues, "kc_emerging_support_missing_label", `${label} requires a visible disclosure label`);
    }
    for (const field of KC_PRESENTATION_OVERRIDE_FIELDS) {
      if (presentation?.[field] !== undefined) {
        push(issues, "kc_emerging_support_presentation_override", `${label} must not redefine ${field}; project atom ${atomId || "(missing)"}`);
      }
    }
  }

  for (const atomId of atomIds) {
    if (!presentedIds.has(atomId)) {
      push(issues, "kc_emerging_support_atom_not_projected", `${entityLabel}: emerging-support atom ${atomId} is not projected`);
    }
  }
}

export function validateKcOwnedEvidence(data, issues, { entityLabel, content = "" } = {}) {
  validateStructuredVitaminLabels(data, issues, { entityLabel, content });
  const status = data?.kc_evidence_review_status;
  const rows = data?.kc_input_traceability;
  const presentations = data?.kc_constituent_presentations;
  const provenanceIndex = evidenceIndex(data);

  if (status !== undefined && !KC_EVIDENCE_REVIEW_STATUSES.has(String(status))) {
    push(
      issues,
      "kc_invalid_evidence_review_status",
      `${entityLabel}: kc_evidence_review_status must be legacy-unreviewed or canonical`,
    );
  }

  if (isRetiredKc({ id: data?.kc_id })) {
    push(issues, "kc_retired_page", `${entityLabel}: retired KC must not remain a live canonical page`);
  }

  const ikcIds = declaredIkcIds(data);
  if (Array.isArray(data?.individual_key_constraints)) {
    const seenIkc = new Set();
    for (const [i, row] of data.individual_key_constraints.entries()) {
      const label = `${entityLabel}: individual_key_constraints[${i}]`;
      if (!nonEmpty(row?.ikc_id)) {
        push(issues, "kc_ikc_missing_id", `${label} requires ikc_id`);
        continue;
      }
      const ikcId = String(row.ikc_id);
      if (seenIkc.has(ikcId)) push(issues, "kc_ikc_duplicate_id", `${label} duplicates ${ikcId}`);
      else seenIkc.add(ikcId);
    }
  }

  if (status === "canonical" && (!Array.isArray(rows) || rows.length === 0)) {
    push(
      issues,
      "kc_canonical_review_missing_atoms",
      `${entityLabel}: canonical KC evidence review requires kc_input_traceability`,
    );
  }
  if (Array.isArray(rows) && rows.length > 0 && status !== "canonical") {
    push(
      issues,
      "kc_atoms_without_canonical_review",
      `${entityLabel}: kc_input_traceability requires kc_evidence_review_status: canonical`,
    );
  }

  const atomIds = new Set();
  for (const [rowIndex, row] of (rows || []).entries()) {
    const label = `${entityLabel}: kc_input_traceability[${rowIndex}]`;
    if (!nonEmpty(row?.atom_id)) push(issues, "kc_atom_missing_id", `${label} requires atom_id`);
    else if (atomIds.has(String(row.atom_id))) {
      push(issues, "kc_atom_duplicate_id", `${label} duplicates atom_id ${row.atom_id}`);
    } else atomIds.add(String(row.atom_id));

    if (!nonEmpty(row?.input)) push(issues, "kc_atom_missing_input", `${label} requires input`);
    if (!nonEmpty(row?.input_type)) {
      push(issues, "kc_atom_missing_input_type", `${label} requires input_type`);
    } else {
      const inputType = String(row.input_type).trim().toLowerCase();
      if (FORBIDDEN_INPUT_TYPES.has(inputType) || !INPUT_TYPES.has(inputType)) {
        push(
          issues,
          "kc_atom_invalid_input_type",
          `${label} requires a precise canonical input_type; received "${row.input_type}"`,
        );
      }
    }
    if (!nonEmpty(row?.biological_role)) {
      push(
        issues,
        "kc_atom_missing_biological_role",
        `${label} requires biological_role within the KC resource pool or bottleneck`,
      );
    }
    if (ikcIds.size > 1 || (Array.isArray(data?.individual_key_constraints) && data.individual_key_constraints.length > 1)) {
      if (!nonEmpty(row?.ikc_id)) {
        push(issues, "kc_atom_missing_ikc_id", `${label} requires ikc_id when the KC page declares multiple iKCs`);
      } else if (!ikcIds.has(String(row.ikc_id))) {
        push(issues, "kc_atom_unknown_ikc", `${label} ikc_id ${row.ikc_id} is not declared on this KC page`);
      }
    } else if (nonEmpty(row?.ikc_id) && data?.kc_id && String(row.ikc_id) !== String(data.kc_id) && !ikcIds.has(String(row.ikc_id))) {
      push(issues, "kc_atom_unknown_ikc", `${label} ikc_id ${row.ikc_id} is not declared on this KC page`);
    }
    validateEvidenceSource(
      row?.evidence_source,
      issues,
      label,
      "kc_atom_missing",
      provenanceIndex,
    );
    if (row?.constraint_status !== undefined && !CONSTRAINT_STATUSES.has(String(row.constraint_status))) {
      push(
        issues,
        "kc_atom_invalid_constraint_status",
        `${label} constraint_status must be nutritionally-constrained, biochemical-requirement, dietary-input, modulatory, or unsupported`,
      );
    }
    if (row?.claim_ceiling !== undefined && !CLAIM_CEILING.has(String(row.claim_ceiling))) {
      push(
        issues,
        "kc_atom_invalid_claim_ceiling",
        `${label} claim_ceiling must be biological-dependency, dietary-provision, modulation-demonstrated, or phenome-benefit`,
      );
    }
    if (row?.ikc_membership !== undefined && !IKC_MEMBERSHIP_VALUES.has(String(row.ikc_membership))) {
      push(
        issues,
        "kc_atom_invalid_ikc_membership",
        `${label} ikc_membership must be admitted or excluded`,
      );
    }
    if (
      String(row?.ikc_membership || "") === "admitted" &&
      NON_CONSTRAINT_MEMBERSHIP_STATUSES.has(String(row?.constraint_status || ""))
    ) {
      push(
        issues,
        "kc_atom_requirement_is_not_membership",
        `${label}: biochemical requirement, dietary-input, modulatory, or unsupported status cannot admit iKC membership`,
      );
    }
  }

  const admittedIds = new Set(
    (rows || []).filter((row) => row?.atom_id && isAdmittedIkcConstituent(row)).map((row) => String(row.atom_id)),
  );

  if (status === "canonical" && admittedIds.size === 0 && Array.isArray(rows) && rows.length > 0) {
    push(
      issues,
      "kc_canonical_no_admitted_constituents",
      `${entityLabel}: canonical KC review left no admitted constraint-bearing constituents; flag the iKC rather than admitting biochemical requirements`,
    );
  }

  if (status === "canonical" && (!Array.isArray(presentations) || presentations.length === 0)) {
    push(
      issues,
      "kc_canonical_review_missing_presentations",
      `${entityLabel}: canonical KC review requires kc_constituent_presentations projected from KC atoms`,
    );
  }

  const presentedIds = new Set();
  for (const [presentationIndex, presentation] of (presentations || []).entries()) {
    const label = `${entityLabel}: kc_constituent_presentations[${presentationIndex}]`;
    const atomId = presentation?.atom_id && String(presentation.atom_id);
    if (!atomId || !atomIds.has(atomId)) {
      push(issues, "kc_presentation_unknown_atom", `${label} must reference a local KC atom_id`);
    } else {
      presentedIds.add(atomId);
      const atom = (rows || []).find((row) => String(row?.atom_id) === atomId);
      if (atom && !isAdmittedIkcConstituent(atom)) {
        push(
          issues,
          "kc_excluded_constituent_projected",
          `${label} must not project excluded/non-constraint atom ${atomId} as an iKC constituent`,
        );
      }
    }
    for (const field of KC_PRESENTATION_OVERRIDE_FIELDS) {
      if (presentation?.[field] !== undefined) {
        push(
          issues,
          "kc_presentation_scientific_override",
          `${label} must not redefine KC-owned ${field}; project atom ${atomId || "(missing)"}`,
        );
      }
    }
  }

  if (status === "canonical") {
    for (const atomId of admittedIds) {
      if (!presentedIds.has(atomId)) {
        push(
          issues,
          "kc_atom_not_projected",
          `${entityLabel}: admitted KC atom ${atomId} is not projected by kc_constituent_presentations`,
        );
      }
    }
  }

  validateKcEmergingSupportEvidence(data, issues, { entityLabel, provenanceIndex });
  validateKcChangeControlFlagList(data, issues, { entityLabel, provenanceIndex });
}

export function validateKcChangeControlFlagList(data, issues, { entityLabel, provenanceIndex }) {
  const seenFlagIds = new Set();
  for (const [flagIndex, flag] of (data?.kc_change_control_flags || []).entries()) {
    const label = `${entityLabel}: kc_change_control_flags[${flagIndex}]`;
    const flagId = flag?.flag_id && String(flag.flag_id);
    if (!flagId) push(issues, "kc_change_flag_missing_id", `${label} requires flag_id`);
    else if (seenFlagIds.has(flagId)) {
      push(issues, "kc_change_flag_duplicate_id", `${label} duplicates ${flagId}`);
    } else seenFlagIds.add(flagId);

    if (!KC_CHANGE_CONTROL_TYPES.has(String(flag?.flag_type))) {
      push(
        issues,
        "kc_change_flag_invalid_type",
        `${label} flag_type must be invalid-kc, constituent-challenge, constituent-candidate, new-kc-candidate, ikc-scope-conflict, or applicability-retest`,
      );
    }
    if (flag?.flag_type !== "new-kc-candidate" && !nonEmpty(flag?.kc_id)) {
      push(issues, "kc_change_flag_missing_kc_id", `${label} requires kc_id`);
    }
    if (flag?.kc_id && isRetiredKc({ id: String(flag.kc_id) }) && flag?.status === "pending-kc-review") {
      push(
        issues,
        "kc_change_flag_retired_target",
        `${label} cannot leave a pending flag against retired ${flag.kc_id}`,
      );
    }
    if (!nonEmpty(flag?.proposition)) {
      push(issues, "kc_change_flag_missing_proposition", `${label} requires proposition`);
    }
    validateEvidenceSource(
      flag?.evidence_source,
      issues,
      label,
      "kc_change_flag_missing",
      provenanceIndex,
    );
    if (!KC_CHANGE_CONTROL_STATUSES.has(String(flag?.status))) {
      push(
        issues,
        "kc_change_flag_invalid_status",
        `${label} status must be pending-kc-review or resolved-by-kc-review`,
      );
    }
  }
}

export function validatePmKcGovernance(
  data,
  issues,
  { entityLabel, canonicalKcIndex = null } = {},
) {
  const provenanceIndex = evidenceIndex(data);
  if (data?.kc_input_traceability?.length || data?.kc_constituent_presentations?.length || data?.individual_key_constraints?.length) {
    push(
      issues,
      "pm_rewrites_ikc",
      `${entityLabel}: PM pages must not carry kc_input_traceability, kc_constituent_presentations, or individual_key_constraints; iKC membership is KC-owned`,
    );
  }
  const pmAtomIds = new Set(
    (data?.dietary_input_traceability || [])
      .map((row) => row?.atom_id && String(row.atom_id))
      .filter(Boolean),
  );
  const changeFlagIds = new Set(
    (data?.kc_change_control_flags || [])
      .map((flag) => flag?.flag_id && String(flag.flag_id))
      .filter(Boolean),
  );
  for (const entry of data?.key_constraints || []) {
    const kcId = kcIdFromLegacyEntry(entry);
    if (kcId && RETIRED_KC_IDS.has(kcId)) {
      push(
        issues,
        "pm_retired_kc_projection",
        `${entityLabel}: key_constraints must not project retired ${kcId}`,
      );
    }
  }

  const seenRelationshipIds = new Set();
  const seenKcIkcPairs = new Set();
  for (const [relationshipIndex, relationship] of (data?.pm_kc_relationships || []).entries()) {
    const label = `${entityLabel}: pm_kc_relationships[${relationshipIndex}]`;
    const relationshipId = relationship?.relationship_id && String(relationship.relationship_id);
    const kcId = relationship?.kc_id && String(relationship.kc_id);
    const ikcId = relationshipIkcId(relationship);

    if (!relationshipId) {
      push(issues, "pm_kc_missing_relationship_id", `${label} requires relationship_id`);
    } else if (seenRelationshipIds.has(relationshipId)) {
      push(issues, "pm_kc_duplicate_relationship_id", `${label} duplicates ${relationshipId}`);
    } else seenRelationshipIds.add(relationshipId);

    if (kcId && ikcId) {
      const pair = `${kcId}\0${ikcId}`;
      if (seenKcIkcPairs.has(pair)) {
        push(issues, "pm_kc_duplicate_ikc", `${label} duplicates PM↔iKC pair ${kcId} / ${ikcId}`);
      } else seenKcIkcPairs.add(pair);
    }

    if (!kcId) push(issues, "pm_kc_missing_kc_id", `${label} requires kc_id`);
    else if (isRetiredKc({ id: kcId })) {
      push(issues, "pm_retired_kc_relationship", `${label} must not reference retired ${kcId}`);
    } else if (canonicalKcIndex && !canonicalKcIndex.kcIds.has(kcId)) {
      push(issues, "pm_kc_unknown_kc", `${label} references unknown canonical KC ${kcId}`);
    } else if (
      canonicalKcIndex?.ikcIds?.get(kcId) &&
      ikcId &&
      !canonicalKcIndex.ikcIds.get(kcId).has(ikcId)
    ) {
      push(issues, "pm_kc_unknown_ikc", `${label} references unknown iKC ${ikcId} on ${kcId}`);
    }

    if (!nonEmpty(relationship?.pm_biological_role)) {
      push(
        issues,
        "pm_kc_missing_biological_role",
        `${label} requires PM-specific biological relevance`,
      );
    }
    validateEvidenceSource(
      relationship?.evidence_source,
      issues,
      label,
      "pm_kc_missing",
      provenanceIndex,
    );

    if (relationship?.constituent_projections !== undefined) {
      push(
        issues,
        "pm_kc_deprecated_constituent_projections",
        `${label}: constituent_projections makes KC evidence the PM source; use independently adjudicated constituent_relationships`,
      );
    }

    const seenConstituentIds = new Set();
    for (const [constituentIndex, constituent] of (
      relationship?.constituent_relationships || []
    ).entries()) {
      const constituentLabel = `${label}.constituent_relationships[${constituentIndex}]`;
      const relationshipId =
        constituent?.relationship_id && String(constituent.relationship_id);
      const pmAtomId = constituent?.pm_atom_id && String(constituent.pm_atom_id);
      const kcAtomId = constituent?.kc_atom_id && String(constituent.kc_atom_id);
      const membershipStatus = String(constituent?.kc_membership_status || "");
      const flagId =
        constituent?.kc_change_control_flag_id &&
        String(constituent.kc_change_control_flag_id);

      if (!relationshipId) {
        push(
          issues,
          "pm_kc_constituent_missing_relationship_id",
          `${constituentLabel} requires relationship_id`,
        );
      } else if (seenConstituentIds.has(relationshipId)) {
        push(
          issues,
          "pm_kc_constituent_duplicate_relationship_id",
          `${constituentLabel} duplicates ${relationshipId}`,
        );
      } else seenConstituentIds.add(relationshipId);

      if (!pmAtomId || !pmAtomIds.has(pmAtomId)) {
        push(
          issues,
          "pm_kc_constituent_unknown_pm_atom",
          `${constituentLabel} must reference a PM-owned dietary_input_traceability atom through pm_atom_id`,
        );
      }

      if (!PM_KC_MEMBERSHIP_STATUSES.has(membershipStatus)) {
        push(
          issues,
          "pm_kc_constituent_invalid_membership_status",
          `${constituentLabel} kc_membership_status must be canonical-reviewed, legacy-unreviewed, or challenged`,
        );
      }

      if (membershipStatus === "canonical-reviewed") {
        if (canonicalKcIndex && kcId && canonicalKcIndex.kcIds.has(kcId) && canonicalKcIndex.reviewStatus.get(kcId) !== "canonical") {
          push(
            issues,
            "pm_kc_canonical_membership_before_kc_review",
            `${constituentLabel}: canonical-reviewed iKC membership requires KC-page kc_evidence_review_status: canonical`,
          );
        }
        if (!kcAtomId) {
          push(
            issues,
            "pm_kc_constituent_missing_kc_atom",
            `${constituentLabel} canonical-reviewed membership requires kc_atom_id`,
          );
        } else if (
          canonicalKcIndex &&
          kcId &&
          !canonicalKcIndex.atomIds.get(kcId)?.has(kcAtomId)
        ) {
          push(
            issues,
            "pm_kc_constituent_unknown_kc_atom",
            `${constituentLabel} references unknown ${kcId} atom ${kcAtomId}`,
          );
        } else if (canonicalKcIndex?.excludedAtomIds?.get(kcId)?.has(kcAtomId)) {
          push(
            issues,
            "pm_kc_excluded_constituent_projection",
            `${constituentLabel} must not project excluded ${kcId} atom ${kcAtomId} into §3.1.3 iKC membership`,
          );
        } else if (
          canonicalKcIndex?.atomIkcIds?.get(kcId)?.get(kcAtomId) &&
          ikcId &&
          ikcId !== kcId &&
          canonicalKcIndex.atomIkcIds.get(kcId).get(kcAtomId) !== ikcId
        ) {
          push(
            issues,
            "pm_kc_constituent_ikc_mismatch",
            `${constituentLabel} kc_atom_id ${kcAtomId} belongs to a different iKC than ${ikcId}`,
          );
        }
      }

      if (membershipStatus === "legacy-unreviewed") {
        if (!nonEmpty(constituent?.legacy_kc_constituent_label)) {
          push(
            issues,
            "pm_kc_constituent_missing_legacy_label",
            `${constituentLabel} requires legacy_kc_constituent_label`,
          );
        }
        if (kcAtomId) {
          push(
            issues,
            "pm_kc_constituent_unreviewed_has_kc_atom",
            `${constituentLabel} must not claim kc_atom_id before KC-owned review`,
          );
        }
      }

      if (
        membershipStatus === "legacy-unreviewed" ||
        membershipStatus === "challenged"
      ) {
        if (!flagId || !changeFlagIds.has(flagId)) {
          push(
            issues,
            "pm_kc_constituent_missing_change_flag",
            `${constituentLabel} requires a local kc_change_control_flag_id pending KC-owned review`,
          );
        }
      }

      for (const field of PM_KC_RELATIONSHIP_OVERRIDE_FIELDS) {
        if (constituent?.[field] !== undefined) {
          push(
            issues,
            "pm_kc_constituent_scientific_override",
            `${constituentLabel} must not redefine ${field}; PM science resolves through pm_atom_id and KC science through optional kc_atom_id`,
          );
        }
      }
    }
  }

  validateKcChangeControlFlagList(data, issues, { entityLabel, provenanceIndex });
  validateKcApplicabilityAdjudications(data, issues, { entityLabel });
  validatePmKcDisclosurePresentations(data, issues, { entityLabel });
}

/**
 * When `kc_applicability_adjudications` is present, check dispositions against
 * published mappings. Does not decide scientific membership.
 */
export function validateKcApplicabilityAdjudications(data, issues, { entityLabel } = {}) {
  const rows = data?.kc_applicability_adjudications;
  if (rows == null) return;
  if (!Array.isArray(rows)) {
    push(issues, "kc_applicability_not_array", `${entityLabel}: kc_applicability_adjudications must be an array`);
    return;
  }

  const establishedPairs = new Set();
  const seenArms = new Set();
  for (const [i, row] of rows.entries()) {
    const label = `${entityLabel}: kc_applicability_adjudications[${i}]`;
    const kcId = row?.kc_id ? String(row.kc_id) : "";
    const ikcId = row?.ikc_id ? String(row.ikc_id) : kcId;
    const armId = row?.arm_id ? String(row.arm_id) : "";
    const disposition = String(row?.disposition || "");
    const mode = String(row?.applicability_mode || "");

    if (!kcId) push(issues, "kc_applicability_missing_kc_id", `${label} requires kc_id`);
    if (!armId) push(issues, "kc_applicability_missing_arm_id", `${label} requires arm_id`);
    if (!KC_APPLICABILITY_DISPOSITIONS.has(disposition)) {
      push(
        issues,
        "kc_applicability_invalid_disposition",
        `${label} disposition must be established, unassessed, unresolved, or evidence-supported-non-application`,
      );
    }
    if (disposition === "established") {
      if (!KC_APPLICABILITY_MODES.has(mode)) {
        push(
          issues,
          "kc_applicability_missing_mode",
          `${label} established rows require an admitted applicability mode`,
        );
      }
      if (kcId) establishedPairs.add(`${kcId}\0${ikcId || kcId}`);
    } else if (mode) {
      push(
        issues,
        "kc_applicability_mode_without_established",
        `${label} applicability_mode is only valid when disposition is established`,
      );
    }
    if (kcId && armId) {
      const armKey = `${kcId}\0${ikcId || kcId}\0${armId}`;
      if (seenArms.has(armKey)) {
        push(issues, "kc_applicability_duplicate_arm", `${label} duplicates arm ${armId} on ${ikcId || kcId}`);
      } else seenArms.add(armKey);
    }
  }

  for (const [i, relationship] of (data?.pm_kc_relationships || []).entries()) {
    const kcId = relationship?.kc_id ? String(relationship.kc_id) : "";
    const ikcId = relationshipIkcId(relationship);
    const pair = `${kcId}\0${ikcId}`;
    if (kcId && !establishedPairs.has(pair)) {
      push(
        issues,
        "pm_kc_without_established_adjudication",
        `${entityLabel}: pm_kc_relationships[${i}] publishes ${ikcId} without an established kc_applicability_adjudications row`,
      );
    }
  }

  for (const [i, entry] of (data?.key_constraints || []).entries()) {
    const { kcId, ikcId } = parseKeyConstraintRef(entry);
    if (!kcId) continue;
    const pair = `${kcId}\0${ikcId || kcId}`;
    if (!establishedPairs.has(pair)) {
      push(
        issues,
        "kc_index_without_established_adjudication",
        `${entityLabel}: key_constraints[${i}] lists ${ikcId || kcId} without an established applicability adjudication`,
      );
    }
  }

  for (const pair of establishedPairs) {
    const [kcId, ikcId] = pair.split("\0");
    const covered = (data?.pm_kc_relationships || []).some((row) => {
      if (!row?.kc_id || String(row.kc_id) !== kcId) return false;
      return relationshipIkcId(row) === ikcId;
    });
    if (!covered) {
      push(
        issues,
        "established_adjudication_missing_pm_kc",
        `${entityLabel}: established applicability for ${ikcId} requires a matching pm_kc_relationships row`,
      );
    }
  }
}

/**
 * Canonical KC §2 must list only admitted constituents and must not restore food arrows.
 */
export function validateKcCoreMembershipProjection(data, content, issues, { entityLabel }) {
  if (String(data?.kc_evidence_review_status || "") !== "canonical") return;
  const body = String(content || "");
  const core =
    body.match(/### 2\. Core Nutritional Requirements\n([\s\S]*?)(?=\n### 3\. )/)?.[1] || "";
  if (!core) return;
  if (core.includes("←")) {
    push(
      issues,
      "kc_legacy_food_arrow",
      `${entityLabel}: canonical KC §2 must not restore food-arrow examples as iKC membership`,
    );
  }
  const excludedLabels = new Set(
    (data?.kc_input_traceability || [])
      .filter((row) => !isAdmittedIkcConstituent(row) && nonEmpty(row?.input))
      .map((row) => normalizeDietaryLabel(row.input)),
  );
  for (const line of core.split("\n")) {
    const bullet = line.match(/^\-\s+(.+?)\s*$/)?.[1];
    if (!bullet) continue;
    const label = normalizeDietaryLabel(bullet.split("←")[0]);
    if (excludedLabels.has(label)) {
      push(
        issues,
        "kc_excluded_constituent_in_core",
        `${entityLabel}: §2 must not list excluded non-member "${bullet.trim()}" as an iKC constituent`,
      );
    }
  }
}

function normalizeDietaryLabel(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Stage 2B must adjudicate §4.1.1, §4.1.2 and §4.1.3 (canonical §3.1.x accepted).
 * Does not rewrite KC pages. Apply when evidence_status is stage-2b-dietary-addressability.
 *
 * `stage2b_cofactor_name_without_atom` only means a retained `cofactors:` name still
 * lacks a matching DIT atom. It is not scientific evidence against the relationship
 * and must not be used as a reason to drop an unreviewed §4.1.2 candidate.
 */
export function validateStage2bDietaryRequirementLayers(data, issues, { entityLabel, content = "" } = {}) {
  if (String(data?.evidence_status || "") !== "stage-2b-dietary-addressability") return;

  const body = String(content || "");
  if (!/(?:[34]\.1|1\.1)\.1\s+Direct/.test(body)) {
    push(issues, "stage2b_missing_direct_layer", `${entityLabel}: Stage 2B requires §4.1.1 / §3.1.1 Direct and/or Derived Dietary Requirements`);
  }
  if (!/(?:[34]\.1|1\.1)\.2\s+Cofactors/.test(body)) {
    push(issues, "stage2b_missing_cofactor_layer", `${entityLabel}: Stage 2B requires §4.1.2 / §3.1.2 Cofactors and Substrates`);
  }
  if (!/(?:[34]\.1|1\.1)\.3\s+Key Constraints/.test(body)) {
    push(issues, "stage2b_missing_kc_layer", `${entityLabel}: Stage 2B requires §4.1.3 / §3.1.3 Key Constraints`);
  }

  const ditLabels = new Set(
    (data?.dietary_input_traceability || []).map((row) => normalizeDietaryLabel(row?.input)).filter(Boolean),
  );
  for (const [i, name] of (data?.cofactors || []).entries()) {
    const label = String(name?.name || name || "").trim();
    if (!label) continue;
    if (!ditLabels.has(normalizeDietaryLabel(label))) {
      push(
        issues,
        "stage2b_cofactor_name_without_atom",
        `${entityLabel}: cofactors[${i}] "${label}" is a name only; Stage 2B requires a matching dietary_input_traceability atom`,
      );
    }
  }

  const covered = new Set(
    (data?.pm_kc_relationships || []).map((row) => {
      const kcId = row?.kc_id ? String(row.kc_id) : "";
      const ikcId = relationshipIkcId(row);
      return `${kcId}\0${ikcId}`;
    }),
  );
  for (const [i, entry] of (data?.key_constraints || []).entries()) {
    const { kcId, ikcId } = parseKeyConstraintRef(entry);
    if (!kcId) continue;
    const key = `${kcId}\0${ikcId || kcId}`;
    if (!covered.has(key)) {
      push(
        issues,
        "stage2b_kc_index_unadjudicated",
        `${entityLabel}: key_constraints[${i}] lists ${ikcId || kcId} but Stage 2B has no matching pm_kc_relationships row`,
      );
    }
  }
}

/** Validate opt-in PM-owned relationship disclosures without admitting new mappings. */
export function validatePmKcDisclosurePresentations(data, issues, { entityLabel } = {}) {
  const findings = new Map((data.scientific_findings || []).map(row => [row.id, row]));
  const presented = [
    ...(data.pm_kc_relationships || []).filter(row => row.presentation_label),
  ];
  for (const row of presented) {
    const label = `${entityLabel}: KC disclosure ${row.kc_id}`;
    for (const field of ["presentation_label", "reader_description", "description_finding_id", "kc_href"]) {
      if (!nonEmpty(row[field])) push(issues, "pm_kc_disclosure_missing_presentation", `${label} requires ${field}`);
    }
    if (!findings.has(row.description_finding_id) || !row.evidence_source?.finding_ids?.includes(row.description_finding_id)) {
      push(issues, "pm_kc_disclosure_unsupported_finding", `${label} research target must resolve to the relationship's supporting canonical Finding`);
    }
    validateDietaryInputTraceability({
      ...data,
      dietary_input_traceability: [{
        atom_id: row.relationship_id || `${row.kc_id}-assessment`,
        input: row.input, input_type: row.input_type,
        biological_role: row.pm_biological_role,
        evidence_source: row.evidence_source,
        evidence_limitation: row.evidence_limitation,
      }],
    }, issues, { entityLabel: label });
  }
  const atoms = new Map((data.dietary_input_traceability || []).map(row => [row.atom_id, row]));
  for (const relationship of data.pm_kc_relationships || []) {
    for (const constituent of relationship.constituent_relationships || []) {
      if (!constituent.description_finding_id) continue;
      if (!findings.has(constituent.description_finding_id) || !atoms.get(constituent.pm_atom_id)?.evidence_source?.finding_ids?.includes(constituent.description_finding_id)) {
        push(issues, "pm_kc_constituent_unsupported_finding", `${entityLabel}: constituent research target is not supported by its PM-owned atom`);
      }
    }
  }
}

/** New constituent identity/admission gate; old pool/arm records retain legacy meaning. */
export function validateConstituentIdentityRecords(data, issues, {registry = {}, substancePages = [], entityLabel = 'PM/KC'} = {}) {
  const verifies = (id, href) => {
    const entry = registry[id];
    const expected = entry?.path ? `/docs/substances/${entry.path.replace(/\.mdx?$/, '')}` : null;
    return Boolean(expected && expected === href && substancePages.some(p => p.permalink === expected && p.frontMatter?.id === id));
  };
  if (data.ikc_identity_version === 'constituent-v2') {
    for (const row of data.individual_key_constraints || []) {
      const atom = (data.kc_input_traceability || []).find(a => a.atom_id === row.kc_atom_id && a.ikc_id === row.ikc_id && a.ikc_membership === 'admitted');
      if (!atom) push(issues,'ikc_identity_missing_membership_evidence',`${entityLabel}: ${row.ikc_id} requires admitted KC membership evidence`);
      if (row.registration_status === 'registered' && (row.identity_status !== 'resolved' || !verifies(row.substance_id,row.substance_href))) push(issues,'ikc_identity_unverified',`${entityLabel}: ${row.ikc_id} registered identity does not verify`);
      if (row.identity_status !== 'resolved' && row.registration_status !== 'pending-identity') push(issues,'ikc_identity_pending_missing',`${entityLabel}: unresolved identity must retain pending registration`);
    }
  }
  for (const relationship of data.pm_kc_relationships || []) {
    for (const row of relationship.constituent_relationships || []) {
      if (!row.relationship_type) continue; // Explicit migration gate, not reinterpretation of old rows.
      if (!['supported-upstream-supply','conditional-constraint'].includes(row.relationship_type)) push(issues,'pm_ikc_relationship_type_invalid',`${entityLabel}: unknown individual relationship type`);
      if (row.disposition !== 'established') push(issues,'pm_ikc_individual_admission_missing',`${entityLabel}: public individual input requires its own established decision`);
      if (row.presentation_section && row.presentation_section !== '3.1.3') push(issues,'pm_ikc_wrong_section',`${entityLabel}: individual KC inputs belong in §3.1.3`);
      const atom = (data.dietary_input_traceability || []).find(a => a.atom_id === row.pm_atom_id);
      if (!atom || atom.relationship_type !== row.relationship_type || atom.ikc_id !== row.ikc_id || atom.kc_id !== relationship.kc_id) push(issues,'pm_ikc_record_linkage_invalid',`${entityLabel}: individual relationship does not resolve consistent PM/KC metadata`);
      const identity = atom?.canonical_identity;
      if (identity?.status === 'resolved') {
        if (!verifies(identity.substance_id,identity.substance_href) || row.substance_id !== identity.substance_id || row.canonical_identity?.substance_href !== identity.substance_href) push(issues,'pm_ikc_identity_invalid',`${entityLabel}: admitted substance ID/page linkage does not verify`);
      } else {
        if (!['missing-substance','existing-substance-identity-inconsistency'].includes(identity?.status) || identity?.severity !== 'MAJOR') push(issues,'pm_ikc_identity_major_flag_missing',`${entityLabel}: unresolved identity requires a major flag`);
        if (!(data.pending_actions || []).some(a => a.severity === 'MAJOR' && a.status !== 'resolved' && (a.kc_atom_id === row.kc_atom_id || a.input?.startsWith(atom?.input || '\0')))) push(issues,'pm_ikc_identity_repair_action_missing',`${entityLabel}: unresolved identity requires a pending next-step action`);
      }
    }
  }
}
