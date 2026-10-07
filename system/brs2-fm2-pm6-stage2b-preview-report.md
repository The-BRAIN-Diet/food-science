# BRS2-FM2-PM6 Glutathione Synthesis — Stage 2B draft report

**Status:** Stage 2B draft — not approved. Preview only. Not an accepted correction, review-status change, or deployment.

## Workspace

| Item | Value |
|---|---|
| Repository root | `/Users/paulhouston/Food Science/food-science` |
| Comparison workspace | `/Users/paulhouston/Food Science/pm6-stage2b-preview` |
| Branch of the main checkout | `restore-pm-lifestyle-levers` |
| Commit | `fd21f1f2e179e3686e0499550034812e8dd5daf5` — Require Stage 2B input-specificity adjudication |
| Working tree | Detached worktree at that commit. No unrelated uncommitted changes were brought across. |
| Canonical page left unchanged | `docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis.mdx` |
| Preview page | `docs/system/stage2b-preview/brs2-fm2-pm6-glutathione-synthesis-stage2b-draft.mdx` |
| This report | `system/brs2-fm2-pm6-stage2b-preview-report.md` |

Governing files read at that commit:

- `system/dietary-input-traceability-contract.md`, including “Input-specificity adjudication — before dietary candidate adjudication” and the verified presentation examples (PM3 dietary entries; PM7 KC input disclosure).
- `system/primary-mechanism-schema.md`.
- Contracts those files require for this pass: `system/scientific-finding-schema.md` § Bounded assessment; `system/key-constraint-schema.md` was used only as the iKC definition boundary named by the dietary contract. The KC page `docs/biological-targets/brs2/kc/brs2-kc2-methionine-transsulfuration-substrate-pool.mdx` was read so membership was not mistaken for PM relevance. It was not edited.
- Prior PM evidence used as the corpus, not as a substitute for this adjudication: `system/brs2-fm2-pm6-stage2a-report.md` and the committed `system/brs2-fm2-pm6-stage2b-report.md`.

## Governed state

Glutathione assembly in two ATP-dependent steps: glutamate + cysteine → γ-glutamylcysteine (glutamate–cysteine ligase), then γ-glutamylcysteine + glycine → glutathione (glutathione synthetase). The capacity question is whether substrate supply can establish or maintain that assembly. Peroxide clearance and glutathione recycling stay outside the mechanism.

## Clause conflicts recorded, not invented around

1. **Same-role reprint.** `system/dietary-input-traceability-contract.md` §4: “If a cofactor or substrate in §3.1.2 / §4.1.2 plays the same role as an already-admitted §3.1.1 / §4.1.1 Dietary Requirement (same input, input type, and biological role), do not repeat it in §3.1.2 / §4.1.2. That reprint is a true duplicate, not shared-role reappearance.” `system/primary-mechanism-schema.md` §3.1.2 states the same rule. The committed Stage 2B report instead says cysteine, glutamate and glycine appear in both subsections. The preview follows the contract and removes those three §3.1.2 rows. The atoms and their §3.1.1 relationships stay. ATP and magnesium remain §3.1.2 only, because they are not Dietary Requirements.

2. **Key Constraint public title.** `system/dietary-input-traceability-contract.md` under Type D says: “If a mapping is established, render the linked KC title and a concise statement of that relevance only.” The later PM7 integration reference, and `system/primary-mechanism-schema.md` “Admitted PM-owned KC input disclosure”, say public §3.1.3 titles are individually authorised input names with a sibling KC origin link, not the parent KC title. PM6’s established record is a pool-level mapping. It has no `constituent_relationships`. Copying KC2’s methionine and cysteine constituents into §3.1.3 is prohibited by the same contract’s Stage 2B job for §4.1.3 (“Do not copy iKC constituents or food-source bullets from the KC page”). The preview keeps the linked pool title and one sentence. It does not add constituent disclosures.

