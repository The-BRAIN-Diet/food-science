# Mechanism change control queue

Items raised by mechanism adjudication that must **not** be actioned silently:
content proposed for relocation to another mechanism, legacy metadata values that
adjudication found inadequate, and relationships whose evidence contradicts the
stated direction.

Nothing in this file is a production change. Each item is a decision request.

### CC-PM-OVERVIEW-01 — Legacy uncited PM Overviews require staged evidence review

**Status:** open — framework-wide review queue; do not bulk-rewrite.

Existing PM Overviews that lack readable, claim-local bibliography citations
must be assessed when the relevant PM next undergoes Stage 2A. Treat their
substantive statements as propositions, reconcile them with Scientific
Findings, add only citations that support the adjacent claim, and use targeted
retrieval for material gaps. The Mission defines intended scope but is not
evidence that the mechanism achieves it.

Do not automatically rewrite every existing Overview in one migration. Record
page-specific unsupported or unresolved claims in that PM's Stage 2A report and
apply corrections through the normal evidence-review and change-control path.
Authoritative rule: `system/scientific-finding-schema.md` §
**Evidence-supported Overview (Stage 2A)**.

### CC-DIT-01 — “Dietary Requirement” now also covers state-regulation

**Status:** open — terminology only; do not rename the architecture in this pass.

Stage 2B §4.1.1 may admit an evidence-supported **regulatory** relationship with the
PM-governed state (`relationship_mode: state-regulation`) as well as a
capacity/resource relationship (`capacity-requirement`). The reader heading remains
“Dietary Requirement.” Decide later whether to rename the heading or keep the
distinction in overlay metadata only.

**PM-scope consequences.** When evidence adjudication materially changes what a PM
can reasonably claim — its scope, definition, boundary, or interpretation — record
a **PM-scope consequence** here. Review **Mission**, **Overview**, and **Mechanistic
Basis** together before making production changes. Do not alter Mission or Overview
merely because a Finding adds detail; flag only where the PM's supported claims have
changed. Authoritative rule:
`system/primary-mechanism-schema.md` § **PM scope consistency (evidence assessment)**.

**Dietary representation flags.** When PM evidence establishes or changes a
nutritionally relevant biological requirement but downstream KC / cofactor / Key
Dietary Requirement / Lever representation is missing, inconsistent, or conflates
dependency with intervention, record a flag here for the later Dietary Lever pass.
Do **not** deduplicate by nutrient name or delete recurring inputs during PM evidence
work. Format:

`PM → Dietary Input → Input Type → Biological Role → Evidence Source → issue`

Authoritative rule: `system/dietary-input-traceability-contract.md`.

**KC change-control flags.** A PM review must not modify canonical KC definition
or constituent membership. If it identifies a possibly invalid KC, questionable
constituent, candidate constituent, or candidate new bottleneck, record the flag
in PM front matter and summarise it in this queue:

```yaml
kc_change_control_flags:
  - flag_id: KC-CC-BRSX-FM1-PM1-01
    flag_type: constituent-challenge
    kc_id: BRSX(KC1)
    ikc_id: BRSX(KC1)
    proposition: Whether this input genuinely belongs to the constrained iKC pool
    evidence_source:
      finding_ids: [PM1-F1]
    status: pending-kc-review
```

Allowed `flag_type` values are `invalid-kc`, `constituent-challenge`,
`constituent-candidate`, `new-kc-candidate`, and `ikc-scope-conflict`. `kc_id` is
required except for a new-KC candidate. Optional `ikc_id` names the individual
constraint on that KC page (defaults to `kc_id` on single-iKC pages). Allowed
status values are `pending-kc-review` and `resolved-by-kc-review`. Resolution
belongs to a KC-owned evidence review; it must not be encoded as a PM-side
membership edit. PM results never automatically modify an iKC. The flag does not
suspend PM adjudication of Input→PM relationships.

If canonical review retires a KC, close relevant flags, update the retired KC
registry, remove live projections, and independently adjudicate former
constituents. Retirement never authorises automatic migration and must not delete
an independently valid PM-owned relationship.

---

## BRS1-FM1 PM1, PM2, PM4, PM5 — Stage 2B dietary representation flags

**Status:** open — Stage 2A Findings now exist on BRS1-FM1-PM1, BRS1-FM1-PM2 and BRS1-FM1-PM4; PM5 still lacks Stage 2A Findings.

