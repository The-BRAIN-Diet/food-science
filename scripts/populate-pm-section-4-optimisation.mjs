#!/usr/bin/env node
/**
 * Roll out PM §4.2 Optimisation / §4.3 Lifestyle across all BRS PMs and SMs:
 * 1. Renumber legacy headings and reorder panels
 * 2. Reclassify dietary-pattern bullets from Lifestyle → Optimisation
 * 3. Populate Optimisation levers from dietary patterns + food Preparation/Synergies links
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { buildFoodContextIndex } from "./lib/food-context-index.mjs";
import { populatePmOptimisationLevers } from "./lib/pm-optimisation-populate.mjs";
import {
  enforcePmSection4LeverOrder,
  reclassifyLifestyleOptimisationBullets,
  transformPmSection4Levers,
} from "./lib/pm-section-4-levers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DOCS = path.join(ROOT, "docs/biological-targets");

function walkMechanismFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkMechanismFiles(full));
    else if (entry.isFile() && /-(pm|sm).*\.mdx$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function entityIdFromFrontMatter(data, filePath) {
  return data.pm_id || data.sm_id || path.basename(filePath, ".mdx").toUpperCase();
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  const files = walkMechanismFiles(DOCS);
  const foodIndex = buildFoodContextIndex(ROOT);
  let changedCount = 0;

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const pmId = entityIdFromFrontMatter(data, filePath);

    let next = content;
    let changed = false;

    const renumber = transformPmSection4Levers(next, { pmId });
    next = renumber.content;
    changed = changed || renumber.changed;

    const reclassify = reclassifyLifestyleOptimisationBullets(next);
    next = reclassify.content;
    changed = changed || reclassify.changed;

    const populate = populatePmOptimisationLevers(next, {
      foodIndex,
      pmId,
      fileSlug: path.basename(filePath, ".mdx"),
    });
    next = populate.content;
    changed = changed || populate.changed;

    const enforced = enforcePmSection4LeverOrder(next);
    next = enforced.content;
    changed = changed || enforced.changed;

    if (!changed) continue;

    changedCount += 1;
    const rel = path.relative(ROOT, filePath);
    console.log(dryRun ? `[dry-run] would update ${rel}` : `updated ${rel}`);

    if (!dryRun) {
      fs.writeFileSync(filePath, matter.stringify(next, data), "utf8");
    }
  }

  console.log(
    dryRun
      ? `Dry run complete — ${changedCount} file(s) would change.`
      : `Populate complete — ${changedCount} file(s) updated.`,
  );
}

main();
