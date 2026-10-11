## Nutrition display threshold and tabs

Vitamins and minerals providing at least 10% of the reference intake per 100 g appear in Nutritional Highlights. Lower contributions remain accessible in Advanced Nutrition. This is an editorial display threshold, not a judgement of biological significance.

Eligibility uses unrounded canonical values. The shared renderer registers lower-contribution rows in the Advanced Nutrition page tab, not an inline disclosure in Highlights. No-reference nutrients and bioactives retain their existing rules; core nutrients and food–substance membership are unchanged. Both views use the same composition record.

## Source-note numbering and reference routing

Render Sources and limitations as bullets labelled with the relevant nutrient or compound names. Reserve square-bracket numbers for citations to the page’s References; do not introduce a second numbered note system. Any bracket marker beside a table amount must match the References number, not the bullet position. Notes contain only concise reader-relevant material, preparation or interpretation context. Remove audit comparisons, migration decisions and checking history from ordinary source notes.

Public food-page source links must point to that page’s References entry via `source_reference: '#food-source-N'`. Each References entry links to the canonical BRAIN-Diet-References record; that record provides the external paper or database URL. Never link directly out from nutrition notes, composition-source footers or substance cards. Retain `source_url` internally for provenance, not as the public href. Supplementary source groups organise shared evidence internally; they do not create separate public citation numbers. Label citation links with the References number in square brackets, such as `[4]`, rather than generic “Source” or “Reference”. Include these page-local citation links in technical provenance as well as concise public notes. Format all References entries consistently as `[N] Author (year). [Title](canonical bibliography anchor). Short source-supported description.`; use a corporate author for databases and do not invent missing metadata. Preserve analytical distinctions in structured metadata and technical evidence rather than repetitive public audit wording.

<!-- User-approved estimate retention rule: 2026-10-10 -->
## Retain researched estimates while attaching citations

A missing quantitative citation alone is a documentation gap, not a reason to delete an existing researched bioactive estimate or replace it with zero. Preserve its original numeric value, unit, preparation basis and explanatory note; label the amount as an estimate. Set `quantity_citation_pending: true` and add a pending entry to `nutrition_value_reviews`, which appears in the food page’s Review & Corrections panel (`?review=1`). Record the original research note, amount, source-attachment task and any denominator/preparation checks there. Presence citations must not be represented as verification of the estimated amount. Do not expose extraction logs in ordinary source notes.

This retention rule does not override demonstrated wrong-food substitutions, wrong chemical identities, combined-analyte splits, unsuitable per-protein denominators or withdrawn preparation-specific composition. Record those substantive problems separately. Missing amounts remain missing, not analytical zeros. Algorithmic consumers must distinguish estimates from source-verified quantities.

## Scientific and presentation decisions — authoritative clarification (10 October 2026)

This section supersedes any older requirement that a relationship or card must have a public nutrition-table row.

- `substance_relationships` is the canonical reciprocal relationship record. Explicit evidence-supported `contains` / `direct-food-occurrence` links may appear in both directions without quantified content or a nutrition-table row. Evidence, quantified content and approval as a leading/top-10 source are three separate decisions. Do not infer ranking from occurrence, and do not rewrite PM/BRS mappings.
- Tags are candidates for review, not proof. Preserve unsupported candidates in the internal review queue. Missing quantities do not justify suppressing supported occurrence. Preserve valid explicit decisions, including precursor/formation edges.
- Combined analytes are distinct identities. A sum never supplies either constituent’s amount or independently establishes either constituent’s presence. Seek food-specific individual evidence; do not split a sum. Apply to every combined analyte, not just carotenoids.
- Decide nutrition-panel eligibility before wording. A coherent panel requires matching species, edible material, preparation and denominator. Do not combine unrelated review ranges. Supplementary core/mineral rows require `nutrition_panel_eligible: true` after evidence review; an explicit display override does not bypass eligibility.
- Undefined carbohydrate is withheld pending clarification; an unspecified method alone does not establish what it includes or excludes. Crude fibre is not dietary fibre. Ash and technical proximate measures belong in technical evidence, not nutritional highlights. Do not infer nitrogen factors or extraction methods without verification in the individual source.
- Withhold unresolved minerals, protein-basis amino acids and unsuitable measurements from public panels and reference-intake calculations. Preserve original units, conversions, methods actually documented, source passages and uncertainty internally. Never guess a corrected value.
- When coherent preparation-specific data are unavailable, set `nutrition_unavailable: true` and display: “Reliable composition data for this preparation are not yet available.” Retain independently supported relationships.
- Supplementary notes use distinct numbered references. Use `source_group` only for a genuinely shared source and limitation; use `public_note` for concise interpretation, `source_reference` for the page-local References link and `source_url` for internal traceability. Keep preparation, dry-weight basis, combined identity and qualitative content beside the data. Full `source_note` belongs in expandable technical provenance. Do not repeat values/conversions below a table or expose review status, admission rules or repair history.
- Use familiar equivalent names, including linoleic acid; retain systematic synonyms in technical metadata. A review’s list of chemicals is not a list of nutritional highlights.
- Mucuna seed L-DOPA is pharmacologically active exposure, not an ordinary dietary recommendation. Raw seed, cooked food, extract and supplement measurements are not interchangeable. Generic processing descriptions do not establish safe residuals.

