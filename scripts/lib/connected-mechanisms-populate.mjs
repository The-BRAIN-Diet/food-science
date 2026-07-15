/**
 * Helpers to populate PM §6.2 and FM §5 Connected Mechanisms from page content and BRS hub blocks.
 */
import fs from "fs";
import path from "path";
import { listMechanismMdxFiles, readMechanismPage } from "./mechanism-page-validation.mjs";

const HUB_PATH_RE =
  /\/docs\/biological-targets\/(?:methylation-one-carbon-metabolism|neurotransmitter-regulation|inflammation-oxidative-stress|mitochondrial-function-bioenergetics|gut-brain-axis-enteric-nervous-system|metabolic-neuroendocrine-stress|endocannabinoid-system|hormone-signalling-regulation)(?:\)|$)/;

export const CURATED_PM_CONNECTIONS = {
  "BRS1-FM3-PM6": [
    {
      label: "BRS3-FM2-PM5 — Lipid Peroxidation Control",
      href: "/docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control",
      connection: "membrane PUFA protection downstream of incorporated DHA",
    },
    {
      label: "BRS3-FM3-PM8 — Eicosanoid / SPM Balance",
      href: "/docs/biological-targets/brs3/fm3/brs3-fm3-pm8-eicosanoid-spm-balance",
      connection: "eicosanoid and specialised pro-resolving mediator balance downstream",
    },
  ],
  "BRS3-FM3-PM7": [
    {
      label: "BRS5-FM1-PM2 — LPS / Endotoxin Containment",
      href: "/docs/biological-targets/brs5/fm1/brs5-fm1-pm2-lps-endotoxin-containment",
      connection: "gut endotoxin containment upstream of systemic cytokine network tone",
    },
    {
      label: "BRS6(FM1) — Glycaemic–Insulin Stability & Cognitive Energy Availability",
      href: "/docs/biological-targets/brs6/fm1/brs6-fm1-glycaemic-insulin-stability-and-cognitive-energy-availability",
      connection: "post-prandial glycaemic context conditioning inflammatory cytokine expression",
    },
  ],
  "BRS3-FM3-PM8": [
    {
      label: "BRS1-FM3-PM6 — Neuronal Membrane DHA Incorporation",
      href: "/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation",
      connection: "membrane long-chain PUFA substrate pools feeding specialized pro-resolving mediator formation",
    },
    {
      label: "BRS5(FM1) — Gut Barrier Integrity and Immune Interface",
      href: "/docs/biological-targets/brs5/fm1/brs5-fm1-gut-barrier-integrity-and-immune-interface",
      connection: "gut–immune interface context influencing inflammatory resolution substrate availability",
    },
  ],
};

export const SUPPORTING_BRS_CANON = {
  BRS1: {
    label: "BRS1(FM1) — Monoaminergic Function",
    href: "/docs/biological-targets/brs1/fm1/brs1-fm1-monoaminergic-function",
    connection: "neurotransmitter synthesis and brain signalling context",
  },
  BRS2: {
    label: "BRS2(FM1) — Methylation Cycle Efficiency",
    href: "/docs/biological-targets/brs2/fm1/brs2-fm1-methylation-cycle-efficiency",
    connection: "one-carbon metabolism and methyl-donor capacity",
  },
  BRS3: {
    label: "BRS3-FM2-PM5 — Lipid Peroxidation Control",
    href: "/docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control",
    connection: "oxidative stress and membrane lipid protection downstream",
  },
  BRS4: {
    label: "BRS4(FM1) — Cellular Bioenergetics",
    href: "/docs/biological-targets/brs4/fm1/brs4-fm1-cellular-bioenergetics",
    connection: "mitochondrial energy production and cellular metabolic capacity",
  },
  BRS5: {
    label: "BRS5(FM1) — Gut Barrier Integrity and Immune Interface",
    href: "/docs/biological-targets/brs5/fm1/brs5-fm1-gut-barrier-integrity-and-immune-interface",
    connection: "gut barrier integrity and gut–immune interface context",
  },
  BRS6: {
    label: "BRS6(FM1) — Glycaemic–Insulin Stability & Cognitive Energy Availability",
    href: "/docs/biological-targets/brs6/fm1/brs6-fm1-glycaemic-insulin-stability-and-cognitive-energy-availability",
    connection: "glycaemic stability and cognitive energy availability context",
  },
};

