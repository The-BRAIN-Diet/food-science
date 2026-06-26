/**
 * Canonical Phenome Registry — load, match, and validate.
 * @see src/data/phenome-registry.json
 * @see system/phenome-relationship-schema.md
 */

import fs from "node:fs";
import path from "node:path";

const DEFAULT_REGISTRY_PATH = "src/data/phenome-registry.json";

/** @type {Set<string>} */
export const PHENOME_LANDMARK_EVIDENCE_LAYERS = new Set([
  "construct_landmark_papers",
  "biology_to_phenome_landmark_papers",
  "nutrition_to_biology_landmark_papers",
]);

/** @type {Set<string>} */
export const PHENOME_CROSS_REFERENCE_FIELDS = new Set([
  "rdoc_domains",
  "icf_domains",
  "promis_measures",
  "hpo_terms",
  "dsm_icd_context",
]);

export const PHENOME_EVIDENCE_CONFIDENCE_VALUES = new Set([
  "low",
  "low-medium",
  "medium",
  "high",
]);

/**
 * @param {unknown} entry
 * @param {Map<string, { id: string }>} phenomeById
 * @param {string} phenomeLabel
 * @returns {Array<{ code: string, message: string, severity?: string }>}
 */
export function validateOptionalPhenomeProvenance(entry, phenomeById, phenomeLabel) {
  /** @type {Array<{ code: string, message: string, severity?: string }>} */
  const issues = [];
  const id = entry.id || phenomeLabel;

  if (entry.provenance != null) {
    const prov = entry.provenance;
    if (typeof prov !== "object" || Array.isArray(prov)) {
      issues.push({
        code: "provenance_invalid_shape",
        message: `${id}: provenance must be an object`,
      });
    } else {
      if (prov.frameworkOrigin != null && String(prov.frameworkOrigin).trim() === "") {
        issues.push({
          code: "provenance_empty_framework_origin",
          message: `${id}: provenance.frameworkOrigin must be non-empty when present`,
        });
      }
      if (prov.relatedPhenomeIds != null) {
        if (!Array.isArray(prov.relatedPhenomeIds)) {
          issues.push({
            code: "provenance_invalid_related_phenomes",
            message: `${id}: provenance.relatedPhenomeIds must be an array`,
          });
        } else {
          for (const relatedId of prov.relatedPhenomeIds) {
            if (!phenomeById.has(String(relatedId))) {
              issues.push({
                code: "provenance_unknown_related_phenome",
                message: `${id}: unknown provenance.relatedPhenomeId "${relatedId}"`,
              });
            }
            if (String(relatedId) === String(entry.id)) {
              issues.push({
                code: "provenance_self_related_phenome",
                message: `${id}: provenance.relatedPhenomeIds must not include self`,
              });
            }
          }
        }
      }
    }
  }

  if (entry.crossReferences != null) {
    const xref = entry.crossReferences;
    if (typeof xref !== "object" || Array.isArray(xref)) {
      issues.push({
        code: "cross_references_invalid_shape",
        message: `${id}: crossReferences must be an object`,
      });
    } else {
      for (const [key, value] of Object.entries(xref)) {
        if (!PHENOME_CROSS_REFERENCE_FIELDS.has(key)) {
          issues.push({
            code: "cross_references_unknown_field",
            message: `${id}: unknown crossReferences field "${key}"`,
            severity: "warning",
          });
        } else if (!Array.isArray(value)) {
          issues.push({
            code: "cross_references_invalid_array",
            message: `${id}: crossReferences.${key} must be an array of strings`,
          });
        } else {
          for (const item of value) {
            if (typeof item !== "string" || !item.trim()) {
              issues.push({
                code: "cross_references_invalid_item",
                message: `${id}: crossReferences.${key} items must be non-empty strings`,
              });
            }
          }
        }
      }
    }
  }

  if (entry.evidence != null) {
    const evidence = entry.evidence;
    if (typeof evidence !== "object" || Array.isArray(evidence)) {
      issues.push({
        code: "evidence_invalid_shape",
        message: `${id}: evidence must be an object`,
      });
    } else {
      for (const [key, value] of Object.entries(evidence)) {
        if (!PHENOME_LANDMARK_EVIDENCE_LAYERS.has(key)) {
          issues.push({
            code: "evidence_unknown_layer",
            message: `${id}: unknown evidence field "${key}"`,
            severity: "warning",
          });
          continue;
        }
        if (!Array.isArray(value)) {
          issues.push({
            code: "evidence_invalid_array",
            message: `${id}: evidence.${key} must be an array`,
          });
          continue;
        }
        for (const [idx, paper] of value.entries()) {
          if (typeof paper !== "object" || paper == null || Array.isArray(paper)) {
            issues.push({
              code: "evidence_invalid_paper",
              message: `${id}: evidence.${key}[${idx}] must be an object`,
            });
            continue;
          }
          if (!String(paper.label || "").trim()) {
            issues.push({
              code: "evidence_missing_label",
              message: `${id}: evidence.${key}[${idx}] missing label`,
            });
          }
          if (!String(paper.citation_key || "").trim()) {
            issues.push({
              code: "evidence_missing_citation_key",
              message: `${id}: evidence.${key}[${idx}] missing citation_key`,
              severity: "warning",
            });
          }
        }
      }
    }
  }

  if (entry.evidence_confidence != null) {
    const value = String(entry.evidence_confidence).trim();
    if (!PHENOME_EVIDENCE_CONFIDENCE_VALUES.has(value)) {
      issues.push({
        code: "invalid_phenome_evidence_confidence",
        message: `${id}: evidence_confidence must be low | low-medium | medium | high`,
      });
    }
  }

  if (entry.evidence_confidence_note != null && typeof entry.evidence_confidence_note !== "string") {
    issues.push({
      code: "invalid_phenome_evidence_confidence_note",
      message: `${id}: evidence_confidence_note must be a string when present`,
    });
  }

  return issues;
}