# BRAIN Diet Food Page Model: Three Sources of Truth

This document defines the **canonical relationship** between the three layers of every food page and the rules that keep them aligned. It also specifies **amino acid / EAA presentation** for animal vs plant foods.

---

## Core Model: Three Sources of Truth

Each food page has **three distinct layers**. They must stay aligned but do **not** serve the same purpose.

| Layer | Purpose | Rules |
|-------|---------|--------|
| **1. Overview** | Concise, researched narrative of what is distinctive about the food — characteristic substances and chemical forms, distinctive composition, matrix or preparation, formulation, antinutrients/bioavailability, or practical culinary role. Do not repeat generic nutrient biology. Recipe usefulness is a sufficient reason for the page to exist. Follow the **Overview editorial standard** below. | Selective. Not a chemistry dump. Mention macros or micronutrients only when they materially characterise the food, with values consistent with the rendered table. Headline identity compounds without supported presence must be actively sourced and placed on the research queue; supported presence may be recorded canonically without a table row; unsupported mentions remain research candidates. Pairings, comparisons, generic mechanisms, and downstream outcomes are not identity constituents. Culinary-support foods may be described neutrally without manufactured physiological importance. |
| **2. Database nutrition table** | The **rendered** composition table from whichever valid representation the page uses: standard `nutrition_per_100g`, authorised/specification rows, and/or explicit qualitative supplementary rows. | Authoritative compositional evidence for what the reader can see. A populated USDA-shaped `nutrition_per_100g` block is not universally required. An empty `nutrition_per_100g: {}` is compatibility only and is not the compositional source. Rows may be quantitative or explicit qualitative, with food-specific provenance. A table row is **not** a BRS mapping. Supported individual-analyte database presence can support Contains without top-source approval. A hidden numeric value is not required for a cited canonical presence record. Every rendered Substances card must resolve to an evidence-supported canonical relationship; a public nutrition-table row is optional. |
| **3. Substances list** | The **rendered** structural list that mirrors the validated, meaningful union of Overview identity and the rendered table, linking those entities into the canonical substance ontology. | Every rendered Substances card must resolve to an evidence-supported canonical relationship; a public nutrition-table row is optional. Not every nutrition-table row requires a Substances card. Cards are not a substitute for table inclusion and are not BRS mappings. |

**Summary:**

- **Overview** selects what is meaningful and distinctive about *this food*.
- **Database nutrition table** establishes compositional evidence.
- **Substances list** structurally mirrors the validated, meaningful union.
- A canonical substance page may be created only after that entity has been validly admitted to the food’s reconciled Substances layer.
- General substance biology belongs on Substance pages and, where relevant, the future Food BRS Matrix — not as repeated generic biology on every food that contains the nutrient.

These three **rendered** layers are the **only** “Three Sources of Truth” for food pages. Composition and provenance classes in `system/food-nutrition-schema.md` describe how table values are sourced; the Intrinsic / Mechanism / Strategy model describes where a claim belongs. Neither of those models may be labelled the Three Sources of Truth, and neither replaces this page-layer model.

---

## Overview editorial standard

**Food Overviews communicate food identity, distinctive characteristics and practical interpretation in plain language. They synthesise evidence rather than reproducing nutrient tables, trial reports or reconciliation notes. Quantitative composition belongs in tables; study detail belongs in evidence annotations; general mechanisms belong on Substance pages or in the Food BRS Matrix.**

This is the canonical Overview rule. `system/food-page-schema.md` and food-page Cursor rules point here; they must not restate it at length.

An Overview should answer three questions without requiring the reader to interpret units, biomarkers, trial designs or nutritional biochemistry:

1. What is this food?
2. What genuinely distinguishes it nutritionally, chemically or structurally?
3. How does it fit practically within a BRAIN-aligned dietary pattern?

Usually use two short paragraphs: food identity and distinctive composition, then concise evidence-based interpretation and practical role. Aim for about 60–110 words where the food warrants it. Simple culinary-support foods may be shorter. Do not lengthen a page to meet a template. Word count is editorial guidance, not a validation gate.

