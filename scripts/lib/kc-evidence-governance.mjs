/**
 * Canonical ownership boundary between KC constituent evidence and PM↔KC relevance.
 * @see system/key-constraint-schema.md
 */

import { INPUT_TYPES, FORBIDDEN_INPUT_TYPES } from "./dietary-input-traceability.mjs";
import { RETIRED_KC_IDS, isRetiredKc } from "./kc-registry.mjs";
import { buildPmReferenceKeyIndex } from "./pm-reference-index.mjs";

export const KC_EVIDENCE_REVIEW_STATUSES = new Set(["legacy-unreviewed", "canonical"]);
export const KC_CHANGE_CONTROL_TYPES = new Set([
  "invalid-kc",
  "constituent-challenge",
  "constituent-candidate",
  "new-kc-candidate",
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
  if (typeof entry === "string") return entry.match(/BRS\d+\(KC\d+\)/)?.[0] || null;
  return entry?.kc_id || entry?.id || null;
}

export function buildCanonicalKcIndex(kcFrontMatters = []) {
  const kcIds = new Set();
  const atomIds = new Map();

  for (const data of kcFrontMatters) {
    if (!data?.kc_id || isRetiredKc({ id: data.kc_id })) continue;
    kcIds.add(String(data.kc_id));
    const ids = new Set(
      (data.kc_input_traceability || [])
        .map((row) => row?.atom_id && String(row.atom_id))
        .filter(Boolean),
    );
    atomIds.set(String(data.kc_id), ids);
  }

  return { kcIds, atomIds };
}

export function validateKcOwnedEvidence(data, issues, { entityLabel }) {
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
    validateEvidenceSource(
      row?.evidence_source,
      issues,
      label,
      "kc_atom_missing",
      provenanceIndex,
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
    for (const atomId of atomIds) {
      if (!presentedIds.has(atomId)) {
        push(
          issues,
          "kc_atom_not_projected",
          `${entityLabel}: KC atom ${atomId} is not projected by kc_constituent_presentations`,
        );
      }
    }
  }
}

export function validatePmKcGovernance(
  data,
  issues,
  { entityLabel, canonicalKcIndex = null } = {},
) {
  const provenanceIndex = evidenceIndex(data);
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
  for (const [relationshipIndex, relationship] of (data?.pm_kc_relationships || []).entries()) {
    const label = `${entityLabel}: pm_kc_relationships[${relationshipIndex}]`;
    const relationshipId = relationship?.relationship_id && String(relationship.relationship_id);
    const kcId = relationship?.kc_id && String(relationship.kc_id);

    if (!relationshipId) {
      push(issues, "pm_kc_missing_relationship_id", `${label} requires relationship_id`);
    } else if (seenRelationshipIds.has(relationshipId)) {
      push(issues, "pm_kc_duplicate_relationship_id", `${label} duplicates ${relationshipId}`);
    } else seenRelationshipIds.add(relationshipId);

    if (!kcId) push(issues, "pm_kc_missing_kc_id", `${label} requires kc_id`);
    else if (isRetiredKc({ id: kcId })) {
      push(issues, "pm_retired_kc_relationship", `${label} must not reference retired ${kcId}`);
    } else if (canonicalKcIndex && !canonicalKcIndex.kcIds.has(kcId)) {
      push(issues, "pm_kc_unknown_kc", `${label} references unknown canonical KC ${kcId}`);
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
        `${label} flag_type must be invalid-kc, constituent-challenge, constituent-candidate, or new-kc-candidate`,
      );
    }
    if (
      flag?.flag_type !== "new-kc-candidate" &&
      !nonEmpty(flag?.kc_id)
    ) {
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
