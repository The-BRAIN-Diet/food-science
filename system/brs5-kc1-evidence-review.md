# BRS5(KC1) KC-page evidence review

**Contract:** `system/kc-page-evidence-review-contract.md`  
**Schema:** `system/key-constraint-schema.md`  
**Page:** `docs/biological-targets/brs5/kc/brs5-kc1-fermentable-fibre-availability.mdx`  
**PM evidence:** not modified. PM ↔ iKC applicability remains an independent
Stage 2B decision.

## Page coherence

**Candidate constraint:** availability of fermentable dietary carbohydrate that
reaches colonic microbes and supplies a shared substrate pool for fermentation
and short-chain-fatty-acid production.

**Adjudication:** **supported with class-specific boundaries.** Inulin-type
fructans and galacto-oligosaccharides, pectin and resistant starch are distinct
microbiota-accessible substrate classes. Their structures, fermentation
kinetics and metabolite profiles differ, but each contributes to the same
upstream fermentable-substrate availability constraint. The page does not
generalise membership to all fibre or claim that the three classes are
interchangeable.

The page remains one default iKC whose `ikc_id` equals `BRS5(KC1)`. No additional
iKC structure is needed.

## iKC definition

- **What is constrained:** delivery of fermentable carbohydrate substrate to
  colonic microbial communities.
- **Resource:** a shared pool of microbiota-accessible carbohydrate, represented
  by three evidence-qualified classes.
- **Why it is a constraint:** insufficient substrate availability can limit
  fermentation and microbial metabolite production; this is narrower than
  generic fibre relevance or a claim that more substrate always improves
  health.
- **Relationship to the page:** each retained constituent instantiates the same
  substrate-availability condition while preserving class-specific evidence and
  limitations.

## Constituent decisions

### Inulin-type fructans and galacto-oligosaccharides — admitted

- **Input type:** `nutrient/compound class`
- **Role:** nondigestible oligosaccharides that reach the colon and contribute
  fermentable substrate to the shared microbial SCFA resource pool.
- **Evidence:** van Trijp et al. (2024).
- **Status:** `nutritionally-constrained`
- **Membership:** `admitted`
- **Ceiling:** `dietary-provision`
- **Limitation:** controlled FOS/GOS preparations do not establish equal
  fermentation for every food matrix, a universal requirement threshold or
  benefit from additional intake.

### Pectin — admitted

- **Input type:** `nutrient/compound class`
- **Role:** structurally heterogeneous fermentable polysaccharide contributing
  microbial substrate and predominantly acetate-generating capacity.
- **Evidence:** Pascale et al. (2022).
- **Status:** `nutritionally-constrained`
- **Membership:** `admitted`
- **Ceiling:** `dietary-provision`
- **Limitation:** support is dominated by in-vitro human-faecal fermentation;
  pectin structure affects response, and the evidence does not admit generic
  soluble fibre.

### Resistant starch — admitted

- **Input type:** `nutrient/compound class`
- **Role:** starch escaping small-intestinal digestion that supplies colonic
  microbial substrate and can support SCFA, including butyrate, production.
- **Evidence:** Sobh et al. (2022).
- **Status:** `nutritionally-constrained`
- **Membership:** `admitted`
- **Ceiling:** `dietary-provision`
- **Limitation:** responses vary by starch type, dose, population and
  microbiota; faecal SCFA results do not establish a universal threshold or
  benefit from additional intake.

No inherited candidate was rejected or reclassified. Food examples were not
used as membership evidence and are not projected in §2 because this review did
not independently adjudicate Food → Input composition claims.

## Public Evidence Base Summary and disclosures

The Summary was compared claim by claim with the page definition, all three
constituent atoms and their `dietary-provision` claim ceilings. It contains one
65–90-word explanatory paragraph followed by exactly three distinct,
claim-local cited bullets:

1. the fermentability and class-membership boundary;
2. the controlled-substrate, food-matrix, threshold and host-response
   measurement boundary; and
3. biological relevance separated from claims that additional intake or higher
   SCFA production improves downstream function or clinical outcomes.

The Summary uses only existing van Trijp, Pascale, Sobh and Silva sources. Each
citation resolves to its intended bibliography record and supports the adjacent
proposition. No unresolved Summary claim remains, and no internal review
language appears in the public copy.

Each admitted resource now has a separate §3 dropdown carrying
`data-brs-kc-evidence-resource`. The exact presentation title exposes its
five-field atom on pointer hover and keyboard focus; activating that title or
the adjacent chevron toggles the same full evidence panel. The expanded panels
retain source interpretation without duplicating the five-field record.

## Emerging Biological Supports

No candidate is prioritised. Candidate-like placeholder examples were removed,
so §4 does not assess or publicly name a support without a separate
`kc_emerging_support_traceability` atom and matching title interaction.

## Proposed FM/PM scope

Existing FM1, FM2, FM3, PM1, PM3, PM4, PM5 and PM7 connections are carried
forward as **proposed scope**. The reviewed fermentable-substrate definition is
biologically coherent with microbial fermentation, SCFA production and
downstream barrier and gut–brain contexts, but this page review does not
establish each PM ↔ iKC relationship.

No listed connection is impossible under the reviewed definition. No
`kc_change_control_flags` entry is required.

## Governing limitations

- The review used only sources already present on the page.
- Human FOS/GOS evidence concerns controlled preparations and short observation
  windows rather than every food matrix.
- Pectin membership rests mainly on in-vitro human-faecal fermentation evidence.
- Resistant-starch responses vary across preparations, doses and hosts.
- SCFA production establishes biological relevance but not downstream clinical
  benefit from additional provision.
- Proposed FM/PM scope remains independently testable.

## Final coherence and verification

- The page represents one coherent fermentable-carbohydrate substrate
  constraint.
- All three displayed §2 resources have complete five-atom records plus strict
  status, membership and claim-ceiling overlays.
- Only admitted resources project in §2 and §3.
- §2 uses the required collapsed Core Nutritional Requirements structure.
- §3 has one 65–90-word Summary paragraph, exactly three distinct cited bullets
  and one title-attached interactive disclosure per constituent.
- §4 contains no unevidenced candidate.
- All citation keys resolve to existing bibliography records.
- PM evidence, shared queues, scripts, bibliography and unrelated pages were
  not modified.

Focused governance, bibliography, mechanism-page and build checks are recorded
in the completion handoff.
