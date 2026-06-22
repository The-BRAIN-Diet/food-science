#!/usr/bin/env node
/**
 * Remove §2 Scientific Definition (and hub ## Scientific Definition) sections
 * inserted by migrate-translational-format.mjs; renumber subsequent sections -1.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs/biological-targets");

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (/\.(mdx|md)$/.test(name)) out.push(full);
  }
  return out;
}

function headingLevel(body) {
  return /^### 2\. Scientific Definition/m.test(body) ? "###" : "##";
}

function removeNumberedScientificDefinition(body, level) {
  const hash = level;
  const re = new RegExp(
    `\\n{1,2}${hash} 2\\. Scientific Definition\\s*\\n\\n[\\s\\S]*?(?=\\n${hash} \\d+\\.)`,
    "m",
  );
  if (!re.test(body)) return null;
  return body.replace(re, "\n\n");
}

function derenumberSections(body, level) {
  const hash = level;
  const headings = [...body.matchAll(new RegExp(`^${hash} (\\d+)\\. `, "gm"))].map(
    (m) => Number(m[1]),
  );
  const max = Math.max(0, ...headings);
  let out = body;
  for (let n = 2; n <= max; n++) {
    out = out.replace(
      new RegExp(`^${hash} ${n}\\. `, "gm"),
      `${hash} ${n - 1}. `,
    );
  }
  out = out.replace(/^### (\d+)\.(\d+)/gm, (_, a, b) => {
    const na = Number(a);
    return na >= 2 ? `### ${na - 1}.${b}` : `### ${a}.${b}`;
  });
  out = out.replace(/§(\d+)(?:\.(\d+))?/g, (_, major, minor) => {
    const m = Number(major);
    if (m < 2) return `§${major}${minor ? `.${minor}` : ""}`;
    return minor ? `§${m - 1}.${minor}` : `§${m - 1}`;
  });
  return out;
}

function removeHubScientificDefinition(body) {
  const re = /\n## Scientific Definition\s*\n\n[\s\S]*?(?=\n## |\n<details>)/m;
  if (!re.test(body)) return null;
  return body.replace(re, "\n\n");
}

function processFile(filePath) {
  const rel = path.relative(docs, filePath);
  let raw = fs.readFileSync(filePath, "utf8");
  const fmEnd = raw.indexOf("---", 3);
  const body = raw.slice(fmEnd + 3);
  let newBody = body;
  let changed = false;

  if (/^#{2,3} 2\. Scientific Definition/m.test(body)) {
    const level = headingLevel(body);
    const stripped = removeNumberedScientificDefinition(body, level);
    if (!stripped) return { rel, status: "failed-numbered" };
    newBody = derenumberSections(stripped, level);
    changed = true;
  } else if (/\n## Scientific Definition\s*\n/m.test(body)) {
    const stripped = removeHubScientificDefinition(body);
    if (!stripped) return { rel, status: "failed-hub" };
    newBody = stripped;
    changed = true;
  }

  if (!changed) return { rel, status: "skipped" };

  fs.writeFileSync(filePath, raw.slice(0, fmEnd + 3) + newBody, "utf8");
  return { rel, status: "updated" };
}

const results = walk(docs).map(processFile);
const updated = results.filter((r) => r.status === "updated");
const failed = results.filter((r) => r.status.startsWith("failed"));
console.log(`Removed Scientific Definition from ${updated.length} files.`);
if (failed.length) {
  console.log("Failed:", failed.map((f) => f.rel).join(", "));
}
