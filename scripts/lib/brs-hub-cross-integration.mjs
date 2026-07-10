/**
 * Render Cross-BRS integration Evidence on BRS hub pages.
 * @see system/brs-hub-levers-schema.md
 * @see scripts/data/brs-cross-integration-evidence.json
 */
import fs from "node:fs";
import path from "node:path";
import { getIntegrationsForBrs } from "../data/brs-cross-integration-evidence.mjs";
import { HUB_PAGES } from "./brs-hub-levers.mjs";
import { HUB_COLLAPSIBLE_ATTR, renderHubNestedGroup } from "./hub-collapsible.mjs";

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

function getIntegrationDisplayTitle(integration) {
  const canonicalId = integration.title.replace(/\s*→\s*/g, "->").trim();
  const namedTitle = INTEGRATION_DISPLAY_TITLES[canonicalId];
  return namedTitle ? `(${integration.title}) ${namedTitle}` : integration.title;
}

function renderIntegrationTitleHtml(integration) {
  return `<strong>${escapeHtml(getIntegrationDisplayTitle(integration))}</strong>`;
}

const INTEGRATION_SECTIONS = [
  { key: "biological_contribution", title: "Biological Contribution" },
  { key: "systems_significance", title: "Systems Significance" },
  { key: "integrated_regulatory_capacity", title: "Integrated Regulatory Capacity" },
];

function integrationSectionText(integration, key) {
  if (integration[key]) return integration[key];
  if (key === "biological_contribution" && integration.summary) return integration.summary;
  return "";
}

function renderIntegrationSection(title, body) {
  if (!body) return "";
  return `<h4 class="brs-hub-integration-section-title">${escapeHtml(title)}</h4>
<p>${escapeHtml(body)}</p>`;
}

function renderEvidenceItem(item) {
  const label = citationLinkLabel(item.citation);
  const href = citationHref(item.citation_key);
  return `<li class="brs-hub-integration-evidence-item"><p><a href="${href}">${escapeHtml(label)}</a> — ${escapeHtml(item.supports)}</p></li>`;
}

function renderIntegrationCollapsible(integration) {
  const sections = INTEGRATION_SECTIONS.map(({ key, title }) =>
    renderIntegrationSection(title, integrationSectionText(integration, key)),
  ).join("\n");
  const evidenceItems = integration.evidence.map(renderEvidenceItem).join("\n");
  return `<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
${renderIntegrationTitleHtml(integration)}
</button>
<div class="brs-fm-hub-panel" hidden>
${sections}
<h4 class="brs-hub-integration-section-title">Supporting Evidence</h4>
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
  const titleItems = integrations.map(getIntegrationDisplayTitle);
  const grouped = renderHubNestedGroup(titleItems, collapsibles);

  return `${CROSS_INTEGRATION_MARKERS.start}
## Cross-BRS integration

<p>Cross-BRS relationships describe how one Biological Regulatory System supports, constrains or preserves the adaptive performance of another. They are derived from the integrated regulatory capacities of each BRS rather than isolated biological mechanisms. Together, the six Biological Regulatory Systems form an adaptive network in which resilience depends upon coordinated system performance.</p>

<div class="brs-hub-cross-integration-evidence">

${grouped}

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

  // Remove legacy unmarked Cross-BRS sections (e.g. after a partial patch).
  content = content.replace(
    /\n## Cross-BRS integration[\s\S]*?(?=\n## (?:Key Constraints \(Dietary Bottlenecks\)|Requirements \(Key Constraints\)))/,
    "\n",
  );

  // Canonical position: after full Functional Mechanisms section, before Key Constraints.
  const insertRe =
    /(## Functional Mechanisms[\s\S]*?)(\n## (?:Key Constraints \(Dietary Bottlenecks\)|Requirements \(Key Constraints\)))/;
  if (!insertRe.test(content)) {
    throw new Error(`${hubPath}: could not find insertion point before Key Constraints`);
  }
  content = content.replace(insertRe, `$1\n\n${block}\n\n$2`);

  fs.writeFileSync(full, content);
}

export { HUB_PAGES };
