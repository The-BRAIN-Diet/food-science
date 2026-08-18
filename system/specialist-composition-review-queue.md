## Specialist composition review queue

Pages whose quantitative panel has been **withdrawn** because it was derived from a record for a different food. These are not nutrient-level errors. Every published number on these pages — energy, macronutrients, minerals, vitamins — described another organism or another product.

A page leaves this queue only when a source is found whose **species, edible material and processing state all match**. A shared parent ingredient or food category is never sufficient. Until then the page carries qualitative presence only.

Rules: `system/food-nutrition-schema.md`. Nutrient-level identity failures: `system/nutrient-provenance-review-queue.md`.

---

### Withdrawn pages

| Page | Record withdrawn | Identity failure | Values removed |
| --- | --- | --- | --- |
| `sunflower-lecithin` | FDC 1750349, *Oil, sunflower* | Edible material and processing state | `sat_fat_g` 8.991; EPA 2.375 mg; DHA 0 mg; ALA 162.8 mg; total omega‑3 165.175 mg |
| `reishi-mushroom` | FDC 2003603, *Mushroom, beech* | Species | Full 12-value panel: energy, protein, fat, carbohydrate, fibre, calcium, iron, magnesium, potassium, zinc, selenium, vitamin B6; ALA 671 mg |
| `turkey-tail-mushroom` | FDC 2003603, *Mushroom, beech* | Species | The same 12-value panel; ALA 671 mg |
| `cordyceps-mushroom` | FDC 2003603, *Mushroom, beech* | Species | The same 12-value panel; ALA 671 mg |

Three medicinal mushroom pages published one beech mushroom's composition as though it were three different species. Their own supplementary notes said "USDA SR Legacy has no record for this mushroom" while the panel above them displayed one for another fungus.

`lions-mane-mushroom` is **not** in this queue. Its record, FDC 1999626, genuinely describes lion's mane; only its ALA was wrong, taken from the record's phenylalanine.

### Qualitative rows retained, and removed

Retained, because presence follows from what the product **is** rather than from a composition record:

- `sunflower-lecithin` — phosphatidylcholine, choline
- `reishi`, `cordyceps` — fungal polysaccharides
- `turkey-tail` — beta-glucans, polysaccharides

Removed: the `vitamin_b3_qual` row on all three mushroom pages. It asserted presence because the species is "grouped with culinary mushrooms as a niacin-containing fungus" — an inference from food category, which is the same reasoning that produced the substitution in the first place.

---

## Source search

### Protocol

Before any page here may state that no record exists, the search establishing it must be reproducible: common name, scientific name, accepted taxonomic synonyms, product form and preparation state, across **all** FoodData Central data types — Foundation, SR Legacy, Survey (FNDDS), Branded and Experimental.

Terms are declared in `scripts/fdc-synonym-search.mjs`; results are written to `scripts/data/fdc-synonym-search.json`.

Where FoodData Central holds nothing, the order of search is CoFID (UK), Frida (Denmark), the Australian food composition database, and the Standard Tables of Food Composition in Japan, before analytical literature. For formulated products — MCT oil and lecithin both qualify — an authorised or manufacturer specification may outrank a general composition database, because the product is defined by its specification.

### Status

**Complete.** All five data types have been searched through the API under a project key, 85 searches in total, with no rate-limit errors: every "no record" below means the API answered and returned nothing. Results are in `scripts/data/fdc-synonym-search.json`; candidate records fetched for inspection are cached under `scripts/data/fdc-candidates/`.

The search returns thousands of fuzzy matches, so a candidate counts only where the description names the target food. On that test:

| Page | Descriptions naming the target | Foundation / SR Legacy / Survey / Experimental | Outcome |
| --- | --- | --- | --- |
| `mct-oil` | 54 | 1, and it is fractionated **palm** confectionery shortening | **Resolved** — manufacturer specification adopted |
| `sunflower-lecithin` | 3 | 0 | Unresolved — three brands disagree too widely |
| `reishi-mushroom` | 33 | 0 | Unresolved — no usable record |
| `turkey-tail-mushroom` | 5 | 0 | Unresolved — no usable record |
| `cordyceps-mushroom` | 4 | 0 | Unresolved — no usable record |

**Not one of the five appears in Foundation, SR Legacy, Survey or Experimental.** Every genuine match is Branded label data. The turkey tail matches illustrate why category matching fails: three of the five are *smoked turkey tails*, the poultry cut.

### The other national databases

Searched for the four pages that FoodData Central could not resolve:

