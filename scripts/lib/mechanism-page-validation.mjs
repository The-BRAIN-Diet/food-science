/**
 * FM / PM mechanism page validation (JS layer).
 * timing_specific is required ontology front matter; visible "## N. Timing Specific" body sections are forbidden.
 */

import fs from "node:fs";
import path from "node:path";
import { HAS_DROPDOWN_RE } from "./hub-collapsible.mjs";
import matter from "gray-matter";
import { isLegacyFoodToSubstanceLine } from "./substance-food-mapping.mjs";
import {
  FM_PHENOME_CONNECTIONS_SECTION_TITLE,
  PM_PHENOME_SECTION_TITLE,
  PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE,
  validateFmPhenomeFrontMatter,
  validatePmPhenomeFrontMatter,
  validatePhenomeSectionBody,
  validateSinglePmFmOutcomeAlignment,
} from "./phenome-relationships.mjs";
import {
  PM_SECTION_6_2_TITLE,
  PM_SECTION_6_3_TITLE,
} from "./pm-relationship-sections.mjs";

export const TIMING_SPECIFIC_VALUES = new Set(["Yes", "No"]);

export const INTERVENTION_BREAKDOWN_VALUES = new Set([
  "Food-State Dominant",
  "Food-State Leaning",
  "Mixed Modulation",
  "Behavioural/Lifestyle Leaning",
  "Behavioural/Lifestyle Dominant",
]);

export const INTERVENTION_DOMINANCE_VALUES = new Set([
  "Diet-Dominant",
  "Diet/Lifestyle-Combined",
  "Lifestyle-Dominant",
  // Legacy spreadsheet values (normalize to canonical set when authoring §3 Intervention Profile)
  "Diet-Supported",
  "Lifestyle-Supported",
  "Mixed",
]);

const INTERVENTION_SUMMARY_HEADING = /^##\s+3\.\s+Intervention Summary\s*$/m;
const LEGACY_INTERVENTION_BREAKDOWN_HEADING = /^##\s+3\.\s+Intervention Breakdown\s*$/m;
const ANY_INTERVENTION_SECTION_HEADING = /^##\s+\d+\.\s+Intervention (Summary|Breakdown)\s*$/m;
const LEVERS_SECTION_HEADING = /^##\s+4\.\s+Levers\s*$/m;

export const SM_CATEGORY_VALUES = new Set(["SM-SNP", "SM-PHEN", "SM-CROSS"]);

const TIMING_BODY_HEADING = /^##\s+\d+\.\s+Timing Specific\s*$/m;

export const SCOREABLE_SECTION_TITLE = "Scoreable Inputs & Modulation Signals";

const LEGACY_SCOREABLE_HEADING = /^##\s+\d+\.\s+Scoreable Food-State Inputs\s*$/m;
const SCOREABLE_SECTION_HEADING = /^##\s+(\d+)\.\s+Scoreable Inputs & Modulation Signals\s*$/m;

