## BRAIN Diet Food Nutrition Schema

This document defines the **canonical nutrition data schema** for all BRAIN Diet food pages.

Nutrition data on food pages is the **composition store** used by downstream systems (recipes, BRS scoring, contribution levels). That store is **not** the “Three Sources of Truth.” The Three Sources of Truth are the rendered page layers in `system/food-page-model.md` (Overview, Database nutrition table, Substances list).

---

## Compositional representation (one-of)

A food page must provide **at least one valid rendered compositional representation**. A populated USDA-shaped `nutrition_per_100g` block is **not** universally required.

Valid representations (one or more):

| Representation | When to use | Front matter |
|----------------|-------------|--------------|
| **Standard database composition** | Named USDA or equivalent per-100 g panel for this food | Populated `nutrition_per_100g` + `nutrition_source` |
| **Authorised / specification-based composition** | Variable or formulated specialist products with no legitimate USDA match | `nutrition_authorised_specifications` (source-specific minima or formulation rows) |
| **Supported qualitative composition** | Presence is evidenced but a defensible comparable quantity is unavailable | `nutrition_supplementary_sources` with explicit status and food-specific `source_note` |

An empty `nutrition_per_100g: {}` object may remain as an **implementation compatibility field** if a component currently reads that key. It must **not** be described as the compositional source or as the canonical requirement. Do not invent USDA values to fill it.

Every rendered Substance card must still resolve to a **rendered row** in whichever valid representation the page uses.

When standard database composition **is** used, nutrient quantities are stored **per 100 g edible portion** (or per 100 g edible, drained portion where relevant) under `nutrition_per_100g`.

---

## Core Nutrient Fields

All nutrients are optional and only included when there is a **meaningful, sourced value**.

Units are **fixed by field name**:

- **kcal** – `kcal` per 100 g  
- **protein_g** – grams protein per 100 g  
- **fat_g** – grams total fat per 100 g  
- **sat_fat_g** – grams saturated fat per 100 g  
- **carbs_g** – grams carbohydrate (by difference) per 100 g  

- **fibre_g** – g total dietary fibre per 100 g  
- **sugar_g** – g total sugars per 100 g (when reported by the primary record)

- **iron_mg** – mg iron per 100 g  
- **zinc_mg** – mg zinc per 100 g  
- **magnesium_mg** – mg magnesium per 100 g  
- **phosphorus_mg** – mg phosphorus per 100 g  
- **manganese_mg** – mg manganese per 100 g  
- **selenium_ug** – µg selenium per 100 g  
- **calcium_mg** – mg calcium per 100 g  
- **potassium_mg** – mg potassium per 100 g  
- **copper_mg** – mg copper per 100 g  

- **choline_mg** – mg choline per 100 g  
- **folate_ug** – µg folate (total) per 100 g  
- **vitamin_b12_ug** – µg vitamin B12 per 100 g  
- **vitamin_b6_mg** – mg vitamin B6 per 100 g  
- **vitamin_b2_mg** – mg riboflavin (vitamin B2) per 100 g  
- **vitamin_e_mg** – mg vitamin E as α-tocopherol per 100 g  
- **vitamin_k_ug** – µg vitamin K (phylloquinone) per 100 g  

- **oleic_g** – g oleic acid (18:1 n-9) per 100 g. Stored when a named USDA or specialist panel reports it. Remains **internal** unless tagged or `public_display.oleic_g: table`. A public oleic row is not an automatic Substances card.  
- **linoleic_g** – g linoleic acid (18:2 n-6 cis,cis) per 100 g  
- **ala_mg** – mg alpha-linolenic acid, **18:3 n-3**, per 100 g  
- **epa_mg** – mg eicosapentaenoic acid, **20:5 n-3**, per 100 g  
- **dha_mg** – mg docosahexaenoic acid, **22:6 n-3**, per 100 g  
- **omega3_mg** – mg total omega‑3 per 100 g (aggregate; not a substance card). Requires `omega3_components`.  
- **pufa_18_3_unresolved_mg** – mg of an 18:3 the source reported **without stating the isomer**. Internal only.

