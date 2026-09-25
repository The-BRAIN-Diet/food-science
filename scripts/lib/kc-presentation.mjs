/**
 * Title-first Key Constraint presentation shared by PM and FM renderers.
 *
 * KC identity/navigation belongs in the titled row. The panel body contains only
 * the relationship or constraint details for that KC.
 */
import { extractHubItemBlock } from "./pm-section-4-levers.mjs";

export const PM_KC_HEADINGS = [
  "4.1.3 Key Constraints",
  "3.1.3 Key Constraints",
  "4.1.3 KCs (Key Constraints)",
  "3.1.3 KCs (Key Constraints)",
];

const PANEL_OPEN = '<div class="brs-fm-hub-panel" hidden>';
const STATIC_PANEL_OPEN = '<div class="brs-fm-hub-panel">';
const DIV_OPEN = "<div";
const DIV_CLOSE = "</div>";
const LEGACY_KC_LINK_RE =
  /^-\s+\[(BRS(?:\d+|-X)\([^)]*KC\d+\))\s*[-—]\s*([^\]]+)\]\(([^)]+)\)\s*$/gm;

function findBalancedDivEnd(content, startIdx) {
  let depth = 1;
  let pos = startIdx + DIV_OPEN.length;
  while (pos < content.length && depth > 0) {
    const nextOpen = content.indexOf(DIV_OPEN, pos);
    const nextClose = content.indexOf(DIV_CLOSE, pos);
    if (nextClose === -1) return -1;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      pos = nextOpen + DIV_OPEN.length;
    } else {
      depth -= 1;
      pos = nextClose + DIV_CLOSE.length;
    }
  }
  return depth === 0 ? pos : -1;
}

function panelBounds(block) {
  const hiddenAt = block.indexOf(PANEL_OPEN);
  const staticAt = block.indexOf(STATIC_PANEL_OPEN);
  const openAt =
    hiddenAt === -1
      ? staticAt
      : staticAt === -1
        ? hiddenAt
        : Math.min(hiddenAt, staticAt);
  if (openAt === -1) return null;
  const endAt = findBalancedDivEnd(block, openAt);
  if (endAt === -1) return null;
  const marker = openAt === hiddenAt ? PANEL_OPEN : STATIC_PANEL_OPEN;
  return {
    contentStart: openAt + marker.length,
    contentEnd: endAt - DIV_CLOSE.length,
  };
}

export function localKcId(kcId) {
  const inner = String(kcId || "").match(/\(([^)]+)\)/)?.[1];
  return inner || String(kcId || "");
}

export function kcPresentationTitle(kcId, name) {
  return `(Key Constraint) (${localKcId(kcId)}) — ${String(name || "").trim()}`;
}

export function renderKcPresentation({ id, name, href, body }) {
  const title = kcPresentationTitle(id, name);
  return `<div class="brs-fm-hub-item brs-kc-presentation" data-kc-id="${id}">
<div class="brs-fm-hub-shell">
<div class="brs-fm-hub-summary-row">
<strong class="brs-fm-hub-title"><a class="brs-kc-title-link" href="${href}">${title}</a></strong>
</div>
<div class="brs-fm-hub-panel">
${String(body || "").trim()}
</div>
</div>
</div>`;
}

function normalizeRenderedKcPresentations(block) {
  let output = "";
  let cursor = 0;
  let changed = false;
  const marker = '<div class="brs-fm-hub-item brs-kc-presentation"';

  while (true) {
    const start = block.indexOf(marker, cursor);
    if (start === -1) break;
    const end = findBalancedDivEnd(block, start);
    if (end === -1) break;
    const rendered = block.slice(start, end);
    output += block.slice(cursor, start);

    if (
      rendered.includes("brs-kc-title-link") &&
      !rendered.includes('aria-label="Open Key Constraint:')
    ) {
      output += rendered;
      cursor = end;
      continue;
    }

    const id = rendered.match(/data-kc-id="([^"]+)"/)?.[1];
    const titleMatch = rendered.match(
      /<strong class="brs-fm-hub-title">(?:<a[^>]*>)?\(Key Constraint\) \([^)]+\) — ([^<]+)(?:<\/a>)?<\/strong>/,
    );
    const href = rendered.match(
      /<a class="(?:brs-fm-hub-open|brs-kc-title-link)" href="([^"]+)"/,
    )?.[1];
    const bounds = panelBounds(rendered);
    if (!id || !titleMatch || !href || !bounds) {
      output += rendered;
      cursor = end;
      continue;
    }

    output += renderKcPresentation({
      id,
      name: titleMatch[1].trim(),
      href,
      body: rendered.slice(bounds.contentStart, bounds.contentEnd).trim(),
    });
    changed = true;
    cursor = end;
  }

  return {
    content: output + block.slice(cursor),
    changed,
  };
}

export function parseLegacyPmKcGroups(panelBody) {
  const text = String(panelBody || "");
  const matches = [...text.matchAll(LEGACY_KC_LINK_RE)];
  return matches.map((match, index) => {
    const bodyStart = match.index + match[0].length;
    const bodyEnd = matches[index + 1]?.index ?? text.length;
    return {
      id: match[1].trim(),
      name: match[2].trim(),
      href: match[3].trim(),
      body: text.slice(bodyStart, bodyEnd).trim(),
    };
  });
}

export function transformPmKcPresentation(content) {
  for (const heading of PM_KC_HEADINGS) {
    const entry = extractHubItemBlock(content, heading);
    if (!entry) continue;
    if (entry.block.includes("brs-kc-presentation")) {
      const normalized = normalizeRenderedKcPresentations(entry.block);
      return {
        content: normalized.changed
          ? content.replace(entry.block, normalized.content)
          : content,
        changed: normalized.changed,
        heading,
        groups: [],
      };
    }
    const bounds = panelBounds(entry.block);
    if (!bounds) return { content, changed: false, heading, groups: [], issue: "panel-unresolved" };
    const panelBody = entry.block.slice(bounds.contentStart, bounds.contentEnd);
    const groups = parseLegacyPmKcGroups(panelBody);
    if (!groups.length) {
      return { content, changed: false, heading, groups: [], issue: "kc-links-unresolved" };
    }
    const rendered = groups.map(renderKcPresentation).join("\n\n");
    const nextBlock =
      entry.block.slice(0, bounds.contentStart) +
      `\n\n${rendered}\n\n` +
      entry.block.slice(bounds.contentEnd);
    return {
      content: content.replace(entry.block, nextBlock),
      changed: true,
      heading,
      groups,
    };
  }
  return { content, changed: false, heading: null, groups: [], issue: "kc-panel-missing" };
}
