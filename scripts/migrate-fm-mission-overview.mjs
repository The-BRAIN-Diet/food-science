#!/usr/bin/env node
/**
 * Migrate FM, PM, and SM pages from §1 Definition to §1 Mission & Overview.
 * Uses mission + translational + bullets from translational data sources.
 * Default scope: BRS1–BRS6 and BRS-X mechanism pages under docs/biological-targets.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BRS1_UPDATES } from "./data/brs1-translational.mjs";
import { BRS1_3_MISSIONS } from "./data/brs1-3-missions.mjs";
import brs2Brsx from "./data/brs2-brsx-translational.json" with { type: "json" };
import brs3to6 from "./data/brs3-brs6-translational.json" with { type: "json" };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs/biological-targets");

/** @type {Record<string, { mission?: string, translational?: string, bullets?: string[] }>} */
const CONFIG = Object.fromEntries(
  [...Object.entries(BRS1_UPDATES), ...brs2Brsx, ...brs3to6].map((entry) => {
    const [pathKey, cfg] = Array.isArray(entry) ? entry : [entry.path, entry];
    return [pathKey, cfg];
  }),
);

const BRS_FILTER = process.argv
  .find((a) => a.startsWith("--brs="))
  ?.slice("--brs=".length)
  ?.split(",")
  .map((s) => s.trim().toLowerCase());

const KIND_FILTER = process.argv
  .find((a) => a.startsWith("--kind="))
  ?.slice("--kind=".length)
  ?.split(",")
  .map((s) => s.trim().toLowerCase());

function pageKind(rel) {
  if (/\/sm\//.test(rel)) return "sm";
  if (/-pm\d+-/i.test(rel)) return "pm";
  if (/\/fm\d+\//.test(rel) && /\/kc\//.test(rel) === false && !/-pm\d+-/i.test(rel)) {
    return "fm";
  }
  return null;
}

function listTargetFiles() {
  const out = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) walk(full);
      else if (/\.mdx$/.test(name)) out.push(full);
    }
  }
  if (fs.existsSync(docs)) walk(docs);
  return out.filter((f) => {
    const rel = path.relative(docs, f);
    const kind = pageKind(rel);
    if (!kind) return false;
    if (BRS_FILTER?.length && !BRS_FILTER.some((b) => rel.startsWith(`${b}/`))) {
      return false;
    }
    if (KIND_FILTER?.length && !KIND_FILTER.includes(kind)) return false;
    return true;
  });
}

const FORCE = process.argv.includes("--force");

