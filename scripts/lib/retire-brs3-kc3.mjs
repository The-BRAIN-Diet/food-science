/**
 * Pure transforms for retiring BRS3(KC3). Used by scripts/retire-brs3-kc3.mjs and regression tests.
 */

export const BRS3_KC3_PAGE_SUFFIX = "brs3/kc/brs3-kc3-essential-fatty-acid-balance.mdx";

export const KC3_LINK_LINE =
  /^\s*-\s+\[BRS3\(KC3\)[^\]]*\]\(\/docs\/biological-targets\/brs3\/kc\/brs3-kc3-essential-fatty-acid-balance\)\s*$/gm;

/** Only for PM §4.1.3 KC panels — never apply file-wide. */
export const KC3_POOL_LINES =
  /^\s*-\s+(EPA|DHA|Arachidonic acid|Omega-3 fatty acids|Omega-6 fatty acids)\s←[^\n]*\n/gm;

export const KC3_LINK_INLINE =
  /\[BRS3\(KC3\)[^\]]*\]\(\/docs\/biological-targets\/brs3\/kc\/brs3-kc3-essential-fatty-acid-balance\)/g;

const KC3_FM_FAILURE =
  /Low omega-3 intake may reduce \[BRS3\(KC3\)[^\]]*\]\([^)]+\)\.\s*/g;

export function stripKc3FromKeyConstraints(list) {
  if (!Array.isArray(list)) return list;
  return list.filter((item) => {
    const text = typeof item === "string" ? item : item?.id || item?.href || "";
    return (
      !/BRS3\(KC3\)/i.test(String(text)) &&
      !String(text).includes("brs3-kc3-essential-fatty-acid-balance")
    );
  });
}

export function stripKc3HubPanel413(content) {
  const hub413Re =
    /(<div class="brs-fm-hub-item" data-brs-fm-hub>\s*<div class="brs-fm-hub-shell">\s*<button type="button" class="brs-fm-hub-summary" aria-expanded="false">\s*<span class="brs-fm-hub-chevron" aria-hidden="true"><\/span>\s*<strong>4\.1\.3 KCs \(Key Constraints\)<\/strong>\s*<\/button>\s*<div class="brs-fm-hub-panel" hidden>\s*\n)([\s\S]*?)(\n<\/div>\s*<\/div>\s*<\/div>)/g;

  return content.replace(hub413Re, (_m, open, inner, close) => {
    let next = inner.replace(KC3_LINK_LINE, "").replace(KC3_POOL_LINES, "");
    next = next.replace(/\n{3,}/g, "\n\n").trim();
    if (!next || !/^-\s/m.test(next)) {
      return "\n</div>\n</div>\n</div>\n";
    }
    return `${open}\n\n${next}\n${close}`;
  });
}

export function rewriteIntegrationProse(text) {
  return text
    .replace(
      /drawing on \[BRS3\(KC1\)[^\]]*\]\([^)]+\) and \[BRS3\(KC3\)[^\]]*\]\([^)]+\)/g,
      (m) => m.replace(/\s*and \[BRS3\(KC3\)[^\]]*\]\([^)]+\)/, ""),
    )
    .replace(
      /drawing on \[BRS3\(KC3\)[^\]]*\]\([^)]+\)\.?/g,
      "supported by habitual EPA/DHA and essential-fatty-acid intake through Direct Dietary Levers",
    )
    .replace(KC3_LINK_INLINE, "habitual EPA/DHA intake")
    .replace(
      KC3_FM_FAILURE,
      "Low omega-3 intake may limit EPA/DHA substrate availability for lipid-mediator pathways. ",
    )
    .replace(
      /Low omega-3 intake may reduce habitual EPA\/DHA intake\./g,
      "Low omega-3 intake may limit EPA/DHA substrate availability for lipid-mediator pathways.",
    )
    .replace(
      /Inflammation resolution capacity may weaken when habitual EPA\/DHA intake and omega-3\/omega-6 dietary balance become chronically unfavourable/g,
      "Inflammation resolution capacity may weaken when habitual EPA/DHA intake and omega-3/omega-6 dietary balance become chronically unfavourable",
    )
    .replace(
      /Anti-inflammatory signalling tone may weaken when antioxidant substrate availability or essential fatty acid balance become chronically inadequate\./,
      "Anti-inflammatory signalling tone may weaken when antioxidant substrate availability becomes chronically inadequate or when habitual EPA/DHA intake fails to support resolution-competent lipid-mediator context.",
    );
}

/**
 * @param {string} body MDX/Markdown body (no frontmatter)
 * @param {Record<string, unknown>} data Frontmatter object (mutated when key_constraints change)
 */
export function transformMdxBody(body, data = {}) {
  let content = body;
  let changed = false;

  if (Array.isArray(data.key_constraints)) {
    const next = stripKc3FromKeyConstraints(data.key_constraints);
    if (next.length !== data.key_constraints.length) {
      if (next.length) data.key_constraints = next;
      else delete data.key_constraints;
      changed = true;
    }
  }

  const stripped = stripKc3HubPanel413(content);
  if (stripped !== content) {
    content = stripped;
    changed = true;
  }

  const rewritten = rewriteIntegrationProse(content);
  if (rewritten !== content) {
    content = rewritten;
    changed = true;
  }

  return { body: content, data, changed };
}

/**
 * @param {string} content Plain markdown body
 */
export function transformPlainMarkdown(content) {
  const next = rewriteIntegrationProse(content.replace(KC3_LINK_LINE, ""));
  return { content: next, changed: next !== content };
}
