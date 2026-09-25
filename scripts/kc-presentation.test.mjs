import test from "node:test";
import assert from "node:assert/strict";
import {
  kcPresentationTitle,
  parseLegacyPmKcGroups,
  transformPmKcPresentation,
} from "./lib/kc-presentation.mjs";
import { parseKcPanel } from "./lib/brs-hub-levers.mjs";
import { buildLocalCofactorMap } from "./lib/cofactor-food-index.mjs";

const PM_PANEL = `<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>4.1.3 KCs (Key Constraints)</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

- [BRS4(KC1) - Macronutrient Substrate Availability](/docs/kc1)

- Amino acids ← fish, eggs
- Fatty acids ← fish, olive oil

- [BRS4(KC2) - Mitochondrial Cofactor Sufficiency](/docs/kc2)

- B vitamins ← whole grains, eggs
- Iron ← meat, legumes

</div>
</div>
</div>`;

test("KC title uses local identity without a linked bullet", () => {
  assert.equal(
    kcPresentationTitle("BRS4(KC1)", "Macronutrient Substrate Availability"),
    "(Key Constraint) (KC1) — Macronutrient Substrate Availability",
  );
});

test("legacy PM KC bullets split into independently titled groups", () => {
  const body = PM_PANEL.match(/<div class="brs-fm-hub-panel" hidden>\n([\s\S]*?)\n<\/div>/)[1];
  const groups = parseLegacyPmKcGroups(body);
  assert.deepEqual(groups.map((group) => group.id), ["BRS4(KC1)", "BRS4(KC2)"]);
  assert.match(groups[0].body, /Amino acids/);
  assert.doesNotMatch(groups[0].body, /Mitochondrial Cofactor/);
  assert.match(groups[1].body, /B vitamins/);
});

test("PM KC panel becomes a generic parent with nested KC title rows", () => {
  const result = transformPmKcPresentation(PM_PANEL);
  assert.equal(result.changed, true);
  assert.match(result.content, /<strong>4\.1\.3 KCs \(Key Constraints\)<\/strong>/);
  assert.match(result.content, /data-kc-id="BRS4\(KC1\)"/);
  assert.match(result.content, /\(Key Constraint\) \(KC1\) — Macronutrient Substrate Availability/);
  assert.match(result.content, /class="brs-kc-title-link" href="\/docs\/kc1"/);
  assert.doesNotMatch(result.content, /Open KC →/);
  assert.doesNotMatch(result.content, /brs-fm-hub-toggle/);
  assert.doesNotMatch(result.content, /<div class="brs-fm-hub-panel" hidden>\s*- Amino acids/);
  assert.match(result.content, /<div class="brs-fm-hub-panel">\s*- Amino acids/);
  assert.doesNotMatch(result.content, /^-\s+\[BRS4\(KC1\)/m);
  assert.match(result.content, /^-\s+Amino acids ← fish, eggs$/m);

  const repeat = transformPmKcPresentation(result.content);
  assert.equal(repeat.changed, false);
});

test("downstream consumers retain every nested KC and its detail bullets", () => {
  const { content } = transformPmKcPresentation(PM_PANEL);
  assert.deepEqual(
    parseKcPanel(content).map(({ label, href }) => ({ label, href })),
    [
      {
        label: "(KC1) — Macronutrient Substrate Availability",
        href: "/docs/kc1",
      },
      {
        label: "(KC2) — Mitochondrial Cofactor Sufficiency",
        href: "/docs/kc2",
      },
    ],
  );

  const foodMap = buildLocalCofactorMap(content);
  assert.deepEqual([...foodMap.get("Amino acids")], ["fish", "eggs"]);
  assert.deepEqual([...foodMap.get("B vitamins")], ["whole grains", "eggs"]);
});
