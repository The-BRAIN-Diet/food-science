#!/usr/bin/env node
/**
 * Reorder BRS hub sections: Therapeutic Area Research immediately after Ambition;
 * remove horizontal rule before Functional Mechanisms; standardise block order.
 * @see scripts/data/brs-hub-ta-research-intro.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { HUB_PAGES } from "./lib/brs-hub-levers.mjs";
import { renderTaResearchIntroHtml } from "./data/brs-hub-ta-research-intro.mjs";

const ROOT = process.cwd();

const TA_BLOCK_RE =
  /## Therapeutic Area Research\n\n(?:<p class="brs-hub-ta-research-intro">[\s\S]*?<\/p>\n\n)?<!-- brs-hub-ta-research:start -->[\s\S]*?<!-- brs-hub-ta-research:end -->/;

const LEVERS_BLOCK_RE =
  /## Dietary and Lifestyle Levers\n\n[\s\S]*?<!-- brs-hub-levers:end -->/;

const KC_BLOCK_RE =
  /<!-- brs-hub-key-constraints:start -->[\s\S]*?<!-- brs-hub-key-constraints:end -->/;

function extract(re, content, label) {
  const m = content.match(re);
  if (!m) return { block: "", content };
  return { block: m[0].trimEnd(), content: content.replace(re, `\n%%${label}%%\n`) };
}

function patchHub(content) {
  let { block: ta, content: rest } = extract(TA_BLOCK_RE, content, "TA");
  if (!ta) throw new Error("Therapeutic Area Research block not found");

  let levers = "";
  ({ block: levers, content: rest } = extract(LEVERS_BLOCK_RE, rest, "LEVERS"));
  if (!levers) throw new Error("Dietary and Lifestyle Levers block not found");

  let kc = "";
  ({ block: kc, content: rest } = extract(KC_BLOCK_RE, rest, "KC"));

  rest = rest
    .replace(/\n%%TA%%\n?/g, "\n")
    .replace(/\n%%LEVERS%%\n?/g, "\n")
    .replace(/\n%%KC%%\n?/g, "\n")
    .replace(/\n---\n\n## Functional Mechanisms/, "\n\n## Functional Mechanisms")
    .replace(/\n---\n\n## Cross-BRS Dependencies/, "\n\n## Cross-BRS Dependencies")
    .replace(/\n{3,}/g, "\n\n");

  const taInner = ta.replace(/^## Therapeutic Area Research\n\n/, "");
  const taSection = `## Therapeutic Area Research\n\n${renderTaResearchIntroHtml()}\n\n${taInner.replace(/^<p class="brs-hub-ta-research-intro">[\s\S]*?<\/p>\n\n/, "")}`;

  const insert = [taSection, levers, kc].filter(Boolean).join("\n\n");

  const ambitionRe = /(## Ambition\n\n[^\n#][\s\S]*?)(\n\n## )/;
  if (!ambitionRe.test(rest)) {
    throw new Error("Could not find ## Ambition section");
  }

  return rest.replace(ambitionRe, `$1\n\n${insert}\n$2`);
}

let patched = 0;
for (const [, hubPath] of Object.entries(HUB_PAGES)) {
  const full = path.join(ROOT, hubPath);
  const before = fs.readFileSync(full, "utf8");
  try {
    const next = patchHub(before);
    if (next === before) {
      console.warn(`No change: ${hubPath}`);
      continue;
    }
    fs.writeFileSync(full, next);
    patched++;
    console.log(`Reordered ${hubPath}`);
  } catch (err) {
    console.error(`${hubPath}: ${err.message}`);
  }
}

console.log(`\nPatched ${patched} hub page(s)`);
