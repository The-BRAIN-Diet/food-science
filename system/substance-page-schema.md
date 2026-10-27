# Substance Page Schema (Canonical)

### Nutrient naming

Apply [Nutrient naming conventions](nutrient-naming-conventions.md) to vitamin names, form-specific claims and structured input/presentation labels. Keep family, specific form, preferred display label and aliases separately in the authoring/identity record; project labels through existing accepted page fields. This applies to Stage 2A handoff and Stage 2B adjudication.


Consolidated schema for BRAIN Diet substance pages (bioactives, metabolites, nutrients).  
**Canonical worked example:** `docs/substances/bioactive-compounds/carotenoids/astaxanthin.md` (the merged template: practical dietary context, followed by expandable Research Spotlights & Evidence Checks).

**Tab-close template:** `docs/substances/nutrients/macronutrients/amino-acids/essential/phenylalanine.md`. When Advanced Nutrition or Therapeutic Area Research has content, close the Overview with one paragraph per tab. Phenylalanine is the worked example for that close.

Food pages remain under `system/food-page-schema.md`. Substance pages follow the same **reference convention** as food pages.

---

## Design principle

### Registered nutrient forms with shared documentation

Canonical chemical identity and public documentation are separate. A registered
nutrient form may use its own registry ID, `title` and `aliases`, with
`parent_substance_id` naming an existing standalone nutrient family and
`page_anchor` naming an explicit stable heading on that family's page. Its
optional `path` must equal the parent's existing path. This extension does not
create another public page or change the parent's canonical ID or URL.

For the vitamin B3 pilot, `nicotinamide` and `nicotinic-acid` belong to
`vitamin-b3` and link to `#nicotinamide` and `#nicotinic-acid`. Niacinamide is an
alias of nicotinamide, not the B3 family. Form identity comes only from the
explicit registry entry; do not copy the documentation page's title, aliases,
food observations, PM relationships or dietary admissions. Registered identity
remains valid if documentation is missing; report a documentation gap separately
and omit an unverifiable public link. Existing standalone-page resolution stays
unchanged. This is not a change to KC identity validation.

Food observations continue to use the existing food composition records and
explicit substance IDs. Total niacin, individual B3 forms and niacin equivalents
are different analytes; family membership supplies no quantity or aggregation
rule in either direction. Each observation retains its own source, unit, basis,
material, preparation and analytical limitations. An explicitly unknown
`preparation_state` must not inherit the food's general preparation. Laboratory
extraction conditions are analytical metadata, not food preparation. This pilot
does not admit the Çatak measurements or implement the Advanced food tab.

Substance pages record **chemical identity**, **dietary origin**, and **evidence attributed at the level studied** (isolated compound, glycoside, extract, food, standardised extract, supplemental formulation, or combination formulation). Do not treat a food trial as a substance trial, or a family-level finding as an isolated-compound finding.

The default public view is **Nutritional Highlights**. Longer biological research belongs in **Advanced Nutrition**. Condition-specific evidence belongs in **Therapeutic Area Research**. Those two panels must not leak headings into the Highlights table of contents or duplicate the default view.

---

## Body section order (canonical, Nutritional Highlights)

Order matches `astaxanthin.md` — identity, practical dietary context and evidence qualification before generated lists:

| # | Section | Heading / component | Required |
|---|---------|---------------------|----------|
| 1 | Overview | `## Overview` | Yes |
| 2 | Dietary Context | `## Dietary Context` | Yes; include supported exposure or formation context |
| 3 | Research Spotlights & Evidence Checks | `## Research Spotlights & Evidence Checks` | Optional |
| 4 | Foods | `## Foods` + `<SubstanceFoods tag="…" />` | Yes |
| 5 | Recipes | `## Recipes` + `<SubstanceRecipes tag="…" />` | Yes |
| 6 | Biological Regulatory Systems | `## Biological Regulatory Systems` + compact BRS table | Yes when a mapping is evidenced |
| 7 | References | `## References` | Yes (canonical); top five preferred when the evidence base allows it |

`Key Compound Highlights` is no longer a canonical standalone section. Useful material belongs in Overview, Dietary Context, a Research Spotlight or Evidence Check, or the appropriate advanced evidence view.

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
- When a research tab has content, the Overview closes with one `<ContentTabSummary>` paragraph for that tab. The clickable label is a square in the same style as the page tab, and the link opens that tab. In the body, label the therapeutic square `Therapeutic Areas`. Each summary sentence starts with a capital letter. The two rows share one label column so the paragraphs align. Phenylalanine is the template.

---

## Overview