These fields form the **standard database compositional panel** when that representation is used, stored in `nutrition_per_100g`. Do **not** invent a value because a substance page, Overview sentence, or related food mentions the compound. Future schema extensions MUST be documented here before use. Specialist pages that use authorised specifications instead must not populate this panel from a substitute food.

---

### Omega‑3 identity rules

Ninety-six food pages once published an amino acid as an omega‑3, because `ala_mg` had been filled from any field whose name resembled "ALA". These rules exist so that cannot recur. Public cases are recorded in `docs/dietary-foundations/nutrient-effects/food-composition-interpretation-register.md`, generated from the canonical dataset `src/data/fcir-register.json`. The Case ID is a workflow identifier only; each case also records typed food, substance and source identifiers. Food pages link to the relevant case only; they do not reproduce the calculation.

**ALA is alpha-linolenic acid, 18:3 n-3, and nothing else.**

- **Alanine, beta-alanine and phenylalanine are amino acids.** They may never populate `ala_mg`, whatever the resemblance in name.
- **An unqualified `18:3` is not ALA.** A carbon count states chain length and double bonds, not which isomer; 18:3 n-6 is gamma-linolenic acid, a different compound with different biology. Extraction stores it as `pufa_18_3_unresolved_mg` and never writes `ala_mg` from USDA nutrient 1270. A later, food-specific combined-provenance decision on the page may interpret that stored quantity as ALA under the literature rule below; extraction itself does not.
- **Identity comes from the source's nutrient identifier where one exists**, not from name matching. In USDA FoodData Central the only identifiers stating an n-3 isomer are `1404` (18:3 n-3, ALA), `1278` (20:5 n-3, EPA), `1280` (22:5 n-3, DPA), `1272` (22:6 n-3, DHA), `1405` (20:3 n-3) and `1407` (20:4 n-3). Identifier `1270` is the unqualified 18:3. Identifiers `2018`, `2023`, `2024` and `2025` name a cis form without an n-position and are **not** explicit n-3.
- **Missing means unreported.** Where a source does not identify the isomer, the field is omitted. It is never written as zero, and never approximated from a related food. A reported zero from an unqualified field is treated the same way: an unanalysed nutrient is unknown, not absent.
- **Stable source identifiers survive extraction and calculation.** The record id (`nutrition_source.fdc_id`), the basis, and the nutrient identity that decided each n-3 key must remain attached to the value wherever it travels — into `omega3_components`, into a recipe's `audit` rows, and into any payload under `scripts/out/`. A value that arrives somewhere without the identifier that justified it can no longer be checked, and an unverifiable number is what the repair had to remove 137 times.

**Three different quantities, never conflated:**

| Quantity | Meaning |
| --- | --- |
| An individual n-3 fatty acid | One named compound: `ala_mg`, `epa_mg`, `dha_mg` |
| EPA + DHA | The long-chain pair, the subject of most intake research |
| Total explicitly identified omega‑3 (`omega3_mg`) | Every n-3 acid the source explicitly identified, which may include DPA and other acids the site does not publish individually |

**EPA + DHA must never be labelled total omega‑3.** The pair is a smaller quantity that omits ALA, DPA and any other n-3 the record reported, so presenting it as the total understates the food while claiming completeness. Where a page or recipe shows the pair, it shows them as the named acids they are. Where it publishes a total, `omega3_components` must list everything included and the total must equal their sum — which is also why the pair cannot masquerade as one: a total that names only EPA and DHA while the panel carries ALA fails validation.

**`omega3_components` is required wherever `omega3_mg` is published.** It is a sibling of `nutrition_per_100g` and names each summed component:

```yaml
omega3_components:
  - nutrient: dha_mg
    identity: 22:6 n-3 (DHA)
    amount_mg: 1363
  - nutrient: epa_mg
    identity: 20:5 n-3 (EPA)
    amount_mg: 983
```

