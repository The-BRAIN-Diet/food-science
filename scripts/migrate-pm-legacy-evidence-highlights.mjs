#!/usr/bin/env node
/**
 * Migrate PM §5.1 Evidence Highlights from legacy #### (Heading) hub panels
 * to phenome-style dropdown entries (Confidence / Evidence Level / Rationale).
 *
 * Usage:
 *   node scripts/migrate-pm-legacy-evidence-highlights.mjs
 *   node scripts/migrate-pm-legacy-evidence-highlights.mjs --brs BRS2
 *   node scripts/migrate-pm-legacy-evidence-highlights.mjs --brs BRS2 --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";
import {
  extractLegacyPmEvidenceEntries,
  renderEvidenceHighlightsSection,
} from "./lib/evidence-highlights-render.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs() {
  const args = process.argv.slice(2);
  const brsIdx = args.indexOf("--brs");
  return {
    brs: brsIdx === -1 ? "BRS2" : args[brsIdx + 1]?.toUpperCase(),
    dryRun: args.includes("--dry-run"),
  };
}

function pmMatchesBrs(data, brs) {
  const id = String(data.pm_id || data.parent_brs || "");
  return id.startsWith(brs);
}

function parseReferenceNoteKeys(references = []) {
  return (references || [])
    .map((line) => {
      const m = String(line).match(/\[([^\]]+)\]\([^#]+#([^)]+)\)/);
      if (!m) return null;
      const label = m[1].includes(" — ") ? m[1].split(" — ")[0].trim() : m[1].trim();
      return { citation_key: m[2], label };
    })
    .filter(Boolean);
}

function extractSection51(content) {
  const match = content.match(/^### 5\.1 Evidence Highlights[\s\S]*?(?=\n## \d+\. )/m);
  return match ? match[0] : null;
}

function isLegacyEvidenceSection(sectionText) {
  return !/- \*\*Confidence:\*\*/.test(sectionText);
}

function extractIntro(sectionText) {
  const match = sectionText.match(/#### Introduction\/Summary\s*\n\n([\s\S]*?)(?=\n<|$)/);
  return match ? match[1].trim() : "";
}

function replaceSection51(content, newBlock) {
  return content.replace(/^### 5\.1 Evidence Highlights[\s\S]*?(?=\n## \d+\. )/m, newBlock);
}

function main() {
  const { brs, dryRun } = parseArgs();
  const pmFiles = listMechanismMdxFiles(root, "pm").filter((f) => {
    const { data } = readMechanismPage(f);
    return pmMatchesBrs(data, brs);
  });

  let updated = 0;
  let skipped = 0;
  const errors = [];

  for (const filePath of pmFiles) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const pmId = data.pm_id;
    const section = extractSection51(content);

    if (!section) {
      skipped++;
      console.log(`skip (no §5.1): ${pmId}`);
      continue;
    }

    if (!isLegacyEvidenceSection(section)) {
      skipped++;
      console.log(`skip (already phenome-style): ${pmId}`);
      continue;
    }

    const intro = extractIntro(section);
    const referenceNoteKeys = parseReferenceNoteKeys(data.references);
    const entries = extractLegacyPmEvidenceEntries(section, referenceNoteKeys);

    if (!entries.length) {
      skipped++;
      console.log(`skip (no legacy entries parsed): ${pmId}`);
      continue;
    }

    try {
      const block = renderEvidenceHighlightsSection({
        heading: "### 5.1 Evidence Highlights",
        intro: intro || "Mechanism-qualifying evidence highlights for this PM.",
        entries,
      });
      const newContent = replaceSection51(content, block);
      const rebuilt = matter.stringify(newContent, data, { lineWidth: 9999 });

      if (rebuilt === raw) {
        skipped++;
        continue;
      }

      if (!dryRun) fs.writeFileSync(filePath, rebuilt, "utf8");
      updated++;
      console.log(`${dryRun ? "would update" : "updated"}: ${pmId} (${entries.length} entries)`);
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
