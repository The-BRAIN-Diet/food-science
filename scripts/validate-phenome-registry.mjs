#!/usr/bin/env node
/**
 * Validate phenome registry and relationship ID mapping.
 * Usage: npm run phenome:validate
 */

import { validatePhenomeRegistry } from "./lib/phenome-registry.mjs";
import { validatePhenomeRelationshipIndexFresh } from "./lib/phenome-relationship-index.mjs";

const rootDir = process.cwd();

const fresh = validatePhenomeRelationshipIndexFresh(rootDir);
if (!fresh.ok) {
  console.error(`Phenome index: FAILED — ${fresh.message}`);
  process.exit(1);
}

const { ok, issues, warnings, diagnostics } = validatePhenomeRegistry(rootDir);

console.log("Phenome registry validation");
console.log(`  Registry phenomes: ${diagnostics.registryPhenomeCount}`);
console.log(`  Therapeutic areas: ${diagnostics.therapeuticAreaCount ?? 0}`);
console.log(`  Relationship edges: ${diagnostics.relationshipEdgeCount}`);
console.log(`  Edges with targetPhenomeId: ${diagnostics.mappedEdgeCount}`);

if (diagnostics.unmappedPhenomeLabels.length > 0) {
  console.log(`  Unmapped labels: ${diagnostics.unmappedPhenomeLabels.join("; ")}`);
}
if (diagnostics.orphanRegistryPhenomes.length > 0) {
  console.log(
    `  Orphan registry phenomes: ${diagnostics.orphanRegistryPhenomes.map((p) => p.id).join(", ")}`,
  );
}
if (diagnostics.reviewFlags?.length > 0) {
  console.log(`  Review flags in registry: ${diagnostics.reviewFlags.length}`);
}

if (!ok) {
  console.log("  Registry validation: FAILED");
  for (const issue of issues) {
    console.log(`    - [${issue.code}] ${issue.message}`);
  }
  process.exit(1);
}

for (const w of warnings) {
  console.log(`    WARN [${w.code}] ${w.message}`);
}

console.log("  Registry validation: passed");
process.exit(0);
