#!/usr/bin/env node
/**
 * Fail if any docs link to BRAIN-Diet-References#citationKey where citationKey is absent from BRAIN-diet.bib.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { toJSON } from "@orcid/bibtex-parse-js";

const ROOT = process.cwd();
const BIB_PATHS = [
  path.join(ROOT, "static/bibtex/BRAIN-diet.bib"),
  path.join(ROOT, "static/bibtex/BRAIN-diet-sources.bib"),
];
const DOCS_DIR = path.join(ROOT, "docs");

const bib = toJSON(BIB_PATHS.filter((bibPath) => fs.existsSync(bibPath)).map((bibPath) => fs.readFileSync(bibPath, "utf8")).join("\n"));
const bibKeys = new Set(bib.map((e) => e.key || e.citationKey));

const cited = [
  ...new Set(
    execSync(`grep -roh "BRAIN-Diet-References#[a-z0-9_-]*" "${DOCS_DIR}" --include="*.md" --include="*.mdx"`, {
      encoding: "utf8",
    })
      .match(/#([a-z0-9_-]+)/g)
      ?.map((s) => s.slice(1))
      .filter((k) => k && k !== "citation") ?? [],
  ),
];

const missing = cited.filter((k) => !bibKeys.has(k)).sort();

if (missing.length) {
  console.error(`Missing ${missing.length} citation key(s) in the BRAIN Diet bibliography:\n`);
  for (const k of missing) {
    console.error(`  - ${k}`);
  }
  process.exit(1);
}

console.log(`All ${cited.length} cited keys are present in the BRAIN Diet bibliography (${bibKeys.size} total entries).`);
