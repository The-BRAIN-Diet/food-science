import {secLevelForScore} from '../EvidenceConfidenceIndicator/secDisplay.mjs';
import {secAssessmentStatusErrors} from './assessmentAudit.mjs';

export const readerAssessmentLabels = Object.freeze({
  'not-scored': 'Not scored',
  conditional: 'Conditional estimate',
  'codex-provisional': 'Provisionally assessed',
  'scientifically-reviewed': 'Scientifically reviewed',
});

export function assessmentPresentation(record) {
  const status = record.assessmentStatus || 'not-scored';
  const valid = secAssessmentStatusErrors(record).length === 0;
  const effectiveStatus = valid ? status : 'not-scored';
  const score = effectiveStatus === 'not-scored' ? null : effectiveStatus === 'conditional' ? record.conditional?.adjustedScore : record.adjustedScore;
  const level = secLevelForScore(score);
  const humanReview = effectiveStatus === 'scientifically-reviewed' ? record.humanReview : null;
  return {
    status: effectiveStatus,
    statusLabel: readerAssessmentLabels[effectiveStatus],
    shortId: String(record.findingId).replace(/^PM\d+-F/, 'SF'),
    title: record.findingId === 'PM9-F1' ? 'GAD cofactor regulation' : record.title || 'Example finding',
    score: level ? score : null,
    readout: level ? `${score}/8 · ${level.label}` : score === 0 ? '0/8 · Assessed zero' : 'Not scored',
    incomplete: effectiveStatus === 'not-scored',
    date: record.lastEvidenceAssessmentDate || null,
    humanReview,
  };
}

export function evidenceReviewPresentation(page) {
  if (page?.review_status === 'unreviewed') return 'Unreviewed';
  if (page?.review_status === 'in_review') return 'In review';
  if (['reviewed', 'expert_reviewed'].includes(page?.review_status)) return 'Reviewed';
  return 'Review status not recorded';
}

export function correctionPresentation(page) {
  if (!page || (!Array.isArray(page.corrections) && !Array.isArray(page.issues))) return 'Status unavailable';
  const rows = [...(page.corrections || []), ...(page.issues || [])];
  if (!rows.length) return 'No corrections recorded';
  if (rows.some(row => ['pending', 'accepted'].includes(row.correction_status))) return 'Corrections pending';
  if (rows.every(row => ['applied', 'superseded', 'resolved'].includes(row.correction_status))) return 'Corrections resolved';
  return 'Status unavailable';
}
