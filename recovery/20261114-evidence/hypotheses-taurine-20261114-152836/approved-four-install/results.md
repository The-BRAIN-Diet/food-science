# Approved four hypotheses — local installation

Candidate: sync-recovery/combined-local, detached base af13bec172b5938098a46f85c06523b8a20e90dc; existing uncommitted reconciliation preserved.

Installed Unestablished:
- BRS5-FM2-PM4 / PM4-H1 — plant-substrate variety and processing capacity.
- BRS4-FM1-PM3 / PM3-H1 — additional oral arginine and cerebral creatine availability.
- BRS-X(ECS-PM1) / PM1-H1 — dietary PE and neural NAPE/NAE precursor supply, without a prescribed animal model or molecular species.
- BRS-X(Hormones-PM6) / PM6-H1 — microbial androgen deconjugation and systemic re-exposure. Stress relevance is in rationale; the linked downstream question is in required_evidence. The full gut→androgen→stress→allostasis chain remains explicitly Unestablished.

All five prior hypothesis records remain identical; total nine. No new schema fields or template changes. Existing renderer is used. No source_pm/target_pm pair is invented. No food or accepted graph edge is introduced.

Validation:
- approved-four-hypotheses.test.mjs: 6/6 pass, including four complete MDX compilations and pre-installation fingerprints for every non-hypothesis frontmatter field and original body.
- sync-pm-scientific-hypotheses.mjs --check: zero problems.
- Existing two hypothesis suites: 12/16 pass. Four historical/global checks fail: old PM1 science/body comparison; old PM1 extraction/food/manuscript snapshot comparison; PM9 global Scientific Findings gate; old PM9 science/other-PM baseline comparison. No baseline/hash pins or scientific records were rewritten to pass these checks. These suites concern pre-existing PM1/PM9 records unchanged by this installation. This is not an all-tests-pass claim.
- Existing graph-isolation, automatic-link exclusion, input-mapping exclusion and component tests passed within those suites.

Pre-installation source copies and manifest are preserved in this folder. Focused new regression test: candidate/scripts/approved-four-hypotheses.test.mjs. No production build, viewer generation, push, commit, merge or deployment.
