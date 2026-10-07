# PM3 KC1 individual-input pilot — implementation and verification

2026-10-07. Individual inputs belong exclusively to §3.1.3 in this pilot. §3.1.2 retains methionine, ATP, Mg²⁺ and K⁺; the mission, existing Direct/Derived classifications, KC2 unresolved decision and phenome ratings remain unchanged.

## Decisions and canonical identities

| Input | Substance ID | Registered KC membership | Decision and evidence |
|---|---|---|---|
| Vitamin B9 (folate) | vitamin-b9 | BRS2-KC1-KIT-1 | Supported upstream supply through folate/B12 remethylation (PM1); Froese 2019 [7], Obeid 2013 [8]. Functional B12 and tissue/alternative supply remain relevant. |
| Betaine | betaine | BRS2-KC1-KIT-3 | Supported upstream supply through hepatic/renal BHMT remethylation (PM2); Obeid 2013 [8], Evans 2002 [9]. Not a local route in every tissue. |
| Choline | choline | BRS2-KC1-KIT-2 | Supported upstream supply by oxidation to betaine then PM2; Obeid 2013 [8], Salvi and Gadda 2013 [10]. Membrane/neurotransmitter roles are not admitted here. |

Each has its own five atoms, reader description, numbered evidence sources, PM pathway and canonical PM3-F4 research link. The pool summary remains separate. These routes do not establish increased MAT flux, SAMe abundance or extra-intake benefit. KC1's limiting effect on MAT synthesis remains unresolved.

All three identities resolve against registry and page records. The user-added betaine page has id `betaine` and explicitly identifies glycine betaine/trimethylglycine. Its registry and source page were not edited by this pilot. The former missing-betaine action is recorded resolved; no active identity flags remain for these three inputs. Subsequent food relationships remain a pending evidence task; no food pages, rankings or dropdowns were built.

## Governance and legacy usage

Canonical KC membership and individually adjudicated PM applicability are separate. KC1's existing constituent evidence IDs register its members without creating new substance identities. `constituent-v2` distinguishes this meaning from existing whole-pool/constraint-arm uses of iKC. Existing pool references are explicitly preserved as legacy references; other PMs/KCs are not migrated or silently reinterpreted. B12 route participation does not confer KC1 membership.

Supported upstream supply no longer requires deficiency or measured limitation. Conditional constraint still requires an evidence-supported resource constraint in its context. The exact Markdown, records and existing renderer integration excerpt are embedded in the governing Stage 2B dietary-input-traceability contract. PM, KC and substance schemas reference that rule. Missing identity requires a major flag and repair action while preventing unreliable matrix projection.

## Actual verification

- 53 focused tests passed, 0 failed: upstream-resource-pilot, dietary-lever-traceability, KC evidence governance and PM requirement headings.
- The documented example is exercised through actual disclosure and matrix builders with canonical dependencies; mutation tests reject unadmitted individuals, excluded memberships, invalid identity and preview/downstream inheritance.
- Bibliography check passed: all 607 cited keys present among 1044 entries.
- Production build succeeded. Existing site-wide broken-anchor warnings remain; this is not a warning-free build.
- Live canonical PM3 browser check: pool plus three individually named inputs appear in §3.1.3; biochemical section remains separate. Choline shows description → five atoms → research navigation. Its [8], [10] and PM3-F4 anchors exist. Folate/Betaine disclosures were checked with their PM1/PM2 links and evidence. Escape dismissal was checked without immediate reopening. Existing shared hover/focus/click behaviour was preserved; no separate mobile/touch hardware test was performed.
- Betaine's live substance page renders one admitted PM3 matrix row, labelled Supported upstream supply, retaining its full limitation and [8]/[9] PM citations. Automated tests verify equivalent folate and choline projections and exclude B12.

Site-wide mechanism validation is NOT clean. PM3 retains pre-existing legacy section-name/order failures (`missing_intervention_section`, `overlay_section_order`, `pm_section4`). BRS3-FM2-PM4 retains five Finding-source/reuse failures. FM1's existing KC citation/PM-union warning also remains: upstream-supply admission must not silently change an FM constraint roll-up. No FM science or roll-up was changed in this bounded pilot. These require separate reconciliation, not an assertion that all global checks passed.

Logs: `/tmp/pm3-corrected-final-tests.log`, `/tmp/pm3-corrected-bib.log`, `/tmp/pm3-corrected-mechanisms.log`, `/tmp/pm3-corrected-build.log`.

## Files changed in this pilot

- `docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx`
- `docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool.mdx`
- `system/dietary-input-traceability-contract.md`
- `system/primary-mechanism-schema.md`
- `system/key-constraint-schema.md`
- `system/substance-page-schema.md`
- `scripts/lib/kc-evidence-governance.mjs`
- `scripts/lib/dietary-input-traceability.mjs`
- `scripts/lib/dietary-lever-disclosure.mjs`
- `scripts/lib/substance-input-pages.mjs`
- `scripts/lib/mechanism-page-validation.mjs`
- `src/lib/dietaryLeverDisclosure.ts`
- `src/components/PmDietaryLeverEnhancer.tsx`
- `src/data/dietaryOriginProjection.mjs`
- `src/theme/SubstanceMatrix/index.tsx`
- `src/theme/DocItem/Content/index.tsx`
- `scripts/dietary-lever-traceability.test.mjs`
- `scripts/upstream-resource-pilot.test.mjs`
- `system/brs2-fm1-pm3-kc1-ikc-pilot-report.md`

Changes are uncommitted; unrelated workspace work is preserved.
