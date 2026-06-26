#!/usr/bin/env node
/**
 * Audit (and optionally fix) PM/FM phenome mappings against the
 * Phenome Registry Evidence Hierarchy.
 *
 * Usage:
 *   node scripts/audit-phenome-evidence-hierarchy.mjs
 *   node scripts/audit-phenome-evidence-hierarchy.mjs --fix
 *   node scripts/audit-phenome-evidence-hierarchy.mjs --json
 *
 * @see system/phenome-relationship-schema.md#phenome-assignment-pipeline
 * @see system/phenome-relationship-schema.md#phenome-registry-evidence-hierarchy
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { execSync } from "node:child_process";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";
import {
  auditPhenomeMapping,
  isUpstreamStructuralPm,
  minConfidence,
} from "./lib/phenome-evidence-hierarchy.mjs";
import {
  mergePageReferencesWithPhenome,
  renderFmOutcomeContextSectionBody,
  renderPmPhenomeSectionBody,
} from "./lib/phenome-relationships.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    fix: args.includes("--fix"),
    json: args.includes("--json"),
    dryRun: args.includes("--dry-run"),
  };
}

const FM_PHENOME_SECTION = /^## 3\. Phenome Connections[\s\S]*?(?=\n## 4\. )/m;
const PM_PHENOME_SECTION = /^## 3\. Phenome Connections[\s\S]*?(?=\n## 4\. )/m;

function replaceSection(content, pattern, block) {
  if (!pattern.test(content)) return content;
  return content.replace(pattern, `${block.trimEnd()}\n\n`);
}

function auditPmFile(filePath) {
  const { data } = readMechanismPage(filePath);
  const rel = path.relative(root, filePath);
  const relationships = data.phenome_relationships;
  if (!Array.isArray(relationships) || relationships.length === 0) return null;

  const upstream = isUpstreamStructuralPm({
    title: data.title,
    summary: data.summary,
    pmId: data.pm_id,
  });

  const edges = relationships.map((row, index) =>
    auditPhenomeMapping({
      targetPhenome: row.target_phenome,
      confidence: row.confidence,
      evidenceConfidence: row.evidence_confidence,
      evidenceLevel: row.evidence_level,
      rationale: row.rationale,
      confidenceDisparityNote: row.confidence_disparity_note,
      references: row.references,
      contextLabel: `${data.pm_id || rel} [${index}]`,
      upstreamStructural: upstream,
    }),
  );

  return {
    kind: "pm",
    path: filePath,
    rel,
    id: data.pm_id,
    parentFm: data.parent_fm,
    edges,
  };
}

function auditFmFile(filePath) {
  const { data } = readMechanismPage(filePath);
  const rel = path.relative(root, filePath);
  const outcomes = data.functional_outcome_context;
  if (!Array.isArray(outcomes) || outcomes.length === 0) return null;

  const edges = outcomes.map((row, index) =>
    auditPhenomeMapping({
      targetPhenome: row.outcome_name,
      confidence: row.confidence,
      evidenceConfidence: row.evidence_confidence,
      evidenceLevel: row.evidence_level,
      rationale: row.synthesis,
      confidenceDisparityNote: row.confidence_disparity_note,
      references: row.references,
      contextLabel: `${data.fm_id || rel} [${index}]`,
    }),
  );

  return {
    kind: "fm",
    path: filePath,
    rel,
    id: data.fm_id,
    mechanismsCovered: data.mechanisms_covered,
    edges,
  };
}

function applyPmFixes(filePath, audit) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  let changed = false;

  const nextRelationships = data.phenome_relationships.map((row, index) => {
    const edge = audit.edges[index];
    let next = { ...row };
    let rowChanged = false;

    const levelFix = edge.flags.find((f) => f.code === "evidence_level_overstated");
    if (
      levelFix?.suggestedEvidenceLevel &&
      next.evidence_level !== levelFix.suggestedEvidenceLevel
    ) {
      next.evidence_level = levelFix.suggestedEvidenceLevel;
      rowChanged = true;
    }

    const confFix = edge.flags.find((f) => f.code === "evidence_confidence_exceeds_profile");
    if (
      confFix?.suggestedEvidenceConfidence &&
      next.evidence_confidence !== confFix.suggestedEvidenceConfidence
    ) {
      next.evidence_confidence = confFix.suggestedEvidenceConfidence;
      rowChanged = true;
    }

    if (rowChanged) changed = true;
    return next;
  });

  if (!changed) return { changed: false, path: filePath };

  const nextData = { ...data, phenome_relationships: nextRelationships };
  const phenomeBlock = renderPmPhenomeSectionBody(nextRelationships, { sectionNum: 3 });
  let nextContent = replaceSection(content, PM_PHENOME_SECTION, phenomeBlock);
  const merged = mergePageReferencesWithPhenome(nextData, nextContent, "pm");
  fs.writeFileSync(filePath, matter.stringify(merged.content, merged.data, { lineWidth: 9999 }), "utf8");
  return { changed: true, path: filePath, id: data.pm_id };
}

function applyFmFixes(filePath, audit) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  let changed = false;

  const nextOutcomes = data.functional_outcome_context.map((row, index) => {
    const edge = audit.edges[index];
    const confFix = edge.flags.find((f) => f.code === "evidence_confidence_exceeds_profile");
    if (
      !confFix?.suggestedEvidenceConfidence ||
      row.evidence_confidence === confFix.suggestedEvidenceConfidence
    ) {
      return row;
    }
    changed = true;
    return { ...row, evidence_confidence: confFix.suggestedEvidenceConfidence };
  });

  if (!changed) return { changed: false, path: filePath };

  const nextData = { ...data, functional_outcome_context: nextOutcomes };
  const phenomeBlock = renderFmOutcomeContextSectionBody(nextOutcomes, { sectionNum: 3 });
  let nextContent = replaceSection(content, FM_PHENOME_SECTION, phenomeBlock);
  const merged = mergePageReferencesWithPhenome(nextData, nextContent, "fm");
  fs.writeFileSync(filePath, matter.stringify(merged.content, merged.data, { lineWidth: 9999 }), "utf8");
  return { changed: true, path: filePath, id: data.fm_id };
}

/** After PM fixes, align 1:1 FM confidence to child PM per schema. */
function alignSinglePmFmConfidence() {
  const fmFiles = listMechanismMdxFiles(root, "fm");
  let aligned = 0;

  for (const fmPath of fmFiles) {
    const { data } = readMechanismPage(fmPath);
    const covered = data.mechanisms_covered;
    if (!Array.isArray(covered) || covered.length !== 1) continue;
    if (!Array.isArray(data.functional_outcome_context) || data.functional_outcome_context.length === 0) {
      continue;
    }

    const pmHref = covered[0]?.href;
    if (!pmHref) continue;

    const pmPath = path.join(root, "docs", pmHref.replace(/^\/docs\//, "") + ".mdx");
    if (!fs.existsSync(pmPath)) continue;

    const pmData = readMechanismPage(pmPath).data;
    const pmByPhenome = new Map(
      (pmData.phenome_relationships || []).map((row) => [row.target_phenome, row.confidence]),
    );

    const raw = fs.readFileSync(fmPath, "utf8");
    const parsed = matter(raw);
    let changed = false;

    const nextOutcomes = parsed.data.functional_outcome_context.map((fmRow) => {
      const pmConfidence = pmByPhenome.get(fmRow.outcome_name);
      if (!pmConfidence) return fmRow;
      const alignedConfidence = minConfidence(fmRow.confidence, pmConfidence);
      if (alignedConfidence === fmRow.confidence) return fmRow;
      changed = true;
      return { ...fmRow, confidence: alignedConfidence };
    });

    if (!changed) continue;

    const nextData = { ...parsed.data, functional_outcome_context: nextOutcomes };
    const phenomeBlock = renderFmOutcomeContextSectionBody(nextOutcomes, { sectionNum: 3 });
    let nextContent = replaceSection(parsed.content, FM_PHENOME_SECTION, phenomeBlock);
    const merged = mergePageReferencesWithPhenome(nextData, nextContent, "fm");
    fs.writeFileSync(fmPath, matter.stringify(merged.content, merged.data, { lineWidth: 9999 }), "utf8");
    aligned++;
  }

  return aligned;
}

function printReport(audits) {
  let errorCount = 0;
  let warnCount = 0;

  for (const audit of audits) {
    const edgeFlags = audit.edges.flatMap((e) => e.flags);
    if (edgeFlags.length === 0) continue;

    console.log(`\n${audit.kind.toUpperCase()} ${audit.id || audit.rel}`);
    for (const edge of audit.edges) {
      if (edge.flags.length === 0) continue;
      const levelNote = edge.suggestedEvidenceLevel
        ? `; suggested evidence level ${edge.suggestedEvidenceLevel}`
        : "";
      console.log(
        `  ${edge.targetPhenome} (biology confidence ${edge.confidence}${levelNote})`,
      );
      for (const flag of edge.flags) {
        const prefix =
          flag.severity === "error" ? "    ✗" : flag.severity === "warn" ? "    !" : "    ·";
        console.log(`${prefix} [${flag.code}] ${flag.message}`);
        if (flag.code === "evidence_level_overstated") errorCount++;
        if (flag.code === "missing_inferential_marker") warnCount++;
      }
    }
  }

  console.log("\n--- Summary ---");
  console.log(`  Pages audited: ${audits.length}`);
  console.log(`  Evidence level overstated: ${errorCount}`);
  console.log(`  Missing inferential markers: ${warnCount}`);
}

function main() {
  const { fix, json, dryRun } = parseArgs();

  const pmFiles = listMechanismMdxFiles(root, "pm");
  const fmFiles = listMechanismMdxFiles(root, "fm");

  const pmAudits = pmFiles.map(auditPmFile).filter(Boolean);
  const fmAudits = fmFiles.map(auditFmFile).filter(Boolean);
  const audits = [...pmAudits, ...fmAudits];

  if (json) {
    console.log(JSON.stringify(audits, null, 2));
    return;
  }

  printReport(audits);

  if (!fix) {
    console.log("\nRun with --fix to correct overstated evidence_level values (not biology confidence).");
    return;
  }

  if (dryRun) {
    console.log("\n--dry-run: no files written.");
    return;
  }

  const fixed = [];
  for (const audit of pmAudits) {
    const result = applyPmFixes(audit.path, audit);
    if (result.changed) fixed.push(result);
  }
  for (const audit of fmAudits) {
    const result = applyFmFixes(audit.path, audit);
    if (result.changed) fixed.push(result);
  }

  const aligned = alignSinglePmFmConfidence();

  console.log(`\nFixed ${fixed.length} page(s). 1:1 FM alignments: ${aligned}.`);

  if (fixed.length > 0 || aligned > 0) {
    console.log("Regenerating phenome index…");
    execSync("npm run phenome:index", { cwd: root, stdio: "inherit" });
    execSync("npm run phenome:validate", { cwd: root, stdio: "inherit" });
    execSync("npm run mechanisms:validate", { cwd: root, stdio: "inherit" });
  }
}

main();
