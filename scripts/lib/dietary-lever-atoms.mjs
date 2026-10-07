/**
 * Dietary Requirements layer — projects PM Evidence atoms with dietary addressability
 * and optional Direct/Derived relationship classification.
 * A Direct/Derived NO may flag an Optimisation Strategy candidate; it does not
 * admit `system_optimisation_practices`.
 * @see system/dietary-input-traceability-contract.md
 */

import {
  indexTraceabilityAtoms,
  traceabilityAtomKey,
  validateDietaryInputTraceability,
  validatePmNonDietaryLeverEvidence,
  evidenceSourceReferenceNumbers,
} from "./dietary-input-traceability.mjs";
import { findDietaryRequirementsSectionStart } from "./pm-section-layout.mjs";
import { validateStructuredVitaminLabels } from "./nutrient-naming.mjs";

export const DIETARY_ADDRESSABILITY = new Set([
  "direct",
  "precursor-mediated",
  "indirect/resource",
  "not-established",
]);

export const CLAIM_CEILING = new Set([
  "biological-dependency",
  "dietary-provision",
  "modulation-demonstrated",
  "phenome-benefit",
]);

export const REQUIREMENT_CLASSIFICATION = new Set(["direct", "derived"]);

export const RELATIONSHIP_MODES = new Set(["capacity-requirement", "state-regulation"]);

export const RELATIONSHIP_LAYERS = new Set([
  "dietary-requirement",
  "biochemical-requirement",
  "kc-relevance",
]);

export const PRESENTATION_SECTIONS = new Set(["3.1.1", "3.1.2", "3.1.3"]);

const PUBLIC_OWNERSHIP_PROSE_RE =
  /\bon this page\b|supply assessment is maintained|Local listing does not create|detailed supply assessment is maintained|does not copy the precursor-pool|does not copy the precursor pool/i;

function push(issues, code, message) {
  issues.push({ code, message });
}

/**
 * Merge PM Evidence atom + Lever overlay into one resolved relationship.
 */
export function resolveLeverAtom(data, leverRow) {
  const overlay =
    leverRow?.atom_id &&
    (data?.dietary_lever_atoms || []).find((row) => String(row.atom_id) === String(leverRow.atom_id));
  leverRow = overlay ? { ...overlay, ...leverRow } : leverRow;
  const trace = indexTraceabilityAtoms(data?.dietary_input_traceability || []);
  let base = null;
  if (leverRow?.atom_id) base = trace.byId.get(String(leverRow.atom_id));
  if (!base && leverRow?.input && leverRow?.biological_role) {
    base = trace.byKey.get(
      traceabilityAtomKey({
        input: leverRow.input,
        input_type: leverRow.input_type,
        biological_role: leverRow.biological_role,
      }),
    );
  }
  if (!base) return null;
  return {
    atom_id: base.atom_id || leverRow?.atom_id,
    input: base.input,
    input_type: base.input_type,
    biological_role: base.biological_role,
    evidence_source: base.evidence_source,
    evidence_limitation: base.evidence_limitation,
    dietary_addressability: leverRow?.dietary_addressability ?? null,
    claim_ceiling: leverRow?.claim_ceiling ?? "biological-dependency",
    requirement_classification: leverRow?.requirement_classification ?? null,
    relationship_mode: leverRow?.relationship_mode ?? null,
    derived_target: leverRow?.derived_target ?? null,
    derived_target_atom_id: leverRow?.derived_target_atom_id ?? null,
    relationship_layer: leverRow?.relationship_layer || "dietary-requirement",
    reference_numbers: evidenceSourceReferenceNumbers(data, base.evidence_source),
    upstream_pm_relationships: normalizeUpstreamPmRelationships(base.upstream_pm_relationships),
  };
}

export function normalizeUpstreamPmRelationships(rows) {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => ({
      relationship_label: String(row?.relationship_label || "").trim(),
      pm_short_id: String(row?.pm_short_id || "").trim(),
      pm_id: String(row?.pm_id || "").trim(),
      href: String(row?.href || "").trim(),
    }))
    .filter((row) => row.relationship_label || row.pm_short_id || row.href);
}

