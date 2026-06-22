#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const oldSlug = "brs1-kc2-amino-acid-quality-and-competitive-balance";
const newSlug = "brs1-kc1-amino-acid-quality-and-competitive-balance";
const oldFile = path.join(root, "docs/biological-targets/brs1/kc", `${oldSlug}.mdx`);
const newFile = path.join(root, "docs/biological-targets/brs1/kc", `${newSlug}.mdx`);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".git" ||
      entry.name === ".docusaurus" ||
      entry.name === "build"
    ) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(mdx?|mjs|ts|tsx|json)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function transform(text) {
  return text
    .replaceAll("BRS1(KC2)", "BRS1(KC1)")
    .replaceAll(oldSlug, newSlug)
    .replaceAll("KC2 instead captures", "KC1 instead captures");
}

if (fs.existsSync(oldFile)) {
  fs.writeFileSync(newFile, transform(fs.readFileSync(oldFile, "utf8")), "utf8");
  fs.unlinkSync(oldFile);
  console.log(`renamed: ${oldSlug}.mdx -> ${newSlug}.mdx`);
} else if (fs.existsSync(newFile)) {
  fs.writeFileSync(newFile, transform(fs.readFileSync(newFile, "utf8")), "utf8");
  console.log(`updated: ${newSlug}.mdx`);
}

let updated = 0;
for (const file of walk(root)) {
  if (file.endsWith("migrate-brs1-kc2-to-kc1.mjs")) continue;
  if (file === newFile && !fs.existsSync(oldFile)) continue;
  const raw = fs.readFileSync(file, "utf8");
  const next = transform(raw);
  if (next !== raw) {
    fs.writeFileSync(file, next, "utf8");
    updated++;
    console.log(`updated: ${path.relative(root, file)}`);
  }
}

const configPath = path.join(root, "docusaurus.config.ts");
let config = fs.readFileSync(configPath, "utf8");
const redirect = `          { to: '/docs/biological-targets/brs1/kc/${newSlug}', from: '/docs/biological-targets/brs1/kc/${oldSlug}' },`;
if (!config.includes(`from: '/docs/biological-targets/brs1/kc/${oldSlug}'`)) {
  config = config.replace(
    "        redirects: [",
    `        redirects: [\n          // BRS1 KC2 -> KC1 after KC1 removal\n          ${redirect}`,
  );
  fs.writeFileSync(configPath, config, "utf8");
  console.log("added docusaurus redirect");
} else {
  console.log("redirect already present");
}

const remaining = walk(root).filter((f) => {
  if (f === configPath || f.endsWith("migrate-brs1-kc2-to-kc1.mjs")) return false;
  const t = fs.readFileSync(f, "utf8");
  return t.includes("BRS1(KC2)") || t.includes(oldSlug);
});
if (remaining.length) {
  console.error("Remaining references:");
  for (const f of remaining) console.error(`  ${path.relative(root, f)}`);
  process.exit(1);
}
console.log(`\nDone. updated=${updated} files`);
