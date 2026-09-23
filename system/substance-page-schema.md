# Substance Page Schema (Canonical)

Consolidated schema for BRAIN Diet substance pages (bioactives, metabolites, nutrients).  
**Worked examples:** `docs/substances/bioactive-compounds/carotenoids/astaxanthin.md` (short Highlights page) and `docs/substances/nutrients/micronutrients/minerals/trace/copper.md` (Highlights + Advanced Nutrition + Therapeutic Area Research).

Food pages remain under `system/food-page-schema.md`. Substance pages follow the same **reference convention** as food pages.

---

## Design principle

Substance pages record **chemical identity**, **dietary occurrence**, and **evidence attributed at the level studied** (isolated compound, glycoside, extract, or food). Do not treat a food trial as a substance trial, or a family-level finding as an isolated-compound finding.

The default public view is **Nutritional Highlights**. Longer biological research belongs in **Advanced Nutrition**. Condition-specific evidence belongs in **Therapeutic Area Research**. Those two panels must not leak headings into the Highlights table of contents.

---

## Body section order (canonical, Nutritional Highlights)

Order matches `astaxanthin.md` — identity and evidence before lists. Copper follows the same Highlights order, then adds BRS rows and a top-five reference set:

| # | Section | Heading / component | Required |
|---|---------|---------------------|----------|
| 1 | Overview | `## Overview` | Yes |
| 2 | Key Compound Highlights | `## Key Compound Highlights` | Yes (canonical) |
| 3 | Dietary Context | `## Dietary Context` | Yes (canonical) |
| 4 | Recipes | `## Recipes` + `<SubstanceRecipes tag="…" />` | Yes |
| 5 | Foods | `## Foods` + `<SubstanceFoods tag="…" />` | Yes |
| 6 | Biological Regulatory Systems | `## Biological Regulatory Systems` + compact BRS table | Yes when a mapping is evidenced |
| 7 | References | `## References` | Yes (canonical); top five preferred when the evidence base allows it |

**Dietary Context** uses only subsections with meaningful, substance-specific content. Standard subsections (include when relevant):

- `### Food sources`
- `### Synergies`
- `### Supplement versus food`

Omit empty subsections. Quality over completeness.

When there is **no attributed research** for the isolated substance, keep Overview / Recipes / Foods, do not invent bibliography rows, and do not add a BRS mapping note as a substitute table.

---

## Page tabs

Food, substance and recipe pages expose content tabs in `DocUtilityBar`. Highlights is the markdown body. Additional panels are MDX slots that render only when that tab is selected (`?advanced=1`, `?therapeutic=1`).

| Tab | Query | MDX slot | Role |
|-----|-------|----------|------|
| Nutritional Highlights | *(default)* | page body | Canonical identity, diet, compact BRS rows, top references |
| Advanced Nutrition | `advanced=1` | `<AdvancedNutrition>` | Biological overspill of the Highlights BRS matrix — mechanisms, cascades, diagrams, measurement caveats |
| Therapeutic Area Research | `therapeutic=1` | `<TherapeuticAreaResearch>` | Condition-specific observational, mechanistic and intervention evidence |
| Review & Corrections | `review=1` | utility panel | Internal QC only |

Rules:

- Headings inside `<AdvancedNutrition>` and `<TherapeuticAreaResearch>` must be HTML (`<h2 id="…">`, `<h3>`) so they do **not** appear in the Highlights table of contents.
- Each of those panels may include its own References block. That block stays inside the tab. Do not place tab content structurally after a second markdown `## References` heading that would duplicate TOC entries.
- Advanced Nutrition is **not** the therapeutic-area dump. If a section is primarily about a diagnosis, treatment claim, or Walsh-style biotype, it belongs in Therapeutic Area Research.
- Therapeutic Area Research must not invent pages. Therapeutic-area documents are unpublished until ready; keep area names as plain text and do not link `/docs/therapeutic-areas/…`.
- Cite panel-local references from the matrix or surrounding prose. ADHD and other condition papers belong on this tab, not on Advanced Nutrition. Most observational papers can cite the matrix row they support.
- Tabs with no slot content remain visible but disabled (“Not yet activated”).

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

