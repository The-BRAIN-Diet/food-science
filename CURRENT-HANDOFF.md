# BRAIN Diet — current handoff

As inspected 3 November 2026. Draft knowledge-transfer entry for author review; uncommitted. Read [PROJECT-CONTEXT.md](PROJECT-CONTEXT.md), then the relevant authoritative contracts. Recheck Git and manifests on resumption: this file is a dated checkpoint, not live state.

## Checkout and release state

- Worktree: `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/brain-diet-v1-quantitative`.
- Branch: `review/brs5-pm4-sec-assessment`; inspected HEAD: `510da220`.
- GitHub remote is **github** (`https://github.com/The-BRAIN-Diet/food-science.git`). **origin is a local checkout**, not GitHub.
- User reported PR #231 merged; cached `github/main` is `4eeca534`, titled “Merge pull request #231 …”. No fresh remote fetch in this documentation task; checkout has not been switched to main. Do not assume subsequent remote changes are present.
- Other worktrees exist. Their branch names do not prove incorporation; inspect commits/diffs before integrating. Do not overwrite concurrent work.
- Current instruction: prepare these documentation files for review. No commit, push, merge or deployment is authorised.

## Immediate priorities

1. Review these two new context files and AGENTS pointers.
2. Review/package the already authorised, locally implemented pathway-disclosure removal below; do not publish it without author approval.
3. When resuming scientific work, use the existing SOP/Lifestyle manifest and latest PM report additions. Do not restart dietary recovery or claim BRS1 is fully finished.

## Workstreams and exact status

### SOP and Lifestyle rollout — incomplete

Authority/status: [manifest](review/sequential-pm-interventions-2026-11-02/manifest.json), [prior Cursor handoff](review/sequential-pm-interventions-2026-11-02/CURSOR-HANDOFF.md), per-PM reports in that folder's `pms/`, and [Section 6 evidence register](review/sequential-pm-interventions-2026-11-02/Section-6-Intervention-Evidence-Register.md).

Current recorded queue: **BRS2-FM1-PM3**. The manifest contains 64 PM entries; 50 are `not-started` in this sequential review. That does not mean those PMs have no existing interventions or prior pilot work.

BRS1 outstanding items recorded in the manifest:
- PM2: original methods and direction-of-benefit adjudication for cerebral-exchange candidate.
- PM3: implemented with tracked appraisal limitations; bounded SEC exception has five provisional and two pending assessments per prior handoff.
- PM4: mechanism-vocabulary reconciliation.
- PM5: final browser validation pending in manifest; reconcile against latest appended report before repeating work.
- PM6: formulation identity/exposure adjudication.
- PM7: formulation-method retrieval unresolved.
- PM10: food-evidence reconciliation.
- PM11: experimental exercise exposure and magnesium-preparation appraisal.
- PM1 and PM9: complete with limitations; PM12 implemented with limitations. These labels do not certify framework-wide scoring completion.

BRS2 PM1 has blocked folic-acid protocol methods; PM2 has remaining protocol appraisal; PM3 is in food reuse/targeted discovery. Read individual records before choosing the next actionable task.

**Approved execution rule:** Pass 1 covers scientific eligibility, six atoms, ontology, presentation and paper extraction; new intervention SEC remains `Not yet assessed` unless valid assessment exists. Framework-wide intervention SEC is Pass 2. PM3's specific author-requested appraisal is a bounded exception, not general Pass 2 completion. Provisional assessment is not final scientific approval.

**Open wording/adjudication:** prior handoff says “Pilot-plant” → “Experimentally” was discussed but not applied. Verify current record before editing. LAT1 discussion does not establish a high-protein-breakfast attention benefit; plasma ratios are not demonstrated brain uptake or cognition. No SF2 edit was made at the checkpoint.

### Dietary pathway disclosure removal — implemented locally, not released

Explicit author request: remove the generated `Dietary pathway evidence` block from every PM six-atom disclosure, preserving data and approved presentation.

Local changes: `src/lib/pmInputFoodDisclosure.ts`, `src/components/PmDietaryLeverEnhancer.tsx`, `system/presentation-change-control.md`, `system/presentation-change-approvals.json`, new `scripts/pm-pathway-disclosure-removal.test.mjs`. Exclusive pathway argument/subscription and injection removed; no replacement. No canonical science changed. Approval recorded from the actual owner instruction; presentation baseline unchanged.

