# BRAIN Diet Food Page Model: Three Sources of Truth

This document defines the **canonical relationship** between the three layers of every food page and the rules that keep them aligned. It also specifies **amino acid / EAA presentation** for animal vs plant foods.

---

## Core Model: Three Sources of Truth

Each food page has **three distinct layers**. They must stay aligned but do **not** serve the same purpose.

| Layer | Purpose | Rules |
|-------|---------|--------|
| **1. Overview** | Concise, researched narrative of what is distinctive about the food — characteristic substances and chemical forms, distinctive composition, matrix or preparation, formulation, antinutrients/bioavailability, or practical culinary role. Do not repeat generic nutrient biology. Recipe usefulness is a sufficient reason for the page to exist. Follow the **Overview editorial standard** below. | Selective. Not a chemistry dump. Mention macros or micronutrients only when they materially characterise the food, with values consistent with the rendered table. Headline identity compounds that are not yet in the **rendered** nutrition table must be flagged for verification or placed on the research queue; they must not become Substances cards or canonical substance pages until admitted through the rendered table. Pairings, comparisons, generic mechanisms, and downstream outcomes are not identity constituents. Culinary-support foods may be described neutrally without manufactured physiological importance. |
| **2. Database nutrition table** | The **rendered** composition table from whichever valid representation the page uses: standard `nutrition_per_100g`, authorised/specification rows, and/or explicit qualitative supplementary rows. | Authoritative compositional evidence for what the reader can see. A populated USDA-shaped `nutrition_per_100g` block is not universally required. An empty `nutrition_per_100g: {}` is compatibility only and is not the compositional source. Rows may be quantitative or explicit qualitative, with food-specific provenance. A table row is **not** a BRS mapping. Mere database detection, especially at trace levels, does not automatically justify a Substances card. Hidden/internal records do **not** satisfy card admission. Every rendered Substance card must resolve to a rendered row in the representation actually used. |
| **3. Substances list** | The **rendered** structural list that mirrors the validated, meaningful union of Overview identity and the rendered table, linking those entities into the canonical substance ontology. | Every rendered Substances card **must** resolve to a corresponding **rendered** quantitative or explicit qualitative table row. Not every nutrition-table row requires a Substances card. Cards are not a substitute for table inclusion and are not BRS mappings. |

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

An index description should identify the food in one short phrase, name only its most characteristic nutritional features, remain understandable to a general reader, and normally fit on one line. A genuinely distinctive compositional feature may appear; study findings, outcome claims, trial language, methodological qualifications, reconciliation history, and USDA or source caveats belong on the food page.

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
5. After a rendered table row exists, the compound may be **considered** for the Substances list. Admission is editorial: compositional presence alone is insufficient. Decide whether the food–substance relationship merits ontology admission **before** treating a missing canonical page as a blocker.
6. If an admitted substance lacks a canonical substance page, create or propose that page as a **deliberate ontology task**. Reconciliation scripts must **not** automatically create Substance pages, but a merited card must not be declined solely because the page does not yet exist.
7. Unsupported Overview quantities must be removed. Credible but unresolved identity constituents enter an explicit research queue; they must not generate invented rows or cards.
8. Values must never be copied from a related, substitute, or superficially similar food (e.g. walnuts → almonds; canola → algal oil).

**Enforced direction:**

- Every rendered Substances card must resolve to a corresponding rendered quantitative or explicit qualitative table row.
- A hidden/internal composition record does not satisfy that requirement.
- Not every nutrition-table row requires a Substances card. Ordinary background nutrients should generally remain table-only. Internal records may be retained for provenance and future use without appearing publicly.
- Mere database detection, especially at trace levels, does not automatically justify ontology inclusion.
- Cards represent selective food-identity or BRAIN-relevant constituents, not a chemistry dump.
- Every compound presented as a headline **identity** constituent in the Overview must either resolve to a rendered table row or be placed on the research queue with a precise state (not a generic Overview → table gap when a qualitative row already evidences presence).

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

**When required:** Include the **"Essential Amino Acid Profile"** subsection when a food contains **≥5 g protein per 100 g** or is **commonly used as a protein source** (e.g. meats, fish, eggs, dairy, soy foods, legumes, seeds, nuts, high-protein grains such as oats, barley, quinoa).

**Enforcement:** Any food page that meets this rule **must** include the Essential Amino Acid Profile subsection. Omission is a validation failure.

**Content rules for the EAA section:**
- Classify the protein profile appropriately (complete vs plant incomplete).
- Include **Notable amino acids** and/or **Limiting amino acids** where relevant.
- Put **pairing and complementarity advice** in this section (Protein pairing strategy), not in the Overview.

**Validation:** Fail or flag generation if a page meeting the protein threshold does not contain an "Essential Amino Acid Profile" (or equivalent) subsection.

---

## Missing Compound Rule

