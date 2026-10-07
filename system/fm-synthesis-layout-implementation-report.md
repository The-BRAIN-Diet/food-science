# FM synthesis layout implementation — 6 October 2026

## Accepted result

Applied to all 23 canonical FMs. The linked Primary Mechanisms and existing Key Constraints inventories appear once, above the Mission/Objective. They provide navigation rather than PM descriptions or new applicability claims.

The user approved sequential visible numbering: **4.1 Functional Rationale → 4.2 Evidence Summary → 4.3 Suboptimal Function & Its Effects**. Historical inventory, narrative and evidence anchors remain available. Functional rationale is concise. Evidence Summary aggregates measured findings across child mechanisms, then gives a bounded conditional interpretation of adequately functioning capacities. It does not assert superior combined outcomes or imply that additional nutrient intake improves function.

Removed repeated PM narratives, the old section-4 inventory and copied child Finding dropdowns. Preserved their complete prior section in the retired-content archive listed below. The canonical child PM science was not modified. Existing FM Mission/Overview, phenotype ratings, dietary admissions, KC records and other frontmatter are preserved. Original bibliography numbering is preserved; necessary child bibliography entries are appended and cited numerically from the target FM.

## Verification actually performed

- Focused layout/KC infrastructure tests: **10/10 passed**. Coverage includes all 23 pages, unique top inventory, ordering, rendered-source consistency, citation anchors, compatibility aliases, idempotent regeneration, missing/unknown-source rejection and preservation of scientific audit gaps.
- Broader scientific Findings and layout tests: **38/40 passed**. Two existing failures remain: BRS3 PM4 scientific Finding source/reuse issues and PM9's existing section-order expectation. These PM records were outside this change.
- All 23 existing frontmatter records and complete Suboptimal Function bodies match the pre-edit snapshots after excluding only the new synthesis fields and appended references. Original references remain an unchanged prefix.
- All 23 FM MDX bodies compile. Final site build passed: generated static files in build. Existing site warnings remain.
- FM migration dry-run passed, with zero changes required and all 23 pages meeting the current evidence-summary gate.
- Mechanism validation: **20/23 FMs clean**. Preserved Suboptimal Function text references KC pools absent from the PM-derived union on BRS2 FM1 (KC1), BRS3 FM1 (KC1), and BRS4 FM1 (KC2). These require separate scientific reconciliation; this presentation pass does not admit or remove those mappings.
- Browser: FM1 top inventory and sequential section-4 presentation inspected; the evidence citation to reference 21 navigated to its actual bibliography anchor. FM1 remains open in the app. Screenshots are stored with the workspace snapshots.

## Authoring and regeneration

The governing schema now requires reviewed functional_rationale and fm_evidence_summary source fields. Citation markers resolve against the FM's own bibliography. Shared generation fails when reviewed summary source is missing rather than reconstructing a PM-by-PM narrative. Existing failure-mode content is retained. KC restoration recognizes the top inventory and preserves applicability/derivation audit findings. Single-PM FMs state their coverage boundary without invented integration. Outcome confidence remains subject to its separate validation methodology.

## Exact files changed in this task

### FM pages

- docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-fm1-endocannabinoidome-signalling-capacity-and-neuromodulatory-regulation.mdx
- docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-fm1-reproductive-hormone-balance-and-neurocognitive-regulation.mdx
- docs/biological-targets/brs1/fm1/brs1-fm1-monoaminergic-function.mdx
- docs/biological-targets/brs1/fm2/brs1-fm2-cholinergic-function.mdx
- docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx
- docs/biological-targets/brs1/fm4/brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation.mdx
- docs/biological-targets/brs2/fm1/brs2-fm1-methylation-cycle-efficiency.mdx
- docs/biological-targets/brs2/fm2/brs2-fm2-transsulfuration-redox-coupling.mdx
- docs/biological-targets/brs2/fm3/brs2-fm3-methylation-membrane-coupling.mdx
- docs/biological-targets/brs3/fm1/brs3-fm1-anti-inflammatory-signalling-tone.mdx
- docs/biological-targets/brs3/fm2/brs3-fm2-antioxidant-defense-capacity.mdx
- docs/biological-targets/brs3/fm3/brs3-fm3-inflammation-resolution-capacity.mdx
- docs/biological-targets/brs4/fm1/brs4-fm1-cellular-bioenergetics.mdx
- docs/biological-targets/brs4/fm2/brs4-fm2-mitochondrial-resilience-and-redox-stability.mdx
- docs/biological-targets/brs4/fm3/brs4-fm3-substrate-utilisation-flexibility.mdx
- docs/biological-targets/brs4/fm4/brs4-fm4-mitochondrial-capacity-expansion-and-adaptation.mdx
- docs/biological-targets/brs5/fm1/brs5-fm1-gut-barrier-integrity-and-immune-interface.mdx
- docs/biological-targets/brs5/fm2/brs5-fm2-microbial-metabolite-signalling-capacity.mdx
- docs/biological-targets/brs5/fm3/brs5-fm3-gut-vagal-neuromodulation-and-ens-signalling.mdx
- docs/biological-targets/brs6/fm1/brs6-fm1-glycaemic-insulin-stability-and-cognitive-energy-availability.mdx
- docs/biological-targets/brs6/fm2/brs6-fm2-hpa-axis-rhythm-and-cortisol-regulation.mdx
- docs/biological-targets/brs6/fm3/brs6-fm3-autonomic-balance-and-vagal-recovery-capacity.mdx
- docs/biological-targets/brs6/fm4/brs6-fm4-stress-inflammation-metabolic-load-allocation.mdx

### Guidance, generation, validation and preservation

- system/functional-mechanism-schema.md
- system/mechanism-page-section-prose.md
- system/single-pm-fm-rule.md
- system/fm-schema-rollout-sequence.md
- system/phenome-relationship-review-methodology.md
- scripts/lib/fm-synthesis-layout.mjs
- scripts/lib/fm-integrated-narrative.mjs
- scripts/lib/fm-evidence-highlights.mjs
- scripts/lib/fm-schema-gate.mjs
- scripts/lib/fm-failure-modes.mjs
- scripts/lib/fm-supporting-kc-pools.mjs
- scripts/data/brs1-3-fm-section4-overrides.mjs
- scripts/migrate-fm-schema-pass.mjs
- scripts/migrate-phenome-section.mjs
- scripts/populate-fm-evidence-highlights.mjs
- scripts/lib/mechanism-page-validation.mjs
- scripts/scientific-findings.test.mjs
- scripts/fm-synthesis-layout.test.mjs
- system/retired-content/fm-pre-synthesis-layout-20261006.json
- system/fm-synthesis-layout-implementation-report.md (this report)

Before snapshots, source inventory and bibliography accounting: /Users/paulhouston/Documents/Codex/2026-10-01/we/outputs/fm-synthesis-layout.

No commit, deployment or scientific mapping migration was performed. Older assessment reports remain historical records.
