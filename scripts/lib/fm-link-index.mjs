/**
 * Build FM id → doc link metadata from published FM MDX pages.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { listMechanismMdxFiles } from "./mechanism-page-validation.mjs";

/**
 * @param {string} [rootDir]
 * @returns {Map<string, { href: string, label: string }>}
 */
export function buildFmLinkIndex(rootDir = process.cwd()) {
  const index = new Map();
  for (const filePath of listMechanismMdxFiles(rootDir, "fm")) {
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    const fmId = data.fm_id;
    if (!fmId) continue;
    const rel = path
      .relative(path.join(rootDir, "docs/biological-targets"), filePath)
      .replace(/\\/g, "/")
      .replace(/\.mdx?$/, "");
    const href = `/docs/biological-targets/${rel.replace(/\\/g, "/")}`;
    const heading = content.match(/^##\s+(.+)$/m)?.[1]?.trim();
    const label =
      heading ||
      (data.title ? `${fmId} - ${data.title}` : fmId);
    index.set(fmId, { href, label });
  }
  return index;
}

/**
 * @param {string} parentFm e.g. BRS1(FM1)
 * @param {Map<string, { href: string, label: string }>} index
 */
export function formatImplementedFmBullet(parentFm, index) {
  const entry = index.get(parentFm);
  if (!entry) {
    return `- ${parentFm} (FM page link pending)`;
  }
  return `- [${entry.label}](${entry.href})`;
}