If the **Overview** mentions a headline compound that is **missing from the database table**, do not leave the inconsistency in place, do not invent a number, and do not create a Substances card or canonical substance page from the mention alone.

1. Prefer a wider search of the **same food** in USDA (richest mapped panel, not the first abbreviated hit) or another named composition database.
2. If no USDA value exists, flag the compound for verification (Script B review queue). Do not scrape arbitrary web results into the table.
3. A verified supplementary value may be applied only after it has been curated into the provenance dataset (`scripts/data/literature-compounds.json`). Then add it to `nutrition_supplementary_sources` with an asterisk and food-specific `source_note`.
4. If presence is evidenced but quantity is not established, a qualitative row with status `Present — quantity not established` may be curated the same way.
5. Add the compound to the Substances list **only after** the supported table row exists.
6. Propose a canonical substance page only after ontology admission; do not silently create pages.

**Example:** If the salmon Overview mentions astaxanthin but USDA does not provide it:

- Search a specialist carotenoid source **for salmon**.
- Curate the value into the provenance dataset, then apply the supplementary row.
- Include Astaxanthin in the Substances list only once the table row exists.

Do **not** copy a value from a related food (e.g. walnuts → almonds).

---

## Visible-layer consistency

The Three Sources of Truth are **rendered** layers.

- Every rendered Substance card requires a corresponding **rendered** quantitative or explicit qualitative table row.
- A hidden or internal composition record (`internal-only`, untagged micronutrient/bioactive stored for algorithms) does **not** satisfy that requirement.
- Not every rendered table row requires a Substance card.
- Internal records may be retained for provenance and future use without appearing publicly.
- Ordinary background nutrients should generally remain table-only.

## Substance admission

Compositional presence alone is insufficient for a Substance card. Cards represent selective food-identity or BRAIN-relevant constituents, not a chemistry dump.

- Trace detection does not automatically admit a card.
- A missing canonical Substance page may be proposed only after the food–substance relationship is verified **and** editorially admitted.
- Reconciliation scripts (`nutrition:reconcile-layers`, `audit-food-page-layers`) must **not** automatically create Substance pages.

## Overview identity constituents

Important identity constituents named in the Overview trigger compositional verification. Verified constituents enter the **rendered** table before the Substances list.

- Unsupported quantities must be removed.
- Credible but unresolved identity constituents enter an explicit research queue; they do not generate invented rows or cards.
- Numerical Overview and Key Nutritional Highlights statements must match the rendered table and its displayed rounding.
- Mention fibre, protein, fat, carbohydrate, vitamins, and minerals in Overview only when they materially characterise the food. Do not repeat their general biology; the rendered table already establishes ordinary composition.
- Not every chemical noun in an Overview is an identity constituent. Pairings, comparisons, generic mechanisms, and downstream outcomes must be classified separately (Intrinsic / Mechanism / Strategy). Distinctive matrix, preparation, formulation, or culinary role may be named in Overview without becoming a recipe.

## Qualitative evidence

A supported qualitative table row can establish **presence** when a defensible comparable quantity is unavailable.

- Lack of a per-100 g quantity does not automatically prevent later ontology admission or creation of a Substance page.
- The row must include explicit status and food-specific provenance.
- A supported qualitative row must **not** continue to be reported as an Overview → table gap.

## Chemical-form precision

Parent compounds, aglycones, glycosides, and derivatives must not be treated as interchangeable. Nutrient identity — which acid `ala_mg` may hold, what an unqualified 18:3 means, and how an omega-3 total must account for itself — is defined once in `system/food-nutrition-schema.md`.

- A parent-aglycone card may be used only when the **food-specific** card caption (`substance_card_captions`) and table notes state the actual form present.
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
| Presence unresolved | Named as an identity constituent; no rendered quantitative or qualitative row yet. This is the only state that is an Overview → table gap. |
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
- **Substances list** mirrors the validated, meaningful union: cards only for compounds that already have a **rendered** table row.
- **Expansion rule:** Overview-only identity compounds trigger verification, then table admission, then editorial Substances admission — never cards without a rendered row, never invented numbers, never values copied from a related or substitute food.

---

## Key Nutritional Highlights Layer

Add `## Key Nutritional Highlights` immediately after `## Overview` on food pages.

Highlights are concise, selective public takeaways — not an evidence table and not a fourth Source of Truth. They must not inherit trial-log detail removed from Overviews. Almonds is the calibration example.

Keep a Highlight when it communicates a distinctive nutritional characteristic; an important food-specific finding in plain language; a practical preparation or substitution point; or a material qualification needed to prevent misunderstanding.

Do not put in Highlights: intervention doses and durations; detailed comparator descriptions; lists of related biomarkers; study methods; or composition figures already clear in the nutrition table, unless the figure is genuinely useful to interpretation.

