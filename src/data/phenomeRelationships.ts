/**
 * Phenome relationship index — generated from PM front matter.
 * Regenerate: npm run phenome:index
 */

import indexJson from "./phenome-relationships.generated.json";

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

export type PhenomeRelationshipIndex = {
  meta: {
    version: number;
    generatedAt: string;
    source: string;
    pmPageCount: number;
    pmPagesWithMappings: number;
    relationshipCount: number;
  };
  relationships: PhenomeRelationshipRecord[];
  byPhenome: Record<string, string[]>;
  fmRollups: Record<string, FmConnectedPhenomeRollup[]>;
};

export const phenomeRelationshipIndex = indexJson as PhenomeRelationshipIndex;

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

/** Full relationship rows for a phenome — supports reciprocal phenome → PM links. */
export function getRelationshipsForPhenome(targetPhenome: string): PhenomeRelationshipRecord[] {
  const needle = targetPhenome.trim().toLowerCase();
  return phenomeRelationships.filter((r) => r.targetPhenome.toLowerCase() === needle);
}

/** Connected phenome roll-up for an FM (graph / phenome pages — not FM MDX §2). */
export function getFmConnectedPhenomeRollup(parentFm: string): FmConnectedPhenomeRollup[] {
  return phenomeRelationshipIndex.fmRollups[parentFm] ?? [];
}

/** Distinct phenome labels present in the index. */
export function listIndexedPhenomes(): string[] {
  return Object.keys(phenomeRelationshipIndex.byPhenome).sort();
}