/** PM scoreable tables: food-state and preparation signals only (substances live in §7 Dietary Levers). */
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
    const poolBlock =
      extractSectionBody(
        content,
        /### 2\. (?:Core Nutritional Requirements|Shared Biological Pool)/,
        /\n### 3\. /,
      ) ||
      extractSectionBody(content, /### 3\. Shared Biological Pool/, /\n### 4\. /);
    if (poolBlock) {
      for (const line of poolBlock.split("\n")) {
        if (isLegacyFoodToSubstanceLine(line)) {
          pushIssue(
            issues,
            "legacy_food_to_substance",
            `${entityLabel}: §2 must not use food → substance lines`,
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

function validateNoGenericReferenceLabels(content, issues, { entityLabel }) {
  if (/— Supporting Study\]/i.test(content)) {
    pushIssue(
      issues,
      "generic_reference_label",
      `${entityLabel}: replace generic "Supporting Study" reference labels with descriptive topics per system/brs-citation-reference-standard.md`,
    );
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
          if (/^fm\d+$/i.test(entry)) {
            scanFmFolder(path.join(systemDir, entry));
          }
        }
        if (kind === "kc") {
          const kcDir = path.join(systemDir, "kc");
          if (fs.existsSync(kcDir) && fs.statSync(kcDir).isDirectory()) {
            for (const f of fs.readdirSync(kcDir)) {
              if (f.endsWith(".mdx") || f.endsWith(".md")) out.push(path.join(kcDir, f));
            }
          }
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

/** Resolve `/docs/biological-targets/...` href to MDX path under repo root. */
export function resolveMechanismMdxFromHref(href, rootDir) {
  if (!href || typeof href !== "string") return null;
  const rel = href
    .replace(/^\/docs\/biological-targets\//, "")
    .replace(/\.mdx?$/i, "");
  if (!rel) return null;
  return path.join(rootDir, "docs/biological-targets", `${rel}.mdx`);
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

function extractInterventionSectionBody(content) {
  const m = content.match(INTERVENTION_SUMMARY_HEADING) || content.match(LEGACY_INTERVENTION_BREAKDOWN_HEADING);
  if (!m || m.index === undefined) return null;
  const start = m.index;
  const after = content.slice(start);
  const next = after.slice(1).search(NEXT_INTEGER_SECTION_HEADING);
  const end = next === -1 ? content.length : start + 1 + next;
  return { block: content.slice(start, end), isSummary: INTERVENTION_SUMMARY_HEADING.test(m[0]) };
}

function extractLeversSectionBody(content) {
  const m = content.match(LEVERS_SECTION_HEADING);
  if (!m || m.index === undefined) return null;
  const start = m.index;
  const after = content.slice(start);
  const next = after.slice(1).search(NEXT_INTEGER_SECTION_HEADING);
  const end = next === -1 ? content.length : start + 1 + next;
  return { block: content.slice(start, end) };
}

function validateInterventionProfileInLevers(leversBlock, issues, { entityLabel, dominance }) {
  if (!/^###\s+Intervention Profile\s*$/m.test(leversBlock)) {
    pushIssue(
      issues,
      "missing_intervention_profile",
      `${entityLabel}: §4 Levers must include ### Intervention Profile (visible) above dropdowns`,
    );
  }
  if (!/\*\*Intervention Dominance:\*\*/i.test(leversBlock)) {
    pushIssue(
      issues,
      "missing_intervention_dominance_line",
      `${entityLabel}: §4 Intervention Profile must include **Intervention Dominance:**`,
    );
  }
  if (/\*\*Coverage Timing:\*\*/i.test(leversBlock)) {
    pushIssue(
      issues,
      "forbidden_coverage_timing_in_summary",
      `${entityLabel}: §4 Intervention Profile must not include Coverage Timing`,
    );
  }
  const detailsIdx = leversBlock.search(HAS_DROPDOWN_RE);
  const profileIdx = leversBlock.search(/###\s+Intervention Profile/i);
  if (detailsIdx !== -1 && profileIdx !== -1 && profileIdx > detailsIdx) {
    pushIssue(
      issues,
      "intervention_profile_placement",
      `${entityLabel}: §4 Intervention Profile must appear above 4.1 / 4.2 dropdowns`,
    );
  }
  if (dominance) {
    const lineMatch = leversBlock.match(/\*\*Intervention Dominance:\*\*\s*(.+)/);
    if (lineMatch && lineMatch[1].trim() !== String(dominance).trim()) {
      pushIssue(
        issues,
        "intervention_dominance_mismatch",
        `${entityLabel}: §4 Intervention Dominance should match front matter intervention_dominance`,
      );
    }
  }
}

const EVIDENCE_TIER_LABEL_RE =
  /\(Evidence:\s*(Human Outcome|Human Mechanistic|Animal Mechanistic|Cellular \/ Molecular)\)/;

function validateInterventionSummaryStructure(block, issues, { entityLabel }) {
  if (!/^###\s+Intervention Profile\s*$/m.test(block)) {
    pushIssue(
      issues,
      "missing_intervention_profile",
      `${entityLabel}: §3 Intervention Summary must include ### Intervention Profile (visible)`,
    );
  }
  if (!/^###\s+Foundational Levers\s*$/m.test(block)) {
    pushIssue(
      issues,
      "missing_foundational_levers",
      `${entityLabel}: §3 Intervention Summary must include ### Foundational Levers (visible)`,
    );
  }
  for (const title of ["Supporting Levers", "Complementary Levers"]) {
    const hubRe = new RegExp(
      `data-brs-fm-hub[\\s\\S]*?<strong>${title}</strong>[\\s\\S]*?<div class="brs-fm-hub-panel" hidden>\\s*\\n\\n([\\s\\S]*?)</div>`,
      "i",
    );
    const detailsRe = new RegExp(
      `<details>\\s*<summary><strong>${title}</strong></summary>([\\s\\S]*?)</details>`,
      "i",
    );
    const match = block.match(hubRe) || block.match(detailsRe);
    if (!match) continue;
    const inner = match[1]
      .trim()
      .replace(/^-\s*/, "")
      .trim();
    if (!inner || /^None listed$/i.test(inner)) {
      pushIssue(
        issues,
        "empty_intervention_tier_details",
        `${entityLabel}: omit <details> for ${title} when empty — do not render "- None listed" inside a dropdown`,
      );
    }
  }
  if (
    /^##\s+3\.\s+Intervention Summary\s*[\s\S]*?###\s+Foundational Levers\s*[\s\S]*?(?:<details>|data-brs-fm-hub)/m.test(
      block,
    )
  ) {
    const beforeDetails = block.split(HAS_DROPDOWN_RE)[0];
    if (HAS_DROPDOWN_RE.test(beforeDetails.replace(/^##\s+3\.\s+Intervention Summary\s*/m, ""))) {
      pushIssue(
        issues,
        "intervention_summary_layout",
        `${entityLabel}: only Supporting Levers and below may use <details> in §3; Intervention Profile and Foundational Levers must stay visible`,
      );
    }
  }
  const LEGACY_TIER_LABEL_RE =
    /\((Human Outcome|Human Mechanistic|Animal Mechanistic|Cellular \/ Molecular)\)/;
  for (const line of block.split("\n")) {
    const bullet = line.trim();
    if (!bullet.startsWith("- ")) continue;
    if (LEGACY_TIER_LABEL_RE.test(bullet) && !EVIDENCE_TIER_LABEL_RE.test(bullet)) {
      pushIssue(
        issues,
        "intervention_lever_evidence_format",
        `${entityLabel}: §3 lever bullets must use (Evidence: <tier>) — see system/pm-intervention-summary-standard.md`,
      );
      break;
    }
    if (/\[[^\]]+ et al\./.test(bullet) && !EVIDENCE_TIER_LABEL_RE.test(bullet)) {
      pushIssue(
        issues,
        "intervention_lever_missing_evidence",
        `${entityLabel}: cited §3 lever bullets must include (Evidence: <tier>) before the citation`,
      );
      break;
    }
  }
}

function validateInterventionBreakdown(data, content, issues, { entityLabel, required, forbidBodySection = false }) {
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
    const hasSummary = INTERVENTION_SUMMARY_HEADING.test(content);
    const hasLegacy = LEGACY_INTERVENTION_BREAKDOWN_HEADING.test(content);
    const hasLevers = LEVERS_SECTION_HEADING.test(content);
    if (!forbidBodySection && !hasSummary && !hasLegacy && !hasLevers) {
      pushIssue(
        issues,
        "missing_intervention_section",
        `${entityLabel}: published body must include "## 4. Levers" with ### Intervention Profile`,
      );
    }
  } else if (fmValue && !INTERVENTION_BREAKDOWN_VALUES.has(String(fmValue).trim())) {
    pushIssue(
      issues,
      "invalid_intervention_breakdown",
      `${entityLabel}: intervention_breakdown must be one of the five allowed semantic values`,
    );
  }

  const dominance = data.intervention_dominance;
  if (dominance && !INTERVENTION_DOMINANCE_VALUES.has(String(dominance).trim())) {
    pushIssue(
      issues,
      "invalid_intervention_dominance",
      `${entityLabel}: intervention_dominance must be a recognized dominance value (Diet-Dominant, Diet/Lifestyle-Combined, Lifestyle-Dominant, or legacy Diet-Supported / Mixed)`,
    );
  }

  if (forbidBodySection && (ANY_INTERVENTION_SECTION_HEADING.test(content))) {
    pushIssue(
      issues,
      "forbidden_intervention_section",
      `${entityLabel}: FM pages must not include a public "## N. Intervention Summary" or Intervention Breakdown body section`,
    );
  }

  const leversExtracted = extractLeversSectionBody(content);
  if (leversExtracted && !forbidBodySection) {
    validateInterventionProfileInLevers(leversExtracted.block, issues, {
      entityLabel,
      dominance: data.intervention_dominance,
    });
    if (ANY_INTERVENTION_SECTION_HEADING.test(content)) {
      pushIssue(
        issues,
        "legacy_intervention_section",
        `${entityLabel}: retire standalone Intervention Summary/Breakdown; use §4 Levers Intervention Profile only`,
      );
    }
  }

  const extracted = extractInterventionSectionBody(content);
  if (!extracted || forbidBodySection || leversExtracted) return;

  const { block, isSummary } = extracted;
  for (const re of FORBIDDEN_INTERVENTION_LABELS) {
    if (re.test(block)) {
      pushIssue(
        issues,
        "forbidden_timing_intervention_label",
        `${entityLabel}: Intervention section must not use timing-as-modulation labels`,
      );
      break;
    }
  }

  if (isSummary) {
    if (/References Supporting Intervention Summary/i.test(block)) {
      pushIssue(
        issues,
        "forbidden_intervention_summary_refs",
        `${entityLabel}: §3 must not include References Supporting Intervention Summary; use page References section only`,
      );
    }
    if (/<summary><strong>Evidence Basis<\/strong><\/summary>/i.test(block)) {
      pushIssue(
        issues,
        "forbidden_evidence_basis_subsection",
        `${entityLabel}: §3 must not include an Evidence Basis subsection; qualify evidence on each lever with (Evidence:<tier>)`,
      );
    }
    if (/\*\*Coverage Timing:\*\*/i.test(block)) {
      pushIssue(
        issues,
        "forbidden_coverage_timing_in_summary",
        `${entityLabel}: §3 Intervention Profile must not include Coverage Timing`,
      );
    }
    validateInterventionSummaryStructure(block, issues, { entityLabel });
    return;
  }

  if (/Category:\s*SM-/i.test(block) || /Use case:/i.test(block)) {
    pushIssue(
      issues,
      "sm_category_in_body",
      `${entityLabel}: legacy §3 Intervention Breakdown must not include Category or Use case (front matter only)`,
    );
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
  if (evSub !== 4 && /Integrated FM Narrative/.test(mechanistic.title)) {
    pushIssue(
      issues,
      "fm_evidence_highlights_subsection",
      `${entityLabel}: on FM pages use ### 4.4 Evidence Highlights (§4.3 is Suboptimal Function & Its Effects)`,
    );
  }
}

/** FM synthesis contract: no intervention sections; §5 Connected Mechanisms. PM links live in §4.1 only. */
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
        `${entityLabel}: FM pages must not include "## N. ${title}" — PM links belong in §4.1; interventions belong on PM pages`,
      );
    }
  }
  for (const { match, label } of FM_FORBIDDEN_INDEX_SECTIONS) {
    const hit = sections.find((s) => s.type === "major" && match(s.title));
    if (hit) {
      pushIssue(
        issues,
        "fm_redundant_index_section",
        `${entityLabel}: remove ## ${hit.level}. ${label} — use §4.1 integrated narrative instead`,
      );
    }
  }
  if (/^### 6\.[1234]/m.test(content)) {
    pushIssue(
      issues,
      "fm_legacy_underlying_subsections",
      `${entityLabel}: remove legacy §6.x rollups; use §4 integrated narrative and ## 5. Connected Mechanisms`,
    );
  }
  const brs = sections.find((s) => s.title.startsWith("Connected Mechanisms"));
  if (!brs) {
    pushIssue(issues, "fm_missing_brs_links", `${entityLabel}: FM pages must include ## 5. Connected Mechanisms`);
  } else if (brs.level !== 5) {
    pushIssue(issues, "fm_brs_links_numbering", `${entityLabel}: Connected Mechanisms must be ## 5. Connected Mechanisms`);
  } else {
    const brsStart = content.indexOf(brs.line);
    const refsSection = sections.find((s) => s.title.startsWith("References"));
    const brsEnd =
      refsSection && refsSection.level === 6
        ? content.indexOf(refsSection.line, brsStart + 1)
        : content.length;
    const brsBlock = content.slice(brsStart, brsEnd);
    const linkBullets = brsBlock.match(/^- \[[^\]]+\]\([^)]+\).*$/gm) || [];
    for (const bullet of linkBullets) {
      if (
        /\/docs\/biological-targets\/(?:neurotransmitter-regulation|inflammation-oxidative-stress|mitochondrial-function-bioenergetics|gut-brain-axis-enteric-nervous-system|metabolic-neuroendocrine-stress)(?:\)|$)/.test(
          bullet,
        )
      ) {
        pushIssue(
          issues,
          "fm_connected_mechanism_hub_link",
          `${entityLabel}: Connected Mechanisms must link specific PM/FM pages, not BRS hub pages`,
        );
        break;
      }
    }
  }
  const refs = sections.find((s) => s.title.startsWith("References"));
  if (refs && refs.level !== 6) {
    pushIssue(issues, "fm_refs_numbering", `${entityLabel}: References must be ## 6. References`);
  }
  const mechanistic = sections.find((s) => s.title.startsWith("Mechanistic Basis"));
  if (mechanistic && !mechanistic.title.includes("Integrated FM Narrative")) {
    pushIssue(
      issues,
      "fm_mechanistic_basis_title",
      `${entityLabel}: §4 must be "## 4. Mechanistic Basis (Integrated FM Narrative)"`,
    );
  }

  const mbStart = mechanistic ? content.indexOf(mechanistic.line) : -1;
  const nextMajor = sections
    .filter((s) => s.type === "major")
    .find((s) => s.level === 5);
  const mbEnd =
    mbStart === -1 || !nextMajor
      ? content.length
      : content.indexOf(nextMajor.line, mbStart + 1);
  const mbBlock = mbStart === -1 ? "" : content.slice(mbStart, mbEnd);

  if (/^### 4\.2 Supporting Biological Pools \(Key Constraints\)/m.test(mbBlock)) {
    pushIssue(
      issues,
      "fm_forbidden_kc_subsection",
      `${entityLabel}: remove ### 4.2 Supporting Biological Pools (Key Constraints); KC context belongs in front matter and §4.3 Suboptimal Function & Its Effects`,
    );
  }

  for (const [sub, label] of [
    ["4.1 Core Primary Mechanisms", "§4.1 Core Primary Mechanisms"],
    ["4.2 Integrated Functional Narrative", "§4.2 Integrated Functional Narrative"],
    ["4.3 Suboptimal Function & Its Effects", "§4.3 Suboptimal Function & Its Effects"],
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
  if (hasKcs && mechanistic && !/^### 4\.3 Suboptimal Function & Its Effects/m.test(mbBlock)) {
    pushIssue(
      issues,
      "fm_missing_failure_modes",
      `${entityLabel}: §4 must include ### 4.3 Suboptimal Function & Its Effects when key_constraints are linked`,
    );
  }

  if (/^### 4\.4 Evidence Highlights/m.test(mbBlock) && !/^### 4\.3 Suboptimal Function & Its Effects/m.test(mbBlock)) {
    pushIssue(
      issues,
      "fm_missing_failure_modes",
      `${entityLabel}: canonical §4 requires ### 4.3 Suboptimal Function & Its Effects before ### 4.4 Evidence Highlights`,
    );
  }

  if (/^### 4\.3 Evidence Highlights/m.test(mbBlock)) {
    pushIssue(
      issues,
      "fm_evidence_highlights_subsection",
      `${entityLabel}: move Evidence Highlights to ### 4.4 Evidence Highlights (§4.3 is Suboptimal Function & Its Effects)`,
    );
  }

  if (mechanistic && !/^### 4\.4 Evidence Highlights/m.test(mbBlock)) {
    pushIssue(
      issues,
      "fm_missing_evidence_highlights",
      `${entityLabel}: §4 must include ### 4.4 Evidence Highlights before phenome Phase 2 (run npm run mechanisms:migrate-fm-schema)`,
    );
  }
}

/** §1 may use Definition, Mission & Overview (legacy), or Mission, Objective & Biological Context (PM Profile A). */
const SECTION1_TITLES = new Set([
  "Definition",
  "Mission & Overview",
  "Mission, Objective & Biological Context",
]);

const SECTION1_TITLE_ERROR =
  "§1 must be Definition, Mission & Overview (legacy), or Mission, Objective & Biological Context (PM Profile A)";

function isValidSection1Title(title) {
  return SECTION1_TITLES.has(normalizeSectionTitle(title));
}

/** @deprecated use isValidSection1Title */
function isValidFmSection1Title(title) {
  return isValidSection1Title(title);
}

/** FM extended public contract (no Intervention Breakdown body section; no Timing Specific body section). */
const FM_EXTENDED_SECTION_TITLES = [
  "Definition",
  "Mission & Overview",
  PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE,
  FM_PHENOME_CONNECTIONS_SECTION_TITLE,
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

function getLifestyleLeversBlock(content) {
  const lifestyle = parseNumberedSections(content).find((s) => s.title.startsWith("Lifestyle Levers"));
  if (!lifestyle) return null;
  const blockStart = content.indexOf(lifestyle.line);
  const after = content.slice(blockStart);
  const next = after.slice(1).search(NEXT_INTEGER_SECTION_HEADING);
  return next === -1 ? after : after.slice(0, 1 + next);
}

function validatePmLifestyleLeversEvidence(content, issues, { entityLabel }) {
  if (!LEVERS_SECTION_HEADING.test(content)) return;
  const levers = extractLeversSectionBody(content);
  if (!levers) return;
  const lifestyleMatch = levers.block.match(
    /<summary><strong>4\.3 Lifestyle Levers<\/strong><\/summary>\s*\n([\s\S]*?)<\/details>/i,
  );
  const block = lifestyleMatch ? lifestyleMatch[1] : "";
  const bullets = [...block.matchAll(/^- (.+)$/gm)]
    .map((m) => m[1].trim())
    .filter((b) => b && !/^None listed$/i.test(b));
  if (!bullets.length) return;
  for (const bullet of bullets) {
    const hasCitation = /\[[^\]]+,\s*\d{4}\]/.test(bullet);
    if (!hasCitation) continue;
    if (!EVIDENCE_TIER_LABEL_RE.test(bullet)) {
      pushIssue(
        issues,
        "lifestyle_lever_missing_evidence",
        `${entityLabel}: §4.3 Lifestyle Levers bullets must include (Evidence:<tier>)`,
      );
      return;
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
  validateNoGenericReferenceLabels(content, issues, { entityLabel });
  validateSubstanceFoodMappingSections(content, issues, { entityLabel, kind: "fm" });
  validateInterventionBreakdown(data, content, issues, {
    entityLabel,
    required: false,
    forbidBodySection: true,
  });
  validateFmPhenomeFrontMatter(data, issues, { entityLabel });
  validatePhenomeSectionBody(content, issues, { entityLabel, kind: "fm" });

  const pmsCovered = Array.isArray(data.mechanisms_covered) ? data.mechanisms_covered : [];
  if (pmsCovered.length === 1) {
    const pmEntry = pmsCovered[0];
    const pmPath = resolveMechanismMdxFromHref(pmEntry?.href, rootDir);
    if (pmPath && fs.existsSync(pmPath)) {
      const { data: pmData } = readMechanismPage(pmPath);
      validateSinglePmFmOutcomeAlignment(data, pmData, issues, {
        entityLabel,
        childPmId: pmEntry.id || pmData.pm_id || path.basename(pmPath),
      });
    }
  }

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
    if (!isValidSection1Title(t0)) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: ${SECTION1_TITLE_ERROR}`);
    }
    if (t1 !== PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §2 must be ${PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE}`);
    }
    if (t2 !== FM_PHENOME_CONNECTIONS_SECTION_TITLE) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §3 must be ${FM_PHENOME_CONNECTIONS_SECTION_TITLE}`);
    }
    if (numbered.length >= 4 && !t3.startsWith("Mechanistic Basis")) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §4 must be Mechanistic Basis (Integrated FM Narrative)`);
    }
    if (numbered.length >= 5 && !t4.startsWith("Connected Mechanisms")) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §5 must be Connected Mechanisms`);
    }
    if (numbered.length >= 6 && !t5.startsWith("References")) {
      pushIssue(issues, "fm_section_order", `${entityLabel}: §6 must be References`);
    }
  }

  return { kind: "fm", filePath, entityId: data.fm_id, ok: issues.length === 0, issues };
}

function pmUsesExtendedProfile(data, content) {
  if (LEVERS_SECTION_HEADING.test(content)) return true;
  if (/^##\s+\d+\.\s+Underlying Mechanisms and Requirements\s*$/m.test(content)) {
    return false;
  }
  return (
    Boolean(data.intervention_breakdown) ||
    INTERVENTION_SUMMARY_HEADING.test(content) ||
    LEGACY_INTERVENTION_BREAKDOWN_HEADING.test(content)
  );
}

function pmConnectedSectionTitle() {
  return "BRS Pathways and Connections";
}

/** PM extended profile: Intervention Breakdown in body; no Timing Specific section. */
const PM_EXTENDED_AFTER_INTERVENTION = [
  PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE,
  "Mechanistic Basis",
  "BRS Pathways and Connections",
  "Dietary Levers",
  "Lifestyle Levers",
];

function getConnectedMechanismsBlock(content) {
  const connected = parseNumberedSections(content).find(
    (s) =>
      s.title === "BRS Pathways and Connections" ||
      /^Connected BRS[\w()-]+ Mechanisms/.test(s.title) ||
      s.title.startsWith("Connected Mechanisms"),
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

function validatePmHarmonisedSections(content, issues, { entityLabel }) {
  const major = parseNumberedSections(content).filter((s) => s.type === "major");
  const byLevel = new Map(major.map((s) => [s.level, s.title]));
  const connectedTitle = pmConnectedSectionTitle();

  if (byLevel.has(4)) {
    const t4 = String(byLevel.get(4));
    if (t4 !== "Levers") {
      pushIssue(issues, "pm_section4", `${entityLabel}: §4 must be Levers`);
    }
  }
  if (byLevel.has(6)) {
    const t6 = String(byLevel.get(6));
    if (t6 !== connectedTitle) {
      pushIssue(issues, "pm_section6", `${entityLabel}: §6 must be ${connectedTitle}`);
    }
  }
  if (byLevel.has(7) && String(byLevel.get(7)).startsWith("Dietary Levers")) {
    pushIssue(
      issues,
      "pm_legacy_dietary_section",
      `${entityLabel}: retire standalone §7 Dietary Levers; merge into §4 Levers`,
    );
  }
  if (byLevel.has(8) && String(byLevel.get(8)).startsWith("Lifestyle Levers")) {
    pushIssue(
      issues,
      "pm_legacy_lifestyle_section",
      `${entityLabel}: retire standalone §8 Lifestyle Levers; merge into §4.3 Lifestyle Levers`,
    );
  }
  if (/^##\s+\d+\.\s+(Overarching Functional Mechanism|Underlying Mechanisms and Requirements)\s*$/m.test(content)) {
    pushIssue(
      issues,
      "pm_legacy_connected",
      `${entityLabel}: use ## 6. ${connectedTitle} (6.1 BRS Pathways, 6.2 ${PM_SECTION_6_2_TITLE}, 6.3 ${PM_SECTION_6_3_TITLE})`,
    );
  }
  if (/^##\s+7\.\s+Connected Mechanisms\s*$/m.test(content)) {
    pushIssue(
      issues,
      "pm_legacy_section7",
      `${entityLabel}: retire standalone §7 Connected Mechanisms; use §6.2 ${PM_SECTION_6_2_TITLE}`,
    );
  }

  const connectedBlock = getConnectedMechanismsBlock(content);
  if (connectedBlock) {
    const subs = [...connectedBlock.matchAll(/^###\s+6\.(\d+)\s+(.+)$/gm)].map((m) => ({
      title: m[2].trim(),
    }));
    if (subs.length >= 1 && !/BRS Pathways/i.test(subs[0]?.title || "")) {
      pushIssue(issues, "pm_connected_subsections", `${entityLabel}: §6.1 must be BRS Pathways`);
    }
    if (subs.length >= 2 && !new RegExp(PM_SECTION_6_2_TITLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(subs[1]?.title || "")) {
      pushIssue(issues, "pm_connected_subsections", `${entityLabel}: §6.2 must be ${PM_SECTION_6_2_TITLE}`);
    }
    if (subs.length >= 3 && !new RegExp(PM_SECTION_6_3_TITLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(subs[2]?.title || "")) {
      pushIssue(issues, "pm_connected_subsections", `${entityLabel}: §6.3 must be ${PM_SECTION_6_3_TITLE}`);
    }
  }

  const leversExtracted = extractLeversSectionBody(content);
  if (leversExtracted) return;

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
  validatePmLifestyleLeversEvidence(content, issues, { entityLabel });

  const core = sections.filter(
    (s) =>
      s.type === "major" &&
      !/References/i.test(s.title) &&
      !/Scoreable Inputs & Modulation Signals/i.test(s.title) &&
      !/Scoreable Food-State Inputs/i.test(s.title),
  );
  if (core.length >= 4) {
    const titles = core.slice(0, 7).map((s) => normalizeSectionTitle(s.title));
    if (!isValidSection1Title(titles[0])) {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: ${SECTION1_TITLE_ERROR}`);
    }
    if (titles[1] !== PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE) {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §2 must be ${PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE}`);
    }
    if (titles[2] !== PM_PHENOME_SECTION_TITLE) {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §3 must be ${PM_PHENOME_SECTION_TITLE}`);
    }
    if (titles[3] !== "Levers") {
      pushIssue(issues, "overlay_section_order", `${entityLabel}: §4 must be Levers`);
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

  const extracted = extractInterventionSectionBody(content);
  if (!extracted) return;
  const { block } = extracted;
  if (/Category:\s*SM-/i.test(block) || /Use case:/i.test(block)) {
    pushIssue(
      issues,
      "sm_category_in_body",
      `${entityLabel}: §3 must not include Category or Use case in the public body (front matter only)`,
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
  validateNoGenericReferenceLabels(content, issues, { entityLabel });
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
  validateNoGenericReferenceLabels(content, issues, { entityLabel });
  validateSubstanceFoodMappingSections(content, issues, { entityLabel, kind: "kc" });

  if (/### 6\. Constraint Stressors \/ Burdens/m.test(content)) {
    pushIssue(
      issues,
      "kc_stressor_section_removed",
      `${entityLabel}: remove ### 6. Constraint Stressors / Burdens — migrate stressors to linked FM §4.3 Suboptimal Function & Its Effects`,
    );
  }

  if (/### 2\. Core Nutritional Requirements/m.test(content)) {
    if (!/### 3\. Evidence Base/m.test(content)) {
      pushIssue(issues, "kc_profile_a_sections", `${entityLabel}: Profile A KC must include ### 3. Evidence Base`);
    }
    if (!/### 4\. Emerging Biological Supports/m.test(content)) {
      pushIssue(
        issues,
        "kc_profile_a_sections",
        `${entityLabel}: Profile A KC must include ### 4. Emerging Biological Supports`,
      );
    }
    if (!/### 5\. Connected Mechanisms/m.test(content)) {
      pushIssue(
        issues,
        "kc_profile_a_sections",
        `${entityLabel}: Profile A KC must include ### 5. Connected Mechanisms`,
      );
    }
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
  validateNoGenericReferenceLabels(content, issues, { entityLabel });
  validateSubstanceFoodMappingSections(content, issues, { entityLabel, kind: "sm" });
  validatePmPhenomeFrontMatter(data, issues, { entityLabel });
  validatePhenomeSectionBody(content, issues, { entityLabel, kind: "sm" });
  validatePmExtendedProfile(data, content, issues, { entityLabel });
  validateSmCategoryFrontMatter(data, content, issues, { entityLabel });
  validateConnectedEntityList(data, "connected_pms", issues, { entityLabel });
  validateConnectedEntityList(data, "connected_fms", issues, { entityLabel });
  validateConnectedEntityList(data, "connected_kcs", issues, { entityLabel, allowEmpty: true });

  if (LEVERS_SECTION_HEADING.test(content)) {
    validatePmHarmonisedSections(content, issues, { entityLabel, parentBrs: data.parent_brs });
  } else {
    validateUnderlyingCofactorsBeforeKcs(content, issues, { entityLabel, expectConnectedPmFm: true });
  }

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
