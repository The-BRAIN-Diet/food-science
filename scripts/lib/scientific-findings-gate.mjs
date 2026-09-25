/**
 * Shared gate for the Scientific Finding layer: model validity plus freshness of
 * the generated section against its durable front-matter source.
 *
 * Kept separate from scientific-findings.mjs so the validator can consume it
 * without creating an import cycle through mechanism-page-validation.mjs.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { listMechanismMdxFiles } from "./mechanism-page-validation.mjs";
import {
  hasScientificFindings,
  renderScientificFindingsSection,
  SCIENTIFIC_FINDINGS_SECTION_TITLE,
  validateScientificFindings,
} from "./scientific-findings.mjs";
import { renderPmPhenomeSectionBody } from "./phenome-relationships.mjs";
import { pmSectionNumbers } from "./pm-section-layout.mjs";

/** Fallback when a PM omits `scientific_findings_intro` — author reader-facing biology per PM. */
export const FINDINGS_INTRO = "";

/** Heading forms the generator owns. */
export const FINDINGS_SUBSECTION_HEADING =
  /^### (\d+)\.1 (Scientific Findings|Evidence Highlights)\s*$/m;

export function findingsIntroFor(data) {
  return String(data.scientific_findings_intro || FINDINGS_INTRO).trim();
}

/** Render the section a page's front matter implies, or null if it has none. */
export function expectedFindingsSection(data, content) {
  if (!hasScientificFindings(data)) return null;
  const match = content.match(FINDINGS_SUBSECTION_HEADING);
  if (!match) return { missingHeading: true };
  return {
    sectionNum: parseInt(match[1], 10),
    heading: match[0],
    block: renderScientificFindingsSection(data, {
      sectionNum: parseInt(match[1], 10),
      subNum: 1,
      intro: findingsIntroFor(data),
    }),
  };
}

/**
 * Validate every PM carrying Scientific Findings and confirm the generated
 * section matches front matter.
 * @returns {{ok: boolean, issues: Array<{code: string, message: string}>, checked: number}}
 */
export function checkScientificFindings(rootDir) {
  const issues = [];
  let checked = 0;

  for (const filePath of listMechanismMdxFiles(rootDir, "pm")) {
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    if (!hasScientificFindings(data)) continue;
    checked += 1;
    const label = String(data.pm_id || path.relative(rootDir, filePath));

    issues.push(...validateScientificFindings(data, [], { entityLabel: label }));

    const expected = expectedFindingsSection(data, content);
    if (expected?.missingHeading) {
      issues.push({
        code: "missing_findings_subsection",
        message: `${label}: has scientific_findings but no "### N.1 ${SCIENTIFIC_FINDINGS_SECTION_TITLE}" subsection to render into`,
      });
      continue;
    }
    if (expected && !content.includes(expected.block)) {
      issues.push({
        code: "stale_findings_section",
        message: `${label}: §${expected.sectionNum}.1 ${SCIENTIFIC_FINDINGS_SECTION_TITLE} is stale — run npm run findings:sync`,
      });
    }

    const { phenome } = pmSectionNumbers(content);
    const expectedPhenome = renderPmPhenomeSectionBody(data.phenome_relationships || [], {
      sectionNum: phenome,
      findingData: data,
    });
    if (!content.includes(expectedPhenome)) {
      issues.push({
        code: "stale_findings_phenome_section",
        message: `${label}: §${phenome} Phenome Connections is stale — run npm run phenome:sync -- --file ${path.relative(rootDir, filePath)} --pm-only`,
      });
    }
  }

  return { ok: issues.length === 0, issues, checked };
}
