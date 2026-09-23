# Canonical Synthesised Evidence — Pilot 1 Record

**Status:** ACCEPTED AND CONCEPTUALLY CLOSED
**Pilot target:** BRS6-FM2-PM4 (Cortisol Rhythm Regulation) → PH015 (Stress Reactivity), Phenome Evidence only
**Scope of this document:** evidence record + final governance decisions + preferred conceptual model
**What this document is NOT:** schema, scoring methodology, confidence assignment, legacy confidence mapping, or authorisation to modify production content

This record supersedes nothing in `docs/` or `src/data/`. No production scientific content was modified during Pilot 1. No confidence values were assigned, mapped or rescored.

---

## PART 0 — PILOT BOUNDARY AS EXECUTED

Pilot 1 examined only the Phenome Evidence supporting BRS6-FM2-PM4 → PH015. The primary corpus was the three references attached to that relationship. PM4 page references were inspected only as a secondary lookup where they addressed the same candidate scientific question. One further synthesis (Kamradt 2018) was assessed as a targeted gap follow-up because it was identified from inside the primary corpus and bore directly on one of the two Findings.

The pilot did not audit the wider PM4 evidence, dietary evidence, System Optimisation evidence, other phenome relationships, or the complete PM reference list.

---

## PART 1 — EVIDENCE RECORD

### 1.1 Current repository state (as observed, unmodified)

| Item | Observed value |
|---|---|
| PM | `BRS6-FM2-PM4` — Cortisol Rhythm Regulation |
| PM mission | "Maintain diurnal cortisol amplitude and phase so morning activation and evening downshift stay well timed." |
| Phenome | `PH015` — Stress Reactivity |
| PH015 definition | "Intensity and pattern of physiological and affective responses to stressors." |
| PH015 public summary | "How strongly and quickly the system reacts to stress — distinct from longer-term stress resilience." |
| PH015 therapeutic areas | TA001 ADHD (primary worked example), TA002, TA004, TA006 |
| Relationship type | `modulates` |
| Attached references | Chang et al. (2021); Isaksson et al. (2012); Lane et al. (2010) |

**Exact current relationship wording (unchanged):**

> "Meta-analysis reports altered basal and morning cortisol patterns in youths with ADHD; cortisol levels in children with ADHD and sensory-over-responsivity differentiation work using cortisol markers converge on HPA rhythm as a stress-reactivity node."

**Legacy confidence values — preserved verbatim, not reinterpreted:**

- Biology → Phenome Confidence: `low-medium`
- Evidence Confidence (row level): `low-medium`
- Evidence Level (row level): `observational`
- PH015 registry-level evidence confidence: `low-medium`

The PH015 registry-level note refers to E/I balance, redox biology, magnesium and homocysteine, and does not mention cortisol — confirming that the registry score and the PM4 row are independent objects, as designed.

**Current evidence presentation.** The entire evidence content for the relationship is one rationale sentence plus a three-item reference list. No population, no result direction, no effect estimate, no study-level limitation and no dependency statement appears anywhere in the row.

**Provenance observed.** No per-relationship provenance exists (no reviewer, date, or record of source depth). Generation lineage exists: `scripts/data/brs6-pm-phenome.mjs` → PM front matter → `src/data/phenome-relationships.generated.json`. Registry-level provenance exists on PH015 itself.

**Two defects identified in the current wording.** First, "altered basal and morning cortisol patterns" erases direction; the underlying finding is specifically *lower*. Second, the clause describing Lane 2010 presents as support a study whose cortisol results were not statistically significant; its only significant physiological group difference was electrodermal.

### 1.2 Scientific Findings identified

The relationship contained two scientifically distinct Findings which cannot legitimately be collapsed.

**SF1 — tonic / basal diurnal cortisol.** In youths with ADHD, basal salivary cortisol is lower than in typically developing youths, most consistently in the waking/morning segment and in cumulative daily output, with no difference in the afternoon.

**SF2 — phasic acute stress-reactive cortisol.** A difference in acute stress-reactive cortisol between children with ADHD and typically developing children has not been demonstrated.

**Discriminator.** SF1 concerns basal diurnal output sampled without any applied stressor. SF2 concerns the pre-to-post change in cortisol following an applied acute stressor. These are different measured constructs, not two views of one.

**Why the split is forced by the evidence, not by preference.** Chang 2021 states in its own limitations that it did not account for the cortisol awakening response and therefore *cannot draw any conclusion on stress reactivity in ADHD* — the meta-analysis explicitly disclaims the inference the relationship row makes. Lane 2010 sampled only between 1 and 4 pm by design and is structurally incapable of addressing the morning segment.

**Consequence for PH015.** PH015 is defined as phasic response to a stressor. The stronger half of this evidence (SF1) is tonic. The Finding the phenome actually requires (SF2) is the weaker of the two.

**A third Finding belonging to the PM, not to any phenome.** *Behavioural and feeding timing cues set diurnal cortisol phase and amplitude in humans* (Scheer 2009, supported by Schmidt 2015). This supports the existence of PM4 as a mechanism and terminates in no phenome relationship. It was the direct evidence for the architectural correction recorded in Part 2, §3.

### 1.3 Individual Study Assessments

#### Chang et al. (2021) — SF1

