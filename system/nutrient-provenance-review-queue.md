## Nutrient identity and provenance review queue

Pages whose published values were withdrawn because their identity or their provenance could not be established. Nothing here is a calculation defect: the arithmetic was sound, the inputs were not what they claimed to be.

A page leaves this queue when a **named analytical record for that food** supplies the value, with the source's own nutrient identifier stating the compound. It does not leave by approximation, by a neighbouring food, or by a plausible literature range.

Opened by the ALA/omega-3 repair. Rules are in `system/food-nutrition-schema.md`.

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

### C. Chemically unresolved 18:3 — 83 pages

These pages hold a real, measured 18:3 value under `pufa_18_3_unresolved_mg`, because their record reports USDA nutrient 1270, an 18:3 with **no isomer stated**. The value is retained internally and published nowhere.

This is the largest group and includes the foods a reader would most expect to see ALA on:

| Page | Unresolved 18:3 (mg/100 g) |
| --- | --- |
| `flax-seeds` | 22813 |
| `walnuts` | 9080 |
| `ghee` | 1447 |
| `soy` | 1330 |
| `avocado-oil` | 957 |

They are **not** errors. Flaxseed's 22.8 g/100 g is almost certainly alpha-linolenic acid, and a later record stating the isomer will very likely confirm it. But "almost certainly" is an inference from the food's reputation, not a measurement of the sample, and this repair exists because inference was previously allowed to fill a chemical identity.

Resolution is a source that states the isomer — a Foundation Foods record, or a named analytical panel — not a decision about which isomer is likely.

**Walnuts and flaxseed are prioritised** for an authoritative supplementary source, because they are the two foods a reader is most likely to consult for ALA and the two whose values are most likely to be confirmed. Tracked in `system/specialist-composition-review-queue.md`.

Until then both pages carry an `ALA` Substances card with no supported table row, and `npm run nutrition:validate` reports them under *Substances cards missing a supported nutrition-table row*. That is the intended visible state: the card is what the page claims, and the missing row is the claim it can no longer evidence. It is resolved by a source that states the isomer, or by a supported qualitative row — not by removing the card, and not by restoring the suppressed number.

---

### D. Related pattern, not yet actioned

Twelve pages store `epa_mg: 0` and `dha_mg: 0` where the record simply does not report those acids: `black-pepper`, `chamomile-tea`, `chicory-root`, `duck-fat`, `fortified-plant-milks`, `jerusalem-artichokes`, `lemon-balm-tea`, `nutritional-yeast`, `oregano`, `saffron`, `sage`, `sunflower-lecithin`.

A zero asserts that a food was measured and found to contain none. That is a different claim from "not measured", and these pages are making the first claim on the strength of the second. Left as found because it falls outside the ALA repair, and recorded here so it is not rediscovered as a new defect.
