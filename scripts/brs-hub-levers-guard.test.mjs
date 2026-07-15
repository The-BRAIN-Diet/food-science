import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import {
  analyzeHubLeversArchitecture,
  assertHubLeversPatchAllowed,
  assertLegacyHubLeversGeneratorAllowed,
  isMigratedHubLeversContent,
  LEGACY_GENERATOR_DISABLED_MESSAGE,
  LegacyHubLeversGeneratorDisabledError,
} from "./lib/brs-hub-migrated-guard.mjs";
import { patchHubLeversSectionContent } from "./lib/brs-hub-levers-section-patch.mjs";
import { patchHubPage } from "./lib/brs-hub-levers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const FIXTURE = path.join(
  __dirname,
  "fixtures/brs-hub-migrated-levers.fixture.md",
);
const GENERATOR = path.join(__dirname, "generate-brs-hub-levers.mjs");

const LEGACY_LEVERS_HTML = `<!-- brs-hub-levers:start -->
<div class="brs-hub-levers">
<strong>Dietary Strategy</strong>
<div class="brs-hub-levers-key-constraints">
<p class="brs-hub-levers-key-constraints-heading"><strong>Key constraints:</strong></p>
</div>
<strong>Target Foods</strong>
<strong>Lifestyle Priorities</strong>
</div>
<!-- brs-hub-levers:end -->`;

function assertApprovedArchitecture(content, label) {
  const arch = analyzeHubLeversArchitecture(content);
  assert.equal(
    arch.hasDietaryGuidance,
    true,
    `${label}: Dietary Guidance must remain`,
  );
  assert.equal(
    arch.hasDietaryStrategy,
    false,
    `${label}: Dietary Strategy must not appear`,
  );
  assert.equal(
    arch.hasOptimisationLevers,
    true,
    `${label}: Optimisation Levers must remain`,
  );
  assert.equal(
    arch.hasLifestylePriorities,
    true,
    `${label}: Lifestyle Priorities must remain`,
  );
  assert.equal(
    arch.panelCount,
    3,
    `${label}: three panels must remain`,
  );
  assert.equal(
    arch.hasDietaryGuidanceFlow,
    true,
    `${label}: Pattern → Nutrients → Biology flow must remain`,
  );
  assert.equal(
    arch.hasInlineKcInLevers,
    false,
    `${label}: KC commentary must not appear inside levers block`,
  );
  assert.equal(
    arch.hasTargetFoodsDropdown,
    false,
    `${label}: Target Foods dropdown must not appear`,
  );
  assert.ok(
    arch.guidanceItemCount >= 1,
    `${label}: Dietary Guidance items must remain`,
  );
}

test("fixture is detected as migrated hub levers content", async () => {
  const content = await readFile(FIXTURE, "utf8");
  assert.equal(isMigratedHubLeversContent(content), true);
  assertApprovedArchitecture(content, "fixture baseline");
});

test("legacy generator refuses migrated core hubs", () => {
  assert.throws(
    () => assertLegacyHubLeversGeneratorAllowed(ROOT),
    LegacyHubLeversGeneratorDisabledError,
  );
});

test("legacy generator npm entrypoint exits before writing hubs", () => {
  const result = spawnSync(process.execPath, [GENERATOR], {
    cwd: ROOT,
    encoding: "utf8",
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /obsolete Dietary Strategy architecture/);
  assert.match(result.stderr, /brs:patch-hub-levers-section/);
});

test("patchHubPage refuses migrated hub fixture", async () => {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "brs-hub-guard-"));
  const hubPath = "fixture-hub.md";
  const full = path.join(tempDir, hubPath);

  try {
    await writeFile(full, await readFile(FIXTURE, "utf8"));
    assert.throws(
      () => patchHubPage(hubPath, LEGACY_LEVERS_HTML, tempDir),
      LegacyHubLeversGeneratorDisabledError,
    );
    const after = await readFile(full, "utf8");
    assertApprovedArchitecture(after, "patchHubPage blocked write");
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
});

test("approved maintenance patch is idempotent on migrated fixture", async () => {
  const before = await readFile(FIXTURE, "utf8");
  const once = patchHubLeversSectionContent(before, "BRS1", ROOT);
  const twice = patchHubLeversSectionContent(once, "BRS1", ROOT);

  assertApprovedArchitecture(once, "after one maintenance patch");
  assert.deepEqual(
    analyzeHubLeversArchitecture(twice),
    analyzeHubLeversArchitecture(once),
    "second maintenance patch must preserve levers architecture",
  );
  assert.match(
    twice,
    /Distribute high-quality protein across the day/,
    "Dietary Guidance body content must remain",
  );
  assert.doesNotMatch(
    twice,
    /<strong>Dietary Strategy<\/strong>/,
    "maintenance patch must not rename Dietary Guidance",
  );
});

test("maintenance patch does not remove Optimisation Levers or reduce panel count", async () => {
  const before = await readFile(FIXTURE, "utf8");
  const beforeArch = analyzeHubLeversArchitecture(before);
  const after = patchHubLeversSectionContent(before, "BRS1", ROOT);
  const afterArch = analyzeHubLeversArchitecture(after);

  assert.equal(afterArch.hasOptimisationLevers, beforeArch.hasOptimisationLevers);
  assert.equal(afterArch.panelCount, beforeArch.panelCount);
  assert.equal(afterArch.guidanceItemCount, beforeArch.guidanceItemCount);
});

test("guard error includes the approved maintenance command", () => {
  assert.match(LEGACY_GENERATOR_DISABLED_MESSAGE, /patch-hub-levers-section/);
  assert.throws(
    () => assertHubLeversPatchAllowed("fixture.md", "<!-- brs-hub-levers:start --><strong>Dietary Guidance</strong><strong>Optimisation Levers</strong><p class=\"brs-hub-dietary-guidance-main\"></p><!-- brs-hub-levers:end -->"),
    /patch-hub-levers-section/,
  );
});