3. **Change-control queue.** The dietary contract §8 says: “Record flags in `system/mechanism-change-control-queue.md`.” This run was limited to a local preview and instructed not to update production registries, accepted corrections or review status. The queue file was not edited. Flags below live only in this report.

## Input-specificity adjudication

Biological inputs the mechanism requires: cysteine, glutamate and glycine as assembly substrates; ATP as the nucleotide substrate of both enzymes; one Mg²⁺ per glutathione-synthetase subunit. The shared methionine–cysteine pool can constrain that capacity when both sulfur amino acids are removed. Food delivery of those substances is not an additional requirement.

| Candidate | 1. Required input or tested exposure | 2. Label versus delivery | 3. Evidence for that specificity | Specificity disposition | Scientific disposition |
|---|---|---|---|---|---|
| Cysteine (`PM6-DIT-1`) | Cysteine is the sulfur-amino-acid substrate of glutamate–cysteine ligase. | The label names that substrate. | Misra and Griffith (1998), PM6-F1: purified human enzyme uses L-cysteine, L-glutamate and ATP. Lyons et al. (2000) and Courtney-Martin et al. (2008), PM6-F2, bound the dietary claim: removing both sulfur amino acids slowed whole-blood synthesis; a methionine-adequate cysteine-free diet did not lower erythrocyte synthesis in young men. | **Retained.** | Admitted. §3.1.1 Direct, capacity-requirement, ceiling biological-dependency. Supply: PM5 remains on this atom. |
| Glutamate (`PM6-DIT-2`) | Glutamate is the other amino-acid substrate of the first step. | The label names that substrate. | Misra and Griffith (1998), PM6-F1. No human dietary-glutamate result is in the assessed studies. | **Retained.** | Admitted. §3.1.1 Direct, capacity-requirement, ceiling biological-dependency. |
| Glycine (`PM6-DIT-3`) | Glycine is the substrate of glutathione synthetase. | The label names that substrate. | Polekhina et al. (1999), PM6-F1. Sekhar et al. (2011), PM6-F2, gave glycine with N-acetylcysteine; the synthesis rise does not isolate glycine. | **Retained.** | Admitted. §3.1.1 Direct, capacity-requirement, ceiling biological-dependency. |
| ATP (`PM6-DIT-4`) | Both enzymes consume ATP. | The label names the nucleotide, not a food. | Misra and Griffith (1998); Polekhina et al. (1999); PM6-F1. | **Retained** as a biochemical participant. | §3.1.2 only. Not a Dietary Requirement. |
| Magnesium ions (Mg²⁺) (`PM6-DIT-5`) | Glutathione synthetase binds one Mg²⁺ per subunit. | The label names that ion. | Polekhina et al. (1999), PM6-F1. Binding is not a dietary-magnesium result. | **Retained** as a catalytic ion. | §3.1.2 only. Not a Dietary Requirement. `cofactors` remains this name only. |
| Dietary protein (`PM6-DIT-6`, prior admission) | The mechanism requires cysteine (and the shared sulfur-amino-acid pool), not intact protein as such. | “Dietary protein” is the delivery category for amino acids. FAO (2013) scores protein quality, including methionine plus cysteine. It does not name a glutathione-synthesis exposure. | FAO Food and Nutrition Paper 92 recommends DIAAS and does not measure glutathione synthesis. Misra and Griffith (1998) measure the enzyme, not protein intake. Lyons used an amino-acid formula. Courtney-Martin held protein at 1 g/kg/day as background. Sekhar used N-acetylcysteine plus glycine. No assessed study isolates protein quantity or quality as the glutathione-synthesis exposure. | **Consolidated** into cysteine `PM6-DIT-1` and the established KC2 pool mapping. Original label: Dietary protein. Resulting target: Cysteine, with the shared-pool constraint remaining `BRS2-FM2-PM6-KCR-1`. Prior identifier `PM6-DIT-6` and its prior Derived admission are preserved here and removed from the preview page so the delivery row cannot render. | Not admitted. No new Derived protein atom. |
| N-acetylcysteine (`PM6-DIT-7`) | The tested exposure is supplemental N-acetylcysteine given with glycine to older adults. The biological target of that precursor is cysteine. | The label names the tested precursor, not a food category. Narrowing the public label to cysteine alone would claim an isolated cysteine effect the study did not make. | Sekhar et al. (2011), PM6-F2: older-adult erythrocyte fractional synthesis +78.8% and absolute synthesis +230.9% after the combined precursors. The methods PDF dose was not retrieved. | **Retained.** | Admitted. §3.1.1 Derived toward cysteine `PM6-DIT-1`, precursor-mediated, ceiling modulation-demonstrated. Limitation keeps the co-administration, the older-adult erythrocyte pool, and the exclusion of ordinary food, neurons and clinical outcomes. |
| Methionine as its own Dietary Requirement | The enzyme substrate is cysteine. The tested capacity constraint is loss of methionine and cysteine together. | “Methionine” would name a specific amino acid, not a food category. A methionine-only requirement would still add an exposure Lyons did not isolate. | Lyons et al. (2000) removed both sulfur amino acids. Courtney-Martin et al. (2008) held methionine at 14 mg/kg/day and varied cysteine, including zero, without an erythrocyte synthesis change. Misra and Griffith (1998) do not list methionine as a ligase substrate. Transsulfuration supply is already the PM5 indicator on cysteine. | **Consolidated** into the established KC2 pool mapping and the cysteine Supply: PM5 indicator. Not moved into a new §3.1.1 atom. KC membership was not used to admit it. | Not admitted as Direct or Derived. |
| Selenium | Not an assembly substrate. | The name is a nutrient, but the measured biology is glutathione peroxidase. | Mullenbach et al. (1987): active-site selenocysteine in human glutathione peroxidase. PM6-F1 excludes that enzyme from assembly. | **Rejected.** | Not a Dietary Requirement and not a §3.1.2 synthesis cofactor. Prior rejection kept. |
| Riboflavin | Not an assembly substrate or cofactor. | The name is a nutrient whose derivative, FAD, belongs to glutathione reductase. | Karplus and Schulz (1989). PM6-F1. | **Rejected.** | Not a Dietary Requirement and not a §3.1.2 synthesis cofactor. Prior rejection kept. |
| Cystine-containing foods and other protein foods | These would only deliver cysteine or the other amino-acid substrates. | Delivery category. | Food composition is not a glutathione-synthesis result. The dietary contract assigns food-source links to the food ontology. | **Rejected** as additional requirements. | Not admitted. |
| Isolated glycine supplementation | Glycine is already the admitted substrate. An isolated supplement effect was not tested. | A separate “glycine supplement” label would claim an exposure Sekhar did not isolate. | Sekhar et al. (2011) co-administered glycine with N-acetylcysteine. | **Unresolved** as an isolated intervention. | No additional atom. Gap: no assessed study of glycine alone on these assembly reactions. Follow-up: a human synthesis study that changes glycine without a cysteine precursor. |
| Isolated N-acetylcysteine | The admitted row is the combined protocol. | An isolated N-acetylcysteine label would exceed Sekhar. | Same study. The abstract names cysteine and glycine together. | **Unresolved** as an isolated intervention. | No second atom. Gap: methods PDF not retrieved, and the published result is combined. Follow-up: the dose record, and any study of N-acetylcysteine without glycine on blood-cell glutathione synthesis. |
| Serine | Not a substrate of either assembly enzyme. KC2 excludes serine from the shared pool and leaves PM-level serine open only where independently supported. | Not a delivery label for glutathione assembly. | No serine–glutathione-assembly study was in the PM corpus. Kumar and Yadav (2017) on the KC page support transsulfuration, which is PM5. | **Unassessed** for this PM. | Not admitted. Stopping reason below. |
| Glutamine as a glutamate precursor | Glutamate is the admitted substrate. | A glutamine label would be an upstream delivery/conversion claim. | No glutamine study was required to identify the ligase substrate, and none was in the corpus. | **Unassessed.** | Not admitted. Stopping reason below. |

