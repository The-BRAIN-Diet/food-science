/**
 * Canonical Scientific Finding model — constants, validation, reuse indexing
 * and section rendering.
 *
 * Durable source of truth: `scientific_findings` in PM front matter.
 * Phenome relationships reference Findings by id via `scientific_findings`.
 * A Finding is authored ONCE and may inform 0..n phenome relationships; it is
 * never copied per relationship.
 *
 * Assessment process: define proposition → assess relevant evidence → adjudicate
 * → stop; if adjudication materially challenges PM scope, flag Mission/Overview/
 * Mechanistic Basis consistency; if it establishes dietary-relevant requirements,
 * preserve input + type + role + evidence source for traceability (reappearance ≠
 * duplication). See `system/scientific-finding-schema.md` § Bounded assessment,
 * `system/dietary-input-traceability-contract.md`, and `system/primary-mechanism-schema.md`
 * § PM scope consistency.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { REFERENCE_DATA_LEVELS } from "./reference-data-levels.mjs";
import { loadPhenomeRegistry, phenomeDetailUrlForName } from "./phenome-registry.mjs";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

export const SCIENTIFIC_FINDINGS_SECTION_TITLE = "Scientific Findings";

/** Only this value is authorised until SEC methodology is approved. */
export const SEC_NOT_YET_SCORED = "not-yet-scored";
export const SEC_VALUES = new Set([SEC_NOT_YET_SCORED]);

export const EVIDENCE_SOURCES = new Set(["repository-inherited", "bounded-external-search"]);

export const FINDING_ID_PATTERN = /^SF-[A-Z0-9]+(?:-[A-Z0-9]+)*-\d+$/;

/** Default presentation: mechanistic Findings render under §4.1. */
export const FINDING_PRESENTATION_MECHANISTIC = "mechanistic-basis";
/** Relationship Findings render in full under their primary Phenome Connection. */
export const FINDING_PRESENTATION_PHENOME = "phenome-relationship";

const ISA_FIELDS = [
  "study",
  "population",
  "result",
  "effect_magnitude",
  "evidence_summary",
  "limitations",
];

/** @type {ReturnType<typeof loadPhenomeRegistry> | null} */
let registryCache = null;

function registry() {
  if (!registryCache) registryCache = loadPhenomeRegistry(PROJECT_ROOT);
  return registryCache;
}

export function hasScientificFindings(data) {
  return Array.isArray(data?.scientific_findings) && data.scientific_findings.length > 0;
}

export function findingsById(data) {
  const map = new Map();
  for (const finding of data?.scientific_findings || []) {
    if (finding?.id) map.set(String(finding.id), finding);
  }
  return map;
}

export function findingPresentation(finding) {
  return String(finding?.presentation || FINDING_PRESENTATION_MECHANISTIC);
}

export function isMechanisticFinding(finding) {
  return findingPresentation(finding) === FINDING_PRESENTATION_MECHANISTIC;
}

export function isPrimaryPhenomeFinding(finding, targetPhenome) {
  return (
    findingPresentation(finding) === FINDING_PRESENTATION_PHENOME &&
    String(finding?.primary_phenome || "").trim() === String(targetPhenome || "").trim()
  );
}

/** Findings whose primary presentation is §4.1 Mechanistic Basis. */
export function mechanisticFindings(data) {
  return (data?.scientific_findings || []).filter(isMechanisticFinding);
}

/**
 * Which phenome relationships each Finding informs. Derived from relationship
 * references so reuse is visible without duplicating the Finding.
 */
export function findingInformsIndex(data) {
  const index = new Map();
  for (const rel of data?.phenome_relationships || []) {
    for (const id of rel?.scientific_findings || []) {
      const key = String(id);
      if (!index.has(key)) index.set(key, []);
      const href = phenomeDetailUrlForName(rel.target_phenome, registry());
      index.get(key).push({ phenome: rel.target_phenome, ...(href ? { href } : {}) });
    }
  }
  return index;
}

function push(issues, code, message) {
  issues.push({ code, message });
}

/**
 * Validates the Finding model and its relationship references.
 *
 * Enforces the non-duplication rule in both directions: a Finding id may be
 * declared only once, and the same study may not be primary Evidence Considered
 * in more than one Finding (which would double-count one dataset).
 */