A total must equal the sum of its components, every component must name an n-3 isomer, and a total assembled only from zeros is omitted rather than published. A total whose parts cannot be named is not a measurement.

`pufa_18_3_unresolved_mg` appears in no display list and in no calculation. It exists so the source value is not lost, and is never rendered, labelled ALA, or summed into an n-3 total. A page carrying a resolved `ala_mg` does not also carry it.

#### Resolving an unresolved 18:3 from literature

Analytical literature may supply the **chemical form** that a composition record leaves unqualified. It rarely supplies the quantity, and the two must not be confused.

A paper resolves the isomer only where it explicitly writes *alpha-linolenic acid*, *α-linolenic acid*, *ALA*, *18:3 n-3* or the equivalent structure, and the same test applies to gamma-linolenic acid. "Linolenic acid" alone does not resolve it; bare `18:3` does not resolve it. Two further conditions, both learned from papers that failed them: the accepted wording must describe **what the authors measured**, not appear only as background in an introduction; and the instrument and named reference standards must have been capable of separating the isomers. Assessed papers are registered in `system/seed-fatty-acid-evidence.md`, rejections included.

Where the form is established this way, the page records **two-source provenance** — the record that supplies the quantity and the paper that supplies the identity — and says plainly which did which.

**Combined provenance may publish USDA's 18:3 quantity as ALA** only for a named food, and only when all of the following hold:

1. The USDA record is exact-food (same species, edible material, and preparation class).
2. Flax-specific (or walnut-specific, etc.) analytical literature, or another USDA record of that species, **explicitly** identifies the predominant 18:3 as 18:3 n-3. The hemp/Ribes proof case in `system/seed-fatty-acid-evidence.md` forbids treating this as a general 1270 → ALA promotion: a seed that carries both ALA and GLA cannot be resolved this way.
3. The published milligram figure is **the USDA-reported 18:3 quantity**, not an oil-percentage × ALA-fraction product, and not a quantity imported from a different preparation (ground vs whole, oil vs seed). SR Legacy values can be analytical, calculated, imputed, or literature-derived; write "USDA reports N mg" unless nutrient-level FDC metadata names the derivation type as an analytical measurement.
4. The page does **not** describe the result as a single directly measured ALA value. The public row is asterisked, names both sources, and states which supplied quantity and which supplied identity.
5. `ala_mg` then replaces `pufa_18_3_unresolved_mg` so recipes consume the interpreted value; `omega3_components` names the interpretation.

Worked example: `docs/foods/flax-seeds.md` publishes 22.8 g ALA from SR Legacy FDC 169414 nutrient 1270 (22,813 mg of unqualified 18:3) interpreted as 18:3 n-3 by flax-specific GC studies and by USDA Foundation FDC 2262075 (ground flaxseed, nutrient 1404). Foundation 19.42 g is **not** the published quantity — it is a different preparation at a different fat content, used only for isomer identity and for the 57% fatty-acid share.

Further worked examples of the same rule, not a general 1270 → ALA promotion:

- `docs/foods/walnuts.md` — 9.08 g from SR Legacy FDC 170187 nutrient 1270, interpreted by Kafkas et al. 2017 and Yoshinaga-Kiriake et al. 2022. Foundation FDC 2346394 has no 1404.
- `docs/foods/soy.md` (and tofu, tempeh, natto, miso) — each page's own SR Legacy 1270 milligrams, interpreted by USDA soybean oil FDC 171411 nutrient 1404 (6.789 g/100 g oil; nutrient 1321 GLA = 0). The oil quantity is **not** published on the seed or fermented-soy pages. Soy, tofu, natto and miso 18:3 is ~6.7% of that record's fat, matching the oil; tempeh is ~2.3% and that difference is left standing.