No duplicate delivery-only requirement was newly admitted. Dietary protein was removed rather than renamed.

## Relationship decisions kept from the evidence

Direct/Derived was not reopened for the retained substrates. Cysteine, glutamate and glycine remain capacity requirements. Absence of a dietary dose-response does not remove them. N-acetylcysteine stays Derived because it is a precursor of cysteine, with the modulation ceiling limited to the combined older-adult protocol. That ceiling is not extended to ordinary food.

Type D for BRS2(KC2), arm `methionine-cysteine-sulfur-amino-acid-pool`, relationship `BRS2-FM2-PM6-KCR-1`, remains **established**, `constrained-by`.

Established links, not inference:

- Glutamate–cysteine ligase uses cysteine (PM6-F1; Misra and Griffith 1998).
- Removing methionine and cysteine together slowed whole-blood fractional synthesis from 0.65 ± 0.13 to 0.49 ± 0.13 per day and absolute synthesis from 747 ± 216 to 578.6 ± 135 µmol/L/day in seven healthy young men, while glycine intake rose and concentration stayed near 1.2 mM (PM6-F2; Lyons et al. 2000).
- With methionine at 14 mg/kg/day, cysteine intakes from 0 to 40 mg/kg/day did not change erythrocyte synthesis in four young men (PM6-F2; Courtney-Martin et al. 2008).

