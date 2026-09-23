# Food-page citation safety report

Internal audit only. Not a reader-facing page.

**Mechanical remediation and recurrence prevention completed; scientific evidence validation ongoing.**

This report reviews the working-tree diff from the three-commit cleanup (`ee03197`, `e0f9d46`, `ca8ae4e`). It does **not** certify remaining citations. Heuristic queue items are in `system/food-citation-review-queue.md` and `scripts/data/food-citation-review-queue.json`.

Manifest statuses (page-level):

| Status | Pages |
| --- | ---: |
| requires editorial review | 139 |
| unchanged but unverified | 26 |
| scientifically verified | 2 (eggs, egg yolks) |
| renamed or removed | 2 (`yogurt.md`, `cooled-potatoes.md`) |
| mechanically repaired (as sole status) | 0 |

Edited pages also carry `mechanically_repaired: true` in the JSON. That flag means generator signatures were cleaned. It is not scientific verification.

---

## 1. Substantive nutritional prose removed or rewritten

Most of the 141-file diff is citation markers, `Reports on …` Highlights, abstract/LaTeX reference text, or split Markdown. Those are **not** listed here.

Pages where Overview or Food Context **claims** were deleted or rewritten (not merely uncited):

| Page | What changed |
| --- | --- |
| `carrots.md` | Dropped “Carotenoids participate in antioxidant and neuroprotective dietary patterns.” Rewrote the carotenoid sentence as constituent-level lutein/zeaxanthin, not carrot-feeding evidence. |
| `tuna.md` | Dropped the compound claim that tuna’s protein, niacin, selenium and omega-3s together “support neuronal membrane composition, mitochondrial energy metabolism, and antioxidant enzyme systems.” Replaced with labelled constituent-level omega-3 context. Mercury-frequency advice left uncited after FAO DIAAS was removed. |
| `turkey.md` | Split a compound sentence: Trp:LNAA retained as meal-pattern evidence; gentler-cooking/AGE wording left without that citation. |
| `chicken.md` | Pirinen niacin-trial cites removed. NAD-salvage and “cognitive energy” wording **kept uncited**. LNAA sentence labelled meal-pattern. Cooking/B-vitamin clause uncited. |
| `spinach.md` | Synergies no longer say Hallberg showed a “fourfold increase” for spinach. Relabelled mixed-meal iron absorption and mechanistic oxalate/mitochondria. |
| `lentils.md` | Same Hallberg “fourfold” overclaim removed. GOS/gut–brain Overview sentence left uncited after dump cites were stripped. |
| `vinegar-pickles.md` | Removed the ADHD-cohort SCFA sentence and the Steckler inline citation. |
| `parmesan-cheese.md` | Joined the split Soerensen link (malformed citation, not a new health claim). Replaced a leftover **plant-protein pairing** EAA line with the animal complete-protein line. |

Cite-only (claims kept, markers dropped — **not** counted as prose deletion): cashews, chickpeas, oyster-mushroom (lovastatin/immune sentence kept), lentils Overview GOS sentence kept uncited.

Eggs / egg yolks: remaining citations were checked as direct food evidence (Evenepoel, Fuchs, Nimalaratne, Kim). Prior Highlights omission stands.

---

## 2. Highlights emptied or substantially shorter

Relative to HEAD:

- **Emptied (section omitted): 60 pages**, including clams, dandelion-greens, dark-meat-poultry, duck-fat, edamame, eggs, egg-yolks, extra-virgin-olive-oil, fermented-hot-sauce, fermented-vegetables, fortified-plant-milks, garlic, ghee, grapes, jerusalem-artichokes, kale, kefir, kimchi, kombucha, leeks, lemon-balm-tea, lentils, lions-mane-mushroom, lupins, maitake-mushroom, mct-oil, milk, miso, mushrooms, natto, nori, olives, onions, oranges, oregano, oyster-mushroom, parmesan-cheese, parsley, peppermint, pistachios, pomegranates, reishi-mushroom, rice, sage, seaweed, shiitake-mushroom, soy-lecithin, spelt, spinach, spirulina, sunflower-lecithin, swiss-chard, tofu, tomatoes, turkey-tail-mushroom, turmeric, vinegar, vinegar-pickles, wasabi, whey-protein.
- **Shortened (≥2 bullets or ≤50% remaining): 16 pages** — early-harvest-olive-oil 4→2, ginger 5→1, grass-fed-butter 5→3, greek-yogurt 5→1, kidney-beans 4→1, mankai 4→1, mucuna-beans 4→1, nutritional-yeast 5→1, olive-oil 5→1, peanuts 4→1, peas 5→1, potatoes 5→2, raspberries 5→2, strawberries 5→2, tempeh 5→1, walnuts 4→1.

Some dropped bullets were `Reports on [title]` generator debris (garlic, kale, lentils, mushrooms, parmesan, pistachios, rice, spinach, spirulina, fermented-vegetables, egg-yolks). Many others were generic nutritional templates that duplicated Food Context. Empty Highlights were preferred to false precision. **Whether distinctive Highlights should return is editorial review, not a completed scientific decision.**

---

## 3. Citations retained by labelled scope or bibliographic core

These were **not** verified as adequate support. Labelling only records the intended evidence level.

### Labelled in this pass (evidence-level move)

