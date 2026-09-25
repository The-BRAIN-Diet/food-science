/**
 * PM Evidence layer — four-field dietary input atoms.
 * @see system/dietary-input-traceability-contract.md
 */

import { findingsById, hasScientificFindings } from "./scientific-findings.mjs";
import { buildPmReferenceKeyIndex, citationKeyFromPmReferenceLine } from "./pm-reference-index.mjs";

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
    const es = row?.evidence_source;
    if (!es || typeof es !== "object") {
      push(issues, "dit_missing_evidence_source", `${label} requires evidence_source`);
      continue;
    }
    const fids = es.finding_ids || [];
    const ckeys = es.citation_keys || [];
    if (!fids.length && !ckeys.length && !(es.pathway_resources || []).length) {
      push(issues, "dit_empty_evidence_source", `${label} evidence_source must cite findings or citation_keys`);
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

/** Resolve citation_keys to 1-based PM reference numbers (presentation). */
export function evidenceSourceReferenceNumbers(data, evidenceSource) {
  const index = buildPmReferenceKeyIndex(data.references || []);
  const nums = (evidenceSource?.citation_keys || [])
    .map((k) => index.get(String(k)))
    .filter(Boolean);
  return [...new Set(nums)].sort((a, b) => a - b);
}
