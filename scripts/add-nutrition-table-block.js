#!/usr/bin/env node
/**
 * Add <NutritionTable details={frontMatter} /> to every food page that doesn't have it.
 * Insertion: after the first ## section, before the second ## (same pattern as salmon/lentils).
 * Reference: docs/foods/salmon.md
 */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "docs", "foods");
const skip = new Set(["index.md", "shopping-list.md", "eggs.md", "salmon.md", "lentils.md", "oats.md", "yogurt.md"]);
const block = "\n\n<NutritionTable details={frontMatter} />\n\n";

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !skip.has(f));
let added = 0;
for (const f of files) {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes("<NutritionTable")) continue;
  const first = content.indexOf("\n## ");
  if (first === -1) continue;
  const second = content.indexOf("\n## ", first + 1);
  if (second === -1) continue;
  content = content.slice(0, second) + block + content.slice(second);
  fs.writeFileSync(filePath, content);
  added++;
  console.log("Added to", f);
}
console.log("Done. Added block to", added, "files.");
