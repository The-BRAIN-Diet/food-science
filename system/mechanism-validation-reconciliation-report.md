# Focused mechanism-validation reconciliation

2026-10-07. This pass repairs the three identified clusters and the user's visible-numbering correction. It does not migrate every legacy page or adjudicate an FM constraint from a PM supply relationship.

## Decisions and repairs

1. **PM3 layout:** governing PM schema requires `## 1. Mission & Overview` and `## 3. Intervention Levers`. The page's extra section-1 suffix was removed. The validator now accepts the current section-3 title alongside legacy `Levers`; it does not demand the obsolete Intervention Profile on current-layout pages. PM3 passes the actual page validator with zero issues. Mission, evidence qualification, biochemical participants, dietary classifications, KC decisions and phenome ratings remain unchanged.
2. **PM4 Findings:** four `targeted-retrieval` values were mapped to the schema's `bounded-external-search` provenance label. PM4-F2 explicitly records reuse of Weydert and Cullen (2010) from PM4-F1: this is neither independent replication nor dietary-response evidence. The existing synchroniser regenerated only PM4's Finding components. All five Finding-source/reuse errors are cleared, without changing study results or scientific admissions.
3. **FM1:** the unadjudicated low-donor constraint paragraph was replaced by a supply-versus-constraint boundary and a link to PM3's bounded disclosure. No child `key_constraints`, FM inventory, ratings or roll-up admissions were changed. FM1 passes its current validator, but independent FM-level constraint applicability remains an open scientific decision. Passing structural validation does not approve that inventory scientifically.
4. **Visible numbering:** groups already displayed in section 1 are labelled `1.1`, `1.2`, etc.; dietary children use `1.1.1`–`1.1.3`. Canonical IDs, lookup attributes and stable anchors remain `3.1`/`3.1.1`–`3.1.3`. The shared layout performs this presentation-only repair even when a legacy page has no principal-route adjudication. It does not select or move a route or reinterpret Diet-Supported. Governing schema and Stage 2B explicitly state this distinction.

## Verification

- 29 focused reconciliation/upstream/KC governance tests passed.
- 24 layout/reconciliation/upstream tests passed, including the actual AST transform of PM3's section-1 group, unchanged placement and retained canonical identifiers.
- Bibliography validation passed.
- Wider test run: 59 passed, 4 failed. Failures concern the existing PM6 transform fixture, all-Findings-owned page section-order check, PM9 section order, and a Stage 2A/2B targeted-retrieval instruction check. These were not waived or rewritten to claim a clean site.
- Site-wide validator: PM3 and BRS2(FM1) have zero page issues; Scientific Findings pass across 31 pages. Remaining totals: FM 2 issues, PM 58 issues, SM 4 issues. BRS3-FM2-PM4 still has a missing cited key in a KC change flag and an old section-1 title; those are separate from the repaired five Finding errors.
- FM1's new boundary was verified in the live browser. Numbering and post-cache-clear build/browser verification are recorded below after completion.

## Files changed

- `scripts/lib/mechanism-page-validation.mjs`
- `src/plugin/pm-lever-layout/index.cjs`
- `docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx`
- `docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx`
- `docs/biological-targets/brs2/fm1/brs2-fm1-methylation-cycle-efficiency.mdx`
- `system/primary-mechanism-schema.md`
- `system/dietary-input-traceability-contract.md`
- `scripts/pm-lever-layout.test.mjs`
- `scripts/mechanism-validation-reconciliation.test.mjs`
- This report.

Task-only before/after diff: `/Users/paulhouston/Documents/Codex/2026-10-01/we/outputs/mechanism-validation-reconciliation/task-only.diff`. Existing uncommitted work is preserved. No commit or deployment was performed.

## Completed presentation verification

Clean production build succeeded after clearing generated Docusaurus/bundler cache. Existing site-wide broken-anchor/tag warnings remain. Browser verified at `http://localhost:3113/docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis`: visible 1.1 and children 1.1.1–1.1.3, with Betaine's actual full disclosure opening under 1.1.3. Canonical 3.1.3 lookup continues to resolve. Screenshot: `/Users/paulhouston/Documents/Codex/2026-10-01/we/outputs/mechanism-validation-reconciliation/pm3-numbering.png`. The existing port-3000 development process still caches the previous plugin; the environment denied restarting that process. Port 3113 serves the verified clean build.

Additional dietary disclosure/KC governance/heading regression suite: 46 passed, 0 failed. No global clean-validation claim is made.
