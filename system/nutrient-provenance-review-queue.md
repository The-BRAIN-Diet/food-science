## Nutrient identity and provenance review queue

Pages whose published values were withdrawn because their identity or their provenance could not be established. Nothing here is a calculation defect: the arithmetic was sound, the inputs were not what they claimed to be.

A page leaves this queue when a **named analytical record for that food** supplies the value, with the source's own nutrient identifier stating the compound. It does not leave by approximation, by a neighbouring food, or by a plausible literature range.

Opened by the ALA/omega-3 repair. Rules are in `system/food-nutrition-schema.md`. Public ledger of the same cases: `docs/dietary-foundations/nutrient-effects/food-composition-interpretation-register.md`.

---

### A. Substituted source records — escalated to full-panel withdrawal

The record cited on the page describes a **different food**. Retrieval succeeded, so the values are real — they belong to another organism. Applying them would republish the same error under a better citation.

These began as ALA failures and turned out to be provenance failures for the whole panel: if the record is the wrong food, every value taken from it is the wrong food's, not merely the omega-3 one. All five pages had their **entire quantitative panel withdrawn**. `mct-oil` has since been resolved against a manufacturer specification and publishes energy and fat again; the other four carry qualitative presence only. All are tracked in `system/specialist-composition-review-queue.md`, which also records the completed source search. The table below documents what the ALA repair found; it is not the current state of those pages.

| Page | Cites | Record actually describes | Withdrawn | What the value was |
| --- | --- | --- | --- | --- |
| `mct-oil` | FDC 748278 | **Oil, canola** | ALA 7450 mg, total omega‑3 7450 mg | Canola's genuine 18:3 n-3. MCT oil is fractionated C6–C10 and contains essentially no 18:3. |
| `sunflower-lecithin` | FDC 1750349 | **Oil, sunflower** | ALA 162.8 mg, total omega‑3 165.175 mg | Sunflower **oil**'s ALA. Lecithin is a phospholipid fraction, not the oil. |
| `cordyceps-mushroom` | FDC 2003603 | **Mushroom, beech** | ALA 671 mg, total omega‑3 671 mg | The beech mushroom's **phenylalanine**, 0.671 g/100 g. |
| `reishi-mushroom` | FDC 2003603 | **Mushroom, beech** | ALA 671 mg, total omega‑3 671 mg | The same phenylalanine, on a second species. |
| `turkey-tail-mushroom` | FDC 2003603 | **Mushroom, beech** | ALA 671 mg, total omega‑3 671 mg | The same phenylalanine, on a third species. |

Three medicinal mushroom pages cite one record for a fourth, culinary species. The whole `nutrition_per_100g` panel on those pages derives from beech mushroom and needs review beyond the omega-3 fields.

`sunflower-lecithin` additionally retains `epa_mg: 2.375` and `dha_mg: 0` from the sunflower **oil** record. Both are outside the scope of this repair and both should go the same way as the ALA.

---

### B. No source identifier

| Page | Withdrawn | Reason |
| --- | --- | --- |
| `lumpfish-roe` | ALA 100 mg, total omega‑3 600 mg | No `fdc_id`. The source declares itself "Literature + branded label scaling", and its own note calls the fatty acids "mid-range estimates". The round 100/220/280 figures are consistent with estimation rather than assay. `epa_mg: 220` and `dha_mg: 280` remain published and rest on the same unnamed basis. |

Resolution needs a species-specific analysis of *Cyclopterus lumpus* roe, or a named branded panel that reports fatty acids.

---

### C. Chemically unresolved 18:3

These pages hold a real, USDA-reported 18:3 value under `pufa_18_3_unresolved_mg`, because their record reports USDA nutrient 1270, an 18:3 with **no isomer stated**. The value is retained internally and published nowhere.

This is not a bulk 1270 → ALA promotion. Combined provenance is food-specific. Extraction never writes `ala_mg` from 1270.

**Left this group by combined provenance**

| Page | Published ALA* | Quantity (1270) | Identity |
| --- | --- | --- | --- |
| `flax-seeds` | 22.8 g | FDC 169414, 22,813 mg | Foundation FDC 2262075 nutrient 1404 plus Ribeiro 2013 / Gómez-Cortés 2016 |
| `walnuts` | 9.08 g | FDC 170187, 9,080 mg | Kafkas 2017; Yoshinaga-Kiriake 2022. Foundation 2346394 has no 1404 |
| `soy` | 1.33 g | FDC 174270, 1,330 mg | Soybean oil FDC 171411 nutrient 1404 (GLA 1321 = 0) |
| `natto` | 0.734 g | FDC 172443, 734 mg | Same oil record |
| `tofu` | 0.582 g | FDC 172475, 582 mg | Same oil record |
| `miso` | 0.405 g | FDC 172442, 405 mg | Same oil record |
| `tempeh` | 0.248 g | FDC 174272, 248 mg | Same oil record; fat share is ~2.3%, not ~6.8% |