Do not put in the Overview by default: per-100 g quantities already shown in the table; trial doses or intervention durations; detailed comparators; long outcome lists; dry-weight versus fresh-weight calculations; study methods or reconciliation history; repeated generic nutrient mechanisms; reference-by-reference narration; or internal qualifications that can be one plain sentence. Include a number only when it is necessary to distinguish formulations, edible parts, serving instructions or prevent a material misunderstanding.

Synthesise multiple studies into one accurate conclusion. Keep scope and causality accurate: the food itself, a constituent rather than the whole food, a preparation method, a substitution, or a root, extract, supplement or formulation that is not equivalent to the food normally eaten. Do not turn those distinctions into a methods paragraph.

Pairing *how-to* belongs in the Essential Amino Acid Profile or Food Context. Overview may include one plain-language protein-quality interpretation when that is part of practical dietary role.

**Calibration example (Almonds).** Subsequent letter batches should match this register, not the length or citation count:

> Almonds are a nutrient-dense source of **vitamin E**, magnesium, fibre, unsaturated fats and plant protein. Human feeding studies suggest that substituting almonds for refined snack foods can improve blood-lipid and post-meal glucose responses while supporting satiety [1–3].
>
> Within a BRAIN-aligned pattern, almonds are a practical whole-food snack or meal component. Their protein is relatively low in lysine, so almonds should contribute to a varied protein pattern rather than be treated as a complete protein source [4].

---

## Food-index descriptions

**Food-index descriptions provide stable, plain-language food identity. They do not summarise studies, mechanisms, evidence disputes or reconciliation decisions.**

This is the canonical index-description rule. The Foods Index renders each food’s YAML `description` field. Do not add a second index field. `system/food-page-schema.md` and food-page Cursor rules point here; they must not restate it at length.

An index description should identify the food in one short phrase, name only its most characteristic nutritional features, remain understandable to a general reader, and normally fit on one line. A genuinely distinctive compositional feature may appear. Study findings, outcome claims, trial language, methodological qualifications, and reconciliation history do not belong on the index card. USDA coverage and other composition-administration notes follow **Public editorial prose versus composition administration** in `system/food-page-schema.md`; they are not public editorial content.

Index links use site-relative documentation paths. Localhost URLs are acceptable only as resolved preview output; they must not be stored as absolute source links.

---

## Directional reconciliation

The governing consistency rule is:

**Overview → compositional verification → substance inclusion**

More precisely:

1. If an **identity** compound appears in the Overview but not the rendered table, that does **not** automatically justify a new substance page or an invented row.
2. Its presence must trigger compositional verification of **this food** (USDA richest mapped panel, specialist databases, or food-specific literature). Do not copy a related food.
3. If verified with a defensible quantity, add it to the **rendered** nutritional table (asterisk and source for supplementary rows).
4. If presence is evidenced but a comparable per-100 g quantity is unavailable, a qualitative rendered row with explicit status and food-specific provenance may establish presence. Lack of a per-100 g number does not automatically prevent later ontology admission.
5. Once presence is supported, record the canonical relationship and display it in both directions without waiting for a public amount. Admission of new canonical identities is editorial; supported relationships to existing identities do not require nutritional prominence. Decide whether the food–substance relationship merits ontology admission **before** treating a missing canonical page as a blocker.
6. If an admitted substance lacks a canonical substance page, create or propose that page as a **deliberate ontology task**. Reconciliation scripts must **not** automatically create Substance pages, but a merited card must not be declined solely because the page does not yet exist.
7. Unsupported Overview quantities must be removed. Credible but unresolved identity constituents enter an explicit research queue; they must not generate invented rows or cards.
8. Values must never be copied from a related, substitute, or superficially similar food (e.g. walnuts → almonds; canola → algal oil).

**Enforced direction:**

- Every rendered Substances card must resolve to an evidence-supported canonical relationship; a public nutrition-table row is optional.
- An unsupported hidden/internal composition record does not satisfy evidence requirements. A documented established basis may support presence while its citation attachment is pending.
- Not every nutrition-table row requires a Substances card. Ordinary background nutrients should generally remain table-only. Internal records may be retained for provenance and future use without appearing publicly.
- A positive individual-analyte database record with matching food and material may support Contains; it does not establish nutritional importance.
- Cards represent selective food-identity or BRAIN-relevant constituents, not a chemistry dump.
- Every compound presented as a headline **identity** constituent in the Overview must either have supported canonical presence or be placed on the research queue with a precise state (not a generic Overview → table gap when a qualitative row already evidences presence).

---

## Content-boundary model: Intrinsic / Mechanism / Strategy

This is a **separate** model from the Three Sources of Truth. It determines **where a claim belongs** on or around the page. It does **not** determine whether an entity has passed the food-page admission workflow (Overview → table → Substances).

Violating these boundaries causes downstream metabolites and strategy advice to be misrepresented as intrinsic food compounds.

