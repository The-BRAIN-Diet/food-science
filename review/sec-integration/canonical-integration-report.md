# Controlled local canonical integration

Branch: `codex/sec-three-pm-integration`. Approval: user's Scientific Approval:
Three-PM V1 Integration. No commit, push, PR, merge or deployment performed.

## Applied science

- GABA: qualified occupancy/reserve F1 (conditional 4/8); experimental PDXK F2
  (conditional 5/8, Tang sheep-brain correction); F6 anxiety comparator corrected
  while preserving visual outcome. No selected generic SOP/lifestyle advice.
- Glycaemic: scoped observational F1, provisional 4/8; earlier adjusted 2/8
  archived. All eight Findings, nulls and limits retained. Two SOPs and two
  lifestyle protocols, not a quota of three. Fish/rice evidence retained but
  its PM2 selected strategy relationship retired; PM1 remains unchanged.
- SAMe: F1/F4 curated provenance, not manufactured numerical confidence;
  binding-order disagreement preserved. Model-bounded F5 provisional 5/8.
  Bailey retains its existing citation identity and declared shared use with
  F1/F4, not an additional independent replication. No generic preparation SOP.

All dietary atoms, Direct/Derived classifications, accepted upstream supplies,
KC decisions, food composition and existing bibliography are preserved.

## Versioned evidence and registration

49 pinned snapshots retain every available prior pilot record and 22 current
assessments. The original PMs are byte-preserved in the history files and checked
against recorded SHA-256 and baseline Git objects. The new versions record user
integration authorisation, not qualified human review. Review and correction
statuses remain independent, with missing statuses still explicitly unavailable.

| Immutable PM relationship | Finding | Food strategy |
| --- | --- | --- |
| PM2-SOP-2 | PM2-F5 | food-strategy-485ec8fa28a2 |
| PM2-SOP-3 | PM2-F6 | food-strategy-e67a5bf54b65 |
| PM2-LIFE-2 | PM2-F7 | None: non-dietary |
| PM2-LIFE-3 | PM2-F8 | None: non-dietary |

The old PM2-SOP-1 and PM2-LIFE-1 identities remain in the archived source/history,
never reassigned. `food-strategy-053016fdaaca` remains registered for PM1-SOP-2.
The projection has 27 strategy groups and 28 PM relationships. New protocol food
and substance joins remain empty, with explicit data-quality gaps; no join or
nutrient equivalence was invented. The ignored runtime projection was regenerated
with the existing generator alongside its tracked system outputs.

## Technical verification

- 162/162 focused SEC, historical-pilot, canonical-integration, dietary-traceability
  and food-mapping tests pass, including all three MDX compilations.
- All three PM schema checks pass; all 58 Findings-owned pages pass the shared
  Finding-model/freshness gate.
- `node scripts/check-sec-assessments.mjs HEAD`: 49 snapshots valid.
- `git diff --check`: passes.
- Canonical localhost routes on port 3004 verified: GABA six atoms and curated
  source links; two glycaemic SOPs/two lifestyle protocols and six-atom source
  disclosure; SAMe Methionine six atoms and descending five-food animal list;
  mineral composition retained with Dietary input No. SF-to-versioned-audit
  links open the correct assessments, including earlier glycaemic 2/8 history.
- GABA lesson remains byte-identical between F1 and F2. Explicit authored-island
  markers preserve it during future Findings sync. An explicit PM-local source
  annex preserves curated/primary source entries during reference sync without
  relaxing numbered-reference equality or anchor checks.
- Historical pilot tests now compare to their archived original PMs, not newly
  approved canonical revisions; separate canonical tests verify the new science.

## Remaining limitations

The full scientific-findings test file still hits an unrelated existing
`BRS1-FM1-PM1` relationship lacking the expected Finding-ID array. PM1 is unchanged;
the assertion remains intact. A separate dopamine documentation-example test has
two existing source/citation-example drift failures; its PM, renderer and contract
are unchanged. None was repaired by weakening scientific assertions or editing
another PM. These wider suite issues require separate scope before a completely
green repository-wide release gate can be claimed.

Production publication must supply `SEC_BASE_REF` (or an explicit CLI published
base) to protect nonempty immutable history. The current checkout has no
deployment workflow to configure; no build/deployment configuration was invented.
Only local compilation and focused tests were run, not a full production build.

GABA B/P/R uncertainties and honest unscored contextual findings remain. Missing
paper access, mixed endpoints and missing food joins are documented limitations,
not silently zero-scored evidence or new clinical claims. No unexpected scientific
admission decision was required beyond the approval.

## Exact implementation file set

Paths below are relative to this isolated checkout.

Canonical pages:

- `docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx`
- `docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation.mdx`
- `docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx`

Storage and technical contract:

- `system/sec-assessments/registry.json`
- `system/sec-assessments/integration-history.json`
- `system/sec-assessments/README.md`
- `system/sec-assessments/history/gaba-before-v1.mdx`
- `system/sec-assessments/history/glycaemic-variability-before-v1.mdx`
- `system/sec-assessments/history/same-synthesis-before-v1.mdx`

Infrastructure, generation and rendering (includes previously approved changes):

- `package.json`
- `scripts/check-sec-assessments.mjs`
- `scripts/integrate-sec-three-pms.mjs`
- `scripts/sync-sec-canonical-sections.mjs`
- `scripts/lib/sec-assessments.mjs`
- `scripts/lib/sec-pilot-baseline.mjs`
- `scripts/lib/scientific-findings.mjs`
- `scripts/lib/scientific-findings-gate.mjs`
- `scripts/lib/pm-reference-index.mjs`
- `scripts/lib/mechanism-page-validation.mjs`
- `src/lib/secAssessments.mjs`
- `src/components/SecAssessment/index.tsx`
- `src/components/PmCuratedProvenance.tsx`
- `src/components/ScientificFinding.tsx`
- `src/components/ReviewCorrections/DocUtilityBar.tsx`
- `src/components/SecCalibrationPreview/EvidenceAudit.tsx`
- `system/generated/food-strategy-rollup/index.md`
- `system/generated/food-strategy-rollup/rollup.generated.json`
- `src/data/foodStrategyRollup.generated.json` (ignored runtime projection)

Tests changed/added:

- `scripts/sec-canonical-integration.test.mjs`
- `scripts/sec-assessment-integration.test.mjs`
- `scripts/sec-v1-integration.test.mjs`
- `scripts/scientific-findings.test.mjs`
- `scripts/dietary-lever-traceability.test.mjs`
- `scripts/input-substance-food.test.mjs`
- `scripts/sec-calibration-preview.test.mjs`
- `scripts/sec-evidence-audit.test.mjs`
- `scripts/sec-glycaemic-preview.test.mjs`
- `scripts/sec-glycaemic-stage2.test.mjs`
- `scripts/sec-same-preview.test.mjs`

Existing approved uncommitted review drafts, assessment/reconciliation artifacts,
three V1 preview routes, `prepare-sec-v1-drafts.mjs`, `V1Preview.tsx` and the
earlier preview-route addition in `assessmentAudit.mjs` remain preserved. No
authoritative Stage 2A/2B contract or unrelated PM has been changed.