| Database | Result |
| --- | --- |
| CoFID (UK) | No entry. 2,887 foods covering the commonly consumed UK diet; no medicinal fungi, no lecithin. |
| Frida (Denmark) | No entry. Version 6.1 has a mushroom subgroup but only culinary species. |
| Australian food composition database | No entry. Its mushroom records are *Agaricus bisporus* alone. |
| Standard Tables of Food Composition in Japan, 8th revised | No entry. The complete 2,478-item list was searched directly for まんねんたけ (reishi), かわらたけ (turkey tail), とうちゅうかそう and 冬虫夏草 (cordyceps), レシチン (lecithin) and 中鎖 (medium-chain): **zero matches for all six terms**. Its 55 mushroom records are culinary — enokitake, kikurage, shiitake, shimeji. Notably one of them is ぶなしめじ, bunashimeji, which is the beech mushroom whose record was substituted onto these three pages. |

Japan is the strongest negative result available: a national table that catalogues 55 mushrooms in a cuisine where these species are culturally familiar, and still does not carry them as foods.

### Searched so far

**SR Legacy, complete** (local extract, 2018). Terms and outcomes:

| Page | Terms | Result |
| --- | --- | --- |
| `mct-oil` | MCT, medium-chain, fractionated, caprylic, capric triglyceride | 1 hit |
| `reishi-mushroom` | reishi, Ganoderma lucidum, Ganoderma, lingzhi, ling zhi | 0 hits |
| `turkey-tail-mushroom` | turkey tail, Trametes versicolor, Coriolus versicolor, yunzhi | 0 hits |
| `cordyceps-mushroom` | cordyceps, Cordyceps militaris, Ophiocordyceps sinensis, caterpillar fungus | 0 hits |
| `sunflower-lecithin` | lecithin, sunflower lecithin, phosphatidylcholine | 1 hit |

SR Legacy holds 24 mushroom records. All are culinary species — chanterelle, morel, crimini, shiitake, white, oyster, straw, portabella, enoki, maitake — and none is Ganoderma, Trametes or Cordyceps.

### Candidates considered and rejected

| FDC ID | Description | Considered for | Rejected because |
| --- | --- | --- | --- |
| 171412 | Oil, coconut | `mct-oil` | The parent material, not the product. MCT oil is the fractionated C8/C10 portion; whole coconut oil is around half lauric acid (C12), which fractionation exists to remove. A shared parent ingredient is not a match. |
| 330458 | Oil, coconut (Foundation) | `mct-oil` | As above. |
| 172334 | Shortening, confectionery, fractionated palm | `mct-oil` | Correct processing concept, wrong source material and wrong product: a palm-derived confectionery shortening, not a C8/C10 oil. |
| 171428 | Oil, babassu | `mct-oil` | Naturally rich in medium-chain fatty acids, but an unfractionated seed oil of a different species. |
| 748278 | Oil, canola | `mct-oil` | The withdrawn record. A long-chain seed oil with no relation to the product. |
| 171426 | Oil, soybean lecithin | `sunflower-lecithin` | Correct edible material, wrong species — and the sunflower page exists precisely to offer a soy-free alternative, so substituting soy lecithin would negate it. |
| 1750349 | Oil, sunflower | `sunflower-lecithin` | The withdrawn record. The triglyceride stream from which the phospholipids have been removed. |
| 2003603 | Mushroom, beech | reishi, turkey tail, cordyceps | The withdrawn record. *Hypsizygus tessellatus*, a culinary species unrelated to any of the three. |
| 1999626 | Mushroom, lion's mane | reishi, turkey tail, cordyceps | Correct genus concept only. A different species; accepted for the lion's mane page alone. |

Branded candidates, from the completed API search:

| FDC ID | Description | Considered for | Rejected because |
| --- | --- | --- | --- |
| 2426574 | Organic Medium Chain Triglycerides Oil | `mct-oil` | Identity matches, and it corroborates the adopted record, but its panel reads per 100 ml rather than per 100 g: 93.33 g fat is 14 g per 15 ml scaled up, the density of an oil rather than its mass composition. Kept as corroboration, not as the source. |
| 2153701, 2272983 | MCT Oil Powder | `mct-oil` | Different product form. A powder is MCT oil carried on maltodextrin or acacia, so most of its mass is not oil. |
| 2165870, 2325832 | Keto Blend olive & MCT; MCT oil blend with avocado oil | `mct-oil` | Multi-oil blends. |
| 2287606 | LoveRawFoods, Sunflower Lecithin | `sunflower-lecithin` | Single ingredient and correct material, but see the spread below. |
| 2373459 | Liquid Sunflower Lecithin | `sunflower-lecithin` | As above. |
| 2417875 | Sunflower Lecithin Pure Powder | `sunflower-lecithin` | As above, and a de-oiled powder rather than the liquid. |
| 2408472, 2409492, 2409500 | Organic Reishi Mushroom Powder | `reishi-mushroom` | Single ingredient, but the panel is label rounding, not composition. Declared on a 3 g serving, so every value is a 1 g increment multiplied by 33: protein 33.33 g, carbohydrate 66.67 g, fibre 33.3 g, fat 0 g, calcium 0 mg. Protein and carbohydrate sum to exactly 100 g with no fat, ash or moisture, which no dried fungus does. The resolution is about ±33 g per 100 g. |
| 2408369 | Cordyceps Medicinal Mushroom Extract Powder | `cordyceps-mushroom` | An extract, not the fruiting body, and the arithmetic is impossible: 100 g carbohydrate, 50 g protein, 50 g fibre and 10 g saturated fat declared per 100 g, which is over 150 g of material in 100 g. A 2 g serving multiplied by 50. |
| 2154808 | Cocotropic Wild Superfood Elixir Reishi Mushroom Extract Powder | `reishi-mushroom` | Multi-ingredient: cocoa, maca, chaga, turmeric. |
| 517494, 2525451, 2586686 and 30 others | Reishi elixir mixes, lattes, kombuchas, chocolates, teas | `reishi-mushroom` | Formulated beverages and confectionery in which reishi is a minor ingredient. |
| 2538926, 2586688, 2586699 | Turkey tail latte mix; turkey tail & astragalus tea and coffee | `turkey-tail-mushroom` | Blends, and in two cases mostly chicory and astragalus. |
| 576980, 2134926 | Kroger / A&R Smoked Turkey Tails | `turkey-tail-mushroom` | Poultry. A name collision, not a food. |

