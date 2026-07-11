/**
 * Shared intro for BRS hub Therapeutic Area Research sections.
 * @see system/brs-hub-ta-adhd-dropdown-schema.md
 */

export const HUB_TA_RESEARCH_INTRO =
  'ADHD is the first fully mapped therapeutic area within the BRAIN Framework, providing a proof of concept for an adaptive biological architecture linking nutrition, biology and function. The same framework is designed to expand across additional therapeutic areas through the shared <a href="/docs/phenomes/">Phenome Registry</a>.';

export function renderTaResearchIntroHtml() {
  return `<p class="brs-hub-ta-research-intro">${HUB_TA_RESEARCH_INTRO}</p>`;
}

export function renderTaResearchSectionHeader() {
  return `## Therapeutic Area Research\n\n${renderTaResearchIntroHtml()}`;
}
