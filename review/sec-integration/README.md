# Three-PM Proposed V1 Review

Isolated integration branch: `codex/sec-three-pm-integration`. Base: SAMe pilot
`98f7294088f1475c101cb0ff01ae11dc74d4af51`, which includes GABA and expanded
glycaemic pilots. Latest canonical main was fetched and compared before editing.
The three canonical PM files match that main baseline. Local approved SEC
governance supplements are retained; the main contracts have not been rewritten.

## Review Outputs

Complete canonical-shaped proposals:

- [GABA](drafts/gaba.mdx)
- [Glycaemic variability](drafts/glycaemic-variability.mdx)
- [SAMe](drafts/same-synthesis.mdx)

These are **drafts outside docs**, not registered PMs. Corresponding navigable
copies are under `docs/system/sec-calibration/v1/`, excluded from production by
the existing preview glob, including when the development opt-in is set.
Their front matter contains no PM, Finding, ontology or food-registration metadata.

The canonical-shaped drafts preserve `synthesised_evidence_confidence:
not-yet-scored` for compatibility; the proposed assessed values live in
[assessments.json](assessments.json), not in a silently extended canonical field.
The preview projects these records. Numerical production integration is gated on
the [migration proposal](sec-migration-proposal.md).

Run `node scripts/prepare-sec-v1-drafts.mjs` to reproduce the proposals.
It writes review artifacts and V1 preview copies only. Original canonical PMs,
three pilot pages, original assessments, bibliography, mappings and admissions
are preserved. [reconciliation.json](reconciliation.json) contains exact
before/after dispositions, selected six-atom interventions, archived candidates
and remaining questions. Each assessment preserves prior versions where changed.

## Shared Completion Gate

1. Preserve the mission and identify exactly what each source measured. Chemistry,
   model regulation, human dietary effects and clinical outcomes are distinct.
2. Curated reaction identity is provenance, not experimental replication or a
   numerical research-synthesis score.
3. Scores apply to exact propositions. Defensible complete factors permit Codex
   provisional status without human review; unresolved factors stay unresolved.
   Conditional scores remain explicitly conditional. Retain raw/adjusted totals,
   caps, evidence roles, recovery limits and history.
4. Preserve existing dietary atoms, Direct/Derived relationships, KC decisions
   and food-composition independence. New SOP/lifestyle selections are **proposals**
   with six atoms and exact Finding/source links, not automatic admissions from SEC.
5. At most three justified public SOPs and three lifestyle entries; no quota.
   Retain unselected evidence and proposed ownership follow-up without automatically
   admitting it to another PM.
6. Complete source sections, Lessons, references, connected PMs and phenome
   limitations remain available. Standard collapsed audits and the existing rubric
   legend are reused. Scoring does not invent review/correction status.
7. Structural tests do not establish scientific truth or constitute human review.

## Scientific Decisions

| PM | Before | Proposed V1 |
| --- | --- | --- |
| GABA | F1 reserve inference presented too strongly outside its conditional audit | Align statement, summary and synthesis to the approved narrower occupancy/reserve proposition; retain conditional 4/8 |
| GABA | F2 mixes activation chemistry, zinc ranking and regulation; Tang described as human protein | Retain curated PDXK/PNPO chemistry; scope the conditional 5/8 to in-vitro metal/nucleotide regulation; correct Tang to sheep-brain PDXK in draft evidence |
| GABA | F6 describes an anxiety improvement relative to placebo | Full-text Results: within-B6 improvement, but anxiety interaction p=0.140; visual interaction p=0.011. Correct claim and study assessment; no GABA-synthesis SOP |
| GABA | Four generic preparation bullets and two generic lifestyle bullets lack exact PM9 evidence | Zero selected SOPs/lifestyle protocols; retain advice/candidate history, not public PM9 recommendations |
| Glycaemic | F1 causal all-endpoint claim with adjusted 2/8 | Explicit observational cohort proposition with inconclusive high-excursion endpoints; separately reassess 4/8 and retain prior score/history |
| Glycaemic | Fish-before-rice occupies a leading SOP slot | Preserve F2 and 4/8, source and acute-dispersion scope; not a leading V1 SOP |
| Glycaemic | Broad aerobic advice and exposure-only sitting evidence risk endpoint transfer | Select grain-processing and early-eating SOPs; interval walking and brief vigorous activity lifestyle protocols. Keep acute exposure, nulls and other candidates in audit |
| SAMe | F1/F4 headline Findings mostly restate elementary chemistry | Proposed curated provenance with retained IDs, complete original records and source links; no numeric score for chemistry |
| SAMe | F1 implies convergent settled substrate order | Retain ATP-first versus rapid-equilibrium random disagreement; no universal order claim |
| SAMe | Generic legume preparation lacks MAT-flux intervention evidence | Zero selected SOP/lifestyle protocols; retain methionine provision without enhancement claim |
| SAMe | Experimental MAT2B stability material embedded in chemistry | Proposed F5, provisional 5/8 (2+1+1+1), expressly model-bounded and non-exclusive of allostery |