export function validateScientificFindings(data, issues = [], { entityLabel = "page" } = {}) {
  const findings = data?.scientific_findings;
  if (findings === undefined) return issues;
  if (!Array.isArray(findings)) {
    push(issues, "findings_not_array", `${entityLabel}: scientific_findings must be a list`);
    return issues;
  }

  const seenIds = new Set();
  // A study may be primary Evidence Considered in more than one Finding: one
  // dataset can legitimately inform several distinct propositions. Where it
  // does, every Finding involved must declare the reuse under Evidence
  // Dependency so it cannot be read as independent replication.
  const primaryStudyOwners = new Map();

  for (const finding of findings) {
    const id = String(finding?.id || "").trim();
    if (!id) {
      push(issues, "finding_missing_id", `${entityLabel}: every Scientific Finding requires an id`);
      continue;
    }
    if (!FINDING_ID_PATTERN.test(id)) {
      push(
        issues,
        "finding_id_format",
        `${entityLabel}: Finding id "${id}" must look like SF-<PM>-<n> (e.g. SF-PM8-1)`,
      );
    }
    if (seenIds.has(id)) {
      push(issues, "finding_duplicate_id", `${entityLabel}: Finding ${id} is declared more than once`);
      continue;
    }
    seenIds.add(id);

    for (const field of ["finding_statement", "synthesis", "synthesis_limitations"]) {
      if (!String(finding?.[field] || "").trim()) {
        push(issues, "finding_missing_field", `${entityLabel}: ${id} is missing ${field}`);
      }
    }

    const sec = String(finding?.synthesised_evidence_confidence || "").trim();
    if (!SEC_VALUES.has(sec)) {
      push(
        issues,
        "finding_sec_value",
        `${entityLabel}: ${id} synthesised_evidence_confidence must be "${SEC_NOT_YET_SCORED}" (found "${sec}")`,
      );
    }

    const evidence = finding?.evidence_considered;
    if (!Array.isArray(evidence) || evidence.length === 0) {
      push(issues, "finding_missing_evidence", `${entityLabel}: ${id} has no Evidence Considered`);
    } else {
      for (const item of evidence) {
        const label = String(item?.label || "").trim();
        if (!label) {
          push(issues, "evidence_missing_label", `${entityLabel}: ${id} has evidence without a label`);
          continue;
        }
        if (!String(item?.directional_finding || "").trim()) {
          push(
            issues,
            "evidence_missing_direction",
            `${entityLabel}: ${id} → ${label} needs a directional_finding (direction must be preserved)`,
          );
        }
        if (!EVIDENCE_SOURCES.has(String(item?.evidence_source || ""))) {
          push(
            issues,
            "evidence_source_value",
            `${entityLabel}: ${id} → ${label} evidence_source must be one of ${[...EVIDENCE_SOURCES].join(", ")}`,
          );
        }
        if (item?.data_level && !REFERENCE_DATA_LEVELS.has(item.data_level)) {
          push(
            issues,
            "evidence_data_level",
            `${entityLabel}: ${id} → ${label} data_level "${item.data_level}" is not an allowed value`,
          );
        }
        if (item?.assessment) {
          for (const field of ISA_FIELDS) {
            if (!String(item.assessment?.[field] || "").trim()) {
              push(
                issues,
                "isa_missing_field",
                `${entityLabel}: ${id} → ${label} Individual Study Assessment is missing ${field}`,
              );
            }
          }
        }
        const key = String(item?.citation_key || label);
        if (!primaryStudyOwners.has(key)) primaryStudyOwners.set(key, []);
        primaryStudyOwners.get(key).push({ id, label });
      }
    }

    for (const item of finding?.connected_supportive_evidence || []) {
      for (const field of ["why_relevant", "why_excluded"]) {
        if (!String(item?.[field] || "").trim()) {
          push(
            issues,
            "cse_missing_field",
            `${entityLabel}: ${id} → ${item?.label || "connected evidence"} is missing ${field}`,
          );
        }
      }
    }

    const presentation = findingPresentation(finding);
    if (
      presentation !== FINDING_PRESENTATION_MECHANISTIC &&
      presentation !== FINDING_PRESENTATION_PHENOME
    ) {
      push(
        issues,
        "finding_presentation_value",
        `${entityLabel}: ${id} presentation must be "${FINDING_PRESENTATION_MECHANISTIC}" or "${FINDING_PRESENTATION_PHENOME}"`,
      );
    }
    if (presentation === FINDING_PRESENTATION_PHENOME && !String(finding?.primary_phenome || "").trim()) {
      push(
        issues,
        "finding_missing_primary_phenome",
        `${entityLabel}: ${id} is a phenome-relationship Finding and requires primary_phenome`,
      );
    }
  }

  // A study may be primary Evidence Considered in several Findings, because one
  // study can bear on more than one proposition. The constraint is that the reuse
  // stays visible: at least one of the sharing Findings must name it under Evidence
  // Dependency, so shared evidence is never read as independent replication.
  const byId = new Map(findings.filter((f) => f?.id).map((f) => [String(f.id), f]));
  for (const [, owners] of primaryStudyOwners) {
    if (owners.length < 2) continue;
    const ids = owners.map((o) => o.id);
    const declared = owners.some(({ id, label }) => {
      const notes = (byId.get(id)?.evidence_dependency || []).join(" ");
      return notes.includes(label) || ids.some((other) => other !== id && notes.includes(other));
    });
    if (!declared) {
      push(
        issues,
        "shared_evidence_undeclared",
        `${entityLabel}: ${owners[0].label} is primary Evidence Considered in ${ids.join(" and ")}; one of them must declare that reuse under Evidence Dependency`,
      );
    }
  }

  for (const rel of data?.phenome_relationships || []) {
    const refs = rel?.scientific_findings;
    if (refs === undefined) continue;
    if (!Array.isArray(refs)) {
      push(
        issues,
        "relationship_findings_not_array",
        `${entityLabel}: ${rel.target_phenome} scientific_findings must be a list of Finding ids`,
      );
      continue;
    }
    for (const id of refs) {
      if (!seenIds.has(String(id))) {
        push(
          issues,
          "relationship_finding_unresolved",
          `${entityLabel}: ${rel.target_phenome} references unknown Finding ${id}`,
        );
      }
    }
  }

  return issues;
}