const HUB_TO_CANON = {
  "/docs/biological-targets/inflammation-oxidative-stress": SUPPORTING_BRS_CANON.BRS3,
  "/docs/biological-targets/neurotransmitter-regulation": SUPPORTING_BRS_CANON.BRS1,
  "/docs/biological-targets/methylation-one-carbon-metabolism": SUPPORTING_BRS_CANON.BRS2,
  "/docs/biological-targets/mitochondrial-function-bioenergetics": SUPPORTING_BRS_CANON.BRS4,
  "/docs/biological-targets/gut-brain-axis-enteric-nervous-system": SUPPORTING_BRS_CANON.BRS5,
  "/docs/biological-targets/metabolic-neuroendocrine-stress": SUPPORTING_BRS_CANON.BRS6,
};

const LINK_RE = /\[([^\]]+)\]\((\/docs\/biological-targets\/[^)]+)\)/g;

export function pageHref(root, filePath) {
  const rel = path.relative(path.join(root, "docs"), filePath).replace(/\.mdx$/, "");
  return `/docs/${rel}`;
}

export function getHostKey(entityId) {
  if (!entityId) return null;
  if (entityId.startsWith("BRS-X")) {
    const m = entityId.match(/^BRS-X\(([^)]+)\)/i);
    return m ? `brs-x:${m[1].toLowerCase()}` : "brs-x";
  }
  const m = entityId.match(/^BRS(\d+)/i);
  return m ? `brs${m[1]}` : null;
}

export function getLinkKey(href) {
  const brsX = href.match(/\/brs-x\/([^/]+)\//);
  if (brsX) return `brs-x:${brsX[1].toLowerCase()}`;
  const brs = href.match(/\/brs(\d+)\//);
  return brs ? `brs${brs[1]}` : null;
}

export function isEntityLink(href) {
  if (HUB_PATH_RE.test(href)) return false;
  if (href.includes("/kc/") || href.includes("/sm/")) return false;
  return /\/(fm\d?|fm)\//.test(href);
}

export function extractSection(content, headingRe, endRe = /\n## \d+\. |\n### \d+\.\d+ /) {
  const m = content.match(new RegExp(`${headingRe.source}\\s*\\n([\\s\\S]*?)(?=${endRe.source}|$)`));
  return m ? m[1].trim() : "";
}

export function parseBullets(block) {
  const map = new Map();
  if (!block || /^- None listed\s*$/i.test(block.trim())) return map;
  for (const line of block.split("\n")) {
    const m = line.match(/^- \[([^\]]+)\]\(([^)]+)\)(?:\s*—\s*(.+))?$/);
    if (m) {
      map.set(m[2], { label: m[1], href: m[2], connection: m[3]?.trim() || "" });
    }
  }
  return map;
}

export function formatBullets(map) {
  if (!map.size) return "- None listed";
  return [...map.values()]
    .sort((a, b) => a.label.localeCompare(b.label))
    .map(({ label, href, connection }) => {
      const conn = connection || "biological connection relevant to this mechanism";
      return `- [${label}](${href}) — ${conn}`;
    })
    .join("\n");
}

function stripMechanismId(label) {
  return String(label || "")
    .replace(/^BRS[\dX]+-FM\d+-PM\d+\s*[-—]\s*/i, "")
    .replace(/^BRS[\dX]+\(FM\d+\)\s*[-—]\s*/i, "")
    .replace(/^BRS[\dX()-]+\s*[-—]\s*/i, "")
    .trim();
}

function looksLikeIdFragment(text) {
  return /^f?m?\d*-?f?m?\d*-?p?m?\d*$/i.test(text.replace(/\s/g, "")) || /^fM\d+-PM\d+/i.test(text);
}

function isMeaningfulConnection(text) {
  if (!text || text.length < 8 || text.length > 200 || text.includes("](/docs/")) return false;
  if (/context relevant to this mechanism$/i.test(text)) return false;
  if (looksLikeIdFragment(stripMechanismId(text))) return false;
  return true;
}

