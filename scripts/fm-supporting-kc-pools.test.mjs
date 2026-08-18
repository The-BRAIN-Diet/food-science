import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import matter from "gray-matter"
import {
  buildSupportingKcPoolMarkdown,
  deriveFmKcUnion,
  extractKcIdsFromText,
  insertSupportingKcPoolListing,
  parsePmKeyConstraintIds,
  parseRenderedKcPoolIds,
  reconcileFmKcPools,
} from "./lib/fm-supporting-kc-pools.mjs"
import { buildKcPoolIndex } from "./lib/kc-pool-index.mjs"

function writeTree(root, files) {
  for (const [rel, body] of Object.entries(files)) {
    const full = path.join(root, rel)
    fs.mkdirSync(path.dirname(full), { recursive: true })
    fs.writeFileSync(full, body)
  }
}

function fixtureRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "fm-kc-pools-"))
  writeTree(root, {
    "docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool.mdx": `---
title: One-Carbon Donor Pool
kc_id: BRS2(KC1)
parent_brs: BRS2
summary: Maintain one-carbon donor sufficiency to support remethylation.
---

### BRS2(KC1) - One-Carbon Donor Pool

### 1. Ambition

Maintain one-carbon donor sufficiency.

### 2. Core Nutritional Requirements

- Folate ← leafy greens
`,
    "docs/biological-targets/brs2/kc/brs2-kc2-methionine-transsulfuration-substrate-pool.mdx": `---
title: Methionine & Transsulfuration Substrate Pool
kc_id: BRS2(KC2)
parent_brs: BRS2
summary: Maintain sulfur amino-acid substrate adequacy and balance.
---

### BRS2(KC2) - Methionine & Transsulfuration Substrate Pool

### 1. Ambition

Maintain sulfur amino-acid substrate adequacy.

### 2. Core Nutritional Requirements

- Methionine ← fish
`,
    "docs/biological-targets/brs9/kc/brs9-kc1-unmapped-neighbour-pool.mdx": `---
title: Unmapped Neighbour Pool
kc_id: BRS9(KC1)
parent_brs: BRS9
summary: Neighbour abstract that must never be borrowed.
---

### BRS9(KC1) - Unmapped Neighbour Pool
`,
    "docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate.mdx": `---
title: Folate Remethylation
pm_id: BRS2-FM1-PM1
key_constraints:
  - BRS2(KC1) - One-Carbon Donor Pool
  - BRS2(KC1) - One-Carbon Donor Pool
---

<summary><strong>4.1.3 KCs (Key Constraints)</strong></summary>

- [BRS2(KC1) - One-Carbon Donor Pool](/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool)

</details>
`,
    "docs/biological-targets/brs2/fm1/brs2-fm1-pm2-cycle.mdx": `---
title: Cycle Flux
pm_id: BRS2-FM1-PM2
key_constraints:
  - BRS2(KC1) - One-Carbon Donor Pool
  - BRS2(KC2) - Methionine & Transsulfuration Substrate Pool
---
`,
    "docs/biological-targets/brs2/fm1/brs2-fm1-pm3-unmapped.mdx": `---
title: Unmapped PM
pm_id: BRS2-FM1-PM3
---

<summary><strong>4.1.3 KCs (Key Constraints)</strong></summary>

- [BRS2(KC2) - Methionine & Transsulfuration Substrate Pool](/docs/biological-targets/brs2/kc/brs2-kc2-methionine-transsulfuration-substrate-pool)

</details>
`,
    "docs/biological-targets/brs2/fm1/brs2-fm1-methylation.mdx": `---
title: Methylation Cycle Efficiency
fm_id: BRS2(FM1)
mechanisms_covered:
  - id: BRS2-FM1-PM1
    name: Folate Remethylation
    href: /docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate
  - id: BRS2-FM1-PM2
    name: Cycle Flux
    href: /docs/biological-targets/brs2/fm1/brs2-fm1-pm2-cycle
  - id: BRS2-FM1-PM3
    name: Unmapped PM
    href: /docs/biological-targets/brs2/fm1/brs2-fm1-pm3-unmapped
---
## 4. Mechanistic Basis (Integrated FM Narrative)

Methylation cycle efficiency emerges from the coordinated interaction of several primary mechanisms and supporting biological pools.

### 4.1 Core Primary Mechanisms

- [BRS2-FM1-PM1 — Folate Remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate)

### 4.2 Integrated Functional Narrative

Together, these PMs operate as a cycle.

### 4.3 Suboptimal Function & Its Effects

Cycle efficiency may weaken when [BRS2(KC1) — One-Carbon Donor Pool](/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool) is low, or when [BRS9(KC1) — Unmapped Neighbour Pool](/docs/biological-targets/brs9/kc/brs9-kc1-unmapped-neighbour-pool) is cited in error.

## 5. Connected Mechanisms
`,
    "docs/biological-targets/brs1/fm3/brs1-fm3-pm6-membrane.mdx": `---
title: Membrane
pm_id: BRS1-FM3-PM6
---
`,
    "docs/biological-targets/brs1/fm3/brs1-fm3-membrane.mdx": `---
title: Membrane Composition
fm_id: BRS1(FM3)
mechanisms_covered:
  - id: BRS1-FM3-PM6
    name: Membrane
    href: /docs/biological-targets/brs1/fm3/brs1-fm3-pm6-membrane
---
## 4. Mechanistic Basis (Integrated FM Narrative)

Membrane composition represents a framework-relevant biological state anchored principally by its sole primary mechanism.

### 4.1 Core Primary Mechanisms

- [BRS1-FM3-PM6 — Membrane](/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-membrane)

### 4.2 Integrated Functional Narrative

Broader membrane state.

### 4.3 Suboptimal Function & Its Effects

Membrane integrity may weaken.

## 5. Connected Mechanisms
`,
  })
  return root
}

