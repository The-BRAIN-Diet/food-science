import test from "node:test"
import assert from "node:assert/strict"
import {
  scanFoodCitationIntegrity,
  collectIdenticalHighlightWarnings,
  hasMechanicalOverviewDump,
} from "./lib/food-citation-integrity.mjs"

test("flags Reports on Highlights and split/LaTeX citations as hard failures", () => {
  const md = `---
title: Test Food
---
## Overview

A claim about this food [Soerensen et al.

Within the BRAIN Diet framework, 2014](/docs/papers/BRAIN-Diet-References#soerensen_effect_2014) [1][2].

## Key Nutritional Highlights

- Reports on iron absorption in man: ascorbic acid and dose-dependent inhibition by phytate [1]
- Reports on effect of dairy calcium$^\\textrm{1}$ [2]

## Food Context

## References

[1] Reports on iron absorption in man. Hallberg 1989. [Iron absorption](/docs/papers/BRAIN-Diet-References#hallberg_iron_1989)
`
  const scan = scanFoodCitationIntegrity(md, { slug: "test-food" })
  const ids = scan.hard.map((h) => h.id)
  assert.ok(ids.includes("reports-on-highlights"))
  assert.ok(ids.includes("split-markdown-citation") || ids.includes("latex-citation-debris"))
  assert.ok(ids.includes("reports-on-reference"))
})

test("flags LaTeX HTML debris such as \\\\textless in references", () => {
  const md = `---
title: Flax Seeds
---
## Overview

Flax provides ALA.

## References

[1] \\\\textlessp\\\\textgreaterWhile animal products are rich in protein. Mariotti 2019. [Dietary protein](/docs/papers/BRAIN-Diet-References#mariotti_dietary_2019)
`
  const scan = scanFoodCitationIntegrity(md, { slug: "flax-seeds" })
  assert.ok(scan.hard.some((h) => h.id === "latex-citation-debris"))
})

test("does not treat a reviewed food finding as Reports-on boilerplate", () => {
  const md = `---
title: Eggs
---
## Overview

Eggs provide choline.

## Food Context

- Cooked egg protein is more digestible than raw [1].

## References

[1] Evenepoel et al. (1998). [Digestibility of cooked and raw egg protein in humans](/docs/papers/BRAIN-Diet-References#evenepoel_digestibility_1998). Cooked egg protein showed ~91% true ileal digestion versus ~51% for raw egg.
`
  const scan = scanFoodCitationIntegrity(md, { slug: "eggs" })
  assert.deepEqual(scan.hard, [])
})

test("mechanical Overview dump is the trailing [1][2] pattern", () => {
  assert.equal(
    hasMechanicalOverviewDump(
      "Spinach is nutritious.\n\nOxalate concerns are usually outweighed by benefits [1][2].",
    ),
    true,
  )
  assert.equal(
    hasMechanicalOverviewDump(
      "Cooked egg protein is more digestible than raw [1].",
    ),
    false,
  )
})

test("identical Highlights bullets across three foods are warned", () => {
  const page = (slug) => `---
title: ${slug}
---
## Overview

Body.

## Key Nutritional Highlights

- Pair with vitamin C sources to enhance iron absorption, with studies showing up to a fourfold increase when consumed together [1]

## References
`
  const warnings = collectIdenticalHighlightWarnings([
    { slug: "a", markdown: page("a") },
    { slug: "b", markdown: page("b") },
    { slug: "c", markdown: page("c") },
  ])
  assert.equal(warnings.length, 1)
  assert.equal(warnings[0].id, "identical-generic-highlights")
})
