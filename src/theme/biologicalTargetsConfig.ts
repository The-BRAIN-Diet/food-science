/**
 * BRAIN Biological Regulatory Systems (BRS) — shared config.
 *
 * ECS and Circadian Rhythm act as modulators across all six BRS.
 * Substances, foods, and recipes tagged with these modulator tags are
 * integrated into every BRS section in therapeutic-area matrices and
 * food spreadsheets so their cross-cutting role is visible.
 */
export const BRS_MODULATOR_TAGS: readonly string[] = [
  "Endocannabinoid System",
  "Circadian Rhythm",
] as const

export type BRSModulatorTag = (typeof BRS_MODULATOR_TAGS)[number]