export function formatUpstreamIndicatorText(row) {
  const label = String(row?.relationship_label || "").trim();
  const shortId = String(row?.pm_short_id || "").trim();
  if (!label || !shortId) return "";
  return `${label}: ${shortId}`;
}

export function validateUpstreamPmRelationships(rows, issues, label) {
  if (rows === undefined) return;
  if (!Array.isArray(rows)) {
    push(issues, "dla_upstream_not_array", `${label}: upstream_pm_relationships must be an array`);
    return;
  }
  for (const [index, row] of rows.entries()) {
    const itemLabel = `${label}: upstream_pm_relationships[${index}]`;
    const normalized = normalizeUpstreamPmRelationships([row])[0];
    if (!normalized?.relationship_label) {
      push(issues, "dla_upstream_missing_label", `${itemLabel} needs relationship_label`);
    } else if (/^from$/i.test(normalized.relationship_label)) {
      push(
        issues,
        "dla_upstream_ambiguous_label",
        `${itemLabel} must name the relationship (for example Supply), not “From”`,
      );
    }
    if (!normalized?.pm_short_id) {
      push(issues, "dla_upstream_missing_short_id", `${itemLabel} needs pm_short_id`);
    }
    if (!normalized?.href || !normalized.href.startsWith("/docs/")) {
      push(issues, "dla_upstream_invalid_href", `${itemLabel} needs an internal /docs/ href`);
    }
  }
}

function rejectPublicOwnershipProse(text, issues, label, field) {
  const value = String(text || "");
  if (PUBLIC_OWNERSHIP_PROSE_RE.test(value)) {
    push(
      issues,
      "dla_public_ownership_prose",
      `${label}: ${field} must explain the science; ownership and record-maintenance language belongs in reports`,
    );
  }
}

export function isDietaryRequirementAtom(row) {
  return String(row?.relationship_layer || "dietary-requirement") === "dietary-requirement";
}

export function isBiochemicalRequirementAtom(row) {
  return String(row?.relationship_layer || "") === "biochemical-requirement";
}

/** KC membership never owns or removes a PM-specific dietary relationship. */
export function retainPmDietaryAtomsDespiteKcMembership(pmAtoms, _kcInputs = []) {
  return Array.isArray(pmAtoms) ? [...pmAtoms] : [];
}

/** Inclusion is about the relationship existing, not demonstrated modulation. */
export function dietaryRequirementRemainsWithoutModulationEvidence(atom) {
  return Boolean(
    String(atom?.input || "").trim() &&
      String(atom?.input_type || "").trim() &&
      String(atom?.biological_role || "").trim(),
  );
}

const COMPACT_INPUT_TYPE_LABEL = {
  substrate: "Substrate",
  "substrate provision": "Substrate Provision",
  "nutrient/substance": "Nutrient / precursor",
  cofactor: "Cofactor",
  "catalytic ion": "Catalytic Ion",
  "cofactor precursor": "Cofactor Precursor",
  precursor: "Precursor",
  "resource dependency": "Resource dependency",
  "biochemical requirement": "Biochemical requirement",
  "dietary pattern": "Dietary pattern",
  "dietary matrix": "Dietary matrix",
};

