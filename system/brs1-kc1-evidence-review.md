# BRS1(KC1) KC-page evidence review

**Contract:** `system/kc-page-evidence-review-contract.md`  
**Page:** `docs/biological-targets/brs1/kc/brs1-kc1-amino-acid-quality-and-competitive-balance.mdx`  
**Corpus (existing page citations only):** Fernstrom 2013
(`fernstrom_lnna_2013`); FAO 2013 (`fao_diaas_2013`); Mariotti and
Gardner 2019 (`mariotti_dietary_2019`).  
**PM evidence:** not opened or modified. PM ↔ iKC applicability remains an
independent Stage 2B decision.

## Bounded review sequence

The existing title, ambition, default iKC, §2 constituents, food examples,
Evidence Base claims, Emerging Biological Supports copy and FM/PM connections
were treated as candidate propositions. The review applied:

1. page-level shared-constraint coherence;
2. default-iKC definition;
3. strict constituent membership and five-atom adjudication;
4. public Evidence Base Summary verification;
5. §4 support assessment;
6. proposed-scope assessment; and
7. the final coherence test.

The page retains one default iKC whose `ikc_id` equals `BRS1(KC1)`. No explicit
`individual_key_constraints` declaration was added.

## Page coherence

**Candidate constraint:** general indispensable-amino-acid quality plus
tryptophan and phenylalanine/tyrosine supply plus meal-level LNAA competition,
shared across the listed monoaminergic and GABA/glutamate mechanisms.

**Adjudication:** **supported after narrowing** to monoamine-precursor LNAA
availability within a competitive transport pool.

Fernstrom reviews how dietary patterns and plasma ratios of tryptophan,
tyrosine, phenylalanine and other LNAAs influence shared transport into the
brain and downstream neurotransmitter-precursor neurochemistry. This supports
one transport-linked resource/bottleneck involving the three named monoamine
precursors.

FAO establishes DIAAS as a method for evaluating dietary protein quality.
Mariotti and Gardner review protein and amino-acid adequacy in vegetarian
diets, concluding that adequacy is generally achievable and that amino-acid
deficiency concerns have often been overstated. Neither source establishes
“complete indispensable amino-acid supply” as the same BRS1 constraint as
monoamine-precursor LNAA competition or as a shared constraint across the
listed BRS1 mechanisms.

The reader-facing heading and ambition were narrowed to the surviving
transport-linked precursor pool. The historical title remains in route
metadata and is recorded in a local `ikc-scope-conflict` flag rather than being
treated as established.

## Default iKC definition

The default `BRS1(KC1)` iKC is the availability of tryptophan, tyrosine and
phenylalanine within the shared competitive LNAA transport context.

- **What is constrained:** brain presentation of monoamine precursors relative
  to other LNAAs competing for LAT1-mediated transport.
- **Resource:** the circulating monoamine-precursor LNAA pool and its relative
  composition, not total protein mass or an inventory of every amino acid.
- **Why it is a constraint:** dietary patterns can alter plasma LNAA ratios,
  and shared transport competition can alter precursor entry and downstream
  neurochemistry.
- **Claim ceiling:** adequate dietary provision and transport-level constraint
  prevention. The corpus does not define a universal optimal meal ratio,
  establish ordinary intake as limiting in every population, or show that
  additional precursor intake improves monoamine function or clinical
  outcomes.

## Constituent adjudication

### Tryptophan — admitted

- **Input Type:** `substrate`
- **Biological Role:** essential LNAA whose availability relative to competing
  LNAAs influences brain entry and serotonin-precursor supply.
- **Evidence Source:** `fernstrom_lnna_2013`
- **Limitation:** no universal limiting intake or optimal ratio; no established
  downstream functional or clinical benefit from additional intake.
- **Constraint Status:** `nutritionally-constrained`
- **Claim Ceiling:** `dietary-provision`

### Tyrosine — admitted

- **Input Type:** `precursor`
- **Biological Role:** catecholamine precursor whose availability relative to
  competing LNAAs influences brain entry and precursor supply.
- **Evidence Source:** `fernstrom_lnna_2013`
- **Limitation:** no universal dietary limitation or optimal ratio; precursor
  presentation does not establish catecholamine or functional benefit from
  additional intake.
- **Constraint Status:** `nutritionally-constrained`
- **Claim Ceiling:** `dietary-provision`

### Phenylalanine — admitted

- **Input Type:** `precursor`
- **Biological Role:** essential LNAA that contributes to tyrosine availability
  and participates in the shared competitive transport context.
- **Evidence Source:** `fernstrom_lnna_2013`
- **Limitation:** biochemical and transport participation do not establish a
  universal dietary limitation, optimal ratio or benefit from increasing
  intake.
- **Constraint Status:** `nutritionally-constrained`
- **Claim Ceiling:** `dietary-provision`

### Complete indispensable amino-acid supply — excluded from iKC membership

- **Input Type:** `substrate provision`
- **Biological Role:** broad protein-quality and adequacy construct proposed as
  the foundational context for the amino-acid pool.
