# BRS3 FM1–FM3 — Stage 2B Report

Stage 2B is governed by the **2B — Dietary Input Traceability & Visibility
Contract**. Eight PMs. PM1 §4.1.2 magnesium was independently evidence-reviewed
after the name-only rejection error. Other PMs still use bibliography already
on each page. None of these PMs has Stage 2A Scientific Findings. SOP/lifestyle
YAML was not added.

## Adjudication

| PM | Atom | Decision | Addressability | Claim ceiling | Evidence |
|----|------|----------|----------------|---------------|----------|
| **PM1** | — | No Direct/Derived Dietary Requirement after type-B (state-regulation) retest. Public dominance is `Lifestyle-Dominant`, not `Diet-Dominant` | page `not-established` | `biological-dependency` | Polyphenols and fibre not admitted; EPA/DHA Direct/Derived **NO**; SOP `conditional_supplementation` **NOT ESTABLISHED**; see `system/brs3-fm1-pm1-stage2b-report.md` |
| **PM1** | DIT-1 Magnesium ions (Mg²⁺) | §4.1.2 biochemical catalytic ion | n/a | `biological-dependency` | Mercurio 1997; Adams 2001; UniProt O14920 / Rhea 19073 |
| **PM2** | DIT-1 Fermentable fibre | Direct food component | `direct` | `dietary-provision` | Cavaliere 2022; Gruter 2023; Li 2024 |
| **PM2** | DIT-2 Butyrate | §3.1.2 biochemical metabolite | n/a | `biological-dependency` | Cavaliere 2022; Hoyles 2018 |
| **PM3** | — | No Direct/Derived Dietary Requirement | page `not-established` | `biological-dependency` | Sulforaphane is Nrf2 induction (modulation), not a requirement of Nrf2-ARE |
| **PM4** | DIT-1–4 Se, Zn, Cu, Mn | Direct cofactors of clearance enzymes | `not-established` | `biological-dependency` | Mocchegiani 2019; Verlaet 2019; Zhai 2015 |
| **PM4** | DIT-5 Glutathione | §3.1.2 biochemical | n/a | `biological-dependency` | Kurhan 2021; Dvorakova 2006 |
| **PM5** | DIT-1 Vitamin E | Direct nutrient for membrane lipid-peroxyl control | `not-established` | `biological-dependency` | Johnson 2014; Bulut 2007 |
| **PM6** | DIT-1 Vitamin C | Direct nutrient in the recycling network | `not-established` | `biological-dependency` | Packer 1997; Vertuani 2004 |
| **PM6** | DIT-2 Vitamin E | Direct nutrient in the recycling network | `not-established` | `biological-dependency` | Packer 1997; Klein 2011 |
| **PM7** | — | No Direct/Derived Dietary Requirement | page `not-established` | `biological-dependency` | EPA/DHA and polyphenols remain cytokine-modulation evidence, not requirements |
| **PM8** | DIT-1 EPA | Direct SPM substrate | `direct` | `dietary-provision` | Serhan 2011; Simopoulos 2011 |
| **PM8** | DIT-2 DHA | Direct SPM substrate | `direct` | `dietary-provision` | Serhan 2011; Simopoulos 2011 |

Page-level `claim_ceiling` is `biological-dependency` on all eight. Page-level
`dietary_addressability` is `not-established` on all eight (atom-level provision
on PM2 fibre and PM8 EPA/DHA does not make the PM a diet-addressable signalling lever).

## Not admitted

- Food-source arrows and inherited BRS3(KC1) constituent lists.
- Cooking/AGE/UPF patterns (PM4), carotenoid–marine-fat pairing (PM5), fermented
  foods and plant-diversity patterns (PM2), oxidised omega-6 avoidance (PM8).
- Name-only cofactors still unreviewed on other PMs: vitamin D, CoQ10, lipoic acid, riboflavin,
  vitamin A, zinc on PM2, selenium on PM8. PM1 magnesium was independently reviewed (see
  `system/brs3-fm1-pm1-stage2b-report.md`).
- Food-page SOP leftovers.

## Visibility

Legacy §4.1 headings remain; disclosure matching already maps `4.1.x` → `3.1.x`.
§8 reference lists were regenerated with `pm-ref-n` anchors.

## KC and cofactor verification (follow-up)

Stage 2B must independently adjudicate §4.1.2 cofactors/substrates and §4.1.3 KC
context (`system/dietary-input-traceability-contract.md` §4; `pm_kc_relationships`).
`key_constraints` is an index link only. KC1 food lists are not inherited.

| PM | Cofactors / substrates (§4.1.2) | KC1 connection |
|----|---------------------------------|----------------|
| PM1 | Magnesium ions (Mg²⁺) catalytic ion | No admitted PM↔iKC. Former Direct polyphenols/EPA/fibre reclassified as modulation. `ikc-scope-conflict` `KC-CC-BRS3-FM1-PM1-01` |
| PM2 | Butyrate (biochemical) | PM↔KC role only; no KC1 constituent atom |
| PM3 | None as Nrf2 cofactor; sulforaphane stays modulation | Vitamin C as `kc-relevance` constituent |
| PM4 | Se, Zn, Cu, Mn, glutathione | Glutathione linked as `legacy-unreviewed` |
| PM5 | Vitamin E | PM↔KC role only |
| PM6 | Vitamin C, vitamin E | Vitamin C linked as `legacy-unreviewed` |
| PM7–PM8 | No BRS3(KC1) index row; EPA/DHA remain PM8 substrates | — |

