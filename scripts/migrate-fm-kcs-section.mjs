#!/usr/bin/env node
/**
 * Add ## 7. KCs from front matter key_constraints; renumber References to ## 8.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.resolve(process.cwd(), "docs/biological-targets");

function listFmFiles(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) listFmFiles(p, acc);
    else if (ent.name.endsWith(".mdx") && p.includes(`${path.sep}fm${path.sep}`)) acc.push(p);
  }
  return acc;
}

function buildKcSection(kcs) {
  const lines = ["## 7. KCs", ""];
  if (!kcs?.length) {
    lines.push("- None listed");
  } else {
    for (const kc of kcs) {
      if (kc.id && kc.href) {
        const name = kc.name || kc.id;
        lines.push(`- [${kc.id} — ${name}](${kc.href})`);
      }
    }
    if (lines.length === 2) lines.push("- None listed");
  }
  lines.push("");
  return lines.join("\n");
}

let updated = 0;
for (const filePath of listFmFiles(root)) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  if (/^## 7\. KCs\s*$/m.test(content)) continue;

  let body = content;
  if (/^## 8\. References\s*$/m.test(body)) {
    console.warn("Skip (already §8 References):", filePath);
    continue;
  }

  const kcBlock = buildKcSection(data.key_constraints);
  if (!/^## 7\. References\s*$/m.test(body)) {
    console.warn("No ## 7. References:", filePath);
    continue;
  }

  body = body.replace(/^## 7\. References\s*$/m, `${kcBlock}## 8. References`);
  fs.writeFileSync(filePath, matter.stringify(body, data, { lineWidth: 9999 }));
  updated++;
}

console.log(`Updated ${updated} FM pages`);
