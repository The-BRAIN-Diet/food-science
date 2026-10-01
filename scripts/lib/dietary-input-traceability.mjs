/**
 * PM Evidence layer — canonical five-atom lever evidence relationships.
 * @see system/dietary-input-traceability-contract.md
 */

import { findingsById, hasScientificFindings } from "./scientific-findings.mjs";
import { buildPmReferenceKeyIndex, citationKeyFromPmReferenceLine } from "./pm-reference-index.mjs";
import { SOP_CATEGORIES } from "../data/brs-hub-optimisation-levers.mjs";

/** Recommended Input Types. Extensible when evidence requires a more precise type. */
export const INPUT_TYPES = new Set([
  "substrate",
  "substrate provision",
  "nutrient/substance",
  "cofactor",
  "catalytic ion",
  "cofactor precursor",
  "precursor",
  "resource dependency",
  "biochemical requirement",
  "nutrient/compound class",
  "food component",
  "food group",
  "dietary matrix",
  "dietary pattern",
  "preparation characteristic",
  "defined dietary exposure",
  "food preparation/delivery practice",
  "lifestyle practice",
]);

/** Catch-all labels that must not be used as Input Type. */
export const FORBIDDEN_INPUT_TYPES = new Set([
  "supporting input",
  "supporting inputs",
  "dietary support",
  "other input",
  "other",
]);

function push(issues, code, message) {
  issues.push({ code, message });
}

export function traceabilityAtomKey(row) {
  return [
    String(row?.input || "").trim().toLowerCase(),
    String(row?.input_type || "").trim().toLowerCase(),
    String(row?.biological_role || "").trim().toLowerCase(),
  ].join("\0");
}

export function indexTraceabilityAtoms(rows = []) {
  const byId = new Map();
  const byKey = new Map();
  for (const row of rows) {
    if (row?.atom_id) byId.set(String(row.atom_id), row);
    byKey.set(traceabilityAtomKey(row), row);
  }
  return { byId, byKey };
}

export function validateDietaryInputTraceability(data, issues, { entityLabel }) {
  const rows = data?.dietary_input_traceability;
  if (!rows?.length) return;
  const prefix = `${entityLabel}: dietary_input_traceability`;
  const seenIds = new Set();
  const seenTuples = new Set();
  const findingIds = hasScientificFindings(data)
    ? new Set((data.scientific_findings || []).map((f) => f.id))
    : null;
  const refKeys = buildPmReferenceKeyIndex(data.references || []);

  for (const [i, row] of rows.entries()) {
    const label = `${prefix}[${i}]`;
    if (!row?.input?.trim()) push(issues, "dit_missing_input", `${label} requires input`);
    if (!row?.input_type?.trim()) push(issues, "dit_missing_input_type", `${label} requires input_type`);
    else {
      const inputType = String(row.input_type).trim().toLowerCase();
      if (FORBIDDEN_INPUT_TYPES.has(inputType)) {
        push(
          issues,
          "dit_forbidden_input_type",
          `${label} input_type "${row.input_type}" is a catch-all; state the actual biological/nutritional role or flag for adjudication`,
        );
      } else if (!INPUT_TYPES.has(String(row.input_type).trim())) {
        push(
          issues,
          "dit_unclassified_input_type",
          `${label} input_type "${row.input_type}" is not in the recommended vocabulary; flag for adjudication rather than forcing a catch-all`,
        );
      }
    }
    if (!row?.biological_role?.trim()) {
      push(issues, "dit_missing_biological_role", `${label} requires biological_role`);
    }
    if (!row?.evidence_limitation?.trim()) {
      push(issues, "dit_missing_limitation", `${label} requires evidence_limitation`);
    }
    const es = row?.evidence_source;
    if (!es || typeof es !== "object") {
      push(issues, "dit_missing_evidence_source", `${label} requires evidence_source`);
      continue;
    }
    const fids = es.finding_ids || [];
    const ckeys = es.citation_keys || [];
    if (findingIds && !fids.length) {
      push(issues, "dit_missing_finding_source", `${label} evidence_source must cite a Scientific Finding`);
    }
    if (findingIds && !ckeys.length) {
      push(issues, "dit_missing_bibliography_source", `${label} evidence_source must cite a PM bibliography entry`);
    }
    if (!findingIds && !fids.length && !ckeys.length && !(es.pathway_resources || []).length) {
      push(issues, "dit_empty_evidence_source", `${label} evidence_source must cite findings and citation_keys`);
    }
    if (findingIds) {
      for (const id of fids) {
        if (!findingIds.has(String(id))) {
          push(issues, "dit_unknown_finding", `${label} references unknown Finding ${id}`);
        }
      }
    }
    for (const key of ckeys) {
      if (!refKeys.has(String(key))) {
        push(issues, "dit_unknown_citation_key", `${label} citation_key ${key} not in PM references list`);
      }
    }
    if (row.atom_id) {
      const aid = String(row.atom_id);
      if (seenIds.has(aid)) push(issues, "dit_duplicate_atom_id", `${label} duplicate atom_id ${aid}`);
      seenIds.add(aid);
    }
    const tuple = traceabilityAtomKey(row);
    if (seenTuples.has(tuple)) {
      push(issues, "dit_true_duplicate", `${label} duplicates the same input+type+role tuple`);
    }
    seenTuples.add(tuple);
  }
}