## SEC Decisions

| PM / Finding | Directness / Bias Protection / Precision / Replication | Raw / Adjusted | Status |
| --- | --- | --- | --- |
| GABA F1 | 1 / conditional 1 / conditional 1 / conditional 1 | Conditional 4 / 4 | Conditional estimate |
| GABA F2 | 2 / conditional 1 / conditional 1 / conditional 1 | Conditional 5 / 5 | Conditional estimate |
| GABA IC1, F3-F7 | Essential source-specific judgements incomplete | Not calculated | Not scored |
| Glycaemic F1, new scoped observation | 2 / 1 / 1 / 0 | 4 / 4 | Provisionally assessed; prior causal 3 / 2 archived |
| Glycaemic F2 | 2 / 1 / 1 / 0 | 4 / 4 | Provisionally assessed |
| Glycaemic F3 | 2 / 1 / 1 / 0 | 4 / 4 | Provisionally assessed |
| Glycaemic F4 | 2 / 2 / 1 / 1 | 6 / 6 | Provisionally assessed; exposure context only |
| Glycaemic F5 | 2 / 2 / 1 / 0 | 5 / 5 | Provisionally assessed |
| Glycaemic F6 | 2 / 1 / 1 / 1 | 5 / 5 | Provisionally assessed |
| Glycaemic F7 | 2 / 1 / 1 / 0 | 4 / 4 | Provisionally assessed |
| Glycaemic F8 | 2 / 1 / 1 / 0 | 4 / 4 | Provisionally assessed |
| SAMe F1/F4 | Curated provenance; numerical factors not applied | Not calculated | Not scored |
| SAMe F2/F3/IC1 | Construct gaps / interpretive constraint | Not calculated | Not scored |
| SAMe proposed F5 | 2 / 1 / 1 / 1 | 5 / 5 | Provisionally assessed |

GABA F3-F7 remain individually identified contextual records, not unscored
evidence supporting a new intervention. Their full four-factor appraisal is a
post-V1 improvement when no stronger claim depends on them. F7 full methods were
not recovered in this consolidation; that access limitation is not negative evidence.
The approved central conditional estimates must not be promoted by arithmetic.

## Dietary and KC Reconciliation

- **GABA:** B6-to-PLP supply retained; glutamate remains dietary No. Historical
  PLP atom, unresolved dietary value and Direct classification remain traceable
  without a second primary dietary explanation. Adjudicating that historical
  record is separate from presenting B6 supply. KC applicability and limitations
  are unchanged. Food composition is not suppressed for No/Unset.
- **Glycaemic:** canonical dietary inventories and KC adjudications are unchanged.
  Proposed public selections are two SOPs and two lifestyle protocols, each with
  Input, Input type, Biological role, Evidence source, Limitation and Dietary input.
  Dietary SOPs are Yes; exercise protocols No. These values do not turn either
  group into nutritional capacity requirements.
- **SAMe:** methionine remains the single primary Dietary Requirement; protein's
  delivery record remains stored, not separately primary-presented. ATP, Mg and K
  retain biochemical roles and dietary No values. Folate, betaine and choline
  upstream relationships remain; KC1 is supported upstream supply, not a proven
  limiting constraint; KC2 remains unresolved. B12's upstream role remains linked
  through PM1, not an invented new PM3 admission. Existing pending food-mapping
  reviews remain pending.

## Intervention Selection

| Public draft | Exact evidence / scope | Disposition |
| --- | --- | --- |
| Less-processed whole-grain package | PM2-F5 / Aberg 2020: two-week matched package; daily SD and MAGE, mixed other outcomes | Proposed SOP; not a single-grain/fibre promise |
| Early/front-loaded eating | PM2-F6 / Bruno 2024, partial Jamshed 2019 corroboration; specified windows, small cohorts | Proposed SOP; not an isolated circadian mechanism |
| Supervised interval walking | PM2-F7 / Karstoft: tested two-week programme versus inactive period | Proposed lifestyle; not all aerobic exercise |
| Brief vigorous activity bouts | PM2-F8 / Babir: 48-hour secondary variability effects; primary mean null | Qualified proposed lifestyle; suitability/medication limits |
| Fish-before-rice | PM2-F2 / Kuwata: acute within-meal SD in diabetes | Retain finding, not leading SOP; no rejection of biology |
| Whey, vinegar, post-meal walking, sitting breaks | Exposure benefits or null/inconclusive variability; protocol-specific evidence retained | Not PM2 public variability levers; PM1/PM3 follow-up only, no automatic remapping |
| GABA generic food prep, meal timing, exercise, stress recovery | No exact PM9 synthesis proposition established from attached sources | Not selected; no assertion that these behaviours lack other benefits |
| SAMe legume/mixed-protein preparation | Methionine delivery is not demonstrated MAT-flux optimisation | Not selected; ordinary food-composition information retained |

