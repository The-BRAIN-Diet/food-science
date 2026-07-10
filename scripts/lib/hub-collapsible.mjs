/**
 * BRS hub / mechanism collapsible blocks (chevron button + bordered shell).
 * Used on BRS hub pages, PM/FM §3 phenome, evidence highlights, mechanistic basis, levers.
 * @see src/client/brsFmHubDropdown.ts
 */

export const HUB_COLLAPSIBLE_ATTR = "data-brs-fm-hub";

/** Match native <details> or hub collapsible markup. */
export const HAS_DROPDOWN_RE = /<details>|data-brs-fm-hub/;

/**
 * @param {string} title
 * @param {string} body
 * @param {{ openHref?: string, openLabel?: string, openAriaLabel?: string }} [options]
 */
export function renderHubCollapsible(title, body, options = {}) {
  const panel = String(body || "").trim();
  const openHref = String(options.openHref || "").trim();
  const openLabel = options.openLabel || "Open Page →";
  const openAriaLabel = options.openAriaLabel || `Open page: ${title}`;

  if (openHref) {
    return `<div class="brs-fm-hub-item" ${HUB_COLLAPSIBLE_ATTR}>
<div class="brs-fm-hub-shell">
<div class="brs-fm-hub-summary-row">
<button type="button" class="brs-fm-hub-toggle" aria-expanded="false" aria-label="Expand ${title}">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
</button>
<strong class="brs-fm-hub-title">${title}</strong>
<a class="brs-fm-hub-open" href="${openHref}" aria-label="${openAriaLabel}">
<span class="brs-fm-hub-open-label">${openLabel}</span>
<span class="brs-fm-hub-open-compact" aria-hidden="true">→</span>
</a>
</div>
<div class="brs-fm-hub-panel" hidden>

${panel}

</div>
</div>
</div>`;
  }

  return `<div class="brs-fm-hub-item" ${HUB_COLLAPSIBLE_ATTR}>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>${title}</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

${panel}

</div>
</div>
</div>`;
}

export const buildHubCollapsibleBlock = renderHubCollapsible;

/**
 * Parent dropdown listing child item titles; children hold nested hub collapsibles.
 * @param {string[]} titleItems — plain-text titles shown as a bulleted list in collapsed summary
 * @param {string} childrenHtml
 */
export function renderHubNestedGroup(titleItems, childrenHtml) {
  const items = Array.isArray(titleItems)
    ? titleItems
    : String(titleItems || "")
        .split(" · ")
        .map((s) => s.trim())
        .filter(Boolean);
  const listItems = items
    .map((title) => {
      const safe = String(title)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `  <li>${safe}</li>`;
    })
    .join("\n");

  return `<div class="brs-fm-hub-item brs-fm-hub-group" ${HUB_COLLAPSIBLE_ATTR}>
<div class="brs-fm-hub-shell">
<div class="brs-fm-hub-group-summary-row">
<button type="button" class="brs-fm-hub-toggle brs-fm-hub-group-toggle" aria-expanded="false" aria-label="Expand section">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
</button>
<ul class="brs-fm-hub-group-title-list">
${listItems}
</ul>
</div>
<div class="brs-fm-hub-panel" hidden>
<div class="brs-fm-hub-group-children">

${childrenHtml}
</div>
</div>
</div>
</div>`;
}

/** Find innermost <details> blocks (body contains no nested <details>). */
function findInnermostDetailsBlocks(content) {
  const openRe = /<details>\s*\n<summary><strong>([^<]+)<\/strong><\/summary>\s*\n/g;
  const blocks = [];

  for (const match of content.matchAll(openRe)) {
    const start = match.index;
    const title = match[1].trim();
    const bodyStart = start + match[0].length;
    let depth = 1;
    let pos = bodyStart;
    let closeEnd = -1;

    while (depth > 0 && pos < content.length) {
      const nextOpen = content.indexOf("<details>", pos);
      const nextClose = content.indexOf("</details>", pos);
      if (nextClose === -1) break;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        pos = nextOpen + "<details>".length;
      } else {
        depth--;
        if (depth === 0) closeEnd = nextClose + "</details>".length;
        pos = nextClose + "</details>".length;
      }
    }

    if (closeEnd === -1) continue;
    const body = content.slice(bodyStart, closeEnd - "</details>".length);
    if (!/<details>/i.test(body)) {
      blocks.push({ start, end: closeEnd, title, body });
    }
  }

  return blocks;
}

/** Convert innermost <details> blocks first (supports nested lever dropdowns). */
export function migrateDetailsToHubCollapsible(content) {
  let out = content;
  for (let round = 0; round < 50; round++) {
    const blocks = findInnermostDetailsBlocks(out);
    if (!blocks.length) return out;
    for (const block of blocks.sort((a, b) => b.start - a.start)) {
      const replacement = `${renderHubCollapsible(block.title, block.body)}\n`;
      out = out.slice(0, block.start) + replacement + out.slice(block.end);
    }
  }
  return out;
}
