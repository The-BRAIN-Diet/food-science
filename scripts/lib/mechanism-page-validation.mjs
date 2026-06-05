/**
 * FM / PM mechanism page validation (JS layer).
 * timing_specific is required ontology front matter; visible "## N. Timing Specific" body sections are forbidden.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isLegacyFoodToSubstanceLine } from "./substance-food-mapping.mjs";

export const TIMING_SPECIFIC_VALUES = new Set(["Yes", "No"]);

export const INTERVENTION_BREAKDOWN_VALUES = new Set([
  "Food-State Dominant",
  "Food-State Leaning",
  "Mixed Modulation",
  "Behavioural/Lifestyle Leaning",
  "Behavioural/Lifestyle Dominant",
]);

export const SM_CATEGORY_VALUES = new Set(["SM-SNP", "SM-PHEN", "SM-CROSS"]);

const TIMING_BODY_HEADING = /^##\s+\d+\.\s+Timing Specific\s*$/m;

export const SCOREABLE_SECTION_TITLE = "Scoreable Inputs & Modulation Signals";

const LEGACY_SCOREABLE_HEADING = /^##\s+\d+\.\s+Scoreable Food-State Inputs\s*$/m;
const SCOREABLE_SECTION_HEADING = /^##\s+(\d+)\.\s+Scoreable Inputs & Modulation Signals\s*$/m;

/** PM scoreable tables: food-state and preparation signals only (substances live in §6 Dietary Levers). */
export const REQUIRED_SCOREABLE_CATEGORY_GROUPS_PM = [
  ["Functional Property Potentials"],
  ["Realised Functional States"],
  ["Preparation Transformations"],
];

/** FM/SM scoreable tables: include substance or burden row in addition to PM-style rows. */
export const REQUIRED_SCOREABLE_CATEGORY_GROUPS_FM = [
  ...REQUIRED_SCOREABLE_CATEGORY_GROUPS_PM,
  ["Substance / Nutrient Signals", "Antagonistic Signals"],
];

/** @deprecated Use REQUIRED_SCOREABLE_CATEGORY_GROUPS_PM or _FM */
export const REQUIRED_SCOREABLE_CATEGORY_GROUPS = REQUIRED_SCOREABLE_CATEGORY_GROUPS_FM;

/** @deprecated Use REQUIRED_SCOREABLE_CATEGORY_GROUPS_PM or _FM */
export const REQUIRED_SCOREABLE_CATEGORIES = [
  "Functional Property Potentials",
  "Realised Functional States",
  "Substance / Nutrient Signals",
  "Preparation Transformations",
];

const FORBIDDEN_INTERVENTION_LABELS = [
  /temporal\s+leaning/i,
  /timing[- ]based/i,
  /temporal\s+modulation/i,
];

/** Must not appear in public FM / PM / KC / SM body copy (build gate). */
export const FORBIDDEN_PUBLIC_SPREADSHEET_PATTERNS = [
  { re: /\bspreadsheet(s)?\b/i, label: "spreadsheet" },
  { re: /\bprior sheet\b/i, label: "prior sheet" },
  { re: /\bColumn\s+[A-Z]\b/i, label: "spreadsheet column letter" },
];

function extractSectionBody(content, startPattern, endPattern) {
  const start = content.search(startPattern);
  if (start === -1) return null;
  const slice = content.slice(start);
  const end = slice.search(endPattern);
  return end === -1 ? slice : slice.slice(0, end);
}

