import React from 'react';
import { formatPhenomeEvidenceConfidence } from './confidence';
import styles from './styles.module.css';

type Props = {
  evidenceConfidence?: string;
  evidenceConfidenceNote?: string;
  variant?: 'detail' | 'compact' | 'inline';
};

export default function PhenomeEvidenceConfidence({
  evidenceConfidence,
  evidenceConfidenceNote,
  variant = 'detail',
}: Props): React.ReactElement | null {
  const label = formatPhenomeEvidenceConfidence(evidenceConfidence);
  if (!label) return null;

  if (variant === 'compact') {
    return <span className={styles.evidenceConfidenceBadge}>{label}</span>;
  }

  const blockClass =
    variant === 'inline' ? styles.evidenceConfidenceInline : styles.evidenceConfidenceBlock;

  return (
    <div className={blockClass}>
      <p className={styles.evidenceConfidenceLine}>
        <strong>Phenome Evidence Confidence:</strong> {label}
      </p>
      {variant !== 'inline' ? (
        <p className={styles.evidenceConfidenceDisclaimer}>
          Registry-level score for this phenome&apos;s foundational evidence stack (construct,
          biology→phenome, and nutrition→biology layers). Independent of Biology → Phenome Confidence
          and Evidence Confidence on individual mechanism pages.
        </p>
      ) : null}
      {evidenceConfidenceNote ? (
        <p className={styles.evidenceConfidenceNote}>{evidenceConfidenceNote}</p>
      ) : null}
    </div>
  );
}
