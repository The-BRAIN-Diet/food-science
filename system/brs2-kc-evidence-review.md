# BRS2 Key Constraint Evidence Review

**Contract:** `system/kc-page-evidence-review-contract.md`  
**Schema:** `system/key-constraint-schema.md`  
**Pages:** BRS2(KC1) and BRS2(KC2)  
**PM evidence:** not modified. PM ↔ iKC applicability remains a later,
independent Stage 2B decision.

## Review sequence

Each existing title, ambition, default iKC, constituent, food example,
evidence statement and FM/PM connection was treated as a candidate proposition.
The review applied:

1. page-level shared-constraint coherence;
2. default-iKC definition;
3. strict five-atom constituent membership;
4. evidence-supported public Evidence Base Summary;
5. evidence-supported proposed scope; and
6. the final coherence test.

Both pages retain one default iKC whose `ikc_id` equals its `kc_id`. No
additional iKC identifiers were required.

---

## BRS2(KC1) — Methyl Donor Pool

### Page coherence

**Candidate constraint:** folate, vitamin B12, choline and betaine as one shared
methyl-donor pool.

**Adjudication:** **supported after narrowing** to folate- and betaine-linked
methyl-group input into homocysteine remethylation and the methionine/SAM
resource. Folate carries one-carbon units; betaine donates a methyl group
through BHMT; choline is an upstream betaine precursor. These routes converge on
methionine regeneration and SAM availability.

Vitamin B12 is necessary for methionine synthase but acts as a catalytic
cofactor rather than a net methyl-group input. It therefore does not qualify as
a constituent of this iKC.

The title remains coherent after this boundary is made explicit in the
functional descriptor, ambition and Evidence Base.

### iKC definition

The default `BRS2(KC1)` iKC constrains availability of folate- and
betaine-linked methyl-group input that replenishes methionine for SAM-dependent
biology.

It is a constraint rather than a pathway inventory because inadequacy of donor
input can impair remethylation and methyl balance across multiple connected
mechanisms. It does not absorb every cofactor used by those reactions.

### Constituent decisions

#### Folate — admitted

- **Input type:** nutrient/substance
- **Role:** provides 5-methyltetrahydrofolate, the methyl donor used by
  methionine synthase.
- **Evidence:** Ducker and Rabinowitz (2017); Obeid (2013).
- **Status:** `nutritionally-constrained`
- **Ceiling:** `dietary-provision`
- **Limitation:** tissue and downstream methylation responses vary; adequacy is
  not evidence that additional intake improves function.

#### Choline — admitted, narrowed

- **Input type:** precursor
- **Role:** can be irreversibly oxidised to betaine, supplying the BHMT donor
  route.
- **Evidence:** Zeisel (2006); Obeid (2013).
- **Status:** `nutritionally-constrained`
- **Ceiling:** `dietary-provision`
- **Limitation:** requirement varies by sex, life stage and genotype; membrane
  and acetylcholine roles are outside this iKC.

#### Betaine — admitted

- **Input type:** substrate
- **Role:** methyl-donor substrate for BHMT-mediated remethylation.
- **Evidence:** Obeid (2013); Olthof et al. (2003).
- **Status:** `nutritionally-constrained`
- **Ceiling:** `modulation-demonstrated`
- **Limitation:** human supplementation lowers plasma homocysteine, but does not
  establish a universal dietary requirement, whole-body response or benefit in
  donor-replete people.

#### Vitamin B12 — excluded from iKC membership

- **Input type:** cofactor
- **Role:** enables methionine-synthase methyl transfer.
- **Evidence:** Froese et al. (2019).
- **Status:** `biochemical-requirement`
- **Ceiling:** `biological-dependency`
- **Reason:** catalytic necessity does not make B12 a constituent of the
  methyl-group donor pool. It remains eligible for PM-specific treatment.

### Public Evidence Base Summary

The Summary was reassessed claim by claim against the reviewed KC definition,
all four constituent decisions and their claim ceilings. It now opens with one
concise public-facing paragraph explaining the folate, choline and betaine
donor-resource network, followed by exactly three non-duplicative bullets:

