#!/usr/bin/env node
/**
 * Populate PM §3 phenome_relationships from curated BRS hub ADHD evidence maps.
 *
 * Usage:
 *   node scripts/populate-pm-phenome-relationships.mjs --brs BRS3
 *   node scripts/populate-pm-phenome-relationships.mjs --brs BRS3 --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { execSync } from "node:child_process";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";
import {
  getPmPhenomeMap,
  resolvePmPhenomeConfig,
} from "./lib/pm-phenome-relationships.mjs";
import {
  mergePageReferencesWithPhenome,
  renderPmPhenomeSectionBody,
} from "./lib/phenome-relationships.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs() {
  const args = process.argv.slice(2);
  const brsIdx = args.indexOf("--brs");
  return {
    brs: brsIdx === -1 ? null : args[brsIdx + 1]?.toUpperCase(),
    dryRun: args.includes("--dry-run"),
    force: args.includes("--force"),
    noSync: args.includes("--no-sync"),
  };
}

function pmMatchesBrs(data, brs) {
  const id = String(data.pm_id || data.parent_brs || "");
  return id.startsWith(brs) || String(data.parent_brs || "").startsWith(brs);
}

const PHENOME_SECTION = /^## 3\. Phenome Connections[\s\S]*?(?=\n## 4\. )/m;

function replacePhenomeSection(content, phenomeBlock) {
  if (PHENOME_SECTION.test(content)) {
    return content.replace(PHENOME_SECTION, `${phenomeBlock.trimEnd()}\n\n`);
  }
  throw new Error("Missing ## 3. Phenome Connections section");
}

function main() {
  const { brs, dryRun, force, noSync } = parseArgs();
  if (!brs) {
    console.error("Usage: --brs BRS3 [--dry-run] [--force] [--no-sync]");
    process.exit(1);
  }

  const phenomeMap = getPmPhenomeMap(brs);
  if (!Object.keys(phenomeMap).length) {
    console.error(`No phenome map configured for ${brs}`);
    process.exit(1);
  }

  const pmFiles = listMechanismMdxFiles(root, "pm").filter((f) => {
    const { data } = readMechanismPage(f);
    return pmMatchesBrs(data, brs);
  });

  let updated = 0;
  let skipped = 0;

  for (const filePath of pmFiles) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const rel = path.relative(root, filePath);
    const relationships = resolvePmPhenomeConfig(phenomeMap, { pmId: data.pm_id, filePath });

    if (!relationships?.length) {
      skipped++;
      console.log(`skip (no map): ${data.pm_id} (${rel})`);
      continue;
    }

    if (
      Array.isArray(data.phenome_relationships) &&
      data.phenome_relationships.length > 0 &&
      !force
    ) {
      skipped++;
      console.log(`skip (exists): ${data.pm_id}`);
      continue;
    }

    const nextData = { ...data, phenome_relationships: relationships };
    const phenomeBlock = renderPmPhenomeSectionBody(relationships, { sectionNum: 3 });
    let nextContent = replacePhenomeSection(content, phenomeBlock);
    const merged = mergePageReferencesWithPhenome(nextData, nextContent, "pm");
    const rebuilt = matter.stringify(merged.content, merged.data, { lineWidth: 9999 });

    if (rebuilt === raw) {
      skipped++;
      continue;
    }

    if (!dryRun) fs.writeFileSync(filePath, rebuilt, "utf8");
    updated++;
    console.log(`${dryRun ? "would update" : "updated"}: ${data.pm_id}`);
  }

  console.log(`\nDone. updated=${updated} skipped=${skipped}`);

  if (!dryRun && !noSync && updated > 0) {
    console.log("Regenerating phenome index…");
    execSync("npm run phenome:index", { cwd: root, stdio: "inherit" });
  }
}

main();
