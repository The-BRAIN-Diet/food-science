# Substance Page Schema (Canonical)

### Nutrient naming

Apply [Nutrient naming conventions](nutrient-naming-conventions.md) to vitamin names, form-specific claims and structured input/presentation labels. Keep family, specific form, preferred display label and aliases separately in the authoring/identity record; project labels through existing accepted page fields. This applies to Stage 2A handoff and Stage 2B adjudication.


Consolidated schema for BRAIN Diet substance pages (bioactives, metabolites, nutrients).  
**Worked examples:** `docs/substances/bioactive-compounds/carotenoids/astaxanthin.md` (short Highlights page) and `docs/substances/nutrients/micronutrients/minerals/trace/copper.md` (Highlights + Advanced Nutrition + Therapeutic Area Research).

Food pages remain under `system/food-page-schema.md`. Substance pages follow the same **reference convention** as food pages.

---

## Design principle

Substance pages record **chemical identity**, **dietary origin**, and **evidence attributed at the level studied** (isolated compound, glycoside, extract, food, standardised extract, supplemental formulation, or combination formulation). Do not treat a food trial as a substance trial, or a family-level finding as an isolated-compound finding.

The default public view is **Nutritional Highlights**. Longer biological research belongs in **Advanced Nutrition**. Condition-specific evidence belongs in **Therapeutic Area Research**. Those two panels must not leak headings into the Highlights table of contents or duplicate the default view.

---

## Body section order (canonical, Nutritional Highlights)

Order matches `astaxanthin.md` — identity, dietary origin and evidence qualification before generated lists:

| # | Section | Heading / component | Required |
|---|---------|---------------------|----------|
| 1 | Overview | `## Overview` | Yes |
| 2 | Dietary Origin | `## Dietary Origin` | Yes |
| 3 | Research Spotlights & Evidence Checks | `## Research Spotlights & Evidence Checks` | Optional |
| 4 | Recipes | `## Recipes` + `<SubstanceRecipes tag="…" />` | Yes |
| 5 | Foods | `## Foods` + `<SubstanceFoods tag="…" />` | Yes |
| 6 | Biological Regulatory Systems | `## Biological Regulatory Systems` + compact BRS table | Yes when a mapping is evidenced |
| 7 | References | `## References` | Yes (canonical); top five preferred when the evidence base allows it |

`Key Compound Highlights` is no longer a canonical standalone section. Useful material belongs in Overview, Dietary Origin, a Research Spotlight or Evidence Check, or the appropriate advanced evidence view.

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

## Dietary Origin

Explain how dietary exposure relates to the substance. This is relationship-aware and conditional, not a fixed checklist. Include only relationships supported for the substance:

- **Direct food occurrence:** `Food → contains → Substance`
- **Dietary precursor:** `Food/input → provides precursor → formation → Substance`
- **Microbial formation:** `Dietary substrate → microbial conversion/fermentation → Substance`
- **Endogenous formation**
- **Bioavailability or food-matrix context**
- **Direct supplemental or concentrated exposure**

Direct occurrence and precursor/support relationships are different edges. A food that supplies ellagitannins for microbial Urolithin A production does not contain Urolithin A. A fermentable-fibre food does not contain Butyrate merely because fermentation may produce it.

Where canonical PM/KC dietary-requirement atoms and validated Food-to-input
relationships exist, Dietary Origin may render them with
`<DietaryOriginProjection target="…" pmId="…" />`. The component is a
presentation of those records: nodes are entities, edges are relationships,
clicks navigate available entities, and hover/disclosure exposes the evidence
and limitations carried by each edge. It must not infer Food relationships from
tags or prose, and evidence for one edge must not be inherited by another.

Food front matter may declare a non-containment edge in `substance_relationships`:

```yaml
substance_relationships:
  - substance: Urolithin A
    relationship: dietary-precursor
    input: Ellagitannins / ellagic acid
    process: Microbial conversion
    citation_keys:
      - citation_key
```

`relationship` is an extensible relationship label, not a closed ontology. Current presentation recognises `dietary-precursor`, `microbial-formation`, `endogenous-formation`, `bioavailability-context`, and `direct-supplemental-exposure`. Do not use `contains` for downstream formation unless direct occurrence is independently evidenced.

---

## Research Spotlights & Evidence Checks

Optional presentations of existing evidence:

- **Research Spotlight** — a noteworthy study or synthesis.
- **Evidence Check** — examination of a common, important, uncertain or potentially misleading proposition.

Prefer question headings where natural. Use `<EvidencePresentation>` with `kind="spotlight"` or `kind="check"`, an `exposureContext`, a concise summary, and expandable evidence. These are presentations, not independent evidence records. Where canonical finding atoms exist, project from them rather than copying them into a parallel schema.

**Exposure Context belongs to an evidence relationship, not to the intrinsic substance.** Initial descriptive values include `whole-food`, `dietary`, `isolated-substance`, `standardised-extract`, `supplemental-formulation`, and `combination-formulation`; this is not a frozen taxonomy. Preserve the actual exposure tested whenever evidence is projected elsewhere.

