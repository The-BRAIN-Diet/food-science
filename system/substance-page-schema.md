# Substance Page Schema (Canonical)

Consolidated schema for BRAIN Diet substance pages (bioactives, metabolites, nutrients).  
**Worked example:** `docs/substances/bioactive-compounds/carotenoids/astaxanthin.md`.

Food pages remain under `system/food-page-schema.md`. Substance pages follow the same **reference convention** as food pages.

---

## Design principle

Substance pages record **chemical identity**, **dietary occurrence**, and **evidence attributed at the level studied** (isolated compound, glycoside, extract, or food). Do not treat a food trial as a substance trial, or a family-level finding as an isolated-compound finding.

---

## Body section order (canonical)

Order matches `astaxanthin.md` — identity and evidence before lists:

| # | Section | Heading / component | Required |
|---|---------|---------------------|----------|
| 1 | Overview | `## Overview` | Yes |
| 2 | Key Compound Highlights | `## Key Compound Highlights` | Yes (canonical) |
| 3 | Dietary Context | `## Dietary Context` | Yes (canonical) |
| 4 | Recipes | `## Recipes` + `<SubstanceRecipes tag="…" />` | Yes |
| 5 | Foods | `## Foods` + `<SubstanceFoods tag="…" />` | Yes |
| 6 | References | `## References` | Yes (canonical) |

**BRS matrix tables are deferred.** Do not add a hand-authored BRS rationale table or `<SubstanceMatrix />` on substance pages until the controlled batch job lands. Keep BRS tags and `mechanisms:` in front matter as the data layer for that job.

**Dietary Context** uses only subsections with meaningful, substance-specific content. Standard subsections (include when relevant):

- `### Food sources`
- `### Synergies`
- `### Supplement versus food`

Omit empty subsections. Quality over completeness.

When there is **no attributed research** for the isolated substance, keep Overview / Recipes / Foods, do not invent bibliography rows, and do not add a BRS mapping note as a substitute table.

---

## Overview

- **Two paragraphs**, ~90–160 words total.
- Paragraph 1: what the compound is, where it occurs in foods, and how it is used in this ontology.
- Paragraph 2: strongest evidence-backed relevance, with limitations (study type, supplement vs food, family vs isolated compound).
- Inline numeric citations `[1]`, `[2]` when claims need evidence.

---

## Key Compound Highlights

Immediately after Overview. **3–6 bullets**, one sentence or short clause each.

Purpose: fast, decision-relevant summary — not a dump of front-matter `mechanisms:` copy.

---

## BRS mapping (data only until batch)

- Tag the page with the **BRS hub tag names** used on biological-target documents (`Inflammation & Oxidative Stress`, `Mitochondrial Function & Bioenergetics`, and so on) when a mapping is evidenced.
- Put matching copy in front-matter `mechanisms:` for the forthcoming matrix batch job.
- Do **not** render `<SubstanceMatrix />` or a markdown BRS table on the page until that job runs.
- Do not assign a BRS mapping without bibliography-backed evidence.

---

## References

Same contract as food pages (`system/food-page-schema.md`):

- One entry per citation — **no bullet prefix**. Each entry starts with **`[n]`** (same number used inline).
- Each entry has **three parts in order**:
  1. **Explanation** — one sentence on why this paper supports a claim on *this* substance page.
  2. **Author and year** — plain text (e.g. `Ma et al. 2022`, `Queen et al. 2024`).
  3. **Paper title** — linked to `/docs/papers/BRAIN-Diet-References#citationKey` (title only in the link text).
- Citation keys must exist in `static/bibtex/BRAIN-diet.bib`.
- Plain-text-only lines without a bibliography link are invalid.

**Canonical worked example (`docs/substances/bioactive-compounds/carotenoids/astaxanthin.md`):**

```markdown
[2] Meta-analysis of 12 randomised trials (380 participants): astaxanthin supplementation reduced blood malondialdehyde versus placebo; effects on CRP and TNF-α were not significant. Ma et al. 2022. [Astaxanthin supplementation mildly reduced oxidative stress and inflammation biomarkers](/docs/papers/BRAIN-Diet-References#ma_astaxanthin_oxidative_2022)
```

---

## Front matter (summary)

- `tags`: `Substance` plus classification (`Bioactive`, `Carotenoid`, …), the substance name, and BRS hub tags when mapped.
- `list_image` / `inchikey` / `inchi_image` as in the substance cursor rule.
- `mechanisms:` keys must match BRS hub tag labels used on biological-target pages.