- **Study.** Systematic review with random-effects meta-analysis of case-control studies; PubMed to 19 January 2021; PRISMA; JBI critical appraisal; Hedges' adjusted *g*; pre-planned subanalyses by sampling time; no publication bias (Begg p = 0.916; Egger p = 0.434). Sign convention: positive *g* = lower cortisol in ADHD. Studies re-analysing the same dataset were treated as non-independent and only the largest retained.
- **Population.** 916 youths with ADHD vs 947 typically developing youths, ages 4–17, pooled across countries. Medication status reported in all but two included studies; ADHD subtype not consistently reported and not subgrouped.
- **Result.** Lower basal cortisol at any time point; lower cumulative daily output; lower morning cortisol; **no difference in the afternoon**; no difference at noon or bedtime.
- **Effect / Magnitude.** Basal g = 0.68, p = 0.004 (n = 1863). AUCg g = 0.39, p = 0.008 (n = 718). Morning g = 0.84, p = 0.003 (14 studies, n = 1679). Afternoon p = 0.48 (9 studies, n = 858). Salivary only g = 0.80, p = 0.006 (n = 1570); morning salivary g = 0.99 (11 studies, n = 1354); awakening salivary g = 0.27, p = 0.002 (6 studies, n = 750); noon p = 0.07; bedtime p = 0.51. **Sensitivity:** removing Maldonado 2009 and McCarthy 2011 reduces basal to g = 0.27 (p = 0.010) and morning to g = 0.24 (p = 0.020), with heterogeneity falling from I² = 95% to 73.1% and 96% to 65.5%. No 95% CIs in the text.
- **Evidence Summary.** Direct, in-population, quantitative support for SF1. Explicitly not support for SF2, by the authors' own statement.
- **Limitations.** Heterogeneity I² 95–96%. Headline magnitude falls roughly three-fold on removal of two studies with younger samples, one of which accepted parent-reported diagnosis. Cross-sectional throughout; no causal direction and no link from cortisol to symptoms or function. Diet, exercise and subtype uncontrolled. Immunoassays also detect inactive 5α-reduced cortisol metabolites, so the measured construct may not be active cortisol.
- **Evidence Source.** Full text reviewed; supplementary tables not inspected (hence CIs unavailable).
- **Reference.** Chang JP-C, Su K-P, Mondelli V, Pariante CM. *Transl Psychiatry* 2021;11:430. doi:10.1038/s41398-021-01550-0

#### Isaksson et al. (2012) — SF1; nested inside Chang 2021

- **Study.** Case-control; four salivary samples across one regular weekday (waking, +30 min, afternoon, bedtime); radioimmunoassay; diagnoses from clinical data; subtype and severity from parental rating scales; age-stratified in three bands.
- **Population.** Children and adolescents aged 6–17 with ADHD (n = 201) and non-affected comparisons (n = 221); Swedish clinical sample. Largest single primary cohort in the SF1 base.
- **Result.** Lower at waking, +30 min and bedtime; **no difference in the afternoon**; pattern present only above age 10; no subtype or comorbid-symptom effect; severity not associated with cortisol except a weak negative correlation between the afternoon sample and hyperactivity.
- **Effect / Magnitude.** Medians: waking 9.1 vs 12.7 nmol/L, p < 0.001 (≈ −28%); +30 min 15.8 vs 20.1 nmol/L, p < 0.001 (≈ −21%); bedtime 0.8 vs 1.0 nmol/L, p = 0.015 (≈ −20%, absolute difference 0.2 nmol/L). No standardised effect size, dispersion or CIs available at abstract level.
- **Evidence Summary.** Supplies the internal time-of-day structure of SF1 in the target population, at the largest single-study sample size.
- **Limitations.** Cross-sectional. Naturalistic single-day sampling with no reported verification of sampling adherence or actual waking time — material because the waking and +30-minute samples carry the finding. Radioimmunoassay rather than mass spectrometry. Age-dependent (only above 10 years). No stressor applied, so contributes nothing to SF2. The bedtime difference is small in absolute terms and its direction at the expected evening nadir is not obviously unfavourable.
- **Evidence Source.** Abstract only; full text not available locally.
- **Reference.** Isaksson J, Nilsson KW, Nyberg F, Hogmark Å, Lindblad F. *J Psychiatr Res* 2012;46(11):1398–1405. doi:10.1016/j.jpsychires.2012.08.021. PMID 22974590

#### Lane et al. (2010) — SF2; null for cortisol; nested inside Kamradt 2018

- **Study.** Cross-sectional laboratory case-control using the Sensory Challenge Protocol (six sensory stimuli, eight presentations each) with concurrent electrodermal recording. Salivary cortisol at two baselines and seven post-challenge samples at 5-minute intervals. Testing restricted to 1–4 pm on non-school days; ADHD medication withheld 24 hours. RCMAS anxiety; SensOR inventory; stepwise discriminant analysis with cross-validation.
- **Population.** 84 children aged 6–12: typical (36), typical with sensory over-responsivity (9), ADHD without SOR (18), ADHD with SOR (21). ODD, CD and other psychiatric diagnoses excluded; IQ > 70. Convenience sample, partly parent-self-referred.
- **Result.** **Null for cortisol** — no group differences at baseline, immediately post-challenge, or following challenge. The only significant physiological group difference was electrodermal: non-specific responses during recovery higher in ADHD-with-SOR than typical children (p < 0.039, "over twice as many"). Descriptively and non-significantly, cortisol at 25/30 minutes post-challenge was elevated with greater variability in both SOR groups while ADHD-without-SOR was more attenuated. Anxiety subscales, not cortisol, drove group discrimination.
- **Effect / Magnitude.** **Reported but not interpretable** for cortisol: group means appear only as a plotted figure (≈0.02–0.18 µg/dL) with no dispersion, effect sizes or CIs. Discriminant classification 85.6% in-sample versus 44.9% cross-validated.
- **Evidence Summary.** A null-to-inconsistent result for stress-reactive cortisol, with a hypothesis-generating suggestion that sensory over-responsivity moderates response direction. Does not support "altered basal and morning cortisol" — baseline was non-significant and no morning sample was taken.
- **Limitations.** Afternoon-only sampling by design, so structurally incapable of addressing morning or diurnal questions. Small convenience sample, underpowered relative to variables examined, likely self-referral bias (46% of the ADHD group had SOR). Comorbidity by parental report. Authors state the challenge may have been insufficiently stressful to elicit a consistent response, which limits how strongly even the null can be read. Because cortisol never reached significance, all directional statements about it are descriptive.
- **Evidence Source.** Full text reviewed.
- **Reference.** Lane SJ, Reynolds S, Thacker L. *Front Integr Neurosci* 2010;4:8. doi:10.3389/fnint.2010.00008

