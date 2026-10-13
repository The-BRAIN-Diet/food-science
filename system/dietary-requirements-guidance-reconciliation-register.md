# Dietary Requirements Guidance Reconciliation Register

Reference branch: `preview-dietary-requirements-demos`

Scope: instruction and validation reconciliation for the B/D dependency-supply
model, single-primary-entry presentation rule, canonical six-atom structure and
SOP dietary-input integration. This pass does not modify canonical PM
admissions, food records, ontology, KC applicability, SOP decisions, shared
renderers or validators.

| Source | Existing statement | Error type | Why problematic | Replacement | Compatibility impact | Status |
|---|---|---|---|---|---|---|
| `system/primary-mechanism-schema.md` — Stage 2A audience | “five-atom record” / “five-atom disclosure” | Ambiguity | The canonical PM dietary-context disclosure is now six atoms, including `dietary_input`. | “six-atom record” / “six-atom disclosure” | Documentation only; renderer/validator follow-up remains separate. | Corrected |
| `system/primary-mechanism-schema.md` — Dietary Requirements canonical §3.1 | No explicit B/D equation in PM authoring guidance. | Scientific | Allowed biochemical dependency and dietary supply to blur during authoring. | Added B — Biological dependency, D — Dietary supply, and `Capacity Dietary Requirement = B AND D`. | Stage 2A/2B authoring guidance only. | Corrected |
| `system/primary-mechanism-schema.md` — §3.1.1 Direct/Derived | “Direct Dietary Requirement: a dietary input that is itself directly required by the PM biology.” | Classification | Could read Direct as reaction participation rather than a supported dietary relationship. | Direct/Derived now describe supported dietary relationship distance; a Derived precursor can supply an active target without creating a separate direct-intake requirement. | Existing Direct/Derived records preserved; conflicts flagged for later adjudication. | Corrected |
| `system/primary-mechanism-schema.md` — §3.1.2 Cofactors and Substrates | “A substance may legitimately appear in both subsections... methionine as a Direct Dietary Requirement and methionine as the substrate used by MAT.” | Placement / duplication | Explicitly encouraged the now-rejected methionine reprint. | §3.1.2 now explains additional biochemical participants not already adequately explained in §3.1.1; ATP is the reference §3.1.2-only case. | Presentation guidance only; no live PM migration. | Corrected |
| `system/primary-mechanism-schema.md` — §3.1.2 duplicate test | “same input, input type, and biological role” | Duplication | Too narrow; changed wording could bypass the no-reprint rule. | Added single-primary-entry rule: do not create a second primary entry merely because a dietary substance also participates in a reaction. | Future validator should test presentation allocation, not only tuple identity. | Deferred |
| `system/dietary-input-traceability-contract.md` — Scope / shared currency | “Five-atom currency” and “PM Evidence (five-atom relationship)” | Ambiguity | Treated the old evidence record as interchangeable with the current six-atom contract. | Reconciled to canonical six-atom structure: Input, Input type, Biological role, Evidence source, Limitation, Dietary input. | Documentation and instruction tests updated; renderer display compatibility remains to audit. | Corrected |
| `system/dietary-input-traceability-contract.md` — Relationship type before dietary relevance | No standalone B/D model. | Scientific | Did not explicitly require B and D to be independently supported for capacity requirements. | Added §2.0 B/D dependency-supply model and ten mandatory scientific rules. | Stage 2B authoring/reporting guidance only. | Corrected |
| `system/dietary-input-traceability-contract.md` — Reappearance / visibility | “Do not present the same input + type + role...” | Duplication | Correct but insufficient; allowed reprints with different role wording. | Added one-primary-entry presentation rule and role-wording safeguard. | Future validator/rendering checks required. | Deferred |
| `system/dietary-input-traceability-contract.md` — examples | PLP and methionine examples could imply duplicate primary entries. | Placement / classification | Active biochemical target could be treated as a separate direct-intake requirement. | Added approved worked examples for SAMe, GABA, dopamine and NAD⁺; PLP is explained through B6 supply without a second primary PLP explanation. | Examples only; canonical PM data unchanged. | Corrected |
| `system/scientific-finding-schema.md` — Stage boundary | Stage 2A/2B boundary did not mention B/D. | Scientific | Could leave Stage 2A findings and Stage 2B supply admission conceptually conflated. | Added B/D as Stage 2B adjudication propositions, not new Finding fields. | No Finding schema field change. | Corrected |
| `system/brs-hub-levers-schema.md` — PM Evidence traceability | “four-field atomic currency” | Ambiguity | Obsolete and inconsistent with six-atom PM evidence disclosure. | Updated to six-field traceability and included Limitation + Dietary input. | Hub extraction guidance only. | Corrected |
| `system/brs-hub-levers-schema.md` — SOP boundary | No explicit SOP `dietary_input` handling. | Placement / SOP | Could imply SOPs are outside dietary-input eligibility or should move into Dietary Requirements when dietary. | Added SOP `dietary_input` states and explicit “does not move SOPs into Dietary Requirements” rule. | Renderer/validator support for SOP sixth-atom display remains a future compatibility task. | Deferred |
| `scripts/dietary-lever-traceability.test.mjs` — test names | Tests named “five-atom” for PM/SOP traceability. | Validation / ambiguity | Test language lagged behind the six-atom contract. | Renamed affected tests to “six-atom”. | Test semantics unchanged. | Corrected |
| `scripts/dietary-requirements-guidance-reconciliation.test.mjs` | New instruction-level regression suite. | Validation | Needed automated guardrails without changing live data or validator behavior. | Added checks for six-atom structure, B/D model, single-entry rule, worked examples, SOP separation and roll-up limitations. | Documentation regression only; no renderer/validator behavior changed. | Corrected |

## Remaining Compatibility Questions

- Shared renderer: confirm whether SOP and lifestyle disclosures currently render
  `dietaryInput` the same way §3.1 and KC disclosures do.
- Validator: add future checks for one-primary-entry presentation allocation
  across §3.1.1 and §3.1.2 without deleting accepted canonical records.
- Validator: add future SOP examples for dietary SOP, non-dietary SOP and mixed
  intervention `dietary_input` states after approval to change behavior.
- Canonical PM pages: the four demonstration pages may still contain older
  presentation choices. This pass records the instruction change and does not
  perform a bulk migration.
