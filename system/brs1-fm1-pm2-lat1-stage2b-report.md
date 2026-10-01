# BRS1-FM1-PM2 LAT1 Competitive Transport Modulation — Stage 2B Report

Re-run against the **2B — Dietary Input Traceability & Visibility Contract**,
including the state-regulation amendment (`relationship_mode`). No new
literature search. Evidence is the Stage 2A Findings and bibliography already
on this PM.

**PM-governed objective/state:** meal-level LAT1 competitive balance — which
large-neutral amino acids are favoured for blood–brain-barrier entry after a
meal. Not amino-acid pool sufficiency (PM1), not monoamine synthesis or
signalling (PM3–PM5), not a Phenome or ADHD outcome.

Page `dietary_addressability: direct`. Page `claim_ceiling: modulation-demonstrated`.

## Biological classification (before atoms)

| Claimed input | Type | Decision |
|---------------|------|----------|
| Meal carbohydrate-to-protein composition | **B. Regulatory / state** | **Admit** as Direct §3.1.1. Ordinary high-carbohydrate versus high-protein meals change plasma tryptophan- and tyrosine-to-LNAA ratios (Ashley 1985; Wurtman 2003). That endpoint is this PM’s competitive-balance state. |
| Tyrosine | **C. Biochemical inventory** | **Keep** §3.1.2 cargo substrate. Same-role reprint into §3.1.1 would be “eat more tyrosine.” |
| Tryptophan | **C. Biochemical inventory** | **Keep** §3.1.2 cargo substrate. Meal-ratio regulation is owned by the meal-composition atom, not by a tryptophan intake requirement. |
| Isolated carbohydrate or isolated protein as a nutrient | **B, rejected** | Pattern evidence is not attributable to one macronutrient as a constituent Dietary Requirement. |
| Eat more competing LNAAs | **Rejected** | LAT1 competition is not improved by “more LNAAs.” |
| Carbohydrate–protein meals as SOP | **Not used** | The relationship is admitted as a Dietary Requirement. Do not rewrite it as a System Optimisation Practice. |
| BRS1(KC1) quality arm | **D, unassessed** | Ownership on PM1 does not exclude this arm. Flagged `KC-CC-BRS1-FM1-PM2-02` / `FW027` for Type D retest. |
| BRS1(KC1) competitive-balance arm | **D, this PM** | Public mapping established: title plus competitive-arm relevance. No inherited constituents. |

## Type B high-bar (meal carbohydrate-to-protein composition)

| Check | Result |
|-------|--------|
| Exposure actually tested | Ordinary breakfast composition; ordinary high-carbohydrate versus high-protein meals |
| Population / model | Healthy lean young men; healthy adult volunteers |
| Human vs animal | Human meal studies plus transport review |
| Endpoint | Plasma tryptophan-to-LNAA and tyrosine-to-LNAA ratios |
| Endpoint = this PM state? | Yes — competitive precursor presentation at LAT1 |
| Direction | Carbohydrate-rich meals raise the tryptophan ratio; protein-rich meals lower it and raise the tyrosine ratio |
| Exposure context | Ordinary meals, not isolated amino-acid loads |
| Attribution | Meal macronutrient structure (the ratio), not a single nutrient |
| Claim ceiling | `modulation-demonstrated` — plasma-ratio change only |
| Limitation | Not brain LAT1 flux, monoamine synthesis, Phenome or ADHD |

## Admitted atoms

1. `PM2-DIT-3` — Meal carbohydrate-to-protein composition  
   Direct · dietary pattern · `state-regulation` · `modulation-demonstrated`  
   Findings: PM2-F2, PM2-F1.

2. `PM2-DIT-1` — Tyrosine  
   §3.1.2 biochemical cargo only.

3. `PM2-DIT-2` — Tryptophan  
   §3.1.2 biochemical cargo only.

## Schema-field decisions

| Field | Decision |
|-------|----------|
| `key_constraints` | Keep BRS1(KC1). |
| `pm_kc_relationships` | `BRS1-FM1-PM2-KCR-1` — competitive-arm relevance only. |
| `constituent_relationships` | None. |
| Public §3.1.3 | Linked KC title plus competitive-arm relevance. |
| SOP / lifestyle YAML | None. |

## Review & Corrections

Decision records `FW010`–`FW012` (`register_surface: pm-tab`) populate this PM’s
Review & Corrections tab. `FW027` flags the KC1 quality arm for Type D retest
(`KC-CC-BRS1-FM1-PM2-02`); ownership is not a reason to exclude it. The
competitive-arm mapping is unchanged. They are not published on the Framework
register.

## Validation

Passed:

- `node --test scripts/brs1-fm1-stage2b.test.mjs`
- `npm run test:dietary-lever-traceability` — 17 tests
- `npm run findings:check` — 6 Findings-owned PM pages, 0 problems
