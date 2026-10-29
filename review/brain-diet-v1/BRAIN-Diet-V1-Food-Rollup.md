# BRAIN Diet V1 — Quantitative Food Roll-Up

**Decision:** Use this as a food–target coverage inventory, not a clinical-effectiveness ranking. Salmon roe, broccoli, quinoa, mussels and oysters retain their previously reported PM appearance counts. Their concentration ranks require food-state qualification; several earlier RSP comparisons mixed preparations. Serving-level adequacy remains incomplete because most canonical foods do not yet have a source-matched portion.

**Snapshot:** `review/brain-diet-v1-rollup` at `f8cfcf30`, based on published `main` `87b8f11d`. All 64 PM identities checked: 51 numbered and 13 Cross-BRS. No scientific reassessment or admission change. Reused the existing verified extraction, canonical manuscript projections and composition records.

**Reconciled coverage:** 122 unique foods; 1115 distinct food–PM pairs; 40 food-linked target substances; 39 PMs with verified food links. The earlier **36 PMs** denotes quantitative-ready coverage; **39** includes accepted presence-only links. The 55 admitted canonical substances in the baseline are not all food-linked. 1482 qualifying canonical projection rows are retained; the older 1,490 observation-row total is not a distinct relationship count.

### Reconciliation of 44 admitted, 39 food-linked and 36 quantitative PMs

