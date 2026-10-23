import React from 'react';
import clsx from 'clsx';
import {
  evidenceConfidenceAccessibleLabel,
  LEGACY_CONFIDENCE_LEVELS,
  resolveEvidenceConfidence,
  SEC_DISPLAY_LEVELS,
} from './secDisplay.mjs';
import styles from './styles.module.css';

/**
 * Presentation only. Governance determines the confidence state. This component
 * does not score directness, bias protection, precision or replication.
 */
export const EVIDENCE_CONFIDENCE_LEVELS = LEGACY_CONFIDENCE_LEVELS;

export type EvidenceConfidenceLevel = (typeof LEGACY_CONFIDENCE_LEVELS)[number];

export {SEC_DISPLAY_LEVELS};

export type EvidenceConfidenceIndicatorProps = {
  /** Raw SEC total, 1–8. Zero and any other value render as Not scored. */
  score?: number | null;
  /**
   * Adjudicated cap or downgrade. When passed, it is the displayed state and
   * the raw score is not used, including when the decision is unscored.
   */
  adjustedScore?: number | null;
  /** Legacy four-level display. It is not converted into an SEC number. */
  level?: EvidenceConfidenceLevel;
  className?: string;
  /** Prefix used in the accessible label only; never rendered visually. */
  srPrefix?: string;
};

function Segment({active}: {active: boolean}) {
  return <span className={clsx(styles.segment, active && styles.segmentActive)} />;
}

export default function EvidenceConfidenceIndicator({
  score,
  adjustedScore,
  level,
  className,
  srPrefix = 'Evidence confidence',
}: EvidenceConfidenceIndicatorProps): React.ReactElement {
  const state = resolveEvidenceConfidence({score, adjustedScore, level});
  const accessibleLabel = evidenceConfidenceAccessibleLabel(state, srPrefix);

  const marks = state.grouped ? (
    <span className={styles.blocks} aria-hidden="true">
      {Array.from({length: 4}, (_, block) => (
        <span key={block} className={styles.block}>
          <Segment active={block * 2 < state.activeSegments} />
          <Segment active={block * 2 + 1 < state.activeSegments} />
        </span>
      ))}
    </span>
  ) : (
    <span className={styles.segments} aria-hidden="true">
      {Array.from({length: 4}, (_, index) => (
        <Segment key={index} active={index < state.activeSegments} />
      ))}
    </span>
  );

  return (
    <span
      className={clsx(styles.indicator, state.familyClass && styles[state.familyClass], className)}
      role="img"
      aria-label={accessibleLabel}
      data-sec-mode={state.mode}
      data-sec-score={state.score ?? ''}
    >
      {marks}
      <span className={styles.label} aria-hidden="true">
        {state.readout}
      </span>
    </span>
  );
}