Inferred and not used for admission: ordinary mixed diets are commonly short of the pool; the same rate change occurs in neurons or clinical populations. Sekhar et al. (2011) does not establish the mapping. Public §3.1.3 stays the linked title “(Key Constraint) (KC2) — Methionine–Cysteine Sulfur Amino Acid Pool” and one sentence. No foods and no copied constituents.

KC2’s own glycine exclusion was not used to remove PM6 glycine. KC2’s cysteine membership was not used to admit PM6 cysteine. The PM atoms rest on PM6-F1 and PM6-F2.

## Optimisation Strategy follow-up

Dietary protein, methionine-as-its-own-requirement, selenium, riboflavin and food-source cystine were not admitted. None has an assessed intervention result on these two assembly reactions beyond the substrate and pool evidence already represented. No SOP candidate was surfaced. No `system_optimisation_practices` or lifestyle atom was added. The public sentences that none is established were left in place.

## Presentation on the preview page

§3.1.1 labels: Cysteine, Glutamate, Glycine, N-acetylcysteine. The renderer adds Direct/Derived, input type, derived target and the Supply: PM5 link. Bullets stay plain labels.

§3.1.2 labels: ATP, Magnesium ions (Mg²⁺).

Reader descriptions and Finding links:

| Label | Description | Finding |
|---|---|---|
| Cysteine | Cysteine is joined to glutamate in the first step of glutathione assembly. | PM6-F1 — Two ATP-dependent enzymes assemble glutathione (`#pm6-f1`) |
| Glutamate | Glutamate is joined to cysteine in the first step of glutathione assembly. | PM6-F1 |
| Glycine | Glycine is added in the second step that completes glutathione. | PM6-F1 |
| N-acetylcysteine | N-acetylcysteine is a supplemental precursor of cysteine that was given with glycine. | PM6-F2 — Blood-cell synthesis responds only under defined substrate conditions (`#pm6-f2`) |
| ATP | Both assembly enzymes use ATP, which the cell supplies. | PM6-F1 |
| Magnesium ions (Mg²⁺) | Glutathione synthetase binds one magnesium ion per subunit while it adds glycine. | PM6-F1 |

