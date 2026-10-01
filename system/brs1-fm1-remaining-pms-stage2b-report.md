# BRS1-FM1 PM1, PM2, PM4, PM5 — Stage 2B Report

Stage 2B is governed by the **2B — Dietary Input Traceability & Visibility
Contract**. No new literature search. Atoms use bibliography already on the PM
page, plus Kennedy 2016 and Spector 1978 already used on PM3 for PLP/B6.

PM1 and PM5 still have **no Stage 2A Scientific Findings**. PM2 and PM4 now have
Stage 2A Findings (`system/brs1-fm1-pm2-lat1-stage2a-report.md`;
`system/brs1-fm1-pm4-noradrenergic-stage2a-report.md`); their DIT atoms cite
those Findings. For PM1 and PM5, DIT atoms therefore cite `citation_keys` only. SOP and lifestyle YAML were not added: those records
require Finding ids. Legacy food-page SOP bullets and inherited KC1 constituent
lists were removed from the reader-facing §4.1–4.3 panels.

## Adjudication

| PM | Atom | Decision | Addressability | Claim ceiling | Evidence | Unsupported next step |
|----|------|----------|----------------|---------------|----------|------------------------|
| **PM1** | DIT-1 Indispensable amino-acid supply | Direct Dietary Requirement | `direct` | `dietary-provision` | Mariotti 2019; Moughan 2024 | Higher protein → brain monoamines or ADHD benefit |
| **PM1** | DIT-2 Dietary protein | Derived → IAA supply | `direct` | `dietary-provision` | Mariotti 2019; Moughan 2024 | Protein quantity as a neurotransmitter lever |
| **PM1** | DIT-3 Complementary plant-protein pairing | Derived → IAA supply | `direct` | `dietary-provision` | Mariotti 2019 | Pairing as a monoamine or ADHD intervention |
| **PM1** | DIT-4 Tyrosine | Direct substrate in this pool | `direct` | `dietary-provision` | Mariotti 2019; Aquili 2020 | Dietary tyrosine → brain dopamine/noradrenaline |
| **PM1** | DIT-5 Tryptophan | Direct substrate in this pool | `direct` | `dietary-provision` | Mariotti 2019; Aquili 2020 | Dietary tryptophan → brain serotonin |
| **PM2** | DIT-3 Meal carbohydrate-to-protein composition | Direct state-regulation | `direct` | `modulation-demonstrated` | Ashley 1985; Wurtman 2003; Fernstrom 2013; PM2-F1; PM2-F2 | Plasma-ratio change → brain transport, monoamines, Phenome or ADHD |
| **PM2** | DIT-1 Tyrosine | §3.1.2 biochemical cargo only | n/a | `biological-dependency` | Fernstrom 2013 | Eat more tyrosine to win LAT1 |
| **PM2** | DIT-2 Tryptophan | §3.1.2 biochemical cargo only | n/a | `biological-dependency` | Fernstrom 2013; Wurtman 2003; Ashley 1985 | Eat more tryptophan as a serotonin lever |
| **PM4** | DIT-1 Iron | Direct Dietary Requirement | `not-established` | `biological-dependency` | Beard 2003 | Extra iron → brain noradrenaline when replete |
| **PM4** | DIT-2 PLP | Direct Dietary Requirement | `not-established` | `biological-dependency` | Kennedy 2016 | Dietary PLP → noradrenaline |
| **PM4** | DIT-3 Vitamin B6 | Derived → PLP | `precursor-mediated` | `dietary-provision` | Kennedy 2016; Spector 1978 | Increased B6 → noradrenaline or attention benefit |
| **PM5** | DIT-1 Tryptophan | Direct Dietary Requirement | `direct` | `dietary-provision` | Fernstrom 2013; Tang 2025; Briguglio 2018 | More tryptophan → brain serotonin, mood or ADHD benefit |
| **PM5** | DIT-2 Dietary protein | Derived → tryptophan | `direct` | `dietary-provision` | Fernstrom 2013; Briguglio 2018 | Protein pattern as a serotonin lever |
| **PM5** | DIT-3 PLP | Direct Dietary Requirement | `not-established` | `biological-dependency` | Kennedy 2016; Tang 2025 | Dietary PLP → serotonin |
| **PM5** | DIT-4 Vitamin B6 | Derived → PLP | `precursor-mediated` | `dietary-provision` | Kennedy 2016; Spector 1978; Tang 2025 | Increased B6 → serotonin or mood benefit |

## Page-level ceilings

| PM | `dietary_addressability` | `claim_ceiling` |
|----|--------------------------|-----------------|
| PM1 | `direct` | `dietary-provision` |
| PM2 | `direct` | `modulation-demonstrated` |
| PM4 | `not-established` | `biological-dependency` |
| PM5 | `not-established` | `biological-dependency` |

PM2 now admits meal carbohydrate-to-protein composition as a Direct
state-regulation Dietary Requirement. See
`system/brs1-fm1-pm2-lat1-stage2b-report.md`. SOP is not used for that
relationship.

## Not admitted

- Food-source arrows (`← poultry, eggs…`) — Food architecture, not PM atoms.
- Inherited KC1 constituent lists on PM1/PM4/PM5 §4.1.3. PM2 publishes competitive-arm mapping without constituents.
- PM2 “B vitamins indirectly”.
- PM4 vitamin C, tyrosine-as-PM4-requirement, and exercise in §4.1.1.
- PM5 iron, folate, vitamin C, and fibre/gut-pattern as Dietary Requirements.
- Food-page SOP leftovers (chicken AGEs, mackerel EPA, lentil fermentation).

## Visibility

Legacy §4.1 / §4.2 / §4.3 headings are mapped to canonical `3.1.x` / `3.2` /
`3.3` presentation keys so green input disclosures work without reordering
Phenome and Levers.