When a Highlight does cite a quantity, it must match the **rendered** nutrition table and its displayed rounding (almonds table: protein 21.2 g, fibre 12.5 g, calcium 269 mg). Those figures belong in the table; almonds Highlights do not repeat them.

**Reference annotations** may append a concise food-relevant finding to the Author (Year) and linked-title core: study population or design, food dose, duration, comparator, principal outcome, analytical or preparation finding, or an important scope limitation. Do not lead with dietary advice. Do not duplicate that trial detail in Overview or Highlights. Annotations must describe only the exact cited paper and continue to resolve through the bounded exact-key BibTeX resolver.

Formatting:
- 3-6 bullets only.
- One sentence or short clause per bullet.
- No value-judgement labels such as "Strengths/Weaknesses" or "Pros/Cons".

Repetition policy:
- Allowed only when function changes:
  - Highlights = summary
  - later sections (Food Context/EAA/etc.) = expanded explanation
- Do not repeat the same sentence at the same level of detail across multiple sections.

### Key Nutritional Highlights – Specificity Rule

Only include points that are meaningfully characteristic of the specific food.

Do NOT include:
- generic statements that apply to most foods in the same category,
- comparisons to obviously inferior baselines (e.g., "better than refined grains"),
- general macronutrient statements that add no differentiation (e.g., "provides carbohydrates"),
- properties common to essentially all foods in the category (e.g., "low in saturated fat" for most plant foods),
- recipe method dumps (detailed preparation belongs in Food Context). Culinary-support pages may note culinary role.

Every bullet should be answerable as:
- "What is uniquely or meaningfully characteristic about this food in the context of the BRAIN Diet?"

Culinary-support foods may answer that with culinary role. Do not invent a neurological or mechanistic bullet to fill the list.

### Processing vs Food Identity Rule

Do not conflate intrinsic food properties with processing effects.

- Intrinsic properties (nutrients, amino acids, micronutrients) belong in:
  - Overview
  - Key Nutritional Highlights
- Detailed processing method belongs in:
  - Food Context
  - Preparation

Highlights may include neutral phrasing such as:
- "Nutritional profile depends on processing method."

Preparation that *is* the food’s distinctive chemistry may be summarised in Highlights; the method stays in Food Context.

Avoid implying a whole food is harmful based only on specific processed forms.

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

Food pages must include a subsection explaining the **Essential Amino Acid (EAA) profile** of the food. This allows readers to understand:

- protein completeness
- limiting amino acids
- complementary food pairing (e.g. grains + legumes)
- mechanistic roles of amino acids in BRAIN Diet Biological Regulatory Systems (BRS)

This section improves the educational value of the site and supports mechanistic links between foods and neurotransmitter synthesis, metabolism, and cellular regulation.

---

### Rule – When the EAA Profile Section Is Required

Include the **"Essential Amino Acid Profile"** subsection when a food contains **≥5 g protein per 100 g** or is **commonly used as a protein source**.

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

- [ ] Overview is concise and selective; identity constituents only; numbers in Overview/Highlights match rendered-table rounding. Culinary-support pages may stay short and must not manufacture biological importance.
- [ ] Database nutrition table is populated from structured, food-specific sources; no invented values; no substitute USDA foods.
- [ ] Every **rendered** Substances card has a corresponding **rendered** quantitative or explicit qualitative table row. A hidden/internal record does not count.
- [ ] Not every table row requires a Substances card. Ordinary background nutrients generally remain table-only.
- [ ] Overview-mentioned identity compounds missing from the rendered table trigger verification or an explicit research-queue state; they are not invented into rows or cards.
- [ ] Animal foods: no full amino-acid dump; use `protein_profile_note` by default.
- [ ] Plant foods: use `amino_acid_strengths`, `limiting_amino_acids`, `complementary_pairings` where useful.
- [ ] **Truth layers:** Only intrinsic food compounds in substances/tags; no downstream metabolites (e.g. SCFAs) as food substances.
- [ ] **EAA section:** If protein ≥5 g/100 g or commonly used as protein source, page includes Essential Amino Acid Profile subsection with pairing strategy where relevant.
- [ ] Run `npm run nutrition:validate` to flag missing EAA sections, downstream metabolites in tags, and food–substance truth-level mismatches (substances missing from tables; unsupported quantitative values; qualitative rows lacking source).
- [ ] After updating front matter (`nutrition:apply`), run `npm run nutrition:repair` so invalid pages are fixed in batch; do not leave failing pages in place. Use `npm run nutrition:pipeline` to apply then repair in one step.

---

## Food page section order (canonical)

See **`system/food-page-schema.md`** for the consolidated schema (dark-chocolate reference page). Section order:

1. **Overview**
2. **Key Nutritional Highlights**
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
- Food pages may append a concise food-specific finding or trial highlight because study detail is normally omitted from the Overview.
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
