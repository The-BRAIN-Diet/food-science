# BRS2-FM3-PM7 — focused KC2 reassessment

Date: 2026-10-07. Repository: `/Users/paulhouston/Food Science/food-science`; branch `kc-supply-reconciliation`; starting HEAD `774c86aaa527ac397f9ffc7e37158917d4a4cfaf`. Scope: PM7's existing unresolved KC2 conditional-constraint proposition, primary evidence appraisal and FM3 consistency. No deployment, commit, contract changes or new dietary admissions.

## Decision

**Methionine → MAT/SAM → PEMT-dependent PC methylation is a supported upstream provision chain. The additional proposition that the shared methionine–cysteine pool creates a distinct conditional constraint on PM7 remains unresolved.** These are separate conclusions. Upstream location, absence of a human trial and absence of an absolute-flux assay are not exclusion reasons.

The earlier F6 appraisal was incomplete: its concentration-only characterisation did not cover newer tracer evidence, and the eritadenine comparison required qualification. Corrected F6 and its underlying audit now recognise these results. Existing missions, dietary atoms, KC1 admissions, phenome ratings and intervention classifications are preserved. FM3 remains byte-for-byte unchanged because no additional KC relationship has been admitted.

| Question | Evidence-supported conclusion | Missing inference / disposition |
|---|---|---|
| Methionine supplies methyl groups through SAM | Reaction chemistry, dietary perturbation and new PC methyl-tracer evidence support the supply chain | Supported biology; no assumption that extra adult intake benefits cognition. This focused conditional-constraint review does not automatically create a new Direct/Derived or iKC atom. |
| Named methionine–cysteine pool constrains PEMT beyond provision | Existing dietary studies distinguish methionine-associated methyl provision from cystine responses | Unresolved: establish an additional allocation, competition or other bottleneck attributable to this pool in a specified context; assess compensation. |
| Genetic impairment of SAM production | MAT1A deletion affects the PEMT endpoint in the previously appraised mouse evidence | Not interchangeable with dietary sulfur-pool inadequacy. Full assay-method access remains outstanding. |
| Separate public KC2 disclosure | No distinct admitted constraint has been established | Audit-only; no KC2 entry in public requirements or FM3's admitted roll-up. Supported supply is not rejected, and unresolved is not evidence of absence. |

## Primary evidence reviewed

