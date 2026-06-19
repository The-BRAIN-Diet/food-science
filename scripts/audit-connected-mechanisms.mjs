#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function getSection(content, re) {
  const m = content.match(re);
  return m ? m[1].trim() : null;
}

const pmStats = { none: [], hasLinks: [], noSection: [] };
for (const f of listMechanismMdxFiles(root, "pm")) {
  const { content } = readMechanismPage(f);
  const block = getSection(
    content,
    /### 6\.2 Connected BRS Mechanisms\s*\n([\s\S]*?)(?=\n### 6\.3|\n## \d+\.|$)/,
  );
  const rel = path.relative(root, f);
  if (!block) pmStats.noSection.push(rel);
  else if (/^- None listed\s*$/m.test(block.trim())) pmStats.none.push(rel);
  else if (/\]\(\/docs\/biological-targets\//.test(block)) pmStats.hasLinks.push(rel);
}

const fmStats = { none: [], hasLinks: [] };
for (const f of listMechanismMdxFiles(root, "fm")) {
  const { content } = readMechanismPage(f);
  const block = getSection(
    content,
    /## 5\. Connected Mechanisms\s*\n([\s\S]*?)(?=\n## 6\.|\n## \d+\. References|$)/,
  );
  const rel = path.relative(root, f);
  if (!block || /^- None listed\s*$/m.test(block.trim())) fmStats.none.push(rel);
  else if (/\]\(\/docs\/biological-targets\//.test(block)) fmStats.hasLinks.push(rel);
}

console.log("PM §6.2 still empty:", pmStats.none.length);
pmStats.none.forEach((f) => console.log(" ", f));
console.log("PM §6.2 no section:", pmStats.noSection.length);
pmStats.noSection.forEach((f) => console.log(" ", f));
console.log("FM §5 still empty:", fmStats.none.length);
fmStats.none.forEach((f) => console.log(" ", f));