#### Chang et al. (2020) — SF1; secondary lookup; nested inside Chang 2021

Currently attached on the PM4 page to the Emotional Regulation row, not to PH015. Included here because it addresses the same scientific question as SF1.

- **Study.** Case-control; salivary cortisol at four daily time points (awakening, noon, 1800 h, bedtime) plus morning plasma inflammatory markers and neurotrophins; stratified by age, subtype and ODD comorbidity; single site, Taiwan.
- **Population.** 98 youths with ADHD (6–18 y, mean 9.3) versus 21 typically developing youths (mean 9.2).
- **Result.** Lower bedtime salivary cortisol (p = 0.023); combined presentation had the lowest awakening cortisol. Also higher hs-CRP and IL-6, lower TNF-α and BDNF.
- **Effect / Magnitude.** **Reported but not interpretable.** Bedtime cortisol effect size printed as −0.04 (p = 0.023), implausibly small for a significant result and inconsistent in sign convention with the inflammatory effect sizes in the same paper (0.85–1.20). The subtype/awakening comparison is reported without any effect estimate.
- **Evidence Summary.** Same direction as SF1 in the target population, adding bedtime and subtype detail. Not independent of Chang 2021.
- **Limitations.** Comparator group very small and unbalanced (21 against 98). Single site. Cortisol effect magnitude unusable as published. Contained within Chang 2021 and shares four authors with it.
- **Evidence Source.** Abstract only.
- **Reference.** Chang JP-C, Mondelli V, Satyanarayanan SK, Chiang Y-J, Chen H-T, Su K-P, Pariante CM. *Brain Behav Immun* 2020;88:105–113. doi:10.1016/j.bbi.2020.05.017. PMID 32418647

#### Kamradt et al. (2018) — SF2; targeted gap follow-up

- **Study.** Systematic meta-analytic review. Searches through February 2016 (PsycINFO, MEDLINE, ProQuest Dissertations & Theses) plus backward searches from Alink 2008 and Scassellati 2012. 977 records screened; 28 met substantive criteria; 16 excluded for insufficient data to compute an effect size; **k = 12**. Mixed-effects regression (metafor, DerSimonian–Laird); Egger's test and Duval–Tweedie trim-and-fill; standardised residuals and leave-one-out for outliers. Cohen's *d* converted to Pearson's *r*; **negative *r* = blunted response in ADHD**.
- **Population.** 1,041 participants across 12 case-control studies, each with an ADHD and a non-ADHD control group. **Mixed child and adult:** eight child/adolescent samples (mean ages 6.3–13.0; n ≈ 779) and four adult samples (mean ages 26.6–36.0; n ≈ 262). Seven community, five clinical. Only four of twelve reported results by ADHD presentation; only three reported comorbid inclusion.
- **Stress-reactivity construct.** Change in **salivary** cortisol from before to after an **acute stressor**; all twelve used saliva. Stressors not standardised: ten laboratory (mostly social threat, plus one cognitive, one mathematics, one sensory challenge) and two naturalistic medical procedures.
- **Result.** **Null overall with no consistent direction** — six study-level effects negative, six positive. Descriptively, all four adult effects are positive and six of eight child effects negative; age could not be tested as a moderator and no child-specific pooled estimate exists.
- **Effect / Magnitude.** *r* = 0.00, 95% CI −0.36 to +0.36 (k = 12, N = 1041). Heterogeneity Q(11) = 617.18, p < 0.0001; τ² = 0.38; **I² = 98.22%**. Egger's test not significant (z = 1.67, p = 0.10). **Trim-and-fill estimated 5 studies missing from the blunted side and yielded an adjusted estimate of −0.24 (95% CI −0.49 to 0.00).** van West 2009 (*r* = −0.89) flagged as a potential outlier but leave-one-out showed no material change. Against the paper's own thresholds (0.10 small, 0.24 moderate, 0.37 large) the interval spans large blunting to large elevation. *Reporting inconsistency:* Table 1 gives p = 1.00 for the overall effect, the Results text gives p = 0.10.
- **Evidence Summary.** The most directly on-construct evidence in the corpus for PH015 as defined. It converts SF2 from an assertion resting on one underpowered study into a quantified pooled result, and changes its character: not "no difference exists" but "no consistent direction established, with magnitude compatible with substantial blunting." The authors further conclude that cortisol reactivity may not be a valid index of the regulatory capacity it is used to represent, recommending skin conductance and heart-rate variability instead.
- **Limitations material to SF2.** The CI is uninformative rather than reassuring and cannot support equivalence. 98% heterogeneity with no moderator analysis possible, not even age or sex. Publication-bias adjustment moves the estimate to moderate blunting with an upper bound of exactly 0.00, so the null is not robust. Roughly a quarter of pooled participants are adults whose effects run opposite in direction. Stressor paradigms and sampling windows unstandardised. 16 of 28 eligible studies excluded solely for uncomputable effect sizes, and some retained effects were visually approximated from published figures. Search closed February 2016 and has not been updated.
- **Evidence Source.** Full text reviewed via Europe PMC (PMC5837926), including Tables 1 and 2, publication-bias and outlier analyses, and Limitations; Figures 1–3 not inspected, so per-study CIs were not read.
- **Reference.** Kamradt JM, Momany AM, Nikolas MA. *Atten Defic Hyperact Disord* 2018;10(2):99–111. doi:10.1007/s12402-017-0238-5. PMID 28875432

