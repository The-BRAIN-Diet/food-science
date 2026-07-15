#!/usr/bin/env node
/**
 * Migrate PM §4 lever headings to canonical structure:
 * 4.1 Dietary → 4.2 Optimisation → 4.3 Lifestyle
 *
 * PM6 merges weekly oily-fish frequency bullet into Optimisation and drops empty Lifestyle.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { transformPmSection4Levers, enforcePmSection4LeverOrder } from "./lib/pm-section-4-levers.mjs";

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
  let changedCount = 0;

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const pmId = entityIdFromFrontMatter(data, filePath);
    const { content: afterRenumber, changed: renumbered } = transformPmSection4Levers(content, { pmId });
    const { content: nextContent, changed: enforced } = enforcePmSection4LeverOrder(afterRenumber);
    const changed = renumbered || enforced;
    if (!changed) continue;

    changedCount += 1;
    const rel = path.relative(ROOT, filePath);
    console.log(dryRun ? `[dry-run] would update ${rel}` : `updated ${rel}`);

    if (!dryRun) {
      const rebuilt = matter.stringify(nextContent, data);
      fs.writeFileSync(filePath, rebuilt, "utf8");
    }
  }

  console.log(
    dryRun
      ? `Dry run complete — ${changedCount} file(s) would change.`
      : `Migration complete — ${changedCount} file(s) updated.`,
  );
}

main();