**Must not be closed as ALA**

| Page | Unresolved 18:3 (mg/100 g) | Why |
| --- | --- | --- |
| `spirulina` | 823 | Inverse flax case: cyanobacterial 18:3 is GLA, not ALA. FDC 170495 has no 1404 or 1321. Not published as GLA either. |
| `avocado-oil` | 957 | Fernandes 2018 says "linolenic (C18:3)". Avocado fruit FDC 171705 carries both 1404 (0.111 g) and 1321 (0.015 g). |
| `ghee` | 1447 | Ruminant 18:3. Butter on this site already publishes ALA from 1404 (0.315 g) while the same butter record's 1270 is 1.18 g. Ghee FDC 173412 has 1270 only. |
| `lamb`, `milk`, `parmesan-cheese` | 420 / 75 / 297 | Foundation cheeses report both 1404 and 1321. Dairy 18:3 is not a single isomer. |
| `fermented-hot-sauce`, `fermented-vegetables` | 534 | Cite fuyu tofu (FDC 174280). Wrong food for the page; 18:3 is not closed on a substituted panel. |
| `sunflower-seeds` | 60 | Foundation dry-roasted kernels report both 1404 (0.059 g) and 1321 (0.002 g). |

**Still unresolved — no exact-food 1404 and no accepted identity paper**

A Foundation search of the 25 foods ≥200 mg unresolved 18:3 found no exact-food nutrient 1404 hits that could close the rest. SR Legacy records for those pages also lack 1404. Highest remaining include saffron (1242), sage (1230), wheat-germ (723), kale (378), sesame-seeds (376), tahini (407), lupins (446), pistachios (289). Marine pages already publish EPA/DHA; their leftover 18:3 stays unresolved. Detail: `system/seed-fatty-acid-evidence.md`.

Resolution remains a named 1404 (or equivalent) for that food, or a documented combined-provenance interpretation under `system/food-nutrition-schema.md`.

**Eleven candidate papers were then assessed one at a time** against a written acceptance rule, and the results are registered in `system/seed-fatty-acid-evidence.md` with rejections included. Four bear on this section:

- **Flaxseed is resolved.** Combined provenance on `docs/foods/flax-seeds.md`: 22.8 g ALA* from SR Legacy 169414 nutrient 1270, interpreted as 18:3 n-3. Foundation **FDC 2262075**, *Flaxseed, ground*, reports nutrient **1404** at 19.42 g/100 g from eight analytical samples, with ALA 57.2 per cent of total fatty acids against 57.1 per cent in SR Legacy 169414. That is USDA agreeing with itself on the proportion. The Foundation quantity is not published, because it is ground seed at a different fat content.
- **Walnuts are resolved by the same rule.** Identity from Kafkas plus Yoshinaga-Kiriake et al. 2022; quantity is this SR Legacy 9,080 mg, not Yoshinaga-Kiriake's derived 7,068 mg. Foundation **FDC 2346394** still has no 1404.
- **One overstatement was corrected.** The flax page and its bibliography entry claimed Ribeiro found no gamma-linolenic acid among the acids present. Ribeiro did not measure 18:3 n-6 and states nothing about its absence. The evidence that flax carries little is Gómez-Cortés et al. 2016, which ran authentic n-3 and n-6 standards and found GLA at 0.02 g/100 g of methyl esters — together with measurable geometric isomers of ALA itself, so flax 18:3 is overwhelmingly but not exclusively alpha-linolenic acid.
- **Two of the candidates failed the rule**, which is why it is written down. Dogan & Akgül 2005 carries "18:3 n-3" only as background in its introduction while its own results and tables say bare `C18:3`, on a packed column that could not have separated the isomers with no standard named. Poggetti et al. 2018 never resolves the isomer anywhere across 189 walnut accessions, and is retained only as an oil-content denominator. Fernandes et al. 2018 fails the same naming test for avocado oil.

---

### D. Related pattern, not yet actioned

Twelve pages store `epa_mg: 0` and `dha_mg: 0` where the record simply does not report those acids: `black-pepper`, `chamomile-tea`, `chicory-root`, `duck-fat`, `fortified-plant-milks`, `jerusalem-artichokes`, `lemon-balm-tea`, `nutritional-yeast`, `oregano`, `saffron`, `sage`, `sunflower-lecithin`.

A zero asserts that a food was measured and found to contain none. That is a different claim from "not measured", and these pages are making the first claim on the strength of the second. Left as found because it falls outside the ALA repair, and recorded here so it is not rediscovered as a new defect.