test("PM key_constraints are joined by exact KC id and duplicates collapse", () => {
  assert.deepEqual(
    parsePmKeyConstraintIds([
      "BRS2(KC1) - One-Carbon Donor Pool",
      "BRS2(KC1) - One-Carbon Donor Pool",
      { id: "BRS2(KC2)", name: "Methionine & Transsulfuration Substrate Pool" },
    ]),
    ["BRS2(KC1)", "BRS2(KC2)"],
  )
})

test("FM KC list is the PM-derived union and does not borrow a neighbouring KC", () => {
  const root = fixtureRepo()
  const fmPath = path.join(root, "docs/biological-targets/brs2/fm1/brs2-fm1-methylation.mdx")
  const parsed = matter(fs.readFileSync(fmPath, "utf8"))
  const kcIndex = buildKcPoolIndex(path.join(root, "docs"))
  const { kcs } = deriveFmKcUnion(parsed.data, root, kcIndex)
  assert.deepEqual(
    kcs.map((kc) => kc.id),
    ["BRS2(KC1)", "BRS2(KC2)"],
  )
  assert.equal(kcs.some((kc) => kc.id === "BRS9(KC1)"), false)
  const markdown = buildSupportingKcPoolMarkdown(kcs)
  assert.match(markdown, /\*\*Supporting Key Constraint Pools\*\*/)
  assert.equal(parseRenderedKcPoolIds(markdown).length, 2)
  assert.match(markdown, /Relied upon by: \[BRS2-FM1-PM1\]/)
  assert.match(markdown, /BRS2-FM1-PM2/)
  assert.doesNotMatch(markdown, /BRS9\(KC1\)/)
  assert.doesNotMatch(markdown, /Neighbour abstract/)
})

test("missing PM KC mapping produces no empty section and does not infer from prose", () => {
  const root = fixtureRepo()
  const fmPath = path.join(root, "docs/biological-targets/brs1/fm3/brs1-fm3-membrane.mdx")
  const parsed = matter(fs.readFileSync(fmPath, "utf8"))
  const kcIndex = buildKcPoolIndex(path.join(root, "docs"))
  const { kcs } = deriveFmKcUnion(parsed.data, root, kcIndex)
  assert.deepEqual(kcs, [])
  assert.equal(buildSupportingKcPoolMarkdown(kcs), "")
  const inserted = insertSupportingKcPoolListing(parsed.content, "")
  assert.doesNotMatch(inserted, /Supporting Key Constraint Pools/)
  assert.match(inserted, /anchored principally by its sole primary mechanism\.\n\n### 4\.1 /)
})

test("listing sits after the opening sentence and before 4.1", () => {
  const root = fixtureRepo()
  const fmPath = path.join(root, "docs/biological-targets/brs2/fm1/brs2-fm1-methylation.mdx")
  const raw = fs.readFileSync(fmPath, "utf8")
  const listing = `${buildSupportingKcPoolMarkdown([{ id: "BRS2(KC1)", name: "One-Carbon Donor Pool", href: "/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool", role: "Provides donor capacity.", pms: [{ id: "BRS2-FM1-PM1", href: "/pm1" }] }])}`
  const next = insertSupportingKcPoolListing(raw, listing)
  const opening = "Methylation cycle efficiency emerges from the coordinated interaction of several primary mechanisms and supporting biological pools."
  const idxOpening = next.indexOf(opening)
  const idxListing = next.indexOf("**Supporting Key Constraint Pools**")
  const idx41 = next.indexOf("### 4.1 Core Primary Mechanisms")
  const idx43 = next.indexOf("### 4.3 Suboptimal Function & Its Effects")
  assert.ok(idxOpening > 0)
  assert.ok(idxListing > idxOpening)
  assert.ok(idx41 > idxListing)
  assert.ok(idx43 > idx41)
  assert.doesNotMatch(next, /### 4\.2 Supporting Biological Pools/)
})

test("§4.3 KC absent from the PM-derived union is flagged and not inferred onto the list", () => {
  const root = fixtureRepo()
  const fmPath = path.join(root, "docs/biological-targets/brs2/fm1/brs2-fm1-methylation.mdx")
  const kcIndex = buildKcPoolIndex(path.join(root, "docs"))
  const report = reconcileFmKcPools(fmPath, { rootDir: root, kcIndex })
  assert.deepEqual(report.derivedIds, ["BRS2(KC1)", "BRS2(KC2)"])
  assert.ok(report.missingFromUnion.includes("BRS9(KC1)"))
  assert.equal(report.issues.some((issue) => issue.code === "fm_kc_43_not_in_pm_union"), true)
  assert.equal(report.kcs.some((kc) => kc.id === "BRS9(KC1)"), false)
  assert.equal(
    report.pmsMissingMapping.some((gap) => gap.pmId === "BRS2-FM1-PM3"),
    true,
  )
})

test("extractKcIdsFromText does not use array position or neighbour fallback", () => {
  const text = "See [BRS2(KC2)](/x) after an unmapped [BRS9(KC1)](/y)."
  assert.deepEqual(extractKcIdsFromText(text), ["BRS2(KC2)", "BRS9(KC1)"])
})