/**
 * Split relationship Finding ids into primary (full render here) and cross-reference
 * (compact link to the canonical record elsewhere on the page).
 */
export function splitRelationshipFindings(rel, byId) {
  const primary = [];
  const crossRef = [];
  for (const id of rel?.scientific_findings || []) {
    const key = String(id);
    const finding = byId.get(key);
    if (!finding) continue;
    if (isPrimaryPhenomeFinding(finding, rel.target_phenome)) {
      primary.push(finding);
    } else {
      crossRef.push(key);
    }
  }
  return { primary, crossRef };
}

/**
 * Compact Finding references for cross-linked mechanistic or secondary phenome
 * Findings. The canonical full record lives under §4.1 or the primary Phenome
 * Connection panel.
 */
export function renderRelationshipFindingsLine(rel, byId, { ids = null } = {}) {
  const refIds = ids ?? rel?.scientific_findings ?? [];
  if (!refIds.length) return null;
  const items = refIds
    .map((id) => {
      const key = String(id);
      const finding = byId.get(key);
      if (!finding) return null;
      const label = String(finding.finding_label || "").trim();
      const anchor = key.toLowerCase();
      return `  - [${key}](#${anchor})${label ? ` — ${label}` : ""}`;
    })
    .filter(Boolean);
  if (!items.length) return null;
  return ["- **Related Scientific Findings:**", ...items].join("\n");
}

/**
 * Findings selected for the FM §4.4 roll-up.
 *
 * Selection is explicit via `fm_rollup: true`, not declaration order, so a
 * governing interpretive constraint cannot be dropped by where it happens to
 * sit in the list. Falls back to declaration order when nothing is flagged.
 */
export function rollUpFindings(findings = []) {
  const flagged = findings.filter((finding) => finding?.fm_rollup === true);
  return flagged.length ? flagged : findings;
}

/** Serialise a Finding as a JSX expression payload (escape `<` for MDX). */
function jsonProp(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function renderFindingBlocks(findings, informs) {
  return findings.flatMap((finding) => {
    const payload = { ...finding };
    const informedBy = informs.get(String(finding.id));
    if (informedBy?.length) payload.informs = informedBy;
    const anchor = String(finding.id).toLowerCase();
    return [
      `##### Finding ${finding.id} {#${anchor}}`,
      "",
      `<ScientificFinding finding={${jsonProp(payload)}} />`,
      "",
    ];
  });
}

/**
 * Full Finding blocks for a phenome relationship's primary proposition evidence.
 */
export function renderRelationshipPrimaryFindings(rel, data, { informs = null } = {}) {
  const byId = findingsById(data);
  const { primary } = splitRelationshipFindings(rel, byId);
  if (!primary.length) return "";
  const index = informs ?? findingInformsIndex(data);
  return renderFindingBlocks(primary, index).join("\n").trimEnd();
}

/**
 * Renders the PM §4.1 Scientific Findings subsection for mechanistic Findings
 * only. Relationship Findings render in full under their primary Phenome
 * Connection; they remain in front matter and keep their canonical ids.
 */
export function renderScientificFindingsSection(data, { sectionNum = 5, subNum = 1, intro } = {}) {
  const findings = mechanisticFindings(data);
  if (!findings.length) return "";
  const informs = findingInformsIndex(data);

  return [
    `### ${sectionNum}.${subNum} ${SCIENTIFIC_FINDINGS_SECTION_TITLE}`,
    "",
    "#### Introduction/Summary",
    "",
    intro,
    "",
    ...renderFindingBlocks(findings, informs),
  ]
    .join("\n")
    .trimEnd();
}