| PM | Input | Input type | Biological role | Evidence source | Downstream issue |
|---|---|---|---|---|---|
| BRS1-FM1-PM1 | Distributed protein intake | dietary pattern | Meal-level amino-acid availability across the day | Walrand & Boirie 2005; Trommelen et al. 2023 | Stage 2A (6 Oct 2026): those papers measure muscle protein balance, not this precursor pool. Not a public lifestyle lever. Candidate remains unresolved, not rejected as impossible. Legacy phenome `evidence_confidence` left unchanged; the attached phenome papers did not measure attention, motivation or emotional regulation. |
| BRS1-FM1-PM1 | BRS1(KC1) | shared constraint | Amino-acid quality of the shared precursor pool (not LAT1 competition) | Mariotti 2019; Moughan 2024; Fernstrom 2013 | `FW008` / `KC-CC-BRS1-FM1-PM1-01` — quality-arm **candidate**, public mapping not established. Competitive balance stays PM2. PM-tab record only; not the Framework Review register. |
| BRS1-FM1-PM2 | Meal carbohydrate-to-protein composition | dietary pattern | Direct state-regulation of plasma Trp/Tyr:LNAA ratios at LAT1 | Ashley 1985; Wurtman 2003; Fernstrom 2013; PM2-F1; PM2-F2 | Admitted to §3.1.1 (`PM2-DIT-3`). Not an SOP. Phenome ADHD wording and Aquili as meal-LAT1 support remain overclaims; legacy `evidence_confidence` left unchanged |
| BRS1-FM1-PM4 | Copper | cofactor | Dopamine β-hydroxylase metal cofactor | PM4-F4; Goldstein 2026; Vendelboe 2016 | Admitted as Direct DR at biological-dependency (`PM4-DIT-4`). Not a noradrenaline lever. See `system/brs1-fm1-pm4-noradrenergic-stage2b-report.md` |
| BRS1-FM1-PM4 | Vitamin C (ascorbate) | cofactor | Dopamine β-hydroxylase electron donor | PM4-F4; Goldstein 2026; Harrison 2009 | Admitted as Direct DR at biological-dependency (`PM4-DIT-5`). Not a noradrenaline lever. See `system/brs1-fm1-pm4-noradrenergic-stage2b-report.md` |
| BRS1-FM1-PM5 | Iron | cofactor | Candidate TPH/AADC metal context | none on this PM | Name-only legacy cofactor; do not inherit from PM3/PM4 |
| BRS1-FM1-PM5 | Folate | cofactor | Candidate one-carbon / BH4 context | none on this PM | Name-only legacy cofactor; BRS2 scope until PM-specific evidence |
| BRS1-FM1-PM5 | Vitamin C | cofactor | Candidate synthesis/redox context | none on this PM | Name-only legacy cofactor |
| BRS1-FM1-PM5 | Fibre-rich dietary pattern | dietary pattern | Gut–brain / microbial serotonin framing | none as a PM5 requirement | Category safeguard: not a Direct/Derived Dietary Requirement |

`PM → Dietary Input → Input Type → Biological Role → Evidence Source → issue`

---

## BRS1-FM1-PM2 — LAT1 Competitive Transport Modulation

### KC-CC-BRS1-FM1-PM2-02 — KC1 quality-arm Type D retest

**Status:** pending-kc-review (`applicability-retest`).

**Review record:** `FW027` on `BRS1-FM1-PM2`.

The competitive LAT1 arm remains an established `governs` mapping. The
quality arm was previously excluded because pool-quality assessment is
maintained on PM1. Type D does not allow ownership to decide applicability.
Retest whether amino-acid quality inadequacy constrains this PM’s governed
LAT1-balance capacity. Do not reopen Dietary Requirements in that pass unless
the test itself requires it.

---

## BRS1-FM1-PM5 — Serotonergic Signalling Regulation

### CC-BRS1-FM1-PM5-01 — Later-stage dietary candidates beyond synthesis

**Status:** Deferred — evidence assessment pending.

**Review record:** `FW023` (`register_surface: pm-tab`) on
`system/framework-qc/page-review-state.json` for `BRS1-FM1-PM5`.

**Reports:** `system/brs1-fm1-pm5-serotonergic-stage2a-report.md`,
`system/brs1-fm1-pm5-serotonergic-stage2b-report.md`.

PM5-F4 establishes release, receptor families, SERT-mediated reuptake and
enzymatic metabolism as signalling stages. Current Dietary Requirements
address synthesis. Review whether the remaining stages have adequately
assessed dietary dependencies.

**Specific candidates for later assessment**

- **MAO:** FAD dependence and the dietary riboflavin → FAD relationship.
- **SERT and vesicular handling:** any ordinary-diet relationship, if one
  exists, distinct from pharmacological transporter engagement.
- Any other specific dietary dependencies identified when reviewing storage,
  release and receptor signalling.

For each candidate, distinguish biochemical necessity, dietary provision,
demonstrated dietary modulation and functional or clinical benefit.

The existing corpus did not establish these dietary routes. Record them as
**unresolved**, not evidence-supported rejections. Their identification does
not authorise admission as Dietary Requirements.

When resumed, use targeted source retrieval to resolve material gaps. Preserve
the completed tryptophan, iron, PLP/B6 and BH4 classifications, the empty
KC mapping, and explained PM connections.

---

## BRS1-FM1-PM3 — Dopaminergic Signalling Regulation

