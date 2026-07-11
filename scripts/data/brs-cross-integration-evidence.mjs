/**
 * Cross-BRS Dependencies evidence library.
 * Canonical source: brs-cross-integration-evidence.json
 * Used by manuscript generator, hub pages, and translational content.
 */
import data from "./brs-cross-integration-evidence.json" with { type: "json" };

const INTEGRATION_SECTIONS = [
  { key: "biological_contribution", title: "Biological Contribution" },
  { key: "systems_significance", title: "Systems Significance" },
  { key: "integrated_regulatory_capacity", title: "Integrated Regulatory Capacity" },
];

function integrationSectionText(integration, key) {
  return integration?.[key] ?? "";
}

/** Compose flat narrative for manuscript export (legacy summary field). */
export function composeIntegrationSummary(integration) {
  if (integration.summary) return integration.summary;
  const parts = INTEGRATION_SECTIONS.map(({ key }) => integrationSectionText(integration, key)).filter(Boolean);
  return parts.join(" ");
}

export const BRS_CROSS_INTEGRATION_EVIDENCE = data;

/** @param {string} integrationId e.g. "BRS4->BRS1" */
export function getIntegration(integrationId) {
  return data.integrations[integrationId] ?? null;
}

/** @param {string} brsId e.g. "BRS1" */
export function getIntegrationsForBrs(brsId) {
  const ids = data.brs_integration_map[brsId] ?? [];
  return ids.map((id) => ({ id, ...data.integrations[id] }));
}

/** Flat list of unique citation keys across all integrations. */
export function getAllIntegrationCitationKeys() {
  const keys = new Set();
  for (const integration of Object.values(data.integrations)) {
    for (const item of integration.evidence) {
      if (item.citation_key) keys.add(item.citation_key);
    }
  }
  return [...keys];
}

/** Short framework intro for Biological Regulatory Systems overview. */
export function getCrossBrsFrameworkIntro() {
  return data.cross_brs_framework_intro ?? "";
}

/** BRS-specific high-level Cross-BRS section intro for hub pages. */
export function getHubCrossBrsSummary(brsId) {
  return data.hub_cross_brs_summaries?.[brsId] ?? getCrossBrsFrameworkIntro();
}

export { INTEGRATION_SECTIONS };

export default data;