| Page | Adjacent claim (abridged) | Key | Route |
| --- | --- | --- | --- |
| spinach | Vitamin C pairing for non-haem iron | hallberg_iron_1989 | mixed-meal / food-group |
| spinach | Oxalate and mitochondrial/redox biology | chaiyarit_mitochondrial_2020 | mechanistic |
| lentils | Vitamin C pairing for non-haem iron | hallberg_iron_1989 | mixed-meal |
| kale, black-beans, oranges, tofu | Vitamin C / phytate iron lines | hallberg_iron_1989 | mixed-meal |
| carrots | Fat pairing; carotenoid bioaccessibility | kindel_mechanism_2010; brown_carotenoid_2004 | mechanistic; meal-pairing |
| carrots | Lutein/zeaxanthin visual-cognitive literature | johnson_role_2014 | constituent |
| chicken | Trp:LNAA in mixed meals | fernstrom_lnna_2013 | meal-pattern |
| turkey | Carbohydrate co-consumption / Trp:LNAA | fernstrom_lnna_2013 | meal-pattern |
| tuna | Marine LC-omega-3s and brain function reviews | mcnamara_role_2006 | constituent |
| flax-seeds | ALA conversion limits | nih_omega3_factsheet_2025 | constituent |
| flax-seeds | Limiting amino acids / complementarity | mariotti_dietary_2019 | plant-protein pattern |
| beef | Creatine; CoQ10; iron-deficiency; red/processed meat; EAT-Lancet | avgerinos; crane; beard; bouvard; willett | constituent / mechanistic / food-group / pattern |
| oyster-mushroom | Mushroom vitamin D (Starck) | starck_mushrooms_2024 | food-group mushroom |
| extra-virgin-olive-oil | MUFA/olive-oil cohorts; tomato–oil lycopene | schwingshackl_monounsaturated_2014; fielding_increases_2005 | dietary-pattern; pairing/matrix |

### Bibliographic core only (annotation stripped; key kept)

FAO DIAAS and/or Mariotti vegetarian-protein cores remain on barley, buckwheat, lamb, lupin-beans, oats, pumpkin-seeds, quinoa, rice, wheat, whole-grains. Also Hands cocoa-metal cores on cacao-powder/cocoa; Johnson/Yagi/Vishwanathan lutein cores on corn; Derbyshire/Packer on sunflower-seeds and wheat-germ; Avgerinos on watermelon; Crane on liver. **Core-only is not a relevance pass.**

---

## 4. The 26 pages identical to HEAD

They **cannot** be called legitimate.

They sit in the three-commit union and were not edited because this pass found no remaining generator signature. Their claim–source relationships were **not** checked here.

almonds, amaranth, apples, asparagus, aubergine, avocado, bananas, beetroot, bell-peppers, black-goji, black-pepper, black-tea, broccoli, broccoli-sprouts, brussels-sprouts, butter, cod, dark-chocolate, lumpfish-roe, rosemary, scallops, sesame-seeds, sourdough-bread, soy, tahini, trout-roe.

Examples of why identity-with-HEAD is insufficient: beetroot still cites a cocoa flavanol vascular paper; scallops still cite creatine-supplementation and a “potential of heart” review; butter still cites a saturated-fat/heart-disease paper. Those rows are in the review queue.

Status: **unchanged but unverified**.

---

## 5. Repeated Highlights templates (11 groups)

Validation warns; it does not rewrite.

**Organ meat / red-meat family**

1. heart, kidney, liver — “nutrient-dense source of complete protein plus highly bioavailable vitamins and minerals.”
2. heart, kidney, liver — “typically richer than standard muscle meat in vitamin b12 and other micronutrients.”
3. heart, kidney, lamb, liver, pork, turkey — “contains no dietary fibre, so meals are usually more balanced with vegetables, legumes, or whole grains.”
4. heart, kidney, liver — “nutrient concentrations can be very high, so portion size and frequency are useful practical levers.”
5. heart, kidney, liver — “processing and cooking method still matter for overall dietary context.”
6. lamb, pork, turkey — “provides a complete, highly digestible protein source.”

**Seafood family**

7. herring, mackerel, mussels, salmon, sardines, shrimp, tuna — “provides complete, highly digestible protein.”
8. same pages — “commonly contributes selenium, iodine, and vitamin b12, though levels vary by species.”
9. same pages — “epa/dha content is highly species-dependent; oily fish are usually higher than lean fish or shellfish.”
10. same pages — “often lower in saturated fat than many fatty red-meat patterns when minimally processed.”
11. same pages — “nutritional profile and risk context depend on processing method (fresh vs salted/smoked/cured).”

These may be fair food-group statements. They were not checked as food-specific evidence.

---

## 6. Direct-food presentation moved to a lower evidence level

This pass **relabelled** (did not independently re-prove) the following. Until a human accepts the label against the paper, treat them as still requiring review (Tier 2).

spinach Hallberg and Chaiyarit; lentils/kale/black-beans/oranges/tofu Hallberg; carrots Kindel, Brown, Johnson; chicken and turkey Fernstrom; tuna McNamara; flax NIH and Mariotti; beef Avgerinos, Crane, Beard, Bouvard, Willett; oyster-mushroom Starck; extra-virgin olive oil Schwingshackl and Fielding.

No page was certified as having direct food evidence after a downgrade.

---

## Review queue

142 outstanding **page** rows were expanded to **370** citation–claim rows (eggs and egg yolks excluded). Recommended actions are triage hints, not decisions.

| Tier | Meaning | Rows |
| --- | --- | ---: |
| 1 | Likely subject mismatch or clinically meaningful health claim | 37 |
| 2 | Food claim supported only at constituent / food-group / pattern / mechanism level | 255 |
| 3 | Title overlaps the food; wording may still overclaim | 66 |
| 4 | Core-only, annotation, or low-risk editorial uncertainty | 12 |

Suggested first batch: cilantro–parsley, coconut-oil–olive-oil, duck-fat–olive-oil, nori/seaweed–salmon DHA, lemon-balm–rosemary/sage, beetroot–cocoa (unchanged page), scallops creatine, watermelon creatine, and remaining Avgerinos creatine-on-meat rows.
