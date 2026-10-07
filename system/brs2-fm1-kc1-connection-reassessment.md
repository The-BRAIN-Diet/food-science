# BRS2-FM1 — KC1 reconciliation and child-connection reassessment

Date: 2026-10-07. Scope: KC1, the four existing BRS2-FM1 children, and FM1's KC summary. Sequence: KC records reconciled first; PM1, PM2 and PM4 adjudicated independently; FM generated last. PM3's accepted pilot is unchanged. Other FMs and PMs were not reassessed in this pass.

## Governing decisions

Stage 2B is `system/dietary-input-traceability-contract.md`, particularly “Canonical iKC identity” and “KC relationship distinctness and duplication — final Stage 2B gate”; `system/primary-mechanism-schema.md` preserves section boundaries. Supported upstream supply establishes a source-supported replenishment pathway without requiring deficiency or increased output. Conditional constraint is the additional proposition that availability constrains the PM in a specified context. Publication distinctness is a separate decision: the same provision job is not published again because it acquires KC provenance. A supported mechanistic chain is permitted; no universal end-to-end human assay was imposed.

The old FM union read only `key_constraints`, which could omit accepted typed supply records or flatten them into a generic constraint. The FM schema now permits an explicit `kc_summary_mode: adjudicated-pm-relationships` for individually reassessed FMs. Other FMs keep their legacy checks until separately reviewed. No membership, adjacency or unresolved record can create a typed accepted connection. The new generator validates Finding IDs, their assessed citation keys, child bibliography destinations and limitations. Its structural pass does not adjudicate science.

## KC1 reconciled, not rebuilt

KC1 is the named folate/betaine/choline donor-resource network, not every substance involved in one-carbon metabolism. Folate carrier/substrate forms support the folate remethylation route; betaine is BHMT's donor; choline supplies betaine. The page now expressly separates membership, PM-specific supply and conditional limitation. It no longer implies that the choline-to-betaine route establishes increased SAM abundance.

| Constituent | Canonical substance | Existing membership/evidence ID | Identity result |
|---|---|---|---|
| Vitamin B9 (folate) | `vitamin-b9` | `BRS2-KC1-KIT-1` | Registry, page ID and path verified |
| Betaine | `betaine` | `BRS2-KC1-KIT-3` | Registry, user-added page ID and path verified; page unchanged |
| Choline | `choline` | `BRS2-KC1-KIT-2` | Registry, page ID and path verified |

Existing `constituent-v2` registrations and legacy whole-pool references were reused. No new identities or parallel registry. B12's catalytic participation is not KC1 membership. SAMe, creatine and genotype-specific riboflavin remain separately labelled emerging supports. There are no major identity flags or substance-creation actions for these three constituents.

## Independent decisions

| PM | Folate | Betaine | Choline | Stronger proposition still unresolved |
|---|---|---|---|---|
| PM1 — folate/B12 remethylation | Supported upstream supply, existing `PM1-DIT-2` | Not established as donor to MTR; parallel BHMT route is not inherited | Not established as donor to MTR | Pool inadequacy limiting tissue MTR capacity under relevant compensation/B12 conditions |
| PM2 — BHMT remethylation | Indirect constraint remains unresolved | Conditional constraint under depletion/pathway impairment, existing `PM2-DIT-1` | Conditional constraint on the same donor provision chain, existing `PM2-DIT-2` | Folate's indirect effect on BHMT capacity |
| PM3 — SAMe synthesis | Supported upstream supply, unchanged | Supported upstream supply, unchanged | Supported upstream supply, unchanged | Limiting effect on MAT-dependent synthesis; SAM concentration reflects consumption/turnover too |
| PM4 — integrated cycle flux | Supported upstream supply, existing `PM4-DIT-3` | Supported upstream supply, new `PM4-KC1-SUPPLY-2` | Supported upstream supply, new `PM4-KC1-SUPPLY-3` | Donor availability limiting net cycle rates or remethylation/transsulfuration allocation |

Pool relationship IDs: `PM1-KC1-FOLATE-SUPPLY`, `PM2-KC1-DEPLETION-CONSTRAINT`, existing `PM3-KC1-UPSTREAM-POOL`, `PM4-KC1-REMETHYLATION-SUPPLY`. Established adjudications match their exact relationship types. Prior decisions are retained in `kc_adjudication_history`; unresolved stronger propositions remain separate. KC2 statuses, missions, intervention dominance, phenome ratings and FM outcome confidence were not changed.

