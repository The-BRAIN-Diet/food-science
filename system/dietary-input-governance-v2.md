# Dietary input admission and food target traceability

Approved implementation dated 23 October 2026. This revision governs new or changed assessments. It supersedes the earlier permission for dietary patterns and programmes in §3.1.1, while preserving the separate Type A and Type B pathways. Historical scientific decisions remain in their original records; `dietary-input-historical-baseline.json` freezes their source signatures for reconciliation, not scientific reapproval. Do not regenerate that baseline to make new or changed records pass.

## Scientific relationships and section eligibility

**Type A — Capacity:** An established functional dependency in which an identifiable input supplies or sustains the biochemical capacity of the PM's defined operation, directly or through a supported derived pathway. Establish the functional dependency and dietary supply of that same dependency. Clinical benefit from extra intake is not a prerequisite.

**Type B — Regulation:** An identifiable dietary input that modulates the PM's defined biological operation through supported mechanism engagement and credible dietary exposure. An associated biomarker or tissue-volume outcome alone does not establish engagement of the operation.

Direct/Derived is independent of Type A/B and relative to the receiving PM operation. A substrate may be Direct to microbial production and Derived relative to downstream signalling. Conversion alone does not establish PM-specific capacity or regulation. Do not duplicate one supply pathway as independent active-product and precursor requirements.

The reader heading for §3.1.1 is **Dietary Inputs & Regulatory Modulators**. Canonical section identifiers remain unchanged. Legacy §4.1.1 and promoted §1.1.1 aliases remain recognised. No other section is renamed.

| Section | Eligible input types | Exclusions |
|---|---|---|
| §3.1.1 | Identifiable biochemical substances; dietary substrates; supported precursor/substrate classes; microbial fermentation substrates; Direct or Derived regulatory modulators | Dietary patterns, named diets, food combinations, programmes, meal plans, matrices presented as biochemical inputs, whole-food interventions, timing/preparation/sequence protocols |
| §3.1.2 | Biochemical participants, cofactors, catalytic ions, substrates and supported supply/regeneration relationships | Patterns/programmes; reaction participation does not establish dietary provision |
| §3.1.3 | Existing independently adjudicated shared supply/resource relationships | No change to KC ownership, membership or distinctness |
| §3.2 | Independently assessed dietary patterns, defined food interventions, preparation, supplementation and timing protocols | No automatic transfer from a rejected §3.1.1 candidate |
| §3.3 | Relevant exercise, sleep, stress-management and other lifestyle practices | Dietary patterns ordinarily belong in §3.2 |

The executable allowlist and explicit aliases are `src/lib/dietaryInputGovernance.mjs`. Unknown types fail closed or require review. The label `food component` is restricted to an identified constituent/class, never a whole-food intervention. A changed label does not evade scientific review of the entity's actual identity. Eligibility is not admission.

## Six atoms and separate assessment metadata

The canonical currency remains exactly **Input | Input type | Biological role | Evidence source | Limitation | Dietary input (Yes/No/Unset)**, across Dietary Requirements, SOPs and Lifestyle Levers. No seventh atom is added.

New or changed §3.1.1 relationships require a `dietary_input_assessments` entry, separate from the six atoms, containing:

- `atom_id`, `status` (`admitted`, `unresolved`, `rejected`), `type` (`A`, `B`), `classification` (`direct`, `derived`), the exact assessed `operation` and `canonical_substance_id`.
- Type A: `functional_dependency` and `dietary_supply`. Type B: `mechanism_engagement` and `dietary_exposure`. Each gate records `status: established`, a scientific `statement` and resolvable source pointers in `sources`. Assertions are structurally checkable, not proof that the underlying science is correct.
- Derived: `active_target_id` and an ordered `conversion_pathway`. Every step identifies `from`, `to`, `process`, `dependencies`, `limitations`, and `evidence` with statement and sources. Preserve intermediates and microbial metabotype, cross-feeding or endogenous activation dependencies. Unregistered target identities remain explicit gaps; do not create duplicates.
- `food_target_research`: `completed`, `sources_examined`, and `targeted_searches` (or an explicit sufficient-coverage rationale). Record queries, dates, sources, outcomes and remaining gaps. Completion is not inferred from an existing substance page or one food edge.

Scientific admission and food mapping are independent. Missing food mapping does not invalidate supported biology. Unsupported biology is not admitted by a complete food list. Unresolved/rejected new relationships must not be presented as admitted §3.1.1 inputs.

## Mandatory food target research

For each scientifically admitted input, resolve canonical identity; retrieve existing structured food edges; inspect substance pages, food records and composition sources; perform targeted research for credible unmapped sources; record composition evidence and material/preparation qualifications; include supported provisional foods; export missing edges for independent Cursor verification. An empty ontology join is not evidence that a food lacks a substance.