### CC-BRS1-FM1-PM3-01 — Mission-coverage dietary candidates beyond synthesis

**Status:** Deferred — evidence assessment pending.

**Review record:** `FW017` (`register_surface: pm-tab`) on
`system/framework-qc/page-review-state.json` for `BRS1-FM1-PM3`.

**Reports:** `system/dopaminergic-signalling-stage2a-report.md`,
`system/dopaminergic-signalling-stage2b-report.md`,
`system/dopaminergic-signalling-stage2-evidence-checklist.md`.

PM3’s mission covers synthesis, storage, release, receptor signalling, reuptake
and metabolism. Current Dietary Requirements primarily address synthesis.
Review whether the remaining stages have been adequately assessed.

**Specific candidates for later assessment**

- **MAO:** FAD dependence and the dietary riboflavin → FAD relationship.
- **COMT:** SAM and magnesium dependencies, including relevant connections to
  BRS2.
- Any other specific dietary dependencies identified when reviewing storage,
  release, receptor signalling and reuptake.

For each candidate, distinguish biochemical necessity, dietary provision,
demonstrated dietary modulation and functional or clinical benefit. Determine
what belongs in PM3 and what requires an explained connection to another
mechanism.

The existing corpus did not establish these dietary routes. Record them as
**unresolved**, not evidence-supported rejections. Their identification does
not authorise admission as Dietary Requirements.

When resumed, use targeted source retrieval to resolve material gaps. Preserve
the completed tyrosine correction, BH4 placement, relationship descriptions
and audience improvements. Do not treat Stage 2A/2B synthesis-path work as
closing this mission-coverage question.

---

## BRS3 FM1–FM3 — Stage 2B KC / cofactor flags

**Status:** open — KC membership remains `legacy-unreviewed`. PM1 magnesium was independently reviewed as a §4.1.2 biochemical requirement (not restored as a dietary-cofactor food arrow).

| PM | Input | Input type | Biological role | Evidence source | Downstream issue |
|---|---|---|---|---|---|
| BRS3-FM1-PM1 | Magnesium ions (Mg²⁺) | catalytic ion | Mg²⁺–ATP chemistry of IKK phosphotransfer | Mercurio 1997; Adams 2001; UniProt O14920 / Rhea 19073 | Admitted as §4.1.2 biochemical-requirement; not a Direct Dietary Requirement |
| BRS3-FM1-PM1 | Polyphenols | nutrient/compound class | Candidate state-regulation of NF-κB transcriptional tone | Zelicha 2022; Tongjaroenbuangam 2011; Camuesco 2006 | Not admitted to §4.1.1 (endpoint/attribution/exposure bar). Not iKC membership. `KC-CC-BRS3-FM1-PM1-01` remains pending |
| BRS3-FM1-PM1 | EPA/DHA | conditional_supplementation (Optimisation Strategy) | Intervention evidence after Direct/Derived **NO** | Li and Zhang 2026; Cannataro 2024 | **SOP NOT ESTABLISHED.** Stage 2B NO preserved. No SOP YAML. Connected SPM/resolution route remains on PM8; supplementation → resolution response and supplementation → NF-κB transcriptional tone are not closed. Must not project upstream as PM1 Dietary Requirement |
| BRS3-FM2-PM3 | Vitamin C | nutrient/substance | KC-context antioxidant substrate for Nrf2-ARE | Verlaet 2018 | `KC-CC-BRS3-FM2-PM3-01`; not a Direct Nrf2 requirement |
| BRS3-FM2-PM4 | Glutathione | biochemical requirement | Peroxidase reductant vs KC1 GSH amino-acid pool | Kurhan 2021 | `KC-CC-BRS3-FM2-PM4-01` |
| BRS3-FM2-PM6 | Vitamin C | nutrient/substance | Recycling network vs KC1 vitamin C | Packer 1997 | `KC-CC-BRS3-FM2-PM6-01` |

---

## BRS1-FM4-PM9 — GABA Synthesis Capacity

Historical issue keys retain the `CC-PM8-*` prefix assigned before this
mechanism was renumbered to PM9.

Raised by the PM9 adjudication and bounded external evidence review. The PM9
implementation applied only the corrections listed as *implemented*; everything
below remains open.

### CC-PM8-01 — Magnesium / NMDA content proposed for relocation

**Status:** open — removed from PM9, not relocated.

Magnesium was presented on PM9 as a cofactor, in the dose-sensitivity pattern, in
two §4 dietary entries, and as a §5 mechanistic block attributing NMDA receptor
modulation to Cataldo et al. (2024). Adjudication found:

- magnesium → NMDA receptor modulation and excitability is real biology, but it
  is **not** GABA synthesis and lies outside PM9's boundary;
- magnesium → GABA synthesis has not been established;
- Cataldo et al. (2024) is a *Levilactobacillus brevis* study and supports
  neither the magnesium claim nor human PLP-dependent GAD biochemistry.

