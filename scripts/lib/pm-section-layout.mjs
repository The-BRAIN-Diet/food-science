/**
 * PM page section layout.
 *
 *   1 Mission & Overview → 2 Primary Biological Effects → 3 Levers →
 *   4 Mechanistic Basis (4.1 Scientific Findings) → 5 BRS Pathways and Connections →
 *   7 Phenome Connections → 8 References
 *
 * §6 is unused (Scoreable Inputs removed). Phenome Connections is always §7.
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

const PM_DEFAULTS = Object.freeze({
  levers: 3,
  mechanisticBasis: 4,
  pathways: 5,
  phenome: 7,
  references: 8,
});

/** All current PMs use Levers at §3. Kept so existing callers do not break. */
export function detectPmLayout(_content) {
  return PM_LAYOUT_CANONICAL;
}

function headingNumber(content, titlePattern) {
  const match = String(content || "").match(new RegExp(`^##\\s+(\\d+)\\.\\s+${titlePattern}\\s*$`, "m"));
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Section numbers for a PM or SM page, read from the published headings.
 * PM default: Phenome §7, References §8. SM pages still use Phenome §3 / Pathways §6.
 */
export function pmSectionNumbers(content) {
  const levers = headingNumber(content, "Levers") ?? PM_DEFAULTS.levers;
  const mechanisticBasis = headingNumber(content, "Mechanistic Basis(?: \\([^)]+\\))?") ?? PM_DEFAULTS.mechanisticBasis;
  const pathways = headingNumber(content, "BRS Pathways and Connections") ?? PM_DEFAULTS.pathways;
  const phenome = headingNumber(content, "Phenome Connections") ?? PM_DEFAULTS.phenome;
  const references = headingNumber(content, "References") ?? PM_DEFAULTS.references;
  return {
    layout: PM_LAYOUT_CANONICAL,
    levers,
    mechanisticBasis,
    pathways,
    phenome,
    references,
    findingsSection: `${mechanisticBasis}.1`,
  };
}

/** Expected `## N. Title` order for core sections before Pathways / Phenome. */
export function expectedPmCoreOrder(_layout, { phenomeTitle, primaryEffectsTitle }) {
  return [null, primaryEffectsTitle, "Levers", "Mechanistic Basis", "BRS Pathways and Connections", phenomeTitle];
}