The hemp/Ribes/spirulina cases remain the forbid: a food whose 18:3 is GLA, or both isomers, cannot take this route. Avocado oil cannot either — avocado fruit SR Legacy reports both 1404 (0.111 g ALA) and 1321 (0.015 g GLA), so the oil's unqualified 1270 is not a single isomer.

**A ratio is not a quantity.** A percentage of total fatty acids becomes a per-100 g amount only against an oil or fat content, and only where both terms were measured **on the same samples**:

> ALA per 100 g = fat g per 100 g × ALA fraction of the fat

Any value so produced is **derived** and is labelled as such wherever it appears. Taking one source's ratio and another's fat content manufactures a figure that neither reported, and is prohibited under exact-food source matching below, **including as a way to replace a USDA-reported whole-seed 18:3 quantity**. Combined provenance uses USDA's milligrams; the oil × fraction arithmetic is corroborative only. Note also that per cent of total fatty acids, per cent of methyl esters, per cent of oil and grams per 100 g of oil are four different bases; fatty acyl chains are roughly 95–96 per cent of triacylglycerol mass, so the first three are not interchangeable. Do not present 55% of fatty acids as 55 g per 100 g whole seed.

---

### Exact-food source matching

A composition record may be used only where it describes **the same food**. Matching is on every axis, not just the name:

| Axis | A mismatch looks like |
| --- | --- |
| Food or product | Canola oil cited for MCT oil |
| Species | Beech mushroom cited for reishi or turkey tail |
| Edible material | Sunflower oil cited for sunflower lecithin |
| Preparation state | Raw cited for cooked, or whole cited for drained |
| Formulation | One brand's declared ratio presented as the class average |

**A related food is never a source.** Nothing may be carried across because the two foods are adjacent, because one is derived from the other, or because a panel would otherwise be empty. An empty panel is an honest statement about what is known; a neighbour's panel is a false one, and it is indistinguishable from a real measurement once published.

**A wrong record invalidates the whole derived panel.** If the record describes a different food, then its energy, its minerals and its protein are that other food's too. The nutrient that exposed the mismatch is not the extent of the damage, so withdrawal takes everything derived from the record rather than the single value that gave it away. This is enforced by `scripts/lib/composition-provenance.mjs`, which holds the canonical list of records already proven substituted; the validator, the repair script and the regression tests all read that one list.

A withdrawn page:

- sets `composition_status: withdrawn` and a `composition_withdrawn` block naming the record, the axis that failed (`identity_failure`), the reason, and the review queue tracking it;
- publishes no `nutrition_per_100g` values and no `nutrition_source`;
- keeps only qualitative rows, each with its own separately established source;
- may not re-cite the withdrawn record. A page leaves the queue on a new source, never on a re-reading of the old one.

**Recipes must not be able to reach an invalid record.** Refusal happens where composition is resolved, not where it is displayed, so an ingredient pointing at a withdrawn page becomes unresolved and the recipe reports it. See `system/recipe-ingredient-schema.md` for the propagation rules.

Search procedure before concluding that no record exists — including which databases and specification types may be used instead — is in `system/nutrition-workflow.md`.

---

## Composition and provenance classes

These classes describe **how a composition value is sourced and how strongly it may be claimed**. They operate **within and across** the canonical page layers defined in `system/food-page-model.md` (Overview, Database nutrition table, Substances list). They **do not replace** those layers and **must not** be labelled the “Three Sources of Truth.”

Keep the classes distinct. Do not convert ontology presence into invented composition values, do not copy values from a related food, and do not treat a table row as a BRS mapping.