All magnesium content was therefore removed from PM9. **Decision required:**
whether magnesium/NMDA excitability content should be relocated, and to where.
Note that BRS1-FM4-PM10 (Glutamate Clearance and Recycling) already carries a
"Magnesium and excitatory signalling context" block, so the PM9 material may be
redundant rather than homeless. PM10 was not inspected or modified.

### CC-PM8-02 — Legacy metadata values adjudication found inadequate

**Status:** open — values deliberately unchanged.

| Relationship | Legacy value | Why adjudication finds it inadequate |
|---|---|---|
| PH003 Emotional Regulation | `evidence_level: intervention` | The label rested on Mousain-Bosc et al. (2006), now reclassified as Connected / Supportive Evidence. That trial combined magnesium with B6 and measured no PM9 variable, so it cannot make this relationship intervention evidence for this mechanism. |
| PH003 Emotional Regulation | `evidence_confidence: medium` | No study links GABA synthesis capacity to emotional regulation; the chain is triangulated across separate levels of biology. |
| PH008 Sleep / Calming Tone | `confidence: high` | The only measured evidence is directionally inconsistent across three independent samples, one of which reads elevated GABA as adaptive. A high biology→phenome confidence is not consistent with that. |
| PH016 Apprehensive Worry | `relationship_type: modulates` | No evidence measures worry or perseverative thought as a function; the literature substitutes anxiety-disorder severity. |
| PH018 Social Engagement Capacity | `relationship_type: indirect`, `confidence: low` | Direction is contradicted rather than merely weak — see CC-PM8-03. |

No legacy value was altered, because there is no authorised mapping between the
legacy scale (`low`, `low-medium`, `medium`, `high`) and Synthesised Evidence
Confidence (`very-low`, `low`, `moderate`, `high`).

### CC-PM8-03 — Directional contradictions to adjudicate

**Status:** open — relationships retained, contradictions made visible.

- **PH008.** The framing assumes greater GABA supports calm. Winkelman et al.
  (2008) found ~30% lower global GABA in primary insomnia; Morgan et al. (2012)
  found 12% *higher* occipital GABA and read the elevation as an adaptive
  allostatic response; Spiegelhalder et al. (2016) found no difference and
  explicitly did not support previous reports. Recorded as PM9-F5.
- **PH018.** The framing assumes inhibitory tone supports social approach. The
  only evidence manipulating GABA synthesis and measuring social behaviour —
  Ulrich et al. (2023) — found GAD65 knock-out mice of both sexes had *higher*
  preference for social interaction partners. Recorded as SF-PM8-9.

Neither relationship was deleted. **Decision required:** whether PH008 and PH018
should be retained, rescoped or retired.

### CC-PM8-04 — §4 dietary provenance

**Status:** open — outside the PM9 implementation scope.

Two unsupported magnesium entries were removed from §4.1.1 and §4.1.2. The
remaining §4 entries state substance → food propositions with no traceable
scientific provenance and no link to any Scientific Finding. They require the
later nutritional-evidence adjudication. §4 was otherwise not enriched or
redesigned.

Zinc is retained inside PM9's mechanism only, as part of pyridoxal kinase / PLP
formation (SF-PM8-2). It was **not** added as a dietary lever: the evidence is
in vitro enzymology, shows zinc is most effective rather than uniquely required,
and shows activity depends on metal-to-nucleotide ratio with inhibition by
zinc-ATP — so "more zinc" does not follow. Evidence granularity for its later
Nutritional Target adjudication must follow the proposition rather than requiring
human intervention evidence as a universal prerequisite.

### CC-PM8-05 — Citation-to-claim integrity

**Status:** open — no repository-wide gate exists.

Cataldo et al. (2024) was cited on PM9 for two claims it does not contain. The
repository validates that citation keys *exist* (`npm run bib:validate`) but not
that a cited study supports the claim attached to it. Nothing prevents the same
class of error elsewhere.

### CC-PM8-06 — Dietary representation flags (PM evidence pass)

**Status:** open — for later Dietary Lever / dietary-requirement pass. Do not
deduplicate or delete recurring inputs during PM evidence work.

**Atomic records established** in PM9 `dietary_input_traceability` front matter
(glutamate, PLP, vitamin B6, zinc). SF-PM8-4 intentionally excluded (non-dietary
interpretive Finding).

