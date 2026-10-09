# BRS3-FM1-PM1 Stage 2B — 6 October 2026

Re-adjudication after the dedicated Stage 2A. The earlier 2B rejection of polyphenols, EPA/DHA, and fibre as state-regulation is unchanged: those papers still do not measure this transcription rate.

## §3.1.1

No Direct or Derived Dietary Requirement. Empty is valid.

## §3.1.2

PM1-DIT-1 Magnesium ions remain a biochemical catalytic ion at biological-dependency. Assay buffers and generic kinase chemistry are not promoted to a dietary requirement. The atom stays linked to PM1-F1, with Adams as the chemistry citation and the prior UniProt limitation kept.

## §3.1.3

BRS3(KC1) glutathione precursor sufficiency stays unresolved. The historical title Antioxidant Substrate Sufficiency is not published.

## Dominance and lifestyle

The previous public label Lifestyle-Dominant matched two bullets (ultra-processed food and meal timing) that were never shown to change NF-κB transcription. Those bullets are dietary-pattern claims, not lifestyle practices, and they had no finding. They are withdrawn.

`intervention_dominance` is Not established. No preparation, supplement, meal pattern, sleep practice, activity practice, or stress-recovery practice is qualified. `timing_specific` is No. No dose is established.

## What was searched and not admitted

IKK magnesium: assay magnesium and a computational ATP–Mg model do not show that ordinary magnesium intake sets transcription. Not upgraded.

## 7 October 2026 — accepted upstream-supply reassessment

This supersedes the statement above that KC1 is wholly unresolved. It does not convert the unresolved limiting-effect question into an admitted constraint. Governing files: `system/scientific-finding-schema.md` (Stage 2A), `system/dietary-input-traceability-contract.md` (Stage 2B), `system/primary-mechanism-schema.md`, and their applicability/identity/presentation requirements. No contract change was needed.

| Candidate | Biological role / evidence | Decision and placement | Exact boundary or gap |
|---|---|---|---|
| KC1 glutathione precursor pool | Precursor provision supplies glutathione used in measured NF-κB redox regulation; PM1-F2, Reynaert 2006, Mihm 1995, Sekhar 2011 | Established **Supported upstream supply**, §3.1.3 | Cross-context chain, not a demonstrated human dietary limitation or uniformly anti-inflammatory effect. |
| Cysteine | Glutathione constituent; extracellular supply/redox effects examined by Mihm, combined NAC+glycine provision by Sekhar | Individually admitted upstream iKC, §3.1.3; `BRS3-KC1-KIT-1`; substance `cysteine` | NAC is the tested human cysteine provision form; neither isolated deficiency nor ordinary-food dose/benefit is established. |
| Glycine | Glutathione constituent; combined precursor provision increased isotope-measured red-cell synthesis | Individually admitted upstream iKC, §3.1.3; `BRS3-KC1-KIT-2`; substance `glycine` | Separate glycine limiting effect on NF-κB not measured; no automatic inference from the combined intervention. |
| Magnesium ions | ATP-dependent kinase chemistry; retained PM1-F1/Adams support | Biochemical catalytic ion, §3.1.2; canonical substance `magnesium`, explicitly ionic form | IKK-specific nutritional limitation unresolved; not a Direct dietary target. |
| KC1 availability as a constraint on appropriate NF-κB regulation | Related molecular regulation plus human red-cell provision | **Unresolved, audit-only** | Establish precursor inadequacy → local glutathione/redox alteration → a specified NF-κB consequence; account for compensation and bidirectional effects. |
| Glutamate, polyphenols, vitamin C as KC1 members | Not admitted members of reconciled KC1 | Not projected | Pool identity does not authorise a broad antioxidant list. Independent non-KC dietary roles require their own review. |

All three retained individual PM atoms resolve against the actual substance registry and explicit substance-page IDs. Cysteine and glycine membership references resolve to KC-owned constituent records. No missing identity flags or creation queue are needed for these entries. No KC-owned membership is redefined on the PM.

### Distinctness and placement gate

Compared `PM1-KC1-UPSTREAM-POOL`, `PM1-KC1-UPSTREAM-1`, and `PM1-KC1-UPSTREAM-2` against §3.1.1, `PM1-DIT-1` in §3.1.2 and empty §3.2. No previously published glutathione provision relationship is duplicated: §3.1.1 has no admitted requirements and Mg-dependent phosphotransfer is a different biochemical role. The pool provides a concise shared-chain summary; only individual inputs carry the full constituent disclosures. No additional conditional-constraint disclosure is published. Differently named records or shared citations do not establish distinctness; the actual biological roles were compared.

§3.1.1 remains explicitly empty of Direct/Derived requirements. §3.1.2 retains magnesium. §3.1.3 now holds the bounded pool and two individual inputs. `intervention_dominance: Not established` and no principal route remain; upstream supply alone is not demonstrated dietary intervention influence. Legacy `intervention_breakdown: Food-State Dominant` remains spreadsheet ingest metadata and is not rendered or used to select placement. FM1 roll-up is intentionally unchanged until the remaining child PM assessments are completed.

The existing shared renderer supplies the five fields, reader descriptions, independent KC origin tags and canonical PM1-F2 research link. No shared code or instruction was edited.

### Actual verification results — 7 October

- 36 existing tests passed: `node --test scripts/kc-evidence-governance.test.mjs scripts/kc1-fm1-constituent-projection.test.mjs scripts/pm-lever-layout.test.mjs`.
- Focused actual-record checks passed: Scientific Finding schema; PM KC applicability/membership governance; canonical constituent identities; numbered-reference integrity; MDX compilation; byte-equivalent mission and deep-equal phenome records versus the pre-edit snapshot.
- Existing matrix projection function returned exactly one PM1 Supported upstream supply row for each of cysteine and glycine, retaining full evidence and limitation atoms. No glutamate or vitamin C row was projected. No generated substance page or FM roll-up was manually edited.
- Scientific Findings freshness/model check: 31 PM pages, zero problems. Bibliography check: all 618 cited keys present in 1,055 canonical entries. Existing [1]–[10] positions preserved; new sources [11]–[13].
- Browser at `http://localhost:3000/docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation`: pool and individual disclosures visible in §3.1.3. Click pinned cysteine; Enter opened glycine; Escape dismissed cysteine and restored trigger focus without reopening. Each opened entry showed description → Input → Input type → Biological role → Evidence source → Limitation → research link. Bibliography anchors [11]–[13] and canonical `#pm1-f2` target verified present; independent origin tags resolved to the canonical KC1 URL. Screenshot: `/Users/paulhouston/Documents/Codex/2026-10-01/we/brs3-pm1-kc1-verified.png`.
- Global mechanism validation remains unclean: no PM1 issues after this change; PM issue count fell from 54 to 53 through the section-title repair. The two existing FM warnings (including FM1's KC union warning), other PM failures and SM legacy failures remain. This pass did not update FM constraint roll-ups or claim site-wide completion.
- `git diff --check` passed. No full production build, commit, merge or deployment was performed.

Files changed in this pass: the canonical PM1 MDX, its existing Stage 2A and Stage 2B reports, and `static/bibtex/BRAIN-diet.bib` (two primary entries appended). Existing KC1/registry and other dirty files were preserved.
