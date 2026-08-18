#!/usr/bin/env node
/**
 * Smoke-test the food-page audit automation path (no page edits).
 *
 * Usage: npm run food:audit:smoke
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  SCHEDULE_EPOCH,
  dayIndexFromDate,
  lettersForDate,
  slugsForLetters,
} from "./lib/food-page-letter-schedule.mjs";

const root = process.cwd();
const required = [
  "package.json",
  "docs/foods",
  "scripts/food-page-letter-audit.mjs",
  "scripts/lib/food-page-letter-schedule.mjs",
  "scripts/lib/food-citation-relevance-queue.mjs",
  "scripts/data/food-citation-relevance-queue.json",
  "scripts/lib/food-page-validation.mjs",
  "scripts/run-food-audit-today.sh",
  "scripts/food-audit-try-deliver.sh",
  "scripts/lib/food-page-letter-audit-schema.mjs",
  "scripts/data/food-editorial-audit-records.json",
  "system/food-page-schema.md",
  "system/food-page-letter-audit-schema.md",
  "system/food-page-audit-schedule.md",
  "docs/foods/dark-chocolate.md",
];

let failed = 0;

function ok(label) {
  console.log(`OK  ${label}`);
}
function fail(label, detail) {
  failed += 1;
  console.error(`FAIL ${label}${detail ? ` — ${detail}` : ""}`);
}

for (const rel of required) {
  const abs = path.join(root, rel);
  if (fs.existsSync(abs)) ok(`exists ${rel}`);
  else fail(`exists ${rel}`);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
if (pkg.scripts?.["food:audit:today"]) ok("package.json food:audit:today");
else fail("package.json food:audit:today");
if (pkg.scripts?.["food:audit:schedule"]) ok("package.json food:audit:schedule");
else fail("package.json food:audit:schedule");
if (pkg.scripts?.["food:audit:smoke"]) ok("package.json food:audit:smoke");
else fail("package.json food:audit:smoke");

const when = new Date();
const letters = lettersForDate(when, SCHEDULE_EPOCH);
const day = dayIndexFromDate(when, SCHEDULE_EPOCH) + 1;
const slugs = slugsForLetters("docs/foods", letters);
console.log(`info schedule: epoch ${SCHEDULE_EPOCH} day ${day}/9 letters ${letters.join(",")} (${slugs.length} pages)`);
if (letters.length === 3) ok("today letter batch size");
else fail("today letter batch size", String(letters));

function run(cmd, args, label) {
  const res = spawnSync(cmd, args, {
    cwd: root,
    encoding: "utf8",
    env: process.env,
  });
  if (res.status === 0) {
    ok(label);
    return res.stdout || "";
  }
  fail(label, (res.stderr || res.stdout || `exit ${res.status}`).trim().slice(0, 240));
  return "";
}

run("node", ["scripts/food-page-letter-audit.mjs", "--schedule"], "node --schedule");
run("node", ["scripts/food-page-letter-audit.mjs", "--schema"], "node --schema");
run("npm", ["run", "food:audit:today"], "npm run food:audit:today");
run("bash", ["scripts/run-food-audit-today.sh"], "bash scripts/run-food-audit-today.sh");

// Small forced batch — tooling path, not a claim that every letter group is clean
run(
  "node",
  ["scripts/food-page-letter-audit.mjs", "--letters", "Y"],
  "node --letters Y",
);

// Wrapper resolves repo root from its own path (not process cwd) — intentional for cloud agents
const wrapperAbs = path.join(root, "scripts/run-food-audit-today.sh");
const fromDocs = spawnSync("bash", [wrapperAbs], {
  cwd: path.join(root, "docs"),
  encoding: "utf8",
  env: process.env,
});
if (fromDocs.status === 0 && /preflight: OK/.test(fromDocs.stdout || "")) {
  ok("wrapper works when invoked from docs/ cwd");
} else {
  fail(
    "wrapper works when invoked from docs/ cwd",
    `status=${fromDocs.status} out=${(fromDocs.stdout || fromDocs.stderr || "").trim().slice(0, 200)}`,
  );
}

if (failed) {
  console.error(`\nfood:audit:smoke FAILED (${failed} check(s))`);
  process.exit(1);
}
console.log("\nfood:audit:smoke PASSED");