/**
 * @param {string} [rootDir]
 * @param {string} [registryPath]
 */
export function loadPhenomeRegistry(rootDir = process.cwd(), registryPath) {
  const target = path.join(rootDir, registryPath || DEFAULT_REGISTRY_PATH);
  if (!fs.existsSync(target)) {
    throw new Error(`Missing phenome registry: ${target}`);
  }
  const data = JSON.parse(fs.readFileSync(target, "utf8"));
  if (!Array.isArray(data.phenomes)) {
    throw new Error("phenome-registry.json: phenomes must be an array");
  }
  if (!Array.isArray(data.therapeuticAreas)) {
    throw new Error("phenome-registry.json: therapeuticAreas must be an array");
  }
  return data;
}

/**
 * @param {{ therapeuticAreas: Array<{ id: string, name: string }> }} registry
 */
export function buildTherapeuticAreaIndex(registry) {
  /** @type {Map<string, { id: string, name: string }>} */
  const byId = new Map();
  for (const entry of registry.therapeuticAreas || []) {
    const id = String(entry.id || "").trim();
    if (!id) continue;
    byId.set(id, entry);
  }
  return { byId };
}

/**
 * @param {{ phenomes: Array<{ id: string, name: string }> }} registry
 */
export function buildRegistryNameIndex(registry) {
  /** @type {Map<string, { id: string, name: string }>} */
  const byName = new Map();
  /** @type {Map<string, { id: string, name: string }>} */
  const byId = new Map();

  for (const entry of registry.phenomes) {
    const name = String(entry.name || "").trim();
    const id = String(entry.id || "").trim();
    if (!name || !id) continue;
    byName.set(name, entry);
    byId.set(id, entry);
  }
  return { byName, byId };
}

