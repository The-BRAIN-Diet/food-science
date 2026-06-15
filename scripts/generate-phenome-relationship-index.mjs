#!/usr/bin/env node
/**
 * Generate src/data/phenome-relationships.generated.json from PM phenome_relationships front matter.
 *
 * Usage:
 *   npm run phenome:index
 */

import path from "node:path";
import { writePhenomeRelationshipIndex } from "./lib/phenome-relationship-index.mjs";

const rootDir = process.cwd();
const { outPath, index } = writePhenomeRelationshipIndex(rootDir);

console.log(`Phenome relationship index written: ${path.relative(rootDir, outPath)}`);
console.log(`  PM pages scanned: ${index.meta.pmPageCount}`);
console.log(`  PM pages with mappings: ${index.meta.pmPagesWithMappings}`);
console.log(`  Relationship records: ${index.meta.relationshipCount}`);
console.log(`  Distinct phenomes: ${Object.keys(index.byPhenome).length}`);
console.log(`  FM roll-up groups: ${Object.keys(index.fmRollups).length}`);
console.log(`  Edges mapped to registry IDs: ${index.meta.mappedRelationshipCount ?? "?"}/${index.meta.relationshipCount}`);
if (index.diagnostics?.unmappedPhenomeLabels?.length) {
  console.log(`  WARN unmapped phenome labels: ${index.diagnostics.unmappedPhenomeLabels.join("; ")}`);
}
if (index.diagnostics?.orphanRegistryPhenomes?.length) {
  console.log(
    `  WARN orphan registry phenomes: ${index.diagnostics.orphanRegistryPhenomes.map((p) => p.id).join(", ")}`,
  );
}