FAO (2013) remains in `static/bibtex/BRAIN-diet.bib` as `fao_diaas_2013`. It was removed from the preview bibliography because the preview no longer makes a protein-quality claim. References [1]–[9] are unchanged.

## Coverage and stopping rationale

The mission’s defining steps are the two assembly reactions. Their substrates, nucleotide and synthetase magnesium ion are already tied to Misra and Griffith (1998) and Polekhina et al. (1999). The dietary capacity boundary is already tied to Lyons et al. (2000) and Courtney-Martin et al. (2008). The only supplemental modulation result is Sekhar et al. (2011). Selenium and riboflavin are tied to the neighbouring enzymes.

Questions used for this pass:

1. Is dietary protein a glutathione-synthesis requirement, or only a delivery label for cysteine?
2. Does any assessed study isolate protein quantity, protein quality, methionine alone, glycine alone, or N-acetylcysteine alone?
3. Are selenium, riboflavin, ATP or magnesium dietary requirements of these two reactions?
4. Does the shared methionine–cysteine pool meet the Type D threshold on this PM’s own evidence?

FAO (2013) was already on the page and was enough to see that it evaluates protein quality rather than glutathione synthesis. No further protein-intervention search was run, because the candidate was delivery of an identified substrate and the contract’s worked example is this exact chain. Serine and glutamine were not searched: they are not substrates of either assembly enzyme, and serine’s transsulfuration role belongs to PM5. That is the stopping rationale. Schema validation is not treated as scientific completion.

## Evidence gaps

- Whether glutamate–cysteine ligase has a separate kinetic magnesium requirement. Only the synthetase ion is admitted.
- Ordinary mixed-diet inadequacy of the sulfur-amino-acid pool. Lyons used an experimental formula.
- Neuronal synthesis under the same constraint.
- Isolated N-acetylcysteine, isolated glycine, and the Sekhar milligram dose.
- A methionine-only removal study. The pool result is not that study.
- Clinical treatment of ADHD, recovery or stress. PM6-F3 and PM6-F4 remain negative for those outcomes.

## Flags not written to the queue

- PM6 → Dietary protein → substrate provision → sulfur-amino-acid delivery → FAO (2013) plus Misra and Griffith (1998) → consolidated; do not keep a Derived protein atom on the canonical page until this draft is accepted.
- PM6 → §3.1.2 reprints of cysteine, glutamate and glycine → same input, type and role as §3.1.1 → removed on the preview as true duplicates.
- PM6 §3.1.3 still uses the pool title. Individual KC input disclosures were not added, because the contract clauses conflict and constituent copying is prohibited.

## Files created

- `docs/system/stage2b-preview/brs2-fm2-pm6-glutathione-synthesis-stage2b-draft.mdx`
- `system/brs2-fm2-pm6-stage2b-preview-report.md`

Not modified: the canonical PM6 page, shared schemas, the dietary contract, the renderer, FM roll-ups, the change-control queue, and `static/bibtex/BRAIN-diet.bib`.

## Rerun against the updated Stage 2B instructions

The dietary contract and primary-mechanism schema now require a final distinctness review, and they give a PM6 separation example: cysteine’s assembly-substrate job stays in §3.1.1; a supported methionine–cysteine availability constraint may appear in §3.1.3 with a KC2 origin tag; a combined-withdrawal study must not be described as showing that each amino acid independently limits synthesis. Public §3.1.3 titles are the input or defined pool. The renderer supplies the origin tag from a constituent relationship. The earlier clause conflict, which left the parent KC title as the public row, is superseded by that instruction.

The scientific admissions from the first preview are unchanged. Dietary protein stays consolidated into cysteine. Cysteine, glutamate and glycine stay Direct substrates in §3.1.1. N-acetylcysteine stays a Derived precursor. ATP and magnesium stay §3.1.2 only. Selenium and riboflavin stay rejected. Methionine is not added as a separate §3.1.1 requirement: its precursor-to-cysteine job is the existing Supply: PM5 indicator on the cysteine atom. Repeating methionine or cysteine under KC2 would duplicate those jobs.

