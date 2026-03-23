# BRAIN Diet Food Page Model: Three Sources of Truth

This document defines the **canonical relationship** between the three layers of every food page and the rules that keep them aligned. It also specifies **amino acid / EAA presentation** for animal vs plant foods.

---

## Core Model: Three Sources of Truth

Each food page has **three distinct layers**. They must stay aligned but do **not** serve the same purpose.

| Layer | Purpose | Rules |
|-------|---------|--------|
| **1. Overview** | Explain why the food matters biologically; identify key active compounds / headline bioactives. | Concise and selective. Not a chemistry dump. Mention only the most important compounds driving biological identity. May mention compounds not yet in the database table. |
| **2. Database nutrition table** | Provide the **quantitative evidence** layer. | Authoritative numeric layer. Populated from structured databases (USDA FoodData Central, Phenol-Explorer, etc.). If a compound appears here, it **must** appear in the substances list. |
| **3. Substances list** | Structured list of **meaningful compounds** in the food. | Must **mirror** the database table. Every compound in the nutrition table must appear here. Not an exhaustive inventory. |

**Summary:**

- **Overview** → defines the key biological identity of the food.
- **Database table** → quantifies those (and other) compounds.
- **Substances list** → mirrors the table contents.

---

## Three Truth-Layer Boundaries

Content must respect **three distinct truth layers**. Violating these boundaries causes downstream metabolites and strategy advice to be misrepresented as intrinsic food compounds.

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

If the **overview** mentions a key compound that is **missing from the database table**, do not leave the inconsistency in place.

1. Perform a wider search in appropriate literature or specialised databases.
2. Find a credible quantitative value or estimate.
3. Add that compound to the nutrition table (or to the **supplementary sources** block).
4. Mark that table value with an **asterisk (\*)**.
5. Show the corresponding **source note** beneath the table.
6. Ensure that compound also appears in the **substances list**.

**Example:** If the salmon overview mentions astaxanthin but USDA does not provide it:

- Search literature / specialist carotenoid source.
- Add e.g. `astaxanthin: 3.2 mg*` via the supplementary sources mechanism.
- Include a source note below the table.
- Include Astaxanthin in the substances list.

The asterisk must visually connect the table entry and the source note below.

**Important:** The database layer remains authoritative; the overview can **trigger evidence expansion**. Values from supplementary sources are still sourced and attributed.

---

## Relationship Between the Three Layers (Final)

- **Overview** identifies important compounds.
- **Database table** quantifies them (primary + supplementary with asterisk).
- **Substances list** mirrors the table contents.
- **Expansion rule:** overview-only compounds trigger additional evidence search, then get added to the table with source attribution (asterisk + source note).

---

## Key Nutritional Highlights Layer

Add `## Key Nutritional Highlights` immediately after `## Overview` on food pages.

Purpose:
- Provide a fast, decision-relevant summary of the food's key nutritional characteristics.
- Include both major advantages and relevant constraints in neutral scientific language.

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
- preparation or processing effects (these belong in Food Context / Preparation).

Every bullet should be answerable as:
- "What is uniquely or meaningfully characteristic about this food in the context of the BRAIN Diet?"

### Processing vs Food Identity Rule

Do not conflate intrinsic food properties with processing effects.

- Intrinsic properties (nutrients, amino acids, micronutrients) belong in:
  - Overview
  - Key Nutritional Highlights
- Processing-related effects belong in:
  - Food Context
  - Preparation

Highlights may include neutral phrasing such as:
- "Nutritional profile depends on processing method."

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

- [ ] Overview is concise and selective; key bioactives only.
- [ ] Database nutrition table is populated from structured sources; no invented values.
- [ ] Every compound in the table appears in the substances list.
- [ ] Overview-mentioned compounds missing from the table trigger evidence search and are added with asterisk + source note.
- [ ] Animal foods: no full amino-acid dump; use `protein_profile_note` by default.
- [ ] Plant foods: use `amino_acid_strengths`, `limiting_amino_acids`, `complementary_pairings` where useful.
- [ ] **Truth layers:** Only intrinsic food compounds in substances/tags; no downstream metabolites (e.g. SCFAs) as food substances.
- [ ] **EAA section:** If protein ≥5 g/100 g or commonly used as protein source, page includes Essential Amino Acid Profile subsection with pairing strategy where relevant.
- [ ] Run `npm run nutrition:validate` to flag missing EAA sections and downstream metabolites in tags.
- [ ] After updating front matter (`nutrition:apply`), run `npm run nutrition:repair` so invalid pages are fixed in batch; do not leave failing pages in place. Use `npm run nutrition:pipeline` to apply then repair in one step.

---

## Food page section order (canonical)

So that the BRAIN framework (context before data) is respected, the canonical order of sections on every food page is:

1. **Overview** – Why the food matters biologically; key bioactives.
2. **Food Context** – Framework and practical context: sourcing, synergies, serving. Use subheadings **Sourcing**, **Synergies**, **Serving** where applicable. (Formerly "Preparation Notes"; moved up to follow Overview.)
3. **Essential Amino Acid Profile** – When required (protein ≥5 g/100 g or commonly protein source).
4. **Nutrition (per 100 g)** – `<NutritionTable details={frontMatter} />` (multi-panel: core macros, micronutrients, bioactives/supplementary, optional functional metrics; see `system/food-nutrition-schema.md`).
5. **Substances** – `<FoodSubstancesFromTable details={frontMatter} />` (or `<FoodSubstances />` when not on nutrition layer).
6. **Recipes** – `<FoodRecipes tag="…" />`.
7. **Biological Target Matrix** – `<FoodMatrix tag="…" />`.
8. **References** – Evidence and links.

### References and the global bibliography (BibTeX)

Food pages list references as markdown links to the global bibliography: `/docs/papers/BRAIN-Diet-References#citationKey`. For the link to work:

1. **The entry must exist** in `static/bibtex/BRAIN-diet.bib` with that citation key.
2. **The entry must appear on the rendered page.** The BRAIN-Diet-References page deduplicates entries by DOI, URL, or title+year+author. If another entry has the same DOI or URL, only one is shown (the one with higher “metadata score”); the visible entry’s anchor is its citation key. So a key in the .bib is necessary but not sufficient—the entry you link to must be the one that survives deduplication.
3. **When adding a new BibTeX entry** that a food page will link to: ensure no other entry in the .bib shares the same DOI or URL, or your entry may be omitted from the page and the fragment link will not resolve. After adding, verify the reference appears on the references page and that the food-page link scrolls to it.

---

## References

- Nutrition field definitions: `system/food-nutrition-schema.md`
- Reference intakes: `system/nutrient-reference-values.md`
- Recipe and food page structure: docs recipe and food cursor rules.
