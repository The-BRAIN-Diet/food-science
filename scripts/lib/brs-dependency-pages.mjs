/**
 * BRS Dependency pages — systems-level interpretation (not PM relationship catalogues).
 * @see system/brs-hub-levers-schema.md § BRS Dependency pages
 */
import { BRS_CROSS_INTEGRATION_EVIDENCE } from "../data/brs-cross-integration-evidence.mjs";

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

/** @param {string} integrationId e.g. BRS3->BRS1 */
export function dependencySlug(integrationId) {
  return String(integrationId).toLowerCase().replace(/\s*->\s*/g, "-to-");
}

/** @param {string} integrationId */
export function dependencyPageHref(integrationId) {
  return `/docs/biological-targets/dependencies/${dependencySlug(integrationId)}`;
}

function citationLinkLabel(citation) {
  return citation.replace(/\s*\((\d{4})\)/, ", $1");
}

function citationHref(citationKey) {
  return `/docs/papers/BRAIN-Diet-References#${citationKey}`;
}

export function getDependencyDisplayTitle(integration) {
  const canonicalId = integration.title.replace(/\s*→\s*/g, "->").trim();
  const namedTitle = INTEGRATION_DISPLAY_TITLES[canonicalId];
  return namedTitle ? `${integration.title} — ${namedTitle}` : integration.title;
}

function renderIllustrativeMechanisms(integration) {
  const items = integration.illustrative_mechanisms;
  if (!Array.isArray(items) || !items.length) return "";
  const lines = items
    .map((item) => {
      const label = item.label || item.pm_id;
      const href = item.href;
      const note = item.note ? ` — ${item.note}` : "";
      return href ? `- [${label}](${href})${note}` : `- ${label}${note}`;
    })
    .join("\n");
  return `## Illustrative Primary Mechanisms

Representative mechanisms that help illustrate this dependency. The canonical PM-to-PM graph lives on individual PM §6.2 pages only — not here.

${lines}
`;
}

function renderTranslationalExamples(integration) {
  const examples = integration.translational_examples;
  if (!Array.isArray(examples) || !examples.length) return "";
  const items = examples
    .map((ex) => {
      const label = citationLinkLabel(ex.citation);
      const href = citationHref(ex.citation_key);
      const pm = ex.primary_mechanism_href
        ? ` Primary biology: [${ex.primary_mechanism}](${ex.primary_mechanism_href}).`
        : ex.primary_mechanism
          ? ` Primary biology: ${ex.primary_mechanism}.`
          : "";
      return `- [${label}](${href}) — ${ex.framing}${pm}`;
    })
    .join("\n");
  return `## Translational Examples

Worked examples illustrating how the framework interprets interventions through this dependency. These do not claim experimental validation of every intermediate step.

${items}
`;
}

function renderSupportingEvidence(integration) {
  if (!integration.evidence?.length) return "";
  const items = integration.evidence
    .map((item) => {
      const label = citationLinkLabel(item.citation);
      const href = citationHref(item.citation_key);
      return `- [${label}](${href}) — ${item.supports}`;
    })
    .join("\n");
  return `## Supporting Evidence

${items}
`;
}

/** @param {{ id: string, title: string, biological_contribution?: string, systems_significance?: string, integrated_regulatory_capacity?: string }} integration */
export function renderDependencyPageMarkdown(integration) {
  const displayTitle = getDependencyDisplayTitle(integration);
  const [sourceBrs, destBrs] = integration.id.split("->");

  return `---
title: ${displayTitle}
integration_id: ${integration.id}
source_brs: ${sourceBrs}
destination_brs: ${destBrs}
hide_title: true
---

# ${displayTitle}

This page explains the **systems-level biological dependency** between ${sourceBrs} and ${destBrs}. It is informed by literature, integrated BRS architecture, allostatic context, expert interpretation, and mechanistic evidence from PM pages — but it does **not** duplicate the canonical PM relationship graph.

For explicit PM-to-PM relationships, see **§6.2 Cross-BRS Mechanism Relationships** on individual Primary Mechanism pages.

## Biological Contribution

${integration.biological_contribution || integration.summary || ""}

## Systems Significance

${integration.systems_significance || ""}

## Integrated Regulatory Capacity

${integration.integrated_regulatory_capacity || ""}

${renderSupportingEvidence(integration)}
${renderTranslationalExamples(integration)}
${renderIllustrativeMechanisms(integration)}
`.trimEnd();
}

export function listAllIntegrations() {
  return Object.entries(BRS_CROSS_INTEGRATION_EVIDENCE.integrations).map(([id, integration]) => ({
    id,
    ...integration,
  }));
}
