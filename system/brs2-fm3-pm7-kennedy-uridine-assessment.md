# PM7 Kennedy pathway / uridine — focused Stage 2A/2B assessment

Date: 2026-10-08. Canonical implementation authorised by the user. Existing uncommitted PM7 work was retained; a pre-edit snapshot was used for preservation checks. This is a focused scope/provision assessment, not a new Phenome or complete optimisation-practice review.

## Decision and scope

PM7 remains Phosphatidylcholine Formation and now covers hepatic PEMT plus Kennedy-pathway PC formation. Mission, Overview, primary effects and mechanistic detail were reconciled. PM7-F8 owns the nucleotide-provision proposition; prior Findings remain intact. Kennedy evidence is marked `fm_rollup: false`. The parent Methylation–Membrane Coupling FM explicitly covers the PEMT branch, without automatically importing Kennedy findings or ratings. There is no replacement PM, new KC or altered Phenome score.

## Governing rules

Read Stage 2A `scientific-finding-schema.md`, whole-PM `primary-mechanism-schema.md`, Stage 2B `dietary-input-traceability-contract.md`, their five-atom, specificity, identity and Finding/reference requirements, and existing PM7 reports/records.

Stage 2B, “Claim thresholds”: “Biochemical necessity, dietary provision, demonstrated modulation and functional or clinical benefit are distinct claims.” Its Stage boundary requires a focused Stage 2A Finding before admitting a newly established provision claim. PM7-F8 supplies that assessment.

Stage 2B Direct/Derived clause: “Direct: the dietary input itself has the evidence-supported relationship to the PM-governed biological objective/state (capacity or state-regulation).” Derived must name a Direct target. Uridine is therefore Direct / Precursor at **dietary-provision**, not an indispensable requirement or direct PEMT reactant. Its supported relationship is provision to PC precursor capacity; the intermediary conversion remains explicit. CTP is a biochemical participant, not an admitted dietary target. A provisional Derived-to-CTP overlay failed `dla_derived_target_not_direct` and was corrected without changing the contract or admitting dietary CTP. UMP is a distinct tested exposure, not silently equated with free uridine.

## Evidence chain and measured endpoints

| Source | Examined material / measured result | Inference and boundary |
|---|---|---|
| Ulus et al. 2006; DOI 10.1007/s10571-006-9004-5 | Primary full text, Methods/Results. Rat slices exposed to nucleosides; at 400 μM uridine, CDP-choline formation increased 61%; acetylcholine release was not reduced. | Supports nucleotide provision to a Kennedy intermediate. Does not measure absolute PC synthesis flux or dietary effects in people. No acetylcholine-benefit claim. |
| Cansev et al. 2005; DOI 10.1016/j.brainres.2005.07.054 | Primary publisher abstract and accessible result excerpts. Oral UMP in gerbils increased brain uridine, UTP, CTP and CDP-choline. | Supports oral-form-to-brain-precursor provision. Pool abundance is not synthesis flux; UMP gavage is not ordinary-food uridine. Full paper not retrieved in this pass. |
| Wurtman et al. 2006; DOI 10.1016/j.brainres.2006.03.019 | Full primary PDF, Results §2.1/Table 1A. Four-week UMP on a choline-containing diet increased gerbil brain PC abundance by 13%; combined UMP/DHA response larger. | Adds an actual lipid-pool endpoint. Does not isolate a human uridine effect, measure synthesis flux or count synapses. Combination changes are not attributed solely to uridine. |
| Agarwal et al. 2010; DOI 10.1111/j.1399-5618.2010.00884.x | Indexed primary article Methods/result excerpts: 17 healthy men, randomised uridine/placebo, 1 g twice daily for seven days; increased phosphomonoester MRS signal. | Connected supportive evidence. MRS precursor pools do not specifically establish CTP supply, PC accretion or cognition. Full article access was intermittent; no unverified detailed effect estimate used. |

Measured links: direct uridine exposure → CDP-choline formation in rat slices; oral UMP → brain nucleotide pools in gerbils; dietary UMP → PC abundance in gerbils. The enzymatic conversion chain is supported mechanistically, not measured end-to-end in humans. Existing Vance and PEMT Findings retain the separate methylation route. No Kennedy result is evidence of increased PEMT activity.

## Candidate disposition

