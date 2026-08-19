---
id: food-composition-interpretation-register
title: The Food Composition Interpretation Register (FCIR)
sidebar_label: Food Composition Interpretation Register
description: Public register of BRAIN Diet food-composition interpretation decisions, including 18:3 / ALA identity, substituted sources, and the food and recipe rows they affect.
tags:
  - Area
sidebar_position: 1
list_image: /img/icons/training.svg
---

# The Food Composition Interpretation Register (FCIR)

Nuts and seeds are central to the BRAIN Diet. They provide fibre, protein, minerals and a wide range of beneficial fats, including the essential omega‑3 and omega‑6 fatty acids that the body cannot make for itself. Understanding the balance between these fats can help us describe foods and dietary patterns more accurately—although there is no single ideal ratio that applies to every person or meal.

Finding reliable figures is not always straightforward. Some food-composition databases and research papers group different fatty acids under the shorthand **18:3**, meaning that they contain 18 carbon atoms and three double bonds. This description does not tell us which omega family they belong to. **Alpha-linolenic acid (ALA; 18:3 n‑3)** is an omega‑3, while **gamma-linolenic acid (GLA; 18:3 n‑6)** is an omega‑6. When a source reports only total 18:3, it may not provide enough information to calculate the food’s omega‑3 and omega‑6 content accurately.

The BRAIN Diet therefore checks the identity behind these figures rather than automatically treating every 18:3 value as ALA. We compare food-composition records with analytical studies that identify the fatty-acid form, species, food material and preparation state. Where the evidence supports an interpretation, we explain how it was reached. Where it does not, we leave the value unresolved rather than presenting a more precise answer than the evidence allows.

This work is being developed with input from our team, including **Larry Callahan, an experienced FDA chemist who led work on ISO 11238, the international substance-identification standard that helped underpin the Global Substance Registration System**. His scientific provenance lead on this register is **pending formal acceptance**. This register is a BRAIN Diet project. It is not an FDA or USDA project. We intend to use it to improve our own data, make our decisions transparent and support future dialogue with substance and food-data specialists. It records current interpretations rather than claiming that every underlying database ambiguity has already been resolved.

This register records food-composition questions that require interpretation beyond copying a single database value. **Resolved** means the current public treatment is adequately supported; it does not imply that composition is identical across every cultivar, product or preparation.

Each case uses the same three labels: **Decision**, **Action**, and **Source**. Decision is what we concluded. Action is what the public pages and calculations now do. Source is every record or paper used for that conclusion, not a later paraphrase.

Food and recipe links go to the published composition row or the recipe nutrient row that consumes it. Food pages carry only a short pointer to the relevant case. The register is the canonical explanation. Where a value is deliberately unpublished, the link goes to the food’s nutrient tables rather than to a number that is not on the page.

<!-- fcir-generated:start -->

## Register

<div className="fcir-register">