function validateSubstanceFoodMappingSections(content, issues, { entityLabel, kind }) {
  if (kind === "kc") {
    const block = extractSectionBody(
      content,
      /### 3\. Supporting Inputs\/Substrates/,
      /\n### 4\. /,
    );
    if (!block) return;
    for (const line of block.split("\n")) {
      if (isLegacyFoodToSubstanceLine(line)) {
        pushIssue(
          issues,
          "legacy_food_to_substance",
          `${entityLabel}: §3 Supporting Inputs/Substrates must use substance ← food bullets (see system/substance-food-mapping-format.md)`,
        );
        return;
      }
      if (/Food sources \(examples\)/i.test(line)) {
        pushIssue(
          issues,
          "nested_food_sources_collapsible",
          `${entityLabel}: merge food examples into Dietary Levers / §3 using substance ← food format; remove nested Food sources block`,
        );
        return;
      }
    }
    return;
  }

  const dietary = extractSectionBody(content, /## \d+\. Dietary Levers/, /\n## \d+\. /);
  if (!dietary) return;
  if (/Food sources \(examples\)/i.test(dietary)) {
    pushIssue(
      issues,
      "nested_food_sources_collapsible",
      `${entityLabel}: Dietary Levers must not use nested Food sources (examples); use substance ← food in Direct Dietary Levers`,
    );
  }
  const directSection = dietary.match(
    /### \d+\.1 Direct Dietary Levers\s*\n([\s\S]*?)(?=\n### |\n## |$)/,
  )?.[1];
  const dietDetail = dietary.match(
    /<summary><strong>Diet<\/strong><\/summary>\s*\n([\s\S]*?)\n<\/details>/,
  )?.[1];
  const scan = directSection || dietDetail || dietary;
  for (const line of scan.split("\n")) {
    if (isLegacyFoodToSubstanceLine(line)) {
      pushIssue(
        issues,
        "legacy_food_to_substance",
        `${entityLabel}: Dietary Levers must use substance ← food bullets for substrate mapping (see system/substance-food-mapping-format.md)`,
      );
      return;
    }
  }
}

function validateNoPublicSpreadsheetMentions(content, issues, { entityLabel }) {
  for (const { re, label } of FORBIDDEN_PUBLIC_SPREADSHEET_PATTERNS) {
    if (re.test(content)) {
      pushIssue(
        issues,
        "forbidden_spreadsheet_mention",
        `${entityLabel}: remove public mention of "${label}" from page body (build gate)`,
      );
      break;
    }
  }
}

export function listMechanismMdxFiles(rootDir = process.cwd(), kind) {
  const base = path.join(rootDir, "docs/biological-targets");
  const out = [];
  if (!fs.existsSync(base)) return out;
  for (const brs of fs.readdirSync(base)) {
    const dir = path.join(base, brs, kind);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".mdx") || f.endsWith(".md")) out.push(path.join(dir, f));
    }
  }
  return out.sort();
}

export function readMechanismPage(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { raw, data, content };
}

function pushIssue(issues, code, message) {
  issues.push({ code, message });
}

function validateTimingSpecificFrontMatter(data, issues, { entityLabel }) {
  const v = data.timing_specific;
  if (v === undefined || v === null || String(v).trim() === "") {
    pushIssue(issues, "missing_timing_specific", `${entityLabel}: timing_specific is required in front matter`);
    return;
  }
  const s = String(v).trim();
  if (!TIMING_SPECIFIC_VALUES.has(s)) {
    pushIssue(
      issues,
      "invalid_timing_specific",
      `${entityLabel}: timing_specific must be "Yes" or "No" (got ${JSON.stringify(v)})`,
    );
  }
}

function validateNoVisibleTimingSection(content, issues, { entityLabel }) {
  if (TIMING_BODY_HEADING.test(content)) {
    pushIssue(
      issues,
      "forbidden_timing_body_section",
      `${entityLabel}: remove visible "## N. Timing Specific" body section; keep timing_specific in front matter only`,
    );
  }
}