- Paragraph 1: what the compound is, where it occurs or how it is formed, and how it is used in this ontology.
- When Advanced Nutrition or Therapeutic Area Research has content, close with one paragraph per populated tab. Each paragraph is a `<ContentTabSummary>`: `href` is the same-page tab URL (`?advanced=1` or `?therapeutic=1`, plus the panel hash), and the children are at most two sentences. The body labels are `Advanced Nutrition` and `Therapeutic Areas`. The page tab keeps the full name Therapeutic Area Research. Each summary sentence starts with a capital letter.
- The label renders as a clickable square in the same style as the page tab. Both squares share one column, so the paragraphs have the same indentation. That alignment is `src/components/ContentTabSummary/styles.module.css`:

```css
.summary {
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
  align-items: center;
  column-gap: 0.85rem;
  row-gap: 0.65rem;
  margin-bottom: var(--ifm-paragraph-margin-bottom, 1rem);
}

.summary a.link {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
}
```

- **Template:** `docs/substances/nutrients/macronutrients/amino-acids/essential/phenylalanine.md`. Astaxanthin remains the worked example for Dietary Context, Research Spotlights and the Highlights reference form.
- Inline numeric citations `[1]`, `[2]` when claims need evidence.

```mdx
<ContentTabSummary href="/docs/substances/…/phenylalanine?advanced=1#phenylalanine-advanced-nutrition" label="Advanced Nutrition">
Sets out the hydroxylase, phenylethylamine and LAT1 reactions, and separates direct enzyme cofactors from folate and omega-3 fatty acids.
</ContentTabSummary>

<ContentTabSummary href="/docs/substances/…/phenylalanine?therapeutic=1#phenylalanine-therapeutic-areas" label="Therapeutic Areas">
Collects the ADHD evidence.
</ContentTabSummary>
```

---

## Dietary Context

Explain how dietary exposure relates to the substance. This is relationship-aware and conditional, not a fixed checklist. Include only relationships supported for the substance:

- **Direct food occurrence:** `Food → contains → Substance`
- **Dietary precursor:** `Food/input → provides precursor → formation → Substance`
- **Microbial formation:** `Dietary substrate → microbial conversion/fermentation → Substance`
- **Endogenous formation**
- **Bioavailability or food-matrix context**
- **Direct supplemental or concentrated exposure**

Direct occurrence and precursor/support relationships are different edges. A food that supplies ellagitannins for microbial Urolithin A production does not contain Urolithin A. A fermentable-fibre food does not contain Butyrate merely because fermentation may produce it.

Where canonical PM/KC dietary-requirement atoms and validated Food-to-input
relationships exist, Dietary Context may render them with
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

### Practical dietary interpretation

Keep practical dietary interpretation in this same section, before the evidence panels. It combines the useful food, interaction and exposure distinctions from Copper with Astaxanthin's evidence presentations. Astaxanthin remains the canonical worked example; Copper's full page and research tabs are not the template.

Include only the subsections that have useful, substance-specific evidence:

- **Food sources:** a short description of supported food sources or dietary precursors, with preparation and serving context where relevant. Do not invent a ranking or manually duplicate the generated Foods list. For metabolites, explain precursor supply rather than imply direct containment.
- **Synergies and interactions:** evidenced effects on absorption, utilisation or regulation. Include antagonistic interactions where relevant. Name the studied exposure and dose context; a combination trial does not establish synergy or isolate each ingredient's contribution. Omit this subsection when no relevant evidence is available.
- **Supplement versus food:** distinguish ordinary food exposure from isolated, concentrated, extract or combination exposures. Explain relevant limits on translating the cited studies to meals. Do not impose a universal food-first recommendation, supplement protocol or diagnosis-specific advice.

Explain occurrence or formation alongside its practical dietary meaning without repeating the Overview. Do not create a separate Dietary Origin section. Cite scientific claims from the shared References list. These subsections support the evidence panels and do not replace them or introduce a second bibliography. Condition-specific research remains in its own optional tab.

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
- Prefer a hand-authored markdown table on Highlights when the mapping is evidenced and cited, as on Astaxanthin. `<SubstanceMatrix />` is a legacy/fallback renderer for unmigrated pages and may be used only when current hub tags resolve; it is not the future source of truth.
- Do not assign a BRS mapping without bibliography-backed evidence.
- Longer mechanistic narrative, diagrams and measurement caveats go in **Advanced Nutrition** as overspill of this table, not as a second Highlights section.

---

## Food / Substance evidence boundary

1. Do not infer a Substance effect from a whole-food outcome merely because the Food contains that Substance.
2. Do not infer that eating a Food reproduces an isolated-Substance intervention merely because the Food contains that Substance.
3. Composition evidence, bioavailability evidence, intervention evidence and clinical/outcome evidence are distinct relationships.
4. Translation between Food exposure and isolated/concentrated Substance exposure requires evidence or must remain explicitly inferential.