| Source / exact location | Measured link | Inference and boundary |
|---|---|---|
| [Sugiyama 1998, primary abstract](https://pubmed.ncbi.nlm.nih.gov/9560797/) | Methionine-dose-associated hepatic SAM and microsomal phospholipid changes, with/without eritadenine | Pool composition is not synthesis rate. Full diet/adequacy methods were not obtained. |
| [Shimada 2003, Methods and Table 4, pp744–747](https://www.jstage.jst.go.jp/article/bbb/67/4/67_4_743/_pdf) | With choline maintained, methionine changed hepatic PC/PE measurements; cystine improved growth without that lipid response | Growth adequacy and methyl provision are different endpoints; cysteine sparing cannot be assumed to reproduce methionine's methyl effect. |
| [Sugiyama 1995, primary publisher abstract](https://www.sciencedirect.com/science/article/pii/095528639400017G) | Eritadenine reduced labelled methyl incorporation into PC; direct assay addition did not inhibit PEMT | Qualifies the 1998 interpretation: eritadenine is not a selective PEMT blockade. SAH-related metabolic changes accompany the response. Full methods unavailable. |
| [Cano 2011, indexed primary abstract](https://pubmed.ncbi.nlm.nih.gov/21837751/) and prior canonical appraisal | MAT1A loss affected the PEMT endpoint in mice | Genetic loss does not isolate dietary methionine–cysteine limitation. Full-text retrieval failed; no claim of a new full-method review. |
| [Robinson 2016, primary abstract](https://pubmed.ncbi.nlm.nih.gov/27469995/) | Under restricted methionine, removing dietary methyl donors increased PC synthesis while reducing creatine synthesis | Context-dependent partitioning; donor restriction cannot be equated with uniformly reduced PC formation. Combined donor exposure does not isolate KC2 constituents. |
| [Asiriwardhana 2025, full primary XML: Methods, Results and Figure 4C](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC12799531/fullTextXML) | Dietary methionine-dependent methyl incorporation into hepatic PC | Cysteine held constant; neonatal diets and competing demands bound interpretation. No added free choline, but lipid emulsion supplied PC. The authors do not resolve both PC pathways' total flux. |

The 2025 tracer result closes the old concentration-only evidence gap. It does not make PC-pool concentrations equivalent to flux in the older experiments, establish independently limiting cysteine, or establish a different biological job merely because the citation set changed.

## Contract and distinctness review

Governing files read: Stage 2B `system/dietary-input-traceability-contract.md`, whole-PM `system/primary-mechanism-schema.md`, Stage 2A `system/scientific-finding-schema.md`, and KC evidence-review guidance `system/kc-page-evidence-review-contract.md`.

Stage 2B's conditional-constraint gate requires evidence connecting **“inadequacy or imbalance of that named pool or state”** to a **“constraint on this PM’s governed capacity”**. It permits explicitly supported upstream chains; it does not universally require human, deficiency or absolute-flux experiments.

The KC distinctness gate asks **“What different biological job does this KC relationship explain?”** Its operational rule states: **“A KC disclosure whose stated job is sustaining that same capacity is the same relationship.”** A supported mechanistic chain must establish the further constraint; different input names, types, provenance tags or studies are insufficient.

Comparisons performed:

- §3.1.1: PM7-DIT-3 and PM7-DIT-4 provide methyl groups through dietary choline forms; preserved.
- §3.1.2: PM7-DIT-1 = PE substrate; PM7-DIT-2 = SAM substrate, with PM3 contextual supply. Methionine-to-SAM provision explains this upstream substrate supply; it does not alone establish the proposed additional pool limitation.
- §3.2: no admitted intervention record changes this comparison.
- Final presentation disposition for the proposed additional KC2 constraint: **unresolved**. No duplicate or unresolved additional public disclosure was added. Evidence and previous decisions remain in F6 and `kc_adjudication_history`.

No contract defect or rendering defect caused this scientific gap. The old appraisal's limited retrieval and endpoint framing needed correction; the remaining limitation is evidential. A full individual methionine dietary/supply admission would require its own five-atom decision and identity-linked record, rather than being inferred from this conditional-constraint review.

## Canonical identity follow-up

KC2 currently registers methionine as BRS2-KC2-KIT-1 with canonical substance identity. Its cysteine scientific constituent row has no separately registered constituent identity and retains a legacy pool identifier. **MAJOR identity-audit flag:** reconcile cysteine membership through the existing canonical workflow before an identity-based cysteine projection. This implementation gap is not grounds for rejecting supported cysteine biology and does not determine the conditional-constraint decision. KC2 was inspected, not edited.

## Bounded retrieval and stopping point

Search questions: dietary methionine adequacy versus supplementation; measurements of PC methyl incorporation; eritadenine specificity; MAT1A assay context; cysteine compensation and competing methyl demands. Existing records were reviewed, primary Shimada PDF and 2025 full XML examined, and material primary abstracts assessed. Sugiyama 1998 publisher access failed; Cano full XML retrieval returned a server error. These access failures are disclosed, not filled with guessed methods.

Further research must distinguish the named pool's additional bottleneck from substrate provision and explain compensation. More homocysteine, SAM-concentration or generic methionine-pathway papers alone would not resolve that question. This pass stops after correcting the measured/inferred chain; it does not force rejection or a new mapping.

## Verification results

- PM7 canonical page validation: **pass**, zero issues.
- Findings schema/freshness, reference numbering/destinations and bibliography-key resolution: **pass**. Original references 1–15 preserved; three references appended as 16–18.
- Preservation checks: unchanged mission, classifications, dietary/KC1 records and all Findings except F6; **pass**.
- FM3 exact-file preservation, typed child-derived summary equality and reconciliation: **pass**; KC2 absent from admitted union.
- Final distinctness report checked by existing validator: **pass**. Evidence adjudication remains a scientific review, not a string-matching conclusion.
- Governance/distinctness/FM summary suites: **33 tests passed, 0 failed**.
- Broader four-suite run: **60 passed, 3 failed**. Unchanged legacy failures: global PM section-order assertion, PM9 section-order assertion, and a stale instruction-text regex expecting the former Type D heading. No test or shared instruction was changed to conceal them.
- Site-wide mechanism validation remains **not clean**. Compared with the saved starting baseline: **zero newly introduced issue lines**; PM7 and FM3 themselves pass.
- Production build: **pass**, with existing warnings, including bibliography anchors resolved after client hydration.
- Localhost browser: corrected F6 opens; nested study appraisals open; reference 18 navigates correctly. All three new canonical bibliography anchors and DOI destinations verified after refresh/hydration. KC1's folate/betaine entries remain; no KC2 disclosure appears. Folate five-atom disclosure and supporting research link preserved.

Logs, primary XML, focused checks and browser proof: `/Users/paulhouston/Documents/Codex/2026-10-01/we/outputs/pm7-kc2-focused/`.

Files changed by this pass:

1. `docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx` — F6, precise unresolved record/history, linked scope correction and appended references.
2. `static/bibtex/BRAIN-diet.bib` — three primary-source entries.
3. This report.

An unrelated BRS1 DHA-PM7 edit appeared during this pass and was left untouched. FM3, KC2, shared contracts and renderer were not edited. No deployment or commit.
