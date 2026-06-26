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
