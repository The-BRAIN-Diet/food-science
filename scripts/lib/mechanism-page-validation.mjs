/**
 * FM / PM mechanism page validation (JS layer).
 * timing_specific is required ontology front matter; visible "## N. Timing Specific" body sections are forbidden.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isLegacyFoodToSubstanceLine } from "./substance-food-mapping.mjs";
import {
  FM_PHENOME_SECTION_TITLE,
  PM_PHENOME_SECTION_TITLE,
  validateFmPhenomeFrontMatter,
  validatePmPhenomeFrontMatter,
  validatePhenomeSectionBody,
} from "./phenome-relationships.mjs";

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
    const poolBlock = extractSectionBody(
      content,
      /### 3\. Shared Biological Pool/,
      /\n### 4\. /,
    );
    if (poolBlock) {
      for (const line of poolBlock.split("\n")) {
        if (/←/.test(line) && line.trim().startsWith("-")) {
          pushIssue(
            issues,
            "kc_food_mapping_on_pool",
            `${entityLabel}: §3 Shared Biological Pool must list pool members only — no substance ← food bullets (use PM §7.1 Direct Dietary Levers)`,
          );
          return;
        }
        if (isLegacyFoodToSubstanceLine(line)) {
          pushIssue(
            issues,
            "legacy_food_to_substance",
            `${entityLabel}: §3 must not use food → substance lines`,
          );
          return;
        }
        if (/Food sources \(examples\)/i.test(line)) {
          pushIssue(
            issues,
            "nested_food_sources_collapsible",
            `${entityLabel}: merge food examples into PM §7.1; remove nested Food sources block from KC`,
          );
          return;
        }
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

  const isPmFile = (name) =>
    /-fm\d+-pm\d+-/.test(name) || /brs-x-[a-z]+-pm\d+-/.test(name);
  const isFmFile = (name) =>
    (/-fm\d+-/.test(name) || /brs-x-[a-z]+-fm\d+-/.test(name)) && !isPmFile(name);

  function scanFmFolder(sub) {
    for (const f of fs.readdirSync(sub)) {
      if (!f.endsWith(".mdx") && !f.endsWith(".md")) continue;
      if (kind === "pm" && isPmFile(f)) out.push(path.join(sub, f));
      if (kind === "fm" && isFmFile(f)) out.push(path.join(sub, f));
    }
  }

  for (const brs of fs.readdirSync(base)) {
    const brsDir = path.join(base, brs);
    if (!fs.statSync(brsDir).isDirectory()) continue;

    // BRS-X: brs-x/{ecs,hormones}/fm{M}/
    if (brs === "brs-x") {
      for (const system of fs.readdirSync(brsDir)) {
        const systemDir = path.join(brsDir, system);
        if (!fs.statSync(systemDir).isDirectory()) continue;
        for (const entry of fs.readdirSync(systemDir)) {
          if (!/^fm\d+$/i.test(entry)) continue;
          scanFmFolder(path.join(systemDir, entry));
        }
      }
      continue;
    }

    if (!/^brs\d+$/i.test(brs)) continue;

    for (const entry of fs.readdirSync(brsDir)) {
      const sub = path.join(brsDir, entry);
      if (!fs.statSync(sub).isDirectory()) continue;

      // FM-centric layout: brs{N}/fm{M}/
      if (/^fm\d+$/i.test(entry)) {
        scanFmFolder(sub);
        continue;
      }

      // Legacy flat layout: brs{N}/fm/ or brs{N}/pm/
      if (entry === kind) {
        for (const f of fs.readdirSync(sub)) {
          if (f.endsWith(".mdx") || f.endsWith(".md")) out.push(path.join(sub, f));
        }
      }
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
  const m = content.match(/^##\s+3\.\s+Intervention Breakdown\s*$/m);
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
    if (!/^##\s+3\.\s+Intervention Breakdown\s*$/m.test(content)) {
      pushIssue(
        issues,
        "missing_intervention_breakdown_section",
        `${entityLabel}: published body must include "## 3. Intervention Breakdown" after Phenome layer`,
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
        .replace(/^##\s+3\.\s+Intervention Breakdown\s*/m, "")
        .trim()
        .split("\n")[0]
        ?.trim();
      if (bodyVal && bodyVal !== String(fmValue).trim()) {
        pushIssue(
          issues,
          "intervention_breakdown_mismatch",
          `${entityLabel}: "## 3. Intervention Breakdown" body value must match front matter intervention_breakdown`,
        );
      }
    }
  }
}

