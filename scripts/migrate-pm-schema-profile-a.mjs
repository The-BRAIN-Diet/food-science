#!/usr/bin/env node
/**
 * Migrate Profile A extended PM pages to the consolidated schema:
 * §1 Definition → §2 Functional Role → §3 Phenome → §4 Levers → §5 MB → §6 BRS → §7 Scoreable → §8 References
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { parseNumberedSections } from "./lib/mechanism-page-validation.mjs";

function walkPmFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkPmFiles(full));
    else if (entry.isFile() && /-pm.*\.mdx$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DOCS = path.join(ROOT, "docs/biological-targets");

const PHENOME_TITLE = "Target Functional Outcome / Phenome";
const INTERVENTION_HEADING = /^##\s+\d+\.\s+Intervention (Summary|Breakdown)\s*$/m;
const LEVERS_HEADING = /^##\s+4\.\s+Levers\s*$/m;

function findSectionBody(content, sections, index) {
  const section = sections[index];
  if (!section) return null;
  const start = content.indexOf(section.line);
  const next = sections[index + 1];
  const end = next ? content.indexOf(next.line, start + 1) : content.length;
  return content.slice(start, end).trimEnd();
}

function stripMajorHeading(block) {
  return block.replace(/^##\s+\d+\.\s+[^\n]+\n+/, "").trimEnd();
}

function extractDietarySubsections(dietaryBlock, oldLevel) {
  const body = stripMajorHeading(dietaryBlock);
  const parts = {};
  const re = new RegExp(`^###\\s+${oldLevel}\\.(\\d+)\\s+(.+?)\\s*$`, "gm");
  const matches = [...body.matchAll(re)];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const subStart = m.index;
    const subEnd = matches[i + 1]?.index ?? body.length;
    const subBody = body.slice(subStart, subEnd).trimEnd();
    const title = m[2].trim();
    const subContent = subBody.replace(/^###\s+\d+\.\d+\s+[^\n]+\n+/, "").trimEnd();
    parts[title] = subContent;
  }
  return parts;
}

function extractLifestyleInner(lifestyleBlock) {
  const body = stripMajorHeading(lifestyleBlock);
  const detailsMatch = body.match(
    /<details>\s*\n<summary><strong>(?:Lifestyle|4\.2 Lifestyle Levers)<\/strong><\/summary>\s*\n([\s\S]*?)\n<\/details>/,
  );
  if (detailsMatch) return detailsMatch[1].trimEnd();
  return body.trimEnd();
}

function extractInterventionDominance(content, frontMatterDominance) {
  const interventionMatch = content.match(INTERVENTION_HEADING);
  if (interventionMatch?.index !== undefined) {
    const start = interventionMatch.index;
    const after = content.slice(start);
    const next = after.slice(1).search(/^##\s+\d+\.\s+(?!\d)/m);
    const block = next === -1 ? after : after.slice(0, 1 + next);
    const dominanceMatch = block.match(/\*\*Intervention Dominance:\*\*\s*(.+)/);
    if (dominanceMatch) return dominanceMatch[1].trim();
  }
  const leversMatch = content.match(LEVERS_HEADING);
  if (leversMatch?.index !== undefined) {
    const after = content.slice(leversMatch.index);
    const next = after.slice(1).search(/^##\s+\d+\.\s+(?!\d)/m);
    const block = next === -1 ? after : after.slice(0, 1 + next);
    const dominanceMatch = block.match(/\*\*Intervention Dominance:\*\*\s*(.+)/);
    if (dominanceMatch) return dominanceMatch[1].trim();
  }
  return frontMatterDominance ? String(frontMatterDominance).trim() : null;
}

function buildInterventionProfileBlock(dominance) {
  if (!dominance) return "";
  return `### Intervention Profile\n\n**Intervention Dominance:** ${dominance}\n`;
}

function buildLeversSection(dietaryBlock, lifestyleBlock, oldDietaryLevel, interventionDominance) {
  const subs = extractDietarySubsections(dietaryBlock, oldDietaryLevel);
  const direct = subs["Direct Dietary Levers"] ?? "";
  const cofactors = subs["Cofactors and Supporting Inputs"] ?? "";
  const kcs =
    subs["KCs (Key Constraints)"] ??
    subs[Object.keys(subs).find((k) => /KCs/i.test(k)) ?? ""] ??
    "";
  const lifestyle = extractLifestyleInner(lifestyleBlock);

  const chunks = ["## 4. Levers", ""];

  const profile = buildInterventionProfileBlock(interventionDominance);
  if (profile) {
    chunks.push(profile, "");
  }

  const dietaryParts = [
    ["4.1.1 Direct Dietary Levers", direct],
    ["4.1.2 Cofactors and Supporting Inputs", cofactors],
    ["4.1.3 KCs (Key Constraints)", kcs],
  ].filter(([, c]) => c.trim().length > 0);

  if (dietaryParts.length > 0) {
    chunks.push("<details>", "<summary><strong>4.1 Dietary Levers</strong></summary>", "");
    for (const [label, c] of dietaryParts) {
      chunks.push("<details>", `<summary><strong>${label}</strong></summary>`, "", c, "", "</details>", "");
    }
    chunks.push("</details>", "");
  }

  if (lifestyle.trim().length > 0) {
    chunks.push("<details>", "<summary><strong>4.3 Lifestyle Levers</strong></summary>", "", lifestyle, "", "</details>");
  }

  return chunks.join("\n").trimEnd();
}

function removeSubstanceNutrientSignalsRow(block) {
  return block.replace(/^\| Substance \/ Nutrient Signals \|[^\n]*\n/gm, "");
}

function renumberMajorHeading(block, newLevel, title) {
  return block.replace(/^##\s+\d+\.\s+[^\n]+/, `## ${newLevel}. ${title}`);
}

function isNewSchemaMigrated(sections) {
  if (sections.length < 4) return false;
  return (
    sections[0]?.title === "Definition" &&
    sections[1]?.title === "Functional Role" &&
    sections[2]?.title === PHENOME_TITLE &&
    sections[3]?.title === "Levers"
  );
}

function isExtendedProfile(sections, content) {
  return (
    sections.some(
      (s) =>
        s.title === "Intervention Summary" ||
        s.title === "Intervention Breakdown" ||
        /^Dietary Levers/.test(s.title),
    ) ||
    INTERVENTION_HEADING.test(content) ||
    LEVERS_HEADING.test(content)
  );
}

function isCompactProfileB(sections) {
  return sections.some((s) => s.title.startsWith("Underlying Mechanisms"));
}

function fixInterventionDominanceInLevers(content, dominance) {
  if (!dominance || !LEVERS_HEADING.test(content)) return content;
  return content.replace(
    /(\*\*Intervention Dominance:\*\*)\s*.+/,
    `$1 ${String(dominance).trim()}`,
  );
}

function ensureInterventionProfileInLevers(content, dominance) {
  if (!dominance || !LEVERS_HEADING.test(content)) return content;
  if (/^##\s+4\.\s+Levers[\s\S]*?###\s+Intervention Profile/m.test(content)) return content;
  return content.replace(
    /^##\s+4\.\s+Levers\n+/m,
    `## 4. Levers\n\n${buildInterventionProfileBlock(dominance)}\n`,
  );
}

function migrateExtendedProfile(content, frontMatterDominance) {
  const sections = parseNumberedSections(content);
  const alreadyMigrated = isNewSchemaMigrated(sections);

  if (alreadyMigrated) {
    let patched = ensureInterventionProfileInLevers(
      content,
      frontMatterDominance ? String(frontMatterDominance).trim() : extractInterventionDominance(content, null),
    );
    patched = fixInterventionDominanceInLevers(patched, frontMatterDominance);
    return patched === content ? null : patched;
  }

  const preambleEnd = content.search(/^##\s+1\.\s+Definition\s*$/m);
  if (preambleEnd === -1) throw new Error("Missing ## 1. Definition");
  const preamble = content.slice(0, preambleEnd).trimEnd();

  const findIdx = (pred) => sections.findIndex((s) => pred(s.title));

  const defIdx = findIdx((t) => t === "Definition");
  const phenomeIdx = findIdx((t) => t === PHENOME_TITLE);
  const frIdx = findIdx((t) => t === "Functional Role");
  const mbIdx = findIdx((t) => t.startsWith("Mechanistic Basis"));
  const brsIdx = findIdx((t) => t === "BRS Pathways and Connections");
  const dietIdx = findIdx((t) => t.startsWith("Dietary Levers"));
  const lifeIdx = findIdx((t) => t.startsWith("Lifestyle Levers"));
  const scoreIdx = findIdx((t) => /Scoreable Inputs/i.test(t));
  const refIdx = findIdx((t) => t.startsWith("References"));

  if ([defIdx, phenomeIdx, frIdx, mbIdx, brsIdx, dietIdx, lifeIdx].some((i) => i === -1)) {
    throw new Error("Missing required extended-profile sections");
  }

  const definition = findSectionBody(content, sections, defIdx);
  const phenome = findSectionBody(content, sections, phenomeIdx);
  const functionalRole = findSectionBody(content, sections, frIdx);
  const mechanistic = findSectionBody(content, sections, mbIdx);
  const brs = findSectionBody(content, sections, brsIdx);
  const dietary = findSectionBody(content, sections, dietIdx);
  const lifestyle = findSectionBody(content, sections, lifeIdx);

  const interventionDominance = frontMatterDominance
    ? String(frontMatterDominance).trim()
    : extractInterventionDominance(content, null);
  const oldDietaryLevel = sections[dietIdx].level;
  const levers = buildLeversSection(dietary, lifestyle, oldDietaryLevel, interventionDominance);

  let scoreable = scoreIdx === -1 ? null : findSectionBody(content, sections, scoreIdx);
  if (scoreable) {
    scoreable = removeSubstanceNutrientSignalsRow(scoreable);
    scoreable = renumberMajorHeading(
      scoreable,
      7,
      scoreable.match(/^##\s+\d+\.\s+(.+)/)?.[1] ?? "Scoreable Inputs & Modulation Signals",
    );
  }

  let references = refIdx === -1 ? null : findSectionBody(content, sections, refIdx);
  if (references) {
    references = renumberMajorHeading(references, scoreable ? 8 : 7, "References");
  }

  const frRenumbered = renumberMajorHeading(functionalRole, 2, "Functional Role");
  const phenomeRenumbered = renumberMajorHeading(phenome, 3, PHENOME_TITLE);
  const mbRenumbered = renumberMajorHeading(
    mechanistic,
    5,
    mechanistic.match(/^##\s+\d+\.\s+(.+)/)?.[1] ?? "Mechanistic Basis",
  );
  const brsRenumbered = renumberMajorHeading(brs, 6, "BRS Pathways and Connections");

  const parts = [
    preamble,
    "",
    definition,
    "",
    frRenumbered,
    "",
    phenomeRenumbered,
    "",
    levers,
    "",
    mbRenumbered,
    "",
    brsRenumbered,
  ];

  if (scoreable) parts.push("", scoreable);
  if (references) parts.push("", references);

  return `${parts.join("\n").trimEnd()}\n`;
}

function migrateCompactProfileB(content) {
  const sections = parseNumberedSections(content);
  const phenomeIdx = sections.findIndex((s) => s.title === PHENOME_TITLE);
  const frIdx = sections.findIndex((s) => s.title === "Functional Role");
  if (phenomeIdx === -1 || frIdx === -1) return null;
  if (sections[1]?.title === "Functional Role" && sections[2]?.title === PHENOME_TITLE) {
    return null;
  }
  if (sections[1]?.title !== PHENOME_TITLE || sections[2]?.title !== "Functional Role") {
    return null;
  }

  const phenome = findSectionBody(content, sections, phenomeIdx);
  const functionalRole = findSectionBody(content, sections, frIdx);
  const frRenumbered = renumberMajorHeading(functionalRole, 2, "Functional Role");
  const phenomeRenumbered = renumberMajorHeading(phenome, 3, PHENOME_TITLE);

  const phenomeStart = content.indexOf(phenome);
  const frEnd = content.indexOf(sections[frIdx + 1]?.line ?? "", content.indexOf(functionalRole));
  const before = content.slice(0, phenomeStart);
  const after = frEnd === -1 ? "" : content.slice(frEnd);

  return `${before}${frRenumbered}\n\n${phenomeRenumbered}\n${after}`.replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

function migrateFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const sections = parseNumberedSections(content);

  let migrated;
  if (isCompactProfileB(sections)) {
    migrated = migrateCompactProfileB(content);
  } else if (isExtendedProfile(sections, content)) {
    migrated = migrateExtendedProfile(content, data.intervention_dominance);
  } else {
    return { filePath, status: "skipped", reason: "unrecognized profile" };
  }

  if (!migrated || migrated === content) {
    return { filePath, status: "skipped", reason: "no changes" };
  }

  const rebuilt = matter.stringify(migrated, data);
  fs.writeFileSync(filePath, rebuilt, "utf8");
  return { filePath, status: "migrated" };
}

const files = walkPmFiles(DOCS).sort();
const results = { migrated: [], skipped: [], errors: [] };

for (const filePath of files) {
  try {
    const result = migrateFile(filePath);
    if (result.status === "migrated") results.migrated.push(path.relative(ROOT, filePath));
    else results.skipped.push({ file: path.relative(ROOT, filePath), reason: result.reason });
  } catch (err) {
    results.errors.push({ file: path.relative(ROOT, filePath), error: err.message });
  }
}

console.log(`PM schema migration complete`);
console.log(`  migrated: ${results.migrated.length}`);
console.log(`  skipped:  ${results.skipped.length}`);
console.log(`  errors:   ${results.errors.length}`);
if (results.migrated.length) {
  console.log("\nMigrated:");
  for (const f of results.migrated) console.log(`  - ${f}`);
}
if (results.errors.length) {
  console.log("\nErrors:");
  for (const e of results.errors) console.log(`  - ${e.file}: ${e.error}`);
}

process.exit(results.errors.length > 0 ? 1 : 0);