| Layer | Where it belongs | Where it must NOT appear |
|-------|------------------|---------------------------|
| **Intrinsic food truth** | Key Substances, nutrition table, substances list, BRS/tags for that food. | — |
| **Mechanism truth** | Mechanisms, BRS explanatory prose, Overview (as mechanism, e.g. “supports … production”). | Never as a **substance** or tag implying the compound is in the food. |
| **Strategy truth** | EAA profile (pairing strategy), Food Context (Sourcing, Synergies, Serving), Recipes, strategy sections. | Not as Overview headline “substances”; not in the substances list. |

**Rules:**

1. **Intrinsic only in substances**  
   Only compounds **actually present in the food** (or in the edible portion as consumed) may appear in:
   - tags used for the substances list or BRS matrix,
   - the nutrition table,
   - Key Substances / substances list.

2. **Downstream metabolites are not food substances**  
   Compounds produced **after** digestion, fermentation, or metabolism (e.g. SCFAs such as acetate, propionate, butyrate from fibre fermentation; neurotransmitters from precursors) are **mechanism truth**. They may be described in Overview or References as outcomes (e.g. “beta-glucan supports butyrate production”) but must **not** be listed as substances of the food or used as BRS tags for that food.

3. **Pairing and complementarity**  
   Amino acid pairing, “pair with X”, and complementarity advice belong in the **Essential Amino Acid Profile** (pairing strategy) or **Food Context** (Synergies, Serving) / Recipes, not in the Overview as if they were intrinsic substances.

**Food BRS Matrix (deferred):** Mechanistic content must not be deleted from food pages before a Food BRS Matrix destination is defined. That schema will be designed after A-food reconciliation. Do not treat this note as a Matrix specification.

**Validation:** Generation or edits must fail or be flagged if:
- A downstream metabolite (e.g. SCFAs, butyrate, propionate, acetate, serotonin, GABA from precursors) is proposed as a food substance or tag for that food.
- A required Essential Amino Acid Profile section is missing (see below).

---

## Required Essential Amino Acid Section

**When required:** Include the **"Essential Amino Acid Profile"** subsection only when the food has been verified as a meaningful protein/EAA source in normal dietary use (e.g. meats, fish, eggs, protein-rich dairy, soy foods, legumes, seeds, nuts and protein-contributing grains). A value of ≥5 g protein per 100 g triggers review but does not by itself make the section applicable.

**Enforcement:** Any food page that meets this rule **must** include the Essential Amino Acid Profile subsection. Omission is a validation failure.

**Content rules for the EAA section:**
- Classify the protein profile appropriately (complete vs plant incomplete).
- Include **Notable amino acids** and/or **Limiting amino acids** where relevant.
- Put **pairing and complementarity advice** in this section (Protein pairing strategy), not in the Overview.

**Validation:** Fail or flag generation if a verified protein-source page lacks the subsection, or if a page explicitly adjudicated `eaa_profile_applicable: false` still publishes one.

---

## Missing Compound Rule

If the **Overview** mentions a headline compound that is **missing from the database table**, do not leave the inconsistency in place, do not invent a number, and do not create a Substances card or canonical substance page from the mention alone.

1. Prefer a wider search of the **same food** in USDA (richest mapped panel, not the first abbreviated hit) or another named composition database.
2. If no USDA value exists, actively search food-specific studies, authoritative resources and suitable reviews. Record a documentation gap rather than rejecting the relationship; curate positive qualitative evidence without waiting for an amount.
3. A verified supplementary value may be applied only after it has been curated into the provenance dataset (`scripts/data/literature-compounds.json`). Then add it to `nutrition_supplementary_sources` with numbered source notes and food-specific provenance.
4. If presence is evidenced but quantity is not established, a qualitative row with status `Present — quantity not established` may be curated the same way.
5. Restore the supported canonical Contains relationship immediately; add a suitable quantity separately when available.
6. Propose a canonical substance page only after ontology admission; do not silently create pages.

**Example:** If the salmon Overview mentions astaxanthin but USDA does not provide it:

- Search a specialist carotenoid source **for salmon**.
- Curate the value into the provenance dataset, then apply the supplementary row.
- Restore supported astaxanthin presence with food-specific evidence even when a general amount is unavailable.

Do **not** copy a value from a related food (e.g. walnuts → almonds).

---

## Visible-layer consistency

The Three Sources of Truth are **rendered** layers.

- Every rendered Substances card must resolve to an evidence-supported canonical relationship; a public nutrition-table row is optional.
- A supported canonical relationship may be displayed even when its numeric composition record is internal-only. An untagged vitamin or mineral with a sourced `nutrition_per_100g` quantity is a rendered table row (Key or Advanced Nutrition) and **does** satisfy it. Tags are not a nutrition-table whitelist.
- Not every rendered table row requires a Substance card.
- Internal records may be retained for provenance and future use without appearing publicly.
- Ordinary background nutrients should generally remain table-only.

