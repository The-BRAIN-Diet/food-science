/**
 * FM schema rollout gate — phenome methodology runs only after all FMs have §4.4.
 */

import fs from "node:fs";
import { listMechanismMdxFiles } from "./mechanism-page-validation.mjs";

export function fmHasEvidenceHighlights(content) {
  return /^### 4\.4 Evidence Highlights/m.test(content);
}

export function listFmsMissingEvidenceHighlights(rootDir) {
  return listMechanismMdxFiles(rootDir, "fm").filter((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    return !fmHasEvidenceHighlights(content);
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