| PM | Dietary input | Input type | Biological role | Evidence source | Downstream issue |
|---|---|---|---|---|---|
| BRS1-FM4-PM9 | Glutamate | substrate | GAD substrate | SF-PM8-1 / martin_regulation_1993 | Atoms in front matter; not mirrored in `cofactors` or compact §4.1 label UI; protein/lever rows imply substrate without atomic link |
| BRS1-FM4-PM9 | PLP | cofactor | GAD cofactor; reserve capacity | SF-PM8-1 / martin_regulation_1993 | Atoms in front matter; legacy `cofactors: B6 (PLP)` still name-only — needs role/evidence sync or popover wiring |
| BRS1-FM4-PM9 | Vitamin B6 | nutrient/substance | PLP precursor via PDXK; not GABA-specific | SF-PM8-2 / lee, tang, navarro | Atoms in front matter; §4.1.1 + §4.1.2 food lists are shared-role reappearance — no intervention evidence; no UI link to atoms yet |
| BRS1-FM4-PM9 | Zinc | cofactor | PDXK enzymology (in vitro) | SF-PM8-2 / lee, tang, navarro | Atoms in front matter; correctly no dietary lever; §3.2 zinc-specific wording removed (PM9 freeze pass) |
| BRS1-FM4-PM9 | Tryptophan | nutrient/substance | Serotonin precursor / LNAA competition (KC1 scope) | BRS1(KC1) | **KC→PM projection / scope mismatch:** valid KC1 input; no PM9-specific GAD role — removed from PM9 §3.1.3; mechanical roll-up must filter by atomic role |
| BRS1-FM4-PM9 | Tyrosine | nutrient/substance | Catecholamine precursor / LNAA pool (KC1 scope) | BRS1(KC1) | **KC→PM projection / scope mismatch:** valid KC1 input; no PM9-specific GAD role — removed from PM9 §3.1.3; mechanical roll-up must filter by atomic role |
| BRS1-FM4-PM9 | Complete EAA supply | resource dependency (KC1) | General amino-acid pool; may include glutamate substrate context | BRS1(KC1) / PM9 substrate dependency | Retained on PM9 §3.1.3 as plausible KC→PM9 projection — needs atomic role link at Lever build |
| BRS1-FM4-PM9 | B6 + protein pattern | pattern (Lever tier) | Implied dietary modification of synthesis | None for intervention | `dose_sensitivity` + §3.1.1 — **Lever-pass only**; dependency A established without dose-response (SF-PM8-1 limitations) |

**Independent-adjudication rule (global requirement):**
`system/dietary-input-traceability-contract.md` §4. A KC-associated input requires
its own PM atom; do not infer PM9 science from KC1.

### CC-PM8-07 — Dietary Lever reconciliation

**Status:** **Adjudicated + §3 qualified (legacy restored)** (2026-09-24). See
`system/pm9-dietary-addressability-adjudication.md`.

All four atoms carry `dietary_addressability` and `claim_ceiling: biological-dependency`.
§3 legacy rows, `cofactors`, and `dose_sensitivity` **restored**; PM Evidence applied as
additions/qualifications/conflict flags only. **Open:** Change Control to resolve flagged
conflicts (Direct-tier modulation read, B6/PLP label merge, dose_sensitivity pattern);
popover UX; mechanical KC roll-up; CC-PM8-02.

**Workflow required:**

```
PM Evidence → Atomic Dietary Requirements → Dietary Lever Reconciliation
```

§3 Dietary Levers are **traceable** via `dietary_lever_presentations` and on-page PM Evidence
qualifications; rows with **Conflict flag** remain legacy until dedicated Change Control.

---

## BRS2-FM1-PM3 — SAMe Synthesis

Raised by the canonical PM3 migration and bounded MAT/SAM measurement review.
All items below are **identified but not implemented** unless explicitly described
as a PM3-local correction. No neighbouring PM, KC, FM synthesis, BRS hub or
relationship score was changed.

### CC-PM3-01 — Legacy Phenome confidence fields require later review

**Status:** open — values deliberately unchanged.

| Relationship | Current legacy value | Adjudication consequence |
|---|---|---|
| Cognitive Clarity | `confidence: medium`; `evidence_confidence: low-medium` | Attached evidence establishes SAMe's broad methyl-donor role but does not measure MAT-dependent synthesis flux or Cognitive Clarity. The relationship is an inferred downstream bridge with a direct-evidence gap. |
| Emotional Regulation | `confidence: low-medium`; `evidence_confidence: low`; `evidence_level: mechanistic` | The attached mood review concerns exogenous SAMe with folate/B12 treatment, not endogenous MAT activity or synthesis flux. |

**Affected record:** `scripts/data/brs2-phase3-phenome-scores.mjs` preserves the
same legacy snapshot. Re-running the Phase 3 population script can restore these
values but cannot express the new Finding-level construct distinction. Review
later under the authorised Phenome methodology; do not map from unscored SEC.

### CC-PM3-02 — KC2 projection must remain PM-specific

**Status:** Stage 2B Type D recorded as unresolved (30 September 2026). PM3 no longer publishes a KC2 mapping. KC page unchanged.

`BRS2(KC2) — Methionine & Transsulfuration Substrate Pool` contains methionine,
serine, glycine and cysteine. PM3 directly uses methionine; serine, glycine and
cysteine belong to broader cycle/transsulfuration context and are not direct MAT
reaction inputs. PM3 must adjudicate each input independently rather than copy or
filter the KC list into PM science.

### CC-PM3-03 — Upstream B-vitamin placement

