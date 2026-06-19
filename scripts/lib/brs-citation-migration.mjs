/**
 * Migrate legacy BRS citation format to system/brs-citation-reference-standard.md.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { toJSON } from "@orcid/bibtex-parse-js";

const BIB_PATH = path.join(process.cwd(), "static/bibtex/BRAIN-diet.bib");
const REF_LINK_RE =
  /\[([^\]]+?)\s*\((\d{4})\)(?:\s*[—–-]\s*[^\]]+)?\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/g;
const CITATION_LINK_RE =
  /\[([^\]]+?) \((\d{4})\)\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)(?:\s*\[(\d+)\])?/g;
const FM_NUMERIC_REF_RE =
  /^\[(\d+)\]\s+\[([^\]]+?)\s*\((\d{4})\)(?:\s*[—–-]\s*[^\]]+)?\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/;
const NUMBERED_REF_LINE_RE =
  /^(\d+)\.\s+\[([^\]]+?)\s*\((\d{4})\)(?:\s*[—–-]\s*[^\]]+)?\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/gm;

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

function toUnicodeSubscript(digits) {
  const map = "₀₁₂₃₄₅₆₇₈₉";
  return String(digits)
    .split("")
    .map((d) => map[Number(d)] ?? d)
    .join("");
}

function cleanBibTitle(title = "") {
  return title
    .replace(/\\textsubscript\{?(\d+)\}?/gi, (_, digits) => toUnicodeSubscript(digits))
    .replace(/\$_\{\\textrm\{(\d+)\}\}\$/g, (_, digits) => toUnicodeSubscript(digits))
    .replace(/\$_\{\\textrm\{(\d+)\}\}/g, (_, digits) => toUnicodeSubscript(digits))
    .replace(/\\&\#039;/g, "'")
    .replace(/\\&\#x[a-f0-9]+;/gi, " ")
    .replace(/\{([^{}]*)\}/g, "$1")
    .replace(/\\textless[^\\]*\\textgreater/gi, "")
    .replace(/\\&\#xa0;/g, " ")
    .replace(/\\textit\{([^}]*)\}/gi, "$1")
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

function absorbCitation(byKey, order, { authorLabel, year, citationKey }) {
  if (!citationKey || byKey.has(citationKey)) return;
  byKey.set(citationKey, { authorLabel, year, citationKey });
  order.push(citationKey);
}

function collectAllCitations(text, fmRefs) {
  const byKey = new Map();
  const order = [];
  const indexMap = new Map();

  if (Array.isArray(fmRefs)) {
    for (const ref of fmRefs) {
      const raw = String(ref);
      const numbered = raw.match(FM_NUMERIC_REF_RE);
      if (numbered) {
        const info = {
          authorLabel: numbered[2],
          year: numbered[3],
          citationKey: numbered[4],
        };
        indexMap.set(Number(numbered[1]), info);
        absorbCitation(byKey, order, info);
        continue;
      }
      const migrated = [...raw.matchAll(REF_LINK_RE)][0];
      if (migrated) {
        absorbCitation(byKey, order, {
          authorLabel: migrated[1],
          year: migrated[2],
          citationKey: migrated[3],
        });
      }
    }
  }

  const refs = findReferencesSection(text);
  if (refs) {
    for (const match of refs.content.matchAll(NUMBERED_REF_LINE_RE)) {
      const info = {
        authorLabel: match[2],
        year: match[3],
        citationKey: match[4],
      };
      indexMap.set(Number(match[1]), info);
      absorbCitation(byKey, order, info);
    }
    assignBulletRefIndices(refs.content, indexMap, byKey, order);
  }

  for (const match of text.matchAll(CITATION_LINK_RE)) {
    const [, authorLabel, year, citationKey, numericIndex] = match;
    absorbCitation(byKey, order, { authorLabel, year, citationKey });
    if (numericIndex) {
      indexMap.set(Number(numericIndex), { authorLabel, year, citationKey });
    }
  }

  return { byKey, order, indexMap };
}

function replaceLinkedCitationRefs(text, indexMap) {
  let out = text.replace(
    /\[\[(\d+)\]\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/g,
    (_, index, citationKey) => {
      const info = indexMap.get(Number(index));
      if (info) return toInlineCitation(info.authorLabel, info.year);
      return toInlineCitationFromKey(citationKey) || `[${index}]`;
    },
  );
  out = out.replace(
    /\[\[([^\]]+?, \d{4})\]\]\(\/docs\/papers\/BRAIN-Diet-References#[^)]+\)/g,
    "[$1]",
  );
  return out;
}

function toInlineCitationFromKey(citationKey) {
  const entry = loadBibByKey().get(citationKey);
  if (!entry) return null;
  const year =
    entry.entryTags?.year || entry.year || String(entry.date || "").slice(0, 4);
  const authorRaw = entry.entryTags?.author || entry.author || "";
  const firstAuthor = authorRaw.split(/\s+and\s+/i)[0]?.split(",")[0]?.trim();
  if (!firstAuthor || !year) return null;
  const label = authorRaw.includes(" and ") ? `${firstAuthor} et al.` : firstAuthor;
  return toInlineCitation(label, year);
}

function replaceNumericRefClusters(text, indexMap) {
  if (!indexMap.size) return text;
  return text.replace(/(?:\[\d+\])+/g, (cluster) => {
    const indices = [...cluster.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1]));
    const seen = new Set();
    const parts = [];
    for (const idx of indices) {
      const info = indexMap.get(idx);
      if (!info) continue;
      const token = `${info.authorLabel.trim()}, ${info.year}`;
      if (seen.has(token)) continue;
      seen.add(token);
      parts.push(token);
    }
    if (!parts.length) return cluster;
    return `[${parts.join("; ")}]`;
  });
}

function collectCitations(text) {
  return collectAllCitations(text, null);
}

function replaceInlineCitations(text) {
  return text.replace(CITATION_LINK_RE, (_, authorLabel, year) => toInlineCitation(authorLabel, year));
}

function removeOrphanNumericRefs(text) {
  return text.replace(/\s+\[(\d+)\](?=[.;,)\]\s]|$)/g, "");
}

function findReferencesSection(body) {
  const headerMatch = body.match(/^(#{2,3}\s+(?:\d+\.\s+)?References\s*\n)/m);
  if (!headerMatch) return null;
  const start = headerMatch.index;
  const heading = headerMatch[1];
  const afterHeading = body.slice(start + heading.length);
  const nextHeading = afterHeading.search(/^#{2,3}\s+/m);
  const content = nextHeading === -1 ? afterHeading : afterHeading.slice(0, nextHeading);
  return { heading, start, end: start + heading.length + content.length, content };
}

function parseRefLinkMatch(match) {
  return {
    authorLabel: match[1],
    year: match[2],
    citationKey: match[3],
  };
}

function assignBulletRefIndices(refsContent, indexMap, byKey, order) {
  let autoIndex = 1;
  const seenKeys = new Set();
  for (const match of refsContent.matchAll(
    /^-\s+\[([^\]]+?)\s*\((\d{4})\)(?:\s*[—–-]\s*[^\]]+)?\]\(\/docs\/papers\/BRAIN-Diet-References#([a-z0-9_-]+)\)/gm,
  )) {
    const info = parseRefLinkMatch(match);
    absorbCitation(byKey, order, info);
    if (seenKeys.has(info.citationKey)) continue;
    seenKeys.add(info.citationKey);
    while (indexMap.has(autoIndex)) autoIndex += 1;
    indexMap.set(autoIndex, info);
    autoIndex += 1;
  }
}

function cleanupOrphanReferenceLines(body) {
  return body
    .replace(/^\d+\.\s+\[[^\]]+?, \d{4}\]\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\n+$/, "\n");
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
  const { byKey, order, indexMap } = collectAllCitations(parsed.content, parsed.data.references);
  const hasNumericBodyRefs =
    /(?:^|[^\[])\[\d+\](?:\[\d+\])*/m.test(parsed.content) ||
    /\[\[\d+\]\]/.test(parsed.content);
  const hasLinkedCitations = /\[[^\]]+? \(\d{4}\)\]\(\/docs\/papers\/BRAIN-Diet-References#/.test(
    parsed.content,
  );
  const hasOrphanRefTail = /^\d+\.\s+\[[^\]]+?, \d{4}\]\s*$/m.test(parsed.content);

  if (!order.length && !hasNumericBodyRefs && !hasLinkedCitations && !hasOrphanRefTail) {
    return { changed: false, content, citations: 0 };
  }

  let body = parsed.content;
  if (indexMap.size) {
    body = replaceNumericRefClusters(body, indexMap);
    body = replaceLinkedCitationRefs(body, indexMap);
  }
  body = replaceInlineCitations(body);
  body = removeOrphanNumericRefs(body);

  if (order.length) {
    const refs = findReferencesSection(body);
    if (refs) {
      const newSection = buildReferencesSection(refs.heading, order, byKey);
      body = body.slice(0, refs.start) + newSection + body.slice(refs.end);
    }

    if (Array.isArray(parsed.data.references) && parsed.data.references.length) {
      parsed.data.references = order.map((key) => {
        const { authorLabel, year } = byKey.get(key);
        const topic = topicFromBibKey(key);
        return toFrontMatterReference(authorLabel, year, topic, key);
      });
    }
  }

  body = cleanupOrphanReferenceLines(body);

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
        const hasLinkedLegacy = /\[[^\]]+? \(\d{4}\)\]\(\/docs\/papers\/BRAIN-Diet-References#/.test(
          text,
        );
        const hasNumericRefs =
          /(?:^|[^\[])\[\d+\](?:\[\d+\])*/m.test(text) ||
          /\[\[\d+\]\]/.test(text) ||
          /^\s*-\s+'?\[\d+\]/m.test(text);
        const hasOrphanRefTail = /^\d+\.\s+\[[^\]]+?, \d{4}\]\s*$/m.test(text);
        if (hasLinkedLegacy || hasNumericRefs || hasOrphanRefTail) {
          files.push(full);
        }
      }
    }
  }
  walk(rootDir);
  return files.sort();
}