1. the constraint and membership boundary, including B12's catalytic-cofactor
   role and the non-donor roles of choline;
2. the evidence and measurement boundary; and
3. biological relevance separated from benefit claims for additional intake.

Every substantive Summary claim now has a nearby link to the supporting KC
bibliography record. Internal adjudication and workflow terms were removed from
the public copy; those decisions remain in this report and the structured KC
records. No unresolved Summary claim required additional retrieval.

The Folate, Choline and Betaine (TMG) resource dropdown titles now project
their existing five-field constituent atoms directly. Pointer hover or keyboard
focus exposes the atom at the title; activating either the title or adjacent
chevron toggles the full resource evidence panel. `evidence_label: Betaine
(TMG)` preserves the reader-facing title while resolving the canonical Betaine
atom, without duplicating scientific fields.

### Proposed scope

Existing FM1, FM3, PM1, PM2, PM3, PM4 and PM7 connections are carried forward
as **proposed scope**. The reviewed donor network is biologically relevant to
those mechanisms, but this review does not establish each PM ↔ iKC edge.

No proposed connection was scientifically impossible under the narrowed
definition, so no KC scope flag was required.

### Retrieval and stopping rationale

The inherited corpus did not adequately establish constituent membership.
Question-bounded retrieval asked:

1. whether folate and betaine constitute donor input into the methionine/SAM
   pool;
2. whether choline is a meaningful donor precursor;
3. whether B12 is donor-pool material or a catalytic cofactor; and
4. what claim ceiling human betaine evidence supports.

Retrieval added Ducker and Rabinowitz (2017), Obeid (2013), Zeisel (2006) and
Froese et al. (2019), while retaining Olthof et al. (2003). It stopped when page
coherence, all four memberships and their ceilings were adjudicable.

### Targeted §4 Emerging Biological Supports reassessment

#### Corrected assessment threshold

The former §4 paragraph applied the Core Nutritional Requirements threshold to
emerging supports by asking whether SAMe, creatine or other adjuncts were shared
indispensable dietary requirements. That was the wrong test. This reassessment
instead asked whether an intervention can support methyl-resource availability,
reduce a material methyl demand or improve a related regulatory capacity under
defined conditions. No candidate was added to §2, no iKC membership decision
was reopened and no PM mapping was changed.

Each retained §4 support now has a separate five-field support atom: Input,
Input Type, Biological Role, Evidence Source and Limitation. These records are
stored in `kc_emerging_support_traceability`, projected through
`kc_emerging_support_presentations`, and exposed from each candidate title
through the shared hover/focus evidence disclosure. Activating either the title
or its adjacent chevron toggles the detailed research panel. These records
provide auditable support claims without treating the interventions as iKC
constituents or Core Nutritional Requirements.

#### Creatine supplementation — retained as an emerging demand-reduction support

**Proposed support mechanism:** Endogenous creatine synthesis uses SAM when
guanidinoacetate methyltransferase converts guanidinoacetate to creatine.
Supplemental creatine feeds back on endogenous synthesis, so it could reduce
this SAM-dependent demand. Reduced synthesis is not evidence that the potential
saving is redistributed to another methylation pathway.

**Human intervention evidence:**

- Peters et al. (2015) randomised Bangladeshi adults to placebo (`n=101`),
  creatine 3 g/day (`n=101`), folic acid 400 µg/day (`n=153`) or creatine plus
  folic acid (`n=103`) for 12 weeks. Plasma guanidinoacetate, homocysteine and
  whole-blood SAM and SAH were measured. Guanidinoacetate fell 10.6% with
  creatine while rising 3.7% with placebo (`p=0.0002`), demonstrating pathway
  suppression. Creatine did not significantly lower homocysteine (`p=0.35`) or
  improve SAM or SAH, and did not enhance the folic-acid homocysteine response.
  The arsenic-exposed, often folate-insufficient population and use of blood
  rather than hepatic flux measures limit generalisation.