/**
 * @param {Array<Record<string, unknown>>} relationships
 * @param {{ phenomes: Array<{ id: string, name: string }> }} registry
 */
export function enrichRelationshipsWithPhenomeIds(relationships, registry) {
  const { byName } = buildRegistryNameIndex(registry);
  return relationships.map((row) => {
    const label = String(row.targetPhenome || "").trim();
    const match = label ? byName.get(label) : undefined;
    return {
      ...row,
      targetPhenomeId: match?.id ?? null,
    };
  });
}

/**
 * @param {Array<{ targetPhenome?: string, targetPhenomeId?: string | null }>} relationships
 * @param {{ phenomes: Array<{ id: string, name: string, status?: string }> }} registry
 */
export function buildPhenomeRegistryDiagnostics(relationships, registry) {
  const { byName, byId } = buildRegistryNameIndex(registry);
  const connectedIds = new Set(
    relationships.filter((r) => r.targetPhenomeId).map((r) => r.targetPhenomeId),
  );
  const connectedLabels = new Set(
    relationships.map((r) => String(r.targetPhenome || "").trim()).filter(Boolean),
  );

  /** @type {string[]} */
  const unmappedPhenomeLabels = [];
  /** @type {Array<{ sourceNode: string, targetPhenome: string }>} */
  const edgesWithNullPhenomeId = [];
  let edgesMissingTargetPhenome = 0;

  for (const row of relationships) {
    const label = String(row.targetPhenome || "").trim();
    if (!label) {
      edgesMissingTargetPhenome += 1;
      continue;
    }
    if (!byName.has(label)) {
      if (!unmappedPhenomeLabels.includes(label)) unmappedPhenomeLabels.push(label);
    }
    if (row.targetPhenomeId == null) {
      edgesWithNullPhenomeId.push({
        sourceNode: String(row.sourceNode || ""),
        targetPhenome: label,
      });
    }
  }
  unmappedPhenomeLabels.sort();

  /** @type {string[]} */
  const duplicateRegistryNames = [];
  const seenNames = new Map();
  for (const entry of registry.phenomes) {
    const name = String(entry.name || "").trim();
    if (!name) continue;
    const lower = name.toLowerCase();
    if (seenNames.has(lower)) {
      duplicateRegistryNames.push(name);
    } else {
      seenNames.set(lower, entry.id);
    }
  }

  /** @type {Array<{ id: string, name: string }>} */
  const orphanRegistryPhenomes = registry.phenomes
    .filter((p) => (p.status || "active") === "active")
    .filter((p) => !connectedIds.has(p.id))
    .map((p) => ({ id: p.id, name: p.name }))
    .sort((a, b) => a.id.localeCompare(b.id));

  /** Labels in edges not in registry (alias for unmapped) */
  const labelsInEdgesNotInRegistry = [...connectedLabels].filter((l) => !byName.has(l)).sort();

  return {
    registryPhenomeCount: registry.phenomes.length,
    relationshipEdgeCount: relationships.length,
    mappedEdgeCount: relationships.filter((r) => r.targetPhenomeId).length,
    unmappedPhenomeLabels,
    labelsInEdgesNotInRegistry,
    edgesMissingTargetPhenome,
    edgesWithNullPhenomeId,
    duplicateRegistryNames,
    orphanRegistryPhenomes,
    reviewFlags: registry.reviewFlags || [],
    therapeuticAreaCount: registry.therapeuticAreas?.length ?? 0,
  };
}

/**
 * @param {string} [rootDir]
 * @returns {{ ok: boolean, issues: Array<{ code: string, message: string }>, diagnostics: ReturnType<typeof buildPhenomeRegistryDiagnostics> }}
 */
