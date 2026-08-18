import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import {
  fallbackReferenceExplanation,
  formatSalmonRoeRefLine,
  formatFoodReferenceLine,
  isFoodReferenceLine,
  loadBibIndex,
  rebuildExplainedReferencesSection,
  citationNumbersInFragment,
} from "./lib/bib-citation-format.mjs"

function writeTempBib(contents) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bib-key-join-"))
  const file = path.join(dir, "test.bib")
  fs.writeFileSync(file, contents)
  return file
}

test("BibTeX lookup is by exact citation key and does not borrow a neighbour abstract", () => {
  const bibPath = writeTempBib(`@article{first_key_2020,
  title = {First Paper About Insulin Signalling in the Brain},
  year = {2020},
  author = {Alpha, Ann},
}

@article{second_key_2021,
  title = {Second Paper About Something Else Entirely},
  year = {2021},
  author = {Beta, Bob},
  abstract = {Phytates are a type of organophosphorus compound produced in terrestrial ecosystems by plants.},
}
`)
  const index = loadBibIndex(bibPath)
  const first = index.get("first_key_2020")
  const second = index.get("second_key_2021")

  assert.equal(index.get("first_key_2020") === index.get("second_key_2021"), false)
  assert.equal(first.key, "first_key_2020")
  assert.equal(second.key, "second_key_2021")
  assert.equal(first.abstract == null || first.abstract.trim() === "", true)
  assert.match(second.abstract, /Phytates are a type of organophosphorus/)

  const fallback = fallbackReferenceExplanation(first)
  assert.doesNotMatch(fallback, /Phytates/)
  assert.doesNotMatch(fallback, /organophosphorus/)
  assert.match(fallback, /insulin signalling/i)
})

test("missing abstract does not borrow text when the next @ entry is concatenated without a blank line", () => {
  const bibPath = writeTempBib(`@article{silent_key_2019,
  title = {A Quiet Paper With No Abstract Field At All},
  year = {2019},
  author = {Gamma, G.},
}@article{loud_key_2019,
  title = {A Loud Neighbouring Paper},
  year = {2019},
  author = {Delta, D.},
  abstract = {Attention-deficit/hyperactivity disorder (ADHD) is a neurodevelopmental disorder that has become increasingly prevalent worldwide.},
}
`)
  const index = loadBibIndex(bibPath)
  const silent = index.get("silent_key_2019")
  const loud = index.get("loud_key_2019")
  assert.ok(silent)
  assert.ok(loud)
  assert.equal(silent.abstract == null || silent.abstract.trim() === "", true)
  assert.match(loud.abstract, /Attention-deficit/)
  assert.doesNotMatch(fallbackReferenceExplanation(silent), /Attention-deficit/)
  assert.doesNotMatch(fallbackReferenceExplanation(silent), /ADHD/)
})