function extractInterventionBreakdownBody(content) {
  const m = content.match(/^##\s+2\.\s+Intervention Breakdown\s*$/m);
  if (!m || m.index === undefined) return null;
  const start = m.index;
  const after = content.slice(start);
  const next = after.slice(1).search(NEXT_INTEGER_SECTION_HEADING);
  const end = next === -1 ? content.length : start + 1 + next;
  return content.slice(start, end);
}

function validateInterventionBreakdown(data, content, issues, { entityLabel, required }) {
  const fmValue = data.intervention_breakdown;
  if (required) {
    if (!fmValue || String(fmValue).trim() === "") {
      pushIssue(issues, "missing_intervention_breakdown", `${entityLabel}: intervention_breakdown is required in front matter`);
    } else if (!INTERVENTION_BREAKDOWN_VALUES.has(String(fmValue).trim())) {
      pushIssue(
        issues,
        "invalid_intervention_breakdown",
        `${entityLabel}: intervention_breakdown must be one of the five allowed semantic values`,
      );
    }
    if (!/^##\s+2\.\s+Intervention Breakdown\s*$/m.test(content)) {
      pushIssue(
        issues,
        "missing_intervention_breakdown_section",
        `${entityLabel}: published body must include "## 2. Intervention Breakdown" after Definition`,
      );
    }
  }

  const block = extractInterventionBreakdownBody(content);
  if (block) {
    for (const re of FORBIDDEN_INTERVENTION_LABELS) {
      if (re.test(block)) {
        pushIssue(
          issues,
          "forbidden_timing_intervention_label",
          `${entityLabel}: Intervention Breakdown must not use timing-as-modulation labels`,
        );
        break;
      }
    }
    if (fmValue && block.trim()) {
      const bodyVal = block
        .replace(/^##\s+2\.\s+Intervention Breakdown\s*/m, "")
        .trim()
        .split("\n")[0]
        ?.trim();
      if (bodyVal && bodyVal !== String(fmValue).trim()) {
        pushIssue(
          issues,
          "intervention_breakdown_mismatch",
          `${entityLabel}: "## 2. Intervention Breakdown" body value must match front matter intervention_breakdown`,
        );
      }
    }
  }
}

/** Integer `## N.` headings only (excludes decimal subsections such as `### 4.1`). */
export const NEXT_INTEGER_SECTION_HEADING = /^##\s+\d+\.\s+(?!\d)/m;

const LEGACY_EVIDENCE_HIGHLIGHTS_HEADING = /^##\s+(\d+)\.1\s+Evidence Highlights\s*$/;
const EVIDENCE_HIGHLIGHTS_HEADING = /^###\s+(\d+)\.1\s+Evidence Highlights\s*$/;

/** @returns {Array<{ type: "major", level: number, title: string, line: string }>} */
export function parseNumberedSections(content) {
  const sections = [];
  for (const line of content.split("\n")) {
    const m = line.match(/^##\s+(\d+)\.\s+(.+?)\s*$/);
    if (m) {
      sections.push({
        type: "major",
        level: parseInt(m[1], 10),
        title: m[2].trim(),
        line,
      });
    }
  }
  return sections;
}

function validateContiguousNumbering(sections, issues, { entityLabel }) {
  const major = sections.filter((s) => s.type === "major");
  if (major.length === 0) return;
  for (let i = 0; i < major.length; i++) {
    const expected = i + 1;
    if (major[i].level !== expected) {
      pushIssue(
        issues,
        "section_number_gap",
        `${entityLabel}: expected "## ${expected}. …" but found "${major[i].line}" (integer sections must be contiguous)`,
      );
      return;
    }
  }
}

function validateEvidenceHighlightsPlacement(content, sections, issues, { entityLabel }) {
  for (const line of content.split("\n")) {
    const legacy = line.match(LEGACY_EVIDENCE_HIGHLIGHTS_HEADING);
    if (legacy) {
      pushIssue(
        issues,
        "evidence_highlights_level",
        `${entityLabel}: use ### ${legacy[1]}.1 Evidence Highlights under ## ${legacy[1]}. Mechanistic Basis, not ##`,
      );
      return;
    }
  }

  const mechanistic = sections
    .filter((s) => s.type === "major")
    .find((s) => s.title.startsWith("Mechanistic Basis"));
  if (!mechanistic) return;

  const mbStart = content.indexOf(mechanistic.line);
  const nextMajor = sections
    .filter((s) => s.type === "major")
    .find((s) => s.level === mechanistic.level + 1);
  const mbEnd =
    nextMajor === undefined
      ? content.length
      : content.indexOf(nextMajor.line, mbStart + 1);
  const mbBlock = content.slice(mbStart, mbEnd);

  const evMatch = mbBlock.match(EVIDENCE_HIGHLIGHTS_HEADING);
  if (!evMatch) return;

  const evLevel = parseInt(evMatch[1], 10);
  if (evLevel !== mechanistic.level) {
    pushIssue(
      issues,
      "evidence_highlights_number",
      `${entityLabel}: Evidence Highlights section number must match Mechanistic Basis (e.g. ### 4.1 under ## 4. Mechanistic Basis)`,
    );
  }
}

/** FM synthesis contract: no intervention sections; §5 PMs + §6 Cross BRS Links. */
const FM_FORBIDDEN_BODY_SECTIONS = [
  "Dietary Levers",
  "Lifestyle Levers",
  "Scoreable Inputs & Modulation Signals",
  "Scoreable Food-State Inputs",
  "Underlying Mechanisms and Requirements",
  "Overarching Functional Mechanism",
];

function validateFmSynthesisContract(content, sections, issues, { entityLabel }) {
  for (const title of FM_FORBIDDEN_BODY_SECTIONS) {
    if (sections.some((s) => s.title === title || s.title.startsWith(title))) {
      pushIssue(
        issues,
        "fm_forbidden_section",
        `${entityLabel}: FM pages must not include "## N. ${title}" — use Primary Mechanisms (PMs) and Cross BRS Links instead; interventions belong on PM pages`,
      );
    }
  }
  if (/^### 5\.[1234]/m.test(content)) {
    pushIssue(
      issues,
      "fm_legacy_underlying_subsections",
      `${entityLabel}: remove legacy §5.x rollups; use ## 5. Primary Mechanisms (PMs) and ## 6. Cross BRS Links`,
    );
  }
  const pms = sections.find((s) => s.title.startsWith("Primary Mechanisms"));
  if (!pms) {
    pushIssue(issues, "fm_missing_pms", `${entityLabel}: FM pages must include ## 5. Primary Mechanisms (PMs)`);
  } else if (pms.level !== 5) {
    pushIssue(
      issues,
      "fm_pms_numbering",
      `${entityLabel}: Primary Mechanisms (PMs) must be ## 5. Primary Mechanisms (PMs)`,
    );
  }
  const brs = sections.find((s) => s.title.startsWith("Cross BRS Links"));
  if (!brs) {
    pushIssue(issues, "fm_missing_brs_links", `${entityLabel}: FM pages must include ## 6. Cross BRS Links`);
  } else if (brs.level !== 6) {
    pushIssue(issues, "fm_brs_links_numbering", `${entityLabel}: Cross BRS Links must be ## 6. Cross BRS Links`);
  }
  const mechanistic = sections.find((s) => s.title.startsWith("Mechanistic Basis"));
  if (mechanistic && !mechanistic.title.includes("Synthesis of PMs")) {
    pushIssue(
      issues,
      "fm_mechanistic_basis_title",
      `${entityLabel}: §4 must be "## 4. Mechanistic Basis (Synthesis of PMs)"`,
    );
  }
}

/** FM extended public contract (Intervention Breakdown present; no Timing Specific body section). */
const FM_EXTENDED_SECTION_TITLES = [
  "Definition",
  "Intervention Breakdown",
  "Functional Role",
  "Mechanistic Basis (Synthesis of PMs)",
  "Primary Mechanisms (PMs)",
  "Cross BRS Links",
];

function normalizeSectionTitle(title) {
  return title.replace(/\s+/g, " ").trim();
}

function extractScoreableSectionBlock(content) {
  const legacy = content.match(LEGACY_SCOREABLE_HEADING);
  if (legacy?.index !== undefined) {
    return { legacy: true, block: null };
  }
  const match = content.match(SCOREABLE_SECTION_HEADING);
  if (!match || match.index === undefined) return null;
  const start = match.index;
  const after = content.slice(start);
  const next = after.slice(1).search(/^##\s+\d+\.\s+/m);
  const end = next === -1 ? content.length : start + 1 + next;
  return {
    legacy: false,
    sectionNum: parseInt(match[1], 10),
    block: content.slice(start, end),
  };
}

function validateScoreableSection(content, issues, { entityLabel, pageKind = "fm" }) {
  if (LEGACY_SCOREABLE_HEADING.test(content)) {
    pushIssue(
      issues,
      "legacy_scoreable_heading",
      `${entityLabel}: rename "## N. Scoreable Food-State Inputs" to "## N. ${SCOREABLE_SECTION_TITLE}"`,
    );
    return;
  }

  const section = extractScoreableSectionBlock(content);
  if (!section || section.legacy) return;

  const groups =
    pageKind === "pm"
      ? REQUIRED_SCOREABLE_CATEGORY_GROUPS_PM
      : REQUIRED_SCOREABLE_CATEGORY_GROUPS_FM;
  for (const group of groups) {
    if (!group.some((label) => section.block.includes(label))) {
      pushIssue(
        issues,
        "missing_scoreable_category",
        `${entityLabel}: Scoreable section (§${section.sectionNum}) must include one of: ${group.join(" | ")}`,
      );
    }
  }
}

function validateFmPage(filePath, { rootDir }) {
  const { data, content } = readMechanismPage(filePath);
  const entityLabel = data.fm_id || path.basename(filePath);
  const issues = [];

  validateTimingSpecificFrontMatter(data, issues, { entityLabel });
  validateNoVisibleTimingSection(content, issues, { entityLabel });
  validateNoPublicSpreadsheetMentions(content, issues, { entityLabel });
  validateSubstanceFoodMappingSections(content, issues, { entityLabel, kind: "fm" });
  validateInterventionBreakdown(data, content, issues, {
    entityLabel,
    required: true,
  });

  const sections = parseNumberedSections(content);
  validateContiguousNumbering(sections, issues, { entityLabel });
  validateEvidenceHighlightsPlacement(content, sections, issues, { entityLabel });
  validateFmSynthesisContract(content, sections, issues, { entityLabel });

  const numbered = sections.filter((s) => s.type === "major" && s.level <= 8);
  if (numbered.length >= 3) {
    const t0 = normalizeSectionTitle(numbered[0]?.title || "");
    const t1 = normalizeSectionTitle(numbered[1]?.title || "");
    const t2 = normalizeSectionTitle(numbered[2]?.title || "");
    const t3 = normalizeSectionTitle(numbered[3]?.title || "");
    const t4 = normalizeSectionTitle(numbered[4]?.title || "");
    const t5 = normalizeSectionTitle(numbered[5]?.title || "");
    const t6 = normalizeSectionTitle(numbered[6]?.title || "");
    if (t0 !== "Definition") {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §1 must be Definition`);
    }
    if (t1 !== "Intervention Breakdown") {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §2 must be Intervention Breakdown`);
    }
    if (t2 !== "Functional Role") {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §3 must be Functional Role (timing is front matter only)`);
    }
    if (numbered.length >= 4 && !t3.startsWith("Mechanistic Basis")) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §4 must be Mechanistic Basis (Synthesis of PMs)`);
    }
    if (numbered.length >= 5 && !t4.startsWith("Primary Mechanisms")) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §5 must be Primary Mechanisms (PMs)`);
    }
    if (numbered.length >= 6 && !t5.startsWith("Cross BRS Links")) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §6 must be Cross BRS Links`);
    }
    if (numbered.length >= 7 && !t6.startsWith("References")) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §7 must be References`);
    }
  }

  return { kind: "fm", filePath, entityId: data.fm_id, ok: issues.length === 0, issues };
}

function pmUsesExtendedProfile(data, content) {
  return Boolean(data.intervention_breakdown) || /^##\s+2\.\s+Intervention Breakdown\s*$/m.test(content);
}

function pmConnectedSectionTitle(parentBrs) {
  const brs = String(parentBrs || "").trim();
  return brs ? `Connected ${brs} Mechanisms` : "Connected BRS Mechanisms";
}

/** PM extended profile: Intervention Breakdown in body; no Timing Specific section. */
const PM_EXTENDED_AFTER_INTERVENTION = [
  "Functional Role",
  "Mechanistic Basis",
  "Cross BRS Links",
  "Dietary Levers",
  "Lifestyle Levers",
];

function getConnectedMechanismsBlock(content) {
  const connected = parseNumberedSections(content).find(
    (s) => /^Connected BRS\d+ Mechanisms/.test(s.title) || s.title.startsWith("Connected Mechanisms"),
  );
  if (!connected) return null;
  const blockStart = content.indexOf(connected.line);
  const after = content.slice(blockStart);
  const next = after.slice(1).search(NEXT_INTEGER_SECTION_HEADING);
  return next === -1 ? after : after.slice(0, 1 + next);
}

function getDietaryLeversBlock(content) {
  const dietary = parseNumberedSections(content).find((s) => s.title.startsWith("Dietary Levers"));
  if (!dietary) return null;
  const blockStart = content.indexOf(dietary.line);
  const after = content.slice(blockStart);
  const next = after.slice(1).search(NEXT_INTEGER_SECTION_HEADING);
  return next === -1 ? after : after.slice(0, 1 + next);
}

function validatePmHarmonisedSections(content, issues, { entityLabel, parentBrs }) {
  const major = parseNumberedSections(content).filter((s) => s.type === "major");
  const byLevel = new Map(major.map((s) => [s.level, s.title]));
  const connectedTitle = pmConnectedSectionTitle(parentBrs);

  if (byLevel.has(5) && String(byLevel.get(5)) !== connectedTitle) {
    pushIssue(issues, "pm_section5", `${entityLabel}: §5 must be ${connectedTitle}`);
  }
  if (byLevel.has(6) && !String(byLevel.get(6)).startsWith("Cross BRS Links")) {
    pushIssue(issues, "pm_section6", `${entityLabel}: §6 must be Cross BRS Links`);
  }
  if (byLevel.has(7) && !String(byLevel.get(7)).startsWith("Dietary Levers")) {
    pushIssue(issues, "pm_section7", `${entityLabel}: §7 must be Dietary Levers`);
  }
  if (/^##\s+\d+\.\s+(Overarching Functional Mechanism|Underlying Mechanisms and Requirements)\s*$/m.test(content)) {
    pushIssue(
      issues,
      "pm_legacy_connected",
      `${entityLabel}: use ## 5. ${connectedTitle} (5.1 FM, 5.2 sibling PMs) and ## 6. Cross BRS Links`,
    );
  }

  const connectedBlock = getConnectedMechanismsBlock(content);
  if (connectedBlock) {
    const subs = [...connectedBlock.matchAll(/^###\s+5\.(\d+)\s+(.+)$/gm)].map((m) => ({
      title: m[2].trim(),
    }));
    if (subs.length >= 1 && !/Overarching Functional Mechanism/i.test(subs[0]?.title || "")) {
      pushIssue(issues, "pm_connected_subsections", `${entityLabel}: §5.1 must be Overarching Functional Mechanism`);
    }
    if (subs.length >= 2 && !/Connected Primary Mechanisms/i.test(subs[1]?.title || "")) {
      pushIssue(issues, "pm_connected_subsections", `${entityLabel}: §5.2 must be Connected Primary Mechanisms`);
    }
  }

  const dietaryBlock = getDietaryLeversBlock(content);
  if (!dietaryBlock) return;
  const subs = [...dietaryBlock.matchAll(/^###\s+(\d+)\.(\d+)\s+(.+)$/gm)].map((m) => ({
    major: parseInt(m[1], 10),
    minor: parseInt(m[2], 10),
    title: m[3].trim(),
  }));
  const dietaryLevel = parseNumberedSections(content).find((s) => s.title.startsWith("Dietary Levers"))?.level;
  if (!dietaryLevel) return;
  const dietSubs = subs.filter((s) => s.major === dietaryLevel);
  if (dietSubs.length >= 1 && !/Direct Dietary Levers/i.test(dietSubs[0]?.title || "")) {
    pushIssue(
      issues,
      "pm_dietary_subsections",
      `${entityLabel}: §${dietaryLevel}.1 must be Direct Dietary Levers`,
    );
  }
  if (dietSubs.length >= 2 && !/Cofactors and Supporting Inputs/i.test(dietSubs[1]?.title || "")) {
    pushIssue(
      issues,
      "pm_dietary_subsections",
      `${entityLabel}: §${dietaryLevel}.2 must be Cofactors and Supporting Inputs`,
    );
  }
  if (dietSubs.length >= 3 && !/KCs/i.test(dietSubs[2]?.title || "")) {
    pushIssue(
      issues,
      "pm_dietary_subsections",
      `${entityLabel}: §${dietaryLevel}.3 must be KCs (Key Constraints)`,
    );
  }
}