/** Integer `## N.` headings only (excludes decimal subsections such as `### 4.1`). */
export const NEXT_INTEGER_SECTION_HEADING = /^##\s+\d+\.\s+(?!\d)/m;

const LEGACY_EVIDENCE_HIGHLIGHTS_HEADING = /^##\s+(\d+)\.1\s+Evidence Highlights\s*$/;
const EVIDENCE_HIGHLIGHTS_HEADING = /^###\s+(\d+)\.(\d+)\s+Evidence Highlights\s*$/;

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
  const evSub = parseInt(evMatch[2], 10);
  if (evLevel !== mechanistic.level) {
    pushIssue(
      issues,
      "evidence_highlights_number",
      `${entityLabel}: Evidence Highlights section number must match Mechanistic Basis (e.g. ### 4.4 under ## 4. Mechanistic Basis)`,
    );
  }
  if (evSub === 1 && /Integrated FM Narrative/.test(mechanistic.title)) {
    pushIssue(
      issues,
      "fm_evidence_highlights_subsection",
      `${entityLabel}: on FM pages use ### 5.5 Evidence Highlights (§5.4 is Functional Failure Modes)`,
    );
  }
  if (evSub === 4 && /Integrated FM Narrative/.test(mechanistic.title)) {
    pushIssue(
      issues,
      "fm_evidence_highlights_subsection",
      `${entityLabel}: on FM pages use ### 5.5 Evidence Highlights (§5.4 is Functional Failure Modes)`,
    );
  }
}

/** FM synthesis contract: no intervention sections; §5 Connected Mechanisms. PM/KC links live in §4.1/§4.2. */
const FM_FORBIDDEN_BODY_SECTIONS = [
  "Dietary Levers",
  "Lifestyle Levers",
  "Scoreable Inputs & Modulation Signals",
  "Scoreable Food-State Inputs",
  "Underlying Mechanisms and Requirements",
  "Overarching Functional Mechanism",
];

const FM_FORBIDDEN_INDEX_SECTIONS = [
  { match: (t) => t.startsWith("Primary Mechanisms"), label: "Primary Mechanisms (PMs)" },
  { match: (t) => t === "KCs" || t.startsWith("KCs "), label: "KCs" },
];

function validateFmSynthesisContract(content, sections, issues, { entityLabel, data = {} }) {
  for (const title of FM_FORBIDDEN_BODY_SECTIONS) {
    if (sections.some((s) => s.title === title || s.title.startsWith(title))) {
      pushIssue(
        issues,
        "fm_forbidden_section",
        `${entityLabel}: FM pages must not include "## N. ${title}" — PM/KC links belong in §5.1/§5.2; interventions belong on PM pages`,
      );
    }
  }
  for (const { match, label } of FM_FORBIDDEN_INDEX_SECTIONS) {
    const hit = sections.find((s) => s.type === "major" && match(s.title));
    if (hit) {
      pushIssue(
        issues,
        "fm_redundant_index_section",
        `${entityLabel}: remove ## ${hit.level}. ${label} — use §5.1/§5.2 integrated narrative instead`,
      );
    }
  }
  if (/^### 6\.[1234]/m.test(content)) {
    pushIssue(
      issues,
      "fm_legacy_underlying_subsections",
      `${entityLabel}: remove legacy §6.x rollups; use §5 integrated narrative and ## 6. Connected Mechanisms`,
    );
  }
  const brs = sections.find((s) => s.title.startsWith("Connected Mechanisms"));
  if (!brs) {
    pushIssue(issues, "fm_missing_brs_links", `${entityLabel}: FM pages must include ## 6. Connected Mechanisms`);
  } else if (brs.level !== 6) {
    pushIssue(issues, "fm_brs_links_numbering", `${entityLabel}: Connected Mechanisms must be ## 6. Connected Mechanisms`);
  }
  const refs = sections.find((s) => s.title.startsWith("References"));
  if (refs && refs.level !== 7) {
    pushIssue(issues, "fm_refs_numbering", `${entityLabel}: References must be ## 7. References`);
  }
  const mechanistic = sections.find((s) => s.title.startsWith("Mechanistic Basis"));
  if (mechanistic && !mechanistic.title.includes("Integrated FM Narrative")) {
    pushIssue(
      issues,
      "fm_mechanistic_basis_title",
      `${entityLabel}: §5 must be "## 5. Mechanistic Basis (Integrated FM Narrative)"`,
    );
  }

  const mbStart = mechanistic ? content.indexOf(mechanistic.line) : -1;
  const nextMajor = sections
    .filter((s) => s.type === "major")
    .find((s) => s.level === 6);
  const mbEnd =
    mbStart === -1 || !nextMajor
      ? content.length
      : content.indexOf(nextMajor.line, mbStart + 1);
  const mbBlock = mbStart === -1 ? "" : content.slice(mbStart, mbEnd);

  for (const [sub, label] of [
    ["5.1 Core Primary Mechanisms", "§5.1 Core Primary Mechanisms"],
    ["5.2 Supporting Biological Pools (Key Constraints)", "§5.2 Supporting Biological Pools (Key Constraints)"],
    ["5.3 Integrated Functional Narrative", "§5.3 Integrated Functional Narrative"],
  ]) {
    const subPattern = sub.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (mechanistic && !new RegExp(`^### ${subPattern}`, "m").test(mbBlock)) {
      pushIssue(
        issues,
        "fm_integrated_narrative_subsection",
        `${entityLabel}: §4 must include ### ${label}`,
      );
    }
  }

  const hasKcs = Array.isArray(data.key_constraints) && data.key_constraints.length > 0;
  if (
    hasKcs &&
    mechanistic &&
    !/^### 5\.4 Functional Failure Modes/m.test(mbBlock)
  ) {
    pushIssue(
      issues,
      "fm_missing_failure_modes",
      `${entityLabel}: §5 must include ### 5.4 Functional Failure Modes when key_constraints are linked`,
    );
  }

  if (/^### 5\.4 Evidence Highlights/m.test(mbBlock)) {
    pushIssue(
      issues,
      "fm_evidence_highlights_subsection",
      `${entityLabel}: move Evidence Highlights to ### 5.5 Evidence Highlights (§5.4 is Functional Failure Modes)`,
    );
  }
}