## Substance admission

Compositional presence alone is insufficient for leading/top-10 approval; supported presence is sufficient for an existing canonical Contains link. Cards represent selective food-identity or BRAIN-relevant constituents, not a chemistry dump.

- A food-specific positive trace result can support Contains; it does not establish leading-source approval.
- A missing canonical Substance page may be proposed only after the food–substance relationship is verified **and** editorially admitted.
- Reconciliation scripts (`nutrition:reconcile-layers`, `audit-food-page-layers`) must **not** automatically create Substance pages.

## Overview identity constituents

Important identity constituents named in the Overview trigger compositional verification. Verified constituents may enter the Substances list directly through canonical presence records. Table eligibility is decided separately.

- Unsupported quantities must be removed.
- Credible but unresolved identity constituents enter an explicit research queue; they do not generate invented rows or cards.
- Numerical Overview and Other Nutritional Highlights statements must match the **rendered** nutrition table and its displayed rounding.
- Mention fibre, protein, fat, carbohydrate, vitamins, and minerals in Overview only when they materially characterise the food. Do not repeat their general biology; the rendered table already establishes ordinary composition.
- Not every chemical noun in an Overview is an identity constituent. Pairings, comparisons, generic mechanisms, and downstream outcomes must be classified separately (Intrinsic / Mechanism / Strategy). Distinctive matrix, preparation, formulation, or culinary role may be named in Overview without becoming a recipe.

## Qualitative evidence

A supported qualitative table row can establish **presence** when a defensible comparable quantity is unavailable.

- Lack of a per-100 g quantity does not automatically prevent later ontology admission or creation of a Substance page.
- The row must include explicit status and food-specific provenance.
- A supported qualitative row must **not** continue to be reported as an Overview → table gap.

## Chemical-form precision

Parent compounds, aglycones, glycosides, and derivatives must not be treated as interchangeable. Nutrient identity — which acid `ala_mg` may hold, what an unqualified 18:3 means, and how an omega-3 total must account for itself — is defined once in `system/food-nutrition-schema.md`.

- A parent-aglycone card may be used only when the **food-specific** card caption (`substance_card_captions`) and source notes or canonical material metadata state the actual form present.
- Food-specific wording must not be inserted into the generic Substance page description where it would incorrectly propagate to other foods.
- Example: aubergine may link to Delphinidin only as the parent aglycone of glycosides including nasunin; it must not imply the presence of free delphinidin.

## Variable and formulated products

Do not assign values from a substitute or superficially similar USDA food.

- When a food category varies by species, strain, or formulation, represent source-specific specifications rather than inventing a universal average.
- Distinct formulations must be visibly distinguished.
- Product-label dosage must not be presented as universal per-100 g composition.
- Example: DHA-rich algal oils and combined EPA/DHA algal oils are separate formulations; EPA must not be represented as universal to algal oil. Do not use canola or another oil as a USDA proxy.

Exact-food matching, the consequences of citing the wrong record, and the search required before concluding no record exists are defined in `system/food-nutrition-schema.md` and `system/nutrition-workflow.md`.

## Research-queue states

Letter and enrichment queues must label remaining work precisely. Distinguish:

| State | Meaning |
|-------|---------|
| Presence unresolved | Named as an identity constituent; no supported canonical presence record yet. This is the only state that is an Overview → table gap. |
| Presence resolved, quantity unresolved | A supported qualitative row (or authorised specification) evidences presence; no defensible comparable quantity/range. |
| Quantity resolved, ontology admission unresolved | A rendered row exists; editorial judgement has not yet admitted a card. |
| Parent/derivative mapping unresolved | The food contains a glycoside or derivative; a parent-aglycone link is used or proposed, and the actual form is not yet fully mapped. |
| Canonical Substance page absent | The food–substance relationship is admitted (or proposed) but no canonical page exists. Propose the page; do not auto-create it. |
| Scope or formulation ambiguity | The named entity is a pairing, mechanism, class term, or formulation-specific constituent, not a universal intrinsic of the food. |

A supported qualitative row must not continue to appear as an Overview → table gap. Example: aubergine nasunin presence is resolved by `Present as glycosides (nasunin)`; remaining work is quantity/ontology, not a missing table row.

These letter-audit reconciliation states are a **different enum** from Script B’s evidence-verification decisions (`verified` / `unsupported` / `ambiguous` / `requires-review`). The two enums describe different stages and remain separate for now. They should eventually have an explicit mapping; they do not need to become one enum.

Letter-audit **editorial records** (role, meaningful reference count, evidence type, distinctive story or inclusion reason, missing research, material destined for a Substance page or future BRS Matrix, recommended depth) are a **third** schema. They do not replace Script B or reconciliation states, do not change reference rendering, and must not be pre-filled as a way to begin the next letter batch. See `system/food-page-letter-audit-schema.md`.

