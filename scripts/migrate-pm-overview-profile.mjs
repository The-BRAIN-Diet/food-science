#!/usr/bin/env node
/**
 * Roll out PM §1 Mission & Overview profile (~65–75 word paragraph + 3 scannable bullets).
 * Skips BRS5 PMs (hand-authored). Uses translational data + BRS1_3_MISSIONS.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BRS1_UPDATES } from "./data/brs1-translational.mjs";
import { BRS1_3_MISSIONS } from "./data/brs1-3-missions.mjs";
import { ENHANCEMENTS } from "./data/translational-enhancements.mjs";
import { CANONICAL_PM_OVERVIEWS } from "./data/pm-overview-canonical.mjs";
import brs2Brsx from "./data/brs2-brsx-translational.json" with { type: "json" };
import brs3to6 from "./data/brs3-brs6-translational.json" with { type: "json" };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs/biological-targets");

const SKIP_PREFIXES = ["brs5/"];

/** @type {Record<string, { mission?: string, translational?: string, bullets?: string[] }>} */
const CONFIG = {};

function mergeEntry(rel, data) {
  if (!/-pm\d+-/i.test(rel)) return;
  CONFIG[rel] = { ...CONFIG[rel], ...data };
}

for (const [rel, data] of Object.entries(BRS1_UPDATES)) mergeEntry(rel, data);
for (const entry of brs2Brsx) mergeEntry(entry.path, entry);
for (const entry of brs3to6) mergeEntry(entry.path, entry);
for (const [rel, data] of Object.entries(ENHANCEMENTS)) mergeEntry(rel, data);
for (const [rel, data] of Object.entries(CANONICAL_PM_OVERVIEWS)) {
  CONFIG[rel] = { ...CONFIG[rel], ...data };
}

function listPmFiles() {
  const out = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (/\.mdx$/.test(name) && /-pm\d+-/i.test(name)) out.push(full);
    }
  }
  walk(docs);
  return out.sort();
}

function stripBulletSuffix(text) {
  return text
    .replace(/^\*\s*/, "")
    .replace(/\s+—\s+(within|Supporting|supporting)\s+BRS[\w()-]+.*$/i, "")
    .trim();
}

function normalizeBullets(raw) {
  const cleaned = raw
    .map((b) => (b.startsWith("* ") ? stripBulletSuffix(b) : stripBulletSuffix(`* ${b}`)))
    .filter(Boolean);
  while (cleaned.length < 3) {
    cleaned.push("Highlights dietary patterns that support this mechanism over time.");
  }
  return cleaned.slice(0, 3).map((b) => `* ${b}`);
}

function deriveMission(translational, bullets = []) {
  if (bullets.length) {
    const fromBullet = stripBulletSuffix(bullets[0]);
    if (fromBullet.length >= 24 && fromBullet.length <= 180) {
      return ambitionize(fromBullet);
    }
  }
  const first = translational.split(/(?<=[.!?])\s+/)[0]?.trim() || translational;
  if (first.length <= 180) return ambitionize(first);
  return `${first.slice(0, 177).replace(/\s+\S*$/, "")}…`;
}

function ambitionize(sentence) {
  let s = sentence.trim();
  if (/^(Maintain|Limit|Enable|Preserve|Sustain|Regulate|Convert|Shape|Keep|Drive|Build|Clear|Balance|Tune|Shift|Protect|Deliver|Ensure|Contain|Support)\b/i.test(s)) {
    return s.endsWith(".") ? s : `${s}.`;
  }
  s = s
    .replace(/^Helps\s+/i, "Maintain ")
    .replace(/^Supports\s+/i, "Maintain ")
    .replace(/^Influences\s+/i, "Shape ")
    .replace(/^Governs\s+/i, "Maintain ")
    .replace(/^Produces\s+/i, "Maintain production of ")
    .replace(/^Modulates\s+/i, "Maintain ")
    .replace(/^Biotransforms\s+/i, "Enable ");
  return s.endsWith(".") ? s : `${s}.`;
}

function parseFrontMatterScalar(fm, key) {
  const folded = fm.match(new RegExp(`^${key}:\\s*>-\\s*\\n([\\s\\S]*?)(?=\\n\\w|$)`, "m"));
  if (folded) {
    return folded[1]
      .split("\n")
      .map((l) => l.replace(/^\s{2}/, ""))
      .join(" ")
      .trim();
  }
  const quoted = fm.match(new RegExp(`^${key}:\\s*'([^']*)'`, "m"));
  if (quoted) return quoted[1];
  const plain = fm.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return plain?.[1]?.trim() || "";
}

