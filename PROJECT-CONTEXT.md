# BRAIN Diet — project context

New sessions: begin at [project-knowledge/START-HERE.md](project-knowledge/START-HERE.md). This existing file retains architecture detail; the hub provides concise orientation and current decision pointers.

Stable orientation, prepared 3 November 2026. This is a navigation aid, not a scientific contract or new approval. Read [CURRENT-HANDOFF.md](CURRENT-HANDOFF.md) for dated work status. Where a summary and its source disagree, inspect the authoritative contract and dated approval; report unresolved conflicts rather than inventing a rule.

## Architecture and sources of truth

- Docusaurus site: canonical documents and structured front matter in `docs/`; shared rendering in `src/components/`, `src/lib/`, `src/theme/` and `src/css/`; generators and validators in `scripts/`; governance in `system/`.
- PMs live under `docs/biological-targets/`. Current framework scope is 64 canonical PMs: 51 numbered BRS1–BRS6 and 13 Cross-BRS (Circadian, ECS, Hormones). Preserve canonical identifiers; Cross-BRS IDs do not follow the numbered format. Resolve current membership from canonical records and existing selection logic, not a hand-maintained duplicate list.
- Foods, substances and recipes have separate records in `docs/foods/`, `docs/substances/` and `docs/recipes/`. Structured scientific relationships and verified composition determine eligible projections; a tag or connected graph alone does not establish an admission.
- PM front matter holds scientific Findings, interventions and their assessment relationships. `system/sec-assessments/registry.json` and its referenced versioned records hold SEC history. Generated indexes are outputs, not substitute scientific authority.
- References use `static/bibtex/Brain-diet.bib` and `docs/papers/BRAIN-Diet-References`. Follow original study references, preserving provenance and scope.
- `review/` holds dated research, decisions, manifests and checkpoints. Historical reports describe their date/scope; they do not override later canonical decisions. `outputs/` artifacts are not guaranteed to travel with Git.
- [INTERNAL-DOCS.md](INTERNAL-DOCS.md) governs local-only Training/QA. Do not publish or commit those local-only documents by treating a draft flag as sufficient protection.

## Authoritative reading map

| Work | Read first |
|---|---|
| Repository conventions | [AGENTS.md](AGENTS.md) |
| Stage 2A scientific assessment | [scientific-finding-schema.md](system/scientific-finding-schema.md) |
| Stage 2B traceability/admission | [dietary-input-traceability-contract.md](system/dietary-input-traceability-contract.md), [dietary-input-governance-v2.md](system/dietary-input-governance-v2.md) |
| PM structure and dominance | [primary-mechanism-schema.md](system/primary-mechanism-schema.md) |
| SOP/Lifestyle six atoms and rollout | [sop-lifestyle-six-atom-presentation.md](system/sop-lifestyle-six-atom-presentation.md), Stage 2A/2B above |
| Findings, Principles, evidence tabs | [pm-evidence-tabs-contract.md](system/pm-evidence-tabs-contract.md), Stage 2A above |
| SEC and incomplete appraisal | Stage 2A above; [SEC registry](system/sec-assessments/registry.json) and pinned assessment records |
| Dietary Confidence | [dietary-confidence-schema.md](system/dietary-confidence-schema.md) |
| Ontology and food mapping | [brain-diet-ontology-rules.md](system/brain-diet-ontology-rules.md), [input-substance-food-mapping.md](system/input-substance-food-mapping.md), [food-nutrition-schema.md](system/food-nutrition-schema.md) |
| KC eligibility | [key-constraint-schema.md](system/key-constraint-schema.md), [kc-page-evidence-review-contract.md](system/kc-page-evidence-review-contract.md) |
| Presentation permission | [presentation-change-control.md](system/presentation-change-control.md), [recorded approvals](system/presentation-change-approvals.json) |

## Established scientific distinctions — consult the contracts for exact gates

- Preserve approved PM missions. Type A evaluates functional capacity and dietary supply; Type B evaluates PM-specific regulation and credible dietary exposure. Direct/Derived is independent of Type A/B. Do not require ADHD benefit to establish PM-level relevance or infer clinical benefit from biochemical participation.
- Keep six atoms. Admission, food composition, conversion, target engagement and efficacy are separate claims. Missing food mapping is not absence of dietary supply; connected pathways are not automatic admissions. Do not duplicate precursor and active-product requirements without independent justification.
- SOP/Lifestyle records separate intervention, full Mechanism of Action, measured effect, PM relevance and typed limitations. A short Mechanism derives from the full record; omit it when no adequately supported mechanism is identified. Limitations are not mechanisms. Unresolved mechanism does not itself admit or reject an intervention.
- Dietary Confidence and SEC are distinct constructs. Intervention SEC assesses its exact intervention–outcome proposition and cannot inherit a Finding score. Preserve immutable assessment versions; missing scores are not zero.
- Evidence Gaps concern unresolved science; Assessment gaps concern unfinished appraisal. Neither missing nor low SEC automatically creates an Evidence Gap. Completed scoring does not automatically close one. Preserve valid many-to-many links and distinguish pending from adjudicated unassessable states.
- Scientific Findings use the governed Section 4 presentation; audit/history must not duplicate their active disclosures. Apply migration scope and identity rules from the current contracts, not an old report or summary here.
- Scientific data integration is not reader-facing presentation permission. New substantive presentation requires an updated contract, representative example, scope and explicit author approval. Never regenerate a baseline or invent approval to pass validation.