function validatePmExtendedProfile(data, content, issues, { entityLabel }) {
  const extended = pmUsesExtendedProfile(data, content);
  if (!extended) {
    const sections = parseNumberedSections(content);
    validateContiguousNumbering(sections, issues, { entityLabel });
    validateEvidenceHighlightsPlacement(content, sections, issues, { entityLabel });
    validateScoreableSection(content, issues, { entityLabel, pageKind: "pm" });
    return;
  }

  validateInterventionBreakdown(data, content, issues, {
    entityLabel,
    required: true,
  });
  const sections = parseNumberedSections(content);
  validateContiguousNumbering(sections, issues, { entityLabel });
  validateEvidenceHighlightsPlacement(content, sections, issues, { entityLabel });
  validateScoreableSection(content, issues, { entityLabel, pageKind: "pm" });

  const core = sections.filter(
    (s) =>
      s.type === "major" &&
      !/References/i.test(s.title) &&
      !/Scoreable Inputs & Modulation Signals/i.test(s.title) &&
      !/Scoreable Food-State Inputs/i.test(s.title),
  );
  if (core.length >= 4) {
    const titles = core.slice(0, 6).map((s) => normalizeSectionTitle(s.title));
    if (titles[0] !== "Definition") {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §1 must be Definition`);
    }
    if (titles[1] !== "Intervention Breakdown") {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §2 must be Intervention Breakdown`);
    }
    if (titles[2] !== "Functional Role") {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §3 must be Functional Role`);
    }
    if (!titles[3]?.startsWith("Mechanistic Basis")) {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §4 must be Mechanistic Basis in extended profile`);
    }
  }
}

