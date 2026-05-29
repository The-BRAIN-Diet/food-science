#!/usr/bin/env node
/**
 * Swap §5.1 KCs ↔ §5.2 Cofactors and Supporting Inputs on PM pages (PM1-style underlying section).
 * Updates §5.2 cofactor cross-refs in narrative to §5.1.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PM_DIR = path.join(ROOT, "docs/biological-targets");

function listPmFiles() {
  const out = [];
  for (const brs of fs.readdirSync(PM_DIR)) {
    const dir = path.join(PM_DIR, brs, "pm");
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".mdx")) out.push(path.join(dir, f));
    }
  }
  return out.sort();
}

function extractSubsections(block, parentNum) {
  const re = new RegExp(`^### ${parentNum}\\.(\\d+) ([^\n]+)$`, "gm");
  const matches = [...block.matchAll(re)];
  if (matches.length === 0) return null;
  const subs = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const start = m.index;
    const end = i + 1 < matches.length ? matches[i + 1].index : block.length;
    subs.push({
      num: m[1],
      title: m[2].trim(),
      body: block.slice(start, end).trimEnd(),
    });
  }
  return subs;
}

function swapPmFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const underMatch = content.match(/^## (\d+)\. Underlying Mechanisms and Requirements\s*$/m);
  if (!underMatch || underMatch.index === undefined) return { filePath, changed: false, reason: "no_underlying" };

  const parentNum = underMatch[1];
  const start = underMatch.index;
  const after = content.slice(start);
  const nextMajor = after.slice(1).search(/^## \d+\. /m);
  const end = nextMajor === -1 ? content.length : start + 1 + nextMajor;
  const block = content.slice(start, end);

  const subs = extractSubsections(block, parentNum);
  if (!subs || subs.length < 2) return { filePath, changed: false, reason: "few_subsections" };

  const kc = subs.find((s) => /KCs/i.test(s.title));
  const cof = subs.find((s) => /Cofactors and Supporting Inputs/i.test(s.title));
  if (!kc || !cof) return { filePath, changed: false, reason: "no_kc_or_cof" };

  const rest = subs.filter((s) => s !== kc && s !== cof);
  const newOrder = [cof, kc, ...rest];
  if (subs[0] === cof && subs[1] === kc) {
    return { filePath, changed: false, reason: "already_correct" };
  }

  const renum = newOrder.map((s, i) => {
    const newNum = i + 1;
    const title = s.title;
    const inner = s.body.replace(/^### \d+\.\d+ [^\n]+\n?/, "").trimEnd();
    return `### ${parentNum}.${newNum} ${title}\n\n${inner}`.trimEnd();
  });

  const newBlock = `## ${parentNum}. Underlying Mechanisms and Requirements\n\n${renum.join("\n\n")}\n\n`;
  const newContent = content.slice(0, start) + newBlock + content.slice(end).replace(/^\n+/, "");
  if (newContent === content) return { filePath, changed: false, reason: "unchanged" };

  let final = newContent;
  final = final.replace(/\(§5\.2\)/g, "(§5.1)");
  final = final.replace(/see §5\.2/g, "see §5.1");
  final = final.replace(/under §5\.2/g, "under §5.1");
  final = final.replace(/listed under §5\.2/g, "listed in §5.1");
  final = final.replace(/in §5\.2\./g, "in §5.1.");
  final = final.replace(/context in §5\.2/g, "context in §5.1");

  fs.writeFileSync(filePath, final);
  return { filePath, changed: true, reason: "swapped" };
}

const results = listPmFiles().map(swapPmFile);
const changed = results.filter((r) => r.changed);
console.log(`PM files: ${results.length}, swapped: ${changed.length}`);
for (const r of results.filter((x) => !x.changed && x.reason !== "already_correct")) {
  console.log(`  skip ${path.basename(r.filePath)}: ${r.reason}`);
}