### Evidence and measured/inferred links

PM1: Froese et al. (2019), reviewed in PM1-F1, supports the folate/B12/MTR reaction and conversion of folate forms to the reaction's methyl-folate substrate. That supplies PM1 specifically. BHMT uses betaine in a different reaction; neither betaine nor its choline precursor becomes MTR's donor by pool membership. Pathway participation does not measure nutrient variation causing increased tissue MTR flux.

PM2: PM2-F1/F2 establish human BHMT reaction identity and the choline-to-betaine chain (Evans et al., 2002; Salvi and Gadda, 2013). PM2-F5 contains human depletion/repletion, rat rescue and pathway-specific inhibition. [da Costa et al. (2005)](https://pmc.ncbi.nlm.nih.gov/articles/PMC2424020/) measured eight men, lower plasma choline/betaine during depletion and a greater post-methionine-load homocysteine response in the four clinically depleted participants. These are donor-pool and challenge-response measurements, not direct human BHMT flux. [Setoue et al. (2008)](https://www.jstage.jst.go.jp/article/jnsv/54/6/54_6_483/_pdf) provides choline-deprived rat donor rescue; [Strakova et al. (2011)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3156413/) measures strong BHMT inhibition and altered homocysteine/SAM in rats. Together with reaction identity they support a bounded donor-availability constraint chain. Attribution to human BHMT alone remains inferential; the evidence does not establish a universal ordinary-diet limitation or benefit above adequacy. The folate indirect arm was not resolved by these betaine/choline results.

PM3: accepted source-supported methionine-regeneration chain retained exactly. No new decision based on SAM abundance or homocysteine lowering was made.

PM4: PM4-F1 establishes integrated remethylation/transsulfuration routing; PM4-F5 records the separately reviewed folate and betaine methionine-return routes and choline's precursor route. Froese, Obeid, Evans and Salvi evidence establishes route identity; Finkelstein supplies integrated-cycle context. BHMT's mainly hepatic/renal distribution and alternative methionine supply remain explicit. Their contribution to the cycle is supported; a change in integrated branch rates is not inferred. Existing human tracer boundaries remain intact, including PM4-F2's unchanged mean branch rates during moderate B6 restriction. New rows have `dietary_addressability: not-established`, `claim_ceiling: biological-dependency`; upstream supply was not promoted to proven intake responsiveness.

## Public consolidation and projections

The final distinctness review is `system/brs2-fm1-kc1-distinctness-review.json`. Each new individual edge was compared against §3.1.1, §3.1.2 and §3.2 with actual record IDs. Four repeated provision jobs are consolidated: PM1 folate; PM2 betaine and choline; PM4 folate. Their full atoms, canonical identity/membership, evidence and decision history remain. §3.1.3 provides a concise relationship/reference rather than another identical atom. Established applicability is not overwritten by “No mapping established.”

PM4's new betaine/choline jobs have no matching provision disclosure on that page. They render once under Individual KC inputs, after the bounded pool summary, using reader description → five atoms → Supporting mechanism research. This is supported supply, not proof of a distinct extra limiting bottleneck. §3.1.1 and §3.1.2 classifications and existing biochemical participants are preserved.

The actual substance projection gives:

- Folate: PM1, PM3, PM4 supported upstream supply.
- Betaine/choline: PM2 conditional constraint; PM3/PM4 supported upstream supply.
- B12: no KC1 constituent projection.

Types and exact individual limitations survive projection, including consolidated atoms. No automatic downstream inheritance or food rankings. FM1 now summarises four accepted connections, citing each PM's actual numbered bibliography. It does not assert that KC1 uniformly limits the FM.

## Verification

- Existing upstream-pilot, KC governance and legacy FM-pool tests passed (32 tests).
- New typed FM and actual constituent-projection tests passed (10 tests), including stale summary/inventory rejection, absent/unresolved adjudication exclusion, citation/Finding failure, consolidated publication, identity resolution and preserved matrix types/limitations.
- Final distinctness suite passed (6 tests). Review rows are structurally validated; semantic distinctness is established in this assessment, not inferred from different wording.
- Bibliography check: all 607 cited keys resolve among 1044 bibliography entries.
- Site-wide Scientific Findings freshness/model gate passed for 31 PM pages; phenome index/registry checks passed. Full mechanism validation remains non-clean: PM1's four pre-existing B9-form naming flags and PM1/PM2/PM4's pre-existing section-1 suffix flags remain, alongside unrelated legacy issues. No new PM4 addressability failures remain.
- Production build passed. Existing tag and broken-anchor warnings remain; this is not a clean-global-validation claim.
- Browser checked on fresh built site `http://localhost:3113`: KC1 membership boundary; PM4 pool/input placement, betaine keyboard opening and choline click-pinning, Escape dismissal with focus returned without reopening; five-field order; real PM4-F5 and bibliography anchors; folate cross-reference opens the retained biochemical group; FM1 typed table and child numbered citation destinations. Screenshots are in the workspace verification folder. The final three FM wording corrections were also verified on the live port-3000 page, including §2, §4.3, §5 and the appended numbered sources.
- PM3 is byte-for-byte unchanged from this task's starting snapshot. Protected missions, dominance, phenome and FM synthesis/rationale fields were compared to that snapshot and remain unchanged. No commit/deployment.

## Files changed in this pass

Canonical content:

- `docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool.mdx`
- `docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation.mdx`
- `docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation.mdx`
- `docs/biological-targets/brs2/fm1/brs2-fm1-pm4-methionine-cycle-flux.mdx`
- `docs/biological-targets/brs2/fm1/brs2-fm1-methylation-cycle-efficiency.mdx`

Shared derivation/governance:

- `scripts/lib/fm-kc-relationship-summary.mjs`
- `scripts/lib/fm-supporting-kc-pools.mjs`
- `scripts/lib/fm-synthesis-layout.mjs`
- `system/functional-mechanism-schema.md`

Audit and checks:

- `system/brs2-fm1-kc1-distinctness-review.json`
- `system/brs2-fm1-kc1-connection-reassessment.md`
- `scripts/fm-kc-adjudicated-summary.test.mjs`
- `scripts/kc1-fm1-constituent-projection.test.mjs`

## Remaining work

Individually resolve the stronger PM1 capacity, PM2 folate-indirect and PM4 integrated-rate propositions if new evidence permits; do not relabel them merely because supply is admitted. Separate review is needed for other FM KC roll-ups. The remaining legacy naming/section-title flags are outside this evidence reconciliation. No unresolved canonical identity blocks this FM1 summary.

## Subsequent user-requested FM wording correction

The user identified three remaining overclaims/repetitions after inspecting the KC table. §2 now names processes without uniform upward/downward arrows: “Methionine regeneration; SAMe production; homocysteine handling; methyl-group transfer.” §4.3 replaces the blanket four-PM impairment cascade with the measured PM2 depletion/challenge context and an explicit link to the accepted-connection table; PM1 tissue capacity, MAT synthesis and integrated-rate limitation remain unresolved. §5 now identifies actual shared resources/processes, distinguishes the candidate DHA-carrier connection from an established limiting relationship, and cites reused canonical evidence. Six reviewed source entries were appended to FM1's bibliography, preserving the first fourteen numbers. No child admission, rating or outcome-confidence uplift accompanied these edits.

The additional changed file is `scripts/fm-synthesis-layout.test.mjs`: its obsolete expectation that FM1 must still have a KC-union warning now requires the typed adjudication mode and no reconciliation issues. The full FM-layout suite still exposes an unrelated pre-existing missing citation destination on BRS2-FM3 (`fm-ref-7`); that source page was not changed. FM1's targeted regeneration, synthesis-layout and numbered-source checks pass. No global-clean claim is made.

## Accepted DHA connection wording clarification

Following the user's review of Derbyshire and Maes (2023) and Derbyshire (2019), FM1 §5 states the supported choline-to-PC connection and separately identifies Kennedy synthesis and betaine/SAMe contribution to PEMT. The unresolved proposition is resource limitation of adult brain DHA incorporation, not the existence of the supply pathways. The two narrative/context sources were appended as [21] and [22], retaining previous bibliography numbering. They do not resolve the limiting effect or establish benefit from additional intake. No PM/KC admission, projection or rating was changed. The citation-destination regression test now checks the real links without imposing a fixed bibliography length.