| Class | What it is | Where it operates | Required fields |
|-------|------------|-------------------|-----------------|
| **1. Standard compositional** | Conventional energy, macronutrients, vitamins, minerals, and fatty acids with quantitative values from USDA FoodData Central or another named authoritative composition database. | Database nutrition table: `nutrition_per_100g` + `nutrition_source` | value, unit (from key), basis, named source |
| **2. Extended analytical** | BRAIN-relevant amino acids, individual fatty acids, nutrient forms, fibres, polyphenols, and other bioactives supported by analytical food-composition data or **food-specific** literature for compounds USDA does not capture. | Database nutrition table: individual fatty-acid keys in `nutrition_per_100g`, plus `nutrition_supplementary_sources` | Quantitative: value, unit, source. Qualitative: explicit status (canonical: `Present — quantity not established`) and `source_note` |
| **3. Ontology admission** | Whether a verified table compound is also admitted to the Substances list and, if needed, a canonical substance page. | Substances list + canonical substance pages | Card only after a supported table row. Must **not** invent a number. Not a BRS mapping. Not every table row is admitted. |

**Reconciliation (directional):**

- Every **rendered** Substances card must resolve to a corresponding **rendered** quantitative or explicit qualitative table row. A hidden/internal record does not satisfy this.
- Not every nutrition-table row requires a Substances card. Ordinary background nutrients should generally remain table-only.
- Compositional presence alone is insufficient for a card. Trace detection does not automatically admit a card.
- Every headline Overview **identity** compound must resolve to a rendered table row or enter an explicit research-queue state.
- A supported qualitative row establishes presence and is **not** an Overview → table gap.
- Unsupported Overview quantities must be removed; they must not generate cards or canonical pages.
- Values must never be copied from a related, substitute, or superficially similar food.
- Reconciliation scripts must not automatically create Substance pages.

**Worked example:** `docs/foods/almonds.md` (USDA SR Legacy FDC 170567). Fetch prefers the **richest mapped panel** among Foundation / SR Legacy / Branded candidates (`scripts/lib/usda-nutrient-extract.mjs`), so an abbreviated branded or Foundation hit cannot drop magnesium, phosphorus, manganese, copper, riboflavin, vitamin E, or linoleic acid when a fuller USDA record supplies them.

**Build-time check:** `npm run nutrition:validate` runs `scripts/lib/food-truth-reconciliation.mjs` across all food pages. Post-apply layer reporting: `npm run nutrition:reconcile-layers`.

## Rendering groups (`NutritionTable`)

The UI splits `nutrition_per_100g` into **sub-tables** for readability. The public group labels are **Core nutrients**, **Key vitamins and minerals** and **Bioactive compounds**, matching the recipe nutrition panel (`src/theme/RecipeNutrition`) so a reader moving between a food page and a recipe meets the same category names:

1. **Core nutrients** — energy, protein, fat (total + saturated), carbohydrates, sugars, fibre.  
2. **Key vitamins and minerals** — minerals and vitamins (iron through vitamin K, including phosphorus, manganese, copper, riboflavin, and vitamin E when present).  
3. **Bioactive compounds** — (a) individual fatty acids **oleic acid, linoleic acid, ALA, EPA, DHA** from `nutrition_per_100g` when explicitly identified and publicly admitted; (b) **`nutrition_supplementary_sources`** (polyphenols, nutrient forms, literature-only analytes, etc.). Uses columns *Compound / class · Amount · Notes*; values marked `*` are explained in **Source notes** below the block. Qualitative rows use `Present — quantity not established` when presence is evidenced but no defensible per-100 g value exists. The complete fatty-acid panel stays in `nutrition_per_100g` for recipe calculation whether or not a given acid is publicly admitted here.  
4. **Optional functional metrics** — optional front matter `nutrition_functional_metrics` (e.g. total polyphenol proxies, antioxidant capacity) when a defensible, cited value or qualitative label exists.
5. **Representative authorised specifications** — for source-variable specialist products that must not use a USDA proxy (currently algal oil). Front matter `nutrition_authorised_specifications` renders Formulation · DHA · EPA · Interpretation. Values are **regulatory minima**, not measured averages, not product-label doses, and must not be inferred from a different oil. Distinct formulations must be visibly distinguished (example: DHA-rich algal oils vs combined EPA/DHA algal oils; EPA is formulation-specific).