Citation correctness (exact-key BibTeX join) and citation relevance (does this paper evidence *this food*) are separate checks.

---

## Relationship Between the Three Layers (Final)

- **Overview** identifies what is distinctive about the food (characteristic substances, composition, matrix/preparation, or honest culinary-support role — not every chemical noun, and not generic nutrient biology).
- **Database nutrition table** records verified **rendered** composition from at least one valid representation: a populated `nutrition_per_100g` panel, authorised/specification rows, and/or supported qualitative supplementary rows. A populated USDA-shaped `nutrition_per_100g` block is not the universal requirement.
- **Substances list** mirrors the validated, meaningful union: cards for compounds with supported canonical relationships, whether or not quantities appear in a table.
- **Expansion rule:** Overview-only identity compounds trigger active presence sourcing and canonical restoration; quantity and table eligibility follow separately. Never invent numbers or copy values from a related or substitute food.

---

## Other Nutritional Highlights

Body heading and residual-section rules are defined in **Section editorial responsibilities** in `system/food-page-schema.md`. Do not restate that rule here.

The canonical heading is `## Other Nutritional Highlights`. The superseded headings `Key Nutritional Highlights` and `Nutritional Highlights` must not be used as the canonical heading. Existing food pages may still carry a superseded heading until that letter is rewritten.

Other Nutritional Highlights is optional. It is not a fourth Source of Truth. Almonds remains the **Overview** calibration example, not a Highlights bullet template.

---

## Amino Acid / EAA Logic

### A. Animal foods (fish, meat, eggs, dairy)

- **Do not** list all amino acids individually by default.
- **Do not** create long amino-acid dumps.

**Default:** Use a compact note such as:

- *"Protein profile: complete essential amino acid profile."*

**Exception:** Highlight individual amino acids only when especially notable or mechanistically relevant (e.g. turkey → high tryptophan).

So for salmon, meats, eggs, dairy:

- **Default** = complete essential amino acid profile.
- **Individual amino acids** only when there is a strong reason.

**Schema:** Use optional front matter field `protein_profile_note` (e.g. `"Complete essential amino acid profile"`). Do not tag every EAA unless justified.

---

### B. Plant foods (legumes, grains, nuts, seeds)

- **Do not** dump every amino acid by default.
- **Do** highlight meaningful EAA strengths and limiting amino acids.
- **Do** support vegetarian / vegan complementary protein logic.

Goal: help users understand what that plant contributes and how to pair it.

**Examples:**

- Legumes/pulses: often relatively stronger in lysine, weaker in methionine.
- Grains: often relatively stronger in methionine, weaker in lysine.
- Soy: relatively more complete than many plant proteins.

**Schema:** Use optional front matter fields:

- `amino_acid_strengths` – short phrase or list (e.g. "Lysine-rich relative to grains").
- `limiting_amino_acids` – e.g. "Lower in methionine and cysteine".
- `complementary_pairings` – e.g. "Rice, oats, or other grains".

**Example style:**

- Protein strengths: lysine-rich relative to grains.
- Limiting amino acids: lower in methionine.
- Complementary pairings: rice, oats, or other grains.

Notable plant highlights are allowed when specific amino acids are unusually strong.

---

## BRAIN Diet Food Pages – Essential Amino Acid (EAA) Handling Specification

#### Purpose

Food pages include an **Essential Amino Acid (EAA) profile** only when the food is a meaningful protein source in normal dietary use. When applicable, this allows readers to understand:

- protein completeness
- limiting amino acids
- complementary food pairing (e.g. grains + legumes)
- mechanistic roles of amino acids in BRAIN Diet Biological Regulatory Systems (BRS)

This section improves the educational value of the site and supports mechanistic links between foods and neurotransmitter synthesis, metabolism, and cellular regulation.

---

### Rule – When the EAA Profile Section Is Required

Include the **"Essential Amino Acid Profile"** subsection only after verifying that the food is a reasonable source of protein and EAAs in normal dietary use.

- Treat **≥5 g protein per 100 g as a review trigger, not an automatic inclusion rule**.
- Consider customary serving size, dietary role, amount normally consumed, protein quality and whether protein is a practical reason to select the food.
- Use front matter `eaa_profile_applicable: true` or `false` for an explicit editorial adjudication when the per-100 g trigger is ambiguous or misleading.
- If not applicable, omit the subsection completely. Do not add a paragraph explaining that the food is not a protein source.
- Research before deciding, but do not invent amino-acid strengths, limitations or pairings to fill the template.

**Include:**

- meats
- fish
- eggs
- dairy
- soy foods
- legumes
- seeds
- nuts
- high-protein grains (oats, quinoa)

