/**
 * Cross-BRS integration evidence library.
 * Canonical source: brs-cross-integration-evidence.json
 * Used by manuscript generator, hub pages, and translational content.
 */
import data from "./brs-cross-integration-evidence.json" with { type: "json" };

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

export default data;
