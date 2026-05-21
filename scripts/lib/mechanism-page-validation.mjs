/**
 * FM / PM mechanism page validation (JS layer).
 * timing_specific is required ontology front matter; visible "## N. Timing Specific" body sections are forbidden.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const TIMING_SPECIFIC_VALUES = new Set(["Yes", "No"]);

export const INTERVENTION_BREAKDOWN_VALUES = new Set([
  "Food-State Dominant",
  "Food-State Leaning",
  "Mixed Modulation",
  "Behavioural/Lifestyle Leaning",
  "Behavioural/Lifestyle Dominant",
]);

export const SM_CATEGORY_VALUES = new Set(["SM-ADHD", "SM-SNP", "SM-PHEN", "SM-OTHER"]);

const TIMING_BODY_HEADING = /^##\s+\d+\.\s+Timing Specific\s*$/m;

export const SCOREABLE_SECTION_TITLE = "Scoreable Inputs & Modulation Signals";

const LEGACY_SCOREABLE_HEADING = /^##\s+\d+\.\s+Scoreable Food-State Inputs\s*$/m;
const SCOREABLE_SECTION_HEADING = /^##\s+(\d+)\.\s+Scoreable Inputs & Modulation Signals\s*$/m;

/** At least one label per group must appear in the scoreable table when the section is present. */
export const REQUIRED_SCOREABLE_CATEGORY_GROUPS = [
  ["Functional Property Potentials"],
  ["Realised Functional States"],
  ["Preparation Transformations"],
  ["Substance / Nutrient Signals", "Antagonistic Signals"],
];

/** @deprecated Use REQUIRED_SCOREABLE_CATEGORY_GROUPS */
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
  const next = after.slice(1).search(/^##\s+\d+\.\s+/m);
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

/** @returns {Array<{ level: number, title: string, line: string }>} */
export function parseNumberedSections(content) {
  const sections = [];
  for (const line of content.split("\n")) {
    const m = line.match(/^##\s+(\d+)\.\s+(.+?)\s*$/);
    if (m) sections.push({ level: parseInt(m[1], 10), title: m[2].trim(), line });
  }
  return sections;
}

function validateContiguousNumbering(sections, issues, { entityLabel }) {
  if (sections.length === 0) return;
  const nums = sections.map((s) => s.level);
  for (let i = 0; i < nums.length; i++) {
    const expected = i + 1;
    if (nums[i] !== expected) {
      pushIssue(
        issues,
        "section_number_gap",
        `${entityLabel}: expected "## ${expected}. …" but found "${sections[i].line}" (sections must be contiguous)`,
      );
      return;
    }
  }
}

/** FM extended public contract (Intervention Breakdown present; no Timing Specific body section). */
const FM_EXTENDED_SECTION_TITLES = [
  "Definition",
  "Intervention Breakdown",
  "Functional Role",
  "Mechanistic Basis (Implementation of PMs)",
  "Underlying Mechanisms and Requirements",
  "Dietary Levers",
  "Lifestyle Levers",
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

function validateScoreableSection(content, issues, { entityLabel }) {
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

  for (const group of REQUIRED_SCOREABLE_CATEGORY_GROUPS) {
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
  validateInterventionBreakdown(data, content, issues, {
    entityLabel,
    required: true,
  });

  const sections = parseNumberedSections(content);
  validateContiguousNumbering(sections, issues, { entityLabel });

  const numbered = sections.filter((s) => s.level <= 8);
  if (numbered.length >= 3) {
    const t0 = normalizeSectionTitle(numbered[0]?.title || "");
    const t1 = normalizeSectionTitle(numbered[1]?.title || "");
    const t2 = normalizeSectionTitle(numbered[2]?.title || "");
    if (t0 !== "Definition") {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §1 must be Definition`);
    }
    if (t1 !== "Intervention Breakdown") {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §2 must be Intervention Breakdown`);
    }
    if (t2 !== "Functional Role") {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §3 must be Functional Role (timing is front matter only)`);
    }
  }

  const underlying = sections.find((s) => s.title.startsWith("Underlying Mechanisms"));
  if (underlying) {
    const dietIdx = sections.findIndex((s) => s.title === "Dietary Levers");
    const underIdx = sections.findIndex((s) => s === underlying);
    if (dietIdx !== -1 && dietIdx !== underIdx + 1) {
      pushIssue(
        issues,
        "fm_dietary_order",
        `${entityLabel}: Dietary Levers must immediately follow Underlying Mechanisms and Requirements`,
      );
    }
  }

  validateScoreableSection(content, issues, { entityLabel });

  return { kind: "fm", filePath, entityId: data.fm_id, ok: issues.length === 0, issues };
}

function pmUsesExtendedProfile(data, content) {
  return Boolean(data.intervention_breakdown) || /^##\s+2\.\s+Intervention Breakdown\s*$/m.test(content);
}

/** PM extended profile: Intervention Breakdown in body; no Timing Specific section. */
const PM_EXTENDED_AFTER_INTERVENTION = [
  "Functional Role",
  "Mechanistic Basis",
  "Underlying Mechanisms and Requirements",
  "Dietary Levers",
  "Lifestyle Levers",
];

function validatePmExtendedProfile(data, content, issues, { entityLabel }) {
  const extended = pmUsesExtendedProfile(data, content);
  if (!extended) {
    const sections = parseNumberedSections(content);
    validateContiguousNumbering(sections, issues, { entityLabel });
    validateScoreableSection(content, issues, { entityLabel });
    return;
  }

  validateInterventionBreakdown(data, content, issues, {
    entityLabel,
    required: true,
  });
  const sections = parseNumberedSections(content);
  validateContiguousNumbering(sections, issues, { entityLabel });
  validateScoreableSection(content, issues, { entityLabel });

  const core = sections.filter(
    (s) =>
      !/References/i.test(s.title) &&
      !/Scoreable Inputs & Modulation Signals/i.test(s.title) &&
      !/Scoreable Food-State Inputs/i.test(s.title),
  );
  if (core.length >= 4) {
    const titles = core.slice(0, 5).map((s) => normalizeSectionTitle(s.title));
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
      `${entityLabel}: sm_category must be one of SM-ADHD, SM-SNP, SM-PHEN, SM-OTHER`,
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
  const next = after.slice(1).search(/^##\s+\d+\.\s+/m);
  return next === -1 ? after : after.slice(0, 1 + next);
}

function validateUnderlyingCofactorsBeforeKcs(content, issues, { entityLabel, expectConnectedPmFm = false }) {
  const underBlock = getUnderlyingBlock(content);
  if (!underBlock) return;
  const subs = [...underBlock.matchAll(/^###\s+\d+\.\d+\s+(.+)$/gm)].map((m) => m[1].trim());
  if (subs.length < 2) return;
  if (!/Co-factors/i.test(subs[0])) {
    pushIssue(
      issues,
      "underlying_cofactors_order",
      `${entityLabel}: §5.1 must be Co-factors (canonical underlying order)`,
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
  validatePmExtendedProfile(data, content, issues, { entityLabel });
  if (pmUsesExtendedProfile(data, content)) {
    validateUnderlyingCofactorsBeforeKcs(content, issues, { entityLabel });
  }

  return { kind: "pm", filePath, entityId: data.pm_id, ok: issues.length === 0, issues };
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
  const sm = listMechanismMdxFiles(rootDir, "sm").map(validateSmPage);
  return { fm, pm, sm, all: [...fm, ...pm, ...sm] };
}
