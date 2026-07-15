/**
 * Guards against the legacy hub levers generator overwriting migrated BRS1–BRS6 architecture.
 * @see system/brs-hub-levers-schema.md
 */
import fs from "node:fs";
import path from "node:path";
import { CORE_BRS_HUBS, HUB_PAGES } from "./brs-hub-levers.mjs";

export const LEGACY_GENERATOR_DISABLED_MESSAGE =
  "This generator is disabled for migrated BRS hubs because it outputs the obsolete Dietary Strategy architecture and will overwrite approved Dietary Guidance, Optimisation Levers and Lifestyle Priorities content. Use `npm run brs:patch-hub-levers-section` for safe maintenance.";

export const APPROVED_HUB_LEVERS_MAINTENANCE_COMMAND = "npm run brs:patch-hub-levers-section";

/** Explicit opt-in for future fixture-only generator rebuild tests. */
export const GENERATOR_UNSAFE_ALLOW_ENV = "BRS_HUB_LEVERS_GENERATOR_UNSAFE_ALLOW";

export class LegacyHubLeversGeneratorDisabledError extends Error {
  /** @param {string} detail */
  constructor(detail) {
    super(`${LEGACY_GENERATOR_DISABLED_MESSAGE}\n\n${detail}`);
    this.name = "LegacyHubLeversGeneratorDisabledError";
  }
}

const LEVERS_BLOCK_RE =
  /<!-- brs-hub-levers:start -->[\s\S]*?<!-- brs-hub-levers:end -->/;

/**
 * @param {string} content
 */
export function extractHubLeversBlock(content) {
  const match = content.match(LEVERS_BLOCK_RE);
  return match ? match[0] : "";
}

/**
 * Migrated hubs use the three-panel Dietary Guidance architecture inside the levers block.
 * @param {string} content Full hub page or levers block HTML
 */
export function isMigratedHubLeversContent(content) {
  const block = extractHubLeversBlock(content) || content;
  return (
    /<strong>Dietary Guidance<\/strong>/.test(block) &&
    /<strong>Optimisation Levers<\/strong>/.test(block) &&
    /brs-hub-dietary-guidance-/.test(block)
  );
}

/**
 * @param {string} content
 */
export function analyzeHubLeversArchitecture(content) {
  const block = extractHubLeversBlock(content) || content;
  const panelTitles = [
    ...block.matchAll(/<strong>([^<]+)<\/strong>\s*<\/button>/g),
  ].map((match) => match[1]);

  return {
    hasDietaryGuidance: /<strong>Dietary Guidance<\/strong>/.test(block),
    hasDietaryStrategy: /<strong>Dietary Strategy<\/strong>/.test(block),
    hasOptimisationLevers: /<strong>Optimisation Levers<\/strong>/.test(block),
    hasLifestylePriorities: /<strong>Lifestyle Priorities<\/strong>/.test(block),
    hasDietaryGuidanceFlow: /Pattern → Nutrients → Biology/.test(block),
    hasInlineKcInLevers: /brs-hub-levers-key-constraints/.test(block),
    hasTargetFoodsDropdown: /<strong>Target Foods<\/strong>/.test(block),
    panelCount: panelTitles.length,
    panelTitles,
    guidanceItemCount: (block.match(/class="brs-hub-dietary-guidance-item"/g) || [])
      .length,
  };
}

/**
 * @param {string} hubPath Repo-relative hub path
 * @param {string} content
 */
export function assertHubLeversPatchAllowed(hubPath, content) {
  if (!isMigratedHubLeversContent(content)) return;
  if (process.env[GENERATOR_UNSAFE_ALLOW_ENV] === "1") return;

  throw new LegacyHubLeversGeneratorDisabledError(
    `Refusing to patch migrated hub levers block in ${hubPath}.`,
  );
}

/**
 * @param {string} [rootDir]
 * @param {string[]} [brsIds]
 */
export function listMigratedCoreHubs(rootDir = process.cwd(), brsIds = CORE_BRS_HUBS) {
  /** @type {string[]} */
  const migrated = [];

  for (const brsId of brsIds) {
    const hubPath = HUB_PAGES[brsId];
    if (!hubPath) continue;
    const full = path.join(rootDir, hubPath);
    if (!fs.existsSync(full)) continue;
    const content = fs.readFileSync(full, "utf8");
    if (isMigratedHubLeversContent(content)) migrated.push(brsId);
  }

  return migrated;
}

/**
 * @param {string} [rootDir]
 */
export function assertLegacyHubLeversGeneratorAllowed(rootDir = process.cwd()) {
  if (process.env[GENERATOR_UNSAFE_ALLOW_ENV] === "1") return;

  const migrated = listMigratedCoreHubs(rootDir);
  if (!migrated.length) return;

  throw new LegacyHubLeversGeneratorDisabledError(
    `Blocked for migrated core hubs: ${migrated.join(", ")}.`,
  );
}
