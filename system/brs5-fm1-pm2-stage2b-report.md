# BRS5-FM1-PM2 — Stage 2B, 2026-10-07

Status: Stage 2B implemented after the Stage 2A findings on the same page. No §3.1.1 requirement is admitted. No commit in this pass.

Page: `docs/biological-targets/brs5/fm1/brs5-fm1-pm2-lps-endotoxin-containment.mdx`
Stage 2A record: `system/brs5-fm1-pm2-stage2a-report.md`

Question used: does the evidence establish a dietary relationship that achieves, maintains, or regulates limited host exposure to bacterial endotoxin, at the level claimed? Association, a mixed meal, and “has been studied in” do not admit a Direct or Derived requirement.

## Candidate decisions

| Candidate | Specificity | Disposition | Why |
|---|---|---|---|
| Fibre + polyphenol + fermented-food bundle | Not the tested exposure | Rejected | Ghanim’s comparison meal is fibre and fruit against a high-fat high-carbohydrate meal, not an isolation of fibre, polyphenols, or fermented food. |
| Polyphenol-rich berries, tea, cocoa | Not isolated | Rejected | No substance-specific result in the assessed studies. |
| Lower ultra-processed food or emulsifier burden | Not measured | Rejected as presently justified | No preparation or product class was the exposure. |
| Saturated-fat-rich meal | The tested challenge | Retained inside PM2-F2. Not a Dietary Requirement | The challenge raised the endpoint. It is not something to supply in order to maintain containment. |
| Comparison meals (monounsaturated, low-fat, fibre-and-fruit) | Mixed contrasts | Not admitted | They did not raise postprandial lipopolysaccharide. They are not isolated protective requirements. |
| Butyrate, omega-3, polyphenols, zinc | Cofactor list on the old page | Not admitted | The low-fat arm that included omega-3 did not raise postprandial lipopolysaccharide. That is not evidence that omega-3 is a containment cofactor. Zinc and butyrate were not tested. |
| BRS5(KC1) Fermentable Fibre Sufficiency | KC-owned membership (inulin-type fructans/GOS, pectin, resistant starch) | Unresolved applicability. Public panel: “No mapping established.” | Membership is not a lipopolysaccharide measurement. `kc_applicability_adjudications` records the gap. The KC page itself is unchanged. |
| Salmon, mackerel, lentils, sweet potatoes, sunflower-seed preparation | Old §3.2 bullets | Rejected | No preparation → lipopolysaccharide chain. |
| Sleep, stress, erratic eating | Old §3.3 bullet | Not projected | No evidence in the assessed corpus. This is not a finding that sleep is irrelevant. |
| Intestinal alkaline phosphatase | Host step | Unresolved, not a lever | See the Stage 2A report. |

## Public panels

- §3.1.1: “No Direct or Derived Dietary Requirement is currently established for limiting host exposure to bacterial endotoxin.”
- §3.1.2: “No evidence-supported cofactors or substrates are currently established for this mechanism.”
- §3.1.3: “No mapping established.”
- §3.2: “Only categories with a substantive evidence-qualified intervention are shown.” No category is shown.
- §3.3: “No evidence-qualified lifestyle relationship is projected.”

`cofactors` and `key_constraints` are empty. A listed key constraint without an established applicability row would fail validation, so the old KC1 index line was removed from this PM only.

## Dominance

`intervention_dominance` is Diet-Supported, matching the qualification label. `intervention_breakdown` is Food-State Leaning (spreadsheet metadata, not a public section). The previous Diet-Dominant and Food-State Dominant labels overstated a requirement.

One assessed route is recorded on group 3.1 with `evidence_basis: intervention-effect`, citing PM2-F2, López-Moreno, and Ghanim. It documents that the challenges changed postprandial lipopolysaccharide. `principal_route_selection.disposition` is `not-established` and `selected_groups` is empty, so the group stays under section 3 and is not promoted before Overview.

`timing_specific` remains Yes because the human result is postprandial. `dose_sensitivity` states that no intake target or timing prescription is established.

## Verification

- `node scripts/sync-pm-scientific-findings.mjs --check`: 32 PM pages, 0 problems.
- Page contract for BRS5-FM1-PM2: no issues.
- Dominance assessment: no errors.
- `npm run phenome:index` rewritten; freshness check ok.
- Parent FM integration was not edited.

## Not read in full

PMID 39733508, 25903259, and 36791082 were used only as reasons to stop a fibre requirement. They are not findings and not bibliography entries. Komazin substrate data and Bates 2007 were not re-read as new primary papers; they remain the reason alkaline phosphatase stays unresolved.
