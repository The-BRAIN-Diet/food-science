/**
 * FM schema rollout gate — phenome methodology runs only after all FMs have a reviewed §4.2 Evidence Summary.
 */

import fs from "node:fs";
import matter from "gray-matter";
import { listMechanismMdxFiles } from "./mechanism-page-validation.mjs";

export function fmHasEvidenceHighlights(content) {
  return /^### 4\.2 Evidence Summary/m.test(content);
}

export function listFmsMissingEvidenceHighlights(rootDir) {
  return listMechanismMdxFiles(rootDir, "fm").filter((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    return !matter(content).data.fm_evidence_summary || !fmHasEvidenceHighlights(content);
  });
}

export function assertAllFmsHaveEvidenceHighlights(rootDir) {
  const missing = listFmsMissingEvidenceHighlights(rootDir);
  if (!missing.length) return { ok: true, missing: [] };
  return {
    ok: false,
    missing: missing.map((f) => f.replace(`${rootDir}/`, "")),
  };
}