**Status:** open — corrected on PM3 only; neighbouring pages unchanged.

Folate/B9, B12, B2 and B6 were removed from PM3's `cofactors`, Direct Dietary
Levers and Supporting Inputs because they support upstream remethylation or
transsulfuration rather than MAT catalysis. Review their placement and
traceability on BRS2-FM1-PM1, BRS2-FM1-PM2, BRS2-FM1-PM4 and relevant KCs
without treating their absence from PM3 as evidence that they are unimportant
to whole-cycle function.

### CC-PM3-04 — FM and cross-page wording must not equate pools with flux

**Status:** open — PM3 Finding rolled up to BRS2(FM1); other prose unchanged.

Any BRS2 FM, hub or connected page that uses SAM concentration or SAM:SAH as a
direct measure of “SAMe synthesis,” “MAT capacity” or synthesis flux should be
reviewed. These measures integrate synthesis, methyl-transfer utilisation, SAH
formation and clearance. The target PM now records this as `PM3-IC1`.

### CC-PM3-05 — Removed PM3 cross-BRS links need graph review

**Status:** resolved 2026-09-30 — invalid PEMT wording removed and qualified
shared-choline relationships authored.

The legacy PM3 §6.2 linked BRS1-FM2-PM6 Acetylcholine Synthesis Support with the
copy “SAMe-dependent PEMT methylation” and BRS1-FM3-PM7 Neuronal Membrane DHA
Incorporation with the copy “Homocysteine disposal through transsulfuration
toward cysteine.” Neither description states a direct PM3 relationship: PEMT is
downstream phosphatidylcholine biology, while homocysteine disposal is upstream
of PM3 and belongs to BRS2-FM2. Review whether qualified relationships should be
authored through BRS2-FM3-PM7 or another canonical mechanism; do not restore the
legacy links verbatim.

The amended PM6 review now links BRS2-FM1-PM1 and PM2 through the supported
one-carbon/choline resource chain and links BRS2-FM3-PM7 for phosphatidylcholine
formation. Reciprocal BRS2 FM1 connection copy was corrected to remove the PEMT
misattribution. The unrelated PM7/transsulfuration description was not restored.

### CC-PM3-06 — Dietary representation flags

**Status:** open — for later Dietary Requirements / Lever reconciliation.

| PM | Input | Input type | Biological role | Evidence source | Downstream issue |
|---|---|---|---|---|---|
| BRS2-FM1-PM3 | Methionine | substrate | Direct MAT substrate | PM3-F1 / Bailey 2021 / Murray 2016 | Biochemical requirement established; human dietary dose-response not established |
| BRS2-FM1-PM3 | ATP | substrate | Adenosyl/energy substrate consumed by MAT | PM3-F1 / Bailey 2021 / Murray 2016 | Must not become a dietary ATP lever |
| BRS2-FM1-PM3 | Mg²⁺ | cofactor | Active-site phosphate coordination | PM3-F1 / Murray 2016 | Physiological limitation and dietary responsiveness not established |
| BRS2-FM1-PM3 | K⁺ | cofactor | Active-site phosphate coordination | PM3-F1 / Murray 2016 | Physiological limitation and dietary responsiveness not established |

The later lever pass must preserve the distinction between biological
requirement, dietary modulation, phenome/clinical outcome evidence and
food-composition evidence.

---

## BRS3(KC1) — Antioxidant Substrate Sufficiency / glutathione precursor pool

Raised by KC-page evidence review (`system/kc-page-evidence-review-contract.md`,
`system/brs3-kc1-evidence-review.md`). PM pages were not modified.

### CC-BRS3-KC1-01 — Dual-arm page title and grouping

**Status:** pending-kc-review (`KC-CC-BRS3-KC1-01`).

“Antioxidant Substrate Sufficiency” as one pool of direct dietary antioxidants
plus glutathione-building amino acids is not supported as a single nutritionally
constrained domain. Admitted science is cysteine and glycine availability for glutathione synthesis.

### CC-BRS3-KC1-02 — Polyphenols as KC constituent

**Status:** resolved-by-kc-review (`KC-CC-BRS3-KC1-02`) — **rejected**.

Zelicha et al. (2022) is a polyphenol-rich dietary-pattern RCT; Packer et al.
(1997) is vitamin E / thiol network biochemistry. Neither establishes
polyphenols as an exogenous antioxidant substrate class or shared KC
prerequisite.

### CC-BRS3-KC1-03 — Vitamin C placement

**Status:** resolved-by-kc-review (`KC-CC-BRS3-KC1-03`) — **excluded from this iKC**.

Packer supports vitamin C as a redox-network recycling input. That is not
constraint membership. No second iKC is created to preserve the input.

### CC-BRS3-KC1-05 — Glutamate iKC membership

**Status:** resolved-by-kc-review (`KC-CC-BRS3-KC1-05`) — **excluded**.