export function validatePhenomeRegistry(rootDir = process.cwd()) {
  const registry = loadPhenomeRegistry(rootDir);
  const { byId: taById } = buildTherapeuticAreaIndex(registry);
  const indexPath = path.join(rootDir, "src/data/phenome-relationships.generated.json");
  /** @type {Array<Record<string, unknown>>} */
  let relationships = [];
  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    relationships = Array.isArray(index.relationships) ? index.relationships : [];
  }

  const enriched = enrichRelationshipsWithPhenomeIds(relationships, registry);
  const diagnostics = buildPhenomeRegistryDiagnostics(enriched, registry);
  const { byId } = buildRegistryNameIndex(registry);
  /** @type {Array<{ code: string, message: string }>} */
  const issues = [];
  /** @type {Array<{ code: string, message: string }>} */
  const warnings = [];

  for (const entry of registry.phenomes) {
    for (const field of ["id", "name", "slug", "description", "publicSummary", "status"]) {
      const v = entry[field];
      if (v === undefined || v === null || String(v).trim() === "") {
        issues.push({
          code: "registry_missing_field",
          message: `${entry.id || entry.name || "unknown"}: missing required field ${field}`,
        });
      }
    }
    if (!Array.isArray(entry.primaryDomains) || entry.primaryDomains.length === 0) {
      issues.push({
        code: "registry_missing_primary_domains",
        message: `${entry.id || entry.name}: primaryDomains must be a non-empty array`,
      });
    }
    if (!Array.isArray(entry.therapeuticAreaIds) || entry.therapeuticAreaIds.length === 0) {
      issues.push({
        code: "registry_missing_therapeutic_areas",
        message: `${entry.id || entry.name}: therapeuticAreaIds must be a non-empty array`,
      });
    } else {
      for (const taId of entry.therapeuticAreaIds) {
        if (!taById.has(String(taId))) {
          issues.push({
            code: "registry_unknown_therapeutic_area",
            message: `${entry.id || entry.name}: unknown therapeuticAreaId "${taId}"`,
          });
        }
      }
    }

    for (const provIssue of validateOptionalPhenomeProvenance(entry, byId, entry.id || entry.name)) {
      if (provIssue.severity === "warning") {
        warnings.push({ code: provIssue.code, message: provIssue.message });
      } else {
        issues.push({ code: provIssue.code, message: provIssue.message });
      }
    }
  }

  for (const ta of registry.therapeuticAreas) {
    for (const field of ["id", "name", "slug", "description", "status"]) {
      const v = ta[field];
      if (v === undefined || v === null || String(v).trim() === "") {
        issues.push({
          code: "therapeutic_area_missing_field",
          message: `${ta.id || ta.name || "unknown TA"}: missing required field ${field}`,
        });
      }
    }
  }

  const primaryTa = registry.meta?.primaryTherapeuticAreaId;
  if (primaryTa && !taById.has(primaryTa)) {
    issues.push({
      code: "registry_invalid_primary_ta",
      message: `meta.primaryTherapeuticAreaId "${primaryTa}" is not in therapeuticAreas`,
    });
  }

  if (diagnostics.duplicateRegistryNames.length > 0) {
    issues.push({
      code: "registry_duplicate_names",
      message: `Duplicate registry phenome names: ${diagnostics.duplicateRegistryNames.join(", ")}`,
    });
  }

  if (diagnostics.edgesMissingTargetPhenome > 0) {
    issues.push({
      code: "edge_missing_target_phenome",
      message: `${diagnostics.edgesMissingTargetPhenome} relationship edge(s) missing targetPhenome`,
    });
  }

  for (const label of diagnostics.unmappedPhenomeLabels) {
    issues.push({
      code: "unmapped_phenome_label",
      message: `Relationship label not in registry (add registry entry or fix PM front matter): "${label}"`,
    });
  }

  for (const orphan of diagnostics.orphanRegistryPhenomes) {
    warnings.push({
      code: "orphan_registry_phenome",
      message: `Registered phenome has no connected mechanisms: ${orphan.id} — ${orphan.name}`,
    });
  }

  return { ok: issues.length === 0, issues, warnings, diagnostics };
}
