#!/usr/bin/env node
/**
 * Merge PH001–PH015 registry provenance + foundational evidence enrichment.
 * @see scripts/data/ph001-ph015-registry-enrichment.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { PH001_PH015_REGISTRY_ENRICHMENT } from "./data/ph001-ph015-registry-enrichment.mjs";

const ROOT = process.cwd();
const REGISTRY_PATH = path.join(ROOT, "src/data/phenome-registry.json");

const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
let applied = 0;
let skipped = 0;

for (const phenome of registry.phenomes) {
  const enrichment = PH001_PH015_REGISTRY_ENRICHMENT[phenome.id];
  if (!enrichment) continue;

  if (phenome.evidence_confidence && !process.argv.includes("--force")) {
    console.warn(`Skip ${phenome.id}: already has evidence_confidence (use --force to overwrite)`);
    skipped++;
    continue;
  }

  Object.assign(phenome, enrichment);
  applied++;
  console.log(`Enriched ${phenome.id} — ${phenome.name}`);
}

fs.writeFileSync(REGISTRY_PATH, `${JSON.stringify(registry, null, 2)}\n`);
console.log(`\nDone: ${applied} enriched, ${skipped} skipped → ${REGISTRY_PATH}`);
