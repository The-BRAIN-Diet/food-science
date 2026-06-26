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
        <strong>Evidence Confidence:</strong> {label}
      </p>
      <p className={styles.evidenceConfidenceDisclaimer}>
        Registry-level score for this phenome&apos;s foundational evidence stack — not Biology →
        Phenome Confidence on individual mechanism pages.
      </p>
      {evidenceConfidenceNote ? (
        <p className={styles.evidenceConfidenceNote}>{evidenceConfidenceNote}</p>
      ) : null}
    </div>
  );
}