- Smaller human interventions located during retrieval consistently supported
  guanidinoacetate or synthesis suppression but were inconsistent for
  homocysteine and did not establish improved SAM:SAH balance or redistribution.
  They were not required for the public evidence block because Peters et al.
  directly measured the central biomarker set in the largest relevant trial.

**Animal and biochemical evidence:** Stead et al. (2001) fed rats 0.4% creatine
for two weeks; renal AGAT activity fell to 18% of control and plasma
homocysteine fell 27%. This supports the biochemical demand hypothesis but does
not override the null average human homocysteine, SAM and SAH results. The GAMT
reaction establishes that synthesis consumes a SAM-derived methyl group; it
does not identify the fate of resources when synthesis is suppressed.

**Claim separation:** Reduced endogenous synthesis demand is demonstrated in
humans. Lower whole-body SAM demand is biochemically plausible but was not
directly quantified by human isotope flux. Increased methyl-resource
availability, redistribution into phosphatidylcholine/DNA/other pathways and a
methyl-sparing functional benefit are not demonstrated.

**Decision:** **Retain as an emerging demand-reduction support.** Human evidence
supports suppression of endogenous creatine synthesis. Whether this improves
methyl-resource availability for other pathways or produces a functional benefit
through methyl sparing remains unresolved.

#### SAMe-directed supplementation — prioritised conditionally

**Proposed support mechanism:** Supplemental SAMe directly increases exposure
to the downstream methyl donor. This is pharmacological resource delivery, not
restoration of dietary folate, choline or betaine input and not evidence that
those donor routes were deficient.

**Human intervention evidence:**

- Loehrer et al. (1997) gave one 400 mg oral dose to 14 healthy adults. Plasma
  SAM rose from 38.0 to 361.8 nmol/L and returned toward baseline with a
  1.7-hour half-life; SAH and 5-methyltetrahydrofolate rose transiently, while
  homocysteine and methionine did not change over 24 hours. This demonstrates
  acute systemic availability, not tissue methylation or function.
- Yang et al. (2009) gave 1,000 mg/day enteric-coated oral or intravenous SAMe
  for five days to 20 healthy Chinese adults, ten per route. Oral exposure was
  about 2.1–2.6% of intravenous exposure, with no accumulation or reported
  adverse events. The open-label, short and formulation-specific study shows
  that route and formulation materially constrain exposure.
- Mischoulon et al. (2012) analysed a 35-person biomarker subset from a six-week
  placebo-controlled trial of 800–1,600 mg/day adjunctive oral SAMe in adults
  with major depressive disorder taking a stable serotonin-reuptake inhibitor.
  Plasma SAM and SAH increased, but metabolite changes did not predict clinical
  improvement. Baseline homocysteine differed between groups, and plasma values
  do not establish intracellular methylation potential.
- Gören et al. (2004) titrated 15 healthy adults to 1,600 mg/day for four weeks.
  Serum SAM increased without sustained homocysteine or selected toxic
  methyl-metabolite increases. One participant developed a mixed manic state
  with suicidal ideation that resolved after withdrawal. The study was small,
  unblinded and too short for long-term safety.

**Claim separation:** Increased circulating SAM availability is demonstrated.
SAMe also increases SAH in relevant studies, so improved methylation potential
cannot be inferred from SAM alone. Downstream antidepressant benefit is
condition-specific and was not mediated by the measured metabolite changes.
General tissue methylation or broad functional benefit is not demonstrated.

**Tolerability and contraindication boundary:** Short trials commonly report
gastrointestinal upset, headache, anxiety, agitation or insomnia. Mood
activation makes bipolar disorder or a history of mania a material
contraindication to unsupervised use. Combination with serotonergic medicines
or supplements warrants clinical supervision. Parkinson's disease/levodopa,
pregnancy, lactation, childhood, immunocompromising conditions and long-term use
also require clinical review because interaction or safety evidence is limited
(Sharma et al., 2017).

