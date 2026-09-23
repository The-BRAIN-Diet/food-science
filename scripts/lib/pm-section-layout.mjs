/**
 * PM page section layout.
 *
 * The canonical PM reader journey is:
 *
 *   1 Mission & Overview → 2 Primary Biological Effects → 3 Levers →
 *   4 Mechanistic Basis (4.1 Scientific Findings) → 5 Phenome Connections →
 *   6 BRS Pathways and Connections → 7 Scoreable Inputs → 8 References
 *
 * Most PM pages still carry the legacy order, in which Phenome Connections is
 * §3, Levers §4 and Mechanistic Basis §5. Both layouts are valid while the
 * repository migrates, so generators and validators must derive section numbers
 * from the page rather than hard-coding them.
 *
 * Only §3, §4 and §5 differ between the two layouts; §1, §2 and §6–§8 are fixed.
 *
 * @see system/pm-canonical-section-order.md
 */

export const PM_LAYOUT_CANONICAL = "canonical";
export const PM_LAYOUT_LEGACY = "legacy";

const NUMBERS = {
  [PM_LAYOUT_CANONICAL]: { levers: 3, mechanisticBasis: 4, phenome: 5 },
  [PM_LAYOUT_LEGACY]: { phenome: 3, levers: 4, mechanisticBasis: 5 },
};

/** Canonical layout is identified by Levers at §3. */
export function detectPmLayout(content) {
  return /^##\s+3\.\s+Levers\s*$/m.test(String(content || ""))
    ? PM_LAYOUT_CANONICAL
    : PM_LAYOUT_LEGACY;
}

/**
 * Section numbers for a PM page.
 * @returns {{layout: string, levers: number, mechanisticBasis: number, phenome: number, findingsSection: string}}
 */
export function pmSectionNumbers(content) {
  const layout = detectPmLayout(content);
  const n = NUMBERS[layout];
  return { layout, ...n, findingsSection: `${n.mechanisticBasis}.1` };
}

/** Expected `## N. Title` order for the detected layout, excluding trailing sections. */
export function expectedPmCoreOrder(layout, { phenomeTitle, primaryEffectsTitle }) {
  if (layout === PM_LAYOUT_CANONICAL) {
    return [null, primaryEffectsTitle, "Levers", "Mechanistic Basis", phenomeTitle];
  }
  return [null, primaryEffectsTitle, phenomeTitle, "Levers", "Mechanistic Basis"];
}
