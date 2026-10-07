/**
 * Refresh src/data/substance-input-pages.json from docs/substances.
 * Lever Input lines use this index. Compact headings stay unlinked.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSubstanceInputPages } from "./lib/substance-input-pages.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "src/data/substance-input-pages.json");
const pages = buildSubstanceInputPages();
fs.writeFileSync(out, JSON.stringify(pages, null, 2) + "\n");
console.log(`Wrote ${Object.keys(pages).length} substance input names to ${path.relative(root, out)}`);
