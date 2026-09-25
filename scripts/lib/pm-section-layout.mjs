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
 * @see system/primary-mechanism-schema.md
 */

export const PM_LAYOUT_CANONICAL = "canonical";
export const PM_LAYOUT_LEGACY = "legacy";

/** Canonical §3.1 terminology for newly authored or recomputed PMs. */
export const PM_DIETARY_REQUIREMENTS_HEADINGS = Object.freeze({
  parent: "Dietary Requirements",
  directDerived: "Direct and/or Derived Dietary Requirements",
  cofactorsSubstrates: "Cofactors and Substrates",
  keyConstraints: "Key Constraints",
});

/** Accepted only for backward compatibility with PMs not yet recomputed. */
export const PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS = Object.freeze({
  parent: "Dietary Levers",
  directDerived: "Direct Dietary Levers",
  cofactorsSubstrates: "Cofactors and Supporting Inputs",
  keyConstraints: "KCs (Key Constraints)",
});

function titleEquals(actual, expected) {
  return String(actual || "").trim() === expected;
}

export function isDietaryRequirementsParentTitle(title) {
  const value = String(title || "").trim();
  return (
    titleEquals(value, PM_DIETARY_REQUIREMENTS_HEADINGS.parent) ||
    titleEquals(value, PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.parent)
  );
}

export function isDirectDerivedDietaryTitle(title) {
  const value = String(title || "").trim();
  return (
    titleEquals(value, PM_DIETARY_REQUIREMENTS_HEADINGS.directDerived) ||
    titleEquals(value, PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.directDerived)
  );
}

export function isCofactorsSubstratesTitle(title) {
  const value = String(title || "").trim();
  return (
    titleEquals(value, PM_DIETARY_REQUIREMENTS_HEADINGS.cofactorsSubstrates) ||
    titleEquals(value, PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.cofactorsSubstrates)
  );
}

export function isKeyConstraintsDietaryTitle(title) {
  const value = String(title || "").trim();
  return (
    titleEquals(value, PM_DIETARY_REQUIREMENTS_HEADINGS.keyConstraints) ||
    titleEquals(value, PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.keyConstraints) ||
    /^KCs\b/i.test(value)
  );
}

function numberedDietaryTitles(title) {
  return [`3.1 ${title}`, `4.1 ${title}`, `3.1.1 ${title}`, `4.1.1 ${title}`, `3.1.2 ${title}`, `4.1.2 ${title}`, `3.1.3 ${title}`, `4.1.3 ${title}`];
}

/** First in-document occurrence of a canonical or legacy §3.1/§4.1 parent heading. */
export function findDietaryRequirementsSectionStart(content) {
  const needles = [
    ...numberedDietaryTitles(PM_DIETARY_REQUIREMENTS_HEADINGS.parent).slice(0, 2),
    ...numberedDietaryTitles(PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.parent).slice(0, 2),
  ];
  let best = -1;
  for (const needle of needles) {
    const idx = String(content || "").indexOf(needle);
    if (idx >= 0 && (best < 0 || idx < best)) best = idx;
  }
  return best;
}

export const PM_DIETARY_DIRECT_PANEL_TITLES = Object.freeze([
  `3.1.1 ${PM_DIETARY_REQUIREMENTS_HEADINGS.directDerived}`,
  `4.1.1 ${PM_DIETARY_REQUIREMENTS_HEADINGS.directDerived}`,
  `3.1.1 ${PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.directDerived}`,
  `4.1.1 ${PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.directDerived}`,
]);

export const PM_DIETARY_COFACTOR_PANEL_TITLES = Object.freeze([
  `3.1.2 ${PM_DIETARY_REQUIREMENTS_HEADINGS.cofactorsSubstrates}`,
  `4.1.2 ${PM_DIETARY_REQUIREMENTS_HEADINGS.cofactorsSubstrates}`,
  `3.1.2 ${PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.cofactorsSubstrates}`,
  `4.1.2 ${PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.cofactorsSubstrates}`,
]);

export const PM_DIETARY_KC_PANEL_TITLES = Object.freeze([
  `3.1.3 ${PM_DIETARY_REQUIREMENTS_HEADINGS.keyConstraints}`,
  `4.1.3 ${PM_DIETARY_REQUIREMENTS_HEADINGS.keyConstraints}`,
  `3.1.3 ${PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.keyConstraints}`,
  `4.1.3 ${PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.keyConstraints}`,
]);

export function firstMatchingPanel(content, titles, extractors) {
  for (const title of titles) {
    for (const extract of extractors) {
      const found = extract(content, title);
      if (String(found || "").trim()) return found;
    }
  }
  return "";
}

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