**Usually omit:**

- fruits
- leafy vegetables
- oils
- herbs/spices
- concentrated cocoa and chocolate products eaten in small portions

---

### 1. Add a subsection: **EAA Profile**

Every food page that meets the rule above should include:

```text
### Essential Amino Acid Profile
```

**Rendering rules – reduce repetition:**

- **Balanced essential amino acid profile**  
  Do **not** output "Profile type" or "Limiting amino acids: none".  
  Render as a **short paragraph** plus an optional "Notable amino acids" list.

  Example:

  ```text
  ### Essential Amino Acid Profile

  This food provides a complete essential amino acid profile typical of animal proteins.

  Notable amino acids:

  - Tryptophan
  ```

- **Foods that are not complete proteins**  
  Do **not** use "Profile type: Incomplete protein." Use a short, balanced opening sentence (e.g. "X provides a strong plant protein source but are not a complete protein."), then **Notable amino acids** and/or **Limiting amino acids** as relevant, then a **Protein pairing strategy:** paragraph that explains complementarity in a rounded, informative way.

  Example:

  ```text
  ### Essential Amino Acid Profile

  Lentils provide a strong plant protein source but are not a complete protein.

  Notable amino acids:
  - Lysine

  Limiting amino acids:
  - Methionine and cysteine (DIAAS ~65–70)

  Protein pairing strategy:
  Lentils are rich in lysine but relatively low in sulfur-containing amino acids.
  Combining lentils with grains such as rice, oats, or barley helps create a more
  balanced essential amino acid profile.
  ```

**Field usage:**

- **Balanced (complete) proteins:**  
  Use the short paragraph style only; do not spell out "Profile type" or "Limiting: none". Add **Notable amino acids** when mechanistically relevant.

- **Foods that are not complete proteins:**  
  Open with a balanced descriptive sentence (avoid the word "incomplete" in the heading or as a label). Include **Limiting amino acids** when known. Include **Notable amino acids** when relevant. End with **Protein pairing strategy:** — a short paragraph that explains strengths, limitations, and how pairing creates a more balanced intake.

- **Notable amino acids** (optional):  
  1–3 amino acids that are mechanistically important or widely associated with the food (e.g. turkey → tryptophan; whey → leucine; soy → leucine, lysine).

- **High values** (optional):  
  Use only when an amino acid is relatively high compared with similar foods and it adds educational value.

- **Limiting amino acids:**  
  For foods that are not complete proteins, list the relatively low EAAs relevant for complementarity (e.g. lysine in grains; methionine and cysteine in legumes). Do not list "none" for complete proteins.

---

### 2. Protein Complementarity Guidance

When appropriate, include a short note explaining classic dietary pairing strategies.

Example:

```text
Protein Pairing Strategy

Grains are often low in lysine but relatively higher in methionine.
Legumes are high in lysine but lower in methionine.

Combining grains and legumes helps achieve a more balanced essential amino acid intake.
```

Examples of classic pairings:

- rice + lentils
- oats + chickpeas
- corn + beans

---

### 3. Important Note on Tryptophan

Tryptophan must be treated carefully in the EAA profile.

Important facts:

- Tryptophan is **normally the lowest-abundance essential amino acid in most proteins**.
- Therefore it will often appear under **"Low values"** in EAA tables.

However:

> Tryptophan often appears lower in amino-acid tables because it is the least abundant essential amino acid in most proteins. This does not mean the food is low in tryptophan compared with other foods.

Example clarification:

> Tryptophan is typically the least abundant essential amino acid in proteins. Although it appears lower in the amino-acid profile, foods such as turkey, eggs, dairy, soy, and pumpkin seeds still provide meaningful dietary tryptophan.

---

### 4. When to list EAAs as **Key Substances**

An amino acid may appear in the **Key Substances** section if:

1. It is unusually abundant relative to other foods.
2. It has strong mechanistic relevance.
3. It is widely associated with that food.

Examples:

| Food           | Key EAA(s)   |
|----------------|--------------|
| Turkey         | tryptophan   |
| Whey protein   | leucine      |
| Pumpkin seeds  | tryptophan, leucine |
| Soy foods      | leucine, lysine     |

---

### 5. Table Integration

When amino acid data are available, include them in the nutritional table.

Example:

| Amino Acid | per 100 g |
| ---------- | --------- |
| Leucine    | 1.7 g     |
| Lysine     | 2.0 g     |
| Tryptophan | 0.25 g    |

---

### 6. Relationship to BRAIN Diet Biological Regulatory Systems (BRS)

EAAs contribute to several regulatory systems:

- **Neurotransmitter Regulation**  
  (tryptophan → serotonin, tyrosine → dopamine)

- **Mitochondrial Function & Bioenergetics**  
  (leucine and BCAAs influence metabolic signalling)