**Decision:** **Prioritise as a condition-specific, clinically supervised
Emerging Biological Support.** The supported claim is direct systemic SAM
exposure, not restoration of dietary donor input or proven improvement of
general methylation capacity.

#### Riboflavin for MTHFR 677TT — prioritised narrowly

**Proposed support mechanism:** MTHFR uses an FAD cofactor derived from
riboflavin. Riboflavin may support residual enzyme capacity where the MTHFR
C677T TT genotype destabilises this cofactor interaction.

**Human intervention evidence:** Rooney et al. (2020) analysed adults with the
677TT genotype randomised to riboflavin 1.6 mg/day (`n=24`) or placebo (`n=23`)
for 16 weeks. Plasma methionine, SAM, SAH, betaine, choline, cystathionine and
homocysteine were measured. SAM increased by 19.5 ± 20.6 nmol/L and
cystathionine increased; no other measured one-carbon metabolite showed a
significant response. The analysis was small, genotype-selected and derived
from earlier blood-pressure trials; it did not measure tissue methylation or
link the SAM change to a functional outcome.

**Claim separation:** Increased plasma SAM is demonstrated in the 677TT
context. Improved SAM:SAH balance, broad donor-pool restoration, tissue
methylation and function attributable to the SAM increase are not demonstrated.

**Decision:** **Prioritise narrowly for genotype-conditioned assessment.**
Riboflavin qualifies because a human intervention altered the named resource in
a biologically defined bottleneck. It is not a general methyl donor or a
population-wide KC1 supplement recommendation.

#### Specific candidates not carried forward

- **Phosphatidylcholine:** excluded as a distinct emerging support because its
  relevant methyl-cycle effect is provision of choline, already represented in
  §2. A formulation of a core input is not a separate adjunct mechanism.
- **Guanidinoacetate:** excluded because conversion to creatine consumes SAM and
  can increase methyl demand; it acts opposite to the proposed creatine-sparing
  direction.
- **Methionine:** excluded from KC1 §4 because it belongs to the separate
  methionine–cysteine sulfur-amino-acid constraint and supplementation can raise
  homocysteine. This pass did not reopen KC2.
- **Vitamin B12:** excluded from §4 because correction of B12 deficiency
  restores a methionine-synthase cofactor rather than delivering or sparing the
  named donor resource. It remains an established PM-layer biochemical
  requirement, not an emerging donor-pool adjunct.
- **Serine, glycine and cysteine:** excluded because available evidence concerns
  biochemical participation, GNMT regulation or transsulfuration/glutathione
  capacity, not a demonstrated human intervention supporting this named pool.

#### Actual searches

Searches were run on 2026-09-30 using PubMed/PMC-oriented web retrieval:

- `creatine supplementation human trial homocysteine SAM SAH methylation endogenous creatine synthesis`
- `creatine supplementation humans suppress endogenous creatine synthesis AGAT GAMT methyl demand stable isotope`
- `creatine supplementation SAM SAH DNA methylation human intervention`
- `creatine supplementation methylation flux phosphatidylcholine DNA protein SAM SAH`
- `Peters 2015 creatine 3 g day 12 weeks guanidinoacetate SAM SAH homocysteine Bangladesh randomized trial`
- `PubMed SAMe oral randomized trial plasma SAM SAH homocysteine healthy humans dose`
- `PubMed S-adenosylmethionine oral pharmacokinetics healthy volunteers bioavailability dose trial`
- `Mischoulon 2012 SAMe plasma SAM SAH homocysteine randomized 800 1600 mg six weeks`
- `Goren 2004 SAMe 1600 mg 4 weeks homocysteine mixed manic state`
- `SAMe contraindications bipolar mania serotonin syndrome clinical review systematic safety`
- `SAMe Parkinson levodopa methylation homocysteine trial PubMed`
- `PubMed riboflavin supplementation SAM SAH methylation homocysteine MTHFR 677TT randomized trial`
- `PubMed phosphatidylcholine supplementation SAM SAH homocysteine methylation human intervention`
- `PubMed serine supplementation homocysteine methionine cycle SAM human trial`
- `PubMed vitamin B12 supplementation SAM SAH ratio human randomized methylation trial`