test("rebuildExplainedReferencesSection joins summaries by citation key not array position", () => {
  const bibPath = writeTempBib(`@article{first_key_2020,
  title = {First Paper About Insulin Signalling in the Brain},
  year = {2020},
  author = {Alpha, Ann},
}

@article{second_key_2021,
  title = {Second Paper About Something Else Entirely},
  year = {2021},
  author = {Beta, Bob},
  abstract = {Phytates are a type of organophosphorus compound produced in terrestrial ecosystems by plants.},
}
`)
  const index = loadBibIndex(bibPath)
  const page = `## Overview

A food-specific claim that needs a citation [1].

## References

[1] [First Paper About Insulin Signalling in the Brain](/docs/papers/BRAIN-Diet-References#first_key_2020)
`
  const rebuilt = rebuildExplainedReferencesSection(page, page.split("## References")[1], index, true)
  assert.match(rebuilt, /BRAIN-Diet-References#first_key_2020/)
  assert.doesNotMatch(rebuilt, /Phytates/)
  assert.doesNotMatch(rebuilt, /second_key_2021/)
})

test("missing abstract does not take the first abstract several entries later in the file", () => {
  const bibPath = writeTempBib(`@article{gruber_like_2023,
  title = {Impact of insulin and insulin resistance on brain dopamine signalling},
  year = {2023},
  author = {Gruber, Judith},
}

@article{manary_like_2000,
  title = {Dietary Phytate Reduction Improves Zinc Absorption},
  year = {2000},
  author = {Manary, Mark J.},
}

@article{pires_like_2023,
  title = {Phytates as a natural source for health promotion},
  year = {2023},
  author = {Pires, Sonia},
  abstract = {Phytates are a type of organophosphorus compound produced in terrestrial ecosystems by plants.},
}
`)
  const index = loadBibIndex(bibPath)
  const silent = index.get("gruber_like_2023")
  assert.equal(silent.abstract == null || silent.abstract.trim() === "", true)
  const fallback = fallbackReferenceExplanation(silent)
  assert.doesNotMatch(fallback, /Phytates are a type of organophosphorus/)
  assert.doesNotMatch(fallback, /terrestrial ecosystems/)
  assert.match(fallback, /insulin/i)
})

test("formatSalmonRoeRefLine never substitutes a missing key with a neighbouring entry", () => {
  const bibPath = writeTempBib(`@article{real_key_2018,
  title = {The Real Paper Title Is Long Enough To Use},
  year = {2018},
  author = {Epsilon, E. and Zeta, Z.},
  abstract = {Neurological, neurodegenerative, and psychiatric disorders represent a serious burden because of their increasing prevalence.},
}
`)
  const index = loadBibIndex(bibPath)
  const line = formatSalmonRoeRefLine(1, "missing_key_2018", null, null, index)
  assert.match(line, /#missing_key_2018/)
  assert.doesNotMatch(line, /Neurological, neurodegenerative/)
  assert.doesNotMatch(line, /real_key_2018/)
})

test("title-derived fallback keeps leading acronyms instead of inventing a neighbour abstract", () => {
  const bibPath = writeTempBib(`@article{dha_key_2013,
  title = {{DHA} supplementation improved both memory and reaction time in healthy young adults: a randomized controlled trial},
  year = {2013},
  author = {Stonehouse, Welma},
}
`)
  const index = loadBibIndex(bibPath)
  const fallback = fallbackReferenceExplanation(index.get("dha_key_2013"))
  assert.doesNotMatch(fallback, /^Reports on dHA/)
  assert.match(fallback, /^DHA supplementation/)
})

test("citation number extraction understands comma lists and inclusive ranges", () => {
  assert.deepEqual([...citationNumbersInFragment("see [1–3] and [5]")].sort((a, b) => a - b), [1, 2, 3, 5])
  assert.deepEqual([...citationNumbersInFragment("see [1-3]")].sort((a, b) => a - b), [1, 2, 3])
  assert.deepEqual([...citationNumbersInFragment("see [1,2,3]")].sort((a, b) => a - b), [1, 2, 3])
})

test("food reference lines keep Author (Year) and linked title before the finding", () => {
  const bibPath = writeTempBib(`@article{first_key_2020,
  title = {First Paper About Insulin Signalling in the Brain},
  year = {2020},
  author = {Alpha, Ann},
}

@article{second_key_2021,
  title = {Second Paper About Something Else Entirely},
  year = {2021},
  author = {Beta, Bob},
  abstract = {Phytates are a type of organophosphorus compound produced in terrestrial ecosystems by plants.},
}
`)
  const index = loadBibIndex(bibPath)
  const line = formatFoodReferenceLine(
    1,
    "first_key_2020",
    "Intact apple produced greater satiety than juice",
    null,
    index,
  )
  assert.equal(isFoodReferenceLine(line), true, line)
  assert.match(line, /^\[1\] Alpha et al\. \(2020\)\. \[/)
  assert.match(line, /#first_key_2020\)\. Intact apple produced greater satiety than juice\.$/)
  assert.doesNotMatch(line, /Phytates/)
  assert.doesNotMatch(line, /second_key_2021/)
})
