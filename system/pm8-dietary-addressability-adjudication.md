# PM8 dietary addressability adjudication (CC-PM8-07)

**Status:** Adjudicated 2026-09-24 — bounded to existing PM8 evidence (PM8-F1, PM8-F2, PM8 summary/Overview). No new literature added.

## Adjudication table

| Atom | Biological requirement | Dietary addressability | Addressability evidence | Claim ceiling | Ceiling evidence | Unsupported next step | Permitted wording | Prohibited wording |
|------|------------------------|------------------------|-------------------------|---------------|------------------|----------------------|-------------------|-------------------|
| **PM8-DIT-1 Glutamate** | Substrate for GAD-dependent GABA synthesis | **indirect/resource** | PM8-F1 / Martin & Rimvall (1993) — enzymatic substrate requirement, not dietary glutamate flux | **biological-dependency** | Same | Dietary glutamate or protein pattern → neuronal glutamate availability → GABA synthesis rate in humans | Adequate dietary protein/amino-acid nutrition supports general amino-acid availability; glutamate is the in-pathway substrate for GAD, but dietary glutamate is not established as a direct control on brain GABA synthesis capacity | “Eat glutamate-rich foods to increase brain GABA”; “protein matrix directly raises GABA synthesis” |
| **PM8-DIT-2 PLP** | Required GAD cofactor; reserve capacity | **not-established** | PM8-F1 — cofactor chemistry in brain tissue; PLP is formed in vivo, not ordinarily consumed as a dietary lever | **biological-dependency** | Same | PLP as a dietary input; dietary PLP → brain GAD activity | PLP is the active cofactor GAD requires; ordinary diet addresses this pathway through B6 vitamers (see PM8-DIT-3), not through dietary PLP | “B6 (PLP)” as one dietary entity; “supplement PLP for GABA” |
| **PM8-DIT-3 Vitamin B6** | Precursor to PLP via PDXK | **precursor-mediated** | PM8-F2 — vitamer → PLP enzymology (in vitro); not GABA-specific (140+ PLP enzymes) | **biological-dependency** | Same | Ordinary B6 intake → brain PLP → GAD reserve → GABA synthesis; increased B6 → increased GABA synthesis (Field 2022: anxiety only, no GABA/PLP/GAD) | Dietary vitamin B6 supplies vitamers that can be converted to PLP, the cofactor required by GAD | “High-dose B6 increases brain GABA”; “B6 is a GABA-specific dietary lever”; using Field (2022) for synthesis capacity |
| **PM8-DIT-4 Zinc** | PDXK enzymology (in vitro) | **not-established** | PM8-F2 — recombinant enzyme kinetics only | **biological-dependency** | Same | Dietary zinc → PLP → GAD → GABA synthesis in humans | Zinc participates in in vitro PDXK chemistry relevant to PLP formation; dietary zinc as a PM8 lever is not established | “Zinc supports GABA synthesis through diet” |

## Evidence chain stops (summary)

| Atom | Stops after |
|------|-------------|
| DIT-1 | Biological requirement (+ indirect dietary resource context only) |
| DIT-2 | Biological requirement |
| DIT-3 | Biological requirement (+ precursor route identified; human provision/modulation not shown in PM8 corpus) |
| DIT-4 | Biological requirement (pathway enzymology only) |

## §3 integration (2026-09-24, corrected pass)

**Rule:** PM Evidence adds/qualifies/flags; it does **not** remove legacy §3, cofactor, or KC rows without separate Change Control.

| Legacy row | Bucket | Atom link | PM Evidence action |
|------------|--------|-----------|-------------------|
| B6 ← chickpeas | Direct | PM8-DIT-3 | Qualification + conflict flag (ceiling biological-dependency) |
| B6 + protein ← lentils | Direct | PM8-DIT-3 | Qualification + conflict flag |
| Protein matrix ← yogurt, kefir | Direct | PM8-DIT-1 | Qualification (indirect/resource) + conflict flag |
| B6 (PLP) ← poultry… | Cofactors | PM8-DIT-3 (+ DIT-2 addition) | Qualification; PLP/zinc additions; B6/PLP conflation flagged |
| Complete EAA ← … | KC | PM8-DIT-1 | Qualification (KC1 projection) |
| `cofactors: B6 (PLP)` | Front matter | DIT-2 / DIT-3 | Restored; conflation flagged in §3.1.3 |
| `dose_sensitivity` pattern | Front matter | PM8-DIT-3 / DIT-1 | Restored; modulation gap flagged in §3.1.3 |