### Resolved and removed from the queue

**`mct-oil`** — adopted FDC **2543941**, *MCT Premium C8 & C10 100% Pure Oil* (Branded), declared ingredient "MCT oil (60% C8, 40% C10)".

- **Identity**: single-ingredient medium-chain triglyceride oil. Species, edible material and processing state all match, because the product *is* the specification.
- **Basis and units**: per 100 g of product, label-derived. Energy 833 kcal, fat 100 g, saturated fat 100 g.
- **Why a branded record is acceptable here**: MCT oil is a formulated product, not an agricultural commodity, so a manufacturer declaration outranks a general database — and no general database holds it. The values are additionally constrained by chemistry: a pure triglyceride oil is entirely fat, and C8:0 and C10:0 are both fully saturated. The Australia New Zealand Food Standards Code defines medium chain triglycerides as "triacylglycerols that contain predominantly the saturated fatty acids designated by 8:0 and 10:0", corroborating the fatty acid class independently of the brand.
- **Limitations**: one product, US label rounding. Energy differs between brands, 833 against 867 kcal. The 60:40 C8:C10 ratio is formulation-specific and C6 is not quantified. Records with millilitre servings can be converted on an assumed density of 1.0, overstating an oil by around 7 per cent.

The contrast with the withdrawn record is the point: canola gave this page 6.61 g saturated fat, where the product is essentially entirely saturated.

### Still unresolved

**`sunflower-lecithin`** — three single-ingredient branded records exist, and they do not agree well enough to represent the ingredient generically:

| FDC ID | Form | Fat | Saturated | Energy |
| --- | --- | --- | --- | --- |
| 2417875 | De-oiled powder | 50 g | 10 g | 800 kcal |
| 2373459 | Liquid | 83.33 g | 8.33 g | 833 kcal |
| 2287606 | Unspecified | 90.62 g | 15.62 g | 781 kcal |

A 40 g per 100 g spread in fat is real product variation between de-oiled and liquid lecithin, not measurement noise, and the page does not declare which form it documents. Choosing one brand would publish a number that is wrong for readers holding the other. None reports choline, which is the page's reason for existing. Qualitative presence is retained; a form must be decided before any panel is published.

**`reishi-mushroom`, `turkey-tail-mushroom`, `cordyceps-mushroom`** — no defensible quantitative source exists in any of the five FoodData Central data types or in the four national databases. The only single-ingredient records are supplement labels whose declared values are arithmetically impossible. Qualitative presence only. The next step is analytical literature, which must name the species, the fruiting body or mycelium, and the drying method.

---

## Related entries

### `walnuts` — authoritative supplementary source wanted

Walnuts hold 9080 mg of 18:3 under `pufa_18_3_unresolved_mg`. The USDA record (FDC 170187) reports it under nutrient 1270, an unqualified 18:3 that does not state the isomer, so the site does not publish it as ALA on that record's authority alone.

This is a labelling limitation, not a doubt about the walnut. The value is scientifically very likely to be predominantly alpha-linolenic acid, and walnuts are among the foods for which that matters most to a reader. Queued for an authoritative supplementary source — a Foundation Foods record, CoFID, or a named analytical panel — that identifies the isomer explicitly. Flaxseed at 22813 mg is in the same position.

### `nutritional-yeast` — product form mismatch

Cites FDC 167717, described as **Yeast extract spread** — a Marmite-type concentrated spread. The page documents nutritional yeast flakes. Same organism, different product form and processing state, and materially different composition: a yeast extract spread is far higher in sodium and is used by the teaspoon rather than the tablespoon.

The panel is retained for now by direction. Recorded here because the same rule that withdrew the pages above — processing state must match — applies to it.

Its unsupported ALA has been suppressed.