/** FM extended public contract (Intervention Breakdown present; no Timing Specific body section). */
const FM_EXTENDED_SECTION_TITLES = [
  "Definition",
  FM_PHENOME_SECTION_TITLE,
  "Intervention Breakdown",
  "Functional Role",
  "Mechanistic Basis (Integrated FM Narrative)",
  "Connected Mechanisms",
  "References",
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
  validateFmPhenomeFrontMatter(data, issues, { entityLabel });
  validatePhenomeSectionBody(content, issues, { entityLabel, kind: "fm" });

  const sections = parseNumberedSections(content);
  validateContiguousNumbering(sections, issues, { entityLabel });
  validateEvidenceHighlightsPlacement(content, sections, issues, { entityLabel });
  validateFmSynthesisContract(content, sections, issues, { entityLabel, data });

  const numbered = sections.filter((s) => s.type === "major" && s.level <= 7);
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
    if (t1 !== FM_PHENOME_SECTION_TITLE) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §2 must be ${FM_PHENOME_SECTION_TITLE}`);
    }
    if (t2 !== "Intervention Breakdown") {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §3 must be Intervention Breakdown`);
    }
    if (t3 !== "Functional Role") {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §4 must be Functional Role (timing is front matter only)`);
    }
    if (numbered.length >= 4 && !t4.startsWith("Mechanistic Basis")) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §5 must be Mechanistic Basis (Integrated FM Narrative)`);
    }
    if (numbered.length >= 5 && !t5.startsWith("Connected Mechanisms")) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §6 must be Connected Mechanisms`);
    }
    if (numbered.length >= 6 && !t6.startsWith("References")) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §7 must be References`);
    }
  }

  return { kind: "fm", filePath, entityId: data.fm_id, ok: issues.length === 0, issues };
}

function pmUsesExtendedProfile(data, content) {
  return Boolean(data.intervention_breakdown) || /^##\s+3\.\s+Intervention Breakdown\s*$/m.test(content);
}

function pmConnectedSectionTitle(parentBrs) {
  const brs = String(parentBrs || "").trim();
  return brs ? `Connected ${brs} Mechanisms` : "Connected BRS Mechanisms";
}