Glutamate is required for glutathione synthesis. Evidence establishes
biochemical dependency only, not nutritional constraint. PM Dietary
Requirements may still carry glutamate where independently supported.

### CC-BRS3-KC1-04 — FM1 / PM1 / PM2 proposed scope

**Status:** pending-kc-review (`KC-CC-BRS3-KC1-04`).

Existing inflammatory PM connections are carried as proposed scope only. The
attached corpus does not establish GSH precursor sufficiency as a shared
constraint of NF-κB or gut-derived inflammatory signalling. Stage 2B must test
each PM ↔ iKC relationship independently.

### CC-BRS3-FM1-PM1-01 — PM1 Stage 2B vs BRS3(KC1) scope

**Status:** pending-kc-review (`KC-CC-BRS3-FM1-PM1-01`) — `ikc-scope-conflict`.

PM1 Stage 2B does not admit BRS3(KC1). Canonical re-adjudication classifies
polyphenols, EPA/DHA, and fibre-rich patterns as modulation/meal-context, not
Dietary Requirements of NF-κB, and not iKC membership. The KC page was not
rewritten.

### CC-BRS1-FM1-PM3-05-KC-COVERAGE — Proposed constraints, no new KC

**Status:** recorded only — do not create a KC in this pass.

Mission-coverage scan for PM3–PM5 considered shared iron-hydroxylase, BH4,
vesicular/VMAT–ATP, and transporter/MAO stages. None is proposed as a new KC:
mineral cofactors and mechanism stages are excluded by the KC schema. Keep
them as PM Dietary Requirements or later-stage deferred items. See
`system/brs1-fm1-pm3-pm5-type-d-kc-reassessment.md`.



## PM7 focused reassessment — 2026-10-01

Review records: FW037, FW038, FW039, FW040; phenome follow-up FW041. Mission and architecture contracts unchanged. KC1 conditional admission and KC2 unresolved are reconciled with FM3. Choline and PC roles use methyl-donor provision; Kennedy support is not PEMT requirement evidence. Source facts and access limits live in PM7-F5/F6/F7. KC1, dietary provision and PM/FM reconciliation were verified with scoped validators and local rendered inspection; FW037/FW039/FW040 are applied. FW038 remains accepted/deferred for KC2. No PM3 or KC-definition edit is authorised by this correction.


### CC-BRS5-PM3-PM4-SCOPE-20261005 — accepted PM partition; parent integration pending

**Status:** PM scope correction accepted and implemented; parent FM integration and separate Stage 2B/phenome review remain open.

PM3 now owns defined microbial barrier–immune contributions; PM4 owns community substrate-processing selection/adaptation. Mission, Overview and Mechanistic Basis were reviewed together. See `system/brs5-pm3-pm4-scope-implementation-record.md` for evidence and verification.

Follow-up: independently substantiate FM1/FM2 integration and FM-level KC relationships, including cross-BRS use where evidenced. Current FM schema's PM-derived KC union conflicts with an independent FM ownership model; do not alter shared contracts or infer new FM reliance in this pass. Duplicate PM KC disclosures and legacy declarations were removed with provenance retained; no-mapping public copy is not evidence that the FM-level route does not exist. KC2's existing rejection remains unchanged.

Existing dietary/intervention/dominance and phenome decisions require review against the narrowed scopes. Preservation in this pass is not re-admission or rating validation. Preserve PM5 SCFA, PM6 polyphenol and PM8 precursor ownership.

### CC-BRS5-PM3-PM4-STAGE2B-20261005 — scope-specific lever adjudication

Authorised local Stage 2B implemented. Five-atom input records, Finding links and separate dominance/placement decisions replace unsupported legacy lists. KC1 applicability remains unresolved; KC2 combined-pool non-application retained. No new PM/FM roll-up or phenome admission. See `system/brs5-pm3-pm4-stage2b-report.md`; final browser/check outcomes are recorded there. Parent integration remains deferred.

### CC-BRS3-DEDICATED-2A-2B-20261006 — seven BRS3 pages, phenome scores not rescored

Dedicated Stage 2A then Stage 2B for BRS3-FM1-PM1, PM2, BRS3-FM2-PM3, PM5, PM6, BRS3-FM3-PM7, and PM8. PM4 was not reopened. Reports are `system/brs3-fm1-pm1-stage2a-report.md` through `system/brs3-fm3-pm8-stage2b-report.md`.

Phenome confidence values were not rescored. Two rationales were corrected where they stated the wrong fact: PM2 no longer says propionate stimulates norepinephrine, and PM5 no longer treats malondialdehyde or lutein as the vitamin E result. PM1 lifestyle dominance and the PM2 fibre and butyrate admissions were withdrawn because the cited papers do not measure the governed step. PM5 and PM6 no longer publish the historical Antioxidant Substrate Sufficiency card; BRS3(KC1) stays unresolved. PM4’s `targeted-retrieval` finding check remains a pre-existing failure.