### Distinctness review

| Proposed id | Compared with | Job | Disposition | Public destination |
|---|---|---|---|---|
| BRS2-FM2-PM6-KCR-1 | §3.1.1 PM6-DIT-1 cysteine substrate; §3.1.1 has no methionine atom; §3.1.2 none; §3.2 none | Shared-pool shortage when methionine and cysteine are removed together. Cysteine omission alone did not do this when methionine stayed adequate. | distinct | Parent of the §3.1.3 disclosure |
| BRS2-FM2-PM6-KCI-1 | Same comparisons | Public trigger for that pool constraint | distinct | §3.1.3 bullet “Methionine–cysteine availability”, origin tag KC2 |
| BRS2-FM2-PM6-KCI-CYS | §3.1.1 PM6-DIT-1 | Same cysteine substrate job | consolidated as duplicate | Retained on PM6-DIT-1. Not a §3.1.3 bullet |
| BRS2-FM2-PM6-KCI-MET | §3.1.1 PM6-DIT-1 upstream Supply: PM5 | Precursor-to-cysteine delivery, not an independent glutathione limit | consolidated as duplicate | Retained as Supply: PM5 on PM6-DIT-1. Not a §3.1.3 bullet |

Evidence for the pool trigger: PM6-F2, Lyons et al. (2000), Courtney-Martin et al. (2008). Opened disclosure order is the reader sentence, five atoms, then the PM6-F2 link. KC2 has no atom whose name is the pool, so the constituent record is `legacy-unreviewed` with local flag `KC-CC-BRS2-FM2-PM6-01`. That flag is on this draft only. The production change-control queue was not edited. KIT-1 and KIT-2 are not used as the trigger.

Specificity dispositions from the first pass still stand, including dietary protein consolidated rather than admitted.

## Reassessment — KC2 disclosure consolidated as duplicate

The separate “Methionine–cysteine availability” disclosure does not identify a biological job beyond sulfur-amino-acid provision for glutathione synthesis. That provision is cysteine’s direct assembly-substrate requirement (PM6-DIT-1) and methionine’s precursor-to-cysteine requirement (PM6-DIT-9). Calling the same relationship a resource dependency, or attaching a KC2 origin tag, does not make it a different job.

Lyons et al. (2000) is bounded combined depletion: methionine and cysteine were removed together, and whole-blood synthesis slowed. Courtney-Martin et al. (2008) is the adequate-methionine boundary: cysteine removal did not lower red-cell synthesis while methionine stayed adequate. Those results limit the provision claims. They do not measure competition, allocation, or another bottleneck.

| Proposed id | Compared records | Disposition | Retained destination |
|---|---|---|---|
| BRS2-FM2-PM6-KCR-1 | §3.1.1 PM6-DIT-1, PM6-DIT-9; §3.1.2 none; §3.2 none | consolidated as duplicate | Applicability record kept. Public disclosure removed |
| BRS2-FM2-PM6-KCI-1 | Same | consolidated as duplicate | Evidence kept on PM6-DIT-1, PM6-DIT-9, and BRS2-FM2-PM6-KCR-1. PM6-DIT-8 removed |

KC2 applicability remains `established` on `kc_applicability_adjudications`. That presentation decision does not reject the applicability record. Canonical identifiers kept: `kc_id` / `ikc_id` BRS2(KC2), relationship BRS2-FM2-PM6-KCR-1. The local pool-trigger flag was withdrawn with the disclosure. The production change-control queue was not edited.

Methionine is admitted in §3.1.1 as Derived → Cysteine (PM6-DIT-9), precursor-mediated, claim ceiling biological-dependency. Supply: PM5 marks the conversion pathway. Cysteine remains the direct assembly substrate. Neither row claims a benefit from increasing an already adequate intake.