/** PM extended profile: Intervention Breakdown in body; no Timing Specific section. */
const PM_EXTENDED_AFTER_INTERVENTION = [
  "Functional Role",
  "Mechanistic Basis",
  "Connected Mechanisms",
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

  if (byLevel.has(6) && String(byLevel.get(6)) !== connectedTitle) {
    pushIssue(issues, "pm_section6", `${entityLabel}: §6 must be ${connectedTitle}`);
  }
  if (byLevel.has(7) && !String(byLevel.get(7)).startsWith("Connected Mechanisms")) {
    pushIssue(issues, "pm_section7", `${entityLabel}: §7 must be Connected Mechanisms`);
  }
  if (byLevel.has(8) && !String(byLevel.get(8)).startsWith("Dietary Levers")) {
    pushIssue(issues, "pm_section8", `${entityLabel}: §8 must be Dietary Levers`);
  }
  if (/^##\s+\d+\.\s+(Overarching Functional Mechanism|Underlying Mechanisms and Requirements)\s*$/m.test(content)) {
    pushIssue(
      issues,
      "pm_legacy_connected",
      `${entityLabel}: use ## 6. ${connectedTitle} (6.1 FM, 6.2 sibling PMs) and ## 7. Connected Mechanisms`,
    );
  }

  const connectedBlock = getConnectedMechanismsBlock(content);
  if (connectedBlock) {
    const subs = [...connectedBlock.matchAll(/^###\s+6\.(\d+)\s+(.+)$/gm)].map((m) => ({
      title: m[2].trim(),
    }));
    if (subs.length >= 1 && !/Overarching Functional Mechanism/i.test(subs[0]?.title || "")) {
      pushIssue(issues, "pm_connected_subsections", `${entityLabel}: §6.1 must be Overarching Functional Mechanism`);
    }
    if (subs.length >= 2 && !/Connected Primary Mechanisms/i.test(subs[1]?.title || "")) {
      pushIssue(issues, "pm_connected_subsections", `${entityLabel}: §6.2 must be Connected Primary Mechanisms`);
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
    const titles = core.slice(0, 7).map((s) => normalizeSectionTitle(s.title));
    if (titles[0] !== "Definition") {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §1 must be Definition`);
    }
    if (titles[1] !== PM_PHENOME_SECTION_TITLE) {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §2 must be ${PM_PHENOME_SECTION_TITLE}`);
    }
    if (titles[2] !== "Intervention Breakdown") {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §3 must be Intervention Breakdown`);
    }
    if (titles[3] !== "Functional Role") {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §4 must be Functional Role`);
    }
    if (!titles[4]?.startsWith("Mechanistic Basis")) {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §5 must be Mechanistic Basis in extended profile`);
    }
  }
}

function validateConnectedEntityList(data, field, issues, { entityLabel, allowEmpty = false }) {
  const list = data[field];
  if (list === undefined || list === null) {
    if (!allowEmpty) {
      pushIssue(issues, `missing_${field}`, `${entityLabel}: ${field} must be a non-empty array in front matter`);
    }
    return;
  }
  if (!Array.isArray(list)) {
    pushIssue(issues, `missing_${field}`, `${entityLabel}: ${field} must be an array in front matter`);
    return;
  }
  if (list.length === 0) {
    if (!allowEmpty) {
      pushIssue(issues, `missing_${field}`, `${entityLabel}: ${field} must be a non-empty array in front matter`);
    }
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
  validatePmPhenomeFrontMatter(data, issues, { entityLabel });
  validatePhenomeSectionBody(content, issues, { entityLabel, kind: "pm" });
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

  if (/### 6\. Constraint Stressors \/ Burdens/m.test(content)) {
    pushIssue(
      issues,
      "kc_stressor_section_removed",
      `${entityLabel}: remove ### 6. Constraint Stressors / Burdens — migrate stressors to linked FM §4.4 Functional Failure Modes`,
    );
  }

  const sections = parseNumberedSections(content).filter((s) => s.type === "major" || s.title.startsWith("References"));
  const refs = sections.find((s) => s.title.startsWith("References"));
  if (refs && refs.level !== 6) {
    pushIssue(issues, "kc_refs_numbering", `${entityLabel}: References must be ### 6. References`);
  }
  if (/^### 7\. References/m.test(content)) {
    pushIssue(issues, "kc_refs_numbering", `${entityLabel}: References must be ### 6. References (not ### 7.)`);
  }

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
  validatePmPhenomeFrontMatter(data, issues, { entityLabel });
  validatePhenomeSectionBody(content, issues, { entityLabel, kind: "pm" });
  validatePmExtendedProfile(data, content, issues, { entityLabel });
  validateSmCategoryFrontMatter(data, content, issues, { entityLabel });
  validateConnectedEntityList(data, "connected_pms", issues, { entityLabel });
  validateConnectedEntityList(data, "connected_fms", issues, { entityLabel });
  validateConnectedEntityList(data, "connected_kcs", issues, { entityLabel, allowEmpty: true });

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