## Readiness

**Ready for V1 scientific review:** three complete proposals, preserved missions
and dietary/KC records, conditional GABA estimates, provisional glycaemic and SAMe
experimental assessments, curated chemistry, bounded interventions and audit history.

**Requires decision before rollout:**

- Accept proposed claim corrections and intervention removals/selections above,
  especially GABA F6, glycaemic F1's new proposition/score and SAMe provenance/F5.
- Approve SEC sidecar/reference storage, canonical validator/rendering compatibility,
  stable references and production audit navigation before numerical release.
- Approve new glycaemic intervention IDs and associated food-strategy retirement/
  registration. Existing roll-up metadata must not silently keep retired public
  strategies or register proposed strategies without review.
- Reconcile legacy profile layout/promoted-group metadata with current canonical
  layout tooling during the separately approved integration. Numbered source
  sections and stable lookup IDs are preserved in these drafts.
- Resolve the inherited scientific-findings suite failures through the approved
  integration plan: GABA generated-section freshness; a legacy PM9 section-order
  expectation; and a stale contract-text assertion for Type D shared-constraint
  wording. All three also fail in the unchanged SAMe pilot checkout. No canonical
  regeneration, validator or test weakening was performed here.

**Can improve after V1:** historical paper/table recovery, full SEC appraisal of
context-only GABA findings, identical-endpoint MAT2B replication, Touhamy/Dempsey
recovery, broader transportability, long-term outcomes and fuller human review.
Do not block these bounded drafts merely because an old paper is inaccessible.
No review/correction completion is inferred from this work.

No commit, push, merge, PR, deployment or production-schema change is authorised.

## Local Verification

- Nine new integration tests pass: three full MDX compilations, exact proposition
  links, six atoms, stable history, raw/cap checks, production isolation and
  byte-preservation of canonical files/contracts.
- Combined SEC, dietary traceability and scientific-findings run: 132 tests,
  129 passed, three inherited failures above. The untouched baseline reproduces
  those same three failures (30/33 scientific-findings tests pass).
- Docusaurus development compile succeeds using a checkout-local Webpack cache.
  Earlier servers are left intact; no production build, cache deletion,
  permission/limit change or shared cache write is required.
- Review preview routes: `/docs/system/sec-calibration/v1/gaba`,
  `/docs/system/sec-calibration/v1/glycaemic-variability` and
  `/docs/system/sec-calibration/v1/same-synthesis`; append `?review=1`
  for assessment and intervention decisions.

## Exact Proposed File Set

| File | Purpose |
| --- | --- |
| `review/sec-integration/drafts/gaba.mdx` | Complete canonical-shaped GABA proposal |
| `review/sec-integration/drafts/glycaemic-variability.mdx` | Complete canonical-shaped glycaemic proposal |
| `review/sec-integration/drafts/same-synthesis.mdx` | Complete canonical-shaped SAMe proposal |
| `review/sec-integration/assessments.json` | 22 individual versioned assessments/constraints and original history |
| `review/sec-integration/reconciliation.json` | Baseline SHA, scientific changes, six-atom selections, candidate/category reviews |
| `review/sec-integration/README.md` | Completion gates, before/after decisions, SEC table and readiness |
| `review/sec-integration/sec-migration-proposal.md` | Unimplemented backward-compatible production migration |
| `docs/system/sec-calibration/v1/gaba.mdx` | Production-excluded navigable GABA copy |
| `docs/system/sec-calibration/v1/glycaemic-variability.mdx` | Production-excluded navigable glycaemic copy |
| `docs/system/sec-calibration/v1/same-synthesis.mdx` | Production-excluded navigable SAMe copy |
| `scripts/prepare-sec-v1-drafts.mjs` | Deterministic review-only projection with latest-main baseline guard |
| `scripts/sec-v1-integration.test.mjs` | Focused integration/claim/status/isolation checks |
| `src/components/SecCalibrationPreview/V1Preview.tsx` | Existing Finding/disclosure/indicator composition for V1 previews |
| `src/components/SecCalibrationPreview/EvidenceAudit.tsx` | Preview-route assessment selection; correct null historical-total display |
| `src/components/SecCalibrationPreview/assessmentAudit.mjs` | Three additional isolated preview routes only; governance states unchanged |

Local ignored launch config `docusaurus.sec-v1.config.ts` and its checkout-local
cache are environment support, not proposed production configuration changes.
Seven ignored generated runtime dependencies were copied unchanged from the
SAMe checkout, not regenerated or scientifically modified.
