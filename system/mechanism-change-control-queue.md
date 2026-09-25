# Mechanism change control queue

Items raised by mechanism adjudication that must **not** be actioned silently:
content proposed for relocation to another mechanism, legacy metadata values that
adjudication found inadequate, and relationships whose evidence contradicts the
stated direction.

Nothing in this file is a production change. Each item is a decision request.

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
    proposition: Whether this input genuinely belongs to the constrained KC pool
    evidence_source:
      finding_ids: [PM1-F1]
    status: pending-kc-review
```

Allowed `flag_type` values are `invalid-kc`, `constituent-challenge`,
`constituent-candidate`, and `new-kc-candidate`. `kc_id` is required except for a
new-KC candidate. Allowed status values are `pending-kc-review` and
`resolved-by-kc-review`. Resolution belongs to a KC-owned evidence review; it must
not be encoded as a PM-side membership edit. The flag does not suspend PM
adjudication: the PM independently admits or rejects the Input→PM relationship
using PM-specific evidence and records any supported relationship in its own atom.

If canonical review retires a KC, close relevant flags, update the retired KC
registry, remove live projections, and independently adjudicate former
constituents. Retirement never authorises automatic migration and must not delete
an independently valid PM-owned relationship.

---

## BRS1-FM4-PM8 — GABA Synthesis Capacity

Raised by the PM8 adjudication and bounded external evidence review. The PM8
implementation applied only the corrections listed as *implemented*; everything
below remains open.

### CC-PM8-01 — Magnesium / NMDA content proposed for relocation

**Status:** open — removed from PM8, not relocated.

Magnesium was presented on PM8 as a cofactor, in the dose-sensitivity pattern, in
two §4 dietary entries, and as a §5 mechanistic block attributing NMDA receptor
modulation to Cataldo et al. (2024). Adjudication found:

- magnesium → NMDA receptor modulation and excitability is real biology, but it
  is **not** GABA synthesis and lies outside PM8's boundary;
- magnesium → GABA synthesis has not been established;
- Cataldo et al. (2024) is a *Levilactobacillus brevis* study and supports
  neither the magnesium claim nor human PLP-dependent GAD biochemistry.

All magnesium content was therefore removed from PM8. **Decision required:**
whether magnesium/NMDA excitability content should be relocated, and to where.
Note that BRS1-FM4-PM9 (Glutamate Clearance and Recycling) already carries a
"Magnesium and excitatory signalling context" block, so the PM8 material may be
redundant rather than homeless. PM9 was not inspected or modified.

### CC-PM8-02 — Legacy metadata values adjudication found inadequate

**Status:** open — values deliberately unchanged.

| Relationship | Legacy value | Why adjudication finds it inadequate |
|---|---|---|
| PH003 Emotional Regulation | `evidence_level: intervention` | The label rested on Mousain-Bosc et al. (2006), now reclassified as Connected / Supportive Evidence. That trial combined magnesium with B6 and measured no PM8 variable, so it cannot make this relationship intervention evidence for this mechanism. |
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
  explicitly did not support previous reports. Recorded as PM8-F5.
- **PH018.** The framing assumes inhibitory tone supports social approach. The
  only evidence manipulating GABA synthesis and measuring social behaviour —
  Ulrich et al. (2023) — found GAD65 knock-out mice of both sexes had *higher*
  preference for social interaction partners. Recorded as SF-PM8-9.

Neither relationship was deleted. **Decision required:** whether PH008 and PH018
should be retained, rescoped or retired.

### CC-PM8-04 — §4 dietary provenance

**Status:** open — outside the PM8 implementation scope.

Two unsupported magnesium entries were removed from §4.1.1 and §4.1.2. The
remaining §4 entries state substance → food propositions with no traceable
scientific provenance and no link to any Scientific Finding. They require the
later nutritional-evidence adjudication. §4 was otherwise not enriched or
redesigned.

Zinc is retained inside PM8's mechanism only, as part of pyridoxal kinase / PLP
formation (SF-PM8-2). It was **not** added as a dietary lever: the evidence is
in vitro enzymology, shows zinc is most effective rather than uniquely required,
and shows activity depends on metal-to-nucleotide ratio with inhibition by
zinc-ATP — so "more zinc" does not follow. Evidence granularity for its later
Nutritional Target adjudication must follow the proposition rather than requiring
human intervention evidence as a universal prerequisite.

### CC-PM8-05 — Citation-to-claim integrity

**Status:** open — no repository-wide gate exists.

Cataldo et al. (2024) was cited on PM8 for two claims it does not contain. The
repository validates that citation keys *exist* (`npm run bib:validate`) but not
that a cited study supports the claim attached to it. Nothing prevents the same
class of error elsewhere.

### CC-PM8-06 — Dietary representation flags (PM evidence pass)

**Status:** open — for later Dietary Lever / dietary-requirement pass. Do not
deduplicate or delete recurring inputs during PM evidence work.

**Atomic records established** in PM8 `dietary_input_traceability` front matter
(glutamate, PLP, vitamin B6, zinc). SF-PM8-4 intentionally excluded (non-dietary
interpretive Finding).

| PM | Dietary input | Input type | Biological role | Evidence source | Downstream issue |
|---|---|---|---|---|---|
| BRS1-FM4-PM8 | Glutamate | substrate | GAD substrate | SF-PM8-1 / martin_regulation_1993 | Atoms in front matter; not mirrored in `cofactors` or compact §4.1 label UI; protein/lever rows imply substrate without atomic link |
| BRS1-FM4-PM8 | PLP | cofactor | GAD cofactor; reserve capacity | SF-PM8-1 / martin_regulation_1993 | Atoms in front matter; legacy `cofactors: B6 (PLP)` still name-only — needs role/evidence sync or popover wiring |
| BRS1-FM4-PM8 | Vitamin B6 | nutrient/substance | PLP precursor via PDXK; not GABA-specific | SF-PM8-2 / lee, tang, navarro | Atoms in front matter; §4.1.1 + §4.1.2 food lists are shared-role reappearance — no intervention evidence; no UI link to atoms yet |
| BRS1-FM4-PM8 | Zinc | cofactor | PDXK enzymology (in vitro) | SF-PM8-2 / lee, tang, navarro | Atoms in front matter; correctly no dietary lever; §3.2 zinc-specific wording removed (PM8 freeze pass) |
| BRS1-FM4-PM8 | Tryptophan | nutrient/substance | Serotonin precursor / LNAA competition (KC1 scope) | BRS1(KC1) | **KC→PM projection / scope mismatch:** valid KC1 input; no PM8-specific GAD role — removed from PM8 §3.1.3; mechanical roll-up must filter by atomic role |
| BRS1-FM4-PM8 | Tyrosine | nutrient/substance | Catecholamine precursor / LNAA pool (KC1 scope) | BRS1(KC1) | **KC→PM projection / scope mismatch:** valid KC1 input; no PM8-specific GAD role — removed from PM8 §3.1.3; mechanical roll-up must filter by atomic role |
| BRS1-FM4-PM8 | Complete EAA supply | resource dependency (KC1) | General amino-acid pool; may include glutamate substrate context | BRS1(KC1) / PM8 substrate dependency | Retained on PM8 §3.1.3 as plausible KC→PM8 projection — needs atomic role link at Lever build |
| BRS1-FM4-PM8 | B6 + protein pattern | pattern (Lever tier) | Implied dietary modification of synthesis | None for intervention | `dose_sensitivity` + §3.1.1 — **Lever-pass only**; dependency A established without dose-response (SF-PM8-1 limitations) |

**Independent-adjudication rule (global requirement):**
`system/dietary-input-traceability-contract.md` §4. A KC-associated input requires
its own PM atom; do not infer PM8 science from KC1.

### CC-PM8-07 — Dietary Lever reconciliation

**Status:** **Adjudicated + §3 qualified (legacy restored)** (2026-09-24). See
`system/pm8-dietary-addressability-adjudication.md`.

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

**Status:** open — PM3 display narrowed locally; KC page unchanged.

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

**Status:** open — invalid links removed from PM3 only.

The legacy PM3 §6.2 linked BRS1-FM2-PM5 Acetylcholine Synthesis Support with the
copy “SAMe-dependent PEMT methylation” and BRS1-FM3-PM6 Neuronal Membrane DHA
Incorporation with the copy “Homocysteine disposal through transsulfuration
toward cysteine.” Neither description states a direct PM3 relationship: PEMT is
downstream phosphatidylcholine biology, while homocysteine disposal is upstream
of PM3 and belongs to BRS2-FM2. Review whether qualified relationships should be
authored through BRS2-FM3-PM7 or another canonical mechanism; do not restore the
legacy links verbatim.

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