Validation from this execution:
- Removal/presentation tests: 6/6 pass.
- Wider pathway/mapping/presentation run: 54/56 pass. Existing failures: historical SEC-registry equality fixture and food-strategy expectation 33 versus actual 34. Fixtures and their input files unchanged by removal. Do not claim repository-wide green status or repair science to satisfy these expectations.
- `npm run presentation:check`: passes for 691 protected files. `git diff --check`: passes.
- Local PM9 B6 and PM3 B2: zero injected pathway blocks; expanded six atoms retained. PM9 Dietary Confidence and food disclosures verified. No production build performed for this removal.
- Local screenshot: `../../outputs/pm9-pathway-disclosure-removed.png` (not guaranteed available in another clone).
- Local preview was restarted at port 3145; recheck availability rather than assuming the process survives.

### Earlier dietary recovery — separate completed historical scope

[Recovery ledger](review/dietary-recovery-2026-10-26/progress.json) records `completed-targeted-recovery`, with a disposition for every canonical PM. Its qualification explicitly excludes exhaustive knowledge or admission of all pathways. Consult its continuation decisions and foodless-target review for provenance; do not confuse that completion with the unfinished SOP/Lifestyle rollout or use its baseline counts as current totals.

### Foundational training — unpublished concurrent drafts

Untracked `review/training-foundations-2026-11-03/` contains three lesson drafts and [review notes](review/training-foundations-2026-11-03/review-notes.md). Preserve separately. They are outside docs, not installed routes, and not approved scientific changes. Notes flag B6/PLP metadata, LAT1 translation and other questions for later review; these are questions, not decisions. Do not automatically add them to a commit for another task.

## Resumption and update discipline

- Run `git status --short`, `git branch --show-current`, `git worktree list`; read relevant manifest and latest dated report updates. Check remote state before any authorised push.
- Record approved decisions with their exact source/scope. Label proposals, implemented-but-unvalidated work, blockers and published changes separately.
- Update this handoff after a meaningful checkpoint: date, current task/queue, files changed, validations and remaining work. Keep research detail in existing manifests and reports.
- Do not convert stale completion labels into new claims. If reports disagree, record the discrepancy and reconcile against actual canonical records; do not silently alter them.

## Latest targeted correction — LAT1, 3 November 2026

Owner-authorised mission replacement and SF1 evidence consolidation implemented locally. See `review/lat1-mission-sf1-2026-11-03/assessment.md` and `validation.json`. Original SF1 proposition/ID and all SEC pins preserved; five primary transport/molecular sources added, Teff CSF observations attached to SF3 as supporting boundary evidence. No admission/SOP/Lifestyle/KC changes. Separate SF1 appraisal remains necessary; existing unscored v2 predates consolidation. Dietary validation now flags historical PM2-DIT-3 after the mission change; do not reset its historical exemption or change the admission without separate adjudication. No commit/push/deployment.

## LAT1 Stage 2B follow-up — 3 November 2026

See `review/lat1-mission-sf1-2026-11-03/stage2b-status.md` and `stage2b-completeness.json`. Locally added SF1 provisional SEC v3 (5/8), preserved SF2 5/8, tracked SF3/IC1 eligibility decisions in v3 Assessment gaps, enabled owner-confirmed Evidence Gaps/Open Issues through the existing tab contract, and recorded the scientific meal-translation gap. 110 prior snapshots retained; 113 total. Structurally complete is not scientifically complete: interpretive-record scoring applicability and PM2-DIT-3 classification remain unresolved. Browser validation remains incomplete owing to unresponsive localhost. No commit/push/deployment.

## Cursor integration — 3 November 2026

Owner authorised local checkpoint and integration only. Checkpoint 533409e1 preserves current LAT1, SEC, disclosure removal and handoff work. Merged Cursor 48ee6a93 from github/review/brs3-fm1-pm1-pilot; see review/cursor-integration-2026-11-03/validation.md. Approval ledger reconciled by exact-record union (24 records); no science conflict. Focused tests 36 pass/one pre-existing BRS3 count fixture failure. No push/PR/main merge/deployment authorised; unrelated training drafts remain outside the checkpoint. Earlier handoff release instructions are superseded only to this local integration scope.