### CC-BRS5-FM1-PM2-2A-2B-20261007 — endotoxin exposure narrowed; no dietary requirement admitted

**Status:** implemented on the PM page. Parent FM roll-up not yet rewritten.

BRS5-FM1-PM2 now follows circulating lipopolysaccharide. Inherited fibre, polyphenol, fermented-food, ultra-processed-food, cofactor, preparation, and sleep claims are withdrawn. BRS5(KC1) applicability stays unresolved, with public copy “No mapping established.” Diet-Dominant is replaced by Diet-Supported and no principal route. Phenome scores were not rescored; rationales now say the cited studies do not measure lipopolysaccharide. Intestinal alkaline phosphatase remains unresolved and is not on the public page. See `system/brs5-fm1-pm2-stage2a-report.md` and `system/brs5-fm1-pm2-stage2b-report.md`.

### CC-BRS5-FM1-PM3-OVERVIEW-20261005 — practical reader orientation

User-authorised authoring correction: Overview explains purpose, health significance and implementation context. Default bullets are Benefits, Implementation Notes and Biological Relevance; omit/combine/substitute when relevant supported points are unavailable and record the reason. Technical boundaries and measurement distinctions belong in §4. Reconciled primary-mechanism-schema.md and mechanism-page-section-prose.md; replaced the obsolete ecological PM3 example. Only PM3’s current Overview and boundary placement were revised. Scientific Findings, mission, five-atom inputs, dominance, KCs and phenome records are preserved. No other PM migration.


## ECS/Hormones Stage 2A/2B — 2026-10-09

Canonical identities and missions retained pending scope review; no parent or phenome uplift.

- **BRS-X(ECS-PM1)** — Whether orally supplied PE/NAPE reaches the relevant neural precursor pool and changes its production; choline participation in other phospholipids does not resolve this link. Preserve identity and mission pending review; current evidence statements remain bounded. No automatic rating or parent-FM uplift.
- **BRS-X(ECS-PM2)** — ALA-to-EPA/DHA-to-neural ethanolamide supply was not established as a PM-specific dietary relationship; no automatic ALA admission. Preserve identity and mission pending review; current evidence statements remain bounded. No automatic rating or parent-FM uplift.
- **BRS-X(ECS-PM3)** — Food-level genistein exposure to relevant neural FAAH inhibition and signal duration is unestablished. Probiotic serum FAAH concentration is not a brain enzyme-activity assay. Preserve identity and mission pending review; current evidence statements remain bounded. No automatic rating or parent-FM uplift.
- **BRS-X(ECS-PM4)** — Dietary precursor status to this specific circuit response remains unresolved; shared lipid supply is not independent evidence of a food intervention. Preserve identity and mission pending review; current evidence statements remain bounded. No automatic rating or parent-FM uplift.
- **BRS-X(ECS-PM5)** — The mission’s neuroinflammatory component lacks a separately extracted causal endpoint in this pass. Ordinary-food stress-buffering claims remain unresolved. Preserve identity and mission pending review; current evidence statements remain bounded. No automatic rating or parent-FM uplift.
- **BRS-X(Hormones-PM1)** — A diet or practice influencing the stated neural signalling endpoint has not been established; soy cognitive null results do not negate estrogen receptor biology. Preserve identity and mission pending review; current evidence statements remain bounded. No automatic rating or parent-FM uplift.
- **BRS-X(Hormones-PM2)** — Defined dietary substrate or practice to relevant glucuronidase conversion and systemic recycling remains unresolved; generic fermentable-fibre sufficiency is not selective enzyme evidence. Preserve identity and mission pending review; current evidence statements remain bounded. No automatic rating or parent-FM uplift.
- **BRS-X(Hormones-PM3)** — The demonstrated process is progestin production, not progesterone stability. Canonical fermentable-fibre members to converter-accessible hydrogen and the hormonal endpoint need separate adjudication. Preserve identity and mission pending review; current evidence statements remain bounded. No automatic rating or parent-FM uplift.
- **BRS-X(Hormones-PM4)** — The dietary trial did not establish insulin mediation or superior reproductive hormone concentrations; broader reproductive and neural benefit is unestablished. Preserve identity and mission pending review; current evidence statements remain bounded. No automatic rating or parent-FM uplift.
- **BRS-X(Hormones-PM5)** — Receptor response and motivation were not established. Zinc supply is not an androgen-receptor catalytic cofactor, and sleep restoration efficacy was not tested. Preserve identity and mission pending review; current evidence statements remain bounded. No automatic rating or parent-FM uplift.
- **BRS-X(Hormones-PM6)** — The local-to-circulating androgen link and exposure-specific microbial control remain unresolved; reverse-direction hormone experiments do not close that gap. Preserve identity and mission pending review; current evidence statements remain bounded. No automatic rating or parent-FM uplift.

Inherited intervention qualifications without a current qualifying route require separate label reconciliation. Hub food/KC lists and parent claims were not silently propagated or updated.
