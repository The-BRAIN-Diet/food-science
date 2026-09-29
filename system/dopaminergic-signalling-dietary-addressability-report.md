# BRS1-FM1-PM3 Dopaminergic Signalling — Dietary Addressability Pass

This is the Dietary Requirements / addressability pass in
`system/dietary-input-traceability-contract.md` §6, following the PM9 pattern.
It is not a separately numbered Stage 2B.

No new literature search. Repository sources already attached to F1 or used on
the vitamin B6 substance page were used to replace Fanet as the PLP/B6 evidence
source. Fanet is retained for BH4.

## Adjudication

| Atom | Decision | Addressability | Claim ceiling | Evidence | Unsupported next step |
|------|----------|----------------|---------------|----------|------------------------|
| **PM3-DIT-1 Iron** | Retain as Direct Dietary Requirement | `not-established` | `biological-dependency` | PM3-F1 / Erikson 2000; Beard 2003 | Ordinary iron intake → brain iron → dopamine synthesis when status is adequate |
| **PM3-DIT-2 PLP** | Retain as Direct Dietary Requirement | `not-established` | `biological-dependency` | PM3-F1 / Kennedy 2016 | Dietary PLP → AADC activity → human brain dopamine |
| **PM3-DIT-3 Vitamin B6** | Retain as Derived → PLP | `precursor-mediated` | `dietary-provision` | PM3-F1 / Kennedy 2016; Spector 1978 | Increased B6 intake → brain PLP → dopamine synthesis or ADHD benefit |
| **PM3-DIT-4 BH4** | Added as §3.1.2 biochemical requirement | n/a | `biological-dependency` | PM3-F1 / Fanet 2021 | Dietary BH4 or sapropterin as a PM3 lever |

Page-level `dietary_addressability` remains `not-established`. Page-level
`claim_ceiling` remains `biological-dependency`. SOP and lifestyle records were
not reopened.

## Fanet–PLP resolution

- **Claim:** Fanet et al. (2021) establish PLP/B6 as dopamine-synthesis cofactors.
- **Source:** `fanet_tetrahydrobioterin_2021`.
- **Measured result:** BH4-dependent aromatic-amino-acid hydroxylation.
- **Wording used:** Fanet now supports BH4 only. PLP/B6 use Kennedy and Spector.
- **Unresolved:** Kennedy is a general B-vitamin review, not AADC enzymology.
  That does not change the retained biological-dependency ceiling.