### 1.4 Evidence dependency observed

Pilot 1 produced five materially different kinds of non-independence within a single relationship.

1. **Primary study nested inside a meta-analysis.** Isaksson 2012 is included study [3] in Chang 2021's cortisol meta-analysis (included list "[3, 4, 5, 20, 22, 23, 24, 25, 26, 28–37]"), and is one of the five recent salivary studies added to update Scassellati. It contributes roughly 22% of the pooled ADHD cases (201 of 916), so it materially drives the pooled estimate. Chang 2020 is included study [20] in the same list and shares four authors with the meta-analysis. Lane 2010 is one of Kamradt 2018's twelve (coded N = 54, *r* = −0.07).
2. **The same participants contributing different measured constructs to different Findings.** Six of Kamradt's twelve studies are also among Chang 2021's nineteen: Blomqvist 2007, Snoek 2004, Randazzo 2008, Maldonado 2009, van West 2009, McCarthy 2011. SF1 and SF2 therefore draw on overlapping participants with a different construct extracted from each. This does not invalidate the split — it reinforces it — but SF1 and SF2 must never be treated as mutually corroborating independent evidence.
3. **A pointed instance of that overlap.** Maldonado 2009 and McCarthy 2011, whose removal collapsed Chang's morning effect from g = 0.84 to g = 0.24, are both in Kamradt's pool with near-zero reactivity effects (−0.02 and −0.06), and McCarthy is the largest study in it (N = 368). The studies carrying most of SF1's fragile magnitude contribute essentially nothing to SF2.
4. **Overlapping syntheses and shared search ancestry.** Chang 2021 is an update of Scassellati 2012; Kamradt back-searched Scassellati 2012. The two syntheses are not independent in provenance.
5. **Same-programme prior report.** Lane 2010 is the larger follow-up of the same laboratory's pilot (Reynolds, Lane & Gennings 2009) using the same protocol.

**Why it matters.** As displayed, the relationship shows three references and reads as three converging lines. It is one meta-analytic body plus two of its own inputs. A meta-analysis and one of its included primary studies must not be presented as two independent replications.

### 1.5 Connected / supportive evidence

**Scheer et al. (2009).** Ten healthy adults, 10-day forced-desynchrony protocol on a recurring 28-hour day. Circadian misalignment of about 12 hours **completely reversed the daily cortisol rhythm** (p < 0.001), with −17% leptin, +6% glucose despite +22% insulin, +3% mean arterial pressure and −20% sleep efficiency. *Relevant because* it is the only causal, experimental human evidence that behavioural timing controls diurnal cortisol phase, and it is what makes PM4 defensible as a mechanism. *Excluded from SF1 and SF2 because* the population is healthy adults, the exposure is extreme laboratory misalignment rather than an ordinary lever, and no stress-reactivity outcome was measured. It supports the PM's existence, not the PM→PH015 relationship.

**Schmidt et al. (2015).** Randomised three-arm trial, 45 healthy volunteers: fructo-oligosaccharide, Bimuno galacto-oligosaccharide, or maltodextrin placebo for three weeks. Cortisol awakening response sampled at 0/15/30/45/60 minutes post-waking, pre- and post-treatment. B-GOS lowered the waking cortisol response versus placebo at day 21 (group effect F(2,41) = 4.20, p < 0.05; placebo vs B-GOS p = 0.02; no baseline difference); attentional bias was altered, but the cortisol and behavioural changes were unrelated. *Relevant because* it is the only interventional evidence that a dietary input can shift the same waking cortisol segment SF1 concerns — the nutrition→biology limb. *Excluded from SF1 because* the population is healthy adults, no ADHD or stress-reactivity outcome was measured, and **the directions conflict**: SF1 describes a population with already-lower morning cortisol while Schmidt lowers the waking response further in people who were not low. Combining them would imply that the dietary lever moves the target population further in the direction of its own observed abnormality.

**Recorded tension, not resolved.** The therapeutic significance and desirable direction of cortisol modulation are not established by any evidence in this pilot. Normal regulatory function is not necessarily the inverse of an observational case-control difference.

### 1.6 Candidate Synthesised Evidence Summaries

#### SF1

**Scientific Finding.** In youths with ADHD, basal diurnal salivary cortisol is lower than in typically developing youths, most consistently in the waking/morning segment and in cumulative daily output, with no difference in the afternoon.