function isLowQualityConnection(connection) {
  if (!connection) return true;
  if (/context relevant to this mechanism$/i.test(connection)) return true;
  if (/^fM\d+-PM\d+/i.test(connection)) return true;
  if (/^bRS\d+/i.test(connection)) return true;
  const title = stripMechanismId(connection);
  return looksLikeIdFragment(title);
}

/** Split "X and Y belong to [link1] and [link2]" into per-href context clauses. */
function inferConnectionsFromLine(line) {
  const links = [...line.matchAll(/\[([^\]]+)\]\((\/docs\/biological-targets\/[^)]+)\)/g)];
  if (links.length < 2) return null;

  const belongRe = /(.+?)\s+belong to\s+(?=\[)/gi;
  let lastMatch = null;
  let m;
  while ((m = belongRe.exec(line)) !== null) lastMatch = m;
  if (!lastMatch) return null;

  const prefix = lastMatch[1].replace(/^[-*•]\s*/, "").trim();
  const clauseSource = prefix.split(/\.\s+/).pop()?.trim() || prefix;
  const clauses = clauseSource.split(/\s+and\s+/i).map((s) => s.trim()).filter(Boolean);
  if (clauses.length !== links.length) return null;

  const result = new Map();
  links.forEach((match, i) => result.set(match[2], clauses[i]));
  return result;
}

function contextBeforeLink(line, href) {
  const idx = line.indexOf(`](${href})`);
  if (idx < 0) return "";
  return line.slice(0, idx);
}

export function inferConnection(line, label, href, lineContext) {
  if (href && lineContext?.has(href)) {
    return lineContext.get(href);
  }

  const before = href ? contextBeforeLink(line, href) : line;

  const pairClause = before.match(/\s+and\s+([^[.\n]+)\s*$/);
  if (pairClause && isMeaningfulConnection(pairClause[1])) {
    return pairClause[1].trim();
  }

  const belongClause = before.match(/([^.[!\n]+)\s+belong to\s*$/i);
  if (belongClause && isMeaningfulConnection(belongClause[1])) {
    return belongClause[1].trim();
  }

  const handledClause = before.match(
    /([^.[!\n]+)\s+(?:is handled by|belongs to|represented by|is represented by)\s*$/i,
  );
  if (handledClause && isMeaningfulConnection(handledClause[1])) {
    return handledClause[1].trim();
  }

  const emDash = line.match(/\)\s*—\s*(.+?)\.?\s*$/);
  if (emDash && isMeaningfulConnection(emDash[1])) {
    return emDash[1].trim().replace(/\.$/, "");
  }

  const title = stripMechanismId(label);
  if (title && !looksLikeIdFragment(title)) {
    return title.charAt(0).toLowerCase() + title.slice(1);
  }

  return "biological connection relevant to this mechanism";
}

function enrichLabel(label, href, entityIndex) {
  const canonical = entityIndex?.byHref?.get(href);
  if (canonical?.label) {
    const bareId = /^(BRS[\dX]+(?:-FM\d+-PM\d+|\(FM\d+\)))$/i.test(label.trim());
    if (bareId || (!label.includes("—") && !label.includes(" - "))) {
      return canonical.label;
    }
  }
  const barePm = label.trim().match(/^(BRS[\dX]+-FM\d+-PM\d+)$/i);
  if (barePm && entityIndex?.byId?.get(barePm[1])) {
    return entityIndex.byId.get(barePm[1]).label;
  }
  const bareFm = label.trim().match(/^(BRS[\dX]+\(FM\d+\))$/i);
  if (bareFm && entityIndex?.byId?.get(bareFm[1])) {
    return entityIndex.byId.get(bareFm[1]).label;
  }
  return label.trim();
}

export function buildEntityIndex(root) {
  const byId = new Map();
  const byHref = new Map();
  for (const kind of ["fm", "pm"]) {
    for (const filePath of listMechanismMdxFiles(root, kind)) {
      const { data } = readMechanismPage(filePath);
      const id = data.pm_id || data.fm_id;
      if (!id) continue;
      const href = pageHref(root, filePath);
      const label = `${id} — ${data.title}`;
      const entry = { label, href, connection: "" };
      byId.set(id, entry);
      byHref.set(href, entry);
    }
  }
  return { byId, byHref };
}

function resolvePlainHubLine(plain, entityIndex) {
  const text = plain.replace(/^-\s*/, "").trim();
  const linked = text.match(/^\[([^\]]+)\]\(([^)]+)\)(?:\s*—\s*(.+))?$/);
  if (linked && isEntityLink(linked[2])) {
    return {
      label: enrichLabel(linked[1], linked[2], entityIndex),
      href: linked[2],
      connection: linked[3]?.trim() || "",
    };
  }

  let best = null;
  for (const [id, entry] of entityIndex.byId) {
    if (text.startsWith(id) && (!best || id.length > best.id.length)) {
      best = { id, entry };
    }
  }
  if (best) {
    const rest = text.slice(best.id.length).replace(/^\s*[-—]\s*/, "").trim();
    return { ...best.entry, connection: rest || best.entry.connection };
  }
  return null;
}

