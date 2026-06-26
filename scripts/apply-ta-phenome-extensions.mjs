#!/usr/bin/env node
/**
 * Merge cross-TA anxiety/depression phenome extensions (PH016–PH018) into PM/FM pages.
 *
 * Usage:
 *   node scripts/apply-ta-phenome-extensions.mjs
 *   node scripts/apply-ta-phenome-extensions.mjs --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import { fileURLToPath } from "node:url";
import {
  TA_PM_PHENOME_EXTENSIONS,
  TA_FM_OUTCOME_EXTENSIONS,
} from "./data/ta-anxiety-depression-phenome-extensions.mjs";
import {
  mergePageReferencesWithPhenome,
  renderPmPhenomeSectionBody,
  renderFmOutcomeContextSectionBody,
  FM_OUTCOME_CONTEXT_MAX,
} from "./lib/phenome-relationships.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = process.argv.includes("--dry-run");

const PM_PHENOME_SECTION = /^## 3\. Phenome Connections[\s\S]*?(?=\n## 4\. )/m;
const FM_OUTCOME_SECTION = /^## 3\. Phenome Connections[\s\S]*?(?=\n## 4\. )/m;

function walkMdx(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkMdx(p, acc);
    else if (ent.name.endsWith(".mdx")) acc.push(p);
  }
  return acc;
}

function mergePmRelationships(existing, additions) {
  const byName = new Map(
    (existing || []).map((r) => [String(r.target_phenome || "").trim(), r]),
  );
  let changed = false;
  for (const row of additions) {
    const key = String(row.target_phenome || "").trim();
    if (!key || byName.has(key)) continue;
    byName.set(key, row);
    changed = true;
  }
  return { relationships: [...byName.values()], changed };
}

function mergeFmOutcomes(existing, additions) {
  const byName = new Map(
    (existing || []).map((r) => [String(r.outcome_name || "").trim(), r]),
  );
  let changed = false;
  for (const row of additions) {
    const key = String(row.outcome_name || "").trim();
    if (!key || byName.has(key)) continue;
    if (byName.size >= FM_OUTCOME_CONTEXT_MAX) {
      console.warn(`  skip FM outcome (max ${FM_OUTCOME_CONTEXT_MAX}): ${key}`);
      continue;
    }
    byName.set(key, row);
    changed = true;
  }
  return { outcomes: [...byName.values()], changed };
}

let pmUpdated = 0;
let fmUpdated = 0;

for (const filePath of walkMdx(path.join(root, "docs/biological-targets"))) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const rel = path.relative(root, filePath);

  if (data.pm_id && TA_PM_PHENOME_EXTENSIONS[data.pm_id]) {
    const { relationships, changed } = mergePmRelationships(
      data.phenome_relationships,
      TA_PM_PHENOME_EXTENSIONS[data.pm_id],
    );
    if (changed) {
      const nextData = { ...data, phenome_relationships: relationships };
      const phenomeBlock = renderPmPhenomeSectionBody(relationships, { sectionNum: 3 });
      let nextContent = content.replace(PM_PHENOME_SECTION, `${phenomeBlock.trimEnd()}\n\n`);
      const merged = mergePageReferencesWithPhenome(nextData, nextContent, "pm");
      const rebuilt = matter.stringify(merged.content, merged.data, { lineWidth: 9999 });
      if (!dryRun) fs.writeFileSync(filePath, rebuilt, "utf8");
      pmUpdated++;
      console.log(`${dryRun ? "would update" : "updated"} PM: ${data.pm_id} (${rel})`);
    }
  }

  if (data.fm_id && TA_FM_OUTCOME_EXTENSIONS[data.fm_id]) {
    const { outcomes, changed } = mergeFmOutcomes(
      data.functional_outcome_context,
      TA_FM_OUTCOME_EXTENSIONS[data.fm_id],
    );
    if (changed) {
      const nextData = { ...data, functional_outcome_context: outcomes };
      const outcomeBlock = renderFmOutcomeContextSectionBody(outcomes, { sectionNum: 3 });
      let nextContent = content.replace(FM_OUTCOME_SECTION, `${outcomeBlock.trimEnd()}\n\n`);
      const merged = mergePageReferencesWithPhenome(nextData, nextContent, "fm");
      const rebuilt = matter.stringify(merged.content, merged.data, { lineWidth: 9999 });
      if (!dryRun) fs.writeFileSync(filePath, rebuilt, "utf8");
      fmUpdated++;
      console.log(`${dryRun ? "would update" : "updated"} FM: ${data.fm_id} (${rel})`);
    }
  }
}

console.log(`\nDone. PM=${pmUpdated} FM=${fmUpdated}${dryRun ? " (dry-run)" : ""}`);

if (!dryRun && pmUpdated + fmUpdated > 0) {
  console.log("Running phenome:sync …");
  execSync("node scripts/migrate-phenome-section.mjs --sync", { cwd: root, stdio: "inherit" });
  console.log("Running phenome:index …");
  execSync("node scripts/generate-phenome-relationship-index.mjs", { cwd: root, stdio: "inherit" });
}
