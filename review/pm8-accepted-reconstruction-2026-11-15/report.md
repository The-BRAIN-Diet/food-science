# PM8 accepted-output reconstruction — local review

Owner revised the reference maximum to 30. The active PM retains **27 references and seven Findings**: PM8-F13, F16, F17, F19, F20, F22 and F23. The 27 references comprise 25 considered evidence records plus the two contextual references retained in F13. This preserves its unchanged appraisal; no additional studies were introduced.

Accepted DHA, urolithin A and ellagitannin dietary records; energy restriction and admitted milled-flaxseed SOPs; and physical activity remain unchanged, with qualifications. Retained Finding objects, ratings and admission records compare exactly with the archived original. No SOP was promoted to a Dietary Lever.

Retired investigations, hypotheses, reconstruction history, evidence gaps and candidate-only Findings are removed from active frontmatter and body. The complete original is preserved under `before/docs/` here, outside publication directories. No archive section was added to the PM. Targeted incoming-link searches found no links to retired PM8 evidence anchors in docs, canonical viewer data or static viewers. Governance history remains intact. Retired anchors are not redirected to other claims.

Original numeric reference anchors are retained, with deliberate numbering gaps. Both generator and client disclosure lookups resolve explicit numbers instead of assuming array positions. Browser verification found 27 reference anchors and zero broken inline reference targets after this repair.

## Changed files

- PM8 canonical MDX: accepted-output reconstruction and affected Findings/reference projection.
- `scripts/lib/pm-reference-index.mjs`: stable explicit reference numbers and integrity validation.
- `scripts/lib/dietary-lever-disclosure.mjs` and `src/lib/dietaryLeverDisclosure.ts`: matching reference lookup.
- `src/lib/pmAssociationPilot.mjs`: tolerate retired optional investigation array.
- `scripts/pm8-accepted-reconstruction.test.mjs`: current reconstruction regression coverage.
- `system/pm-evidence-tabs-contract.md`: bounded superseding owner decision.
- This recovery folder and handoff pointer: preservation and verification evidence.

## Verification

20/20 focused reconstruction, reference and ranked-viewer tests passed (`tests.txt`). Ranked viewer equivalence: **984 connections**. Protected hashes confirm rankings, observations, viewer datasets, shared bibliography, SEC and QC inputs are unchanged. Active generated viewer records contain no retired PM8 hypothesis/Finding IDs; no broader viewer regeneration was necessary. Deterministic Findings generation and MDX compilation pass.

Desktop and 390-pixel mobile rendering inspected; no horizontal page overflow. Seven Findings render with accepted-output associations. Retired queues/history/hypothesis material is absent, including review mode. Mobile reference-target check: 27 anchors, zero broken reference links. Viewport restored after inspection.

Historical pilot tests expecting twelve Findings and Investigations describe the superseded pilot and are not a current reconstruction baseline. No global test-suite pass or production build is claimed. QC remains suspended and its archived inputs unchanged. No commit, push, merge or deployment.

Preview: http://127.0.0.1:3201/docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling/

## Subsequent owner corrections

References now run 1–27 in first rendered citation order, superseding the stable numeric numbering decision above. Canonical citation keys and papers are unchanged; only reference presentation numbers/anchors and matching citation metadata changed. `before-renumbering.mdx` and `reference-renumbering.json` preserve the previous mapping. Browser verification confirmed first appearances exactly 1–27 and zero broken reference targets. Focused tests: 20/20 pass (`renumbering-tests.txt`), with scientific comparisons excluding only canonical-reference presentation metadata.

The owner explicitly requested restoration of the agreed SF association labels. All seven retained labels now match the archived pilot names. SF11/SF12 retain the requested historical Hypothesis1 label; the retired hypothesis record is not restored, and no hypothesis relationship/admission is created. This label therefore does not denote an active hypothesis disclosure.

Owner-requested display-only SF renumbering: seven retained labels now start SF1–SF7 in display order. Association suffixes/titles, canonical Finding IDs and relationships remain unchanged. Focused coverage checks the exact labels against the archived names with only the SF prefix renumbered. Results: `sf-renumbering-tests.txt`. Local only.
