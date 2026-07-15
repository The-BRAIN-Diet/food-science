#!/usr/bin/env node
/**
 * Migrate legacy SM pages (standalone §7 Dietary / §8 Lifestyle) to Profile A extended:
 * §1 Mission → §2 PBE → §3 Phenome → §4 Levers → §5 Mechanistic → §6 BRS Pathways → §7 Scoreable → §8 References
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import {
  extractHubItemBlock,
  extractHubPanelBullets,
} from "./lib/pm-section-4-levers.mjs";
import {
  listMechanismMdxFiles,
  parseNumberedSections,
  readMechanismPage,
} from "./lib/mechanism-page-validation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const BREAKDOWN_TO_DOMINANCE = {
  "Food-State Dominant": "Diet-Dominant",
  "Food-State Leaning": "Diet-Supported",
  "Mixed Modulation": "Diet/Lifestyle-Combined",
  "Behavioural/Lifestyle Leaning": "Lifestyle-Supported",
  "Behavioural/Lifestyle Dominant": "Lifestyle-Dominant",
};

const OPTIMISATION_HINT =
  /meal-pattern lever|←|matters more than|repeated (weekly|daily)|distributed protein|LNAA-aware|meal pairing|meal regularity|glycaemic|protein-rich meals|protein distribution|stable dietary patterns|phospholipid-bound|habitual intake frequency/i;

function isLegacySmProfile(content) {
  return (
    /^##\s+1\.\s+Mission & Overview\s*$/m.test(content) &&
    /^##\s+7\.\s+Dietary Levers\s*$/m.test(content) &&
    !/^##\s+4\.\s+Levers\s*$/m.test(content)
  );
}

function findSectionBody(content, sections, index) {
  const section = sections[index];
  if (!section) return "";
  const start = content.indexOf(section.line);
  const next = sections[index + 1];
  const end = next ? content.indexOf(next.line, start + 1) : content.length;
  return content.slice(start, end).trimEnd();
}

function stripMajorHeading(block) {
  return block.replace(/^##\s+\d+\.\s+[^\n]+\n+/, "").trimEnd();
}

function renumberMajorHeading(block, level, title) {
  return block.replace(/^##\s+\d+\.\s+[^\n]+/, `## ${level}. ${title}`);
}

function extractUnderlyingSub(underBlock, subNum) {
  const m = underBlock.match(
    new RegExp(`### 6\\.${subNum}\\s+[^\\n]+\\s*\\n([\\s\\S]*?)(?=\\n### |$)`),
  );
  return m ? m[1].trim() : "";
}

function splitDietaryBullets(bullets) {
  const direct = [];
  const optimisation = [];
  for (const bullet of bullets) {
    const text = bullet.replace(/^- /, "");
    if (text.includes("←")) {
      direct.push(bullet);
      continue;
    }
    if (/meal-pattern lever/i.test(text) || (OPTIMISATION_HINT.test(text) && !text.includes("←"))) {
      optimisation.push(bullet);
      continue;
    }
    if (OPTIMISATION_HINT.test(text)) {
      optimisation.push(bullet);
    } else {
      direct.push(bullet);
    }
  }
  return { direct, optimisation };
}

function buildHubBlock(heading, innerContent) {
  const trimmed = (innerContent || "").trim();
  const body = trimmed ? `\n\n${trimmed}\n\n` : "\n\n";
  return `<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>${heading}</strong>
</button>
<div class="brs-fm-hub-panel" hidden>${body}</div>
</div>
</div>`;
}

function buildLeversSection({ dominance, directDietary, optimisation, cofactors, kcs, lifestyle }) {
  const dietaryInner = [
    buildHubBlock("4.1.1 Direct Dietary Levers", directDietary.join("\n")),
    buildHubBlock("4.1.2 Cofactors and Supporting Inputs", cofactors || "- None listed"),
    buildHubBlock("4.1.3 KCs (Key Constraints)", kcs || "- None listed"),
  ].join("\n\n\n");

  const parts = [
    "## 4. Levers",
    "",
    "### Intervention Profile",
    "",
    `**Intervention Dominance:** ${dominance}`,
    "",
    buildHubBlock("4.1 Dietary Levers", dietaryInner),
  ];
  if (optimisation.length) {
    parts.push("", buildHubBlock("4.2 Optimisation Levers", optimisation.join("\n")));
  }
  parts.push("", buildHubBlock("4.3 Lifestyle Levers", lifestyle));
  return parts.join("\n");
}

function stripOrphanBlocksAfterReferences(content) {
  const refMatch = content.match(/^##\s+8\.\s+References\s*$/m);
  if (!refMatch || refMatch.index === undefined) return content;
  const afterRefs = content.slice(refMatch.index);
  const refsEnd = afterRefs.search(/\n\n+<div class="brs-fm-hub-item"/);
  if (refsEnd === -1) return content;
  const orphanStart = refMatch.index + refsEnd;
  return content.slice(0, orphanStart).trimEnd() + "\n";
}

function dominanceFromData(data) {
  if (data.intervention_dominance) return String(data.intervention_dominance).trim();
  const breakdown = data.intervention_breakdown ? String(data.intervention_breakdown).trim() : "";
  return BREAKDOWN_TO_DOMINANCE[breakdown] || "Diet/Lifestyle-Combined";
}

function migrateSm(filePath) {
  const { data, content } = readMechanismPage(filePath);
  if (!isLegacySmProfile(content)) return null;

  const sections = parseNumberedSections(content);
  const findIdx = (pred) => sections.findIndex((s) => pred(s.title));

  const preambleEnd = content.search(/^##\s+1\.\s+Mission & Overview\s*$/m);
  if (preambleEnd === -1) throw new Error("Missing ## 1. Mission & Overview");
  const preamble = content.slice(0, preambleEnd).trimEnd();

  const missionIdx = findIdx((t) => t.startsWith("Mission"));
  const phenomeIdx = findIdx((t) => t.startsWith("Phenome"));
  const pbeIdx = findIdx((t) => t.startsWith("Primary Biological Effects"));
  const mbIdx = findIdx((t) => t.startsWith("Mechanistic Basis"));
  const underIdx = findIdx((t) => t.startsWith("Underlying Mechanisms"));
  const dietIdx = findIdx((t) => t.startsWith("Dietary Levers"));
  const lifeIdx = findIdx((t) => t.startsWith("Lifestyle Levers"));
  const scoreIdx = findIdx((t) => /Scoreable Inputs/i.test(t));
  const refIdx = findIdx((t) => t.startsWith("References"));

  if ([missionIdx, phenomeIdx, pbeIdx, mbIdx, underIdx, dietIdx, lifeIdx, refIdx].some((i) => i === -1)) {
    throw new Error("Missing required legacy sections");
  }

  const mission = findSectionBody(content, sections, missionIdx);
  const phenome = renumberMajorHeading(
    findSectionBody(content, sections, phenomeIdx),
    3,
    "Phenome Connections",
  );
  const pbe = renumberMajorHeading(
    findSectionBody(content, sections, pbeIdx),
    2,
    "Primary Biological Effects",
  );
  const mechanistic = findSectionBody(content, sections, mbIdx);
  const underBlock = findSectionBody(content, sections, underIdx);
  const dietaryBlock = findSectionBody(content, sections, dietIdx);
  const lifestyleBlock = findSectionBody(content, sections, lifeIdx);
  const scoreable = scoreIdx === -1 ? null : findSectionBody(content, sections, scoreIdx);
  const references = findSectionBody(content, sections, refIdx);

  const cofactors = extractUnderlyingSub(underBlock, 1);
  const kcs = extractUnderlyingSub(underBlock, 2);
  const connectedPms = extractUnderlyingSub(underBlock, 3);
  const connectedFms = extractUnderlyingSub(underBlock, 4);
  const connectedBrs = extractUnderlyingSub(underBlock, 5) || "- None listed";

  const dietHub = extractHubItemBlock(dietaryBlock, "Diet");
  const lifeHub = extractHubItemBlock(lifestyleBlock, "Lifestyle");
  const dietBullets = dietHub ? extractHubPanelBullets(dietHub.block) : [];
  const lifeBullets = lifeHub ? extractHubPanelBullets(lifeHub.block) : [];
  const { direct, optimisation } = splitDietaryBullets(dietBullets);

  const dominance = dominanceFromData(data);
  const nextData = { ...data };
  if (!nextData.intervention_dominance) {
    nextData.intervention_dominance = dominance;
  }

  const levers = buildLeversSection({
    dominance: nextData.intervention_dominance,
    directDietary: direct,
    optimisation,
    cofactors,
    kcs,
    lifestyle: lifeBullets.join("\n") || "- None listed",
  });

  const mbRenumbered = mechanistic.replace(/^##\s+\d+\.\s+Mechanistic Basis/, "## 5. Mechanistic Basis");

  const connectedPrimary = [connectedPms, connectedFms].filter(Boolean).join("\n\n") || "- None listed";

  const brsSection = [
    "## 6. BRS Pathways and Connections",
    "",
    "### 6.1 BRS Pathways",
    "",
    "- None listed",
    "",
    "### 6.2 Connected BRS Mechanisms",
    "",
    connectedBrs,
    "",
    "### 6.3 Connected Primary Mechanisms",
    "",
    connectedPrimary,
  ].join("\n");

  let scoreableRenumbered = scoreable
    ? scoreable.replace(
        /^##\s+\d+\.\s+Scoreable Inputs & Modulation Signals/,
        "## 7. Scoreable Inputs & Modulation Signals",
      )
    : null;
  if (scoreableRenumbered) {
    scoreableRenumbered = scoreableRenumbered.replace(/\bsection 3\b/gi, "section 4");
    scoreableRenumbered = scoreableRenumbered.replace(/\b§3\b/g, "§4");
  }

  const refsRenumbered = references.replace(/^##\s+\d+\.\s+References/, "## 8. References");

  const parts = [
    preamble,
    "",
    mission,
    "",
    pbe,
    "",
    phenome,
    "",
    levers,
    "",
    mbRenumbered,
    "",
    brsSection,
  ];
  if (scoreableRenumbered) parts.push("", scoreableRenumbered);
  parts.push("", refsRenumbered);

  let body = `${parts.join("\n").trimEnd()}\n`;
  body = stripOrphanBlocksAfterReferences(body);

  return matter.stringify(body, nextData, { lineWidth: 9999 });
}

const dryRun = process.argv.includes("--dry-run");
let changed = 0;
const errors = [];

for (const filePath of listMechanismMdxFiles(root, "sm")) {
  try {
    const original = fs.readFileSync(filePath, "utf8");
    const updated = migrateSm(filePath);
    if (updated && updated !== original) {
      const rel = path.relative(root, filePath);
      console.log(dryRun ? `[dry-run] would migrate ${rel}` : `migrated ${rel}`);
      if (!dryRun) fs.writeFileSync(filePath, updated);
      changed += 1;
    }
  } catch (err) {
    errors.push({ file: path.relative(root, filePath), error: err.message });
  }
}

console.log(`\nDone. ${changed} SM(s) ${dryRun ? "would be " : ""}migrated.`);
if (errors.length) {
  console.log("\nErrors:");
  for (const e of errors) console.log(`  - ${e.file}: ${e.error}`);
  process.exit(1);
}