function validateConnectedEntityList(data, field, issues, { entityLabel }) {
  const list = data[field];
  if (!Array.isArray(list) || list.length === 0) {
    pushIssue(issues, `missing_${field}`, `${entityLabel}: ${field} must be a non-empty array in front matter`);
    return;
  }
  for (const [i, item] of list.entries()) {
    if (!item?.id || !item?.name || !item?.href) {
      pushIssue(
        issues,
        `invalid_${field}_entry`,
        `${entityLabel}: ${field}[${i}] requires id, name, and href`,
      );
    }
  }
}

function validateSmCategoryFrontMatter(data, content, issues, { entityLabel }) {
  const cat = data.sm_category;
  if (!cat || !SM_CATEGORY_VALUES.has(String(cat).trim())) {
    pushIssue(
      issues,
      "invalid_sm_category",
      `${entityLabel}: sm_category must be one of SM-SNP, SM-PHEN, SM-CROSS`,
    );
  }
  const useCase = data.use_case;
  if (!useCase || String(useCase).trim() === "") {
    pushIssue(issues, "missing_use_case", `${entityLabel}: use_case is required in front matter`);
  }

  const block = extractInterventionBreakdownBody(content);
  if (!block) return;
  if (/Category:\s*SM-/i.test(block) || /Use case:/i.test(block)) {
    pushIssue(
      issues,
      "sm_category_in_body",
      `${entityLabel}: §2 Intervention Breakdown must contain only the intervention_breakdown value (Category and Use case belong in front matter, not the public body)`,
    );
  }
}