## Working practice

Use current manifests to resume rather than repeating completed research. For SOP/Lifestyle research, inspect linked food pages and their preparation/bioavailability references first, then retrieve original evidence and research missing questions. Food pages are not independent primary evidence. When using Scite, verify full-text retrieval versus abstract fallback.

Run checks appropriate to the change and record exact scope/results; a historical passing build is not current validation. `npm run presentation:check` is mandatory for presentation work. Preserve the running preview during production builds as specified in AGENTS and INTERNAL-DOCS. Consult current build scripts/configuration; previously successful settings used a 4 GiB Node heap and single-worker Terser, not a licence to alter configuration or keep increasing memory.

## Keeping this aid lightweight

Update this file only when stable architecture or an approved rule changes, linking its authority. Put queue positions, branch state, test results and unfinished work in CURRENT-HANDOFF. Neither file authorises commits, publication or scientific changes. Do not replace detailed manifests or duplicate governance here.

## Food Wheel — published snapshot and open questions (6 November 2026)

**Published and verified:** https://thebraindiet.org/explore/food-wheel/ . PR #234; release `40a94f2b61c2ed086d5244b5b15e0a170658ff60`; production merge `b4d8f127854ae165e2bcd675a3b475044d63b984`; Netlify deployment `6aedb434fa418ba844b6fd06`. Authority: [publication contract](system/food-wheel-presentation-contract.md) and exact-hash author approvals. Static assets live in `static/explore/food-wheel/`. This standalone display does not change canonical admissions.

**Implemented methodology:** 90 foods, 68 displayed substances (76 inventory records including exclusions), 121 substance–system pairs. One canonical node per identity. Food labels count distinct existing food–substance targets, including qualified derived targets; duplicate PM mentions/citations do not inflate counts. Collective pools can coexist with constituents. There are 1,750 default food edges and 18 additional proposed-only edges; 21 proposal records include improvements to existing pairs. Proposed-only edges are off by default and never increase fixed label counts. Existing direct composition, derived provision and intervention claims remain separate; no downstream quantity or efficacy is inferred.

Food labels use font sizes 16/18/20/22 SVG units for 1–2/3–4/5–7/8+ targets. Food position follows the circular centre of its documented target positions, equally weighted, with even spacing; not concentration or clinical importance. Colours retain BRS1–6 and BRS-X identities. All-connections and focused selection coexist. No further rings approved. Source shortlists are up to ten within compatible comparison groups, not an exhaustive global ranking. No arbitrary serving, mg/L-to-mass conversion or presence-to-quantity inference.

**Verified diagnostic findings, not new science:** BRS6 reaches 80 foods: 78 magnesium sources plus cockles and trout roe through DHA/EPA. Seven targets create 129 food edges, not 129 foods. Other targets are resistant starch, arginine, butyrate and acetic acid. An admitted-only filter still reaches 80 through magnesium and DHA. Hormones reaches 81 foods solely through zinc/PM5 (80 quantified, cockles presence-only). Its aggregate Admitted edge contains both an admitted receptor-domain dependency and an unresolved candidate testosterone-response relationship. Never imply that all 81 foods modulate hormones or that additional zinc improves testosterone.

**Proposals only:** default reviewed food shortlists with optional all-sources mode; clear system scope; claim-level statuses; system-specific counts; separate tested interventions from ordinary food composition. Existing shortlist unions are 28 BRS6 foods and 10 Hormones foods, not approved strongest-food rankings. Do not implement or publish these proposals without author agreement.

**Outstanding research/QA:** review preparation/comparison groups and realistic servings before ranking; retain missing quantitative source evidence and 21 proposed backfills; investigate collapsed admission/status semantics; reconcile snapshot-local relationships against canonical records; inspect narrow BRS-X pointer targets (one Hormones click left BRS6 selected, keyboard worked). No new SEC appraisal authorised by this diagnosis. CoQ clinical bias/precision gaps and the dietary-provision gate remain separate scientific workstreams; inspect their local reports instead of assuming completion from publication of the wheel.

**Cursor handover:** use [reconciliation report](review/final-git-reconciliation-2026-11-06/report.md) and its exact file inventory. Publication worktree, scientific worktree and Cursor checkout are distinct. Fetching main supplies the published wheel but not uncommitted CoQ, provenance-validation or intervention food/substance work. Preserve Cursor's separately pushed BRS-X PM branch; its new PMs are not part of this frozen wheel. Review and validate coherent scientific batches before requesting publication. Do not combine local training, build outputs or duplicate inspection folders with release changes.

The earlier 64-PM orientation count is historical; the wheel snapshot records 65 PMs. Always resolve current canonical membership rather than editing identifiers or assuming the frozen diagram is current.