export function parseHubConnectedMechanisms(root) {
  const hubDir = path.join(root, "docs/biological-targets");
  const entityIndex = buildEntityIndex(root);
  const byFmId = new Map();

  for (const file of fs.readdirSync(hubDir)) {
    if (!file.endsWith(".md")) continue;
    const content = fs.readFileSync(path.join(hubDir, file), "utf8");
    const blocks = content.split(/(?:data-brs-fm-hub|<details>)/);
    for (const block of blocks) {
      const fmMatch = block.match(/<strong>(BRS[\dX][^<]+)<\/strong>/);
      if (!fmMatch) continue;
      const fmHeader = fmMatch[1].trim();
      const fmId = fmHeader.split(/\s*[-—]\s*/)[0].trim();
      const connMatch = block.match(
        /\*\*Connected mechanisms:\*\*\s*\n+([\s\S]*?)(?=\n<\/div>\s*\n<\/div>\s*\n<\/div>|\n<\/details>|\n---|\n## )/i,
      );
      if (!connMatch) continue;
      const links = new Map();
      for (const line of connMatch[1].split("\n")) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("-")) continue;
        const resolved = resolvePlainHubLine(trimmed, entityIndex);
        if (resolved && isEntityLink(resolved.href)) {
          links.set(resolved.href, resolved);
        }
      }
      if (links.size) byFmId.set(fmId, links);
    }
  }
  return byFmId;
}

export function addLink(map, link, { hostKey, selfHref, crossBrsOnly }) {
  const { label, href, connection } = link;
  if (!href || !label) return;
  if (selfHref && href === selfHref) return;
  if (!isEntityLink(href)) return;
  const linkKey = getLinkKey(href);
  if (!linkKey) return;
  if (crossBrsOnly && linkKey === hostKey) return;
  if (map.has(href)) {
    const ex = map.get(href);
    if (connection && (!ex.connection || isLowQualityConnection(ex.connection))) {
      ex.connection = connection;
    }
    if (label && label.includes("—") && !ex.label.includes("—")) {
      ex.label = label;
    }
    return;
  }
  map.set(href, { label, href, connection: connection || "" });
}

export function collectFromText(text, opts, entityIndex) {
  const map = new Map();
  if (!text) return map;

  for (const line of text.split("\n")) {
    if (!line.includes("](/docs/biological-targets/")) continue;
    const lineContext = inferConnectionsFromLine(line);
    let match;
    LINK_RE.lastIndex = 0;
    while ((match = LINK_RE.exec(line)) !== null) {
      const [, rawLabel, href] = match;
      const label = enrichLabel(rawLabel, href, entityIndex);
      if (HUB_TO_CANON[href]) {
        const canon = HUB_TO_CANON[href];
        addLink(
          map,
          {
            ...canon,
            connection: inferConnection(line, canon.label, href, lineContext),
          },
          opts,
        );
        continue;
      }
      addLink(
        map,
        {
          label,
          href,
          connection: inferConnection(line, label, href, lineContext),
        },
        opts,
      );
    }

    const supporting = line.match(/Supporting (BRS\d+)/i);
    if (supporting && SUPPORTING_BRS_CANON[`BRS${supporting[1].match(/\d+/)?.[0]}`]) {
      const key = `BRS${supporting[1].match(/\d+/)?.[0]}`;
      const canon = SUPPORTING_BRS_CANON[key];
      const bulletContext = line.replace(/^\*\s*/, "").split("—")[0]?.trim();
      addLink(
        map,
        {
          ...canon,
          connection:
            bulletContext && bulletContext.length > 15
              ? bulletContext.replace(/\.$/, "")
              : canon.connection,
        },
        opts,
      );
    }
  }
  return map;
}

