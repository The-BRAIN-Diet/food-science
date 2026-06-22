#!/usr/bin/env node
/**
 * Populate PM §5.1 Evidence Highlights from BRS hub ADHD dropdown evidence.
 * Uses the same dropdown structure as PM §3 Phenome Connections (BRS-X canonical).
 *
 * Usage:
 *   node scripts/populate-pm-evidence-highlights.mjs --brs BRS4
 *   node scripts/populate-pm-evidence-highlights.mjs --brs BRS4 --force
 *   node scripts/populate-pm-evidence-highlights.mjs --audit --brs BRS4
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";
import { getPmEvidenceMap } from "./lib/pm-evidence-highlights.mjs";
import {
  normalizeEvidenceConfig,
  renderEvidenceHighlightsSection,
} from "./lib/evidence-highlights-render.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs() {
  const args = process.argv.slice(2);
  const brsIdx = args.indexOf("--brs");
  return {
    brs: brsIdx === -1 ? null : args[brsIdx + 1]?.toUpperCase(),
    dryRun: args.includes("--dry-run"),
    audit: args.includes("--audit"),
    force: args.includes("--force"),
  };
}

function hasEvidenceSection(content) {
  return /^### 5\.1 Evidence Highlights/m.test(content);
}

function buildEvidenceBlock(config) {
  const entries = normalizeEvidenceConfig(config);
  return renderEvidenceHighlightsSection({
    heading: "### 5.1 Evidence Highlights",
    intro: config.intro,
    entries,
  });
}

function insertEvidenceSection(content, block) {
  if (hasEvidenceSection(content)) return content;
  const anchor = /^## 6\. BRS Pathways and Connections/m;
  if (!anchor.test(content)) {
    throw new Error("Missing ## 6. BRS Pathways and Connections anchor");
  }
  return content.replace(anchor, `${block}\n\n## 6. BRS Pathways and Connections`);
}

function mergeReferences(data, content, extraRefs = []) {
  if (!extraRefs?.length) return { data, content };

  const existing = new Set((data.references || []).map((r) => String(r).trim()));
  const sectionRefs = [...content.matchAll(/^- \[[^\]]+\]\([^)]+\)\s*$/gm)].map((m) => m[0].trim());
  for (const r of sectionRefs) existing.add(r);

  const toAdd = extraRefs.filter((r) => !existing.has(r.trim()));
  if (!toAdd.length) return { data, content };

  const newData = { ...data, references: [...(data.references || []), ...toAdd] };

  const refSection = content.match(/^## 8\. References\s*\n([\s\S]*)$/m);
  if (!refSection) return { data: newData, content };

  const mergedBody = `${refSection[1].trimEnd()}\n${toAdd.map((r) => `- ${r.replace(/^- /, "")}`).join("\n")}\n`;
  const newContent = content.replace(
    /^## 8\. References\s*\n[\s\S]*$/m,
    `## 8. References\n\n${mergedBody.trimEnd()}\n`,
  );
  return { data: newData, content: newContent };
}

function pmMatchesBrs(data, brs) {
  const id = String(data.pm_id || data.parent_brs || "");
  return id.startsWith(brs);
}

function runAudit(files) {
  const missing = [];
  const present = [];
  for (const f of files) {
    const { data, content } = readMechanismPage(f);
    const rel = path.relative(root, f);
    if (hasEvidenceSection(content)) present.push(rel);
    else missing.push({ rel, id: data.pm_id });
  }
  console.log(`PM §5.1 present: ${present.length}`);
  console.log(`PM §5.1 missing: ${missing.length}`);
  for (const m of missing) console.log(`  ${m.id}: ${m.rel}`);
}

function resolveEvidenceConfig(evidenceMap, { pmId, filePath }) {
  const base = path.basename(filePath, path.extname(filePath));
  return evidenceMap[base] || evidenceMap[pmId] || null;
}

function main() {
  const { brs, dryRun, audit, force } = parseArgs();
  if (!brs) {
    console.error("Usage: --brs BRS4 [--dry-run] [--audit] [--force]");
    process.exit(1);
  }

  const evidenceMap = getPmEvidenceMap(brs);
  const pmFiles = listMechanismMdxFiles(root, "pm").filter((f) => {
    const { data } = readMechanismPage(f);
    return pmMatchesBrs(data, brs);
  });

  if (audit) {
    runAudit(pmFiles);
    return;
  }

  if (!Object.keys(evidenceMap).length) {
    console.error(`No evidence map configured for ${brs}`);
    process.exit(1);
  }

  let updated = 0;
  let skipped = 0;
  const errors = [];

  for (const filePath of pmFiles) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const pmId = data.pm_id;
    const config = resolveEvidenceConfig(evidenceMap, { pmId, filePath });

    if (!config) {
      skipped++;
      console.log(`skip (no map): ${pmId}`);
      continue;
    }

    if (hasEvidenceSection(content) && !force) {
      skipped++;
      console.log(`skip (exists): ${pmId}`);
      continue;
    }

    try {
      let newContent =
        hasEvidenceSection(content) && force
          ? content.replace(/^### 5\.1 Evidence Highlights[\s\S]*?(?=\n## 6\. BRS)/m, "")
          : content;

      const block = buildEvidenceBlock(config);
      newContent = insertEvidenceSection(newContent, block);
      const merged = mergeReferences(data, newContent, config.extraRefs || []);
      const rebuilt = matter.stringify(merged.content, merged.data, { lineWidth: 9999 });

      if (rebuilt === raw) {
        skipped++;
        continue;
      }

      if (!dryRun) fs.writeFileSync(filePath, rebuilt, "utf8");
      updated++;
      console.log(`${dryRun ? "would update" : "updated"}: ${pmId}`);
    } catch (err) {
      errors.push({ pmId, error: err.message });
    }
  }

  console.log(`\nDone. updated=${updated} skipped=${skipped} errors=${errors.length}`);
  if (errors.length) {
    for (const e of errors) console.log(`  ${e.pmId}: ${e.error}`);
    process.exit(1);
  }
}

main();