export const PM_NON_DIETARY_LEVER_COLLECTIONS = [
  {
    field: "system_optimisation_practices",
    label: "System Optimisation Practice",
    section: "3.2",
  },
  {
    field: "lifestyle_priorities",
    label: "Lifestyle Priority",
    section: "3.3",
  },
];

export const SYSTEM_OPTIMISATION_CATEGORIES = new Set(
  SOP_CATEGORIES.map((category) => category.id),
);

/**
 * Admitted SOP records are independent of Dietary Requirements.
 * A Stage 2B Direct/Derived NO may only *flag* an Optimisation Strategy
 * candidate; it must not auto-admit `system_optimisation_practices`.
 */

/**
 * Validate PM-owned §3.2/§3.3 evidence relationships against the same five atoms.
 * The containing collection determines lever class and destination subsection;
 * System Optimisation category is relationship metadata, not a sixth atom.
 */
export function validatePmNonDietaryLeverEvidence(data, issues, { entityLabel }) {
  const findingIds = hasScientificFindings(data)
    ? new Set((data.scientific_findings || []).map((finding) => String(finding.id)))
    : null;
  const refKeys = buildPmReferenceKeyIndex(data.references || []);

  for (const collection of PM_NON_DIETARY_LEVER_COLLECTIONS) {
    const rows = data?.[collection.field];
    if (!rows?.length) continue;
    const seenIds = new Set();
    for (const [i, row] of rows.entries()) {
      const label = `${entityLabel}: ${collection.field}[${i}]`;
      if (collection.field === "system_optimisation_practices") {
        const category = String(row?.optimisation_category || "").trim();
        if (!category) {
          push(
            issues,
            "pm_sop_missing_category",
            `${label} requires optimisation_category`,
          );
        } else if (!SYSTEM_OPTIMISATION_CATEGORIES.has(category)) {
          push(
            issues,
            "pm_sop_invalid_category",
            `${label} optimisation_category must be one of ${[
              ...SYSTEM_OPTIMISATION_CATEGORIES,
            ].join(", ")}`,
          );
        }
      }
      if (!row?.atom_id?.trim()) {
        push(issues, "pm_lever_missing_atom_id", `${label} requires atom_id`);
      } else if (seenIds.has(String(row.atom_id))) {
        push(issues, "pm_lever_duplicate_atom_id", `${label} duplicates atom_id ${row.atom_id}`);
      } else {
        seenIds.add(String(row.atom_id));
      }
      if (!row?.input?.trim()) push(issues, "pm_lever_missing_input", `${label} requires input`);
      if (!row?.input_type?.trim()) {
        push(issues, "pm_lever_missing_input_type", `${label} requires input_type`);
      } else {
        const inputType = String(row.input_type).trim().toLowerCase();
        if (FORBIDDEN_INPUT_TYPES.has(inputType)) {
          push(issues, "pm_lever_forbidden_input_type", `${label} input_type must state the actual lever type`);
        }
      }
      if (!row?.biological_role?.trim()) {
        push(issues, "pm_lever_missing_biological_role", `${label} requires biological_role`);
      }
      if (!row?.evidence_limitation?.trim()) {
        push(issues, "pm_lever_missing_limitation", `${label} requires evidence_limitation`);
      }

      const source = row?.evidence_source;
      if (!source || typeof source !== "object") {
        push(issues, "pm_lever_missing_evidence_source", `${label} requires evidence_source`);
        continue;
      }
      const fids = source.finding_ids || [];
      const citationKeys = source.citation_keys || [];
      if (!fids.length) {
        push(issues, "pm_lever_missing_finding_source", `${label} must cite a Scientific Finding`);
      }
      if (!citationKeys.length) {
        push(issues, "pm_lever_missing_bibliography_source", `${label} must cite a PM bibliography entry`);
      }
      for (const findingId of fids) {
        if (findingIds && !findingIds.has(String(findingId))) {
          push(issues, "pm_lever_unknown_finding", `${label} references unknown Finding ${findingId}`);
        }
      }
      for (const citationKey of citationKeys) {
        if (!refKeys.has(String(citationKey))) {
          push(
            issues,
            "pm_lever_unknown_citation_key",
            `${label} citation_key ${citationKey} is not in the PM bibliography`,
          );
        }
      }
    }
  }
}

/** Resolve citation_keys to 1-based PM reference numbers (presentation). */
export function evidenceSourceReferenceNumbers(data, evidenceSource) {
  const index = buildPmReferenceKeyIndex(data.references || []);
  const nums = (evidenceSource?.citation_keys || [])
    .map((k) => index.get(String(k)))
    .filter(Boolean);
  return [...new Set(nums)].sort((a, b) => a - b);
}