**These are nested inclusion tiers, not a fall from 44 scientifically supported PMs to 36.** The source of **44** is the 26 October recovery [coverage record](https://github.com/The-BRAIN-Diet/food-science/blob/c582b85c/review/dietary-recovery-2026-10-26/continuation/coverage-reconciled.json), `current.pms_with_admitted_inputs`, preserved in commit `c582b85c`. Its [calculation](https://github.com/The-BRAIN-Diet/food-science/blob/c582b85c/review/dietary-recovery-2026-10-26/continuation/finalize-report.mjs) counts distinct PM IDs with at least one relationship satisfying **`dietary_input === true && scientific_admission === 'admitted'`** across all seven mapper scopes. It does **not** require a resolved substance, verified food or quantity. Its separate **42** count requires resolved substance identity; the two excluded there are BRS1-FM1-PM2 and BRS5-FM1-PM3. The older **44 substances** statistic is a different metric.

Read-only replay of that commit and this report’s `f8cfcf30` snapshot reproduces **44 PMs and the same 124 admitted relationship IDs in both**. Apply verified-food status and existing projection blocks: **39** remain. Require at least one verified point/range composition observation: **36** remain. This is quantitative availability, not universal serving readiness, comparable RSP coverage or therapeutic sufficiency. The five mapping/formulation exclusions and three quantitative exclusions are identified individually below. No lost admission or deleted PM explains the difference. The relevant gaps persist; comparable verified-food coverage was already 39 historically, while quantitative coverage increased **34 → 36** through PM4/PM5 in BRS5-FM2.

The table covers every canonical PM once. **Y/—** means included/not included under that column’s definition, not a new scientific adjudication. “Unchanged” means tier membership unchanged between the two snapshots; it does not assert that every source byte stayed unchanged.

| PM | Historical admitted (44) | Current admitted (44) | Verified food (39) | Quantitative (36) | Explanation |
| --- | --- | --- | --- | --- | --- |
| [BRS-X(Circadian-FM1-PM1)](../../docs/biological-targets/brs-x/circadian/fm1/brs-x-circadian-fm1-pm1-light-dark-circadian-entrainment.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS-X(Circadian-FM1-PM2)](../../docs/biological-targets/brs-x/circadian/fm1/brs-x-circadian-fm1-pm2-feeding-time-circadian-synchronisation.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS-X(ECS-PM1)](../../docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm1-nape-nae-biosynthesis-capacity.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS-X(ECS-PM2)](../../docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm2-omega-3-derived-endocannabinoidome-signalling.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS-X(ECS-PM3)](../../docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm3-faah-mediated-endocannabinoid-preservation.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS-X(ECS-PM4)](../../docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm4-endocannabinoid-dopamine-neuromodulation.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS-X(ECS-PM5)](../../docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm5-endocannabinoid-stress-buffering-capacity.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS-X(Hormones-PM1)](../../docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm1-oestrogen-signalling-stability.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS-X(Hormones-PM2)](../../docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm2-estrobolome-regulation.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS-X(Hormones-PM3)](../../docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm3-progesterone-supportive-microbial-metabolism.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS-X(Hormones-PM4)](../../docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm4-metabolic-reproductive-hormone-integration.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS-X(Hormones-PM5)](../../docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm5-testosterone-signalling-stability.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS-X(Hormones-PM6)](../../docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm6-androgen-microbiome-regulation.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS1-FM1-PM1](../../docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS1-FM1-PM2](../../docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx) | Y | Y | — | — | Meal carbohydrate-to-protein pattern; admitted meal exposure, not a resolved single-substance/food link (PM2-DIT-3). |
| [BRS1-FM1-PM3](../../docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS1-FM1-PM4](../../docs/biological-targets/brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS1-FM1-PM5](../../docs/biological-targets/brs1/fm1/brs1-fm1-pm5-serotonergic-signalling-regulation.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS1-FM2-PM6](../../docs/biological-targets/brs1/fm2/brs1-fm2-pm6-acetylcholine-synthesis-support.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS1-FM3-PM7](../../docs/biological-targets/brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS1-FM4-PM10](../../docs/biological-targets/brs1/fm4/brs1-fm4-pm10-glutamate-clearance-and-recycling.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS1-FM4-PM11](../../docs/biological-targets/brs1/fm4/brs1-fm4-pm11-excitotoxicity-modulation.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS1-FM4-PM9](../../docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS1-FM5-PM12](../../docs/biological-targets/brs1/fm5/brs1-fm5-pm12-synaptic-structural-plasticity.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS2-FM1-PM1](../../docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS2-FM1-PM2](../../docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS2-FM1-PM3](../../docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS2-FM1-PM4](../../docs/biological-targets/brs2/fm1/brs2-fm1-pm4-methionine-cycle-flux.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS2-FM2-PM5](../../docs/biological-targets/brs2/fm2/brs2-fm2-pm5-transsulfuration-pathway.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS2-FM2-PM6](../../docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS2-FM3-PM7](../../docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS3-FM1-PM1](../../docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS3-FM1-PM2](../../docs/biological-targets/brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling.mdx) | Y | Y | — | — | Oligofructose admitted; food mapping unresolved (PM2-DIT-RECOVERY-OLIGOFRUCTOSE). |
| [BRS3-FM2-PM3](../../docs/biological-targets/brs3/fm2/brs3-fm2-pm3-nrf2-are-antioxidant-activation.mdx) | Y | Y | Y | — | Sulforaphane: verified broccoli/sprout presence; preparation-specific research is not a verified comparable per-100-g composition value (PM3-DIT-1). |
| [BRS3-FM2-PM4](../../docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS3-FM2-PM5](../../docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS3-FM2-PM6](../../docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS3-FM3-PM7](../../docs/biological-targets/brs3/fm3/brs3-fm3-pm7-cytokine-network-modulation.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS3-FM3-PM8](../../docs/biological-targets/brs3/fm3/brs3-fm3-pm8-eicosanoid-spm-balance.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS4-FM1-PM1](../../docs/biological-targets/brs4/fm1/brs4-fm1-pm1-electron-transport-chain-function.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS4-FM1-PM2](../../docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS4-FM1-PM3](../../docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS4-FM2-PM4](../../docs/biological-targets/brs4/fm2/brs4-fm2-pm4-ros-production-and-control.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS4-FM2-PM5](../../docs/biological-targets/brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS4-FM3-PM6](../../docs/biological-targets/brs4/fm3/brs4-fm3-pm6-carnitine-mediated-fat-transport.mdx) | Y | Y | — | — | L-carnitine admitted; beef/lamb mappings remain research-supported provisional, excluded from verified tier (PM6-DIT-CARNITINE-1). |
| [BRS4-FM3-PM7](../../docs/biological-targets/brs4/fm3/brs4-fm3-pm7-ketone-utilisation-capacity.mdx) | Y | Y | Y | — | Caprylic triglyceride: verified in a specified C8/C10 MCT oil; separate quantitative content unavailable (PM7-DIT-RECOVERY-CAPRYLIC-TRIGLYCERIDE). |
| [BRS4-FM3-PM8](../../docs/biological-targets/brs4/fm3/brs4-fm3-pm8-metabolic-fuel-switching.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS4-FM4-PM9](../../docs/biological-targets/brs4/fm4/brs4-fm4-pm9-mitochondrial-biogenesis.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS5-FM1-PM1](../../docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS5-FM1-PM2](../../docs/biological-targets/brs5/fm1/brs5-fm1-pm2-lps-endotoxin-containment.mdx) | Y | Y | — | — | Oligofructose lacks food mapping; tested RS2, fish-oil meal and milk-fat-structure records have unresolved identity/matrix projection (PM2-DIT-1–4). |
| [BRS5-FM1-PM3](../../docs/biological-targets/brs5/fm1/brs5-fm1-pm3-keystone-taxa-support.mdx) | Y | Y | — | — | Oligofructose-enriched inulin and B. longum NCC2705 remain unresolved formulation/strain identities and food projections (PM3-DIT-1–2). |
| [BRS5-FM2-PM4](../../docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx) | Y | Y | Y | Y | Quantitative coverage gained since recovery: verified asparagus inulin dry-weight value; blocked RS atom is still excluded. |
| [BRS5-FM2-PM5](../../docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx) | Y | Y | Y | Y | Quantitative coverage gained: verified resistant-starch ranges and asparagus inulin; no new admission counted. |
| [BRS5-FM2-PM6](../../docs/biological-targets/brs5/fm2/brs5-fm2-pm6-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation.mdx) | Y | Y | Y | — | Epicatechin presence verified; quantitative estimates remain provisional/material-unmatched. Ellagic acid/ellagitannin atoms retain projection blocks (PM6-DIT-1–2; PM6-DIT-RECOVERY-EPICATECHIN). |
| [BRS5-FM3-PM7](../../docs/biological-targets/brs5/fm3/brs5-fm3-pm7-vagal-ens-signalling-modulation.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS5-FM3-PM8](../../docs/biological-targets/brs5/fm3/brs5-fm3-pm8-neurotransmitter-precursor-biotransformation-and-availability.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS6-FM1-PM1](../../docs/biological-targets/brs6/fm1/brs6-fm1-pm1-glucose-appearance-kinetics.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS6-FM1-PM2](../../docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS6-FM1-PM3](../../docs/biological-targets/brs6/fm1/brs6-fm1-pm3-insulin-sensitivity-and-glucose-disposal.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS6-FM2-PM4](../../docs/biological-targets/brs6/fm2/brs6-fm2-pm4-cortisol-rhythm-regulation.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS6-FM3-PM6](../../docs/biological-targets/brs6/fm3/brs6-fm3-pm6-sympathetic-activation-and-parasympathetic-recovery.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS6-FM3-PM7](../../docs/biological-targets/brs6/fm3/brs6-fm3-pm7-vagal-tone-hrv-regulation.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |
| [BRS6-FM4-PM8](../../docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling.mdx) | Y | Y | Y | Y | Unchanged: all three tiers. |
| [BRS6-FM4-PM9](../../docs/biological-targets/brs6/fm4/brs6-fm4-pm9-stress-induced-appetite-reward-drive-modulation.mdx) | — | — | — | — | Unchanged: no gated admitted input; not part of the historical 44. |

**Interpretation:** five exclusions concern unresolved/provisional food or formulation mapping, three concern missing qualifying quantities. They are stricter reporting criteria applied to preserved admissions, not withdrawals. This reconciliation does not authorise promoting provisional mappings or converting formulation-specific study results into general food composition.

## Reading the tables

- PM appearances count each canonical food–PM pair once. System totals sum those pairs within that system; targets are unique substance identities, not summed nutrient values.
- RSP = 100 × concentration ÷ highest verified comparable point value; ranks use distinct foods (ties share a rank). Recalculated within the same substance, unit, exact measurement basis and resolved preparation state. Raw, cooked, dry, salted and oil-based observations are separate. Unknown state, missing basis, qualitative presence and ranges are unranked. **Sole / RSP 100** means one source, not evidence of superiority.
- RSP ≥10 is a provisional shortlist marker only. Every accepted food remains in Section B, including low-RSP foods. No universal adequacy cutoff is imposed. Amounts are upstream dietary-input amounts, never inferred quantities of an endogenous product.
- Amount per serving = per-100-g amount × documented portion grams ÷100. Only existing USDA household portions matched to preparation, or the explicit 5 g nutritional-yeast label portion, are used. All other entries retain per-100-g amounts: **serving delivery unavailable**. Cooked quinoa and mussel EAA portions are not applied to their raw micronutrient records.
- % RI = 100 × serving amount ÷ daily reference. Existing BRAIN convention: US IOM/National Academies DRIs, healthy adults 19–50, higher male/female value; RDA and AI distinguished and percentages uncapped. It measures general adequacy, not an effective PM dose. `RI not established` also indicates unresolved adequacy for compounds without a recognised reference. Sodium follows the canonical no-target-percentage convention.
- Abbreviations: EAA = sum of nine indispensable amino acids; PC = phosphatidylcholine; 5-MTHF = form-specific folate, not interchangeable with total folate. A uses retinol activity equivalents. EAA composition does not establish digestibility, limiting amino acids or DIAAS.

### Reference denominators used

| Target | Daily reference |
| --- | --- |
| Copper | 0.9 mg RDA |
| Choline | 550.0 mg AI |
| Iron | 18.0 mg RDA |
| Magnesium | 420.0 mg RDA |
| Manganese | 2.3 mg AI |
| Potassium | 3400.0 mg AI |
| Selenium | 55.0 µg RDA |
| Zinc | 11.0 mg RDA |
| A (RAE) | 900.0 µg RDA |
| B12 | 2.4 µg RDA |
| B2 | 1.3 mg RDA |
| B5 | 5.0 mg AI |
| B6 | 1.3 mg RDA |
| Folate | 400.0 µg RDA |
| C | 90.0 mg RDA |
| E | 15.0 mg RDA |

Natural food folate uses the canonical 1 µg food folate = 1 µg DFE convention; no form-specific 5-MTHF percentage is inferred. Sources: [reference contract](../../system/nutrient-reference-values.md), [calculation constants](../../src/utils/nutrientReference.mjs). Quantities and source/material provenance are in each linked canonical food record; full source-specific distributions remain in [the reused extraction](02-consolidated-food-targets.md).

## A — Nine system food rankings

Top ten by distinct PM appearances, ties alphabetically. Each profile shows up to three measured targets connected to that system; Section B retains all connected targets. The figures do not imply nine independent clinical rankings.

### BRS1
**104 unique foods | 355 distinct PM appearances | 15 unique target substances**

| Food | PM appearances | Unique targets | Main targets: rank / RSP / quantity / serving RI |
| --- | --- | --- | --- |
| [Broccoli](../../docs/foods/broccoli.md) | 8 | 7 | C: #3 / RSP 69.9; 89.2 mg/100 g (raw); serving RI unavailable<br>Potassium: #32 / RSP 30.8; 316 mg/100 g (raw); serving RI unavailable<br>B6: #34 / RSP 10.3; 0.175 mg/100 g (raw); serving RI unavailable |
| [Quinoa](../../docs/foods/quinoa.md) | 8 | 6 | Magnesium: #3 / RSP 67.5; 197 mg/100 g (raw); serving RI unavailable<br>B6: #9 / RSP 28.6; 0.487 mg/100 g (raw); serving RI unavailable<br>Iron: #9 / RSP 28.2; 4.6 mg/100 g (raw); serving RI unavailable |
| [Salmon Roe](../../docs/foods/salmon-roe.md) | 8 | 9 | B2: sole / RSP 100; 0.55 mg/100 g (salted); serving RI unavailable<br>B6: sole / RSP 100; 0.06 mg/100 g (salted); serving RI unavailable<br>C: sole / RSP 100; 6 mg/100 g (salted); serving RI unavailable |
| [Chickpeas](../../docs/foods/chickpeas.md) | 7 | 6 | B6: #1 / RSP 100; 0.535 mg/100 g (raw; dry-form); serving RI unavailable<br>Potassium: #6 / RSP 40; 718 mg/100 g (raw; dry-form); serving RI unavailable<br>Copper: #5 / RSP 39.6; 0.656 mg/100 g (raw; dry-form); serving RI unavailable |
| [Milk](../../docs/foods/milk.md) | 7 | 5 | B2: unranked / RSP unavailable; 0.169 mg/100 g (unspecified); serving RI unavailable<br>EAA: unranked / RSP unavailable; 1.4 g/100 g (unspecified); RI not established<br>Magnesium: unranked / RSP unavailable; 10 mg/100 g (unspecified); serving RI unavailable |
| [Mussels](../../docs/foods/mussels.md) | 7 | 4 | EAA: #4 / RSP 67.4; 7.4 g/85 g (cooked); RI not established<br>Iron: #12 / RSP 24.4; 4 mg/100 g (raw); serving RI unavailable<br>DHA: #5 / RSP 18.1; 253 mg/100 g (raw); RI not established |
| [Soy](../../docs/foods/soy.md) | 7 | 5 | Tyrosine: sole / RSP 100; 1.5 g/100 g (raw; dry-form); RI not established<br>Choline: #1 / RSP 100; 115.9 mg/100 g (raw; dry-form); serving RI unavailable<br>Iron: #1 / RSP 100; 15.7 mg/100 g (raw; dry-form); serving RI unavailable |
| [Tempeh](../../docs/foods/tempeh.md) | 7 | 5 | Copper: unranked / RSP unavailable; 0.56 mg/100 g (unspecified); serving RI unavailable<br>Iron: unranked / RSP unavailable; 2.7 mg/100 g (unspecified); serving RI unavailable<br>Magnesium: unranked / RSP unavailable; 81 mg/100 g (unspecified); serving RI unavailable |
| [Tofu](../../docs/foods/tofu.md) | 7 | 6 | Tyrosine: sole / RSP 100; 0.701 g/100 g (raw); RI not established<br>EAA: #2 / RSP 82.2; 6.5 g/100 g (raw); RI not established<br>Magnesium: #11 / RSP 19.9; 58 mg/100 g (raw); serving RI unavailable |
| [Black Beans](../../docs/foods/black-beans.md) | 6 | 5 | Potassium: #2 / RSP 82.5; 1483 mg/100 g (raw; dry-form); serving RI unavailable<br>Magnesium: #4 / RSP 61.1; 171 mg/100 g (raw; dry-form); serving RI unavailable<br>B6: #6 / RSP 53.5; 0.286 mg/100 g (raw; dry-form); serving RI unavailable |


### BRS2
**89 unique foods | 274 distinct PM appearances | 16 unique target substances**

| Food | PM appearances | Unique targets | Main targets: rank / RSP / quantity / serving RI |
| --- | --- | --- | --- |
| [Broccoli](../../docs/foods/broccoli.md) | 7 | 8 | 5-MTHF: #3 / RSP 35.1; 101 µg/100 g (raw); RI not established<br>Potassium: #32 / RSP 30.8; 316 mg/100 g (raw); serving RI unavailable<br>Folate: #14 / RSP 13.2; 63 µg/100 g (raw); serving RI unavailable |
| [Chicken](../../docs/foods/chicken.md) | 7 | 4 | Methionine: #3 / RSP 71.4; 0.493 g/100 g (raw); RI not established<br>B6: #15 / RSP 20.6; 0.35 mg/100 g (raw); serving RI unavailable<br>Zinc: #20 / RSP 3.3; 1.3 mg/100 g (raw); serving RI unavailable |
| [Milk](../../docs/foods/milk.md) | 7 | 7 | B12: unranked / RSP unavailable; 0.45 µg/100 g (unspecified); serving RI unavailable<br>B2: unranked / RSP unavailable; 0.169 mg/100 g (unspecified); serving RI unavailable<br>Magnesium: unranked / RSP unavailable; 10 mg/100 g (unspecified); serving RI unavailable |
| [Quinoa](../../docs/foods/quinoa.md) | 7 | 7 | Magnesium: #3 / RSP 67.5; 197 mg/100 g (raw); serving RI unavailable<br>Folate: #5 / RSP 38.4; 184 µg/100 g (raw); serving RI unavailable<br>B6: #9 / RSP 28.6; 0.487 mg/100 g (raw); serving RI unavailable |
| [Salmon Roe](../../docs/foods/salmon-roe.md) | 7 | 8 | B12: sole / RSP 100; 47 µg/100 g (salted); serving RI unavailable<br>B2: sole / RSP 100; 0.55 mg/100 g (salted); serving RI unavailable<br>B6: sole / RSP 100; 0.06 mg/100 g (salted); serving RI unavailable |
| [Black Beans](../../docs/foods/black-beans.md) | 6 | 5 | Potassium: #2 / RSP 82.5; 1483 mg/100 g (raw; dry-form); serving RI unavailable<br>Folate: #2 / RSP 79.7; 444 µg/100 g (raw; dry-form); serving RI unavailable<br>Zinc: #4 / RSP 74.6; 3.6 mg/100 g (raw; dry-form); serving RI unavailable |
| [Chickpeas](../../docs/foods/chickpeas.md) | 6 | 5 | B6: #1 / RSP 100; 0.535 mg/100 g (raw; dry-form); serving RI unavailable<br>Folate: #1 / RSP 100; 557 µg/100 g (raw; dry-form); serving RI unavailable<br>Zinc: #6 / RSP 56.4; 2.8 mg/100 g (raw; dry-form); serving RI unavailable |
| [Chicory Root](../../docs/foods/chicory-root.md) | 6 | 4 | B6: sole / RSP 100; 0.241 mg/100 g (raw); serving RI unavailable<br>Folate: sole / RSP 100; 23 µg/100 g (raw); serving RI unavailable<br>Magnesium: sole / RSP 100; 22 mg/100 g (raw); serving RI unavailable |
| [Nori](../../docs/foods/nori.md) | 6 | 6 | B2: sole / RSP 100; 2.3 mg/100 g (dry); serving RI unavailable<br>B6: sole / RSP 100; 0.59 mg/100 g (dry); serving RI unavailable<br>Folate: sole / RSP 100; 1900 µg/100 g (dry); serving RI unavailable |
| [Spinach](../../docs/foods/spinach.md) | 6 | 8 | 5-MTHF: #1 / RSP 100; 288 µg/100 g (raw); RI not established<br>5-MTHF: #1 / RSP 100; 72.2 µg/100 g (raw); RI not established<br>Potassium: #7 / RSP 54.4; 558 mg/100 g (raw); serving RI unavailable |


### BRS3
**102 unique foods | 189 distinct PM appearances | 11 unique target substances**

| Food | PM appearances | Unique targets | Main targets: rank / RSP / quantity / serving RI |
| --- | --- | --- | --- |
| [Anchovies](../../docs/foods/anchovies.md) | 5 | 3 | DHA: #1 / RSP 100; 1292 mg/100 g (oil-packed); RI not established<br>EPA: #1 / RSP 100; 763 mg/100 g (oil-packed); RI not established<br>Selenium: #1 / RSP 100; 68.1 µg/100 g (oil-packed); serving RI unavailable |
| [Cockles](../../docs/foods/cockles.md) | 5 | 5 | Iron: #1 / RSP 100; 16.2 mg/100 g (raw); serving RI unavailable<br>DHA: RSP unavailable; amount/serving unavailable; RI not established<br>EPA: RSP unavailable; amount/serving unavailable; RI not established |
| [Mussels](../../docs/foods/mussels.md) | 5 | 5 | Selenium: #3 / RSP 31.8; 44.8 µg/100 g (raw); serving RI unavailable<br>Iron: #12 / RSP 24.4; 4 mg/100 g (raw); serving RI unavailable<br>EPA: #5 / RSP 20.9; 188 mg/100 g (raw); RI not established |
| [Oysters](../../docs/foods/oysters.md) | 5 | 5 | Zinc: #1 / RSP 100; 39.3 mg/100 g (raw); serving RI unavailable<br>Iron: #6 / RSP 28.5; 4.6 mg/100 g (raw); serving RI unavailable<br>EPA: #6 / RSP 19.7; 177 mg/100 g (raw); RI not established |
| [Salmon](../../docs/foods/salmon.md) | 5 | 3 | EPA: #2 / RSP 96; 862 mg/100 g (raw); RI not established<br>DHA: #2 / RSP 78.8; 1104 mg/100 g (raw); RI not established<br>Selenium: #13 / RSP 17; 24 µg/100 g (raw); serving RI unavailable |
| [Salmon Roe](../../docs/foods/salmon-roe.md) | 5 | 8 | B2: sole / RSP 100; 0.55 mg/100 g (salted); serving RI unavailable<br>C: sole / RSP 100; 6 mg/100 g (salted); serving RI unavailable<br>Copper: sole / RSP 100; 0.76 mg/100 g (salted); serving RI unavailable |
| [Sardines](../../docs/foods/sardines.md) | 5 | 3 | Selenium: #2 / RSP 77.4; 52.7 µg/100 g (oil-packed); serving RI unavailable<br>EPA: #2 / RSP 62; 473 mg/100 g (oil-packed); RI not established<br>DHA: #2 / RSP 39.4; 509 mg/100 g (oil-packed); RI not established |
| [Tuna](../../docs/foods/tuna.md) | 5 | 3 | DHA: #3 / RSP 63.5; 890 mg/100 g (raw); RI not established<br>EPA: #4 / RSP 31.5; 283 mg/100 g (raw); RI not established<br>Selenium: #6 / RSP 25.9; 36.5 µg/100 g (raw); serving RI unavailable |
| [Almonds](../../docs/foods/almonds.md) | 3 | 5 | B2: unranked / RSP unavailable; 1.1 mg/100 g (unspecified); serving RI unavailable<br>Copper: unranked / RSP unavailable; 1 mg/100 g (unspecified); serving RI unavailable<br>E: unranked / RSP unavailable; 25.6 mg/100 g (unspecified); serving RI unavailable |
| [Beef](../../docs/foods/beef.md) | 3 | 4 | Iron: #21 / RSP 12.9; 2.1 mg/100 g (raw); serving RI unavailable<br>Zinc: #3 / RSP 11.4; 4.5 mg/100 g (raw); serving RI unavailable<br>Selenium: #21 / RSP 11.2; 15.8 µg/100 g (raw); serving RI unavailable |


### BRS4
**71 unique foods | 97 distinct PM appearances | 12 unique target substances**

| Food | PM appearances | Unique targets | Main targets: rank / RSP / quantity / serving RI |
| --- | --- | --- | --- |
| [Almonds](../../docs/foods/almonds.md) | 2 | 5 | B2: unranked / RSP unavailable; 1.1 mg/100 g (unspecified); serving RI unavailable<br>Copper: unranked / RSP unavailable; 1 mg/100 g (unspecified); serving RI unavailable<br>E: unranked / RSP unavailable; 25.6 mg/100 g (unspecified); serving RI unavailable |
| [Beef](../../docs/foods/beef.md) | 2 | 3 | Iron: #21 / RSP 12.9; 2.1 mg/100 g (raw); serving RI unavailable<br>B2: #27 / RSP 5.3; 0.151 mg/100 g (raw); serving RI unavailable<br>Creatine: RSP unavailable; amount/serving unavailable; RI not established |
| [Beetroot](../../docs/foods/beetroot.md) | 2 | 2 | Manganese: #24 / RSP 9.7; 0.329 mg/100 g (raw); serving RI unavailable<br>Iron: #40 / RSP 4.9; 0.8 mg/100 g (raw); serving RI unavailable |
| [Black Beans](../../docs/foods/black-beans.md) | 2 | 3 | Copper: #4 / RSP 50.7; 0.841 mg/100 g (raw; dry-form); serving RI unavailable<br>Iron: #3 / RSP 32; 5 mg/100 g (raw; dry-form); serving RI unavailable<br>Manganese: #4 / RSP 25.5; 1.1 mg/100 g (raw; dry-form); serving RI unavailable |
| [Broccoli](../../docs/foods/broccoli.md) | 2 | 3 | Manganese: #34 / RSP 6.2; 0.21 mg/100 g (raw); serving RI unavailable<br>Iron: #43 / RSP 4.5; 0.73 mg/100 g (raw); serving RI unavailable<br>B2: #34 / RSP 4.1; 0.117 mg/100 g (raw); serving RI unavailable |
| [Cashews](../../docs/foods/cashews.md) | 2 | 3 | Manganese: #7 / RSP 48.7; 1.7 mg/100 g (raw); serving RI unavailable<br>Iron: #3 / RSP 41.2; 6.7 mg/100 g (raw); serving RI unavailable<br>Copper: #3 / RSP 22.5; 2.2 mg/100 g (raw); serving RI unavailable |
| [Chicken](../../docs/foods/chicken.md) | 2 | 2 | Methionine: #3 / RSP 71.4; 0.493 g/100 g (raw); RI not established<br>Iron: #37 / RSP 5.6; 0.9 mg/100 g (raw); serving RI unavailable |
| [Chickpeas](../../docs/foods/chickpeas.md) | 2 | 3 | Manganese: #1 / RSP 100; 4.2 mg/100 g (raw; dry-form); serving RI unavailable<br>Copper: #5 / RSP 39.6; 0.656 mg/100 g (raw; dry-form); serving RI unavailable<br>Iron: #6 / RSP 27.5; 4.3 mg/100 g (raw; dry-form); serving RI unavailable |
| [Eggs](../../docs/foods/eggs.md) | 2 | 2 | Methionine: #4 / RSP 55.1; 0.38 g/100 g (raw); RI not established<br>Iron: #24 / RSP 10.8; 1.8 mg/100 g (raw); serving RI unavailable |
| [Kale](../../docs/foods/kale.md) | 2 | 2 | Manganese: #12 / RSP 27.1; 0.92 mg/100 g (raw); serving RI unavailable<br>B2: #8 / RSP 12.2; 0.347 mg/100 g (raw); serving RI unavailable |


### BRS5
**58 unique foods | 67 distinct PM appearances | 8 unique target substances**

| Food | PM appearances | Unique targets | Main targets: rank / RSP / quantity / serving RI |
| --- | --- | --- | --- |
| [Asparagus](../../docs/foods/asparagus.md) | 2 | 1 | Inulin: sole / RSP 100; 1.3 g/100 g (raw); RI not established |
| [Black Beans](../../docs/foods/black-beans.md) | 2 | 2 | Zinc: #4 / RSP 74.6; 3.6 mg/100 g (raw; dry-form); serving RI unavailable<br>Resistant starch: unranked / RSP unavailable; 3–5 g/100 g (cooked; dry-weight); RI not established |
| [Cacao Powder](../../docs/foods/cacao-powder.md) | 2 | 2 | Zinc: #3 / RSP 87.2; 6.8 mg/100 g (dry); serving RI unavailable<br>Epicatechin: RSP unavailable; amount/serving unavailable; RI not established |
| [Cashews](../../docs/foods/cashews.md) | 2 | 2 | Linoleic acid: #3 / RSP 50; 7.8 g/100 g (raw); RI not established<br>Zinc: #2 / RSP 14.7; 5.8 mg/100 g (raw); serving RI unavailable |
| [Chickpeas](../../docs/foods/chickpeas.md) | 2 | 2 | Zinc: #6 / RSP 56.4; 2.8 mg/100 g (raw; dry-form); serving RI unavailable<br>Resistant starch: unranked / RSP unavailable; 3–5 g/100 g (cooked; dry-weight); RI not established |
| [Cocoa](../../docs/foods/cocoa.md) | 2 | 2 | Zinc: #3 / RSP 87.2; 6.8 mg/100 g (dry); serving RI unavailable<br>Epicatechin: RSP unavailable; amount/serving unavailable; RI not established |
| [Dark Chocolate](../../docs/foods/dark-chocolate.md) | 2 | 2 | Zinc: unranked / RSP unavailable; 3.3 mg/100 g (unspecified); serving RI unavailable<br>Epicatechin: RSP unavailable; amount/serving unavailable; RI not established |
| [Peanuts](../../docs/foods/peanuts.md) | 2 | 2 | Linoleic acid: #1 / RSP 100; 15.6 g/100 g (raw); RI not established<br>Zinc: #7 / RSP 8.3; 3.3 mg/100 g (raw); serving RI unavailable |
| [Pumpkin Seeds](../../docs/foods/pumpkin-seeds.md) | 2 | 2 | Zinc: #1 / RSP 100; 2.2 mg/28.35 g (dry); 20.1% RDA<br>Tryptophan: sole / RSP 100; 0.163 g/28.35 g (dry); RI not established |
| [Almonds](../../docs/foods/almonds.md) | 1 | 1 | Linoleic acid: unranked / RSP unavailable; 12.3 g/100 g (unspecified); RI not established |


### BRS6
**51 unique foods | 52 distinct PM appearances | 3 unique target substances**

| Food | PM appearances | Unique targets | Main targets: rank / RSP / quantity / serving RI |
| --- | --- | --- | --- |
| [Salmon Roe](../../docs/foods/salmon-roe.md) | 2 | 2 | DHA: sole / RSP 100; 2000 mg/100 g (salted); RI not established<br>Magnesium: sole / RSP 100; 95 mg/100 g (salted); serving RI unavailable |
| [Algal Oil](../../docs/foods/algal-oil.md) | 1 | 1 | DHA: RSP unavailable; amount/serving unavailable; RI not established |
| [Almonds](../../docs/foods/almonds.md) | 1 | 1 | Magnesium: unranked / RSP unavailable; 270 mg/100 g (unspecified); serving RI unavailable |
| [Amaranth](../../docs/foods/amaranth.md) | 1 | 1 | Magnesium: #2 / RSP 84.9; 248 mg/100 g (raw); serving RI unavailable |
| [Anchovies](../../docs/foods/anchovies.md) | 1 | 1 | DHA: #1 / RSP 100; 1292 mg/100 g (oil-packed); RI not established |
| [Bananas](../../docs/foods/bananas.md) | 1 | 1 | Resistant starch: unranked / RSP unavailable; 2.7–25.3 g/100 g (raw); RI not established |
| [Barley](../../docs/foods/barley.md) | 1 | 1 | Magnesium: unranked / RSP unavailable; 133 mg/100 g (unspecified); serving RI unavailable |
| [Beetroot](../../docs/foods/beetroot.md) | 1 | 1 | Magnesium: #32 / RSP 7.9; 23 mg/100 g (raw); serving RI unavailable |
| [Black Beans](../../docs/foods/black-beans.md) | 1 | 2 | Magnesium: #4 / RSP 61.1; 171 mg/100 g (raw; dry-form); serving RI unavailable<br>Resistant starch: unranked / RSP unavailable; 3–5 g/100 g (cooked; dry-weight); RI not established |
| [Broccoli](../../docs/foods/broccoli.md) | 1 | 1 | Magnesium: #38 / RSP 7.2; 21 mg/100 g (raw); serving RI unavailable |


### Cross-BRS · Circadian
**0 unique foods | 0 distinct PM appearances | 0 unique target substances**

No verified food relationship qualifies in this snapshot. Timing/light practices remain separate in Section C.

### Cross-BRS · Endocannabinoid
**43 unique foods | 47 distinct PM appearances | 3 unique target substances**

| Food | PM appearances | Unique targets | Main targets: rank / RSP / quantity / serving RI |
| --- | --- | --- | --- |
| [Cockles](../../docs/foods/cockles.md) | 2 | 3 | DHA: RSP unavailable; amount/serving unavailable; RI not established<br>EPA: RSP unavailable; amount/serving unavailable; RI not established<br>Zinc: RSP unavailable; amount/serving unavailable; serving RI unavailable |
| [Mussels](../../docs/foods/mussels.md) | 2 | 3 | EPA: #5 / RSP 20.9; 188 mg/100 g (raw); RI not established<br>DHA: #5 / RSP 18.1; 253 mg/100 g (raw); RI not established<br>Zinc: #18 / RSP 4.1; 1.6 mg/100 g (raw); serving RI unavailable |
| [Oysters](../../docs/foods/oysters.md) | 2 | 3 | Zinc: #1 / RSP 100; 39.3 mg/100 g (raw); serving RI unavailable<br>EPA: #6 / RSP 19.7; 177 mg/100 g (raw); RI not established<br>DHA: #6 / RSP 9.7; 136 mg/100 g (raw); RI not established |
| [Salmon Roe](../../docs/foods/salmon-roe.md) | 2 | 3 | DHA: sole / RSP 100; 2000 mg/100 g (salted); RI not established<br>EPA: sole / RSP 100; 1600 mg/100 g (salted); RI not established<br>Zinc: sole / RSP 100; 2.1 mg/100 g (salted); serving RI unavailable |
| [Algal Oil](../../docs/foods/algal-oil.md) | 1 | 2 | DHA: RSP unavailable; amount/serving unavailable; RI not established<br>EPA: RSP unavailable; amount/serving unavailable; RI not established |
| [Anchovies](../../docs/foods/anchovies.md) | 1 | 2 | DHA: #1 / RSP 100; 1292 mg/100 g (oil-packed); RI not established<br>EPA: #1 / RSP 100; 763 mg/100 g (oil-packed); RI not established |
| [Beef](../../docs/foods/beef.md) | 1 | 1 | Zinc: #3 / RSP 11.4; 4.5 mg/100 g (raw); serving RI unavailable |
| [Black Beans](../../docs/foods/black-beans.md) | 1 | 1 | Zinc: #4 / RSP 74.6; 3.6 mg/100 g (raw; dry-form); serving RI unavailable |
| [Broccoli](../../docs/foods/broccoli.md) | 1 | 1 | Zinc: #45 / RSP 1; 0.41 mg/100 g (raw); serving RI unavailable |
| [Cacao Powder](../../docs/foods/cacao-powder.md) | 1 | 1 | Zinc: #3 / RSP 87.2; 6.8 mg/100 g (dry); serving RI unavailable |


### Cross-BRS · Hormones
**34 unique foods | 34 distinct PM appearances | 1 unique target substances**

| Food | PM appearances | Unique targets | Main targets: rank / RSP / quantity / serving RI |
| --- | --- | --- | --- |
| [Beef](../../docs/foods/beef.md) | 1 | 1 | Zinc: #3 / RSP 11.4; 4.5 mg/100 g (raw); serving RI unavailable |
| [Black Beans](../../docs/foods/black-beans.md) | 1 | 1 | Zinc: #4 / RSP 74.6; 3.6 mg/100 g (raw; dry-form); serving RI unavailable |
| [Broccoli](../../docs/foods/broccoli.md) | 1 | 1 | Zinc: #45 / RSP 1; 0.41 mg/100 g (raw); serving RI unavailable |
| [Cacao Powder](../../docs/foods/cacao-powder.md) | 1 | 1 | Zinc: #3 / RSP 87.2; 6.8 mg/100 g (dry); serving RI unavailable |
| [Cashews](../../docs/foods/cashews.md) | 1 | 1 | Zinc: #2 / RSP 14.7; 5.8 mg/100 g (raw); serving RI unavailable |
| [Cheddar Cheese](../../docs/foods/cheddar-cheese.md) | 1 | 1 | Zinc: unranked / RSP unavailable; 3.6 mg/100 g (unspecified); serving RI unavailable |
| [Chicken](../../docs/foods/chicken.md) | 1 | 1 | Zinc: #20 / RSP 3.3; 1.3 mg/100 g (raw); serving RI unavailable |
| [Chickpeas](../../docs/foods/chickpeas.md) | 1 | 1 | Zinc: #6 / RSP 56.4; 2.8 mg/100 g (raw; dry-form); serving RI unavailable |
| [Chicory Root](../../docs/foods/chicory-root.md) | 1 | 1 | Zinc: sole / RSP 100; 0.33 mg/100 g (raw); serving RI unavailable |
| [Cockles](../../docs/foods/cockles.md) | 1 | 1 | Zinc: RSP unavailable; amount/serving unavailable; serving RI unavailable |


## B — Consolidated food ranking

All 122 canonical foods are displayed; rows 1–20 are the top 20, followed directly by the remaining foods in the same table. Systems: 1–6 = BRS1–6; C = Circadian; E = Endocannabinoid; H = Hormones. Each target retains its own RSP and serving RI. No scores are combined.

| Food | PM appearances | Systems covered | Unique targets | Nutrient profile |
| --- | --- | --- | --- | --- |
| 1. [Salmon Roe](../../docs/foods/salmon-roe.md) | 28 | 1, 2, 3, 4, 5, 6, E, H | 15 | Choline: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>Copper: sole / RSP 100; 0.76 mg/100 g (salted); serving RI unavailable<br>DHA: sole / RSP 100; 2000 mg/100 g (salted); RI not established<br>EPA: sole / RSP 100; 1600 mg/100 g (salted); RI not established<br>Iron: sole / RSP 100; 2 mg/100 g (salted); serving RI unavailable<br>Magnesium: sole / RSP 100; 95 mg/100 g (salted); serving RI unavailable<br>PC: RSP unavailable; amount/serving unavailable; RI not established<br>A (RAE): sole / RSP 100; 330 µg/100 g (salted); serving RI unavailable<br>B12: sole / RSP 100; 47 µg/100 g (salted); serving RI unavailable<br>B2: sole / RSP 100; 0.55 mg/100 g (salted); serving RI unavailable<br>B6: sole / RSP 100; 0.06 mg/100 g (salted); serving RI unavailable<br>Folate: sole / RSP 100; 100 µg/100 g (salted); serving RI unavailable<br>C: sole / RSP 100; 6 mg/100 g (salted); serving RI unavailable<br>E: sole / RSP 100; 9.1 mg/100 g (salted); serving RI unavailable<br>Zinc: sole / RSP 100; 2.1 mg/100 g (salted); serving RI unavailable |
| 2. [Broccoli](../../docs/foods/broccoli.md) | 24 | 1, 2, 3, 4, 5, 6, E, H | 12 | 5-MTHF: #3 / RSP 35.1; 101 µg/100 g (raw); RI not established<br>Choline: #34 / RSP 2.3; 18.7 mg/100 g (raw); serving RI unavailable<br>Iron: #43 / RSP 4.5; 0.73 mg/100 g (raw); serving RI unavailable<br>Magnesium: #38 / RSP 7.2; 21 mg/100 g (raw); serving RI unavailable<br>Manganese: #34 / RSP 6.2; 0.21 mg/100 g (raw); serving RI unavailable<br>Potassium: #32 / RSP 30.8; 316 mg/100 g (raw); serving RI unavailable<br>Sulforaphane: RSP unavailable; amount/serving unavailable; RI not established<br>B2: #34 / RSP 4.1; 0.117 mg/100 g (raw); serving RI unavailable<br>B6: #34 / RSP 10.3; 0.175 mg/100 g (raw); serving RI unavailable<br>Folate: #14 / RSP 13.2; 63 µg/100 g (raw); serving RI unavailable<br>C: #3 / RSP 69.9; 89.2 mg/100 g (raw); serving RI unavailable<br>Zinc: #45 / RSP 1; 0.41 mg/100 g (raw); serving RI unavailable |
| 3. [Quinoa](../../docs/foods/quinoa.md) | 23 | 1, 2, 3, 4, 5, 6, E, H | 10 | Betaine: RSP unavailable; amount/serving unavailable; RI not established<br>Choline: #7 / RSP 8.6; 70.2 mg/100 g (raw); serving RI unavailable<br>EAA: #10 / RSP 11.1; 2.7 g/185 g (cooked); RI not established<br>Iron: #9 / RSP 28.2; 4.6 mg/100 g (raw); serving RI unavailable<br>Magnesium: #3 / RSP 67.5; 197 mg/100 g (raw); serving RI unavailable<br>Manganese: #4 / RSP 59.8; 2 mg/100 g (raw); serving RI unavailable<br>B2: #9 / RSP 11.2; 0.318 mg/100 g (raw); serving RI unavailable<br>B6: #9 / RSP 28.6; 0.487 mg/100 g (raw); serving RI unavailable<br>Folate: #5 / RSP 38.4; 184 µg/100 g (raw); serving RI unavailable<br>Zinc: #9 / RSP 7.9; 3.1 mg/100 g (raw); serving RI unavailable |
| 4. [Milk](../../docs/foods/milk.md) | 22 | 1, 2, 3, 4, 5, 6, E, H | 10 | FMN: RSP unavailable; amount/serving unavailable; RI not established<br>EAA: unranked / RSP unavailable; 1.4 g/100 g (unspecified); RI not established<br>Magnesium: unranked / RSP unavailable; 10 mg/100 g (unspecified); serving RI unavailable<br>Nicotinamide riboside: RSP unavailable; amount/serving unavailable; RI not established<br>PLP: RSP unavailable; amount/serving unavailable; RI not established<br>Potassium: unranked / RSP unavailable; 132 mg/100 g (unspecified); serving RI unavailable<br>Uridine: RSP unavailable; amount/serving unavailable; RI not established<br>B12: unranked / RSP unavailable; 0.45 µg/100 g (unspecified); serving RI unavailable<br>B2: unranked / RSP unavailable; 0.169 mg/100 g (unspecified); serving RI unavailable<br>Zinc: unranked / RSP unavailable; 0.37 mg/100 g (unspecified); serving RI unavailable |
| 5. [Mussels](../../docs/foods/mussels.md) | 22 | 1, 2, 3, 4, 5, 6, E, H | 8 | DHA: #5 / RSP 18.1; 253 mg/100 g (raw); RI not established<br>EPA: #5 / RSP 20.9; 188 mg/100 g (raw); RI not established<br>EAA: #4 / RSP 67.4; 7.4 g/85 g (cooked); RI not established<br>Iron: #12 / RSP 24.4; 4 mg/100 g (raw); serving RI unavailable<br>PC: RSP unavailable; amount/serving unavailable; RI not established<br>Selenium: #3 / RSP 31.8; 44.8 µg/100 g (raw); serving RI unavailable<br>B12: #4 / RSP 20.2; 12 µg/100 g (raw); serving RI unavailable<br>Zinc: #18 / RSP 4.1; 1.6 mg/100 g (raw); serving RI unavailable |
| 6. [Chickpeas](../../docs/foods/chickpeas.md) | 21 | 1, 2, 3, 4, 5, 6, E, H | 10 | Copper: #5 / RSP 39.6; 0.656 mg/100 g (raw; dry-form); serving RI unavailable<br>EAA: #9 / RSP 25.1; 2.6 g/82 g (cooked); RI not established<br>Iron: #6 / RSP 27.5; 4.3 mg/100 g (raw; dry-form); serving RI unavailable<br>Magnesium: #6 / RSP 28.2; 79 mg/100 g (raw; dry-form); serving RI unavailable<br>Manganese: #1 / RSP 100; 4.2 mg/100 g (raw; dry-form); serving RI unavailable<br>Potassium: #6 / RSP 40; 718 mg/100 g (raw; dry-form); serving RI unavailable<br>Resistant starch: unranked / RSP unavailable; 3–5 g/100 g (cooked; dry-weight); RI not established<br>B6: #1 / RSP 100; 0.535 mg/100 g (raw; dry-form); serving RI unavailable<br>Folate: #1 / RSP 100; 557 µg/100 g (raw; dry-form); serving RI unavailable<br>Zinc: #6 / RSP 56.4; 2.8 mg/100 g (raw; dry-form); serving RI unavailable |
| 7. [Oysters](../../docs/foods/oysters.md) | 21 | 1, 2, 3, 4, 5, 6, E, H | 7 | DHA: #6 / RSP 9.7; 136 mg/100 g (raw); RI not established<br>EPA: #6 / RSP 19.7; 177 mg/100 g (raw); RI not established<br>Iron: #6 / RSP 28.5; 4.6 mg/100 g (raw); serving RI unavailable<br>PC: RSP unavailable; amount/serving unavailable; RI not established<br>Selenium: #17 / RSP 14; 19.7 µg/100 g (raw); serving RI unavailable<br>B12: #7 / RSP 14.8; 8.8 µg/100 g (raw); serving RI unavailable<br>Zinc: #1 / RSP 100; 39.3 mg/100 g (raw); serving RI unavailable |
| 8. [Black Beans](../../docs/foods/black-beans.md) | 20 | 1, 2, 3, 4, 5, 6, E, H | 9 | Copper: #4 / RSP 50.7; 0.841 mg/100 g (raw; dry-form); serving RI unavailable<br>Iron: #3 / RSP 32; 5 mg/100 g (raw; dry-form); serving RI unavailable<br>Magnesium: #4 / RSP 61.1; 171 mg/100 g (raw; dry-form); serving RI unavailable<br>Manganese: #4 / RSP 25.5; 1.1 mg/100 g (raw; dry-form); serving RI unavailable<br>Potassium: #2 / RSP 82.5; 1483 mg/100 g (raw; dry-form); serving RI unavailable<br>Resistant starch: unranked / RSP unavailable; 3–5 g/100 g (cooked; dry-weight); RI not established<br>B6: #6 / RSP 53.5; 0.286 mg/100 g (raw; dry-form); serving RI unavailable<br>Folate: #2 / RSP 79.7; 444 µg/100 g (raw; dry-form); serving RI unavailable<br>Zinc: #4 / RSP 74.6; 3.6 mg/100 g (raw; dry-form); serving RI unavailable |
| 9. [Chicken](../../docs/foods/chicken.md) | 20 | 1, 2, 3, 4, 5, E, H | 7 | EAA: #1 / RSP 100; 11.1 g/86 g (cooked); RI not established<br>Iron: #37 / RSP 5.6; 0.9 mg/100 g (raw); serving RI unavailable<br>Methionine: #3 / RSP 71.4; 0.493 g/100 g (raw); RI not established<br>Selenium: #23 / RSP 10.2; 14.4 µg/100 g (raw); serving RI unavailable<br>B12: #20 / RSP 0.523; 0.31 µg/100 g (raw); serving RI unavailable<br>B6: #15 / RSP 20.6; 0.35 mg/100 g (raw); serving RI unavailable<br>Zinc: #20 / RSP 3.3; 1.3 mg/100 g (raw); serving RI unavailable |
| 10. [Nori](../../docs/foods/nori.md) | 20 | 1, 2, 3, 4, 5, 6, E, H | 11 | Copper: sole / RSP 100; 0.55 mg/100 g (dry); serving RI unavailable<br>Iron: sole / RSP 100; 11 mg/100 g (dry); serving RI unavailable<br>Magnesium: sole / RSP 100; 300 mg/100 g (dry); serving RI unavailable<br>Selenium: sole / RSP 100; 9 µg/100 g (dry); serving RI unavailable<br>B12: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>B2: sole / RSP 100; 2.3 mg/100 g (dry); serving RI unavailable<br>B6: sole / RSP 100; 0.59 mg/100 g (dry); serving RI unavailable<br>Folate: sole / RSP 100; 1900 µg/100 g (dry); serving RI unavailable<br>C: sole / RSP 100; 210 mg/100 g (dry); serving RI unavailable<br>E: sole / RSP 100; 4.6 mg/100 g (dry); serving RI unavailable<br>Zinc: sole / RSP 100; 3.6 mg/100 g (dry); serving RI unavailable |
| 11. [Spinach](../../docs/foods/spinach.md) | 20 | 1, 2, 3, 4, 5, 6, E, H | 13 | 5-MTHF: #1 / RSP 100; 288 µg/100 g (raw); RI not established<br>5-MTHF: #1 / RSP 100; 72.2 µg/100 g (raw); RI not established<br>Betaine: RSP unavailable; amount/serving unavailable; RI not established<br>Copper: #31 / RSP 1.3; 0.13 mg/100 g (raw); serving RI unavailable<br>Iron: #17 / RSP 16.7; 2.7 mg/100 g (raw); serving RI unavailable<br>Magnesium: #8 / RSP 27.1; 79 mg/100 g (raw); serving RI unavailable<br>Manganese: #13 / RSP 26.4; 0.897 mg/100 g (raw); serving RI unavailable<br>Potassium: #7 / RSP 54.4; 558 mg/100 g (raw); serving RI unavailable<br>A (RAE): #6 / RSP 9.4; 469 µg/100 g (raw); serving RI unavailable<br>B2: #23 / RSP 6.7; 0.189 mg/100 g (raw); serving RI unavailable<br>B6: #32 / RSP 11.5; 0.195 mg/100 g (raw); serving RI unavailable<br>Folate: #4 / RSP 40.5; 194 µg/100 g (raw); serving RI unavailable<br>C: #17 / RSP 22; 28.1 mg/100 g (raw); serving RI unavailable<br>Zinc: #36 / RSP 1.3; 0.53 mg/100 g (raw); serving RI unavailable |
| 12. [Chicory Root](../../docs/foods/chicory-root.md) | 19 | 1, 2, 3, 4, 5, 6, E, H | 8 | Copper: sole / RSP 100; 0.077 mg/100 g (raw); serving RI unavailable<br>Iron: sole / RSP 100; 0.8 mg/100 g (raw); serving RI unavailable<br>Magnesium: sole / RSP 100; 22 mg/100 g (raw); serving RI unavailable<br>Selenium: sole / RSP 100; 0.7 µg/100 g (raw); serving RI unavailable<br>B6: sole / RSP 100; 0.241 mg/100 g (raw); serving RI unavailable<br>Folate: sole / RSP 100; 23 µg/100 g (raw); serving RI unavailable<br>C: sole / RSP 100; 5 mg/100 g (raw); serving RI unavailable<br>Zinc: sole / RSP 100; 0.33 mg/100 g (raw); serving RI unavailable |
| 13. [Cockles](../../docs/foods/cockles.md) | 19 | 1, 2, 3, 4, 5, 6, E, H | 6 | DHA: RSP unavailable; amount/serving unavailable; RI not established<br>EPA: RSP unavailable; amount/serving unavailable; RI not established<br>Iron: #1 / RSP 100; 16.2 mg/100 g (raw); serving RI unavailable<br>Selenium: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>B12: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>Zinc: RSP unavailable; amount/serving unavailable; serving RI unavailable |
| 14. [Eggs](../../docs/foods/eggs.md) | 19 | 1, 2, 3, 4, 5, E, H | 7 | Choline: #3 / RSP 35.8; 293.8 mg/100 g (raw); serving RI unavailable<br>Glutamate: RSP unavailable; amount/serving unavailable; RI not established<br>EAA: #6 / RSP 43.1; 2.8 g/50 g (cooked); RI not established<br>Iron: #24 / RSP 10.8; 1.8 mg/100 g (raw); serving RI unavailable<br>Methionine: #4 / RSP 55.1; 0.38 g/100 g (raw); RI not established<br>Selenium: #10 / RSP 21.8; 30.7 µg/100 g (raw); serving RI unavailable<br>Zinc: #21 / RSP 3.3; 1.3 mg/100 g (raw); serving RI unavailable |
| 15. [Peanuts](../../docs/foods/peanuts.md) | 19 | 1, 2, 3, 4, 5, 6, E, H | 8 | Copper: #5 / RSP 11.7; 1.1 mg/100 g (raw); serving RI unavailable<br>EAA: sole / RSP 100; 2.1 g/28.35 g (roasted); RI not established<br>Linoleic acid: #1 / RSP 100; 15.6 g/100 g (raw); RI not established<br>Magnesium: #4 / RSP 57.5; 168 mg/100 g (raw); serving RI unavailable<br>Manganese: #5 / RSP 56.9; 1.9 mg/100 g (raw); serving RI unavailable<br>Folate: #3 / RSP 50.1; 240 µg/100 g (raw); serving RI unavailable<br>E: #1 / RSP 100; 8.3 mg/100 g (raw); serving RI unavailable<br>Zinc: #7 / RSP 8.3; 3.3 mg/100 g (raw); serving RI unavailable |
| 16. [Beef](../../docs/foods/beef.md) | 18 | 1, 2, 3, 4, 5, E, H | 9 | Creatine: RSP unavailable; amount/serving unavailable; RI not established<br>Glutamate: RSP unavailable; amount/serving unavailable; RI not established<br>EAA: #5 / RSP 57.1; 6.2 g/85 g (cooked); RI not established<br>Iron: #21 / RSP 12.9; 2.1 mg/100 g (raw); serving RI unavailable<br>Selenium: #21 / RSP 11.2; 15.8 µg/100 g (raw); serving RI unavailable<br>B12: #12 / RSP 3.7; 2.2 µg/100 g (raw); serving RI unavailable<br>B2: #27 / RSP 5.3; 0.151 mg/100 g (raw); serving RI unavailable<br>B6: #18 / RSP 20.4; 0.346 mg/100 g (raw); serving RI unavailable<br>Zinc: #3 / RSP 11.4; 4.5 mg/100 g (raw); serving RI unavailable |
| 17. [Tofu](../../docs/foods/tofu.md) | 18 | 1, 2, 3, 4, 5, 6 | 10 | Choline: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>Copper: #12 / RSP 3.9; 0.378 mg/100 g (raw); serving RI unavailable<br>Glutamate: RSP unavailable; amount/serving unavailable; RI not established<br>EAA: #2 / RSP 82.2; 6.5 g/100 g (raw); RI not established<br>Iron: #18 / RSP 16.4; 2.7 mg/100 g (raw); serving RI unavailable<br>Linoleic acid: #4 / RSP 27.9; 4.3 g/100 g (raw); RI not established<br>Magnesium: #11 / RSP 19.9; 58 mg/100 g (raw); serving RI unavailable<br>Manganese: #10 / RSP 34.7; 1.2 mg/100 g (raw); serving RI unavailable<br>Selenium: #20 / RSP 12.3; 17.4 µg/100 g (raw); serving RI unavailable<br>Tyrosine: sole / RSP 100; 0.701 g/100 g (raw); RI not established |
| 18. [Almonds](../../docs/foods/almonds.md) | 16 | 1, 2, 3, 4, 5, 6 | 8 | Copper: unranked / RSP unavailable; 1 mg/100 g (unspecified); serving RI unavailable<br>EAA: #3 / RSP 79.6; 1.8 g/28.35 g (raw); RI not established<br>Iron: unranked / RSP unavailable; 3.7 mg/100 g (unspecified); serving RI unavailable<br>Linoleic acid: unranked / RSP unavailable; 12.3 g/100 g (unspecified); RI not established<br>Magnesium: unranked / RSP unavailable; 270 mg/100 g (unspecified); serving RI unavailable<br>Manganese: unranked / RSP unavailable; 2.2 mg/100 g (unspecified); serving RI unavailable<br>B2: unranked / RSP unavailable; 1.1 mg/100 g (unspecified); serving RI unavailable<br>E: unranked / RSP unavailable; 25.6 mg/100 g (unspecified); serving RI unavailable |
| 19. [Broccoli Sprouts](../../docs/foods/broccoli-sprouts.md) | 16 | 1, 2, 3, 4, 6 | 7 | Iron: #46 / RSP 3.7; 0.6 mg/100 g (raw); serving RI unavailable<br>Magnesium: #22 / RSP 9.9; 29 mg/100 g (raw); serving RI unavailable<br>Potassium: #52 / RSP 21.5; 220 mg/100 g (raw); serving RI unavailable<br>Sulforaphane: RSP unavailable; amount/serving unavailable; RI not established<br>B6: #42 / RSP 8.2; 0.14 mg/100 g (raw); serving RI unavailable<br>Folate: #30 / RSP 7.7; 37 µg/100 g (raw); serving RI unavailable<br>C: #9 / RSP 33.7; 43 mg/100 g (raw); serving RI unavailable |
| 20. [Pumpkin Seeds](../../docs/foods/pumpkin-seeds.md) | 16 | 1, 2, 3, 4, 5, 6, E, H | 6 | EAA: #1 / RSP 100; 3.2 g/28.35 g (dry); RI not established<br>Iron: #8 / RSP 3.7; 2.5 mg/28.35 g (dry); 13.9% RDA<br>Magnesium: #1 / RSP 100; 167.8 mg/28.35 g (dry); 40% RDA<br>Tryptophan: sole / RSP 100; 0.163 g/28.35 g (dry); RI not established<br>Tyrosine: sole / RSP 100; 0.31 g/28.35 g (dry); RI not established<br>Zinc: #1 / RSP 100; 2.2 mg/28.35 g (dry); 20.1% RDA |
| 21. [Salmon](../../docs/foods/salmon.md) | 16 | 1, 2, 3, 4, 6, E | 6 | DHA: #2 / RSP 78.8; 1104 mg/100 g (raw); RI not established<br>EPA: #2 / RSP 96; 862 mg/100 g (raw); RI not established<br>EAA: #2 / RSP 72.8; 8 g/85 g (cooked); RI not established<br>Methionine: #2 / RSP 90.7; 0.626 g/100 g (raw); RI not established<br>Selenium: #13 / RSP 17; 24 µg/100 g (raw); serving RI unavailable<br>B12: #10 / RSP 5.4; 3.2 µg/100 g (raw); serving RI unavailable |
| 22. [Sardines](../../docs/foods/sardines.md) | 16 | 1, 2, 3, 4, 6, E | 6 | DHA: #2 / RSP 39.4; 509 mg/100 g (oil-packed); RI not established<br>EPA: #2 / RSP 62; 473 mg/100 g (oil-packed); RI not established<br>EAA: sole / RSP 100; 10.4 g/100 g (oil-packed); RI not established<br>Methionine: sole / RSP 100; 1.1 g/100 g (oil-packed); RI not established<br>Selenium: #2 / RSP 77.4; 52.7 µg/100 g (oil-packed); serving RI unavailable<br>B12: #1 / RSP 100; 8.9 µg/100 g (oil-packed); serving RI unavailable |
| 23. [Soy](../../docs/foods/soy.md) | 16 | 1, 2, 3, 4, 5 | 6 | Choline: #1 / RSP 100; 115.9 mg/100 g (raw; dry-form); serving RI unavailable<br>Iron: #1 / RSP 100; 15.7 mg/100 g (raw; dry-form); serving RI unavailable<br>Tryptophan: sole / RSP 100; 0.591 g/100 g (raw; dry-form); RI not established<br>Tyrosine: sole / RSP 100; 1.5 g/100 g (raw; dry-form); RI not established<br>B6: #3 / RSP 70.5; 0.377 mg/100 g (raw; dry-form); serving RI unavailable<br>Folate: #4 / RSP 67.3; 375 µg/100 g (raw; dry-form); serving RI unavailable |
| 24. [Tempeh](../../docs/foods/tempeh.md) | 16 | 1, 2, 3, 4, 5, 6 | 7 | Choline: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>Copper: unranked / RSP unavailable; 0.56 mg/100 g (unspecified); serving RI unavailable<br>Iron: unranked / RSP unavailable; 2.7 mg/100 g (unspecified); serving RI unavailable<br>Linoleic acid: unranked / RSP unavailable; 4.1 g/100 g (unspecified); RI not established<br>Magnesium: unranked / RSP unavailable; 81 mg/100 g (unspecified); serving RI unavailable<br>Manganese: unranked / RSP unavailable; 1.3 mg/100 g (unspecified); serving RI unavailable<br>Tyrosine: unranked / RSP unavailable; 0.664 g/100 g (unspecified); RI not established |
| 25. [Cashews](../../docs/foods/cashews.md) | 15 | 1, 2, 3, 4, 5, 6, E, H | 6 | Copper: #3 / RSP 22.5; 2.2 mg/100 g (raw); serving RI unavailable<br>Iron: #3 / RSP 41.2; 6.7 mg/100 g (raw); serving RI unavailable<br>Linoleic acid: #3 / RSP 50; 7.8 g/100 g (raw); RI not established<br>Magnesium: #1 / RSP 100; 292 mg/100 g (raw); serving RI unavailable<br>Manganese: #7 / RSP 48.7; 1.7 mg/100 g (raw); serving RI unavailable<br>Zinc: #2 / RSP 14.7; 5.8 mg/100 g (raw); serving RI unavailable |
| 26. [Sourdough Bread](../../docs/foods/sourdough-bread.md) | 15 | 1, 2, 3, 4, 5, 6, E, H | 6 | Copper: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>Iron: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>Magnesium: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>Manganese: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>Potassium: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>Zinc: RSP unavailable; amount/serving unavailable; serving RI unavailable |
| 27. [Tuna](../../docs/foods/tuna.md) | 15 | 1, 2, 3, 4, 6, E | 6 | Creatine: RSP unavailable; amount/serving unavailable; RI not established<br>DHA: #3 / RSP 63.5; 890 mg/100 g (raw); RI not established<br>EPA: #4 / RSP 31.5; 283 mg/100 g (raw); RI not established<br>EAA: #1 / RSP 100; 7.9 g/100 g (raw); RI not established<br>Methionine: #1 / RSP 100; 0.69 g/100 g (raw); RI not established<br>Selenium: #6 / RSP 25.9; 36.5 µg/100 g (raw); serving RI unavailable |
| 28. [Beetroot](../../docs/foods/beetroot.md) | 14 | 1, 2, 3, 4, 6 | 6 | Betaine: sole / RSP 100; 129 mg/100 g (raw); RI not established<br>Iron: #40 / RSP 4.9; 0.8 mg/100 g (raw); serving RI unavailable<br>Magnesium: #32 / RSP 7.9; 23 mg/100 g (raw); serving RI unavailable<br>Manganese: #24 / RSP 9.7; 0.329 mg/100 g (raw); serving RI unavailable<br>Potassium: #28 / RSP 31.7; 325 mg/100 g (raw); serving RI unavailable<br>Folate: #8 / RSP 22.8; 109 µg/100 g (raw); serving RI unavailable |
| 29. [Cacao Powder](../../docs/foods/cacao-powder.md) | 14 | 1, 2, 3, 4, 5, 6, E, H | 4 | Epicatechin: RSP unavailable; amount/serving unavailable; RI not established<br>Iron: #6 / RSP 5.8; 13.9 mg/100 g (dry); serving RI unavailable<br>Magnesium: #2 / RSP 84.3; 499 mg/100 g (dry); serving RI unavailable<br>Zinc: #3 / RSP 87.2; 6.8 mg/100 g (dry); serving RI unavailable |
| 30. [Cocoa](../../docs/foods/cocoa.md) | 14 | 1, 2, 3, 4, 5, 6, E, H | 4 | Epicatechin: RSP unavailable; amount/serving unavailable; RI not established<br>Iron: #6 / RSP 5.8; 13.9 mg/100 g (dry); serving RI unavailable<br>Magnesium: #2 / RSP 84.3; 499 mg/100 g (dry); serving RI unavailable<br>Zinc: #3 / RSP 87.2; 6.8 mg/100 g (dry); serving RI unavailable |
| 31. [Dark Chocolate](../../docs/foods/dark-chocolate.md) | 14 | 1, 2, 3, 4, 5, 6, E, H | 4 | Epicatechin: RSP unavailable; amount/serving unavailable; RI not established<br>Iron: unranked / RSP unavailable; 11.9 mg/100 g (unspecified); serving RI unavailable<br>Magnesium: unranked / RSP unavailable; 228 mg/100 g (unspecified); serving RI unavailable<br>Zinc: unranked / RSP unavailable; 3.3 mg/100 g (unspecified); serving RI unavailable |
| 32. [Lupin Beans](../../docs/foods/lupin-beans.md) | 14 | 1, 2, 3, 4, 5, 6, E, H | 4 | Arginine: sole / RSP 100; 3.9 g/100 g (raw; dry-form); RI not established<br>Iron: #4 / RSP 27.8; 4.4 mg/100 g (raw; dry-form); serving RI unavailable<br>Magnesium: #2 / RSP 70.7; 198 mg/100 g (raw; dry-form); serving RI unavailable<br>Zinc: #2 / RSP 97.1; 4.8 mg/100 g (raw; dry-form); serving RI unavailable |
| 33. [Nutritional Yeast](../../docs/foods/nutritional-yeast.md) | 14 | 1, 2, 3, 4, 5, E, H | 4 | B12: sole / RSP 100; 2.2 µg/5 g (dry); 91.7% RDA<br>B2: sole / RSP 100; 0.9 mg/5 g (dry); 69.2% RDA<br>B6: sole / RSP 100; 1.7 mg/5 g (dry); 130.8% RDA<br>Zinc: sole / RSP 100; 6 mg/5 g (dry); 54.5% RDA |
| 34. [Oats](../../docs/foods/oats.md) | 14 | 1, 2, 3, 4, 5, 6, E, H | 5 | Copper: unranked / RSP unavailable; 0.626 mg/100 g (unspecified); serving RI unavailable<br>EAA: #11 / RSP 7.8; 2.4 g/234 g (cooked); RI not established<br>Iron: unranked / RSP unavailable; 4.7 mg/100 g (unspecified); serving RI unavailable<br>Magnesium: unranked / RSP unavailable; 177 mg/100 g (unspecified); serving RI unavailable<br>Zinc: unranked / RSP unavailable; 4 mg/100 g (unspecified); serving RI unavailable |
| 35. [Lentils](../../docs/foods/lentils.md) | 13 | 1, 2, 3, 4, 5, E, H | 5 | Cysteine: RSP unavailable; amount/serving unavailable; RI not established<br>EAA: #8 / RSP 25.7; 3.3 g/99 g (cooked); RI not established<br>Iron: #4 / RSP 40.2; 6.5 mg/100 g (raw); serving RI unavailable<br>Folate: #1 / RSP 100; 479 µg/100 g (raw); serving RI unavailable<br>Zinc: #7 / RSP 8.3; 3.3 mg/100 g (raw); serving RI unavailable |
| 36. [Liver](../../docs/foods/liver.md) | 13 | 1, 2, 3, 4, 5 | 6 | Choline: #2 / RSP 40.6; 333.3 mg/100 g (raw); serving RI unavailable<br>Creatine: RSP unavailable; amount/serving unavailable; RI not established<br>Iron: #5 / RSP 30.2; 4.9 mg/100 g (raw); serving RI unavailable<br>A (RAE): #1 / RSP 100; 4968 µg/100 g (raw); serving RI unavailable<br>B12: #1 / RSP 100; 59.3 µg/100 g (raw); serving RI unavailable<br>Folate: #2 / RSP 60.5; 290 µg/100 g (raw); serving RI unavailable |
| 37. [Sunflower Seeds](../../docs/foods/sunflower-seeds.md) | 13 | 1, 2, 3, 4, 5, 6 | 7 | Copper: #5 / RSP 29.5; 0.504 mg/28 g (dry); 56% RDA<br>EAA: #2 / RSP 76.9; 2.4 g/28 g (dry); RI not established<br>Linoleic acid: #1 / RSP 100; 6.5 g/28 g (dry); RI not established<br>Magnesium: #6 / RSP 54.9; 91 mg/28 g (dry); 21.7% RDA<br>Manganese: #7 / RSP 24.8; 0.546 mg/28 g (dry); 23.7% AI<br>Selenium: #2 / RSP 96; 14.8 µg/28 g (dry); 27% RDA<br>E: #1 / RSP 100; 9.8 mg/28 g (dry); 65.7% RDA |
| 38. [Turkey](../../docs/foods/turkey.md) | 13 | 1, 2, 3, 4, 5 | 5 | EAA: #3 / RSP 72.3; 7.9 g/85 g (cooked); RI not established<br>Selenium: #14 / RSP 16; 22.6 µg/100 g (raw); serving RI unavailable<br>Tryptophan: sole / RSP 100; 0.241 g/100 g (raw); RI not established<br>B12: #15 / RSP 2.1; 1.2 µg/100 g (raw); serving RI unavailable<br>B6: #5 / RSP 38.4; 0.652 mg/100 g (raw); serving RI unavailable |
| 39. [Wheat](../../docs/foods/wheat.md) | 13 | 1, 2, 3, 4, 5, 6, E, H | 3 | Iron: unranked / RSP unavailable; 3.2 mg/100 g (unspecified); serving RI unavailable<br>Magnesium: unranked / RSP unavailable; 126 mg/100 g (unspecified); serving RI unavailable<br>Zinc: unranked / RSP unavailable; 2.6 mg/100 g (unspecified); serving RI unavailable |
| 40. [Whole Grains](../../docs/foods/whole-grains.md) | 13 | 1, 2, 3, 4, 5, 6, E, H | 3 | Iron: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>Magnesium: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>Zinc: RSP unavailable; amount/serving unavailable; serving RI unavailable |
| 41. [Greek Yogurt](../../docs/foods/greek-yogurt.md) | 12 | 1, 2, 3, 5, 6, E, H | 3 | Magnesium: unranked / RSP unavailable; 11 mg/100 g (unspecified); serving RI unavailable<br>Potassium: unranked / RSP unavailable; 141 mg/100 g (unspecified); serving RI unavailable<br>Zinc: unranked / RSP unavailable; 0.52 mg/100 g (unspecified); serving RI unavailable |
| 42. [Kidney Beans](../../docs/foods/kidney-beans.md) | 12 | 1, 2, 3, 4, 6 | 4 | EAA: #7 / RSP 26.7; 3 g/88.5 g (cooked); RI not established<br>Iron: #2 / RSP 52.2; 8.2 mg/100 g (raw; dry-form); serving RI unavailable<br>Magnesium: #5 / RSP 50; 140 mg/100 g (raw; dry-form); serving RI unavailable<br>Folate: #3 / RSP 70.7; 394 µg/100 g (raw; dry-form); serving RI unavailable |
| 43. [Swiss Chard](../../docs/foods/swiss-chard.md) | 12 | 1, 2, 3, 4, 5, 6 | 5 | 5-MTHF: #2 / RSP 84; 242 µg/100 g (raw); RI not established<br>Iron: #22 / RSP 11.1; 1.8 mg/100 g (raw); serving RI unavailable<br>Magnesium: #7 / RSP 27.7; 81 mg/100 g (raw); serving RI unavailable<br>A (RAE): #11 / RSP 6.2; 306 µg/100 g (raw); serving RI unavailable<br>Folate: #50 / RSP 2.9; 14 µg/100 g (raw); serving RI unavailable |
| 44. [Anchovies](../../docs/foods/anchovies.md) | 11 | 1, 3, 6, E | 4 | DHA: #1 / RSP 100; 1292 mg/100 g (oil-packed); RI not established<br>EPA: #1 / RSP 100; 763 mg/100 g (oil-packed); RI not established<br>Selenium: #1 / RSP 100; 68.1 µg/100 g (oil-packed); serving RI unavailable<br>Sodium: #1 / RSP 100; 3668 mg/100 g (oil-packed); RI not established |
| 45. [Cheddar Cheese](../../docs/foods/cheddar-cheese.md) | 11 | 1, 2, 3, 5, E, H | 5 | EAA: unranked / RSP unavailable; 9.3 g/100 g (unspecified); RI not established<br>Selenium: unranked / RSP unavailable; 28.5 µg/100 g (unspecified); serving RI unavailable<br>Tyrosine: unranked / RSP unavailable; 1.1 g/100 g (unspecified); RI not established<br>B12: unranked / RSP unavailable; 1.1 µg/100 g (unspecified); serving RI unavailable<br>Zinc: unranked / RSP unavailable; 3.6 mg/100 g (unspecified); serving RI unavailable |
| 46. [Potatoes](../../docs/foods/potatoes.md) | 11 | 1, 2, 3, 5, 6 | 4 | Potassium: #12 / RSP 41.5; 425 mg/100 g (raw); serving RI unavailable<br>Resistant starch: unranked / RSP unavailable; 2.2–5.4 g/100 g (oil; moisture-corrected); RI not established<br>B6: #20 / RSP 17.5; 0.298 mg/100 g (raw); serving RI unavailable<br>C: #20 / RSP 15.4; 19.7 mg/100 g (raw); serving RI unavailable |
| 47. [Bananas](../../docs/foods/bananas.md) | 10 | 1, 2, 5, 6 | 3 | Potassium: #22 / RSP 34.9; 358 mg/100 g (raw); serving RI unavailable<br>Resistant starch: unranked / RSP unavailable; 2.7–25.3 g/100 g (raw); RI not established<br>B6: #14 / RSP 21.6; 0.367 mg/100 g (raw); serving RI unavailable |
| 48. [Kale](../../docs/foods/kale.md) | 10 | 1, 2, 3, 4, 5 | 6 | 5-MTHF: #5 / RSP 18.8; 54 µg/100 g (raw); RI not established<br>5-MTHF: #2 / RSP 92.8; 67 µg/100 g (raw); RI not established<br>Manganese: #12 / RSP 27.1; 0.92 mg/100 g (raw); serving RI unavailable<br>A (RAE): #12 / RSP 4.9; 241 µg/100 g (raw); serving RI unavailable<br>B2: #8 / RSP 12.2; 0.347 mg/100 g (raw); serving RI unavailable<br>Folate: #15 / RSP 12.9; 62 µg/100 g (raw); serving RI unavailable<br>C: #2 / RSP 73.1; 93.4 mg/100 g (raw); serving RI unavailable |
| 49. [Lamb](../../docs/foods/lamb.md) | 10 | 1, 2, 3, 4, 5, E, H | 3 | Creatine: RSP unavailable; amount/serving unavailable; RI not established<br>Iron: #29 / RSP 9.6; 1.6 mg/100 g (raw); serving RI unavailable<br>Zinc: #5 / RSP 8.7; 3.4 mg/100 g (raw); serving RI unavailable |
| 50. [Sesame Seeds](../../docs/foods/sesame-seeds.md) | 10 | 1, 2, 3, 4, 5, 6 | 4 | Copper: #2 / RSP 66.9; 4.1 mg/100 g (dry); serving RI unavailable<br>Iron: #5 / RSP 6.1; 14.6 mg/100 g (dry); serving RI unavailable<br>Linoleic acid: #2 / RSP 92.7; 21.4 g/100 g (dry); RI not established<br>Magnesium: #4 / RSP 59.3; 351 mg/100 g (dry); serving RI unavailable |
| 51. [Walnuts](../../docs/foods/walnuts.md) | 10 | 1, 2, 3, 4, 5, 6 | 4 | Copper: unranked / RSP unavailable; 1.6 mg/100 g (unspecified); serving RI unavailable<br>Linoleic acid: unranked / RSP unavailable; 38.1 g/100 g (unspecified); RI not established<br>Magnesium: unranked / RSP unavailable; 158 mg/100 g (unspecified); serving RI unavailable<br>Manganese: unranked / RSP unavailable; 3.4 mg/100 g (unspecified); serving RI unavailable |
| 52. [Amaranth](../../docs/foods/amaranth.md) | 9 | 1, 2, 3, 4, 6 | 2 | Iron: #2 / RSP 47; 7.6 mg/100 g (raw); serving RI unavailable<br>Magnesium: #2 / RSP 84.9; 248 mg/100 g (raw); serving RI unavailable |
| 53. [Chia Seeds](../../docs/foods/chia-seeds.md) | 9 | 1, 2, 3, 4, 5, 6 | 3 | Linoleic acid: #4 / RSP 25.3; 5.8 g/100 g (dry); RI not established<br>Magnesium: #5 / RSP 56.6; 335 mg/100 g (dry); serving RI unavailable<br>Manganese: #5 / RSP 34.6; 2.7 mg/100 g (dry); serving RI unavailable |
| 54. [Crab](../../docs/foods/crab.md) | 9 | 2, 3, 5, E, H | 3 | Selenium: unranked / RSP unavailable; 60 µg/100 g (unspecified); serving RI unavailable<br>B12: unranked / RSP unavailable; 2.2 µg/100 g (unspecified); serving RI unavailable<br>Zinc: unranked / RSP unavailable; 3.4 mg/100 g (unspecified); serving RI unavailable |
| 55. [Flax Seeds](../../docs/foods/flax-seeds.md) | 9 | 1, 2, 3, 4, 5, 6 | 3 | Linoleic acid: unranked / RSP unavailable; 5.9 g/100 g (unspecified); RI not established<br>Magnesium: unranked / RSP unavailable; 392 mg/100 g (unspecified); serving RI unavailable<br>Manganese: unranked / RSP unavailable; 2.5 mg/100 g (unspecified); serving RI unavailable |
| 56. [Trout Roe](../../docs/foods/trout-roe.md) | 9 | 1, 2, 3, 6, E | 4 | Choline: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>DHA: RSP unavailable; amount/serving unavailable; RI not established<br>EPA: RSP unavailable; amount/serving unavailable; RI not established<br>PC: RSP unavailable; amount/serving unavailable; RI not established |
| 57. [Duck Fat](../../docs/foods/duck-fat.md) | 8 | 1, 2, 3, 4 | 3 | Choline: unranked / RSP unavailable; 122.4 mg/100 g (unspecified); serving RI unavailable<br>Selenium: unranked / RSP unavailable; 0.2 µg/100 g (unspecified); serving RI unavailable<br>E: unranked / RSP unavailable; 2.7 mg/100 g (unspecified); serving RI unavailable |
| 58. [Egg Yolks](../../docs/foods/egg-yolks.md) | 8 | 1, 2, 3, 4, 5 | 3 | Choline: #1 / RSP 100; 820.2 mg/100 g (raw); serving RI unavailable<br>A (RAE): #9 / RSP 7.7; 381 µg/100 g (raw); serving RI unavailable<br>E: #5 / RSP 31; 2.6 mg/100 g (raw); serving RI unavailable |
| 59. [Chlorella](../../docs/foods/chlorella.md) | 7 | 1, 2, 3, 4 | 2 | Iron: #1 / RSP 100; 240 mg/100 g (dry); serving RI unavailable<br>B12: #1 / RSP 100; 300 µg/100 g (dry); serving RI unavailable |
| 60. [Clams](../../docs/foods/clams.md) | 7 | 1, 2, 3, 4 | 2 | Iron: #27 / RSP 10; 1.6 mg/100 g (raw); serving RI unavailable<br>B12: #5 / RSP 19; 11.3 µg/100 g (raw); serving RI unavailable |
| 61. [Edamame](../../docs/foods/edamame.md) | 7 | 1, 2, 3, 4 | 2 | Iron: unranked / RSP unavailable; 2.1 mg/100 g (unspecified); serving RI unavailable<br>Folate: unranked / RSP unavailable; 303 µg/100 g (unspecified); serving RI unavailable |
| 62. [Shrimp](../../docs/foods/shrimp.md) | 7 | 2, 3, 5, E, H | 2 | Selenium: #12 / RSP 21; 29.6 µg/100 g (raw); serving RI unavailable<br>Zinc: #27 / RSP 2.5; 0.97 mg/100 g (raw); serving RI unavailable |
| 63. [Wheat Germ](../../docs/foods/wheat-germ.md) | 7 | 1, 2, 3, 4 | 3 | Betaine: RSP unavailable; amount/serving unavailable; RI not established<br>Choline: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>E: RSP unavailable; amount/serving unavailable; serving RI unavailable |
| 64. [Algal Oil](../../docs/foods/algal-oil.md) | 6 | 1, 3, 6, E | 2 | DHA: RSP unavailable; amount/serving unavailable; RI not established<br>EPA: RSP unavailable; amount/serving unavailable; RI not established |
| 65. [Barley](../../docs/foods/barley.md) | 6 | 1, 2, 6 | 1 | Magnesium: unranked / RSP unavailable; 133 mg/100 g (unspecified); serving RI unavailable |
| 66. [Buckwheat](../../docs/foods/buckwheat.md) | 6 | 1, 2, 6 | 1 | Magnesium: unranked / RSP unavailable; 231 mg/100 g (unspecified); serving RI unavailable |
| 67. [Herring](../../docs/foods/herring.md) | 6 | 1, 3, 6, E | 2 | DHA: #4 / RSP 61.5; 862 mg/100 g (raw); RI not established<br>EPA: #3 / RSP 79; 709 mg/100 g (raw); RI not established |
| 68. [Lumpfish Roe](../../docs/foods/lumpfish-roe.md) | 6 | 1, 3, 6, E | 2 | DHA: RSP unavailable; amount/serving unavailable; RI not established<br>EPA: RSP unavailable; amount/serving unavailable; RI not established |
| 69. [Mackerel](../../docs/foods/mackerel.md) | 6 | 1, 3, 6, E | 2 | DHA: #1 / RSP 100; 1401 mg/100 g (raw); RI not established<br>EPA: #1 / RSP 100; 898 mg/100 g (raw); RI not established |
| 70. [Pork](../../docs/foods/pork.md) | 6 | 2, 3, 4, 5, E, H | 2 | Creatine: RSP unavailable; amount/serving unavailable; RI not established<br>Zinc: #15 / RSP 4.4; 1.7 mg/100 g (raw); serving RI unavailable |
| 71. [Seaweed](../../docs/foods/seaweed.md) | 6 | 1, 2, 6 | 1 | Magnesium: RSP unavailable; amount/serving unavailable; serving RI unavailable |
| 72. [Avocado](../../docs/foods/avocado.md) | 5 | 1, 2, 3, 4 | 2 | Potassium: #10 / RSP 47.3; 485 mg/100 g (raw); serving RI unavailable<br>E: #9 / RSP 24.8; 2.1 mg/100 g (raw); serving RI unavailable |
| 73. [Dark-Meat Poultry](../../docs/foods/dark-meat-poultry.md) | 5 | 1, 3, 4 | 1 | Iron: RSP unavailable; amount/serving unavailable; serving RI unavailable |
| 74. [Heart](../../docs/foods/heart.md) | 5 | 1, 3, 4 | 1 | Iron: #11 / RSP 26.6; 4.3 mg/100 g (raw); serving RI unavailable |
| 75. [Kidney](../../docs/foods/kidney.md) | 5 | 1, 3, 4 | 1 | Iron: #7 / RSP 28.4; 4.6 mg/100 g (raw); serving RI unavailable |
| 76. [Mankai (Duckweed)](../../docs/foods/mankai.md) | 5 | 1, 3, 4 | 1 | Iron: RSP unavailable; amount/serving unavailable; serving RI unavailable |
| 77. [Scallops](../../docs/foods/scallops.md) | 5 | 2, 3 | 2 | Selenium: #25 / RSP 9.1; 12.8 µg/100 g (raw); serving RI unavailable<br>B12: #14 / RSP 2.4; 1.4 µg/100 g (raw); serving RI unavailable |
| 78. [Spirulina](../../docs/foods/spirulina.md) | 5 | 1, 3, 4 | 1 | Iron: #4 / RSP 11.9; 28.5 mg/100 g (dry); serving RI unavailable |
| 79. [Watermelon](../../docs/foods/watermelon.md) | 5 | 1, 2, 3, 4 | 3 | Arginine: sole / RSP 100; 0.059 g/100 g (raw); RI not established<br>Potassium: #72 / RSP 10.9; 112 mg/100 g (raw); serving RI unavailable<br>C: #30 / RSP 6.3; 8.1 mg/100 g (raw); serving RI unavailable |
| 80. [Asparagus](../../docs/foods/asparagus.md) | 4 | 2, 5 | 2 | Inulin: sole / RSP 100; 1.3 g/100 g (raw); RI not established<br>Folate: #20 / RSP 10.9; 52 µg/100 g (raw); serving RI unavailable |
| 81. [Blueberries](../../docs/foods/blueberries.md) | 4 | 1, 3, 4 | 2 | Manganese: #23 / RSP 9.9; 0.336 mg/100 g (raw); serving RI unavailable<br>C: #27 / RSP 7.6; 9.7 mg/100 g (raw); serving RI unavailable |
| 82. [Brussels Sprouts](../../docs/foods/brussels-sprouts.md) | 4 | 1, 2, 3 | 2 | Folate: #17 / RSP 12.7; 61 µg/100 g (raw); serving RI unavailable<br>C: #4 / RSP 66.6; 85 mg/100 g (raw); serving RI unavailable |
| 83. [Butter](../../docs/foods/butter.md) | 4 | 3, 4, 5 | 2 | A (RAE): unranked / RSP unavailable; 684 µg/100 g (unspecified); serving RI unavailable<br>E: unranked / RSP unavailable; 2.3 mg/100 g (unspecified); serving RI unavailable |
| 84. [Cabbage](../../docs/foods/cabbage.md) | 4 | 1, 2, 3 | 2 | Folate: #25 / RSP 9; 43 µg/100 g (raw); serving RI unavailable<br>C: #13 / RSP 28.7; 36.6 mg/100 g (raw); serving RI unavailable |
| 85. [Cauliflower](../../docs/foods/cauliflower.md) | 4 | 1, 2, 3 | 3 | 5-MTHF: #4 / RSP 31.9; 92 µg/100 g (raw); RI not established<br>Folate: #19 / RSP 11.9; 57 µg/100 g (raw); serving RI unavailable<br>C: #8 / RSP 37.7; 48.2 mg/100 g (raw); serving RI unavailable |
| 86. [Ghee](../../docs/foods/ghee.md) | 4 | 3, 4, 5 | 2 | A (RAE): sole / RSP 100; 840 µg/100 g (oil); serving RI unavailable<br>E: #4 / RSP 19.5; 2.8 mg/100 g (oil); serving RI unavailable |
| 87. [Grass-Fed Butter](../../docs/foods/grass-fed-butter.md) | 4 | 3, 5 | 2 | Selenium: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>A (RAE): RSP unavailable; amount/serving unavailable; serving RI unavailable |
| 88. [Green Tea](../../docs/foods/green-tea.md) | 4 | 1, 2, 3, 4 | 2 | Manganese: unranked / RSP unavailable; 0.184 mg/100 g (unspecified); serving RI unavailable<br>Potassium: unranked / RSP unavailable; 8 mg/100 g (unspecified); serving RI unavailable |
| 89. [Oranges](../../docs/foods/oranges.md) | 4 | 1, 2, 3 | 2 | Folate: #31 / RSP 6.3; 30 µg/100 g (raw); serving RI unavailable<br>C: #6 / RSP 41.7; 53.2 mg/100 g (raw); serving RI unavailable |
| 90. [Parsley](../../docs/foods/parsley.md) | 4 | 1, 2, 3 | 2 | Folate: #1 / RSP 100; 152 µg/100 g (fresh); serving RI unavailable<br>C: #1 / RSP 100; 133 mg/100 g (fresh); serving RI unavailable |
| 91. [Pomegranates](../../docs/foods/pomegranates.md) | 4 | 1, 2, 3 | 2 | Potassium: #47 / RSP 23; 236 mg/100 g (raw); serving RI unavailable<br>C: #24 / RSP 8; 10.2 mg/100 g (raw); serving RI unavailable |
| 92. [Raspberries](../../docs/foods/raspberries.md) | 4 | 1, 2, 3 | 2 | Folate: #38 / RSP 4.4; 21 µg/100 g (raw); serving RI unavailable<br>C: #19 / RSP 20.5; 26.2 mg/100 g (raw); serving RI unavailable |
| 93. [Soy Lecithin](../../docs/foods/soy-lecithin.md) | 4 | 1, 2 | 2 | Choline: #1 / RSP 100; 350 mg/100 g (oil); serving RI unavailable<br>PC: RSP unavailable; amount/serving unavailable; RI not established |
| 94. [Strawberries](../../docs/foods/strawberries.md) | 4 | 1, 2, 3 | 2 | Folate: #36 / RSP 5; 24 µg/100 g (raw); serving RI unavailable<br>C: #5 / RSP 46; 58.8 mg/100 g (raw); serving RI unavailable |
| 95. [Sunflower Lecithin](../../docs/foods/sunflower-lecithin.md) | 4 | 1, 2 | 2 | Choline: RSP unavailable; amount/serving unavailable; serving RI unavailable<br>PC: RSP unavailable; amount/serving unavailable; RI not established |
| 96. [Sweet Potatoes](../../docs/foods/sweet-potatoes.md) | 4 | 1, 2, 3 | 2 | Potassium: #25 / RSP 32.9; 337 mg/100 g (raw); serving RI unavailable<br>C: #48 / RSP 1.9; 2.4 mg/100 g (raw); serving RI unavailable |
| 97. [Tomatoes](../../docs/foods/tomatoes.md) | 4 | 1, 2, 3 | 2 | Potassium: #45 / RSP 23.1; 237 mg/100 g (raw); serving RI unavailable<br>C: #22 / RSP 10.7; 13.7 mg/100 g (raw); serving RI unavailable |
| 98. [Avocado Oil](../../docs/foods/avocado-oil.md) | 3 | 3, 4 | 1 | E: RSP unavailable; amount/serving unavailable; serving RI unavailable |
| 99. [Capers](../../docs/foods/capers.md) | 3 | 1 | 1 | Sodium: unranked / RSP unavailable; 2348 mg/100 g (unspecified); RI not established |
| 100. [Miso](../../docs/foods/miso.md) | 3 | 1 | 1 | Sodium: unranked / RSP unavailable; 3728 mg/100 g (unspecified); RI not established |
| 101. [Peas](../../docs/foods/peas.md) | 3 | 2, 5 | 2 | Pea-fibre arabinan: RSP unavailable; amount/serving unavailable; RI not established<br>Folate: #12 / RSP 13.6; 65 µg/100 g (raw); serving RI unavailable |
| 102. [Romaine Lettuce](../../docs/foods/romaine-lettuce.md) | 3 | 2, 5 | 2 | A (RAE): #7 / RSP 8.8; 436 µg/100 g (raw); serving RI unavailable<br>Folate: #7 / RSP 28.4; 136 µg/100 g (raw); serving RI unavailable |
| 103. [Vinegar Pickles](../../docs/foods/vinegar-pickles.md) | 3 | 1 | 1 | Sodium: unranked / RSP unavailable; 809 mg/100 g (unspecified); RI not established |
| 104. [White/Button Mushroom](../../docs/foods/mushrooms.md) | 3 | 3 | 1 | Selenium: #27 / RSP 6.6; 9.3 µg/100 g (raw); serving RI unavailable |
| 105. [Apples](../../docs/foods/apples.md) | 2 | 1, 3 | 1 | C: #41 / RSP 3.6; 4.6 mg/100 g (raw); serving RI unavailable |
| 106. [Bell Peppers](../../docs/foods/bell-peppers.md) | 2 | 1, 3 | 1 | C: #1 / RSP 100; 127.7 mg/100 g (raw); serving RI unavailable |
| 107. [Black Tea](../../docs/foods/black-tea.md) | 2 | 3, 4 | 1 | Manganese: unranked / RSP unavailable; 0.219 mg/100 g (unspecified); serving RI unavailable |
| 108. [Carrots](../../docs/foods/carrots.md) | 2 | 1, 2 | 1 | Potassium: #29 / RSP 31.2; 320 mg/100 g (raw); serving RI unavailable |
| 109. [Cherries](../../docs/foods/cherries.md) | 2 | 1, 3 | 1 | C: #34 / RSP 5.5; 7 mg/100 g (raw); serving RI unavailable |
| 110. [Cranberries](../../docs/foods/cranberries.md) | 2 | 1, 3 | 1 | C: #21 / RSP 11; 14 mg/100 g (raw); serving RI unavailable |
| 111. [Fortified Plant Milks](../../docs/foods/fortified-plant-milks.md) | 2 | 2 | 1 | B12: RSP unavailable; amount/serving unavailable; serving RI unavailable |
| 112. [Garlic](../../docs/foods/garlic.md) | 2 | 3, 4 | 1 | Manganese: #6 / RSP 49.2; 1.7 mg/100 g (raw); serving RI unavailable |
| 113. [Grapes](../../docs/foods/grapes.md) | 2 | 1, 2 | 1 | Potassium: #57 / RSP 18.6; 191 mg/100 g (raw); serving RI unavailable |
| 114. [Jerusalem Artichokes](../../docs/foods/jerusalem-artichokes.md) | 2 | 1, 2 | 1 | Potassium: #11 / RSP 41.9; 429 mg/100 g (raw); serving RI unavailable |
| 115. [Lemon](../../docs/foods/lemon.md) | 2 | 1, 3 | 1 | C: #7 / RSP 41.5; 53 mg/100 g (raw); serving RI unavailable |
| 116. [Onions](../../docs/foods/onions.md) | 2 | 1, 3 | 1 | C: #33 / RSP 5.8; 7.4 mg/100 g (raw); serving RI unavailable |
| 117. [Parmesan Cheese](../../docs/foods/parmesan-cheese.md) | 2 | 1 | 1 | Tyrosine: unranked / RSP unavailable; 2 g/100 g (unspecified); RI not established |
| 118. [Tart Cherry](../../docs/foods/tart-cherry.md) | 2 | 1, 3 | 1 | C: #25 / RSP 7.8; 10 mg/100 g (raw); serving RI unavailable |
| 119. [Watercress](../../docs/foods/watercress.md) | 2 | 1, 3 | 1 | C: #9 / RSP 33.7; 43 mg/100 g (raw); serving RI unavailable |
| 120. [Cacao Nibs (Raw)](../../docs/foods/cacao-nibs-raw.md) | 1 | 5 | 1 | Epicatechin: RSP unavailable; amount/serving unavailable; RI not established |
| 121. [MCT Oil](../../docs/foods/mct-oil.md) | 1 | 4 | 1 | Caprylic Triglyceride: RSP unavailable; amount/serving unavailable; RI not established |
| 122. [Tahini](../../docs/foods/tahini.md) | 1 | 5 | 1 | Linoleic acid: sole / RSP 100; 23.1 g/100 g (roasted); RI not established |


### Concentration shortlist by substance and comparable state

Up to five leading accepted foods per comparison group with RSP ≥10; no quota is filled artificially. Denominators include all verified comparable foods in the reused composition extraction, so a listed food need not be rank #1. Alternatives below threshold remain in the full table above, with serving RI where available. Unknown-state and presence-only targets cannot support a concentration shortlist.

| Substance | Comparable state / basis | Leading foods (maximum five) |
| --- | --- | --- |
| 5-MTHF | raw; per 100 g fresh edible material | Spinach #1 / RSP 100; Swiss Chard #2 / RSP 84; Broccoli #3 / RSP 35.1; Cauliflower #4 / RSP 31.9; Kale #5 / RSP 18.8 |
| 5-MTHF | raw; per 100 g fresh material | Spinach #1 / RSP 100; Kale #2 / RSP 92.8 |
| Arginine | raw; per 100 g edible portion | Watermelon sole / RSP 100 |
| Arginine | raw; dry-form; per 100 g edible portion | Lupin Beans sole / RSP 100 |
| Betaine | raw; per 100 g edible portion | Beetroot sole / RSP 100 |
| Choline | oil; per 100 g edible portion | Soy Lecithin #1 / RSP 100 |
| Choline | raw; per 100 g edible portion | Egg Yolks #1 / RSP 100; Liver #2 / RSP 40.6; Eggs #3 / RSP 35.8 |
| Choline | raw; dry-form; per 100 g edible portion | Soy #1 / RSP 100 |
| Copper | dry; per 100 g edible dried, toasted nori; not a typical serving | Nori sole / RSP 100 |
| Copper | dry; per 100 g edible portion | Sesame Seeds #2 / RSP 66.9; Sunflower Seeds #5 / RSP 29.5 |
| Copper | raw; per 100 g edible portion | Cashews #3 / RSP 22.5; Peanuts #5 / RSP 11.7 |
| Copper | raw; dry-form; per 100 g edible portion | Black Beans #4 / RSP 50.7; Chickpeas #5 / RSP 39.6 |
| Copper | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| Copper | raw; per 100 g edible portion; dietary fibre does not include inulin | Chicory Root sole / RSP 100 |
| DHA | oil-packed; per 100 g edible portion | Anchovies #1 / RSP 100; Sardines #2 / RSP 39.4 |
| DHA | raw; per 100 g edible portion | Mackerel #1 / RSP 100; Salmon #2 / RSP 78.8; Tuna #3 / RSP 63.5; Herring #4 / RSP 61.5; Mussels #5 / RSP 18.1 |
| DHA | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| EPA | oil-packed; per 100 g edible portion | Anchovies #1 / RSP 100; Sardines #2 / RSP 62 |
| EPA | raw; per 100 g edible portion | Mackerel #1 / RSP 100; Salmon #2 / RSP 96; Herring #3 / RSP 79; Tuna #4 / RSP 31.5; Mussels #5 / RSP 20.9 |
| EPA | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| EAA | cooked; per 100 g edible portion | Chicken #1 / RSP 100; Salmon #2 / RSP 72.8; Turkey #3 / RSP 72.3; Mussels #4 / RSP 67.4; Beef #5 / RSP 57.1 |
| EAA | dry; per 100 g edible portion | Pumpkin Seeds #1 / RSP 100; Sunflower Seeds #2 / RSP 76.9 |
| EAA | oil-packed; per 100 g edible portion | Sardines sole / RSP 100 |
| EAA | raw; per 100 g edible portion | Tuna #1 / RSP 100; Tofu #2 / RSP 82.2; Almonds #3 / RSP 79.6 |
| EAA | roasted; per 100 g edible portion | Peanuts sole / RSP 100 |
| Inulin | raw; per 100 g dry matter | Asparagus sole / RSP 100 |
| Iron | dry; per 100 g edible dried, toasted nori; not a typical serving | Nori sole / RSP 100 |
| Iron | dry; per 100 g edible portion | Chlorella #1 / RSP 100; Spirulina #4 / RSP 11.9 |
| Iron | raw; per 100 g edible portion | Cockles #1 / RSP 100; Amaranth #2 / RSP 47; Cashews #3 / RSP 41.2; Lentils #4 / RSP 40.2; Liver #5 / RSP 30.2 |
| Iron | raw; dry-form; per 100 g edible portion | Soy #1 / RSP 100; Kidney Beans #2 / RSP 52.2; Black Beans #3 / RSP 32; Lupin Beans #4 / RSP 27.8; Chickpeas #6 / RSP 27.5 |
| Iron | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| Iron | raw; per 100 g edible portion; dietary fibre does not include inulin | Chicory Root sole / RSP 100 |
| Linoleic acid | dry; per 100 g edible portion | Sunflower Seeds #1 / RSP 100; Sesame Seeds #2 / RSP 92.7; Chia Seeds #4 / RSP 25.3 |
| Linoleic acid | raw; per 100 g edible portion | Peanuts #1 / RSP 100; Cashews #3 / RSP 50; Tofu #4 / RSP 27.9 |
| Linoleic acid | roasted; per 100 g edible portion | Tahini sole / RSP 100 |
| Magnesium | dry; per 100 g edible dried, toasted nori; not a typical serving | Nori sole / RSP 100 |
| Magnesium | dry; per 100 g edible portion | Pumpkin Seeds #1 / RSP 100; Cacao Powder #2 / RSP 84.3; Cocoa #2 / RSP 84.3; Sesame Seeds #4 / RSP 59.3; Chia Seeds #5 / RSP 56.6 |
| Magnesium | raw; per 100 g edible portion | Cashews #1 / RSP 100; Amaranth #2 / RSP 84.9; Quinoa #3 / RSP 67.5; Peanuts #4 / RSP 57.5; Swiss Chard #7 / RSP 27.7 |
| Magnesium | raw; dry-form; per 100 g edible portion | Lupin Beans #2 / RSP 70.7; Black Beans #4 / RSP 61.1; Kidney Beans #5 / RSP 50; Chickpeas #6 / RSP 28.2 |
| Magnesium | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| Magnesium | raw; per 100 g edible portion; dietary fibre does not include inulin | Chicory Root sole / RSP 100 |
| Manganese | dry; per 100 g edible portion | Chia Seeds #5 / RSP 34.6; Sunflower Seeds #7 / RSP 24.8 |
| Manganese | raw; per 100 g edible portion | Quinoa #4 / RSP 59.8; Peanuts #5 / RSP 56.9; Garlic #6 / RSP 49.2; Cashews #7 / RSP 48.7; Tofu #10 / RSP 34.7 |
| Manganese | raw; dry-form; per 100 g edible portion | Chickpeas #1 / RSP 100; Black Beans #4 / RSP 25.5 |
| Methionine | oil-packed; per 100 g edible portion | Sardines sole / RSP 100 |
| Methionine | raw; per 100 g edible portion | Tuna #1 / RSP 100; Salmon #2 / RSP 90.7; Chicken #3 / RSP 71.4; Eggs #4 / RSP 55.1 |
| Potassium | raw; per 100 g edible portion | Spinach #7 / RSP 54.4; Avocado #10 / RSP 47.3; Jerusalem Artichokes #11 / RSP 41.9; Potatoes #12 / RSP 41.5; Bananas #22 / RSP 34.9 |
| Potassium | raw; dry-form; per 100 g edible portion | Black Beans #2 / RSP 82.5; Chickpeas #6 / RSP 40 |
| Selenium | dry; per 100 g edible dried, toasted nori; not a typical serving | Nori sole / RSP 100 |
| Selenium | dry; per 100 g edible portion | Sunflower Seeds #2 / RSP 96 |
| Selenium | oil-packed; per 100 g edible portion | Anchovies #1 / RSP 100; Sardines #2 / RSP 77.4 |
| Selenium | raw; per 100 g edible portion | Mussels #3 / RSP 31.8; Tuna #6 / RSP 25.9; Eggs #10 / RSP 21.8; Shrimp #12 / RSP 21; Salmon #13 / RSP 17 |
| Selenium | raw; per 100 g edible portion; dietary fibre does not include inulin | Chicory Root sole / RSP 100 |
| Sodium | oil-packed; per 100 g edible portion | Anchovies #1 / RSP 100 |
| Tryptophan | dry; per 100 g edible portion | Pumpkin Seeds sole / RSP 100 |
| Tryptophan | raw; per 100 g edible portion | Turkey sole / RSP 100 |
| Tryptophan | raw; dry-form; per 100 g edible portion | Soy sole / RSP 100 |
| Tyrosine | dry; per 100 g edible portion | Pumpkin Seeds sole / RSP 100 |
| Tyrosine | raw; per 100 g edible portion | Tofu sole / RSP 100 |
| Tyrosine | raw; dry-form; per 100 g edible portion | Soy sole / RSP 100 |
| A (RAE) | oil; per 100 g edible portion | Ghee sole / RSP 100 |
| A (RAE) | raw; per 100 g edible portion | Liver #1 / RSP 100 |
| A (RAE) | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| B12 | dry; per 100 g dry product; the label serving is 5 g | Nutritional Yeast sole / RSP 100 |
| B12 | dry; per 100 g edible portion | Chlorella #1 / RSP 100 |
| B12 | oil-packed; per 100 g edible portion | Sardines #1 / RSP 100 |
| B12 | raw; per 100 g edible portion | Liver #1 / RSP 100; Mussels #4 / RSP 20.2; Clams #5 / RSP 19; Oysters #7 / RSP 14.8 |
| B12 | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| B2 | dry; per 100 g dry product; the label serving is 5 g | Nutritional Yeast sole / RSP 100 |
| B2 | dry; per 100 g edible dried, toasted nori; not a typical serving | Nori sole / RSP 100 |
| B2 | raw; per 100 g edible portion | Kale #8 / RSP 12.2; Quinoa #9 / RSP 11.2 |
| B2 | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| B6 | dry; per 100 g dry product; the label serving is 5 g | Nutritional Yeast sole / RSP 100 |
| B6 | dry; per 100 g edible dried, toasted nori; not a typical serving | Nori sole / RSP 100 |
| B6 | raw; per 100 g edible portion | Turkey #5 / RSP 38.4; Quinoa #9 / RSP 28.6; Bananas #14 / RSP 21.6; Chicken #15 / RSP 20.6; Beef #18 / RSP 20.4 |
| B6 | raw; dry-form; per 100 g edible portion | Chickpeas #1 / RSP 100; Soy #3 / RSP 70.5; Black Beans #6 / RSP 53.5 |
| B6 | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| B6 | raw; per 100 g edible portion; dietary fibre does not include inulin | Chicory Root sole / RSP 100 |
| Folate | dry; per 100 g edible dried, toasted nori; not a typical serving | Nori sole / RSP 100 |
| Folate | fresh; per 100 g edible portion | Parsley #1 / RSP 100 |
| Folate | raw; per 100 g edible portion | Lentils #1 / RSP 100; Liver #2 / RSP 60.5; Peanuts #3 / RSP 50.1; Spinach #4 / RSP 40.5; Quinoa #5 / RSP 38.4 |
| Folate | raw; dry-form; per 100 g edible portion | Chickpeas #1 / RSP 100; Black Beans #2 / RSP 79.7; Kidney Beans #3 / RSP 70.7; Soy #4 / RSP 67.3 |
| Folate | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| Folate | raw; per 100 g edible portion; dietary fibre does not include inulin | Chicory Root sole / RSP 100 |
| C | dry; per 100 g edible dried, toasted nori; not a typical serving | Nori sole / RSP 100 |
| C | fresh; per 100 g edible portion | Parsley #1 / RSP 100 |
| C | raw; per 100 g edible portion | Bell Peppers #1 / RSP 100; Kale #2 / RSP 73.1; Broccoli #3 / RSP 69.9; Brussels Sprouts #4 / RSP 66.6; Strawberries #5 / RSP 46 |
| C | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| C | raw; per 100 g edible portion; dietary fibre does not include inulin | Chicory Root sole / RSP 100 |
| E | dry; per 100 g edible dried, toasted nori; not a typical serving | Nori sole / RSP 100 |
| E | dry; per 100 g edible portion | Sunflower Seeds #1 / RSP 100 |
| E | oil; per 100 g edible portion | Ghee #4 / RSP 19.5 |
| E | raw; per 100 g edible portion | Peanuts #1 / RSP 100; Egg Yolks #5 / RSP 31; Avocado #9 / RSP 24.8 |
| E | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| Zinc | dry; per 100 g dry product; the label serving is 5 g | Nutritional Yeast sole / RSP 100 |
| Zinc | dry; per 100 g edible dried, toasted nori; not a typical serving | Nori sole / RSP 100 |
| Zinc | dry; per 100 g edible portion | Pumpkin Seeds #1 / RSP 100; Cacao Powder #3 / RSP 87.2; Cocoa #3 / RSP 87.2 |
| Zinc | raw; per 100 g edible portion | Oysters #1 / RSP 100; Cashews #2 / RSP 14.7; Beef #3 / RSP 11.4 |
| Zinc | raw; dry-form; per 100 g edible portion | Lupin Beans #2 / RSP 97.1; Black Beans #4 / RSP 74.6; Chickpeas #6 / RSP 56.4 |
| Zinc | salted; per 100 g edible portion | Salmon Roe sole / RSP 100 |
| Zinc | raw; per 100 g edible portion; dietary fibre does not include inulin | Chicory Root sole / RSP 100 |


### Mandatory reconciliation

All five prior PM counts reproduce exactly. Prior RSP values below are reproduced by the **old broader comparison groups**; the new report does not endorse comparisons between incompatible preparations.

| Food / target | PM count (confirmed) | Previously reported RSP | Prior grouping reproduced | State-qualified result |
| --- | --- | --- | --- | --- |
| Salmon Roe · DHA | 28 | 100 | 100 | sole / RSP 100 (salted) |
| Salmon Roe · EPA | 28 | 100 | 100 | sole / RSP 100 (salted) |
| Salmon Roe · B12 | 28 | 79.3 | 79.3 | sole / RSP 100 (salted) |
| Broccoli · C | 24 | 67.1 | 67.1 | #3 / RSP 69.9 (raw) |
| Broccoli · 5-MTHF | 24 | 35.1 | 35.1 | #3 / RSP 35.1 (raw) |
| Quinoa · Magnesium | 23 | 46 | 46 | #3 / RSP 67.5 (raw) |
| Quinoa · Folate | 23 | 38.4 | 38.4 | #5 / RSP 38.4 (raw) |
| Quinoa · B6 | 23 | 18.1 | 18.1 | #9 / RSP 28.6 (raw) |
| Mussels · EAA | 22 | 67.4 | 67.4 | #4 / RSP 67.4 (cooked) |
| Mussels · Selenium | 22 | 31.8 | 31.8 | #3 / RSP 31.8 (raw) |
| Oysters · Zinc | 21 | 100 | 100 | #1 / RSP 100 (raw) |
| Oysters · B12 | 21 | 14.8 | 14.8 | #7 / RSP 14.8 (raw) |


### Relationship and Related Substances safeguards

| Stored Type | Stored Direct/Derived | Distinct food-linked PM–input relationships |
| --- | --- | --- |
| A | derived | 23 |
| A | direct | 58 |
| B | direct | 6 |
| not recorded | derived | 1 |
| not recorded | direct | 10 |

These classifications are read unchanged from the canonical projection. “Not recorded” is a legacy metadata gap, not a newly granted Type A/B decision. Direct/Derived is relative to the receiving PM; it is separate from whether a food directly contains the measured dietary input. Upstream-source records remain dietary precursor measurements.

| Related pathway | Treatment in this report |
| --- | --- |
| Resistant starch → acetate / propionate / butyrate | No downstream metabolite quantity inferred. Bananas 2.7–25.3 g/100 g fresh weight; beans/chickpeas 3–5 g/100 g dry weight; potatoes 2.2–5.4 g/100 g moisture-corrected remain upstream starch spans. PM1 butyrate admission is unresolved and excluded. |
| Vitamin A → retinoic acid | Count admitted vitamin A food links only; unresolved retinoic-acid delivery is not an extra admission or food appearance. |
| Ellagitannins → ellagic acid | Registry pathway retained as context; PM6 projection-blocked atoms are excluded, not silently activated. |

The earlier report listed 1,490 observation rows while the canonical verified/admitted projections yield 1,482 after excluding the twelve blocked attachments. The eight additional observations are second oyster DHA/EPA records: DHA in BRS1-FM3-PM7, BRS1-FM5-PM12, BRS3-FM3-PM7, BRS3-FM3-PM8, BRS6-FM4-PM8 and BRS-X(ECS-PM2), plus EPA in BRS3-FM3-PM8 and BRS-X(ECS-PM2). They do **not** add distinct relationships or alter any of the 122 food appearance counts: every count agrees with the prior consolidated table. Projection rows, source observations and distinct food–PM pairs are different denominators.

### Serving provenance and quantitative limits

| Food | Documented portion / state | Source in canonical food record |
| --- | --- | --- |
| [Almonds](../../docs/foods/almonds.md) | 1 oz (23 whole kernels) = 28.35 g; raw | usda-sr-170567 · household row 86867 |
| [Beef](../../docs/foods/beef.md) | 3 oz = 85 g; cooked | usda-sr-174032 · household row 93665 |
| [Chicken](../../docs/foods/chicken.md) | 0.5 breast, bone and skin removed = 86 g; cooked | usda-sr-171477 · household row 88819 |
| [Chickpeas](../../docs/foods/chickpeas.md) | 0.5 cup = 82 g; cooked | usda-sr-173757 · household row 93226 |
| [Eggs](../../docs/foods/eggs.md) | 1 large = 50 g; cooked | usda-sr-173424 · household row 92500 |
| [Kidney Beans](../../docs/foods/kidney-beans.md) | 0.5 cup = 88.5 g; cooked | usda-sr-175194 · household row 95822 |
| [Lentils](../../docs/foods/lentils.md) | 0.5 cup = 99 g; cooked | usda-sr-172421 · household row 90596 |
| [Mussels](../../docs/foods/mussels.md) | 3 oz = 85 g; cooked | usda-sr-174217 · household row 93960 |
| [Nutritional Yeast](../../docs/foods/nutritional-yeast.md) | label serving = 5 g; dry | Marigold label |
| [Oats](../../docs/foods/oats.md) | 1 cup = 234 g; cooked | usda-sr-173905 · household row 93456 |
| [Peanuts](../../docs/foods/peanuts.md) | 1 oz = 28.35 g; roasted | usda-sr-173806 · household row 93281 |
| [Pumpkin Seeds](../../docs/foods/pumpkin-seeds.md) | 1 oz = 28.35 g; dry | usda-sr-170556 · household row 86848 |
| [Quinoa](../../docs/foods/quinoa.md) | 1 cup = 185 g; cooked | usda-sr-168917 · household row 83990 |
| [Salmon](../../docs/foods/salmon.md) | 3 oz = 85 g; cooked | usda-sr-175168 · household row 95788 |
| [Sunflower Seeds](../../docs/foods/sunflower-seeds.md) | 0.2 cup = 28 g; dry | usda-sr-170562 · household row 86856 |
| [Turkey](../../docs/foods/turkey.md) | 3 oz = 85 g; cooked | usda-sr-171496 · household row 88856 |


No default “100 g serving” is assigned. Missing portions prevent a complete serving-based food selection today; foods are not excluded for that reason. Ranges, qualitative links and unclear preparation remain visible rather than converted to point estimates. Multiple composition observations in a profile are alternatives, not additive.

## C — Patterns, SOPs and lifestyle

The existing inventory contains one admitted dietary-pattern input (meal carbohydrate-to-protein composition, BRS1-FM1-PM2), but no verified single-food projection for that meal relationship. It is not converted into an individual-food ranking.

SOPs and lifestyle records remain protocol- and population-specific. The inventory includes experimental supplementation and conditional practices; their presence in a structured list is not a blanket recommendation. Candidate adjudications, including unresolved and completed non-admissions, remain outside food ranking and do not generate extra food–PM appearances.

| Practice group | Examples retained from existing inventory | Interpretation boundary |
| --- | --- | --- |
| Preparation and food matrix | PM1 minced beef in older men; non-haem iron with ascorbate; phytate-reducing preparation; tested broccoli-sprout homogenate | Measured protocol and endpoint only; no universal food superiority. |
| Meal composition / timing | Carbohydrate–protein balance; tested meal ordering, early eating and defined meal timing | Meal-level exposure cannot be inferred from one food’s composition. |
| Dietary programmes | PM8 hypocaloric programme in adults with obesity; milled flaxseed in the tested diet; low-GI pattern in PCOS | Retain population, formulation and weight/energy context; do not attribute whole-pattern effects to each ingredient. |
| Conditional / experimental supplementation | DHA–UMP, magnesium-L-threonate, creatine, EPA+DHA | Separate from ordinary food supply and from general-use recommendations. |
| Lifestyle / circadian / autonomic | Timed light, evening-light comparisons, slow breathing, meditation, mindfulness and relevant sleep/exercise records | Do not convert these into food targets or nutritional percentages. |

The reused inventory reports 23 PMs with SOP atoms, 41 without, and 51 without lifestyle atoms. Empty lists do not establish that research is exhausted. See [existing protocol inventory and adjudications](03-patterns-sops-lifestyle.md) for exact IDs, sources and statuses. No new pattern, SOP or lifestyle admission is made here.

## Validation and decision limits

- All 64 canonical PM identities were enumerated; all seven canonical roll-up files were read. Nine system tables include the empty Circadian grouping.
- All 122 prior consolidated food counts reproduce; food–PM pairs are deduplicated, including repeated dietary-input rows. All profiles use only substances connected to the food and relevant system.
- Per-state RSP recalculated from verified point observations; ranges and missing forms stay unranked. Portion calculations use existing source-documented weights only. No RI percentage is capped.
- Historical/current mapper replay confirms 44/44 admitted PMs and identical sets of 124 admitted relationship IDs; independently derived verified-food and quantitative sets reproduce 39/36. No Stage 2A/2B, SEC, admissions, food records, generators or historical snapshots were changed. This is one report, not a new scientific or production ranking.
- Remaining decisions: document compatible portions for unserved records, resolve food-state ambiguity, and separately adjudicate existing projection blocks. These are not repaired by this report.
