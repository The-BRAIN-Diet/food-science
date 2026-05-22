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

import fs from "node:fs";
import path from "node:path";
import { auditAllPmPages, auditAllSmPages } from "./lib/pm-mechanistic-basis.mjs";
import { validateAllMechanismPages } from "./lib/mechanism-page-validation.mjs";

const skipCue = process.argv.includes("--skip-cue");

function main() {
  let failed = false;

  const { fm, pm, kc, sm } = validateAllMechanismPages();
  const fmBad = fm.filter((r) => !r.ok);
  const pmBad = pm.filter((r) => !r.ok);
  const kcBad = kc.filter((r) => !r.ok);
  const smBad = sm.filter((r) => !r.ok);

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

  console.log(`  KC pages scanned: ${kc.length}`);
  if (kcBad.length === 0) {
    console.log("  KC public copy (no spreadsheet mentions): passed");
  } else {
    failed = true;
    console.log(`  KC public copy: FAILED (${kcBad.length})`);
    for (const r of kcBad) {
      for (const i of r.issues) {
        console.log(`    - ${r.entityId || r.filePath}: [${i.code}] ${i.message}`);
      }
    }
  }

  console.log(`  SM pages scanned: ${sm.length}`);
  if (smBad.length === 0) {
    console.log("  SM contract (PM architecture, category, connected entities): passed");
  } else {
    failed = true;
    console.log(`  SM contract: FAILED (${smBad.length})`);
    for (const r of smBad) {
      for (const i of r.issues) {
        console.log(`    - ${r.entityId || r.filePath}: [${i.code}] ${i.message}`);
      }
    }
  }

  const pmAudits = auditAllPmPages();
  const pmBasisBad = pmAudits.filter((a) => !a.ok);
  const pmBasisWaived = pmAudits.filter((a) => a.waived);
  if (pmBasisBad.length === 0) {
    console.log("  PM Mechanistic Basis (§4 / numbered Mechanistic Basis): passed");
    if (pmBasisWaived.length) {
      console.log(
        `    (${pmBasisWaived.length} PM deferred via mechanistic_authoring_required: true)`,
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

  const smAudits = auditAllSmPages();
  const smBasisBad = smAudits.filter((a) => !a.ok);
  const smBasisWaived = smAudits.filter((a) => a.waived);
  if (smBasisBad.length === 0) {
    console.log("  SM Mechanistic Basis (§4 / numbered Mechanistic Basis): passed");
    if (smBasisWaived.length) {
      console.log(
        `    (${smBasisWaived.length} SM deferred via mechanistic_authoring_required: true)`,
      );
    }
  } else {
    failed = true;
    console.log(
      `  SM Mechanistic Basis: FAILED (${smBasisBad.length} missing or placeholder; set mechanistic_authoring_required: true to defer)`,
    );
    for (const a of smBasisBad) {
      const sec = a.sectionNum != null ? `§${a.sectionNum}` : "§?";
      console.log(`    - ${a.pm_id} (${sec}): ${a.reason}`);
    }
  }

  if (!skipCue) {
    const cueFiles = ["fm.cue", "pm.cue", "kc.cue", "sm.cue", "common.cue"];
    const hasCue = cueFiles.every((f) => fs.existsSync(path.join(process.cwd(), "cue/brain", f)));
    if (hasCue) {
      console.log(
        "  CUE schemas: present (cue/brain/*.cue — substance ← food mapping; JS enforces legacy arrow ban)",
      );
    } else {
      console.log("  CUE validation: incomplete (expected cue/brain/*.cue)");
    }
  } else {
    console.log("  CUE validation: skipped (--skip-cue)");
  }

  process.exit(failed ? 1 : 0);
}

main();
