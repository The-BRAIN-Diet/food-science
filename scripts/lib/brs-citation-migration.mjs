/**
 * Migrate legacy BRS citation format to system/brs-citation-reference-standard.md.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { toJSON } from "@orcid/bibtex-parse-js";

const BIB_PATH = path.join(process.cwd(), "static/bibtex/BRAIN-diet.bib");
const CITATION_LINK_RE =
  /\[([^\]]+?) \((\d{4})\)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)(?:\s*\[(\d+)\])?/g;

/** Curated topics when bib titles are too long or noisy. */
const TOPIC_OVERRIDES = {
  trommelen_anabolic_2023: "Anabolic Response to Protein Ingestion",
  fernstrom_lnna_2013: "LNAA Transport and Brain Neurochemistry",
};

let bibByKey = null;

function loadBibByKey() {
  if (bibByKey) return bibByKey;
  bibByKey = new Map();
  if (!fs.existsSync(BIB_PATH)) return bibByKey;
  for (const entry of toJSON(fs.readFileSync(BIB_PATH, "utf8"))) {
    const key = entry.key || entry.citationKey;
    if (key) bibByKey.set(key, { ...entry, title: entry.entryTags?.title || entry.title });
  }
  return bibByKey;
}

function cleanBibTitle(title = "") {
  return title
    .replace(/\{([^{}]*)\}/g, "$1")
    .replace(/\\textless[^\\]*\\textgreater/gi, "")
    .replace(/\\&\#xa0;/g, " ")
    .replace(/\\emph\{([^}]*)\}/gi, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function toTitleCase(s) {
  const small = new Set(["a", "an", "the", "and", "or", "in", "on", "of", "to", "for", "with", "from", "via", "by"]);
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (i > 0 && small.has(lower)) return lower;
      if (lower === "diaas") return "DIAAS";
      if (lower === "lnna") return "LNAA";
      if (lower === "dha") return "DHA";
      if (lower === "gaba") return "GABA";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function topicFromBibKey(citationKey) {
  if (TOPIC_OVERRIDES[citationKey]) return TOPIC_OVERRIDES[citationKey];
  const entry = loadBibByKey().get(citationKey);
  if (!entry?.title) return citationKey.replace(/_/g, " ");
  let t = cleanBibTitle(entry.title);
  if (t.includes(":")) {
    const [before, ...rest] = t.split(":");
    const after = rest.join(":").trim();
    if (after.length >= 12 && after.length <= 80 && after.split(/\s+/).length <= 12) {
      t = after;
    } else if (before.length <= 70) {
      t = before;
    }
  }
  if (/[—–]/.test(t)) {
    const main = t.split(/[—–]/)[0].trim();
    if (main.length >= 10 && main.length <= 80) t = main;
  }
  const words = t.split(/\s+/).filter(Boolean);
  if (words.length > 12) t = words.slice(0, 12).join(" ");
  return toTitleCase(t.replace(/^The\s+/i, ""));
}

export function toInlineCitation(authorLabel, year) {
  return `[${authorLabel.trim()}, ${year}]`;
}

export function toReferenceLabel(authorLabel, year, topic) {
  return `${authorLabel.trim()} (${year}) — ${topic}`;
}

export function toReferenceMarkdown(authorLabel, year, topic, citationKey) {
  const label = toReferenceLabel(authorLabel, year, topic);
  return `- [${label}](/docs/papers/BRAIN-Diet-References#${citationKey})`;
}

export function toFrontMatterReference(authorLabel, year, topic, citationKey) {
  const label = toReferenceLabel(authorLabel, year, topic);
  return `[${label}](/docs/papers/BRAIN-Diet-References#${citationKey})`;
}

function collectCitations(text) {
  const byKey = new Map();
  const order = [];
  for (const match of text.matchAll(CITATION_LINK_RE)) {
    const [, authorLabel, year, citationKey] = match;
    if (!byKey.has(citationKey)) {
      byKey.set(citationKey, { authorLabel, year, citationKey });
      order.push(citationKey);
    }
  }
  return { byKey, order };
}

function replaceInlineCitations(text) {
  return text.replace(CITATION_LINK_RE, (_, authorLabel, year) => toInlineCitation(authorLabel, year));
}

function removeOrphanNumericRefs(text) {
  return text.replace(/\s+\[(\d+)\](?=[.;,)\]\s]|$)/g, "");
}

function findReferencesSection(body) {
  const match = body.match(/^(#{2,3}\s+(?:\d+\.\s+)?References\s*\n)([\s\S]*?)(?=^#{2,3}\s|\s*$)/m);
  if (!match) return null;
  return { heading: match[1], start: match.index, end: match.index + match[0].length, content: match[2] };
}

function buildReferencesSection(heading, order, byKey) {
  const lines = order.map((key) => {
    const { authorLabel, year } = byKey.get(key);
    const topic = topicFromBibKey(key);
    return toReferenceMarkdown(authorLabel, year, topic, key);
  });
  return `${heading}${lines.join("\n")}\n`;
}

export function migrateBrsCitationsContent(content) {
  const parsed = matter(content);
  const { byKey, order } = collectCitations(parsed.content);
  if (!order.length) {
    return { changed: false, content, citations: 0 };
  }

  let body = replaceInlineCitations(parsed.content);
  body = removeOrphanNumericRefs(body);

  const refs = findReferencesSection(body);
  if (refs) {
    const newSection = buildReferencesSection(refs.heading, order, byKey);
    body = body.slice(0, refs.start) + newSection + body.slice(refs.end);
  }

  const newReferences = order.map((key) => {
    const { authorLabel, year } = byKey.get(key);
    const topic = topicFromBibKey(key);
    return toFrontMatterReference(authorLabel, year, topic, key);
  });

  if (Array.isArray(parsed.data.references) && parsed.data.references.length) {
    parsed.data.references = newReferences;
  }

  const output = matter.stringify(body, parsed.data);
  const changed = output !== content;
  return { changed, content: output, citations: order.length };
}

export function migrateBrsCitationFile(filePath, { dryRun = false } = {}) {
  const content = fs.readFileSync(filePath, "utf8");
  const result = migrateBrsCitationsContent(content);
  if (result.changed && !dryRun) {
    fs.writeFileSync(filePath, result.content, "utf8");
  }
  return { filePath, ...result };
}

export function fixGenericReferenceLabels(content) {
  const genericRe =
    /\[([^\]]+?) \((\d{4})\) — Supporting Study\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/g;
  let changed = false;
  const updated = content.replace(genericRe, (full, authorLabel, year, citationKey) => {
    const topic = topicFromBibKey(citationKey);
    if (topic === "Supporting Study" || full.includes(`— ${topic}]`)) return full;
    changed = true;
    return `[${authorLabel.trim()} (${year}) — ${topic}](/docs/papers/BRAIN-Diet-References#${citationKey})`;
  });
  return { changed, content: updated };
}

export function fixGenericReferenceLabelsFile(filePath, { dryRun = false } = {}) {
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = matter(content);
  let bodyResult = fixGenericReferenceLabels(parsed.content);
  let fmChanged = false;
  if (Array.isArray(parsed.data.references)) {
    parsed.data.references = parsed.data.references.map((ref) => {
      if (typeof ref !== "string" || !ref.includes("Supporting Study")) return ref;
      const m = ref.match(/\[([^\]]+?) \((\d{4})\) — Supporting Study\]\(#?([^)]+)\)/);
      if (!m) return ref;
      const citationKey = m[3].replace(/^\/docs\/papers\/BRAIN-Diet-References#/, "");
      const topic = topicFromBibKey(citationKey);
      fmChanged = true;
      return `[${m[1].trim()} (${m[2]}) — ${topic}](/docs/papers/BRAIN-Diet-References#${citationKey})`;
    });
  }
  const output = matter.stringify(bodyResult.content, parsed.data);
  const changed = bodyResult.changed || fmChanged || output !== content;
  if (changed && !dryRun) fs.writeFileSync(filePath, output, "utf8");
  return { filePath, changed };
}

export function listLegacyCitationFiles(rootDir) {
  const files = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) walk(full);
      else if (/\.mdx?$/.test(name)) {
        const text = fs.readFileSync(full, "utf8");
        if (/\[[^\]]+? \(\d{4}\)\]\(\/docs\/papers\/BRAIN-Diet-References#/.test(text)) {
          files.push(full);
        }
      }
    }
  }
  walk(rootDir);
  return files.sort();
}