Food occurrence does not make an isolated or concentrated intervention a food effect. A whole-food intervention does not attribute its outcome to one constituent. A combination intervention is not isolated-substance evidence unless its design supports that attribution.

---

## BRS mapping

Highlights carries the **compact** BRS matrix: one row per mapped Biological Regulatory System, with a short mapping clause and citation numbers into the Highlights reference set.

The canonical relationship direction is:

`Substance → evidence-qualified PM / KC relationship → BRS`

Prefer canonical PM Dietary Requirement relationships where available. Do not create an independent Substance→BRS claim merely from a tag.

- Tag the page with the **BRS hub tag names** used on biological-target documents (`Neurotransmitter Regulation`, `Inflammation & Oxidative Stress`, `Gut-Brain Axis & Enteric Nervous System`, `Metabolic & Neuroendocrine Regulation`, `Methylation & One-Carbon Metabolism`, `Mitochondrial Function & Bioenergetics`).
- Put matching copy in front-matter `mechanisms:` using those exact keys.
- Prefer a hand-authored markdown table on Highlights when the mapping is evidenced and cited, as on copper. `<SubstanceMatrix />` is a legacy/fallback renderer for unmigrated pages and may be used only when current hub tags resolve; it is not the future source of truth.
- Do not assign a BRS mapping without bibliography-backed evidence.
- Longer mechanistic narrative, diagrams and measurement caveats go in **Advanced Nutrition** as overspill of this table, not as a second Highlights section.

---

## Food / Substance evidence boundary

1. Do not infer a Substance effect from a whole-food outcome merely because the Food contains that Substance.
2. Do not infer that eating a Food reproduces an isolated-Substance intervention merely because the Food contains that Substance.
3. Composition evidence, bioavailability evidence, intervention evidence and clinical/outcome evidence are distinct relationships.
4. Translation between Food exposure and isolated/concentrated Substance exposure requires evidence or must remain explicitly inferential.

The relationship-aware Foods presentation may show direct occurrence and precursor/support edges together, but must label the edge. Existing tag-only matches remain a migration fallback and must be identified as such rather than silently strengthening the relationship.

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

Same canonical bibliographic core as food pages (`system/food-page-schema.md`) for the Highlights `## References` block:

- Cite in body as `[1]`, `[2]`, `[1,2]`, or `[3–5]`.
- One entry per citation — **no bullet prefix**. Each entry starts with **`[n]`**.
- Each entry has three parts:
  1. **Author and year** — plain text (`Ma et al. (2022).`).
  2. **Full paper title** — linked to `/docs/papers/BRAIN-Diet-References#citationKey`.
  3. **One concise explanation** of why the source matters on this Substance page.
- Citation keys must exist in `static/bibtex/BRAIN-diet.bib`.
- Plain-text-only lines without a bibliography link are invalid.
- Highlights should use a **top five** where the evidence base allows it. Further biological papers go to Advanced Nutrition; condition-specific papers go to Therapeutic Area Research. Panel-local lists may use author-year links.
- Research Spotlights and Evidence Checks cite this same list. Do not create a second bibliography.

**Canonical short example (`docs/substances/bioactive-compounds/carotenoids/astaxanthin.md`):**

```markdown
[2] Ma et al. (2022). [Astaxanthin supplementation mildly reduced oxidative stress and inflammation biomarkers](/docs/papers/BRAIN-Diet-References#ma_astaxanthin_oxidative_2022). Meta-analysis of supplemental astaxanthin trials supporting the oxidative-stress biomarker Spotlight while showing less certain inflammatory-marker effects.
```

---

## Front matter (summary)

- `tags`: `Substance` plus classification (`Bioactive`, `Carotenoid`, `Trace Mineral`, …), the substance name, and BRS hub tags when mapped.
- `list_image` / `inchikey` / `inchi_image` as in the substance cursor rule.
- `mechanisms:` keys must match BRS hub tag labels used on biological-target pages.
- Do not use legacy labels (`Neurochemical Balance`, `Inflammation`, `Oxidative Stress`, `Methylation`) as BRS tags; those do not resolve to hub documents.
- `exposureContext` is carried by each `<EvidencePresentation>` relationship, not by Substance front matter.

## Validation

Run `npm run substance:validate` for the migrated calibration pages and inverse Food safeguards. Run `npm run test:substance-schema` for regression coverage. The wider Substance library remains on legacy/fallback behaviour until explicitly migrated.

## Individually admitted KC resource projections

Follow the canonical iKC identity rule in `system/dietary-input-traceability-contract.md`. Read PM-owned §3.1.3 edges and registered KC memberships through the existing ontology/SubstanceMatrix projection. Preserve upstream/conditional type, evidence and limitation. Registry/page identity must verify; aliases/tags/slugs alone are insufficient. Missing identity remains a major flag and pending canonical repair/page action, without fabricated composition edges or rankings.