**Evidence Considered.**
- Chang et al. (2021) — pooled lower morning cortisol (g = 0.84) and lower cumulative daily output (AUCg g = 0.39), no afternoon difference; morning effect falls to g = 0.24 when two influential studies are removed.
- Isaksson et al. (2012) — *nested within Chang 2021*: lower waking (−28%) and +30-minute (−21%) cortisol in 201 children with ADHD versus 221 comparisons, no afternoon difference, present only above age 10.
- Chang et al. (2020) — *nested within Chang 2021*: lower bedtime cortisol and lowest awakening cortisol in the combined presentation, against only 21 controls and with an uninterpretable reported effect size.

**Synthesis.** Youths with ADHD show a lower basal cortisol profile than typically developing peers, and the difference is localised rather than global: present at waking and through the morning, absent in the afternoon, small or absent at noon and bedtime. Two lines converge on that time-of-day structure and agree on direction. The magnitude is not established — the pooled morning effect falls roughly three-fold to a small effect when two atypical studies are removed, and the awakening-specific subanalysis is small (g = 0.27) even before that adjustment. **Design composition:** entirely cross-sectional case-control; no interventional, longitudinal or causal evidence; the only experimental evidence touching this PM sits in connected evidence, in non-target populations. Nothing links the cortisol difference to symptom severity or function; Isaksson tested that association directly and did not find it. The honest conclusion is a reasonably consistent directional finding of uncertain and probably modest magnitude describing a lower morning segment of the diurnal curve in ADHD. The therapeutic significance and desirable direction of modulation are not established.

**Limitations.** Evidence dependency dominates: three references are one meta-analytic body plus two of its own included studies, so consistency cannot be counted from the reference list. Heterogeneity is extreme (I² 95–96%) and only partly explained. Magnitude is unstable and pooled estimates are reported without CIs in the text. The finding is age-dependent in the largest cohort and Chang's sensitivity analysis implicates younger samples as influential, so generalisation across childhood is unsafe. Measurement is a genuine constraint: immunoassays capture inactive 5α-reduced metabolites, and the naturalistic single-day waking samples carrying the finding depend on unverified adherence. **No study in the primary corpus measured phase, amplitude or rhythmicity directly** — all measured levels at time points; the only study that measured the rhythm as such is Scheer 2009, in connected evidence, in healthy adults. This Finding is about tonic diurnal output and does not license any statement about how the system responds to a stressor.

**Synthesised Evidence Confidence.** NOT YET SCORED.

#### SF2 (as revised by the Kamradt addendum)

**Scientific Finding.** A difference in acute stress-reactive cortisol between children with ADHD and typically developing children has not been demonstrated.

**Evidence Considered.**
- Kamradt et al. (2018) — meta-analysis of 12 case-control studies (N = 1041, children and adults): no overall association (*r* = 0.00, 95% CI −0.36 to 0.36), directions split six negative / six positive, I² = 98%; publication-bias adjustment shifts the estimate to moderate blunting (−0.24, 95% CI −0.49 to 0.00).
- Lane et al. (2010) — *nested within Kamradt 2018* (*r* = −0.07, N = 54): no significant cortisol difference at baseline or after a sensory challenge in 84 children; the only significant group difference was electrodermal recovery, higher in ADHD with sensory over-responsivity.
- Chang et al. (2021) — explicit non-answer, retained for audit: the authors state they did not account for the cortisol awakening response and cannot draw conclusions about stress reactivity in ADHD, and cite Kamradt 2018 as the relevant synthesis.

**Synthesis.** No difference in acute stress-reactive cortisol between children with ADHD and typically developing children has been demonstrated, and the strongest available synthesis quantifies that absence rather than merely reporting it. But the pooled null is uninformative rather than reassuring: its confidence interval spans large blunting to large elevation on the reviewers' own thresholds, so nothing has been excluded, and 98% of between-study variance is unexplained. Study-level directions divide evenly, with all four adult samples showing higher reactivity and most child samples showing blunting — a pattern that could not be tested as a moderator and which suggests the null may partly reflect cancellation across developmentally distinct populations. Adjusting for the five studies estimated missing from the blunted side moves the estimate to moderate blunting that just touches zero, so even the direction is not stable. **Design composition:** entirely cross-sectional case-control; no interventional or longitudinal evidence; stressor paradigms unstandardised across the pool. Lane 2010 adds no independent weight, being one of the twelve; Chang 2021 adds none by its authors' own statement. On present evidence PM4 → PH015 cannot be supported through stress-reactive cortisol. The reviewers' own reading is that cortisol reactivity may be the wrong biomarker for this construct, and they recommend autonomic indices instead — coinciding with the one positive result in the entire SF2 corpus, Lane 2010's electrodermal recovery finding, which is autonomic rather than HPA biology and belongs to a different mechanism within BRS6.

**Limitations.** Lane 2010 sits inside Kamradt 2018, so this Finding rests on one synthesis plus one of its own inputs plus a reference that declines to answer. The pooled estimate is precision-limited to the point of being uninformative about magnitude, with 98% unexplained heterogeneity and no moderator analysis possible. Population match is imperfect: roughly a quarter of pooled participants are adults whose effects run opposite in direction, and no child-specific pooled estimate exists. The null is not robust to the single publication-bias adjustment performed. The exposure is heterogeneous in a way that matters — sensory challenge, dental examination and social-threat paradigms are not equivalent stressors, and sampling windows were not standardised, so "reactivity" is not a single measured quantity. The pool is shaped by reporting quality: 16 of 28 eligible studies were excluded solely for lacking computable statistics and some retained effects were visually approximated from figures. The search closed February 2016 and has not been updated. Six of Kamradt's twelve studies also appear in Chang 2021's pool, so SF1 and SF2 draw on overlapping participants.