## BRS mapping

Highlights carries the **compact** BRS matrix: one row per mapped Biological Regulatory System, with a short mapping clause and citation numbers into the Highlights reference set.

- Tag the page with the **BRS hub tag names** used on biological-target documents (`Neurotransmitter Regulation`, `Inflammation & Oxidative Stress`, `Gut-Brain Axis & Enteric Nervous System`, `Metabolic & Neuroendocrine Regulation`, `Methylation & One-Carbon Metabolism`, `Mitochondrial Function & Bioenergetics`).
- Put matching copy in front-matter `mechanisms:` using those exact keys.
- Prefer a hand-authored markdown table on Highlights when the mapping is evidenced and cited, as on copper. `<SubstanceMatrix />` may be used only when those hub tags resolve; do not leave an empty-state message on a substance that has mapped biology.
- Do not assign a BRS mapping without bibliography-backed evidence.
- Longer mechanistic narrative, diagrams and measurement caveats go in **Advanced Nutrition** as overspill of this table, not as a second Highlights section.

---

## Advanced Nutrition

Use this tab for biological research that would overcrowd Highlights:

- Cross-system cascades (for example copper–zinc regulation)
- Accessible diagrams (`<AccessibleMermaid title="…" description="…" value={…} />`)
- Why a circulating ratio is not a brain concentration or a biotype
- Extra mechanistic references beyond the Highlights top five

Do not put the main therapeutic-area matrix here.

---

## Therapeutic Area Research

Use this tab for diagnosis- and condition-level evidence. Typical contents:

- A collapsible matrix (collapsed by default) with columns **Therapeutic area**, **Observational evidence**, **Mechanistic relevance**, **Intervention evidence**, **Framework status**
- Historical or clinical frameworks that are not adopted as BRAIN subtypes (for example Walsh biochemical biotypes)
- Panel-local references, cited from the matrix or Walsh discussion; do not leave a hanging bibliography

Distinguish association, mechanism and intervention in every row. Do not treat observational mineral differences as treatment protocols.

---

## References

Same contract as food pages (`system/food-page-schema.md`) for the Highlights `## References` block:

- One entry per citation — **no bullet prefix**. Each entry starts with **`[n]`** (same number used inline).
- Each entry has **three parts in order**:
  1. **Explanation** — one sentence on why this paper supports a claim on *this* substance page.
  2. **Author and year** — plain text (e.g. `Ma et al. 2022`, `Scheiber, Mercer and Dringen 2014`).
  3. **Paper title** — linked to `/docs/papers/BRAIN-Diet-References#citationKey` (title only in the link text).
- Citation keys must exist in `static/bibtex/BRAIN-diet.bib`.
- Plain-text-only lines without a bibliography link are invalid.
- Highlights should use a **top five** where the evidence base allows it. Further biological papers go to Advanced Nutrition; condition-specific papers go to Therapeutic Area Research. Panel-local lists may use author-year links.

**Canonical short example (`docs/substances/bioactive-compounds/carotenoids/astaxanthin.md`):**

```markdown
[2] Meta-analysis of 12 randomised trials (380 participants): astaxanthin supplementation reduced blood malondialdehyde versus placebo; effects on CRP and TNF-α were not significant. Ma et al. 2022. [Astaxanthin supplementation mildly reduced oxidative stress and inflammation biomarkers](/docs/papers/BRAIN-Diet-References#ma_astaxanthin_oxidative_2022)
```

---

## Front matter (summary)

- `tags`: `Substance` plus classification (`Bioactive`, `Carotenoid`, `Trace Mineral`, …), the substance name, and BRS hub tags when mapped.
- `list_image` / `inchikey` / `inchi_image` as in the substance cursor rule.
- `mechanisms:` keys must match BRS hub tag labels used on biological-target pages.
- Do not use legacy labels (`Neurochemical Balance`, `Inflammation`, `Oxidative Stress`, `Methylation`) as BRS tags; those do not resolve to hub documents.