function setYamlFolded(fm, key, value) {
  const block = `${key}: >-\n  ${value.trim().replace(/\n/g, "\n  ")}\n`;
  const foldedRe = new RegExp(`^${key}:\\s*>-\\s*\\n(?:  .*\\n)*`, "m");
  const quotedRe = new RegExp(`^${key}:\\s*(?:'[^']*'|"[^"]*")\\s*\\n`, "m");
  const plainRe = new RegExp(`^${key}:\\s*[^\\n]+\\n`, "m");
  if (foldedRe.test(fm)) return fm.replace(foldedRe, block);
  if (quotedRe.test(fm)) return fm.replace(quotedRe, block);
  if (plainRe.test(fm)) return fm.replace(plainRe, block);
  return fm;
}

function parseSection1(body) {
  const m = body.match(/## 1\. (?:Definition|Mission & Overview)\s*\n\n([\s\S]*?)\n## 2\. /m);
  if (!m) return null;
  const block = m[1];
  const overviewMatch = block.match(/^### Overview\s*\n\n([\s\S]*)$/m);
  const overviewBody = overviewMatch?.[1]?.trim() || block.replace(/^### Mission\s*\n\n[\s\S]*?\n\n/, "");
  const paragraphs = [];
  const bullets = [];
  for (const line of overviewBody.split("\n")) {
    if (line.startsWith("* ")) bullets.push(line);
    else if (line.trim() && !line.startsWith("### ")) paragraphs.push(line.trim());
  }
  return { paragraphs, bullets };
}

function buildSection1({ mission, translational, bullets }) {
  const bulletBlock = normalizeBullets(bullets).join("\n");
  return `## 1. Mission & Overview

### Mission

${mission.trim()}

### Overview

${translational.trim()}

${bulletBlock}

## 2. `;
}

function overviewWordCount(body) {
  const parsed = parseSection1(body);
  if (!parsed?.paragraphs.length) return 0;
  return parsed.paragraphs.join(" ").trim().split(/\s+/).length;
}

const SHALLOW_ONLY = process.argv.includes("--shallow-only");

function migrateFile(absPath) {
  const rel = path.relative(docs, absPath);
  if (SKIP_PREFIXES.some((p) => rel.startsWith(p))) {
    return { rel, status: "skipped-brs5" };
  }

  const raw = fs.readFileSync(absPath, "utf8");
  const fmEnd = raw.indexOf("---", 3);
  let fm = raw.slice(0, fmEnd + 3);
  let body = raw.slice(fmEnd + 3);

  const parsed = parseSection1(body);
  if (!parsed) return { rel, status: "no-section1" };

  const canonical = CANONICAL_PM_OVERVIEWS[rel];
  if (SHALLOW_ONLY && !canonical) {
    return { rel, status: "skipped-not-canonical" };
  }

  const cfg = { ...(CONFIG[rel] ?? {}), ...(canonical ?? {}) };
  const translational =
    cfg.translational?.trim() || parsed.paragraphs.join(" ").trim() || "";
  const bullets =
    cfg.bullets?.length >= 3
      ? cfg.bullets
      : parsed.bullets.length >= 3
        ? parsed.bullets
        : cfg.bullets?.length
          ? cfg.bullets
          : parsed.bullets;

  if (!translational) return { rel, status: "missing-translational" };

  const existingMission = parseFrontMatterScalar(fm, "mission");
  const mission =
    BRS1_3_MISSIONS[rel]?.trim() ||
    cfg.mission?.trim() ||
    (existingMission && existingMission.length >= 20 && existingMission !== translational
      ? ambitionize(existingMission)
      : "") ||
    deriveMission(translational, bullets);

  fm = setYamlFolded(fm, "mission", mission);
  if (/^summary:\s/m.test(fm)) {
    fm = setYamlFolded(fm, "summary", translational);
  }

  body = body.replace(
    /## 1\. (?:Definition|Mission & Overview)\s*\n\n[\s\S]*?\n## 2\. /m,
    buildSection1({ mission, translational, bullets }),
  );

  fs.writeFileSync(absPath, `${fm}${body}`, "utf8");
  return { rel, status: "updated" };
}

const results = listPmFiles().map(migrateFile);
const updated = results.filter((r) => r.status === "updated");
const skipped = results.filter((r) => r.status.startsWith("skipped"));
const failed = results.filter(
  (r) => !["updated", "skipped-brs5"].includes(r.status),
);

console.log(`PM Overview profile migration`);
console.log(`Updated ${updated.length} PM(s); skipped BRS5: ${skipped.length}.`);
if (updated.length) updated.forEach((r) => console.log(`  ✓ ${r.rel}`));
if (failed.length) {
  console.log("Issues:");
  failed.forEach((r) => console.log(`  ✗ ${r.rel} (${r.status})`));
}
