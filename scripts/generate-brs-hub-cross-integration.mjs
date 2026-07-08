#!/usr/bin/env node
/**
 * Patch BRS1–BRS6 hub pages with Cross-BRS Integration and Mechanistic integration evidence.
 * @see system/brs-hub-levers-schema.md
 * @see scripts/data/brs-cross-integration-evidence.json
 */
import { CORE_BRS_HUBS } from "./lib/brs-hub-levers.mjs";
import {
  HUB_PAGES,
  patchHubCrossIntegration,
  renderHubCrossIntegrationHtml,
} from "./lib/brs-hub-cross-integration.mjs";
import { getAllIntegrationCitationKeys } from "./data/brs-cross-integration-evidence.mjs";

const ROOT = process.cwd();
let patched = 0;

for (const brsId of CORE_BRS_HUBS) {
  const hubPath = HUB_PAGES[brsId];
  if (!hubPath) {
    console.warn(`Skip ${brsId}: no hub path`);
    continue;
  }
  const html = renderHubCrossIntegrationHtml(brsId);
  patchHubCrossIntegration(hubPath, html, ROOT);
  const relationshipCount = html.split("brs-fm-hub-item").length - 1;
  patched++;
  console.log(`${brsId}: ${relationshipCount} cross-BRS relationships patched → ${hubPath}`);
}

console.log(`\nPatched ${patched} hub pages`);
console.log(`Integration library cites ${getAllIntegrationCitationKeys().length} unique bibliography keys`);