- **Evidence Source:** `fao_diaas_2013`; `mariotti_dietary_2019`
- **Limitation:** the sources support protein-quality assessment and dietary
  adequacy, but do not establish this construct as the named shared BRS1
  transport constraint or as a constraint across the listed mechanisms.
- **Constraint Status:** `dietary-input`
- **Claim Ceiling:** `dietary-provision`
- **Decision:** explicit non-member. Nutritional importance is not denied; the
  proposition belongs at the broader dietary-guidance or independently
  supported PM layer.

## Food examples

All food arrows were removed from §2. The existing corpus did not independently
adjudicate Food → Input composition at the displayed granularity, and food
examples cannot establish iKC membership.

## Public Evidence Base Summary verification

The revised Summary was compared claim by claim with the narrowed KC
definition, all four constituent records and their claim ceilings.

- It opens with one 76-word explanatory paragraph.
- It is followed by exactly three distinct bullets: constraint/membership
  boundary; evidence/measurement boundary; and biological relevance/provision
  limitation.
- The paragraph identifies the coherent shared resource, the three admitted
  precursors and the competitive-transport relationship.
- Each substantive claim has a nearby citation to one of the three existing
  bibliography records.
- Citation anchors resolve to the intended entries in
  `static/bibtex/BRAIN-diet.bib`.
- No Summary claim exceeds `dietary-provision`; no optimal-ratio, treatment or
  clinical-benefit claim is made.
- Internal review status and PM Stage 2B decisions are absent from the Summary.

No unresolved Summary proposition required external retrieval.

Each admitted resource now has its own `kc_input_traceability` atom,
`kc_constituent_presentations` projection and title-attached accessible
disclosure. Pointer hover or keyboard focus exposes the five fields at the
title. Activating either the title or adjacent chevron toggles the same full
evidence panel.

## Emerging Biological Supports

No candidate was supported by the page’s three-source corpus at the §4
threshold. The speculative taurine, creatine and amino-acid-derivative paragraph
was removed. Section 4 now explicitly states that no Emerging Biological
Supports are prioritised, so no `kc_emerging_support_traceability` or
presentation records are warranted.

## Proposed FM/PM scope

All existing links were preserved as proposed scope; none was promoted to a
confirmed PM ↔ iKC relationship.

### Carried forward without a page-level impossibility finding

- BRS1(FM1) Monoaminergic Function
- PM1 Amino-Acid Availability & Prioritisation
- PM2 LAT1 Competitive Transport Modulation
- PM4 Noradrenergic Signalling

Fernstrom provides a biologically coherent basis for carrying the
monoaminergic supply/transport scope forward. This KC review does not establish
each individual PM edge.

### Carried forward but flagged as materially unsupported by this corpus

- BRS1(FM4) GABA–Glutamate Regulation
- PM8 GABA–Glutamate Neurotransmission Balance
- PM9 GABA Synthesis Capacity
- PM10 Glutamate Clearance and Recycling
- PM11 Excitotoxicity Modulation

The three-source KC corpus does not establish that the reviewed
tryptophan/tyrosine/phenylalanine competitive pool constrains these
GABA/glutamate mechanisms. The links are not proven impossible, so they remain
proposed scope, but a local pending `ikc-scope-conflict` flag records the need
for later independent applicability assessment.

## KC change-control flags

Recorded only on the KC page; no shared queue was modified.

1. `KC-CC-BRS1-KC1-01` — `constituent-challenge`,
   `resolved-by-kc-review`: complete indispensable-amino-acid supply excluded
   from the iKC.
2. `KC-CC-BRS1-KC1-02` — `ikc-scope-conflict`,
   `pending-kc-review`: historical title/grouping combines general protein
   quality with the narrower LNAA competitive pool.
3. `KC-CC-BRS1-KC1-03` — `ikc-scope-conflict`,
   `pending-kc-review`: FM4/PM8–PM11 scope is not established by the KC corpus.

## Retrieval and stopping rationale

Review was deliberately bounded to the three sources already cited on the KC
page, as requested. Their bibliography metadata and abstracts were sufficient
to distinguish:

1. dietary protein-quality/adequacy evidence;
2. monoamine-precursor LNAA transport and neurochemistry evidence; and
3. claims not established by either evidence class.

No PM page or PM evidence was opened. No external source was added. The review
stopped when page coherence, every existing §2 constituent proposition, §4
status, proposed scope and the public Summary were adjudicated.

## Final coherence test

- **One coherent constraint:** yes, after narrowing to monoamine-precursor LNAA
  availability and competitive transport.
- **Constituent membership earned:** yes for tryptophan, tyrosine and
  phenylalanine; no for general indispensable-amino-acid adequacy.
- **Claim ceilings explicit:** yes; dietary provision and constraint
  prevention only.
- **Proposed FM/PM scope preserved:** yes, with unresolved FM4 scope flagged.
- **Title/ambition aligned:** reader-facing heading and ambition align with the
  surviving science; historical title remains locally flagged.