function getUnderlyingBlock(content) {
  const underlying = parseNumberedSections(content).find((s) =>
    s.title.startsWith("Underlying Mechanisms"),
  );
  if (!underlying) return null;
  const blockStart = content.indexOf(underlying.line);
  const after = content.slice(blockStart);
  const next = after.slice(1).search(NEXT_INTEGER_SECTION_HEADING);
  return next === -1 ? after : after.slice(0, 1 + next);
}

function validateUnderlyingCofactorsBeforeKcs(content, issues, { entityLabel, expectConnectedPmFm = false }) {
  const underBlock = getUnderlyingBlock(content);
  if (!underBlock) return;
  const subs = [...underBlock.matchAll(/^###\s+\d+\.\d+\s+(.+)$/gm)].map((m) => m[1].trim());
  if (subs.length < 2) return;
  if (!/Cofactors and Supporting Inputs/i.test(subs[0])) {
    pushIssue(
      issues,
      "underlying_cofactors_order",
      `${entityLabel}: §5.1 must be Cofactors and Supporting Inputs (canonical underlying order)`,
    );
  }
  if (!/KCs/i.test(subs[1])) {
    pushIssue(
      issues,
      "underlying_kcs_order",
      `${entityLabel}: §5.2 must be KCs (Key Constraints)`,
    );
  }
  if (expectConnectedPmFm) {
    if (!subs.some((t) => /Connected Primary Mechanisms/i.test(t))) {
      pushIssue(
        issues,
        "sm_missing_connected_pms_section",
        `${entityLabel}: Underlying section must include Connected Primary Mechanisms (PMs)`,
      );
    }
    if (!subs.some((t) => /Connected Functional Mechanisms/i.test(t))) {
      pushIssue(
        issues,
        "sm_missing_connected_fms_section",
        `${entityLabel}: Underlying section must include Connected Functional Mechanisms (FMs)`,
      );
    }
  }
}

function validatePmPage(filePath) {
  const { data, content } = readMechanismPage(filePath);
  const entityLabel = data.pm_id || path.basename(filePath);
  const issues = [];

  validateTimingSpecificFrontMatter(data, issues, { entityLabel });
  validateNoVisibleTimingSection(content, issues, { entityLabel });
  validateNoPublicSpreadsheetMentions(content, issues, { entityLabel });
  validateSubstanceFoodMappingSections(content, issues, { entityLabel, kind: "pm" });
  validatePmExtendedProfile(data, content, issues, { entityLabel });
  if (pmUsesExtendedProfile(data, content)) {
    validatePmHarmonisedSections(content, issues, { entityLabel, parentBrs: data.parent_brs });
  }

  return { kind: "pm", filePath, entityId: data.pm_id, ok: issues.length === 0, issues };
}

function validateKcPage(filePath) {
  const { data, content } = readMechanismPage(filePath);
  const entityLabel = data.kc_id || path.basename(filePath);
  const issues = [];
  validateNoPublicSpreadsheetMentions(content, issues, { entityLabel });
  validateSubstanceFoodMappingSections(content, issues, { entityLabel, kind: "kc" });
  return { kind: "kc", filePath, entityId: data.kc_id, ok: issues.length === 0, issues };
}

function validateSmPage(filePath) {
  const { data, content } = readMechanismPage(filePath);
  const entityLabel = data.sm_id || path.basename(filePath);
  const issues = [];

  if (!data.sm_id) {
    pushIssue(issues, "missing_sm_id", `${entityLabel}: sm_id is required in front matter`);
  }
  if (!data.parent_brs) {
    pushIssue(issues, "missing_parent_brs", `${entityLabel}: parent_brs is required in front matter`);
  }

  validateTimingSpecificFrontMatter(data, issues, { entityLabel });
  validateNoVisibleTimingSection(content, issues, { entityLabel });
  validateNoPublicSpreadsheetMentions(content, issues, { entityLabel });
  validateSubstanceFoodMappingSections(content, issues, { entityLabel, kind: "sm" });
  validatePmExtendedProfile(data, content, issues, { entityLabel });
  validateSmCategoryFrontMatter(data, content, issues, { entityLabel });
  validateConnectedEntityList(data, "connected_pms", issues, { entityLabel });
  validateConnectedEntityList(data, "connected_fms", issues, { entityLabel });
  validateConnectedEntityList(data, "connected_kcs", issues, { entityLabel });

  validateUnderlyingCofactorsBeforeKcs(content, issues, { entityLabel, expectConnectedPmFm: true });

  return { kind: "sm", filePath, entityId: data.sm_id, ok: issues.length === 0, issues };
}

/**
 * Remove visible Timing Specific section and renumber subsequent ## / ### / § references.
 * @returns {{ content: string, changed: boolean }}
 */
export function stripTimingSectionAndRenumber(content) {
  const timingHeading = content.match(/^## (\d+)\. Timing Specific\s*$/m);
  if (!timingHeading) return { content, changed: false };

  const removedNum = parseInt(timingHeading[1], 10);
  const sectionRe = new RegExp(
    `^## ${removedNum}\\. Timing Specific\\s*\\n[\\s\\S]*?(?=^## \\d+\\. )`,
    "m",
  );
  let next = content.replace(sectionRe, "");
  if (next === content) {
    const sectionReEnd = new RegExp(`^## ${removedNum}\\. Timing Specific\\s*\\n[\\s\\S]*$`, "m");
    next = content.replace(sectionReEnd, "");
  }

  const delta = -1;
  next = next.replace(/^## (\d+)\. /gm, (_m, n) => {
    const num = parseInt(n, 10);
    return num > removedNum ? `## ${num + delta}. ` : `## ${num}. `;
  });
  next = next.replace(/^### (\d+)\.(\d+) /gm, (_m, a, b) => {
    const num = parseInt(a, 10);
    return num > removedNum ? `### ${num + delta}.${b} ` : `### ${a}.${b} `;
  });
  next = next.replace(/§(\d+)(?:\.(\d+))?/g, (m, a, b) => {
    const num = parseInt(a, 10);
    if (num <= removedNum) return m;
    const newA = num + delta;
    return b !== undefined ? `§${newA}.${b}` : `§${newA}`;
  });

  return { content: next.trimEnd() + (content.endsWith("\n") ? "\n" : ""), changed: true };
}

export function migrateTimingSectionInFile(filePath, { dryRun = false } = {}) {
  const { data, content } = readMechanismPage(filePath);
  const { content: next, changed } = stripTimingSectionAndRenumber(content);
  if (!changed) return { filePath, changed: false };
  if (!dryRun) {
    const out = matter.stringify(next, data, { lineWidth: 9999 });
    fs.writeFileSync(filePath, out);
  }
  return { filePath, changed: true, dryRun };
}

export function migrateAllTimingSections(rootDir = process.cwd(), opts = {}) {
  const files = [
    ...listMechanismMdxFiles(rootDir, "fm"),
    ...listMechanismMdxFiles(rootDir, "pm"),
    ...listMechanismMdxFiles(rootDir, "sm"),
  ];
  return files.map((f) => migrateTimingSectionInFile(f, opts));
}

export function validateAllMechanismPages(rootDir = process.cwd()) {
  const fm = listMechanismMdxFiles(rootDir, "fm").map((f) => validateFmPage(f, { rootDir }));
  const pm = listMechanismMdxFiles(rootDir, "pm").map(validatePmPage);
  const kc = listMechanismMdxFiles(rootDir, "kc").map(validateKcPage);
  const sm = listMechanismMdxFiles(rootDir, "sm").map(validateSmPage);
  return { fm, pm, kc, sm, all: [...fm, ...pm, ...kc, ...sm] };
}