| Candidate | Biological role / specificity | Disposition |
|---|---|---|
| Uridine, PM7-DIT-7 | Specific nucleoside precursor to nucleotide provision; distinguish UMP and CTP. | Admit Direct / Precursor provision in §3.1.1 with full five atoms and PM7-F8. No indispensability, dose, above-adequacy benefit or food claim. |
| CTP, PM7-DIT-8 | Intracellular substrate used with phosphocholine to form CDP-choline. | §3.1.2 biochemical substrate only; not dietary CTP. |
| DAG, PM7-DIT-9 | Defined intracellular lipid substrate pool receiving phosphocholine. | §3.1.2 biochemical substrate only. Does not make DHA universally required for PC formation. |
| Choline, PM7-DIT-10 | Kennedy starting substrate. | Separate §3.1.2 reaction role using verified choline identity. Original methyl-provision atom PM7-DIT-3 remains unchanged; no repeated identical disclosure or KC inheritance. |
| UMP | Phosphorylated exposure providing uridine. | Retain exact form in appraisals; no automatic free-uridine equivalence or extra supplement regimen. Separate future form/identity assessment if authoring a UMP entry. |
| Cytidine | Alternative pyrimidine tested in the same slice experiment. | No additional dietary admission: species transport/metabolism and oral provision require their own appraisal. |
| ATP / kinase ions / phosphocholine / CDP-choline | Reaction cofactors/intermediates rather than additional generic dietary targets. | No new dietary admissions. Reaction intermediates explained in the pathway; standalone cofactor inventories require specific primary enzymology if pursued. |
| DHA / other fatty acids | DAG composition and membrane lipid context. | No universal DHA requirement inferred for PC synthesis. Combination animal evidence retained with limits; existing DHA PM ownership preserved. |

No new KC/iKC membership or applicability follows from these additions. All original KC and Phenome records, original six traceability atoms and original Findings were compared with the pre-edit snapshot and preserved exactly. Diet-Supported qualification and no-principal-route assessment remain unchanged: the new precursor/lipid-pool evidence does not establish comparative intervention dominance or a human optimisation regimen.

## Identity / next-step queue

Canonical registry and substance paths were searched for uridine/UMP, CTP/cytidine triphosphate and DAG/diacylglycerol. No canonical records were located. Each new unresolved identity carries `canonical_identity.status: missing-substance`, severity MAJOR and a PM `pending_actions` entry. Choline resolves against the existing registry/page.

Do not invent IDs, expose a guessed substance destination or project missing identities into substance BRS matrices/food relationships. Resolve these via the canonical registration workflow. For uridine, separately assess food composition, exposure form, processing and provision after identity repair; no rankings fabricated. CTP and DAG biochemical roles do not authorise food targets. QC correction FW046 records the applied scientific repair and pending identity actions.

## Verification

- Changed PM7 and FM3 both pass shared mechanism-page validation with zero issues.
- PM7 MDX compiles; canonical Finding section matches the shared renderer.
- Shared disclosure map produces uridine/CTP/DAG five-field payloads with citations and PM7-F8 navigation.
- Original Findings, atoms, KC, Phenome and dominance records preserved by deep comparison.
- Bibliography key validation passes globally; refs 1–18 retained, new refs appended 19–22.
- Browser: uridine click and keyboard opening, ordered description → five atoms → research link; Escape hides the disclosure and returns focus. All PM citation anchors and PM7-F8 anchor resolve. Central bibliography destinations checked after review-server refresh.
- Broader scientific-Finding tests: 27/30 pass; failures concern BRS1-PM1/PM9 section expectations and the old “shared-constraint” contract heading. Dietary traceability suite: 20/21 pass; failure is a state-regulation guard fixture. These are outside the focused PM7/FΜ validation, which passes. Shared code/instructions were not modified to hide failures.
- QC suite: 7/9 pass; existing FW007/FW008 verification and PM-open-issue checks fail. FW046 passes the register validation; no unrelated QC records changed.
- No deployment or production build claimed. Development route and actual MDX compilation verified. No full-system completion claimed.

## Files

- `docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx`
- `docs/biological-targets/brs2/fm3/brs2-fm3-methylation-membrane-coupling.mdx` (coverage boundary only)
- `static/bibtex/BRAIN-diet.bib` (four references appended)
- `system/framework-qc/framework-issues-register.json` (FW046)
- This report.
