## BRAIN Diet – Nutrient Reference Values

This file documents the **reference daily intake values** used for percentage calculations in the BRAIN Diet nutrition layer.

> % of reference = (amount ÷ daily reference intake) × 100

Applied per 100 g on food pages (`NutritionTable`) and per serving on recipe pages (`RecipeNutrition`).

---

## Reference Standard

- **Base standard**: U.S. Institute of Medicine / National Academies **Dietary Reference Intakes (DRIs)**
- **Population**: Healthy adults **19–50 years**
- **Sex differences**: Where male and female values differ, we use the **higher of the two** as a conservative reference for labelling and comparison.

This is a pragmatic, single-number standard for comparative recipe work. It is **not** intended to replace personalised clinical recommendations.

---

## Reference basis

The kind of target matters, and a percentage must be labelled for what it is.

- **RDA** — Recommended Dietary Allowance. A level expected to meet the needs of nearly all healthy adults. Shown as `% RDA`.
- **AI** — Adequate Intake. An observed or approximated level used where the evidence cannot support an RDA. It is not a weaker RDA and must never be labelled as one. Shown as `% AI`.
- **UL** — Tolerable Upper Intake Level. A safety boundary, never a target. Never expressed as a percentage to reach. Several ULs apply only to supplemental or synthetic forms, so applicability is recorded alongside the number and a whole food is not flagged against a supplement limit.
- **Guideline** — a named recommendation with no formal DRI target. Named explicitly, never called an RDA.
- **No recognised target** — the absolute quantity is given and no percentage is manufactured. This covers most bioactives: polyphenols, carotenoids, glucosinolates, creatine, CoQ10.

Qualitative presence cannot be converted into intake coverage, and a missing analytical value stays unknown rather than becoming zero.

---

## Reference Values (per day)

| Nutrient | Field key | Value | Unit | Basis | UL | UL applies to |
|---|---|---|---|---|---|---|
| Iron | `iron_mg` | 18 | mg | RDA (higher of men 8, women 18) | 45 | total intake |
| Zinc | `zinc_mg` | 11 | mg | RDA (higher of women 8, men 11) | 40 | total intake |
| Magnesium | `magnesium_mg` | 420 | mg | RDA (higher of women 310–320, men 400–420) | 350 | supplemental magnesium only, not food |
| Selenium | `selenium_ug` | 55 | µg | RDA | 400 | total intake |
| Calcium | `calcium_mg` | 1000 | mg | RDA | 2500 | total intake |
| Potassium | `potassium_mg` | 3400 | mg | AI (adult men; women 2600) | — | — |
| Choline | `choline_mg` | 550 | mg | AI (adult men) | 3500 | total intake |
| Folate | `folate_ug` | 400 | µg | RDA as dietary folate equivalents | 1000 | synthetic folic acid only |
| Vitamin B12 | `vitamin_b12_ug` | 2.4 | µg | RDA | — | — |
| Vitamin B6 | `vitamin_b6_mg` | 1.3 | mg | RDA (19–50, both sexes) | 100 | total intake |
| Vitamin E | `vitamin_e_mg` | 15 | mg | RDA as α-tocopherol | 1000 | supplemental α-tocopherol only |
| Vitamin K | `vitamin_k_ug` | 120 | µg | **AI**, not an RDA | — | — |
| Copper | `copper_mg` | 0.9 | mg | RDA | 10 | total intake |
| Phosphorus | `phosphorus_mg` | 700 | mg | RDA | 4000 | total intake |
| Manganese | `manganese_mg` | 2.3 | mg | **AI**, not an RDA | 11 | total intake |
| Vitamin B2 | `vitamin_b2_mg` | 1.3 | mg | RDA | — | — |
| Vitamin B1 | `vitamin_b1_mg` | 1.2 | mg | RDA | — | — |
| Vitamin B3 | `vitamin_b3_mg` | 16 | mg | RDA as niacin equivalents | 35 | synthetic niacin only |
| Vitamin B5 | `vitamin_b5_mg` | 5 | mg | **AI**, not an RDA | — | — |
| Vitamin C | `vitamin_c_mg` | 90 | mg | RDA | 2000 | total intake |
| Vitamin A | `vitamin_a_rae_ug` | 900 | µg | RDA as retinol activity equivalents | 3000 | preformed retinol only |
| Vitamin D | `vitamin_d_ug` | 15 | µg | RDA (19–70) | 100 | total intake |
| Iodine | `iodine_ug` | 150 | µg | RDA | 1100 | total intake |
| Sodium | `sodium_mg` | — | mg | Guideline only: 2300 mg chronic disease risk reduction intake | — | — |

Sodium is deliberately given no target percentage. Neither the 1500 mg AI nor the 2300 mg risk-reduction level is something a reader should aim to reach, so recipe pages show the absolute amount and the exclusions behind it.

### Corrections

Vitamin B6 previously carried 1.7 mg and vitamin D 20 µg. Both were inherited from older age bands — 1.7 mg is the RDA for men 51 and over, and 20 µg is the RDA for adults 71 and over — so neither described the 19–50 population this file defines. They are now 1.3 mg and 15 µg, per the NIH Office of Dietary Supplements fact sheets for [vitamin B6](https://ods.od.nih.gov/factsheets/VitaminB6-HealthProfessional/) and [vitamin D](https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/). Published percentages for those two nutrients rose accordingly on both food and recipe pages.

---

## Where these live in code

`src/utils/nutrientReference.mjs` is the single definition, carrying the value, basis, upper limit and the limit's applicability. `ADULT_REFERENCE_INTAKE` is derived from it for callers that only need the daily number, and both `NutritionTable` (per 100 g) and `RecipeNutrition` (per serving) read it, so one reference population governs every percentage the site publishes.

## NDC-ready infrastructure

`completeNutrientDataset(result)` in `src/utils/recipeNutritionCalculate.mjs` is the stable, complete calculation interface intended for a future Nutrient Daily Calculator. **No NDC component exists in this repository yet**; this is the surface one would build on, not evidence of one.

It returns every validated quantitative nutrient for a serving, regardless of the thresholds that govern public display, each with its reference basis and its percentage where a target exists. Nutrients with no recognised target return a null percentage rather than an invented one, nutrients the sources cannot establish are absent rather than zero, and the amounts are the full-precision stored values — public rounding is applied at render time and never written back.
