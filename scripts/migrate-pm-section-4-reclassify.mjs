#!/usr/bin/env node
/**
 * Move dietary frequency / delivery bullets from §4.3 Lifestyle → §4.2 Optimisation.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { reclassifyLifestyleOptimisationBullets, enforcePmSection4LeverOrder } from "./lib/pm-section-4-levers.mjs";

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

function main() {
  const dryRun = process.argv.includes("--dry-run");
  const files = walkMechanismFiles(DOCS);
  let changedCount = 0;

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const { content: afterReclassify, changed: reclassified } =
      reclassifyLifestyleOptimisationBullets(content);
    const { content: nextContent, changed: enforced } =
      enforcePmSection4LeverOrder(afterReclassify);
    const changed = reclassified || enforced;
    if (!changed) continue;

    changedCount += 1;
    const rel = path.relative(ROOT, filePath);
    console.log(dryRun ? `[dry-run] would update ${rel}` : `updated ${rel}`);

    if (!dryRun) {
      fs.writeFileSync(filePath, matter.stringify(nextContent, data), "utf8");
    }
  }

  console.log(
    dryRun
      ? `Dry run complete — ${changedCount} file(s) would change.`
      : `Reclassification complete — ${changedCount} file(s) updated.`,
  );
}

main();