function parseSection1Block(body) {
  const re =
    /(## 1\. (?:Definition|Mission & Overview)\s*\n\n)([\s\S]*?)(\n## 2\. )/m;
  const m = body.match(re);
  if (!m) return null;
  const block = m[2].trim();
  if (/^### Mission\s*\n/m.test(block)) {
    const overviewMatch = block.match(/^### Overview\s*\n\n([\s\S]*)$/m);
    const overviewBody = overviewMatch?.[1]?.trim() || "";
    const lines = overviewBody.split("\n");
    const paragraphs = [];
    const bullets = [];
    for (const line of lines) {
      if (line.startsWith("* ")) bullets.push(line);
      else if (line.trim() && !line.startsWith("### ")) paragraphs.push(line.trim());
    }
    return { prefix: m[1], suffix: m[3], paragraphs, bullets, alreadyMigrated: true };
  }

  const lines = block.split("\n");
  const paragraphs = [];
  const bullets = [];
  for (const line of lines) {
    if (line.startsWith("* ")) bullets.push(line);
    else if (line.trim() && !line.startsWith("### ")) paragraphs.push(line.trim());
  }
  return { prefix: m[1], suffix: m[3], paragraphs, bullets, alreadyMigrated: false };
}

function normalizeBullets(bullets) {
  return bullets.map((b) => (b.startsWith("* ") ? b : `* ${b}`));
}

function buildMissionOverviewBlock({ mission, translational, bullets }) {
  const bulletBlock = normalizeBullets(bullets).join("\n");
  return `### Mission

${mission.trim()}

### Overview

${translational.trim()}

${bulletBlock}`;
}

function replaceYamlScalarBlock(fm, key, value) {
  const escaped = value.replace(/'/g, "''");
  const replacement = `${key}: '${escaped}'\n`;
  const foldedRe = new RegExp(`^${key}:\\s*>-\\s*\\n(?:[ \\t].*\\n)*`, "m");
  const quotedRe = new RegExp(`^${key}:\\s*(?:'[^']*'|"[^"]*")\\s*\\n`, "m");
  const plainRe = new RegExp(`^${key}:\\s*[^\\n]+\\n`, "m");
  if (foldedRe.test(fm)) return fm.replace(foldedRe, replacement);
  if (quotedRe.test(fm)) return fm.replace(quotedRe, replacement);
  if (plainRe.test(fm)) return fm.replace(plainRe, replacement);
  return fm;
}

function stripOrphanFoldedLines(fm) {
  return fm.replace(
    /^(mission|summary): '[^']*'\n(?:  [^\n]+\n)+/gm,
    (match) => `${match.split("\n")[0]}\n`,
  );
}

function updateFrontMatter(fm, { mission, translational }) {
  let out = fm;
  if (/^mission:\s/m.test(out)) {
    out = replaceYamlScalarBlock(out, "mission", mission);
  } else {
    out = out.replace(
      /^(parent_brs:\s*[^\n]+\n|pm_id:\s*[^\n]+\n|sm_id:\s*[^\n]+\n|fm_id:\s*[^\n]+\n)/m,
      `$1mission: '${mission.replace(/'/g, "''")}'\n`,
    );
  }
  if (/^summary:\s/m.test(out)) {
    out = replaceYamlScalarBlock(out, "summary", translational);
  }
  return stripOrphanFoldedLines(out);
}

function deriveMissionFromTranslational(translational, bullets = []) {
  const firstSentence = translational.split(/(?<=[.!?])\s+/)[0]?.trim() || translational;

  if (bullets.length) {
    const fromBullet = bullets[0]
      .replace(/^\*\s*/, "")
      .replace(/\s+—\s+(within|Supporting|supporting).*$/i, "")
      .trim();
    if (fromBullet.length >= 24 && fromBullet.length <= 160) return fromBullet;
  }

  if (firstSentence.length <= 160) return firstSentence;

  for (const bp of [" through ", " by ", " so ", " when ", " that "]) {
    const idx = firstSentence.indexOf(bp);
    if (idx > 40 && idx < 140) {
      return `${firstSentence.slice(0, idx).replace(/[,;]$/, "")}.`;
    }
  }

  return `${firstSentence.slice(0, 157).replace(/\s+\S*$/, "")}…`;
}

function resolveMission(rel, cfg, translational, bullets = []) {
  const configured =
    cfg.mission?.trim() ||
    BRS1_3_MISSIONS[rel]?.trim() ||
    "";
  if (configured) return configured;
  return deriveMissionFromTranslational(translational, bullets);
}

function migrateFile(absPath) {
  const rel = path.relative(docs, absPath);
  let raw = fs.readFileSync(absPath, "utf8");
  const fmEnd = raw.indexOf("---", 3);
  let fm = raw.slice(0, fmEnd + 3);
  let body = raw.slice(fmEnd + 3);

  const parsed = parseSection1Block(body);
  if (!parsed) return { rel, status: "no-section1-block" };
  if (parsed.alreadyMigrated && !FORCE) return { rel, status: "already-migrated" };

  const cfg = CONFIG[rel] ?? {};
  const translational =
    cfg.translational?.trim() ||
    parsed.paragraphs.join(" ") ||
    "";
  const bullets =
    cfg.bullets?.length > 0
      ? cfg.bullets
      : parsed.bullets.length > 0
        ? parsed.bullets
        : ["* Supports integrated biological function on this page — within primary BRS."];
  const mission = resolveMission(rel, cfg, translational, bullets);
  const missionText =
    mission.trim() === translational.trim()
      ? deriveMissionFromTranslational(translational, bullets)
      : mission;

  if (!missionText || !translational) {
    return { rel, status: "missing-mission-or-overview" };
  }

  const newBlock = buildMissionOverviewBlock({ mission: missionText, translational, bullets });
  body = body.replace(
    /## 1\. (?:Definition|Mission & Overview)\s*\n\n[\s\S]*?\n## 2\. /m,
    `## 1. Mission & Overview\n\n${newBlock}\n\n## 2. `,
  );
  fm = updateFrontMatter(fm, { mission: missionText, translational });

  fs.writeFileSync(absPath, `${fm}${body}`, "utf8");
  return { rel, status: "updated" };
}

const files = listTargetFiles();
const results = files.map(migrateFile);
const updated = results.filter((r) => r.status === "updated");
const skipped = results.filter((r) => r.status !== "updated");

console.log(`Mission & Overview migration (FM / PM / SM)`);
console.log(`Updated ${updated.length} file(s).`);
if (updated.length) {
  for (const r of updated) console.log(`  ✓ ${r.rel}`);
}
if (skipped.length) {
  console.log(
    "Skipped:",
    skipped.map((s) => `${s.rel} (${s.status})`).join(", "),
  );
}