**Synthesised Evidence Confidence.** NOT YET SCORED.

**Open item carried forward.** The SF2 Finding statement was originally scoped to "the evidence currently attached to this relationship." Kamradt 2018 is not attached to the relationship and is not in the BRAIN corpus. Whether a Finding is stated against the attached corpus or against the best available evidence requires a governance decision.

---

## PART 2 — FINAL GOVERNANCE DECISIONS

### 2.1 Accepted

1. **The PM→Phenome relationship is too coarse to be the unit of evidence synthesis.** BRS6-FM2-PM4 → PH015 contained at least two scientifically distinct Findings which cannot legitimately be represented as one synthesis.
2. **Scientific Finding is the principal unit around which evidence is assessed and synthesised.**
3. **There is no separate "Synthesised Evidence" object.** A Scientific Finding owns its evidence body: Evidence Considered, Connected / Supportive Evidence where applicable, Synthesis, Synthesis Limitations, and Synthesised Evidence Confidence. "Synthesised evidence" remains a useful descriptive phrase for the process or the body, not a canonical object.
4. **The PM is the biological home of the Finding.** A Finding does not have to terminate in a Phenome Relationship. The Finding ↔ Phenome Relationship connection is potentially many-to-many and optional. The architecture must not be modelled as PM → Finding → Phenome with Phenome as a mandatory terminal destination. Demonstrated directly by the Scheer/Schmidt timing Finding, which belongs to PM4 biology and does not thereby become PH015 evidence.
5. **Biological Objective remains inherited from PM mission / biological context.** No separate object.
6. **Scientific Question remains an analytical method, not a persistent object.** It names the proposition under test before evidence is assessed; it does not authorise search-first Finding discovery. Pilot 1 used it to split SF1/SF2; the resulting proposition and its scope are preserved by the Finding.
7. **A Scientific Finding must contain sufficient scope to state exactly what has been demonstrated and to distinguish it from biologically different Findings.** Scope may include population, timing, measurement context, biological compartment, stimulus, intervention/exposure, outcome or other material context. No universal timing, measurement or compartment fields are created; cortisol biology must not produce cortisol-specific architecture.
8. **The compact eight-element Individual Study Assessment is retained:** Study, Population, Result, Effect / Magnitude, Evidence Summary, Limitations, Evidence Source, Reference. Not to be expanded into comprehensive study extraction without demonstrated need.
9. **Population is mandatory at study-assessment level.** Where the assessed study is itself a synthesis, Population must describe the material composition of the pooled population rather than reproduce a headline label. At Finding level, population must be explicit where it materially changes the proposition. No rigid duplication at every level.
10. **Result must preserve direction, nulls, mixed findings and inconsistent findings.** "Lower morning cortisol" must not become "altered cortisol."
11. **Effect / Magnitude is retained separately from Result,** preserving where available and material: effect estimate, metric, sign convention where needed for interpretation, uncertainty, material heterogeneity for pooled estimates, material sensitivity/robustness analyses, and publication-bias adjustment where relevant. It permits states equivalent to *reported and interpretable*, *not reported*, and *reported but not interpretable*.
12. **Evidence Source is the single minimal provenance concept** (Full text / Abstract / Secondary source — named intermediary), with short qualification where materially necessary. No provenance subsystem; no reviewer, review date, extraction workflow, verification state or audit history in the canonical scientific model.
13. **Connected / Supportive Evidence is load-bearing and remains in the model.** Each item preserves why it is relevant and why it is excluded from the primary synthesis. It prevents relevant contextual evidence disappearing and prevents adjacent evidence inflating the evidence base, and it is the correct place to expose tensions such as SF1 versus Schmidt.
14. **Evidence dependency is relational and cross-cutting, not Boolean.** Any material non-independence between evidence contributions must be identified, located and explained — what overlaps, with what, how, and why it matters to the interpretation. No separate permanent boxes for within-Finding and cross-Finding dependency yet.
15. **Synthesis must state material study-design composition and important design gaps** — for example entirely cross-sectional, no interventional evidence, experimental evidence only in non-target populations, no longitudinal or causal design — where such absences materially constrain interpretation.
16. **Synthesised Evidence Confidence belongs conceptually to the Scientific Finding and its evidence body,** not to the PM→Phenome row.
17. **The three confidence concepts remain separate** — Phenome Construct Confidence, Biology → Phenome Relationship Confidence, Synthesised Evidence Confidence.

### 2.2 Accepted as conditional scientific obligation

**Finding Discriminator.** Where sibling Scientific Findings exist on the same PM or the same PM→Phenome relationship, each must explicitly state what distinguishes it from its nearest sibling. Example: SF1 is tonic/basal diurnal cortisol with no acute stressor; SF2 is phasic pre/post cortisol response to an acute stressor. This is a conditional scientific obligation. It is **not** assumed to require a literal database field; further pilots must test whether structural representation is needed or validated content rules suffice.

### 2.3 Rejected

**Directional Desirability.** Not created. Pilot 1 demonstrated that such a field could itself manufacture an invalid therapeutic inference: ADHD is associated with lower morning cortisol, and a healthy-population intervention lowers waking cortisol, but neither establishes that lower is beneficial, that higher is beneficial, or that reversing a case-control difference is therapeutic. A case-control biomarker difference may be causal, compensatory, downstream, epiphenomenal, subgroup-dependent or context-dependent. Result records observed direction; Synthesis and Limitations record whether therapeutic significance or desirable direction has actually been established.

### 2.4 Hard methodological prohibitions

