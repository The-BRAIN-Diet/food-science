#!/usr/bin/env node
/**
 * Retire BRS3(KC3) — Essential Fatty Acid Balance from the ontology.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import {
  BRS3_KC3_PAGE_SUFFIX,
  KC3_LINK_LINE,
  transformMdxBody,
  transformPlainMarkdown,
  rewriteIntegrationProse,
} from "./lib/retire-brs3-kc3.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DOCS = path.join(ROOT, "docs");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && (full.endsWith(".mdx") || full.endsWith(".md") || full.endsWith(".mjs")))
      out.push(full);
  }
  return out;
}

function migrateMdxFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content: body } = matter(raw);
  const result = transformMdxBody(body, { ...data });
  if (!result.changed) return false;
  fs.writeFileSync(filePath, matter.stringify(result.body, result.data), "utf8");
  return true;
}

function migratePlainMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const result = transformPlainMarkdown(content);
  if (!result.changed) return false;
  fs.writeFileSync(filePath, result.content, "utf8");
  return true;
}

function migrateScriptFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  if (!content.includes("BRS3(KC3)") && !content.includes("brs3-kc3")) return false;
  let next = content;
  if (filePath.endsWith("fm-failure-modes.mjs")) {
    next = next.replace(/\s*"BRS3\(KC3\)": \[[\s\S]*?\],\n/, "\n");
  }
  if (filePath.endsWith("brs3-brs6-translational.json")) {
    next = next.replace(/\s*\{\s*"path": "brs3\/kc\/brs3-kc3-essential-fatty-acid-balance\.mdx"[\s\S]*?\},?\n?/g, "\n");
  }
  if (filePath.endsWith("translational-enhancements.mjs")) {
    next = next.replace(/\s*"brs3\/kc\/brs3-kc3-essential-fatty-acid-balance\.mdx": \{[\s\S]*?\},?\n?/g, "\n");
  }
  next = rewriteIntegrationProse(next.replace(KC3_LINK_LINE, ""));
  if (next === content) return false;
  fs.writeFileSync(filePath, next, "utf8");
  return true;
}

const kc3Page = path.join(DOCS, "biological-targets", BRS3_KC3_PAGE_SUFFIX);
if (fs.existsSync(kc3Page)) {
  fs.unlinkSync(kc3Page);
  console.log("Deleted brs3-kc3-essential-fatty-acid-balance.mdx");
}

let updated = 0;
for (const file of walk(path.join(DOCS, "biological-targets"))) {
  if (file.endsWith(".mdx")) {
    if (migrateMdxFile(file)) {
      updated++;
      console.log(`Updated ${path.relative(ROOT, file)}`);
    }
  } else if (file.endsWith(".md")) {
    if (migratePlainMarkdownFile(file)) {
      updated++;
      console.log(`Updated ${path.relative(ROOT, file)}`);
    }
  }
}

for (const file of walk(path.join(ROOT, "scripts"))) {
  if (migrateScriptFile(file)) {
    updated++;
    console.log(`Updated ${path.relative(ROOT, file)}`);
  }
}

console.log(`Done. ${updated} file(s) updated.`);