Food mapping states are **Verified**, **Research-supported provisional**, and **Unresolved**. Verified requires an accepted structured food–substance relationship, independently of whether its quantity is verified. Provisional requires credible food-composition/delivery evidence but a missing/incomplete structured edge. No credible source means explicit unresolved coverage, not an invented list. Ordinary quantities cannot be inferred from total protein, carbohydrate or fibre.

`system/food-target-research.json` is a composition research ledger, not a food ontology or PM admission register. Retain source URL/DOI, retrieved date, food and canonical substance IDs, evidence material, preparation, evidence statement and limitations. Provisional status never writes a canonical `substance_relationships` edge.

Validate three connections separately: PM input → canonical identity; dietary precursor → active target; substance/substrate → food. Source evidence must distinguish identity, composition/delivery, conversion, mechanism engagement and intervention/phenomic outcomes. One source may support multiple links only when it actually investigated them. UniProt/Rhea/ChEBI records should retain accession, release/version or retrieval date; database verification is not dietary efficacy or PM relevance. No CC/SEC anchors, scores or scales change. Unresolved connection scoring remains unscored.

## Presentation and outputs

Reuse the existing PM food dropdown. Show verified foods normally; show supported provisional foods with one small red information icon beside the name. Use one icon beside an affected input and one combined concise warning immediately above the first of its six atoms. The warning names each affected target and exact missing connection. Do not colour names/records red, create large banners, add atoms or repeat administrative warnings inside Limitation.

A Derived food source supplies its precursor, not the downstream metabolite. Retain conversion and preparation limitations. Scientific limitations still distinguish conditional conversion/bioavailability, uncertain PM relevance, model/species limitations, uncertain mediation and uncertain human translation. A limitation cannot legitimise an ineligible input type.

The manuscript output retains BRS/FM/PM, operation, input, Type A/B, Direct/Derived, canonical identity, food, mapping status, food evidence, PM evidence, preparation/conversion limits and missing edge. Composition supports delivery, not automatically PM effectiveness. Historical rows explicitly retain their historical basis and unresolved Type/pathway fields; no missing assessment is fabricated.

The Cursor queue identifies source/target entities, canonical IDs, missing relationship, food/material/preparation, supporting evidence, affected PMs, required action and verification status. Deduplicate the same food/substance/material/preparation edge while retaining all PM references and evidence. Cursor independently verifies before repair. Never perform ontology repair during Stage 2A/2B.

## Validation and historical reconciliation

Run `node --test scripts/dietary-input-governance-v2.test.mjs` and `node scripts/generate-dietary-food-targets.mjs`. Existing mechanism validation also checks section eligibility and prospective admissions. The read-only reconciliation report lists unchanged historical records that do not meet the new structural contract; it neither rejects their past science nor authorises continued new admission under superseded rules. Changes to a historical input, overlay, presentation or mission invalidate its baseline signature and require the new gate.

No PM8 rerun, scientific reassessment, scoring, new PM/FM or automatic migration is authorised by this infrastructure revision.

## Ordered alternatives within an established conversion pathway

A class-level conversion may contain an `alternative-vitamer-routes` step between existing canonical input and active-target IDs. It is explicitly a set of alternative ordered reactions, not a single reaction for chemically different class members. Each route names its substrate, ordered steps, intermediates, enzyme/reaction identifiers, dependencies, evidence and limitations. Versioned external chemical identities may describe route-local intermediates without creating duplicate canonical substances or food edges. For B6, validate PL → PLP by PDXK separately from PN → PNP → PLP and PM → PMP → PLP through PDXK then PNPO. Retain ATP/metal context and PNPO/FMN dependencies without inferring new dietary mineral requirements. Only a valid complete route representation resolves a conversion warning; pathway completion does not create or change scientific admission or confidence.

## Canonical PM scope in Stage 2A/2B and generation

Discovery, adjudication, ontology projection and dietary roll-up use the same canonical PM inventory: 51 numbered PMs and 13 Cross-BRS PMs (64 total at this revision). Select canonical `pm_id` records in both numbered and Cross-BRS directories; do not require a numbered BRS–FM–PM identifier shape. Keep Cross-BRS identities, missions and URLs intact. Cross-BRS is a scope family, not a seventh numbered BRS.

Stage 2A must investigate mission-specific direct and upstream dietary candidates for every PM, including records with no admitted inputs. Stage 2B applies the same Type A/B and independent Direct/Derived gates to Cross-BRS inputs. Registry traversal is not scientific discovery. An existing Direct capacity overlay with a missing dietary field requires an explicit assessment, not automatic inheritance or automatic rejection.

Generators must preserve all 64 PMs in coverage, including empty records. Deduplicate substance identities while retaining independently justified PM relationships. Include Cross-BRS rows in combined manuscript exports; keep their provenance distinct from numbered BRS membership. Evidence Gaps, hypotheses and unresolved admissions must not generate admitted food rows. Re-running generators must not change scientific decisions or immutable SEC snapshots.