- **Reference count must not be used as a proxy for evidence strength, replication or confidence.** A meta-analysis plus two of its included primary studies is not three independent replications. A synthesis plus one nested study plus a non-answer is not three independent lines of evidence. Evidence independence must be resolved before apparent consistency or replication is interpreted.
- Do not force heterogeneous effect measures onto a common scale.
- Do not manufacture missing effect sizes during routine assessment.
- Do not equate statistical significance with importance, or magnitude with biological or clinical importance.
- Do not silently upgrade a measured level difference at a time point into altered phase, amplitude, rhythmicity or dynamic regulation. No universal "dynamic property" field is created; the general rule — state exactly what was demonstrated — governs.
- Do not average, take the strongest, take the weakest, weight, or map to legacy values any set of per-Finding Synthesised Evidence Confidences.
- Normal regulatory function is not necessarily the inverse of an observational case-control difference.

### 2.5 Corrections to earlier Pilot 1 conclusions

**Phenome Construct Confidence.** Pilot 1 did **not** validate Phenome Construct Confidence as a score. It demonstrated that the PH015 *construct definition* was scientifically load-bearing, because the phasic definition is what exposed the SF1/SF2 mismatch. That is not the same thing. Recorded accurately: Pilot 1 directly demonstrated the distinction between Biology → Phenome Relationship Confidence and Synthesised Evidence Confidence; it did not test whether Phenome Construct Confidence is a useful confidence score. The three concepts remain separate, but Pilot 1 is not cited as validation for the first.

### 2.6 Unresolved and unchanged

- **Row-level Evidence Level** (`observational`). Pilot 1 indicates a single rolled-up label is probably redundant and potentially misleading — it was applied to a row whose evidence includes a meta-analysis, a laboratory challenge study and, at PM level, a randomised trial and a forced-desynchrony experiment. Retirement is **not** authorised. Do not delete, migrate, reinterpret or redesign. Further pilots must determine whether it retains any useful role once study-level design is represented properly.
- **Row-level Evidence Confidence** (`low-medium`). A relationship drawing on multiple Findings may eventually draw on multiple Synthesised Evidence Confidence values, and Pilot 1 provides no justified rule for collapsing these. The field remains **legacy and unresolved**. Do not map or rescore.
- **Relationship type** (`modulates`). May conceal whether the evidence is causal, associative, mechanistic, enabling or interpretive. Pilot 1 exposed the issue but did not establish a replacement taxonomy. Unchanged and unresolved.
- **Finding → Phenome relevance / directness.** A scientifically sound Finding may directly measure the phenome construct or may be biologically adjacent/enabling evidence. SF1 → PH015 is the Pilot 1 example. No field is created. Carried into further pilots, which should test whether the problem appears in forms other than a cortisol/timescale mismatch. *Additional note from the architecture review:* the distance problem occurred at two joins in Pilot 1 — study-to-Finding (Scheer and Schmidt relative to SF1) as well as Finding-to-phenome (SF1 relative to PH015) — so both joins should be observed.
- **Evidence dependency representation.** Relational and cross-cutting; exact graph representation unresolved.

---

## PART 3 — PREFERRED CONCEPTUAL MODEL

This is a conceptual model, not a database schema. No implementation structure is implied.

```
PM — BIOLOGICAL CONTEXT
│   Represents: biological home, mission, inherited biological objective.
│   Why: Findings need a biological home; the objective restates the
│   mission and needs no object of its own.
│   Status: MANDATORY (inherited, not instantiated)
│
├── SCIENTIFIC FINDING            [the unit of synthesis; owns its evidence body]
│      │
│      ├── Finding Statement
│      │      Represents: the proposition, with scope sufficient to state
│      │      exactly what was demonstrated and to separate it from
│      │      biologically different Findings.
│      │      Status: MANDATORY
│      │
│      ├── Finding Discriminator
│      │      Represents: what separates this Finding from its nearest sibling.
│      │      Why: prose scope discipline already failed in production.
│      │      Status: CONDITIONAL — where sibling Findings require differentiation
│      │
│      ├── Synthesised Evidence Confidence
│      │      Conceptually: belongs to this Finding and its evidence body.
│      │      Presentation: shown prominently near the top for readers.
│      │      Status: UNRESOLVED — NOT YET SCORED
│      │
│      ├── Synthesis
│      │      Represents: what can be concluded across the evidence, including
│      │      material study-design composition and design gaps, and whether
│      │      therapeutic significance or desirable direction is established.
│      │      Status: MANDATORY
│      │
│      ├── Synthesis Limitations
│      │      Represents: how far the evidence can be taken together.
│      │      Status: MANDATORY
│      │
│      ├── Evidence Considered
│      │      │   Status: MANDATORY
│      │      └── Individual Study Assessment
│      │             ├── Study (includes design)                    MANDATORY
│      │             ├── Population (composition, if a synthesis)   MANDATORY
│      │             ├── Result (direction / null / mixed preserved) MANDATORY
│      │             ├── Effect / Magnitude                         MANDATORY
│      │             │     estimate + metric + sign convention
│      │             │     uncertainty (incl. heterogeneity if pooled)
│      │             │     sensitivity / robustness (incl. bias adjustment)
│      │             │     states: interpretable | not reported |
│      │             │             reported but not interpretable
│      │             ├── Evidence Summary (for THIS Finding)        MANDATORY
│      │             ├── Limitations (material to THIS inference)   MANDATORY
│      │             ├── Evidence Source (names intermediary if
│      │             │                    secondary)                MANDATORY
│      │             └── Reference                                  MANDATORY
│      │
│      └── Connected / Supportive Evidence
│             Represents: evidence relevant to the Finding or PM that must not
│             contribute to the primary synthesis.
│             Preserves: why relevant; why excluded.
│             Status: CONDITIONAL — required whenever such evidence exists
│
├── SCIENTIFIC FINDING
│      ...
│
└── SCIENTIFIC FINDING
       ...


CARDINALITY

A Scientific Finding may support 0..n PM ↔ PHENOME RELATIONSHIPS.
A PM ↔ PHENOME RELATIONSHIP may draw on 1..n SCIENTIFIC FINDINGS.
Phenome Relationships CONSUME relevant Findings; they do not define them.


PHENOME RELATIONSHIP (existing object, unchanged)
   ├── Biology → Phenome Confidence      LEGACY — unchanged
   ├── Evidence Confidence (row level)   LEGACY — UNRESOLVED, do not map
   ├── Evidence Level (row level)        LEGACY — UNRESOLVED, do not retire
   ├── Relationship type                 UNRESOLVED
   └── Finding → Phenome relevance       OPEN QUESTION — further pilots


EVIDENCE DEPENDENCY
   Cross-cutting and relational across the whole evidence graph.
   Must identify, locate and explain any material non-independence.
   Exact representation: UNRESOLVED.
```

