export type PhenomeEvidenceConfidence = 'low' | 'low-medium' | 'medium' | 'high';

const CONFIDENCE_LABELS: Record<PhenomeEvidenceConfidence, string> = {
  low: 'Low',
  'low-medium': 'Low–Medium',
  medium: 'Medium',
  high: 'High',
};

export function formatPhenomeEvidenceConfidence(value: string | undefined): string | null {
  const key = String(value || '').trim() as PhenomeEvidenceConfidence;
  return CONFIDENCE_LABELS[key] ?? null;
}

/** Compact per-mechanism scores for registry mechanism lists (matches PM §3 dimensions). */
export function formatMechanismConfidenceMeta(
  relationshipType: string,
  biologyConfidence: string | undefined,
  evidenceConfidence: string | undefined,
): string {
  const biology = formatPhenomeEvidenceConfidence(biologyConfidence) ?? 'Not scored';
  const evidence = formatPhenomeEvidenceConfidence(evidenceConfidence) ?? 'Not scored';
  return `${relationshipType} · Biology → Phenome: ${biology} · Evidence: ${evidence}`;
}