#### Remaining gaps and stopping rationale

No controlled human study located directly traced a creatine-related reduction
in methyl demand into another SAM-dependent pathway or demonstrated a functional
benefit mediated by methyl sparing. SAMe studies did not establish
tissue-specific methylation flux, a durable improvement in intracellular
SAM:SAH balance or long-term safety. The riboflavin signal requires replication
outside the small 677TT cohort and linkage to a functional endpoint.

Retrieval stopped when the three specific candidates could be separated into:
(1) demonstrated resource exposure, (2) demonstrated demand reduction,
(3) biomarker alteration and (4) demonstrated functional benefit, and when the
vague adjunct catch-all had been replaced by named inclusion and exclusion
decisions. PM mappings were intentionally left unchanged.

---

## BRS2(KC2) — Methionine–Cysteine Sulfur Amino Acid Pool

### Page coherence

**Candidate constraint:** methionine, serine, glycine and cysteine as one
methionine/transsulfuration substrate pool.

**Adjudication:** **supported only after narrowing** to the shared
methionine–cysteine sulfur-amino-acid requirement. Methionine is dietarily
indispensable and feeds methionine-cycle and transsulfuration biology. Cysteine
can spare part of the methionine requirement and contributes to downstream
sulfur-amino-acid availability.

Serine participates in transsulfuration chemistry but ordinary dietary serine
availability was not shown to constrain this shared pool. Glycine can
conditionally co-limit glutathione synthesis, but that is a GSH-precursor
constraint rather than membership in the methionine–cysteine sulfur pool.

The title and ambition were narrowed to what survived.

### iKC definition

The default `BRS2(KC2)` iKC constrains methionine and cysteine availability
within the nutritionally linked sulfur-amino-acid requirement supporting
methionine conservation and transsulfuration-linked substrate capacity.

It is not an inventory of all substrates appearing in transsulfuration or
glutathione synthesis.

### Constituent decisions

#### Methionine — admitted

- **Input type:** substrate
- **Role:** indispensable sulfur amino acid entering the methionine cycle and
  supplying sulfur to transsulfuration.
- **Evidence:** Ball et al. (2006); Kumar and Yadav (2017).
- **Status:** `nutritionally-constrained`
- **Ceiling:** `dietary-provision`
- **Limitation:** evidence does not show that methionine is commonly limiting in
  protein-sufficient diets, define one universal threshold or support higher
  intake as beneficial.

#### Cysteine — admitted

- **Input type:** substrate
- **Role:** can spare part of the methionine requirement and can constrain
  downstream glutathione synthesis.
- **Evidence:** Ball et al. (2006); Sekhar et al. (2011).
- **Status:** `nutritionally-constrained`
- **Ceiling:** `dietary-provision`
- **Limitation:** methionine sparing is method-dependent; GSH evidence involved
  older adults receiving cysteine with glycine and does not establish isolated
  cysteine as a universal lever.

#### Serine — excluded from iKC membership

- **Input type:** substrate
- **Role:** biochemical cosubstrate with homocysteine in cystathionine
  formation.
- **Evidence:** Kumar and Yadav (2017).
- **Status:** `biochemical-requirement`
- **Ceiling:** `biological-dependency`
- **Reason:** pathway participation does not establish ordinary dietary serine
  availability as a meaningful shared nutritional constraint.

#### Glycine — excluded from iKC membership

- **Input type:** substrate
- **Role:** glutathione substrate that can conditionally co-limit synthesis with
  cysteine.
- **Evidence:** Sekhar et al. (2011).
- **Status:** `nutritionally-constrained`
- **Ceiling:** `dietary-provision`
- **Reason:** the demonstrated constraint is conditional GSH-precursor biology,
  not membership in the shared methionine–cysteine sulfur requirement across
  the proposed BRS2 scope.

### Public Evidence Base Summary