---

## PART 4 — MODEL VERSUS PRESENTATION

Database or object structure must not be inferred from presentation order. The two orders are intentionally different.

**Internal scientific process (methodological order):**

```
STUDIES → FINDING-SPECIFIC ASSESSMENT → SYNTHESIS → LIMITATIONS → CONFIDENCE
```

Synthesised Evidence Confidence is determined only after evidence assessment, synthesis and limitations. Displaying it near the top does not mean it is calculated first.

**Reader-facing progressive disclosure (provisional, illustrative only):**

```
SCIENTIFIC FINDING

[■■■□]  MODERATE
SYNTHESISED EVIDENCE CONFIDENCE

SYNTHESIS

LIMITATIONS

EVIDENCE CONSIDERED
   ▸ Study A
   ▸ Study B
   ▸ Study C

CONNECTED / SUPPORTIVE EVIDENCE
   where applicable
```

The reader should be able to see quickly: what is the Finding; how confident are we; what does the evidence collectively say; what limits that conclusion; which studies support it.

The confidence indicator remains the already-approved component with the public scale VERY LOW / LOW / MODERATE / HIGH. The indicator receives an already-determined state and must never infer the confidence level itself. The example above is illustrative; Pilot 1 is not scored.

Evidence Considered appearing lower in the reader-facing order does not reduce its methodological priority.

---

## PART 5 — WHAT PILOT 1 DOES NOT ESTABLISH

Pilot 1 assessment depth — exhaustive Individual Study Assessments, multi-study
syntheses, and dependency tracing — was appropriate to **architecture
stress-testing**, not the default depth required for every Scientific Finding or
every study in Evidence Considered on a production PM.

- Final database or schema structure
- Synthesised Evidence Confidence scoring methodology, weights or aggregation
- Finding → Phenome directness taxonomy
- Replacement relationship types
- Retirement of legacy Evidence Level
- Retirement or mapping of legacy Evidence Confidence
- Universal timing or measurement fields
- Directional Desirability
- Dependency schema or graph representation
- Whether the study-assessment elements are sufficient for randomised controlled trials — every study assessed in Pilot 1 was cross-sectional
- Whether they are sufficient for preclinical or non-comparative evidence
- Whether the model generalises to dynamic biological outcomes rather than levels at time points

---

## PART 6 — STANDING RECOMMENDATION FOR THE NEXT PILOT

Not authorised to begin. Recorded so the reasoning is not lost.

The recommended next bounded test is **BRS6-FM3-PM6 → PH015** (Sympathetic Activation & Parasympathetic Recovery; legacy Biology→Phenome `low-medium`, Evidence `low-medium`, `observational`; attached references Lane et al. 2010 and Chang et al. 2020). It shares both references with PM4, so it directly tests whether one study can legitimately support two different PM→PH015 rows, or whether reference reuse across PMs is a further form of dependency. It holds the phenome constant while varying the PM, complementing Pilot 1. And Pilot 1 already established that Lane 2010's only significant result was electrodermal recovery — PM6's biology, not PM4's — so the test can use a fully characterised study to check whether a reference has been attached to the wrong mechanism.

A test including interventional evidence remains necessary, because the model is currently untested against randomised trial evidence, but cross-PM reference reuse is the more immediate structural risk exposed by Pilot 1.

---

## PART 7 — PILOT 1 CLOSURE STATEMENT

Pilot 1's purpose was not to prove a finished architecture. It was to expose where the existing architecture loses scientific meaning and determine the minimum structure needed to preserve it.

The accepted result:

- PM provides biological context.
- Scientific Finding is the unit of synthesis.
- The Finding owns its evidence body.
- There is no separate Synthesised Evidence object.
- Connected / Supportive Evidence remains visible but outside the primary synthesis.
- Evidence dependency is relational and cross-cutting.
- Phenome Relationships consume relevant Findings rather than defining them.
- Synthesised Evidence Confidence belongs to the Finding and its evidence body, but is presented prominently near the top for readers.
- Legacy row-level Evidence Level and Evidence Confidence remain unresolved and unchanged while further pilots test the new architecture.

Pilot 1 is **accepted and conceptually closed**.
