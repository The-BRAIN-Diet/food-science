/**
 * Maps a lever Input name to a substance page when that page exists.
 * The compact heading above the five-atom record stays unlinked.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const INDEX_PATH = path.join(ROOT, "src/data/substance-input-pages.json");

export function normalizeSubstanceKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.mdx?$/.test(entry.name) && entry.name !== "index.md") acc.push(full);
  }
  return acc;
}

function aliasesFromTitle(title) {
  const names = [title];
  const paren = String(title || "").match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (!paren) return names;
  names.push(paren[1]);
  for (const part of paren[2].split(/\s*(?:;|,|\band\b)\s*/i)) names.push(part);
  return names;
}

export function buildSubstanceInputPages() {
  const pages = new Map();
  const dropped = [];
  const add = (name, href) => {
    const key = normalizeSubstanceKey(name);
    if (!key || key.length < 2 || key === "and") return;
    const existing = pages.get(key);
    if (existing && existing !== href) {
      pages.delete(key);
      dropped.push(key);
      return;
    }
    if (!dropped.includes(key)) pages.set(key, href);
  };

  for (const file of walk(path.join(ROOT, "docs/substances"))) {
    const { data } = matter(fs.readFileSync(file, "utf8"));
    const href = `/docs/${path.relative(path.join(ROOT, "docs"), file).replace(/\.mdx?$/, "").split(path.sep).join("/")}`;
    const names = [
      data.title,
      data.sidebar_label,
      String(data.id || "").replace(/-/g, " "),
      ...aliasesFromTitle(data.title),
    ];
    for (const name of names) add(name, href);
  }

  return Object.fromEntries([...pages.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

export function loadSubstanceInputPages() {
  return JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
}

export function substanceHrefForInput(input, pages = loadSubstanceInputPages()) {
  const raw = String(input || "").trim();
  if (!raw) return undefined;
  const candidates = [
    normalizeSubstanceKey(raw),
    normalizeSubstanceKey(raw.replace(/\s*\([^)]*\)\s*/g, " ")),
    normalizeSubstanceKey(raw.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+ions?\b/gi, " ")),
  ];
  for (const key of candidates) {
    if (key && pages[key]) return pages[key];
  }
  return undefined;
}

export function attachSubstanceInputHrefs(map, pages = loadSubstanceInputPages()) {
  for (const disclosure of map.values()) {
    if (disclosure.inputHref || (disclosure.identityStatus && disclosure.identityStatus !== "resolved")) continue;
    const href = substanceHrefForInput(disclosure.title, pages);
    if (href) disclosure.inputHref = href;
  }
  return map;
}
