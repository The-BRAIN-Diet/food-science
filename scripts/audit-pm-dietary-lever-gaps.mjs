#!/usr/bin/env node
/**
 * Audit legacy §3 Dietary Levers against dietary_lever_atoms (PM8 exemplar).
 * Usage: node scripts/audit-pm-dietary-lever-gaps.mjs --pm BRS1-FM4-PM8
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";
import { auditLegacyLeverGaps, resolveAllLeverAtoms } from "./lib/dietary-lever-atoms.mjs";

const root = process.cwd();
const pmArg = process.argv.includes("--pm") ? process.argv[process.argv.indexOf("--pm") + 1] : "BRS1-FM4-PM8";

for (const filePath of listMechanismMdxFiles(root, "pm")) {
  const { data, content } = readMechanismPage(filePath);
  if (String(data.pm_id) !== pmArg) continue;
  console.log(`# ${data.pm_id} — §3 Dietary Lever gap audit\n`);
  console.log("## Resolved lever atoms (PM evidence → lever projection)\n");
  for (const atom of resolveAllLeverAtoms(data)) {
    console.log(
      `- **${atom.input}** (${atom.atom_id}) — refs [${atom.reference_numbers.join(", ")}]; addressability: ${atom.dietary_addressability ?? "unadjudicated"}; ceiling: ${atom.claim_ceiling}`,
    );
  }
  console.log("\n## Legacy §3 / front matter gaps\n");
  console.log("| Legacy | PM atom | Addressability | Evidence | Leap |");
  console.log("|--------|---------|----------------|----------|------|");
  for (const g of auditLegacyLeverGaps(data, content)) {
    console.log(
      `| ${g.legacy_line.replace(/\|/g, "\\|")} | ${g.resolves_to_pm_atom ?? "—"} | ${g.dietary_addressability} | ${g.evidence_source_present ? "yes" : "no"} | ${g.unsupported_leap ?? "—"} |`,
    );
  }
  process.exit(0);
}
console.error(`PM not found: ${pmArg}`);
process.exit(1);
