# Controlled Stage 2A/2B test — BLOCK

Baseline: `codex/food-target-integration` at `96b08913b917fffb8c96862ac4aab50a46a8d4fe`.
Isolated branch: `codex/brs5-scfa-controlled-test`.
Location: `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/brs5-scfa-controlled-test`.
The approved integration checkout and main were not modified. The test is uncommitted and was not pushed.

## Canonical target and mission

**BRS5-FM2-PM5 — SCFA Production & Signalling**

> Maintain short-chain fatty acid production and signalling that supports gut barrier and brain communication.

Canonical source: `docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx`.

Butyrate is one of the SCFAs covered, alongside acetate and propionate. This is not a butyrate-only PM. Its production function concerns microbial conversion of substrates into products; PM4 concerns upstream substrate-processing ecology/selection, and PM1 concerns the receiving epithelial barrier. These relationships do not require a PM redesign for this test. The signalling/brain part of the mission is not evidence that extra substrate or higher faecal SCFA improves cognition.

## Stage 2A — bounded assessment

All seven attached references were inventoried and assessed. Targeted primary retrieval addressed four specific gaps: inulin production, primary pectin fermentation evidence, apple pectin composition, and chicory inulin composition. Search terms, actual sources, dispositions and stopping rationale are in `retrieval-log.json`. No unrelated PM or comprehensive literature rebuild was undertaken.

The evidence supports conditional microbial substrate supply and specified downstream experimental actions. It does not establish an end-to-end food → butyrate → human brain/ADHD benefit. Such a clinical outcome is not required for a legitimate Type A capacity relationship.

