#!/usr/bin/env node
/**
 * PM §3.2 / §4.2 derived qualified hub interventions (read-only presentation).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildPmSopDerivedInterventionsIndex } from "./lib/hub-optimisation-interventions.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "src/data/pm-sop-derived-interventions.generated.json");

const index = buildPmSopDerivedInterventionsIndex(ROOT);
fs.writeFileSync(OUT, `${JSON.stringify(index, null, 2)}\n`, "utf8");
console.log(`Wrote ${path.relative(ROOT, OUT)} (${Object.keys(index.byPmId).length} PMs with derived SOP).`);
