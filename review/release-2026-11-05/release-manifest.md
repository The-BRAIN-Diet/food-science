# Release reconciliation — 5 November 2026

Status: local release gates PASS under the explicit, release-only legacy mechanism exception; publication and production verification pending. This is not a claim of repository-wide mechanism compliance.

Repository: `work/brain-diet-v1-quantitative`; branch `review/brs5-pm4-sec-assessment`; pre-release HEAD `f1607fe5dcb150fdac1ca7fc2e2a146c45ecc60c`. Verified GitHub main baseline: `4eeca5349d359dce76f7f8f75f950ba2d77cf118`. Use remote `github`, not local `origin`. Exact release commit will be recorded in the PR validation evidence after committing.

## Included / excluded

Include approved PM1 completion; SOP/Lifestyle Batches 1–3 admissions and independent SEC records; LAT1 mission/SF work and authorised DIT-3 relocation; phytate/oxalate and CoQ ontology; new BRS4-FM1-PM10; approved presentation, reference and lesson repairs; governance clarification; knowledge hub and workstream provenance. Prior Cursor integration remains preserved. Exact file allowlist: `file-scope.json`.

Exclude `review/training-foundations-2026-11-03/`, all `build-validation/`, caches, logs and temporary source retrievals. Urolithin A and endurance training remain deferred. Included proposal/review records are history, not activation of unapproved admissions or Stage 2C. No new scientific discovery or redesign during release.

## Independently passing gates

- Focused regressions: **142/142**, zero failed/skipped (SEC integration, canonical SEC, Batches 1–3, CoQ, PM1, reference cleanup, substance schema, independent intervention pathway, production memory, pathway removal, dietary governance and BRS6 PM3 SOP SEC).
- Dietary governance: **65 PMs, zero issues**.
- SEC: **139 snapshots**, valid registry, canonical references and immutable history against GitHub main.
- Findings: **65 PMs, zero problems**.
- Bibliography: all **1,035 cited keys** present in **1,477 entries**.
- Presentation: **691 protected files**, no unapproved structural changes; approval baseline was not regenerated.
- Substance validation: pass.
- Production build: **exit 0**, **304.65 seconds**, **1,159 HTML files**. Node 20.11.0; `NODE_OPTIONS=--max-old-space-size=4096 TERSER_PARALLEL=1 DOCUSAURUS_NO_PERSISTENT_CACHE=1 SEC_BASE_REF=github/main npm run build -- --out-dir build-validation/release-2026-11-05`. `/usr/bin/time -l` maximum resident set size **3,019,210,752 bytes**; this is the reported process maximum, not total machine memory. Existing undefined-tag, anchor and Browserslist warnings remain. Localhost uses separate generated/output directories and remains available.
- Earlier build omitted the documented cache-disable variable and exhausted the 4 GiB heap (exit 134); the complete supported configuration passed without increasing the heap or changing deployment configuration.
- Browser: PM1 family/category disclosures retain beef, eggs and whey; six atoms and independent Section 4 navigation work. LAT1 exact breakfast comparison opens, preserves blood/brain limitations and explicitly remains intervention-SEC Not yet assessed. CoQ SF5 opens with pending appraisal status; canonical substance pages load. Prior batch-specific browser checks remain recorded in their handoffs. Built LAT1 HTML includes the final numbered reference links.

## Explicit release-only mechanism exception

Author approved comparing exact individual diagnostics, not aggregate counts. Main has **131 distinct errors**; release has **111**, all exact baseline matches after only checkout-path normalisation, with **20 resolved and zero new/changed diagnostics**. Validator continues to fail; no suppression or baseline regeneration. `legacy-mechanism-release-gate.json` retains complete inventories and validator/dependency SHA-256 versions. `legacy-mechanism-remediation.md` retains all 111 affected mechanisms/files with validator severity Error (further scientific severity triage pending). Future releases need their own decision or remediation.

## Authorised reconciliation and fixtures

LAT1 DIT-3 historical evidence preserved and relocated to an independently identified SOP; no SF SEC inherited. Two Lifestyle input-type defects and verified Zeisel references repaired. Existing food-strategy identifiers/scopes and unresolved MoA metadata normalised without stronger claims. Numbered reference rendering restored using existing conventions.

Author explicitly approved independent intervention evidence: primary references, measured outcome, PM relevance, typed limitations and a valid pinned intervention-specific SEC can satisfy intervention evidence without manufacturing a new SF. The narrow validator extension checks record ownership/hash and retains all bibliography checks. It does not relax dietary-input admission or assign new scores.

Obsolete fixtures were updated only for subsequently authorised changes: PM1 additional whey SOP, lesson placement, reference labels, independent SEC metadata, and canonical food-strategy identity. Historical snapshot and scientific-field comparisons remain. No broad snapshots replaced or tests skipped. CoQ preservation checks reconcile later approved batches against saved before-records.

## Publication

Commit, push, PR and normal merge are authorised after gates pass. Record exact release/merge/deployed commits and live CoQ inspection in the publication handoff. Do not bypass protections, claim production repaired before deploy verification, or include excluded drafts.
