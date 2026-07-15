#!/usr/bin/env node
/**
 * Build translational JSON arrays for BRS2/BRS-X and BRS3–BRS6 mechanism pages.
 * Reads MDX Definition sections, applies comprehensive OVERRIDES, writes JSON.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ENHANCEMENTS, FM_FUNCTIONAL_DESCRIPTORS } from "./translational-enhancements.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const docsBase = path.join(root, "docs/biological-targets");

/** Comprehensive OVERRIDES map keyed by relative path under docs/biological-targets */
const OVERRIDES = buildOverridesMap();

export { OVERRIDES };

const GROUPS = [
  {
    name: "brs2-brsx",
    dirs: ["brs2", "brs-x"],
    expected: 27,
    outFile: path.join(__dirname, "brs2-brsx-translational.json"),
  },
  {
    name: "brs3-brs6",
    dirs: ["brs3", "brs4", "brs5", "brs6"],
    expected: 57,
    outFile: path.join(__dirname, "brs3-brs6-translational.json"),
  },
];

function walkMdx(dir, prefix = "") {
  /** @type {string[]} */
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walkMdx(full, rel));
    else if (ent.name.endsWith(".mdx")) out.push(rel);
  }
  return out;
}

function listGroupFiles(dirs) {
  const files = [];
  for (const d of dirs) {
    const abs = path.join(docsBase, d);
    if (fs.existsSync(abs)) files.push(...walkMdx(abs, d));
  }
  return files.sort();
}

function headingLevel(body) {
  return /^### 1\. Definition/m.test(body) ? "###" : "##";
}

/**
 * @param {string} body
 * @returns {{ paragraphs: string[], bullets: string[] } | null}
 */
function extractDefinition(body) {
  const level = headingLevel(body);
  const re = new RegExp(
    `${level} 1\\. Definition\\s*\\n\\n([\\s\\S]*?)(\\n${level} 2\\.)`,
    "m",
  );
  const m = body.match(re);
  if (!m) return null;
  const lines = m[1].trim().split("\n");
  const paragraphs = [];
  const bullets = [];
  for (const line of lines) {
    if (line.startsWith("* ")) bullets.push(line.slice(2).trim());
    else if (line.trim()) paragraphs.push(line.trim());
  }
  return { paragraphs, bullets };
}

function cleanScientific(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;])/g, "$1")
    .trim();
}

function inferBrs(relPath) {
  if (relPath.startsWith("brs-x/")) return "BRS-X";
  const m = relPath.match(/^brs(\d+)/);
  return m ? `BRS${m[1]}` : "BRS";
}

function isFmPage(relPath) {
  return /\/fm\d+\/[^/]+-fm\d+-/.test(relPath) && !/-pm\d+-/.test(relPath);
}

function defaultBullets(relPath, brs) {
  if (relPath.includes("/kc/")) {
    return [
      `Constrains substrate availability for connected ${brs} mechanisms — within ${brs}.`,
      `Links dietary input sufficiency to downstream pathway capacity — within ${brs}.`,
      `Supports integrated biological function across the ${brs} network — within ${brs}.`,
    ];
  }
  if (relPath.includes("/sm/")) {
    return [
      `Adds variant- or phenotype-sensitive interpretation to ${brs} biology — within ${brs}.`,
      `Helps read individual differences without changing core mechanism claims — within ${brs}.`,
      `Connects biological context to translational phenotype patterns — within ${brs}.`,
    ];
  }
  if (relPath.includes("-pm")) {
    return [
      `Supports core biological function represented on this page — within ${brs}.`,
      `Contributes to integrated functional capacity of the parent FM — within ${brs}.`,
      `Links dietary and lifestyle patterns to mechanism-level biology — within ${brs}.`,
    ];
  }
  return [
    `Supports integrated biological capacity represented on this page — within ${brs}.`,
    `Connects dietary patterns to mechanism-level regulation — within ${brs}.`,
    `Links to wider cross-system regulation across the BRAIN Framework — Supporting connected BRSs.`,
  ];
}