export function getPmSourceText(content) {
  const def = extractSection(content, /## 1\. Definition/);
  const mech =
    extractSection(content, /## 5\. Mechanistic Basis/) ||
    extractSection(content, /## 2\. Mechanistic Basis/);
  return `${def}\n${mech}`;
}

export function resolvePmPath(root, pm) {
  if (pm.href) {
    const p = path.join(root, "docs", pm.href.replace(/^\/docs\//, "") + ".mdx");
    if (fs.existsSync(p)) return p;
  }
  for (const f of listMechanismMdxFiles(root, "pm")) {
    const { data } = readMechanismPage(f);
    if (data.pm_id === pm.id) return f;
  }
  return null;
}

const FM_ENTITY_ID_RE = /BRS\d+\(FM\d+\)/;
const PM_ENTITY_ID_RE = /BRS\d+-FM\d+-PM\d+/;

/** True when a §6.3 bullet links an FM (not a PM). */
export function isFmConnectedPrimaryBullet(line) {
  const trimmed = String(line || "").trim();
  if (!trimmed.startsWith("-")) return false;
  if (PM_ENTITY_ID_RE.test(trimmed)) return false;
  if (FM_ENTITY_ID_RE.test(trimmed)) return true;
  const hrefMatch = trimmed.match(/\]\(([^)]+)\)/);
  if (hrefMatch) {
    const href = hrefMatch[1];
    if (/-pm\d/i.test(href)) return false;
    if (/\/fm\d+\//.test(href)) return true;
  }
  return false;
}

/** Remove FM bullets from §6.3 Connected Primary Mechanisms body. */
export function stripFmBulletsFromConnectedPrimary(body) {
  const lines = String(body || "").split("\n");
  const kept = lines.filter((line) => !isFmConnectedPrimaryBullet(line));
  const collapsed = kept.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  const bullets = collapsed.split("\n").filter((line) => line.trim().startsWith("-"));
  return bullets.length ? collapsed : "- None listed";
}

/** @param {string} root */
export function buildFmIndex(root) {
  const idx = new Map();
  for (const filePath of listMechanismMdxFiles(root, "fm")) {
    const { data } = readMechanismPage(filePath);
    if (!data.fm_id) continue;
    const rel = path.relative(path.join(root, "docs"), filePath).replace(/\.mdx?$/, "");
    idx.set(String(data.fm_id).trim(), {
      title: data.title || data.fm_id,
      href: `/docs/${rel.replace(/\\/g, "/")}`,
      pms: Array.isArray(data.mechanisms_covered) ? data.mechanisms_covered : [],
    });
  }
  return idx;
}

/** Same-FM sibling PMs only — excludes parent FM from §6.3. */
export function buildSiblingPmConnectedPrimary(data, fmIndex) {
  const selfPmId = data.pm_id ? String(data.pm_id).trim() : "";
  const parentId = data.parent_fm ? String(data.parent_fm).trim() : "";
  const fm = parentId ? fmIndex.get(parentId) : null;
  const lines = [];
  for (const pm of fm?.pms || []) {
    if (!pm?.id || pm.id === selfPmId) continue;
    const label = pm.name ? `${pm.id} - ${pm.name}` : pm.id;
    lines.push(pm.href ? `- [${label}](${pm.href})` : `- ${label}`);
  }
  return lines.length ? lines.join("\n") : "- None listed";
}
