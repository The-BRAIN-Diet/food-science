/**
 * Reader-facing dietary lever disclosure payloads (no governance fields).
 * @see system/dietary-input-traceability-contract.md §7
 */

import { evidenceSourceReferenceNumbers } from "./dietary-input-traceability.mjs";
import {
  formatRequirementCompactQualifier,
  formatUpstreamIndicatorText,
  resolveLeverAtom,
} from "./dietary-lever-atoms.mjs";
import { isAdmittedIkcConstituent } from "./kc-evidence-governance.mjs";
import { attachSubstanceInputHrefs } from "./substance-input-pages.mjs";

const REF_LINE_RE = /\[([^\]]+)\]\([^#]+#([^)]+)\)/;

const INPUT_TYPE_LABEL = {
  "supported upstream supply": "Supported upstream supply",
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
  "dietary pattern": "Dietary pattern",
  "dietary matrix": "Dietary matrix",
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

function supportingFindingLink(data, findingId) {
  const id = String(findingId || "").trim();
  if (!id) return null;
  const finding = (data?.scientific_findings || []).find((row) => String(row?.id || "") === id);
  if (!finding) return null;
  const label = String(finding.finding_label || "").trim();
  if (!label) return null;
  return { id, label, href: `#${id.toLowerCase()}` };
}

function evidenceSourceReferences(data, evidenceSource, { directHref = false } = {}) {
  const referenceNumbers = evidenceSourceReferenceNumbers(data, evidenceSource);
  return referenceNumbers.map((number) => {
    const reference = String((data?.references || [])[number - 1] || "");
    const match = reference.match(REF_LINE_RE);
    return {
      number,
      label: String(match?.[1] || `Reference ${number}`).trim(),
      authorYear: String(match?.[1] || `Reference ${number}`)
        .split(/\s+[—–-]\s+/)[0]
        .trim()
        .replace(/\s+&\s+/g, " and "),
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
    const limitation = resolved.evidence_limitation || leverRow?.evidence_limitation || "";
    const key = dietaryLeverBulletKey(
      pres.label || resolved.input,
      pres.foods,
      pres.presentation_section,
    );
    map.set(key, {
      title: resolved.input,
      identityStatus: (data.dietary_input_traceability || []).find(row => String(row.atom_id) === String(pres.atom_id))?.canonical_identity?.status,
      inputHref: (() => {
        const identity = (data.dietary_input_traceability || []).find(row => String(row.atom_id) === String(pres.atom_id))?.canonical_identity;
        return identity?.status === "resolved" ? identity.substance_href : undefined;
      })(),
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
      readerDescription: String(pres.reader_description || "").trim(),
      supportingFinding: supportingFindingLink(data, pres.description_finding_id),
      upstreamIndicators: (resolved.upstream_pm_relationships || [])
        .map((row) => ({
          text: formatUpstreamIndicatorText(row),
          href: row.href,
        }))
        .filter((row) => row.text && row.href),
    });
  }

  for (const [field, section] of [
    ["system_optimisation_practices", "3.2"],
    ["lifestyle_priorities", "3.3"],
  ]) {
    for (const row of data?.[field] || []) {
      const label = String(row?.presentation_label || row?.input || "").trim();
      if (!label) continue;
      map.set(dietaryLeverBulletKey(label, "", section), {
        title: String(row.input),
        inputType: formatInputTypeLabel(row.input_type),
        biologicalRole: String(row.biological_role || "").trim(),
        evidenceLimitation: String(row.evidence_limitation || "").trim(),
        evidenceReferences: evidenceSourceReferences(data, row.evidence_source),
        compactQualifier: "",
        presentationSection: section,
        readerDescription: String(row.reader_description || "").trim(),
        supportingFinding: supportingFindingLink(data, row.description_finding_id),
      });
    }
  }

  const assessments = data?.kc_applicability_adjudications || [];
  const establishedRows = (data?.pm_kc_relationships || []).filter((row) => assessments.some((assessment) =>
    assessment.disposition === "established" && assessment.kc_id === row.kc_id &&
    (assessment.ikc_id || assessment.kc_id) === (row.ikc_id || row.kc_id),
  ));
  for (const row of establishedRows) {
    if (!row.presentation_label || !row.input || !row.input_type || !row.pm_biological_role) continue;
    const section = "3.1.3";
    map.set(dietaryLeverBulletKey(row.presentation_label, "", section), {
      title: row.input,
      inputType: formatInputTypeLabel(row.input_type),
      biologicalRole: row.pm_biological_role,
      evidenceLimitation: String(row.evidence_limitation || ""),
      evidenceReferences: evidenceSourceReferences(data, row.evidence_source),
      compactQualifier: row.applicability_label || "Established applicability",
      presentationSection: section,
      readerDescription: String(row.reader_description || ""),
      supportingFinding: supportingFindingLink(data, row.description_finding_id),
      originTag: row.kc_href ? {text: row.origin_label || row.kc_id, href: row.kc_href} : undefined,
    });
  }

  const traceById = new Map(
    (data?.dietary_input_traceability || [])
      .filter((row) => row?.atom_id)
      .map((row) => [String(row.atom_id), row]),
  );
  for (const relationship of data?.pm_kc_relationships || []) {
    if (assessments.length && !assessments.some((assessment) =>
      assessment.disposition === "established" && assessment.kc_id === relationship.kc_id &&
      (assessment.ikc_id || assessment.kc_id) === (relationship.ikc_id || relationship.kc_id),
    )) continue;
    for (const constituent of relationship?.constituent_relationships || []) {
      const atom = traceById.get(String(constituent?.pm_atom_id || ""));
      if (!atom?.input) continue;
      const label = constituent?.label || atom.input;
      map.set(dietaryLeverBulletKey(label, "", "3.1.3"), {
        title: atom.input,
        identityStatus: atom.canonical_identity?.status,
        inputHref: atom.canonical_identity?.status === "resolved" ? atom.canonical_identity.substance_href : undefined,
        inputType: formatInputTypeLabel(atom.input_type),
        biologicalRole: atom.biological_role,
        evidenceLimitation: String(atom.evidence_limitation || "").trim(),
        evidenceReferences: evidenceSourceReferences(data, atom.evidence_source),
        compactQualifier: "",
        presentationSection: "3.1.3",
        readerDescription: String(constituent.reader_description || ""),
        supportingFinding: supportingFindingLink(data, constituent.description_finding_id),
        originTag: relationship.origin_label && relationship.kc_href
          ? { text: relationship.origin_label, href: relationship.kc_href }
          : undefined,
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
    if (!isAdmittedIkcConstituent(atom)) continue;
    const label = presentation?.label || atom.input;
    const disclosure = {
      title: atom.input,
      inputType: formatInputTypeLabel(atom.input_type),
      biologicalRole: atom.biological_role,
      evidenceLimitation: String(atom.evidence_limitation || "").trim(),
      evidenceReferences: evidenceSourceReferences(data, atom.evidence_source, {
        directHref: true,
      }),
      compactQualifier: "",
      presentationSection: "kc-constituent",
    };
    map.set(dietaryLeverBulletKey(label, ""), disclosure);
    const evidenceLabel = String(presentation?.evidence_label || "").trim();
    if (evidenceLabel) {
      map.set(dietaryLeverBulletKey(evidenceLabel, ""), disclosure);
    }
  }

  const kcSupportById = new Map(
    (data?.kc_emerging_support_traceability || [])
      .filter((row) => row?.atom_id)
      .map((row) => [String(row.atom_id), row]),
  );
  for (const presentation of data?.kc_emerging_support_presentations || []) {
    const atom = kcSupportById.get(String(presentation?.atom_id || ""));
    const slug = String(presentation?.support_slug || "").trim();
    if (!atom?.input || !slug) continue;
    const label = presentation?.label || atom.input;
    map.set(dietaryLeverBulletKey(label, "", `kc-emerging-support:${slug}`), {
      title: atom.input,
      inputType: formatInputTypeLabel(atom.input_type),
      biologicalRole: atom.biological_role,
      evidenceLimitation: String(atom.evidence_limitation || "").trim(),
      evidenceReferences: evidenceSourceReferences(data, atom.evidence_source, {
        directHref: true,
      }),
      compactQualifier: "",
      presentationSection: `kc-emerging-support:${slug}`,
    });
  }
  return attachSubstanceInputHrefs(map);
}