Do **not** invent energy, total fat, or other USDA panel values for a specialist product that has no matching food-composition record. Do not present capsule or serving-label milligrams as universal per-100 g composition.

Untagged micronutrients and bioactives in `nutrition_per_100g` remain **internal** unless admitted to public display. Internal records may be retained for provenance and algorithms without appearing on the rendered table or satisfying a Substances card.

---

## Supplementary sources (asterisked values)

When the **Overview** mentions a headline compound that is not in the primary database (e.g. USDA), verify it and, if curated, add it via **supplementary sources**. See `system/food-page-model.md` (Missing Compound Rule). Mentions alone do not create Substances cards.

Optional front matter block. Each entry **must** include `key`, `label`, `source_note`, plus **either** a numeric `value` with `unit` **or** a qualitative `amount_display` / `status` string (canonical qualitative status: `Present — quantity not established`).

```yaml
nutrition_supplementary_sources:
  - key: astaxanthin_mg
    label: Astaxanthin
    value: 3.2
    unit: mg
    notes: "Carotenoid; content varies by feed and species."   # optional — short “Notes” column in Bioactive table
    source_note: "Literature estimate for farmed Atlantic salmon; … (USDA does not report astaxanthin)."
  - key: epicatechin_qual
    label: Epicatechin
    amount_display: "Varies by product"
    notes: "Usually the dominant monomeric cocoa flavanol."
    source_note: "Qualitative presence; quantitative values only when cited."
```

**Strict structure:**

| Field        | Type   | Required | Rules |
|-------------|--------|----------|--------|
| `key`       | string | Yes      | Snake_case; unique within the page; used for sorting and substances mapping. |
| `label`     | string | Yes      | Display name in the table and in Source notes. |
| `value`     | number | If no `amount_display` or `status` | Per 100 g; paired with `unit`. |
| `unit`      | string | If `value` is set | e.g. `mg`, `µg`, `g`. |
| `amount_display` | string | If no numeric `value` | Shown in the Amount column instead of `value` + `unit`. |
| `status`    | string | If no numeric `value` and no `amount_display` | Explicit qualitative status. Use `Present — quantity not established` when presence is evidenced but quantity is not. |
| `notes`     | string | No       | Short text for the extended-table **Notes** column. |
| `source_note`| string | Yes      | Full attribution; listed in **Source notes (extended / supplementary)** below the tables. Food-specific; not inferred from a related food. |

**Rendering:** The extended sub-table shows compound, amount (with `*` for traceable supplementary rows), and optional `notes`. A disclaimer paragraph appears when extended or functional sections are present.

Parent compounds, aglycones, glycosides, and derivatives are not interchangeable. Table `notes` (and food-specific `substance_card_captions`) must state the actual form present. Do not put food-specific form wording into the generic Substance page description.

A qualitative row with explicit status and food-specific `source_note` can establish presence when a defensible comparable quantity is unavailable. Lack of a per-100 g quantity does not automatically prevent later ontology admission.

---

## Optional functional metrics

Use for **category-level** or **assay-dependent** metrics (total polyphenols, ORAC, etc.) when appropriate:

```yaml
nutrition_functional_metrics:
  - key: total_polyphenols_proxy
    label: Total polyphenols (Folin proxy)
    amount_display: "Varies by product"
    notes: "Strongly influenced by cocoa percentage and processing."
```

| Field | Type | Required | Rules |
|-------|------|----------|--------|
| `key` | string | Yes | Unique per page. |
| `label` | string | Yes | Row label. |
| `value` / `unit` | number + string | If no `amount_display` | Same as supplementary. |
| `amount_display` | string | If no numeric value | Qualitative or labelled amount. |
| `notes` | string | No | Notes column. |

Named analytes in `nutrition_supplementary_sources` are table rows. They become Substances cards only when admitted to the Substances layer; supplementary presence alone does not require a card, and a card still requires the table row.

---

## Data Rules