| Case | Food or scope | What created the problem | Current interpretation and public treatment | Evidence required or used | Status |
| --- | --- | --- | --- | --- | --- |
| **[FCIR-001](#fcir-001)** | Site-wide ALA mapping | The amino acid **alanine** was mapped to the field intended for alpha-linolenic acid because both can be abbreviated “Ala/ALA.” The false value then entered recipe calculations and omega‑3 totals. | **Decision:** Alanine, beta-alanine and phenylalanine are amino acids and are excluded categorically from ALA and lipid resolution. **Action:** ALA now requires explicit alpha-linolenic or 18:3 n‑3 identity. Affected food and recipe values are regenerated from corrected source fields. | **Source:** USDA nutrient identifiers (1404 = 18:3 n‑3; amino-acid fields are not fatty acids); repository nutrient-identity audit; extraction and recipe regression fixtures. | **Resolved** |
| **[FCIR-002](#fcir-002)** | Generic 18:3 fatty-acid records | Some legacy records report only total **18:3**, without distinguishing omega‑3 ALA from omega‑6 GLA or other isomers. | **Decision:** Generic 18:3 remains unresolved and cannot enter ALA or identified omega‑3 totals. **Action:** Extraction stores USDA nutrient 1270 as unresolved 18:3 and never writes ALA from it. Exact-food analytical evidence may later provide a documented isomer interpretation on a named food page. | **Source:** USDA nutrient 1270 metadata; [Golimowski et al. 2022](/docs/papers/BRAIN-Diet-References#golimowski_hemp_oil_2022); [Goldschmidt and Byrdwell 2021](/docs/papers/BRAIN-Diet-References#goldschmidt_conjugated_18_3_2021). | **Active rule** |
| **[FCIR-003](#fcir-003)** | [Flax seeds](/docs/foods/flax-seeds#nutrition-row-ala_interpreted) | USDA SR Legacy reports 22,813 mg of unqualified 18:3 per 100 g, while the public page requires a chemically identified ALA value. | **Decision:** Publish **22.8 g alpha-linolenic acid per 100 g** as a combined-provenance interpretation, not as a single ALA assay. **Action:** The asterisked [ALA row](/docs/foods/flax-seeds#nutrition-row-ala_interpreted) and [source note](/docs/foods/flax-seeds#nutrition-note-ala_interpreted) carry the figure; recipes consume 22,813 mg/100 g internally without duplicating the gram row. | **Source:** Quantity: [FDC 169414](https://fdc.nal.usda.gov/food-details/169414/nutrients), *Seeds, flaxseed*, nutrient 1270 = 22,813 mg/100 g. Identity: [FDC 2262075](https://fdc.nal.usda.gov/food-details/2262075/nutrients), *Flaxseed, ground*, nutrient 1404 = 19.42 g/100 g, ALA 57.2% of fatty acids against 57.1% in 169414. Identity (literature): [Ribeiro et al. 2013](/docs/papers/BRAIN-Diet-References#ribeiro_flax_fatty_acids_2013) names alpha-linolenic acid in whole flax seeds; [Gómez-Cortés et al. 2016](/docs/papers/BRAIN-Diet-References#gomez_cortes_linseed_ala_isomers_2016) runs authentic n‑3 and n‑6 standards on linseed oil and finds only a trace of 18:3 n‑6. | **Resolved** |
| **[FCIR-004](#fcir-004)** | [Walnuts](/docs/foods/walnuts#nutrition-row-ala_interpreted) | USDA reports a large generic 18:3 value but does not identify the omega position in that record. | **Decision:** Walnut-specific GC studies identify the 18:3 as ALA; USDA supplies the whole-kernel quantity. **Action:** Publish **9.08 g ALA per 100 g*** on the [ALA row](/docs/foods/walnuts#nutrition-row-ala_interpreted). Do not treat Foundation FDC 2346394 as identity (no nutrient 1404) and do not derive the gram figure from oil × fraction arithmetic. | **Source:** Quantity: [FDC 170187](https://fdc.nal.usda.gov/food-details/170187/nutrients), *Nuts, walnuts, english*, nutrient 1270 = 9,080 mg/100 g. Identity: [Kafkas et al. 2017](/docs/papers/BRAIN-Diet-References#kafkas_walnut_fatty_acids_2017) names alpha-linolenic acid across ten *Juglans regia* cultivars (9.50–13.26% of fatty acids) against a 37-component FAME standard; [Yoshinaga-Kiriake et al. 2022](/docs/papers/BRAIN-Diet-References#yoshinaga_kiriake_walnut_oil_2022) names α-linolenic acid (C18:3n3) against the same standard, which carries n‑3 and n‑6 as distinct components. Rejected for identity: [FDC 2346394](https://fdc.nal.usda.gov/food-details/2346394/nutrients) (fatty-acid totals only; no nutrient 1404). | **Resolved** |
| **[FCIR-005](#fcir-005)** | Hemp seeds (reference case; no hemp food page yet) | Hemp can contain both ALA and GLA, demonstrating why generic 18:3 cannot safely be assigned to one omega family. | **Decision:** Hemp 18:3 is a mixture, not a synonym for ALA. **Action:** Require separately identified ALA and GLA values. Never apply the flax interpretation to hemp. | **Source:** [Golimowski et al. 2022](/docs/papers/BRAIN-Diet-References#golimowski_hemp_oil_2022) (Finola and other cultivars report 18:3 n‑3 and 18:3 n‑6 in adjacent rows). | **Reference case** |
| **[FCIR-006](#fcir-006)** | [Ghee](/docs/foods/ghee#nutrition-tables) | The cited record contains unqualified 18:3, while animal diet, processing and minor isomers can affect the lipid profile. | **Decision:** Ruminant 18:3 is not a single isomer. **Action:** Do not publish ALA or include 1,447 mg in identified omega‑3. The milligrams stay internal and unpublished. | **Source:** [USDA SR Legacy FDC 173412](https://fdc.nal.usda.gov/food-details/173412/nutrients) nutrient 1270 only; contrast [butter FDC 173430](https://fdc.nal.usda.gov/food-details/173430/nutrients), which reports nutrient 1404 (0.315 g ALA) beside a larger unqualified 1270 figure. | **Under review** |
| **[FCIR-007](#fcir-007)** | [Soy](/docs/foods/soy#nutrition-row-ala_interpreted) | “Soy” can refer to whole beans, cooked beans, flour, lecithin or oil, each with a different composition basis. | **Decision:** Resolve the exact food form first. Oil fatty-acid percentages cannot be transferred as oil grams onto whole soy. **Action:** For mature raw soybeans, publish **1.33 g ALA per 100 g*** from this seed record’s 18:3 milligrams, with isomer identity from USDA soybean oil nutrient 1404. The oil’s 6.789 g/100 g is not copied onto the seed page. | **Source:** Quantity: [FDC 174270](https://fdc.nal.usda.gov/food-details/174270/nutrients), *Soybeans, mature seeds, raw*, nutrient 1270 = 1,330 mg (6.7% of 19.94 g fat). Identity: [FDC 171411](https://fdc.nal.usda.gov/food-details/171411/nutrients), *Oil, soybean, salad or cooking*, nutrient 1404 = 6.789 g/100 g and nutrient 1321 (GLA) = 0. The oil’s ALA share is 6.8% of fat — USDA agreeing with itself on proportion, not a transferred quantity. | **Resolved** |
| **[FCIR-008](#fcir-008)** | [Avocado oil](/docs/foods/avocado-oil#nutrition-tables) | A generic 18:3 value does not state its isomer, and composition varies with cultivar, extraction and refining. | **Decision:** “Linolenic (C18:3)” does not identify n‑3 versus n‑6. **Action:** Retain unresolved 18:3; do not publish ALA. Avocado fruit is a different food and is not used as a proxy quantity. | **Source:** Quantity: [FDC 173573](https://fdc.nal.usda.gov/food-details/173573/nutrients), *Oil, avocado*, nutrient 1270. Identity attempted: [Fernandes et al. 2018](/docs/papers/BRAIN-Diet-References#fernandes_avocado_oil_2018) — wording rejected for isomer resolution. Not transferred: avocado fruit [FDC 171705](https://fdc.nal.usda.gov/food-details/171705/nutrients) nutrient 1404 = 0.111 g and 1321 = 0.015 g. | **Under review** |
| **[FCIR-009](#fcir-009)** | [Salmon roe](/docs/foods/salmon-roe#nutrition-row-epa_mg) and [Neuroeshot](/docs/recipes/Snacks/neuroeshot-roe#nutrition-row-epa_mg) | Roe’s USDA alanine value was stored as ALA and entered the recipe as 214.2 mg of false omega‑3. | **Decision:** ALA is suppressed. EPA and DHA remain because their identities and quantities are explicit. **Action:** Identified omega‑3 totals include only verified n‑3 components. The leftover 6 mg of unqualified 18:3 stays unpublished. | **Source:** [FDC 175132](https://fdc.nal.usda.gov/food-details/175132/nutrients), *Fish, roe, mixed species, raw*: nutrient 1278 (EPA), 1272 (DHA). Unqualified 18:3 nutrient 1270 = 6 mg, unpublished. Recipe: [Neuroeshot](/docs/recipes/Snacks/neuroeshot-roe#recipe-nutrition) scales 15 g of that record. | **Resolved** |
| **[FCIR-010](#fcir-010)** | Total omega‑3 | Some totals included corrupted ALA, unresolved 18:3, or were labelled “total” while representing only EPA + DHA. | **Decision:** Distinguish individual fatty acids, **EPA + DHA**, and **total explicitly identified omega‑3**. **Action:** Every published total must name its components and equal their sum. Unresolved 18:3 never enters the total. | **Source:** Food-page `omega3_components` lists. USDA n‑3 identifiers 1404, 1278, 1280, 1272, 1405, 1407. Recipe calculation audit: identified omega‑3 is summed only from those components. | **Resolved as rule** |
| **[FCIR-011](#fcir-011)** | [Sunflower lecithin](/docs/foods/sunflower-lecithin#nutrition-row-phosphatidylcholine_qual) | Sunflower oil was previously used as a substitute record. Native, de-oiled and fractionated lecithins have materially different phospholipid and PC contents. | **Decision:** Lecithin is the phospholipid fraction, not the oil. **Action:** Keep the page qualitative until the documented form is declared. Phosphatidylcholine and choline are presence-only. Derived PC-bound choline must not be called directly assayed total choline. | **Source:** Withdrawn: [FDC 1750349](https://fdc.nal.usda.gov/food-details/1750349/nutrients), *Oil, sunflower* (including its ALA, EPA and DHA). Retained as lecithin-identity evidence, not as a quantity: [Penci et al. 2010](/docs/papers/BRAIN-Diet-References#penci_lecithin_hydrolysis_2010). | **Provisionally resolved** |
| **[FCIR-012](#fcir-012)** | [MCT oil](/docs/foods/mct-oil#nutrition-row-kcal) | A canola-oil record had been used for a chemically different formulated oil. | **Decision:** Canola composition is withdrawn. **Action:** Use a named MCT formulation stating energy and total fat, with formulation limitations. Individual C8/C10 milligrams are not published as if they were a universal MCT oil. | **Source:** Current: [FDC 2543941](https://fdc.nal.usda.gov/food-details/2543941/nutrients), MCT Premium C8 & C10, declared 60% C8 / 40% C10; 833 kcal and 100 g fat per 100 g. Withdrawn: [FDC 748278](https://fdc.nal.usda.gov/food-details/748278/nutrients), *Oil, canola* (saturated fat 6.61 g; ALA 7,450 mg). Class definition: Australia New Zealand Food Standards Code, medium-chain triglycerides as triacylglycerols predominantly 8:0 and 10:0. | **Resolved for named specification** |
| **[FCIR-013](#fcir-013)** | [Algal oil](/docs/foods/algal-oil#nutrition-authorised-specifications) | A canola record had previously been used where USDA had no exact algal-oil composition. DHA-rich and combined DHA/EPA oils are distinct formulations. | **Decision:** Use authorised product specifications and label-dose context, not a substitute oil. **Action:** DHA leads the page; EPA is formulation-specific and not assumed universally present. | **Source:** [Commission Implementing Regulation (EU) 2017/2470](/docs/papers/BRAIN-Diet-References#eu_2017_2470_union_list) (consolidated 25 September 2024). [NIH omega‑3 consumer fact sheet](/docs/papers/BRAIN-Diet-References#nih_omega3_factsheet_consumer). Absorption context: [Arterburn et al. 2008](/docs/papers/BRAIN-Diet-References#arterburn_algal_2008). | **Resolved** |
| **[FCIR-014](#fcir-014)** | [Reishi mushroom](/docs/foods/reishi-mushroom#nutrition-row-polysaccharides_qual) | The page cited a beech-mushroom record for a different species. Fruiting body, mycelium, powder and extract are also compositionally distinct. | **Decision:** A mismatch invalidates the entire derived panel. **Action:** Withdraw the beech-derived panel. Restore only exact-species, exact-material analytical rows. Polysaccharides remain qualitative. | **Source:** Withdrawn: [FDC 2003603](https://fdc.nal.usda.gov/food-details/2003603/nutrients), *Mushroom, beech*. USDA SR Legacy has no reishi record. Replacement must be *Ganoderma* analytical literature with material and dry/fresh basis stated. | **Source withdrawn; research active** |
| **[FCIR-015](#fcir-015)** | [Turkey tail mushroom](/docs/foods/turkey-tail-mushroom#nutrition-row-beta_glucans_qual) | The page cited a beech-mushroom record for a different species. | **Decision:** *Trametes versicolor* is not beech mushroom, and a culinary per-100 g panel would misdescribe a woody bracket fungus even if the species matched. **Action:** Withdraw the substituted panel. Beta-glucans and polysaccharides remain qualitative. | **Source:** Withdrawn: [FDC 2003603](https://fdc.nal.usda.gov/food-details/2003603/nutrients), *Mushroom, beech*. Replacement must be exact-species analytical literature distinguishing fruiting body, mycelium and extract. | **Source withdrawn; research active** |
| **[FCIR-016](#fcir-016)** | [Cordyceps](/docs/foods/cordyceps-mushroom#nutrition-row-polysaccharides_qual) | A related mushroom record could not establish Cordyceps composition, and commercial products may represent different species or cultured mycelia. | **Decision:** Keep quantitative composition withdrawn until species and material are declared. **Action:** Polysaccharides remain qualitative. Do not reuse the beech panel. | **Source:** Withdrawn: [FDC 2003603](https://fdc.nal.usda.gov/food-details/2003603/nutrients), *Mushroom, beech*. Replacement requires named species and named fruiting-body, mycelium or product analysis. | **Source withdrawn; research active** |
| **[FCIR-017](#fcir-017)** | Related-food substitution | Some apparently authoritative records described a related ingredient rather than the food on the page. | **Decision:** A source must match food or product, species, edible material, preparation state and formulation. **Action:** A mismatch invalidates the entire derived panel, not only the nutrient that exposed it. | **Source:** Worked examples: MCT oil vs canola (FCIR-012); sunflower lecithin vs sunflower oil (FCIR-011); reishi, turkey tail and cordyceps vs beech mushroom (FCIR-014–FCIR-016). Document the rejected record on the food page. | **Resolved as rule** |
| **[FCIR-018](#fcir-018)** | [Tofu](/docs/foods/tofu#nutrition-row-ala_interpreted), [natto](/docs/foods/natto#nutrition-row-ala_interpreted), [miso](/docs/foods/miso#nutrition-row-ala_interpreted), [tempeh](/docs/foods/tempeh#nutrition-row-ala_interpreted) | Each food’s USDA record reports unqualified 18:3. Oil grams must not be copied onto these foods. | **Decision:** Same isomer identity as soy oil nutrient 1404; quantity remains each food’s own 1270 milligrams. **Action:** Publish asterisked ALA rows: tofu 0.582 g, natto 0.734 g, miso 0.405 g, tempeh 0.248 g per 100 g. Tempeh’s fat share does not match the oil’s ~6.8% and that difference is left standing. | **Source:** Tofu [FDC 172475](https://fdc.nal.usda.gov/food-details/172475/nutrients) 582 mg; natto [FDC 172443](https://fdc.nal.usda.gov/food-details/172443/nutrients) 734 mg; miso [FDC 172442](https://fdc.nal.usda.gov/food-details/172442/nutrients) 405 mg; tempeh [FDC 174272](https://fdc.nal.usda.gov/food-details/174272/nutrients) 248 mg — all nutrient 1270. Identity: soybean oil [FDC 171411](https://fdc.nal.usda.gov/food-details/171411/nutrients) nutrient 1404. | **Resolved** |
| **[FCIR-019](#fcir-019)** | [Spirulina](/docs/foods/spirulina#nutrition-tables) | USDA reports 823 mg of unqualified 18:3. Cyanobacterial 18:3 is the inverse flax case. | **Decision:** Do not interpret spirulina 18:3 as ALA. **Action:** Leave the milligrams unresolved and unpublished. Do not publish them as GLA either, because this record does not name the isomer. | **Source:** [FDC 170495](https://fdc.nal.usda.gov/food-details/170495/nutrients), *Seaweed, spirulina, dried*, nutrient 1270 = 823 mg; no 1404 or 1321. Page limitations note records the inverse-flax reading. | **Reference case** |
| **[FCIR-020](#fcir-020)** | [Chia seeds](/docs/foods/chia-seeds#nutrition-row-ala_mg) | Chia is an ALA-rich seed, but the site still requires an explicit n‑3 identifier rather than an assumed 18:3. | **Decision:** This record already names 18:3 n‑3. **Action:** Publish ALA from USDA nutrient 1404 at 17,830 mg/100 g. No combined-provenance overlay is required. | **Source:** [FDC 170554](https://fdc.nal.usda.gov/food-details/170554/nutrients), *Seeds, chia seeds, dried*, nutrient 1404. | **Resolved** |

</div>

### Status meanings

- **Resolved:** sufficient evidence supports the current public treatment.
- **Provisionally resolved:** treatment is defensible but remains formulation- or evidence-dependent.
- **Under review:** no public specific value should be inferred yet.
- **Source withdrawn; research active:** an invalid source has been removed and replacement evidence is being sought.
- **Active rule:** a standing identity rule, not a single-food value.
- **Resolved as rule:** a standing identity rule, not a single-food value.
- **Reference case:** retained because it demonstrates an important interpretation rule.
- **Resolved for named specification:** sufficient evidence supports the current public treatment for the named specification.

### Editorial ownership

**Scientific provenance lead:** pending formal acceptance by Larry Callahan
**Review cycle:** every material source change and at least annually
**Last substantive review:** August 2026

This register is a BRAIN Diet project. It is not an FDA or USDA project.

## Case records

Each case repeats the same three labels so Decision, Action and Source can be read in parallel.

### FCIR-001 — Site-wide ALA mapping {#fcir-001}


| Decision | Action | Source |
| --- | --- | --- |
| Alanine, beta-alanine and phenylalanine are amino acids and are excluded categorically from ALA and lipid resolution. | ALA now requires explicit alpha-linolenic or 18:3 n‑3 identity. Affected food and recipe values are regenerated from corrected source fields. | USDA nutrient identifiers (1404 = 18:3 n‑3; amino-acid fields are not fatty acids); repository nutrient-identity audit; extraction and recipe regression fixtures. |

### FCIR-002 — Generic 18:3 fatty-acid records {#fcir-002}


| Decision | Action | Source |
| --- | --- | --- |
| Generic 18:3 remains unresolved and cannot enter ALA or identified omega‑3 totals. | Extraction stores USDA nutrient 1270 as unresolved 18:3 and never writes ALA from it. Exact-food analytical evidence may later provide a documented isomer interpretation on a named food page. | USDA nutrient 1270 metadata; [Golimowski et al. 2022](/docs/papers/BRAIN-Diet-References#golimowski_hemp_oil_2022); [Goldschmidt and Byrdwell 2021](/docs/papers/BRAIN-Diet-References#goldschmidt_conjugated_18_3_2021). |

### FCIR-003 — Flax seeds {#fcir-003}

Public row: `ala_interpreted` on the food page.

Recipes using this interpretation: [Ginger Yogurt and Blueberries](/docs/recipes/Breakfast/ginger-yogurt-blueberry-bowl#nutrition-row-ala_mg)

| Decision | Action | Source |
| --- | --- | --- |
| The published 22.8 g is USDA’s whole-seed 18:3 milligrams interpreted as ALA. Quantity and isomer identity come from complementary sources, not from one assay. | Publish the asterisked 22.8 g row. Store 22,813 mg internally for recipes. Do not publish Foundation 19.42 g (ground seed, different fat) and do not convert an oil percentage into grams of seed. | Quantity: [FDC 169414](https://fdc.nal.usda.gov/food-details/169414/nutrients), *Seeds, flaxseed*, nutrient 1270 = 22,813 mg/100 g. Identity: [FDC 2262075](https://fdc.nal.usda.gov/food-details/2262075/nutrients), *Flaxseed, ground*, nutrient 1404 = 19.42 g/100 g, ALA 57.2% of fatty acids against 57.1% in 169414. Identity (literature): [Ribeiro et al. 2013](/docs/papers/BRAIN-Diet-References#ribeiro_flax_fatty_acids_2013) names alpha-linolenic acid in whole flax seeds; [Gómez-Cortés et al. 2016](/docs/papers/BRAIN-Diet-References#gomez_cortes_linseed_ala_isomers_2016) runs authentic n‑3 and n‑6 standards on linseed oil and finds only a trace of 18:3 n‑6. |

### FCIR-004 — Walnuts {#fcir-004}

Public row: `ala_interpreted` on the food page.

Recipes using this interpretation: [Ginger Yogurt and Blueberries](/docs/recipes/Breakfast/ginger-yogurt-blueberry-bowl#nutrition-row-ala_mg); [Mitochondrial Power Bowl](/docs/recipes/Lunch/mitochondrial-power-bowl#nutrition-row-ala_mg); [Rocket Lentil Avocado Midday Salad](/docs/recipes/Lunch/rocket-lentil-midday-salad#nutrition-row-ala_mg)

| Decision | Action | Source |
| --- | --- | --- |
| Walnut-kernel 18:3 is identified as ALA by named GC studies. USDA’s 9,080 mg is the quantity for this page. | Publish 9.08 g ALA*. Do not wait on Foundation 1404 (absent). Do not substitute Yoshinaga-Kiriake’s derived milligrams for USDA’s kernel quantity. | Quantity: [FDC 170187](https://fdc.nal.usda.gov/food-details/170187/nutrients), *Nuts, walnuts, english*, nutrient 1270 = 9,080 mg/100 g. Identity: [Kafkas et al. 2017](/docs/papers/BRAIN-Diet-References#kafkas_walnut_fatty_acids_2017) names alpha-linolenic acid across ten *Juglans regia* cultivars (9.50–13.26% of fatty acids) against a 37-component FAME standard; [Yoshinaga-Kiriake et al. 2022](/docs/papers/BRAIN-Diet-References#yoshinaga_kiriake_walnut_oil_2022) names α-linolenic acid (C18:3n3) against the same standard, which carries n‑3 and n‑6 as distinct components. Rejected for identity: [FDC 2346394](https://fdc.nal.usda.gov/food-details/2346394/nutrients) (fatty-acid totals only; no nutrient 1404). |

### FCIR-005 — Hemp seeds {#fcir-005}


| Decision | Action | Source |
| --- | --- | --- |
| Hemp 18:3 is a mixture, not a synonym for ALA. | Require separately identified ALA and GLA values. Never apply the flax interpretation to hemp. | [Golimowski et al. 2022](/docs/papers/BRAIN-Diet-References#golimowski_hemp_oil_2022) (Finola and other cultivars report 18:3 n‑3 and 18:3 n‑6 in adjacent rows). |

### FCIR-006 — Ghee {#fcir-006}


| Decision | Action | Source |
| --- | --- | --- |
| Ruminant 18:3 is not a single isomer. | Do not publish ALA or include 1,447 mg in identified omega‑3. The milligrams stay internal and unpublished. | [USDA SR Legacy FDC 173412](https://fdc.nal.usda.gov/food-details/173412/nutrients) nutrient 1270 only; contrast [butter FDC 173430](https://fdc.nal.usda.gov/food-details/173430/nutrients), which reports nutrient 1404 (0.315 g ALA) beside a larger unqualified 1270 figure. |

### FCIR-007 — Soy {#fcir-007}

Public row: `ala_interpreted` on the food page.

| Decision | Action | Source |
| --- | --- | --- |
| Mature raw soybeans are the food on this page. Soybean oil is a different food and may supply isomer identity, not oil grams. | Publish 1.33 g ALA* from this seed record. Do not copy the oil’s 6.789 g/100 g onto soy, tofu, natto, miso or tempeh. | Quantity: [FDC 174270](https://fdc.nal.usda.gov/food-details/174270/nutrients), *Soybeans, mature seeds, raw*, nutrient 1270 = 1,330 mg (6.7% of 19.94 g fat). Identity: [FDC 171411](https://fdc.nal.usda.gov/food-details/171411/nutrients), *Oil, soybean, salad or cooking*, nutrient 1404 = 6.789 g/100 g and nutrient 1321 (GLA) = 0. The oil’s ALA share is 6.8% of fat — USDA agreeing with itself on proportion, not a transferred quantity. |

### FCIR-008 — Avocado oil {#fcir-008}


| Decision | Action | Source |
| --- | --- | --- |
| Fernandes’ “linolenic (C18:3)” does not resolve n‑3 versus n‑6. Cultivar and refining change the oil. | Keep 957 mg unresolved. Do not publish ALA. Do not copy avocado-fruit 1404/1321 quantities onto the oil. | Quantity: [FDC 173573](https://fdc.nal.usda.gov/food-details/173573/nutrients), *Oil, avocado*, nutrient 1270. Identity attempted: [Fernandes et al. 2018](/docs/papers/BRAIN-Diet-References#fernandes_avocado_oil_2018) — wording rejected for isomer resolution. Not transferred: avocado fruit [FDC 171705](https://fdc.nal.usda.gov/food-details/171705/nutrients) nutrient 1404 = 0.111 g and 1321 = 0.015 g. |

### FCIR-009 — Salmon roe and Neuroeshot {#fcir-009}


Recipes using this interpretation: [Neuroeshot](/docs/recipes/Snacks/neuroeshot-roe#nutrition-row-epa_mg)

| Decision | Action | Source |
| --- | --- | --- |
| The previous ALA figure was alanine. EPA and DHA on this record are explicit n‑3 acids. | Suppress ALA. Keep EPA 983 mg and DHA 1,363 mg per 100 g. Identified omega‑3 is the sum of verified n‑3 components only. | [FDC 175132](https://fdc.nal.usda.gov/food-details/175132/nutrients), *Fish, roe, mixed species, raw*: nutrient 1278 (EPA), 1272 (DHA). Unqualified 18:3 nutrient 1270 = 6 mg, unpublished. Recipe: [Neuroeshot](/docs/recipes/Snacks/neuroeshot-roe#recipe-nutrition) scales 15 g of that record. |

### FCIR-010 — Total omega‑3 {#fcir-010}


| Decision | Action | Source |
| --- | --- | --- |
| “Total omega‑3” is not a synonym for EPA + DHA, and it is not a place to park unresolved 18:3 or amino acids. | Publish individual acids, the named pair EPA + DHA where that pair is the claim, and a total only when every component is identified and the total equals their sum. | Food-page `omega3_components` lists. USDA n‑3 identifiers 1404, 1278, 1280, 1272, 1405, 1407. Recipe calculation audit: identified omega‑3 is summed only from those components. |

### FCIR-011 — Sunflower lecithin {#fcir-011}

Public row: `phosphatidylcholine_qual` on the food page.

| Decision | Action | Source |
| --- | --- | --- |
| Sunflower oil is the triglyceride stream after phospholipids have been removed. It cannot describe lecithin. | Withdraw the oil panel. Keep phosphatidylcholine and choline as presence-only until a named native or de-oiled specification is declared. Do not call a derived choline moiety a measured total choline. | Withdrawn: [FDC 1750349](https://fdc.nal.usda.gov/food-details/1750349/nutrients), *Oil, sunflower* (including its ALA, EPA and DHA). Retained as lecithin-identity evidence, not as a quantity: [Penci et al. 2010](/docs/papers/BRAIN-Diet-References#penci_lecithin_hydrolysis_2010). |

### FCIR-012 — MCT oil {#fcir-012}


| Decision | Action | Source |
| --- | --- | --- |
| Canola is a long-chain seed oil. MCT oil is a formulated C8/C10 triglyceride product. | Withdraw canola. Publish energy and fat from a named specification, with the C8:C10 ratio treated as formulation-specific. | Current: [FDC 2543941](https://fdc.nal.usda.gov/food-details/2543941/nutrients), MCT Premium C8 & C10, declared 60% C8 / 40% C10; 833 kcal and 100 g fat per 100 g. Withdrawn: [FDC 748278](https://fdc.nal.usda.gov/food-details/748278/nutrients), *Oil, canola* (saturated fat 6.61 g; ALA 7,450 mg). Class definition: Australia New Zealand Food Standards Code, medium-chain triglycerides as triacylglycerols predominantly 8:0 and 10:0. |

### FCIR-013 — Algal oil {#fcir-013}


| Decision | Action | Source |
| --- | --- | --- |
| There is no USDA SR Legacy algal-oil food. Canola, fish oil and other oils are not proxies. DHA-rich and DHA/EPA oils are different authorised formulations. | Publish regulatory specification rows, not a substitute composition panel. DHA leads; EPA is shown only where the combined formulation specifies it. Per-serving milligrams come from the product label. | [Commission Implementing Regulation (EU) 2017/2470](/docs/papers/BRAIN-Diet-References#eu_2017_2470_union_list) (consolidated 25 September 2024). [NIH omega‑3 consumer fact sheet](/docs/papers/BRAIN-Diet-References#nih_omega3_factsheet_consumer). Absorption context: [Arterburn et al. 2008](/docs/papers/BRAIN-Diet-References#arterburn_algal_2008). |

### FCIR-014 — Reishi mushroom {#fcir-014}

Public row: `polysaccharides_qual` on the food page.

| Decision | Action | Source |
| --- | --- | --- |
| Beech mushroom is a different species from *Ganoderma lucidum*. No value taken from that record was a measurement of reishi. | Withdraw the complete beech-derived panel. Keep polysaccharides qualitative until exact-species, exact-material evidence is attached. | Withdrawn: [FDC 2003603](https://fdc.nal.usda.gov/food-details/2003603/nutrients), *Mushroom, beech*. USDA SR Legacy has no reishi record. Replacement must be *Ganoderma* analytical literature with material and dry/fresh basis stated. |

### FCIR-015 — Turkey tail mushroom {#fcir-015}

Public row: `beta_glucans_qual` on the food page.

| Decision | Action | Source |
| --- | --- | --- |
| *Trametes versicolor* is not beech mushroom. A culinary edible-portion panel would also misdescribe a woody bracket fungus. | Withdraw the substituted panel. Keep beta-glucans and polysaccharides qualitative. | Withdrawn: [FDC 2003603](https://fdc.nal.usda.gov/food-details/2003603/nutrients), *Mushroom, beech*. Replacement must be exact-species analytical literature distinguishing fruiting body, mycelium and extract. |

### FCIR-016 — Cordyceps {#fcir-016}

Public row: `polysaccharides_qual` on the food page.

| Decision | Action | Source |
| --- | --- | --- |
| The beech record cannot establish Cordyceps. Commercial products may be *C. militaris* stroma or cultured mycelium. | Keep quantitative composition withdrawn. Keep polysaccharides qualitative until species and material are declared and matched. | Withdrawn: [FDC 2003603](https://fdc.nal.usda.gov/food-details/2003603/nutrients), *Mushroom, beech*. Replacement requires named species and named fruiting-body, mycelium or product analysis. |

### FCIR-017 — Related-food substitution {#fcir-017}


| Decision | Action | Source |
| --- | --- | --- |
| An authoritative identifier is not enough if it describes a related ingredient. | Match food or product, species, edible material, preparation state and formulation. On mismatch, withdraw the whole panel. | Worked examples: MCT oil vs canola (FCIR-012); sunflower lecithin vs sunflower oil (FCIR-011); reishi, turkey tail and cordyceps vs beech mushroom (FCIR-014–FCIR-016). Document the rejected record on the food page. |

### FCIR-018 — Tofu, natto, miso and tempeh {#fcir-018}

Public row: `ala_interpreted` on the food page.

| Decision | Action | Source |
| --- | --- | --- |
| Each food keeps its own USDA 18:3 milligrams. Isomer identity is taken from USDA soybean oil 1404, not from oil grams. | Publish the asterisked ALA rows. Leave tempeh’s lower fat share (~2.3% vs ~6.8% in the oil) standing; do not “correct” it toward the oil. | Tofu [FDC 172475](https://fdc.nal.usda.gov/food-details/172475/nutrients) 582 mg; natto [FDC 172443](https://fdc.nal.usda.gov/food-details/172443/nutrients) 734 mg; miso [FDC 172442](https://fdc.nal.usda.gov/food-details/172442/nutrients) 405 mg; tempeh [FDC 174272](https://fdc.nal.usda.gov/food-details/174272/nutrients) 248 mg — all nutrient 1270. Identity: soybean oil [FDC 171411](https://fdc.nal.usda.gov/food-details/171411/nutrients) nutrient 1404. |

### FCIR-019 — Spirulina {#fcir-019}


| Decision | Action | Source |
| --- | --- | --- |
| Cyanobacterial 18:3 is predominantly GLA, the inverse of flax. Treating 823 mg as ALA would invert the omega family. | Do not publish ALA. Do not publish GLA from this record either, because the record does not name the isomer. | [FDC 170495](https://fdc.nal.usda.gov/food-details/170495/nutrients), *Seaweed, spirulina, dried*, nutrient 1270 = 823 mg; no 1404 or 1321. Page limitations note records the inverse-flax reading. |

### FCIR-020 — Chia seeds {#fcir-020}

Public row: `ala_mg` on the food page.

Recipes using this interpretation: [Ginger Yogurt and Blueberries](/docs/recipes/Breakfast/ginger-yogurt-blueberry-bowl#nutrition-row-ala_mg); [Matcha Mitochondria Smoothie](/docs/recipes/Breakfast/matcha-mito-smoothie#nutrition-row-ala_mg); [Salmon Bowl-pistachio-cacao-nibs](/docs/recipes/Lunch/ecs-tone-salmon-pistachio-bowl#nutrition-row-ala_mg)

| Decision | Action | Source |
| --- | --- | --- |
| This USDA record already identifies 18:3 n‑3. No overlay is required. | Publish 17,830 mg ALA per 100 g from nutrient 1404. | [FDC 170554](https://fdc.nal.usda.gov/food-details/170554/nutrients), *Seeds, chia seeds, dried*, nutrient 1404. |

<!-- fcir-generated:end -->

## Related pages

- [Dietary Fat and Metabolic Signalling](/docs/dietary-foundations/nutrient-effects/dietary-fat-metabolic-signalling)
- [Foods Index](/docs/foods)
- [ALA (Alpha-Linolenic Acid)](/docs/substances/nutrients/macronutrients/fatty-acids/pufas/omega-3/ala-alpha-linolenic-acid)
- [Omega-3 Fatty Acids](/docs/substances/nutrients/macronutrients/fatty-acids/pufas/omega-3)
