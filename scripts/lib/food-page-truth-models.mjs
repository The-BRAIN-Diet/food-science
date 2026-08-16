/**
 * Canonical names for the three distinct food-page models.
 * Generated summaries MUST use these names and must not label composition
 * and provenance classes as the “Three Sources of Truth.”
 */
export const THREE_SOURCES_OF_TRUTH = {
  name: "Three Sources of Truth",
  source: "system/food-page-model.md",
  layers: ["Overview", "Database nutrition table", "Substances list"],
}

export const COMPOSITION_AND_PROVENANCE_CLASSES = {
  name: "Composition and provenance classes",
  source: "system/food-nutrition-schema.md",
  classes: ["Standard compositional", "Extended analytical", "Ontology admission"],
}

export const CONTENT_BOUNDARY_MODEL = {
  name: "Intrinsic / Mechanism / Strategy",
  source: "system/food-page-model.md",
  layers: ["Intrinsic food truth", "Mechanism truth", "Strategy truth"],
}

export function summarizeFoodPageModels() {
  return {
    threeSourcesOfTruth: {
      name: THREE_SOURCES_OF_TRUTH.name,
      layers: [...THREE_SOURCES_OF_TRUTH.layers],
      role: "Canonical coordinated representations on each food page.",
    },
    compositionAndProvenanceClasses: {
      name: COMPOSITION_AND_PROVENANCE_CLASSES.name,
      classes: [...COMPOSITION_AND_PROVENANCE_CLASSES.classes],
      role: "How composition values are sourced within and across the page layers. Not the Three Sources of Truth.",
    },
    contentBoundary: {
      name: CONTENT_BOUNDARY_MODEL.name,
      layers: [...CONTENT_BOUNDARY_MODEL.layers],
      role: "Where a claim belongs. Does not determine food-page admission.",
    },
  }
}

export function assertsProvenanceClassesAreNotThreeSourcesOfTruth(summary = summarizeFoodPageModels()) {
  const provenanceName = summary.compositionAndProvenanceClasses?.name
  const pageModelName = summary.threeSourcesOfTruth?.name
  if (provenanceName === pageModelName) {
    throw new Error("Composition and provenance classes must not share the Three Sources of Truth name.")
  }
  if (String(provenanceName).toLowerCase().includes("three sources of truth")) {
    throw new Error("Provenance classes must not be labelled the Three Sources of Truth.")
  }
  if (summary.threeSourcesOfTruth?.layers?.join("|") !== THREE_SOURCES_OF_TRUTH.layers.join("|")) {
    throw new Error("Generated summaries must keep the canonical Three Sources of Truth layers.")
  }
  return true
}
