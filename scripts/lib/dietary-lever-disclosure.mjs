/**
 * Reader-facing dietary lever disclosure payloads (no governance fields).
 * @see system/dietary-input-traceability-contract.md §7
 */

import { evidenceSourceReferenceNumbers } from "./dietary-input-traceability.mjs";
import { formatRequirementCompactQualifier, resolveLeverAtom } from "./dietary-lever-atoms.mjs";

const REF_LINE_RE = /\[([^\]]+)\]\([^#]+#([^)]+)\)/;

const INPUT_TYPE_LABEL = {
  substrate: "Substrate",
  "substrate provision": "Substrate provision",
  "nutrient/substance": "Nutrient / precursor",
  cofactor: "Cofactor",
  "catalytic ion": "Catalytic ion",
  "cofactor precursor": "Cofactor precursor",
  precursor: "Precursor",
  "resource dependency": "Resource dependency",
  "biochemical requirement": "Biochemical requirement",
  "nutrient/compound class": "Nutrient / compound class",
};

function normalizeFoods(foods) {
  return String(foods || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .join(", ");
}

/** Match key for §3 bullet in its relationship-specific presentation context. */
export function dietaryLeverBulletKey(label, foods, presentationSection = "") {
  const base = `${String(label || "").trim().toLowerCase()}\0${normalizeFoods(foods)}`;
  const section = String(presentationSection || "").trim();
  return section ? `${base}\0${section}` : base;
}

export function formatInputTypeLabel(inputType) {
  const key = String(inputType || "").trim();
  return INPUT_TYPE_LABEL[key] || key.replace(/\//g, " / ");
}

export function formatPresentationCompactQualifier(atom, presentationSection) {
  const section = String(presentationSection || "").trim();
  if (section === "3.1.1") return formatRequirementCompactQualifier(atom);
  if (section === "3.1.2") return formatInputTypeLabel(atom?.input_type);
  return "";
}

function evidenceSourceReferences(data, evidenceSource, { directHref = false } = {}) {
  const referenceNumbers = evidenceSourceReferenceNumbers(data, evidenceSource);
  return referenceNumbers.map((number) => {
    const reference = String((data?.references || [])[number - 1] || "");
    const match = reference.match(REF_LINE_RE);
    return {
      number,
      label: String(match?.[1] || `Reference ${number}`).trim(),
      ...(directHref
        ? { href: reference.match(/\]\(([^)]+)\)/)?.[1] || "" }
        : {}),
    };
  });
}

/**
 * @returns {Map<string, object>} bulletKey → disclosure payload for UI
 */
export function buildDietaryLeverDisclosureMap(data) {
  const map = new Map();
  const presentations = data?.dietary_lever_presentations || [];
  for (const pres of presentations) {
    const leverRow = (data?.dietary_lever_atoms || []).find(
      (r) => String(r.atom_id) === String(pres.atom_id),
    );
    const resolved = resolveLeverAtom(data, leverRow || { atom_id: pres.atom_id });
    if (!resolved) continue;
    const limitation = leverRow?.evidence_limitation || "";
    const key = dietaryLeverBulletKey(
      pres.label || resolved.input,
      pres.foods,
      pres.presentation_section,
    );
    map.set(key, {
      title: resolved.input,
      inputType: formatInputTypeLabel(resolved.input_type),
      biologicalRole: resolved.biological_role,
      evidenceLimitation: String(limitation).trim(),
      evidenceReferences: evidenceSourceReferences(data, resolved.evidence_source),
      requirementClassification: resolved.requirement_classification,
      derivedTarget: resolved.derived_target,
      compactQualifier: formatPresentationCompactQualifier(
        resolved,
        pres.presentation_section,
      ),
      presentationSection: String(pres.presentation_section || "").trim(),
    });
  }

  const traceById = new Map(
    (data?.dietary_input_traceability || [])
      .filter((row) => row?.atom_id)
      .map((row) => [String(row.atom_id), row]),
  );
  for (const relationship of data?.pm_kc_relationships || []) {
    for (const constituent of relationship?.constituent_relationships || []) {
      const atom = traceById.get(String(constituent?.pm_atom_id || ""));
      if (!atom?.input) continue;
      const label = constituent?.label || atom.input;
      map.set(dietaryLeverBulletKey(label, "", "3.1.3"), {
        title: atom.input,
        inputType: formatInputTypeLabel(atom.input_type),
        biologicalRole: atom.biological_role,
        evidenceLimitation: String(atom.evidence_limitation || "").trim(),
        evidenceReferences: evidenceSourceReferences(data, atom.evidence_source),
        compactQualifier: "",
        presentationSection: "3.1.3",
      });
    }
  }

  const kcTraceById = new Map(
    (data?.kc_input_traceability || [])
      .filter((row) => row?.atom_id)
      .map((row) => [String(row.atom_id), row]),
  );
  for (const presentation of data?.kc_constituent_presentations || []) {
    const atom = kcTraceById.get(String(presentation?.atom_id || ""));
    if (!atom?.input) continue;
    const label = presentation?.label || atom.input;
    map.set(dietaryLeverBulletKey(label, ""), {
      title: atom.input,
      inputType: formatInputTypeLabel(atom.input_type),
      biologicalRole: atom.biological_role,
      evidenceLimitation: String(atom.evidence_limitation || "").trim(),
      evidenceReferences: evidenceSourceReferences(data, atom.evidence_source, {
        directHref: true,
      }),
      compactQualifier: "",
      presentationSection: "kc-constituent",
    });
  }
  return map;
}