The Summary was rechecked against the narrowed sulfur-amino-acid definition,
all four constituent decisions and the two admitted atoms' claim ceilings. It
now contains one 73-word explanatory paragraph followed by exactly three
distinct, claim-local cited bullets covering:

1. the membership boundary separating serine and glycine from the shared
   methionine–cysteine requirement;
2. the human requirement evidence and its measurement boundary; and
3. biological relevance without implying benefit from higher intake.

The paragraph and bullets use only existing Ball, Kumar and Sekhar sources.
Their citation keys resolve to the intended bibliography records. No unresolved
Summary proposition remains, and internal workflow terms were removed from the
public copy.

Methionine and Cysteine now each have a separate §3 resource disclosure
projected from their existing five-field atom. Pointer hover and keyboard focus
on either title expose that atom; activating the title or adjacent chevron
toggles the same full evidence panel. No duplicate five-field record appears
inside either panel.

### Proposed scope

Existing FM1, FM2, FM3, PM1, PM3, PM4, PM5, PM6 and PM7 connections are carried
forward as **proposed scope**. Their relationship to the narrowed sulfur pool
must be independently tested by each PM's Stage 2B pass.

No connection was proven impossible by this page-level review. No KC scope flag
was therefore required.

### Retrieval and stopping rationale

The inherited pathway and GSH sources did not by themselves establish strict
membership for all four candidates. Question-bounded retrieval asked:

1. whether methionine and cysteine form a nutritionally linked human sulfur
   amino-acid requirement;
2. whether serine availability is a demonstrated shared nutritional
   constraint; and
3. whether conditional glycine limitation in GSH synthesis belongs to this
   sulfur-amino-acid iKC.

Ball, Courtney-Martin and Pencharz (2006) was added for human
methionine–cysteine requirement evidence. Retrieval stopped when the narrowed
shared constraint, both admitted memberships and both exclusions were
adjudicable.

---

## Food relationships

Former food arrows were not used as KC membership evidence. They were removed
from the canonical Core Nutritional Requirements display because this pass did
not independently adjudicate each Food → Input composition relationship.
Their removal does not dispute ordinary food composition; it preserves the
contract's separation between Food → Input and Input → iKC evidence.

## Downstream handoff

Existing PM, FM, SM and hub projections were not rewritten by this KC-owned
pass. Some still carry the former KC2 title or legacy copied constituent lists,
including B12 under KC1 and serine/glycine under KC2. Those displays are not
canonical membership evidence. They must be reconciled through their owning
projection or PM Stage 2B workflow; the KC review does not auto-propagate or
silently modify them.

## Final coherence result

- Both pages now represent one coherent shared constraint.
- Every candidate constituent has a KC-owned five-atom record.
- Only admitted atoms project in §2.
- Every admitted §3 resource has its own title-attached five-field disclosure,
  and both the title and adjacent chevron toggle the evidence panel.
- Excluded biochemical or conditional relationships remain explicit in YAML and
  explanatory copy without projecting as canonical members.
- Existing FM/PM links remain proposed rather than confirmed.
- Neither review modified PM evidence or propagated constituents to PM pages.
- No unresolved title, grouping, membership or proposed-scope conflict required
  a `kc_change_control_flags` entry.

Both pages now carry `kc_evidence_review_status: canonical` and are ready for
subsequent independent PM Stage 2B applicability review.

## Verification

The 19-test KC evidence-governance suite, 20 dietary traceability tests,
bibliography validation and scoped structure checks passed. The
repository-wide mechanism validator passed the KC layer; its remaining failures
are pre-existing FM, PM and SM issues outside this review.

Rendered local verification confirmed that both pages load without errors,
project only admitted §2 constituents, keep excluded atoms out of the public
Core Nutritional Requirements list, render the §3 evidence disclosures and
retain §§4–6. Tested bibliography links resolved to their intended anchors.

Both BRS2 Evidence Bases open with one 65–90-word explanatory Summary paragraph
and exactly three distinct boundary bullets. Their Summary citations resolve to
the intended bibliography anchors, and no internal KC governance terminology
appears in the public copy.