- **Per‑100 g basis only**  
  - All values are normalised to **per 100 g edible portion**.  
  - No per‑serving values are stored in food front matter.

- **Phase 1 data source**  
  - Source is **USDA FoodData Central** (Foundation or SR Legacy records preferred).  
  - Retrieval via `scripts/fetch-usda-nutrition.mjs`: inspect up to eight ranked candidates and keep the **richest mapped panel**, so abbreviated Foundation/branded records cannot silently drop BRAIN-relevant nutrients.  
  - `scripts/usda-map.json` may pin the search query (e.g. almonds → `Nuts, almonds`).  

- **No invented values**  
  - Values MUST come directly from a documented data source for **this food**.  
  - Do **not** back‑calculate, estimate, or infer values from ontology tags, overview prose, a related food, or a substitute USDA record (e.g. canola for algal oil).  
  - If a recognised substance lacks a defensible quantity, keep it as an extended qualitative row (`Present — quantity not established`, or an authorised-specification minimum) with a food-specific `source_note` — do not invent a number.  
  - Product-label dosage is not universal per-100 g composition.

- **Omit when not relevant**  
  - If a nutrient is not nutritionally relevant for the food (e.g. **fibre** and **sugar** in plain fish), **omit the field entirely** from `nutrition_per_100g`.  
  - Do **not** add explicit zeros purely for completeness.

- **Use `null` only for “exists but not provided”**  
  - If a nutrient is known to be relevant for the food class but the dataset genuinely does **not** provide a value, the field MAY be included with `null`.  
  - Example: a known omega‑3 source where the chosen record omits DHA.  
  - `null` means “nutrient exists, but no quantitative value in the current dataset”.

- **Omit when unknown**  
  - If you are unsure whether the nutrient exists in meaningful amounts, or the data source is unclear, **omit the field instead of using `null`**.

---

## Example Schema (Front Matter)

```yaml
---
id: salmon
title: Salmon
description: Oily fish rich in EPA/DHA, protein, and B vitamins
tags:
  - Food
  - Salmon
  - Omega-3 Fatty Acids
list_image: /img/icons/ingredients.svg

nutrition_per_100g:
  kcal: 203.1
  protein_g: 20.3
  fat_g: 13.1
  sat_fat_g: 2.3
  carbs_g: 0
  iron_mg: 0.3
  zinc_mg: 0.3
  magnesium_mg: 25.4
  selenium_ug: 22.8
  calcium_mg: 9.4
  potassium_mg: 378.2
  vitamin_b12_ug: 5.7
  omega3_mg: 1444
  epa_mg: 318
  dha_mg: 585

nutrition_source:
  database: USDA FoodData Central
  food_name: Fish, salmon, Atlantic, farm raised, raw
  fdc_id: 2684441
  retrieval_method: API
  basis: per 100 g edible portion
  last_checked: 2026-03-13
---
```

---

## Canonical Source for Downstream Systems

- Food‑level composition is stored in whichever valid representation the page uses (`nutrition_per_100g`, `nutrition_authorised_specifications`, and/or supported qualitative `nutrition_supplementary_sources`). Downstream systems that currently read only `nutrition_per_100g` must treat an empty object as “no USDA panel,” not as a measured zero panel.
  - recipe‑level nutrition calculations  
  - contribution level classification  
  - BRS and therapeutic‑area scoring
- Any future changes to nutrient values MUST be made in the representation the page uses; other layers should consume, not redefine, this data.
- This composition store is not a second “Three Sources of Truth.”

---

## Three Sources of Truth (canonical page layers)

How the nutrition block relates to the **Overview** and **Substances list** is defined in `system/food-page-model.md`. Those three **rendered** layers — Overview, Database nutrition table, Substances list — are the canonical Three Sources of Truth. The composition and provenance classes above do not replace them and must not be labelled the Three Sources of Truth. Every rendered Substances card requires a matching **rendered** table row in whichever valid compositional representation the page uses; a hidden/internal record does not count; not every table row requires a card.

