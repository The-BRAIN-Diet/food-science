#!/usr/bin/env node
/**
 * Validate FM / PM / KC mechanism pages (JS layer).
 *
 * Usage:
 *   npm run mechanisms:validate
 *   npm run mechanisms:validate -- --skip-cue
 *
 * CUE validation (fm.cue / pm.cue / kc.cue) is not yet wired; --skip-cue is accepted for forward compatibility.
 */

import { auditAllPmPages } from "./lib/pm-mechanistic-basis.mjs";
import { validateAllMechanismPages } from "./lib/mechanism-page-validation.mjs";

const skipCue = process.argv.includes("--skip-cue");

function main() {
  let failed = false;

  const { fm, pm } = validateAllMechanismPages();
  const fmBad = fm.filter((r) => !r.ok);
  const pmBad = pm.filter((r) => !r.ok);

  console.log("JS mechanism validation");
  console.log(`  FM pages scanned: ${fm.length}`);
  if (fmBad.length === 0) {
    console.log("  FM contract (timing_specific, section order): passed");
  } else {
    failed = true;
    console.log(`  FM contract: FAILED (${fmBad.length})`);
    for (const r of fmBad) {
      for (const i of r.issues) {
        console.log(`    - ${r.entityId || r.filePath}: [${i.code}] ${i.message}`);
      }
    }
  }

  console.log(`  PM pages scanned: ${pm.length}`);
  if (pmBad.length === 0) {
    console.log("  PM contract (timing_specific, section order): passed");
  } else {
    failed = true;
    console.log(`  PM contract: FAILED (${pmBad.length})`);
    for (const r of pmBad) {
      for (const i of r.issues) {
        console.log(`    - ${r.entityId || r.filePath}: [${i.code}] ${i.message}`);
      }
    }
  }

  const pmAudits = auditAllPmPages();
  const pmBasisBad = pmAudits.filter((a) => !a.ok);

  const pmBasisWaived = pmAudits.filter((a) => a.waived);
  if (pmBasisBad.length === 0) {
    console.log("  PM Mechanistic Basis (§5 / numbered Mechanistic Basis): passed");
    if (pmBasisWaived.length) {
      console.log(
        `    (${pmBasisWaived.length} deferred via mechanistic_authoring_required: true)`,
      );
    }
  } else {
    failed = true;
    console.log(
      `  PM Mechanistic Basis: FAILED (${pmBasisBad.length} missing or placeholder; set mechanistic_authoring_required: true to defer)`,
    );
    for (const a of pmBasisBad) {
      const sec = a.sectionNum != null ? `§${a.sectionNum}` : "§?";
      console.log(`    - ${a.pm_id} (${sec}): ${a.reason}`);
    }
    console.log(
      "  Hint: run spreadsheet conversion with mechanistic_detail blocks, or:",
    );
    console.log(
      "        node scripts/generate-pm-mechanistic-basis.mjs --spreadsheet <pm-rows.json>",
    );
  }

  if (!skipCue) {
    console.log("  FM CUE validation: skipped (cue/brain/fm.cue not present)");
    console.log("  PM CUE validation: skipped (cue/brain/pm.cue not present)");
    console.log("  KC CUE validation: skipped (cue/brain/kc.cue not present)");
  } else {
    console.log("  CUE validation: skipped (--skip-cue)");
  }

  process.exit(failed ? 1 : 0);
}

main();
