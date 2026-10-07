# BRS1 PM3, PM4 and PM7 — focused upstream-supply implementation

Date: 2026-10-07. Branch: `restore-pm-lifestyle-levers`. Base HEAD: `fd21f1f2e179e3686e0499550034812e8dd5daf5`. Implemented against the current working-tree contracts; existing unrelated uncommitted work preserved. This implements the focused review in `system/brs1-kc1-and-pm3-pm4-pm7-upstream-supply-review.md`; it is not a comprehensive new Stage 2A/2B assessment of every candidate.

## Accepted decisions and public presentation

| PM | Pool and individually admitted input | Disposition and boundary |
|---|---|---|
| BRS1-FM1-PM3 | BRS1 KC1 / tyrosine | Supported upstream supply; retain the existing Direct tyrosine disclosure in §1.1.1, with a reference in §1.1.3 rather than a second full copy. Competitive limitation remains unresolved. |
| BRS1-FM1-PM4 | BRS1 KC1 / tyrosine | Supported upstream precursor supply through dopamine synthesis; not the immediate DBH substrate or a newly inferred Direct dietary requirement. |
| BRS1-FM1-PM3 and PM4 | BRS2 KC1 / folate, betaine, choline, individually assessed | Supported upstream methionine/SAM supply to the resource used by COMT. No claim that ordinary intake increases neuronal SAM, COMT flux or signalling. |
| BRS1-FM3-PM7 | Cross-BRS BRS2 KC1 / choline only | Supported upstream methyl-derived LPC-DHA carrier route; the stronger donor-limitation question remains unresolved. Folate and betaine remain audit-only pending an input-specific carrier chain. |

Phenylalanine remains unresolved for the additional PM-specific precursor disclosures. Tryptophan is not admitted as catecholamine substrate supply. Vitamin B12 participation in remethylation does not confer BRS2 KC1 membership. No entire pool membership list or downstream PM admission was inherited.

## Evidence and measured versus inferred links

The native precursor route reuses Fernstrom (2013)'s LNAA synthesis/transport review, with its evidence-reuse status stated rather than claiming independent replication. PM3's tyrosine substrate and its supply context are one provision job.

The COMT route reuses the reviewed BRS2 methionine/SAM supply evidence (Froese, Obeid, Bailey, Evans and Salvi) and adds Lotta et al. (1995), DOI `10.1021/bi00013a008`, PMID 7703232, for human COMT enzyme chemistry. Lotta's primary abstract was retrieved; full methods/results were not obtained in this pass. Enzyme SAM use and upstream resource replenishment establish biological supply relevance, not a measured dietary effect on neural catecholamine clearance. Peripheral BHMT evidence is not evidence of neuronal BHMT.

Klatt et al. (2019), DOI `10.1017/S0007114519002009`, full Results and Figures 5–7: higher choline intake increased methyl-derived d3-LPC/d3-LPC-DHA enrichment; intact-choline d9 routing is distinct. Total plasma LPC-DHA did not increase with intake (main effect P=.91). Isotope enrichment is not absolute PEMT flux or net carrier production. Nguyen et al. (2014), DOI `10.1038/nature13241`, abstract and figure descriptions: cell transport and mouse knockout/uptake evidence establish the LPC-DHA transport connection. The joined route supports supply towards the brain, not measured adult human neuronal incorporation or a demonstrated dietary limiting effect. Salvi is review evidence, not new primary replication.

## Identity and projections

Verified existing substance IDs: `tyrosine`, `vitamin-b9`, `betaine`, `choline`.

Verified KC membership references: `BRS1-KC1-KIT-2` (tyrosine), `BRS2-KC1-KIT-1` (folate), `BRS2-KC1-KIT-3` (betaine), `BRS2-KC1-KIT-2` (choline). No new substance identity or registry was invented.

Actual generator tests yield nine accepted resource edges: tyrosine → PM3/PM4; folate → PM3/PM4; betaine → PM3/PM4; choline → PM3/PM4/PM7. Each retains `supported-upstream-supply` and the source limitation. No tryptophan, phenylalanine or B12 edge is inherited. Negative tests block draft records, missing identities and absent memberships. No major canonical-identity flags remain for these admitted records; no substance/food creation or rankings were undertaken.

PM7's existing `PM7-DIT-2` choline record was retained and moved from biochemical presentation to the KC resource layer, with its role corrected to the evidence-supported upstream chain. It is not rendered twice. The before snapshot preserves its prior wording and classification. PM3 retains `PM3-DIT-5` and its Direct classification. Distinctness reviews cover all nine individual relationships against §3.1.1, §3.1.2 and §3.2; PM3 tyrosine is explicitly consolidated.

## Verification actually performed

- 10 focused implementation tests passed: scientific-record consistency, canonical membership, five-atom renderer payloads, bibliography/Finding links, exact projection edges, duplicate consolidation and negative projection gates.
- 30 shared KC governance, presentation and distinctness tests passed.
- Scientific Findings freshness: 31 PMs checked, zero issues.
- Bibliography: 609 cited keys present; 1046 entries.
- Production build succeeded, output under the separate workspace outputs directory.
- All three target PMs are absent from final mechanism-validation errors. Global validation remains unclean: PM issues fell from 57 to 54; two existing FM KC/child-union failures remain. Existing site-wide broken-anchor/tag build warnings remain. This is not a clean global-validation claim.
- Snapshot comparison preserved each target mission, intervention-dominance value, Phenome relationships and prior bibliography order.
- Browser: PM3 Betaine shows reader description, five fields and final Finding link; keyboard focus previews, clicking pins, Escape closes without immediate reopening, and a later focus cycle previews again. PM4 Tyrosine opens with Enter and closes with Escape. PM7 shows only the admitted Choline under cross-BRS KC1, with five fields, the explicit limitation and correctly resolving local bibliography/Finding targets. Origin tags are separate links. Pointer-hover and mobile touch were not independently exercised; their shared renderer code was unchanged.

Evidence, validation logs, implementation manifest and before snapshots: `/Users/paulhouston/Documents/Codex/2026-10-01/we/outputs/brs1-upstream-implementation/`.

## Files changed in this focused implementation

- `docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx`
- `docs/biological-targets/brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation.mdx`
- `docs/biological-targets/brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation.mdx`
- `docs/biological-targets/brs1/kc/brs1-kc1-amino-acid-quality-and-competitive-balance.mdx` (connection descriptions, following the preceding constituent reconciliation)
- `docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool.mdx` (accepted cross-BRS supply connections)
- `static/bibtex/BRAIN-diet.bib` (Lotta and Klatt primary citations appended)
- `scripts/brs1-upstream-supply-implementation.test.mjs`
- This implementation report.

No shared renderer, instruction/schema, FM science, FM roll-up, rating or food record changed in this pass. No commit or deployment performed.

## Next bounded task

Reconcile the affected FM summaries from the independently adjudicated child relationships, preserving supply versus constraint types and their limitations. Do not silently translate these supply admissions into an FM constraint claim. Further comprehensive PM assessment, especially PM4's broader scope/intervention evidence, is separate; these focused relationships do not require a second implementation pass.
