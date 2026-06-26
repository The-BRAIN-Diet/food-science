/**
 * Phenome relationship index — generated from PM front matter.
 * Regenerate: npm run phenome:index
 */

import indexJson from "./phenome-relationships.generated.json";
import registryJson from "./phenome-registry.json";

export type PhenomeReference = {
  index?: number;
  label?: string;
  citationKey?: string;
  href?: string;
};

export type PhenomeRelationshipRecord = {
  sourceNode: string;
  sourceTitle: string;
  sourcePath: string;
  parentFM: string | null;
  parentBRS: string | null;
  targetPhenome: string;
  targetPhenomeId: string | null;
  relationshipType: "supports" | "disrupts" | "modulates" | "indirect";
  confidence: "low" | "low-medium" | "medium" | "high";
  evidenceLevel: "mechanistic" | "observational" | "intervention" | "clinical";
  rationale: string;
  references: PhenomeReference[];
};

export type FmContributingPm = {
  id: string;
  name: string;
  href: string;
  relationship_type: string;
  confidence: string;
  evidence_level: string;
};

export type FmConnectedPhenomeRollup = {
  target_phenome: string;
  connected_pm_count: number;
  strongest_relationship_type: string;
  highest_evidence_level: string;
  overall_confidence: string;
  evidence_summary: string;
  contributing_pms: FmContributingPm[];
};

export type TherapeuticAreaEntry = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
  primaryWorkedExample?: boolean;
};

export type PhenomeLandmarkPaper = {
  label: string;
  citation_key?: string;
  citationKey?: string;
  href?: string;
  note?: string;
};

export type PhenomeCrossReferences = {
  rdoc_domains?: string[];
  icf_domains?: string[];
  promis_measures?: string[];
  hpo_terms?: string[];
  dsm_icd_context?: string[];
};

export type PhenomeProvenance = {
  frameworkOrigin?: string;
  developmentNote?: string;
  relatedPhenomeIds?: string[];
  benchmarkedFrameworks?: Array<{
    frameworkId?: string;
    id?: string;
    name: string;
    role?: string;
    note?: string;
  }>;
};

export type PhenomeRegistryEvidence = {
  construct_landmark_papers?: PhenomeLandmarkPaper[];
  biology_to_phenome_landmark_papers?: PhenomeLandmarkPaper[];
  nutrition_to_biology_landmark_papers?: PhenomeLandmarkPaper[];
};

export type PhenomeEvidenceConfidence = 'low' | 'low-medium' | 'medium' | 'high';

export type PhenomeRegistryEntry = {
  id: string;
  name: string;
  slug: string;
  description: string;
  publicSummary: string;
  primaryDomains: string[];
  therapeuticAreaIds: string[];
  status: string;
  provenance?: PhenomeProvenance;
  crossReferences?: PhenomeCrossReferences;
  evidence?: PhenomeRegistryEvidence;
  evidence_confidence?: PhenomeEvidenceConfidence;
  evidence_confidence_note?: string;
};

export type PhenomeRegistryDiagnostics = {
  registryPhenomeCount: number;
  relationshipEdgeCount: number;
  mappedEdgeCount: number;
  unmappedPhenomeLabels: string[];
  labelsInEdgesNotInRegistry: string[];
  edgesMissingTargetPhenome: number;
  edgesWithNullPhenomeId: Array<{ sourceNode: string; targetPhenome: string }>;
  duplicateRegistryNames: string[];
  orphanRegistryPhenomes: Array<{ id: string; name: string }>;
  reviewFlags: unknown[];
};

export type PhenomeRelationshipIndex = {
  meta: {
    version: number;
    generatedAt: string;
    source: string;
    registrySource?: string;
    registryVersion?: number;
    pmPageCount: number;
    pmPagesWithMappings: number;
    relationshipCount: number;
    mappedRelationshipCount?: number;
  };
  diagnostics?: PhenomeRegistryDiagnostics;
  relationships: PhenomeRelationshipRecord[];
  byPhenome: Record<string, string[]>;
  byPhenomeId?: Record<string, string[]>;
  fmRollups: Record<string, FmConnectedPhenomeRollup[]>;
};

export const phenomeRelationshipIndex = indexJson as PhenomeRelationshipIndex;

export const phenomeRegistry = registryJson as {
  meta: {
    version: number;
    provenanceSchemaVersion?: number;
    primaryTherapeuticAreaId?: string;
    description?: string;
    phenomeDevelopment?: string;
    benchmarkedFrameworks?: Array<{ id: string; name: string; role?: string; note?: string }>;
  };
  therapeuticAreas: TherapeuticAreaEntry[];
  phenomes: PhenomeRegistryEntry[];
  reviewFlags?: unknown[];
};

export const phenomeRelationships = phenomeRelationshipIndex.relationships;

/** All PM source nodes linked to a phenome (case-insensitive match on label). */
export function getPmNodesForPhenome(targetPhenome: string): string[] {
  const needle = targetPhenome.trim().toLowerCase();
  const exact = phenomeRelationshipIndex.byPhenome[targetPhenome];
  if (exact) return [...exact];
  const match = Object.entries(phenomeRelationshipIndex.byPhenome).find(
    ([label]) => label.toLowerCase() === needle,
  );
  return match ? [...match[1]] : [];
}

/** PM nodes linked by stable phenome registry ID. */
export function getPmNodesForPhenomeId(phenomeId: string): string[] {
  return [...(phenomeRelationshipIndex.byPhenomeId?.[phenomeId] ?? [])];
}

/** Full relationship rows for a phenome — supports reciprocal phenome → PM links. */
export function getRelationshipsForPhenome(targetPhenome: string): PhenomeRelationshipRecord[] {
  const needle = targetPhenome.trim().toLowerCase();
  return phenomeRelationships.filter((r) => r.targetPhenome.toLowerCase() === needle);
}

export function getRelationshipsForPhenomeId(phenomeId: string): PhenomeRelationshipRecord[] {
  return phenomeRelationships.filter((r) => r.targetPhenomeId === phenomeId);
}

/** Connected phenome roll-up for an FM (graph / phenome pages — not FM MDX §2). */
export function getFmConnectedPhenomeRollup(parentFm: string): FmConnectedPhenomeRollup[] {
  return phenomeRelationshipIndex.fmRollups[parentFm] ?? [];
}

/** Distinct phenome labels present in the index. */
export function listIndexedPhenomes(): string[] {
  return Object.keys(phenomeRelationshipIndex.byPhenome).sort();
}

export function getPhenomeRegistryEntry(phenomeId: string): PhenomeRegistryEntry | undefined {
  return phenomeRegistry.phenomes.find((p) => p.id === phenomeId);
}

export function getTherapeuticAreaEntry(taId: string): TherapeuticAreaEntry | undefined {
  return phenomeRegistry.therapeuticAreas?.find((ta) => ta.id === taId);
}

export function listTherapeuticAreas(): TherapeuticAreaEntry[] {
  return [...(phenomeRegistry.therapeuticAreas || [])].sort((a, b) => a.id.localeCompare(b.id));
}
