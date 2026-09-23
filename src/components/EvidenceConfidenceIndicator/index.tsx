import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Presentation only. The component renders an already-determined confidence
 * state and never derives one from study count, design, references or
 * population — that belongs to the evidence methodology.
 */
export const EVIDENCE_CONFIDENCE_LEVELS = ['very-low', 'low', 'moderate', 'high'] as const;

export type EvidenceConfidenceLevel = (typeof EVIDENCE_CONFIDENCE_LEVELS)[number];

const TOTAL_SEGMENTS = 4;

const LEVEL_CONFIG: Record<
  EvidenceConfidenceLevel,
  { activeSegments: number; label: string; levelClass: string }
> = {
  'very-low': { activeSegments: 1, label: 'Very low', levelClass: styles.levelVeryLow },
  low: { activeSegments: 2, label: 'Low', levelClass: styles.levelLow },
  moderate: { activeSegments: 3, label: 'Moderate', levelClass: styles.levelModerate },
  high: { activeSegments: 4, label: 'High', levelClass: styles.levelHigh },
};

export type EvidenceConfidenceIndicatorProps = {
  level: EvidenceConfidenceLevel;
  className?: string;
  /** Prefix used in the accessible label only; never rendered visually. */
  srPrefix?: string;
};

export default function EvidenceConfidenceIndicator({
  level,
  className,
  srPrefix = 'Evidence confidence',
}: EvidenceConfidenceIndicatorProps): React.ReactElement | null {
  const config = LEVEL_CONFIG[level];
  if (!config) return null;

  const accessibleLabel = `${srPrefix}: ${config.label}, level ${config.activeSegments} of ${TOTAL_SEGMENTS}`;

  return (
    <span
      className={clsx(styles.indicator, config.levelClass, className)}
      role="img"
      aria-label={accessibleLabel}
    >
      <span className={styles.segments} aria-hidden="true">
        {Array.from({ length: TOTAL_SEGMENTS }, (_, index) => (
          <span
            key={index}
            className={clsx(styles.segment, index < config.activeSegments && styles.segmentActive)}
          />
        ))}
      </span>
      <span className={styles.label} aria-hidden="true">
        {config.label}
      </span>
    </span>
  );
}