The Foods list uses canonical relationship records for membership. Each public food card shows only its image, linked food name and one-line food description. Do not add migration status, review labels, relationship arrows, source lists or a second relationship description. Keep evidence and relationship semantics in canonical records and the relevant Dietary Context or evidence notes; keep audit and migration history in internal review records. A plain card does not change the underlying relationship into a Contains claim.

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

## Input to Substance to Food — canonical identity maintenance

The BRS1 pilot joins accepted PM inputs to `registry/substances.json` and canonical substance-page metadata, then to existing food composition and `substance_relationships`. Keep registry IDs and paths stable. Check existing titles, IDs and documented aliases/synonyms before flagging a missing identity; do not equate precursors with products, split combined analytes or turn pools/patterns into compounds. Report registry/PM conflicts without silently changing accepted science. This pilot flags missing pages for the author to create; it does not create or redesign substance pages.

After adding a substance or identity alias, regenerate the **Input to Substance to Food** review with `npm run mappings:brs1`; the Docusaurus mapping plugin reads those same source records on build/watch. Future substance-page views should consume that shared mapping data, not new food lists. Food composition remains on food records, and PM applicability remains on PM/KC records.


## Sixth atomic field — Dietary input (Stage 2A / Stage 2B)

The PM dietary-context contract is **Input | Input type | Biological role | Evidence source | Limitation | Dietary input**. Store the sixth field on the authoritative `dietary_input_traceability` atom as `dietary_input: true`, `false`, or `null`; render these as **Yes**, **No**, or **Unset — clarification required**. Never copy the decision into a separately editable food registry or lever overlay. `dietary_input_note` and `dietary_input_flags` are review metadata, not additional atomic fields. Missing legacy values remain unset until reviewed.

Stage 2A makes the existing accepted supply decision explicit; Stage 2B projects that same atom without reassessing evidence. Preserve findings, citations, limitations, biological role, relationship classification, ownership and upstream/KC applicability.

- §1.1.1 / §3.1.1 Direct/Derived Dietary Requirements normally receive Yes because section admission establishes dietary applicability. Explicit contradictions must be flagged (`section-supply-contradiction`), leaving the value unset pending resolution rather than silently overriding either record.
- §1.1.2 / §3.1.2 Cofactors and Substrates require individual review of the accepted biological role, supply route and limitation. Intracellular participation alone establishes neither Yes nor No.
- §1.1.3 / §3.1.3 Key Constraints/upstream resource inputs distinguish dietary constituents from the pool or constraint itself. A constituent may receive Yes; a pool reference receives No when no dietary supply relationship is admitted for the pool itself. Constituent decisions remain on their PM atoms, never inherited from KC applicability.
- Ambiguous cases receive `dietary_input: null`, a specific `dietary_input_note` and a clarification flag. Do not default to No.

No means **no dietary supply relationship is admitted for this entry in this PM**. It does not mean the substance is absent from food or biologically unnecessary. Lack of demonstrated benefit from extra intake, dose responsiveness or a universal requirement is not alone a reason to assign No. Dietary input and PM ownership/upstream/accounting designation are independent fields.

```yaml
- atom_id: PM-example-DIT-1
  input: Vitamin B6
  input_type: cofactor precursor
  biological_role: Accepted precursor provision for intracellular PLP
  evidence_source: # retain accepted finding and citation references
    finding_ids: [PM-example-F1]
    citation_keys: [accepted_reference_key]
  evidence_limitation: Retain the accepted limitation verbatim
  dietary_input: true
  dietary_input_note: Accepted dietary precursor route; no conversion yield inferred
```

Generate PM-input substance–food lists only for `dietary_input === true`. Keep No and unset entries visible as biological context; suppress their food lists without removing canonical food composition records. The same substance may have Yes and No entries in different PMs. Generated tables expose the sixth field and source note; retain unresolved rows and gaps. Missing optional food quantities do not suppress an admitted qualitative food relationship. SOPs/lifestyle are outside this PM dietary-input migration.


### Structured formation pathways

Optional `formation_pathways` reuses the ordered conversion-step contract for source-of-metabolite projection. Each record needs `id`, `from`, `to` (existing registry IDs), `relationship` (`microbial-formation` or `endogenous-formation`), `status` (`supported` or `unresolved`), `process`, `dependencies`, structured `evidence` (`statement`, `sources`) and `limitations`. This field describes conversion, not direct food presence or scientific admission. A source-PM production context is distinct from an admitted derived relationship at another receiving PM. Neither canonical identities nor individual reaction evidence admit a joined PM pathway. Provisional composition keeps its own status. No conversion yield is inferred.