- [Baxter 2019](https://journals.asm.org/doi/10.1128/mbio.02566-18): supports preparation- and community-dependent responses. The tested potato intervention was extracted type-2 resistant starch; its effect cannot be assigned to every resistant-starch food.
- [van Trijp 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10901090/): requires anatomical and tracer qualification. An ileal null does not refute colonic fermentation, but separately infused SCFAs do not prove labelled-substrate conversion.
- [Pascale 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9460662/): a systematic review; it should not read as an additional primary culture experiment. [Bang 2018](https://pmc.ncbi.nlm.nih.gov/articles/PMC6004267/) supplies bounded primary pectin-fermentation support.
- [Boets 2015](https://pubmed.ncbi.nlm.nih.gov/26516911/): supports an inulin production candidate through isotope-based modelling, with absorption assumptions. A null faecal butyrate change is not evidence of no fermentation.

The attached Hoyles and Rose experiments remain limited to their tested acids, cells and exposure conditions. Steckler remains observational context. Silva remains mechanistic synthesis. No new scores, replication claims or human dietary-effect claims were assigned.

## Stage 2B — dietary levers

| Input | Relationship | Receiving-operation classification | Test disposition |
|---|---|---|---|
| Resistant potato starch | Type A Capacity | Direct to microbial production | Existing admission retained. Specific assessed-input binding unresolved; ordinary foods held out of the screened export. |
| Studied FOS/GOS preparation | Type A Capacity | Direct to microbial production | Existing admission retained. Exact formulation binding/food equivalence unresolved; source interpretation needs qualification. |
| Pectin | Type A Capacity | Direct to microbial production | Current canonical identity resolves. The prospective test gate passes; apple supply is provisional and qualitative. |
| Inulin | Type A capacity candidate | Direct to microbial production | Researched candidate only; not silently added to PM admissions. |
| Active SCFAs | Downstream regulatory actions; no new dietary Type B admission | Direct active-metabolite exposure versus Derived substrate-mediated supply must be assessed at the receiving signalling operation | Existing non-dietary biochemical inventory retained. |

Direct here describes substrate entry into the production operation. It does not deny microbial conversion, cross-feeding or bioavailability limitations. The same substrate-to-metabolite route would be Derived relative to a separate receiving signalling mechanism and would need supported pathway metadata; none was fabricated. A mechanism-active metabolite or a verified conversion alone does not establish a dietary Type B relationship.

The new prospective identity gate does not accept the two qualified historic input labels as identical to their generic canonical parent records. This is an input/formulation reconciliation issue, not proof that those substrates lack biological relevance. Pectin resolves without this mismatch. Historical admissions remain untouched and explicitly distinguished from new test adjudications.

## Foods, warnings and manuscript output

The four existing class-level RS food edges remain **verified**: green/unripe bananas, cooked black beans, cooked chickpeas, and preparation-qualified baked/boiled then chilled potatoes. Their ripeness, cooking and service-state qualifications are retained. No stale missing-composition-edge request is created for them.

However, the raw PM extractor attaches all four to **Resistant potato starch**. That is a scientifically unsafe specificity jump: verified generic class content does not establish the particular input being assessed. The controlled screen therefore retains these as related family-food evidence, not trial-matched supplies. It leaves one unresolved specific-input supply row rather than exporting four misleading specific-input food rows. It does not delete or downgrade the canonical class edges.

Target-scoped research recovers **apples → pectin** as research-supported provisional supply, using the existing [Liu 2023 primary composition source](https://pubmed.ncbi.nlm.nih.gov/37327923/). It does not derive pectin quantity from total fibre or equate apple matrix with purified citrus pectin. The shared rendering helper supplies the small red information icon and a precise pending-edge warning above the six atoms. This new research record remains in the controlled report; it was not added to canonical food edges or a repository-wide ledger.

Chicory-root inulin composition is recorded prospectively using a primary chemical-characterisation source. It is excluded from the admitted-PM manuscript because the unchanged PM does not admit inulin. Purity/extraction yield is not a food concentration. No food is labelled as directly supplying butyrate on the strength of precursor composition.

`scientifically-screened-manuscript.json` has three conditional historical-input rows: unresolved specific potato-starch supply, unresolved studied FOS/GOS supply, and provisional apple/pectin supply. It is a screened test artifact, not an approved replacement global roll-up. `raw-target-extraction.json` preserves the six raw projected rows for comparison. `related-rs-family-foods.json` preserves all four valid class-food relationships. The target queue distinguishes apple composition repair from input/exposure review; it does not mislabel the four existing RS class edges as missing.

## Material issues and controlled result

Six controlled checks produced **three passes and three blocks**:

- **BLOCK:** specific-input versus parent-class food exposure matching.
- **BLOCK:** FOS/GOS source assessment lacks the required site/tracer distinctions.
- **BLOCK:** pectin study assessment does not disclose its review design.
- **PASS:** supported provisional apple/pectin appears with correct display metadata.
- **PASS:** repaired RS class edges are not stale-queued.
- **PASS:** inulin research does not automatically create an admitted input.

`run-brs5-pm5-controlled-stage2ab.mjs` exits 1 for this BLOCK result. The three blocked checks are substantive scientific extraction checks, not failures of the existing software regression suite. Corrective source wording and identity/exposure reconciliation are proposed in the review artifacts; canonical PM prose/Findings/admissions were not silently rewritten to make the test pass.

## Validation and preservation

- Existing focused infrastructure suite: **184/184 passed**.
- Governance: **64 PMs**, zero new issues.
- Scientific Findings consistency: **58 PMs**, zero problems.
- SEC history: **69 snapshots**, valid and unchanged.
- Existing substance/inverse relationship safeguards passed within their configured scope.
- PM5 MDX compiled; diagnostic HTML checks confirmed six atoms, the combined warning position and provisional icon/message.
- No tracked changes to PMs, foods, registry, bibliography, governance or SEC/CC records. Only the scoped review directory and test harness were added.
- Approved integration checkout remains clean at the exact baseline commit. No main update, PM8 rerun, scoring or rapid reassessment occurred.

The diagnostic HTML is not a modified live canonical PM page. A new full production build/browser deployment was not attempted; prior resource limitations remain separate from this scientific verdict.

**Final verdict: BLOCK for rapid reassessment.** The PM is a defensible target for conditional substrate-production assessment, but the specific-input food join and source-interpretation issues must be reconciled before this PM can be treated as a scientifically reliable manuscript abstraction. Existing ontology gaps and unverified microbial/brain pathways remain explicit; no quantity or conversion evidence was invented.
