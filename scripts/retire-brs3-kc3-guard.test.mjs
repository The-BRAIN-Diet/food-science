import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import matter from "gray-matter";
import {
  stripKc3HubPanel413,
  transformMdxBody,
  transformPlainMarkdown,
} from "./lib/retire-brs3-kc3.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PROTECTED_POOL_LINES = {
  BRS5_KC3_OMEGA3: "- Omega-3 fatty acids ← oily fish, algae, eggs",
  BRS1_SNP2_DHA: "- DHA ← salmon, sardines, omega-3 eggs",
};

const BRS5_KC3_FIXTURE = path.join(
  __dirname,
  "fixtures/retire-brs3-kc3-brs5-kc3-pool.fixture.mdx",
);
const BRS1_SNP2_FIXTURE = path.join(
  __dirname,
  "fixtures/retire-brs3-kc3-brs1-sm-snp2-pool.fixture.mdx",
);

function assertLinePresent(content, line, label) {
  assert.match(
    content,
    new RegExp(line.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `${label}: must contain ${line}`,
  );
}

test("BRS5(KC3) fixture keeps omega-3 pool line after MDX retirement transform", async () => {
  const raw = await readFile(BRS5_KC3_FIXTURE, "utf8");
  const { data, content } = matter(raw);
  const { body } = transformMdxBody(content, { ...data });
  assert.match(body, /Omega-3 fatty acids ← oily fish, algae, eggs/);
  assert.doesNotMatch(body, /BRS3\(KC3\)/);
});

test("BRS1(SM-SNP2) fixture keeps DHA pool line after MDX retirement transform", async () => {
  const raw = await readFile(BRS1_SNP2_FIXTURE, "utf8");
  const { data, content } = matter(raw);
  const { body } = transformMdxBody(content, { ...data });
  assert.match(body, /DHA ← salmon, sardines, omega-3 eggs/);
  assert.match(body, /Phospholipid DHA ← roe, krill oil/);
});

test("plain markdown transform does not strip protected substance←food pool lines", async () => {
  const brs5 = await readFile(BRS5_KC3_FIXTURE, "utf8");
  const brs1 = await readFile(BRS1_SNP2_FIXTURE, "utf8");
  const { content: brs5Body } = matter(brs5);
  const { content: brs1Body } = matter(brs1);

  const brs5Result = transformPlainMarkdown(brs5Body);
  const brs1Result = transformPlainMarkdown(brs1Body);

  assert.match(brs5Result.content, /Omega-3 fatty acids ← oily fish, algae, eggs/);
  assert.match(brs1Result.content, /DHA ← salmon, sardines, omega-3 eggs/);
});

test("stripKc3HubPanel413 does not touch arbitrary Shared Biological Pool sections", () => {
  const poolOnly = `### 2. Shared Biological Pool\n\n${PROTECTED_POOL_LINES.BRS5_KC3_OMEGA3}\n`;
  assert.equal(stripKc3HubPanel413(poolOnly), poolOnly);
});

test("§4.1.3 KC panel still strips BRS3(KC3) pool bullets when scoped", () => {
  const panel = `<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>4.1.3 KCs (Key Constraints)</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

- [BRS3(KC3) — Essential Fatty Acid Balance](/docs/biological-targets/brs3/kc/brs3-kc3-essential-fatty-acid-balance)
- Omega-3 fatty acids ← oily fish, chia seeds, flax seeds
- DHA ← salmon, trout, algae

</div>
</div>
</div>`;

  const next = stripKc3HubPanel413(panel);
  assert.doesNotMatch(next, /BRS3\(KC3\)/);
  assert.doesNotMatch(next, /Omega-3 fatty acids ←/);
  assert.doesNotMatch(next, /DHA ← salmon, trout, algae/);
});

test("live BRS5(KC3) page retains protected omega-3 pool line", async () => {
  const brs5 = await readFile(
    path.join(
      __dirname,
      "../docs/biological-targets/brs5/kc/brs5-kc3-barrier-supportive-nutrient-sufficiency.mdx",
    ),
    "utf8",
  );
  assertLinePresent(brs5, PROTECTED_POOL_LINES.BRS5_KC3_OMEGA3, "live BRS5(KC3)");
});

test("live BRS1(SM-SNP2) page retains protected DHA pool line", async () => {
  const brs1 = await readFile(
    path.join(
      __dirname,
      "../docs/biological-targets/brs1/sm/brs1-sm-snp2-apoe4-omega-3-brain-delivery-sensitivity.mdx",
    ),
    "utf8",
  );
  assertLinePresent(brs1, PROTECTED_POOL_LINES.BRS1_SNP2_DHA, "live BRS1(SM-SNP2)");
});
