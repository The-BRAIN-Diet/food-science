/**
 * Render Cross-BRS integration Evidence on BRS hub pages.
 * @see system/brs-hub-levers-schema.md
 * @see scripts/data/brs-cross-integration-evidence.json
 */
import fs from "node:fs";
import path from "node:path";
import { getIntegrationsForBrs } from "../data/brs-cross-integration-evidence.mjs";
import { HUB_PAGES } from "./brs-hub-levers.mjs";

export const CROSS_INTEGRATION_MARKERS = {
  start: "<!-- brs-hub-cross-integration:start -->",
  end: "<!-- brs-hub-cross-integration:end -->",
};

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function citationLinkLabel(citation) {
  return citation.replace(/\s*\((\d{4})\)/, ", $1");
}

function citationHref(citationKey) {
  return `/docs/papers/BRAIN-Diet-References#${citationKey}`;
}

const INTEGRATION_DISPLAY_TITLES = {
  "BRS4->BRS1": "Bioenergetic Support for Neurotransmission",
  "BRS3->BRS1": "Inflammatory Modulation of Neurotransmitter Systems",
  "BRS6->BRS1": "Stress-Axis and Autonomic Shaping of Neurotransmission",
  "BRS2->BRS1": "One-Carbon and BH4 Support for Monoamine Biology",
  "BRS5->BRS1": "Gut–Vagal Modulation of Neurochemical Signalling",
  "BRS2->BRS3": "One-Carbon to Redox Coupling",
  "BRS5->BRS3": "Gut–Immune Drivers of Inflammatory Tone",
  "BRS5->BRS4": "Gut-Metabolic Inputs to Mitochondrial Energetics",
  "BRS6->BRS4": "Neuroendocrine Control of Bioenergetic Recovery",
  "BRS6->BRS3": "Stress Signalling Interactions with Inflammatory Load",
  "BRS5->BRS6": "Gut–Vagal Influence on Stress-Axis Regulation",
};

function renderIntegrationTitleHtml(title) {
  const canonicalId = title.replace(/\s*→\s*/g, "->").trim();
  const namedTitle = INTEGRATION_DISPLAY_TITLES[canonicalId];
  const displayTitle = namedTitle ? `${namedTitle} (${title})` : title;
  return `<strong>${escapeHtml(displayTitle)}</strong>`;
}

function renderEvidenceItem(item) {
  const label = citationLinkLabel(item.citation);
  const href = citationHref(item.citation_key);
  return `<li class="brs-hub-integration-evidence-item"><p><a href="${href}">${escapeHtml(label)}</a> — ${escapeHtml(item.supports)}</p></li>`;
}

function renderIntegrationCollapsible(integration, index) {
  const evidenceItems = integration.evidence.map(renderEvidenceItem).join("\n");
  return `<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
${renderIntegrationTitleHtml(integration.title)}
</button>
<div class="brs-fm-hub-panel" hidden>
<p>${escapeHtml(integration.summary)}</p>
<ul class="brs-hub-integration-evidence-list">
${evidenceItems}
</ul>
</div>
</div>
</div>`;
}

/**
 * @param {string} brsId
 * @returns {string}
 */
export function renderHubCrossIntegrationHtml(brsId) {
  const integrations = getIntegrationsForBrs(brsId);
  if (!integrations.length) return "";

  const collapsibles = integrations.map(renderIntegrationCollapsible).join("\n\n");

  return `${CROSS_INTEGRATION_MARKERS.start}
## Cross-BRS integration

<p>Landmark mechanistic and systems-biology reviews explaining how this Biological Regulatory System interacts with and depends upon other systems. These are biological integration references — not ADHD intervention studies.</p>

<div class="brs-hub-cross-integration-evidence">

${collapsibles}

</div>
${CROSS_INTEGRATION_MARKERS.end}`;
}

/**
 * @param {string} hubPath
 * @param {string} html
 * @param {string} [rootDir]
 */
export function patchHubCrossIntegration(hubPath, html, rootDir = process.cwd()) {
  const full = path.join(rootDir, hubPath);
  let content = fs.readFileSync(full, "utf8");
  const block = html.trimEnd();

  const blockRe = new RegExp(
    `\\n*${CROSS_INTEGRATION_MARKERS.start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${CROSS_INTEGRATION_MARKERS.end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n*`,
  );
  // Remove any existing block first so we can reinsert it in canonical position.
  content = content.replace(blockRe, "\n\n");

  // Canonical position: after full Functional Mechanisms section, before Requirements.
  const insertRe = /(## Functional Mechanisms[\s\S]*?)(\n## Requirements \(Key Constraints\))/;
  if (!insertRe.test(content)) {
    throw new Error(`${hubPath}: could not find insertion point before Requirements`);
  }
  content = content.replace(insertRe, `$1\n\n${block}\n\n$2`);

  fs.writeFileSync(full, content);
}

export { HUB_PAGES };