function buildEntry(relPath, extracted) {
  const override = OVERRIDES[relPath];
  if (!override) {
    throw new Error(`Missing OVERRIDES entry for ${relPath}`);
  }
  const entry = { path: relPath, ...override };
  if (entry.functional_descriptor === undefined) delete entry.functional_descriptor;
  return entry;
}

function buildOverridesMap() {
  const allFiles = [
    ...listGroupFiles(["brs2", "brs-x"]),
    ...listGroupFiles(["brs3", "brs4", "brs5", "brs6"]),
  ];
  /** @type {Record<string, { functional_descriptor?: string, translational: string, scientific: string, bullets: string[] }>} */
  const map = {};

  for (const relPath of allFiles) {
    const abs = path.join(docsBase, relPath);
    const body = fs.readFileSync(abs, "utf8");
    const extracted = extractDefinition(body);
    if (!extracted) {
      throw new Error(`No Definition section in ${relPath}`);
    }

    const enhancement = ENHANCEMENTS[relPath] ?? {};
    const brs = inferBrs(relPath);

    const translational =
      enhancement.translational ??
      (extracted.paragraphs.length
        ? extracted.paragraphs.join(" ")
        : extracted.bullets[0] ?? "");

    const scientific =
      enhancement.scientific ??
      (cleanScientific(extracted.paragraphs.join(" ")) || translational);

    const bullets =
      enhancement.bullets ??
      (extracted.bullets.length >= 3
        ? extracted.bullets.slice(0, 3)
        : extracted.bullets.length > 0
          ? [
              ...extracted.bullets,
              ...defaultBullets(relPath, brs).slice(extracted.bullets.length),
            ].slice(0, 3)
          : defaultBullets(relPath, brs));

    const entry = {
      translational: translational.trim(),
      scientific: scientific.trim(),
      bullets: bullets.map((b) => b.replace(/^\*\s*/, "").trim()),
    };

    if (FM_FUNCTIONAL_DESCRIPTORS[relPath]) {
      entry.functional_descriptor = FM_FUNCTIONAL_DESCRIPTORS[relPath];
    } else if (isFmPage(relPath)) {
      throw new Error(`FM page missing functional descriptor: ${relPath}`);
    }

    if (entry.bullets.length !== 3) {
      throw new Error(`Expected 3 bullets for ${relPath}, got ${entry.bullets.length}`);
    }

    map[relPath] = entry;
  }

  return map;
}

function validateGroup(group) {
  const files = listGroupFiles(group.dirs);
  const errors = [];

  if (files.length !== group.expected) {
    errors.push(`Expected ${group.expected} files, found ${files.length}`);
  }

  for (const rel of files) {
    if (!OVERRIDES[rel]) errors.push(`Missing override: ${rel}`);
  }

  for (const key of Object.keys(OVERRIDES)) {
    if (!files.includes(key) && group.dirs.some((d) => key.startsWith(`${d}/`))) {
      errors.push(`Stale override not in file list: ${key}`);
    }
  }

  return { files, errors };
}

function main() {
  for (const group of GROUPS) {
    const { files, errors } = validateGroup(group);
    if (errors.length) {
      console.error(`Validation failed for ${group.name}:`);
      for (const e of errors) console.error(`  - ${e}`);
      process.exit(1);
    }

    const entries = files.map((rel) => buildEntry(rel, null));
    fs.writeFileSync(group.outFile, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
    console.log(`Wrote ${entries.length} entries → ${group.outFile}`);
  }

  console.log("\nValidation passed:");
  for (const group of GROUPS) {
    console.log(`  ${group.name}: ${group.expected} entries`);
  }
  console.log(`  OVERRIDES map: ${Object.keys(OVERRIDES).length} entries`);
}

main();