- **Metabolic & Neuroendocrine Regulation**

Where relevant, the EAA profile section should mention these links briefly.

---

### 7. Presentation Principle

The goal is **clarity without clutter**.

Food pages should:

- highlight **1–3 meaningful amino acids**
- explain **limiting amino acids**
- teach **protein complementarity**

Avoid listing all nine EAAs unless in a detailed table.

---

*End of EAA Handling Specification*

---

## Implementation Checklist

- [ ] Overview is concise and selective; identity constituents only; numbers in Overview/Other Nutritional Highlights match rendered-table rounding. Culinary-support pages may stay short and must not manufacture biological importance.
- [ ] Database nutrition table is populated from structured, food-specific sources; no invented values; no substitute USDA foods.
- [ ] Every **rendered** Substances card has a corresponding **rendered** quantitative or explicit qualitative table row. A hidden/internal record does not count.
- [ ] Not every table row requires a Substances card. Ordinary background nutrients generally remain table-only.
- [ ] Overview-mentioned identity compounds missing from the rendered table trigger verification or an explicit research-queue state; they are not invented into rows or cards.
- [ ] Animal foods: no full amino-acid dump; use `protein_profile_note` by default.
- [ ] Plant foods: use `amino_acid_strengths`, `limiting_amino_acids`, `complementary_pairings` where useful.
- [ ] **Truth layers:** Only intrinsic food compounds in substances/tags; no downstream metabolites (e.g. SCFAs) as food substances.
- [ ] **EAA section:** Per-100 g protein has triggered review; include the subsection only when normal serving size and dietary role make the food a meaningful protein/EAA source. Omit it completely when inapplicable.
- [ ] Run `npm run nutrition:validate` to flag missing EAA sections, downstream metabolites in tags, and food–substance truth-level mismatches (substances missing from tables; unsupported quantitative values; qualitative rows lacking source).
- [ ] After updating front matter (`nutrition:apply`), run `npm run nutrition:repair` for mechanical tag/component repairs and `npm run nutrition:validate` for EAA editorial gaps. Repair does not manufacture EAA prose.

---

## Food page section order (canonical)

See **`system/food-page-schema.md`** for the consolidated schema (dark-chocolate reference page). Section order:

1. **Overview**
2. **Other Nutritional Highlights** — optional; see `system/food-page-schema.md`
3. **Food Context** (optional `### Essential Amino Acid Profile` inside when required)
4. **Recipes** — `<FoodRecipes />`
5. **Nutrition** — `<NutritionTable details={frontMatter} />`
6. **Substances** — `<FoodSubstancesFromTable details={frontMatter} />`
7. **References**

Validate canonical structure: `npm run nutrition:validate -- --canonical`

### References and the global bibliography (BibTeX)

Food pages list references as markdown links to the global bibliography: `/docs/papers/BRAIN-Diet-References#citationKey`. For the link to work:

1. **The entry must exist** in `static/bibtex/BRAIN-diet.bib` with that citation key.
2. **The entry must appear on the rendered page.** The BRAIN-Diet-References page deduplicates entries by DOI, URL, or title+year+author. If another entry has the same DOI or URL, only one is shown (the one with higher “metadata score”); the visible entry’s anchor is its citation key. So a key in the .bib is necessary but not sufficient—the entry you link to must be the one that survives deduplication.
3. **When adding a new BibTeX entry** that a food page will link to: ensure no other entry in the .bib shares the same DOI or URL, or your entry may be omitted from the page and the fragment link will not resolve. After adding, verify the reference appears on the references page and that the food-page link scrolls to it.

**Reference line rule:**
- Bibliographic core: **`[n] Author(s) (Year). [linked title](#citationKey)`**.
- Each food-page References entry must append one concise, source-supported description of its food-specific finding, scope or relevance.
- Format: `[n] Author(s) (Year). [{Paper title}](/docs/papers/BRAIN-Diet-References#citationKey). Food-relevant finding.`
- Plain-text citation lines without a bibliography link are not allowed.
- Join only by exact citation key and bounded BibTeX entry. Never borrow a neighbouring abstract.

**Editorial quality (not presentation):** minimum two **relevant** references; prefer direct food, human food, characteristic-substance, preparation, or food-specific review evidence; composition-table quantities do not need papers; generic mechanism / supplement / neighbouring-food evidence is not direct food evidence. Citation correctness and citation relevance are separate. See `system/food-page-schema.md` and `system/food-page-letter-audit-schema.md`.

---

## References

- Nutrition field definitions: `system/food-nutrition-schema.md`
- Letter-audit editorial records: `system/food-page-letter-audit-schema.md`
- Reference intakes: `system/nutrient-reference-values.md`
- Recipe and food page structure: docs recipe and food cursor rules.
