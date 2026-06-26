/**
 * Index KC pages by kc_id and docs href; extract Shared Biological Pool members.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POOL_HEADING = "### 3. Shared Biological Pool";
const INPUTS_HEADING = "### 3. Supporting Inputs/Substrates";

function walkKcFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkKcFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".mdx") && full.includes(`${path.sep}kc${path.sep}`)) {
      out.push(full);
    }
  }
  return out;
}

function parseBulletLines(block) {
  return block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-\s+/, "").trim())
    .filter(Boolean);
}

function poolMemberFromLine(line) {
  const arrow = line.indexOf(" ← ");
  if (arrow !== -1) return line.slice(0, arrow).trim();
  return line.trim();
}

function extractPoolMembers(content) {
  const poolMatch = content.match(
    new RegExp(`${POOL_HEADING.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n+([\\s\\S]*?)(?=\\n### 4\\. )`),
  );
  if (poolMatch) return parseBulletLines(poolMatch[1]);

  const inputsMatch = content.match(
    new RegExp(`${INPUTS_HEADING.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n+([\\s\\S]*?)(?=\\n### 4\\. )`),
  );
  if (inputsMatch) return parseBulletLines(inputsMatch[1]).map(poolMemberFromLine);

  return [];
}

function kcLabelFromFile(filePath, kcId) {
  const base = path.basename(filePath, ".mdx");
  const title = base
    .replace(/^brs-x-ecs-kc\d+-/i, "")
    .replace(/^brs\d+-kc\d+-/i, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return `${kcId} - ${title.replace(/\bAnd\b/g, "&")}`;
}

function docsHrefFromFile(docsRoot, filePath) {
  const rel = path.relative(docsRoot, filePath).replace(/\\/g, "/").replace(/\.mdx$/, "");
  return `/docs/${rel}`;
}

export function buildKcPoolIndex(docsRoot) {
  const biologicalTargets = path.join(docsRoot, "biological-targets");
  const byId = new Map();
  const byHref = new Map();

  for (const filePath of walkKcFiles(biologicalTargets)) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const kcId = data.kc_id;
    if (!kcId) continue;

    const href = docsHrefFromFile(path.join(docsRoot), filePath);
    const pool = extractPoolMembers(content);
    const label =
      content.match(new RegExp(`^### ${kcId.replace(/[()]/g, "\\$&")} - (.+)$`, "m"))?.[1]?.trim() ||
      kcLabelFromFile(filePath, kcId);

    const entry = { kcId, label, href, pool, filePath };
    byId.set(kcId, entry);
    byHref.set(href, entry);
  }

  return { byId, byHref };
}

export function resolveKcRefs(keyConstraints, index) {
  const refs = [];
  for (const raw of keyConstraints || []) {
    const text = String(raw).trim();
    const linkMatch = text.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const href = linkMatch[2].split("#")[0];
      const entry = index.byHref.get(href);
      if (entry) {
        refs.push(entry);
        continue;
      }
    }

    const idMatch = text.match(/^(BRS[^-\s]+(?:\([^)]+\))?)\s*-\s*(.+)$/);
    if (idMatch) {
      const kcId = idMatch[1].trim();
      const entry = index.byId.get(kcId);
      if (entry) {
        refs.push(entry);
        continue;
      }
    }

    const bareId = text.match(/^(BRS[^-\s]+(?:\([^)]+\))?)/)?.[1];
    if (bareId && index.byId.has(bareId)) {
      refs.push(index.byId.get(bareId));
    }
  }
  return refs;
}

export function renderPmKcLeverBlock(kcRefs) {
  if (!kcRefs.length) return "";

  const lines = [];
  for (const kc of kcRefs) {
    lines.push(`- [${kc.kcId} - ${kc.label}](${kc.href})`, "", "**Shared Biological Pool**", "");
    if (kc.pool.length) {
      for (const member of kc.pool) lines.push(`- ${member}`);
    } else {
      lines.push("- See linked KC page for pool members.");
    }
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}