export function formatRequirementCompactQualifier(atom) {
  const classification = String(atom?.requirement_classification || "").trim();
  if (!REQUIREMENT_CLASSIFICATION.has(classification)) return "";
  const cls = classification === "derived" ? "Derived" : "Direct";
  const rawType = String(atom?.input_type || "").trim();
  const type = COMPACT_INPUT_TYPE_LABEL[rawType] || rawType.replace(/\//g, " / ");
  if (classification === "derived" && atom?.derived_target) {
    return `${cls} · ${type} → ${atom.derived_target}`;
  }
  return type ? `${cls} · ${type}` : cls;
}

export function resolveAllLeverAtoms(data) {
  return (data?.dietary_lever_atoms || [])
    .map((row) => resolveLeverAtom(data, row))
    .filter(Boolean);
}

/** PM↔iKC context is valid only when it references an independently adjudicated PM atom. */
export function pmKcConstituentRelationshipIsAdjudicated(
  constituentRelationship,
  pmTraceabilityRows = [],
) {
  const pmAtomId = String(constituentRelationship?.pm_atom_id || "");
  if (!pmAtomId) return false;
  return pmTraceabilityRows.some((row) => String(row?.atom_id || "") === pmAtomId);
}

export function validateDietaryLeverAtoms(data, issues, { entityLabel, content = "" } = {}) {
  validateDietaryInputTraceability(data, issues, { entityLabel });
  validatePmNonDietaryLeverEvidence(data, issues, { entityLabel });
  validateStructuredVitaminLabels(data, issues, { entityLabel, content });
  const levers = data?.dietary_lever_atoms;
  if (!levers?.length) return;
  const trace = indexTraceabilityAtoms(data?.dietary_input_traceability || []);
  const prefix = `${entityLabel}: dietary_lever_atoms`;

  for (const [i, row] of levers.entries()) {
    const label = `${prefix}[${i}]`;
    if (!row?.atom_id && !(row?.input && row?.biological_role)) {
      push(issues, "dla_missing_link", `${label} must reference atom_id or a complete five-atom relationship`);
      continue;
    }
    const resolved = resolveLeverAtom(data, row);
    if (!resolved) {
      push(issues, "dla_unresolved_atom", `${label} does not resolve to dietary_input_traceability`);
      continue;
    }
    if (isDietaryRequirementAtom(row)) {
      if (row.dietary_addressability == null || String(row.dietary_addressability).trim() === "") {
        push(issues, "dla_missing_addressability", `${label} requires adjudicated dietary_addressability`);
      } else if (!DIETARY_ADDRESSABILITY.has(String(row.dietary_addressability))) {
        push(issues, "dla_invalid_addressability", `${label} invalid dietary_addressability`);
      }
    }
    if (row.claim_ceiling != null && row.claim_ceiling !== "") {
      if (!CLAIM_CEILING.has(String(row.claim_ceiling))) {
        push(issues, "dla_invalid_claim_ceiling", `${label} invalid claim_ceiling`);
      }
    }
    if (
      row.relationship_mode != null &&
      row.relationship_mode !== "" &&
      !RELATIONSHIP_MODES.has(String(row.relationship_mode))
    ) {
      push(
        issues,
        "dla_invalid_relationship_mode",
        `${label} relationship_mode must be capacity-requirement or state-regulation when present`,
      );
    }
    if (isBiochemicalRequirementAtom(row) && row.relationship_mode) {
      push(
        issues,
        "dla_biochemical_relationship_mode",
        `${label} §3.1.2 biochemical-requirement atoms must not carry relationship_mode`,
      );
    }
    if (String(row.relationship_mode || "") === "state-regulation") {
      if (!isDietaryRequirementAtom(row)) {
        push(
          issues,
          "dla_state_regulation_wrong_layer",
          `${label} state-regulation belongs on dietary-requirement atoms, not biochemical or kc-relevance inventory`,
        );
      }
      if (String(row.claim_ceiling || "") === "biological-dependency") {
        push(
          issues,
          "dla_state_regulation_dependency_ceiling",
          `${label} state-regulation must not use claim_ceiling biological-dependency unless indispensability is established; use modulation-demonstrated or a higher ceiling only when that claim is supported`,
        );
      }
    }
    if (
      row.requirement_classification != null &&
      row.requirement_classification !== "" &&
      !REQUIREMENT_CLASSIFICATION.has(String(row.requirement_classification))
    ) {
      push(
        issues,
        "dla_invalid_requirement_classification",
        `${label} requirement_classification must be direct or derived when present`,
      );
    }
    if (
      row.relationship_layer != null &&
      row.relationship_layer !== "" &&
      !RELATIONSHIP_LAYERS.has(String(row.relationship_layer))
    ) {
      push(
        issues,
        "dla_invalid_relationship_layer",
        `${label} relationship_layer must be dietary-requirement, biochemical-requirement, or kc-relevance when present`,
      );
    }
    if (isBiochemicalRequirementAtom(row) && row.requirement_classification === "derived") {
      push(
        issues,
        "dla_biochemical_cannot_be_derived",
        `${label} biochemical-requirement inventory items are not Derived Dietary Requirements`,
      );
    }
    if (row.requirement_classification === "derived") {
      const target = String(row.derived_target || "").trim();
      const targetId = String(row.derived_target_atom_id || "").trim();
      if (!target && !targetId) {
        push(
          issues,
          "dla_derived_missing_target",
          `${label} Derived relationships must identify the Direct requirement they provide or enable (derived_target)`,
        );
      }
      if (targetId && !trace.byId.has(targetId)) {
        push(issues, "dla_derived_target_unresolved", `${label} derived_target_atom_id ${targetId} is unknown`);
      }
      if (String(resolved.input_type || "").trim() === "substrate") {
        push(
          issues,
          "dla_derived_mislabeled_as_substrate",
          `${label} Derived provision must not use Input Type "substrate"; use substrate provision or another provision type`,
        );
      }
      const targetAtom = targetId
        ? trace.byId.get(targetId)
        : [...trace.byId.values()].find(
            (atom) => String(atom.input || "").trim().toLowerCase() === target.toLowerCase(),
          );
      const targetLever = targetAtom
        ? levers.find((r) => String(r.atom_id) === String(targetAtom.atom_id))
        : null;
      if (!targetLever || targetLever.requirement_classification !== "direct") {
        push(
          issues,
          "dla_derived_target_not_direct",
          `${label} derived_target must point to a Direct Dietary Requirement`,
        );
      }
    }
    if (
      row.requirement_classification === "direct" &&
      String(resolved.input_type || "").trim() === "substrate provision"
    ) {
      push(
        issues,
        "dla_direct_mislabeled_as_provision",
        `${label} Direct Dietary Requirements must not use Input Type "substrate provision"`,
      );
    }
    if (
      row.dietary_addressability === "not-established" &&
      row.claim_ceiling &&
      !["biological-dependency"].includes(String(row.claim_ceiling))
    ) {
      push(
        issues,
        "dla_claim_exceeds_addressability",
        `${label} claim_ceiling must not exceed biological-dependency when addressability is not-established`,
      );
    }
  }

  for (const id of trace.byId.keys()) {
    const linked = levers.some((r) => String(r.atom_id) === id);
    if (!linked) {
      push(
        issues,
        "dla_unprojected_evidence_atom",
        `${entityLabel}: dietary_input_traceability atom ${id} has no dietary_lever_atoms projection yet`,
      );
    }
  }

  for (const [i, atom] of (data?.dietary_input_traceability || []).entries()) {
    validateUpstreamPmRelationships(
      atom?.upstream_pm_relationships,
      issues,
      `${entityLabel}: dietary_input_traceability[${i}]`,
    );
    rejectPublicOwnershipProse(atom?.biological_role, issues, `${entityLabel}: dietary_input_traceability[${i}]`, "biological_role");
    rejectPublicOwnershipProse(
      atom?.evidence_limitation,
      issues,
      `${entityLabel}: dietary_input_traceability[${i}]`,
      "evidence_limitation",
    );
  }

  for (const [i, pres] of (data?.dietary_lever_presentations || []).entries()) {
    const label = `${entityLabel}: dietary_lever_presentations[${i}]`;
    const aid = String(pres?.atom_id || "");
    if (!trace.byId.has(aid)) {
      push(issues, "dla_presentation_unresolved", `${label} atom_id ${aid} unknown`);
      continue;
    }
    const lever = levers.find((r) => String(r.atom_id) === aid);
    if (pres?.presentation_section && !PRESENTATION_SECTIONS.has(String(pres.presentation_section))) {
      push(
        issues,
        "dla_invalid_presentation_section",
        `${label} presentation_section must be 3.1.1, 3.1.2 or 3.1.3 when present`,
      );
    }
    if (
      isBiochemicalRequirementAtom(lever) &&
      (!pres?.presentation_section || String(pres.presentation_section) === "3.1.1")
    ) {
      push(
        issues,
        "dla_presentation_biochemical_as_dietary",
        `${label} biochemical-requirement atoms must not render as §3.1.1 Dietary Requirements`,
      );
    }
    if (isDietaryRequirementAtom(lever) && !lever?.dietary_addressability) {
      push(issues, "dla_presentation_unadjudicated", `${label} links to unadjudicated atom`);
    }
    if (lever?.dietary_addressability === "not-established" && pres?.foods) {
      push(
        issues,
        "dla_presentation_exceeds_addressability",
        `${label} must not list food levers when addressability is not-established`,
      );
    }
    rejectPublicOwnershipProse(pres?.reader_description, issues, label, "reader_description");
    rejectPublicOwnershipProse(lever?.permitted_wording, issues, label, "permitted_wording");
    rejectPublicOwnershipProse(lever?.evidence_limitation, issues, label, "evidence_limitation");
  }
}

/** Parse legacy §3 substance ← food bullets (PM9 audit). */
export function parseLegacyLeverBullets(leversSection) {
  const lines = String(leversSection || "").split("\n");
  const bullets = [];
  for (const line of lines) {
    const m = line.match(/^\-\s+(.+?)\s+←\s+(.+)\s*$/);
    if (m) bullets.push({ substance: m[1].trim(), foods: m[2].trim(), raw: line.trim() });
  }
  return bullets;
}

/**
 * Gap audit: legacy §3 vs atomic lever model (does not mutate content).
 * @returns {Array<object>}
 */
export function auditLegacyLeverGaps(data, content) {
  const gaps = [];
  const leversStart = findDietaryRequirementsSectionStart(content);
  const leversEnd = content.indexOf("## 4. ");
  const section =
    leversStart >= 0 && leversEnd > leversStart
      ? content.slice(leversStart, leversEnd)
      : "";
  const resolved = resolveAllLeverAtoms(data);
  const byInput = new Map(resolved.map((a) => [String(a.input).toLowerCase(), a]));

  for (const bullet of parseLegacyLeverBullets(section)) {
    const sub = bullet.substance.toLowerCase();
    let matched = null;
    if (/^b6|vitamin b6|b6 \(plp\)/i.test(bullet.substance)) matched = byInput.get("vitamin b6");
    else if (/protein|eaa|amino/.test(sub)) matched = byInput.get("glutamate") || null;
    gaps.push({
      legacy_line: bullet.raw,
      resolves_to_pm_atom: matched?.atom_id || null,
      dietary_addressability: matched?.dietary_addressability ?? "unadjudicated",
      evidence_source_present: Boolean(matched?.evidence_source),
      biological_role_present: Boolean(matched?.biological_role),
      unsupported_leap:
        matched == null
          ? "No PM9 atomic relationship for this §3 row"
          : matched.dietary_addressability == null
            ? "Biological dependency established; dietary addressability not yet adjudicated — §3 reads as direct food lever"
            : null,
      reconciliation: "CC-PM8-07 — do not treat §3 row as adjudicated until reconciliation pass",
    });
  }

  if (/dose_sensitivity:/i.test(JSON.stringify(data)) && data.dose_sensitivity) {
    gaps.push({
      legacy_line: `front matter dose_sensitivity: ${data.dose_sensitivity}`,
      resolves_to_pm_atom: "PM9-DIT-3",
      dietary_addressability: "unadjudicated",
      evidence_source_present: true,
      biological_role_present: true,
      unsupported_leap: "Pattern implies dietary modification of synthesis without modulation evidence",
      reconciliation: "CC-PM8-07",
    });
  }

  gaps.push({
    legacy_line: "cofactors: B6 (PLP) — name-only front matter",
    resolves_to_pm_atom: "PM9-DIT-2 / PM9-DIT-3",
    dietary_addressability: "unadjudicated",
    evidence_source_present: true,
    biological_role_present: true,
    unsupported_leap: "Compact cofactor label without addressability or claim ceiling in §3",
    reconciliation: "Sync cofactor tier to lever atoms at reconciliation; not in this task",
  });

  return gaps;
}
