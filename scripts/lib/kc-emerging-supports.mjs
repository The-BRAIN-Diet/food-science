/**
 * Parse KC §4 Emerging Biological Supports into Conditional Supplementation items.
 * @see system/key-constraint-schema.md
 * @see system/brs-hub-levers-schema.md
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const EMPTY_EMERGING_RE =
  /No Emerging Biological Supports are currently prioritised/i;

/**
 * @param {string} rootDir
 * @returns {string[]}
 */
export function listKcMdxFiles(rootDir) {
  const base = path.join(rootDir, "docs/biological-targets");
  /** @type {string[]} */
  const files = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "kc") {
          for (const name of fs.readdirSync(full)) {
            if (name.endsWith(".mdx") || name.endsWith(".md")) {
              files.push(path.join(full, name));
            }
          }
        } else {
          walk(full);
        }
      }
    }
  }
  walk(base);
  return files.sort();
}

/**
 * @param {string} filePath
 * @param {string} rootDir
 */
function fileToHref(filePath, rootDir) {
  const rel = path.relative(path.join(rootDir, "docs"), filePath).replace(/\\/g, "/");
  return `/docs/${rel.replace(/\.mdx?$/, "")}`;
}

/**
 * @param {string} text
 */
function firstSentence(text) {
  const cleaned = String(text || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "";
  // Same-length placeholders so indices stay aligned with `cleaned`.
  const protected_ = cleaned
    .replace(/\be\.g\./gi, "e_g_")
    .replace(/\bi\.e\./gi, "i_e_")
    .replace(/\bvs\./gi, "vs_")
    .replace(/\bFig\./gi, "Fig_");
  const match = protected_.match(/^(.+?[.!?])(?:\s|$)/);
  if (!match) return cleaned;
  let end = match[1].length;
  while (cleaned[end] === ")") end += 1;
  return cleaned.slice(0, end);
}

/**
 * @param {string} content
 * @param {{ kc_id?: string, title?: string }} data
 * @param {string} filePath
 * @param {string} rootDir
 */
export function parseKcEmergingSupports(content, data, filePath, rootDir) {
  const section = content.match(
    /### 4\. Emerging Biological Supports\n([\s\S]*?)(?=\n### |\n## |\s*$)/,
  );
  if (!section) return [];

  const body = section[1].trim();
  if (!body || EMPTY_EMERGING_RE.test(body)) return [];

  const kcId = data.kc_id || "";
  const href = fileToHref(filePath, rootDir);
  // Candidate blocks may sit inside hub dropdowns; keep #### Name as the parse anchor.
  const chunks = body.split(/\n(?=#### )/).filter((chunk) => /^#### /.test(chunk));

  /** @type {Array<{ name: string, action: string, explanation: string, kc_id: string, kc_href: string, kc_title: string }>} */
  const entries = [];

  for (const chunk of chunks) {
    const nameMatch = chunk.match(/^#### (.+)\n/);
    if (!nameMatch) continue;
    const name = nameMatch[1].trim();
    // Skip nested #### headings such as "Biological Importance" / supporting titles.
    if (/^(biological importance|supporting evidence)$/i.test(name)) continue;

    const interestingMatch = chunk.match(
      /\*\*Why it is interesting:\*\*\s*([\s\S]*?)(?=\n\*\*Why it remains emerging:\*\*|\n#### |\n<h4|\n<\/div>|\s*$)/i,
    );
    const emergingMatch = chunk.match(
      /\*\*Why it remains emerging:\*\*\s*([\s\S]*?)(?=\n#### |\n<h4|\n<\/div>|\s*$)/i,
    );

    const stripCitations = (text) =>
      String(text || "")
        .replace(/\s*\[[^\]]+\]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const interesting = firstSentence(stripCitations(interestingMatch?.[1] || ""));
    const emerging = firstSentence(stripCitations(emergingMatch?.[1] || ""));

    let explanation = interesting || "May support related capacities under selected conditions.";
    if (emerging) {
      explanation = `${explanation.replace(/\.$/, "")}. Remains emerging: ${emerging.replace(/\.$/, "")}.`;
    } else if (!explanation.endsWith(".")) {
      explanation = `${explanation}.`;
    }

    entries.push({
      name,
      action: `Consider ${name} under selected conditions`,
      explanation,
      kc_id: kcId,
      kc_href: href,
      kc_title: data.title || kcId,
    });
  }

  return entries;
}

/**
 * Collect Emerging Biological Supports for a core BRS (BRS1–BRS6).
 * @param {string} brsId
 * @param {string} [rootDir]
 */
export function collectEmergingSupportsForBrs(brsId, rootDir = process.cwd()) {
  const needle = brsId.toLowerCase();
  /** @type {ReturnType<typeof parseKcEmergingSupports>} */
  const all = [];

  for (const filePath of listKcMdxFiles(rootDir)) {
    const rel = path.relative(rootDir, filePath).replace(/\\/g, "/");
    if (!rel.includes(`/biological-targets/${needle}/kc/`)) continue;

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    all.push(...parseKcEmergingSupports(content, data, filePath, rootDir));
  }

  return all;
}
