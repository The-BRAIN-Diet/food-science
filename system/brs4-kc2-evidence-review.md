# BRS4(KC2) KC-page evidence review

**Contract:** `system/kc-page-evidence-review-contract.md`  
**Page:** `docs/biological-targets/brs4/kc/brs4-kc2-mitochondrial-cofactor-sufficiency.mdx`  
**Corpus (existing page only):** Tardy et al. 2020
(`tardy_vitamins_2020`); Pirinen et al. 2020
(`pirinen_niacin_2020`); Crane 2001 (`crane_coq10_2001`); Solis et al.
2014 (`solis_brain_creatine_vegetarians_2014`); Avgerinos et al. 2018
(`avgerinos_creatine_2018`).  
**PM evidence:** not modified. PM ↔ iKC applicability remains an independent
Stage 2B decision.

## Page coherence

**Candidate constraint:** B vitamins, iron and magnesium as a shared
mitochondrial cofactor-sufficiency domain spanning the listed BRS4 mechanisms.

**Adjudication:** **supported at class level with a strict claim ceiling.**
Tardy reviews B vitamins, iron and magnesium as essential participants in
energy-yielding metabolism and relates inadequate status to functional
consequences. The resources are chemically distinct rather than one fungible
pool, but they form one distributed micronutrient-sufficiency bottleneck:
multiple bioenergetic processes require adequate coenzyme, iron-protein and
magnesium-dependent reaction capacity.

Pirinen provides narrower human evidence that correcting systemic and muscle
NAD⁺ deficiency with high-dose niacin in adult-onset mitochondrial myopathy can
restore the measured resource and improve muscle performance. It supports
condition-specific correction, not a general claim for all B vitamins or
nutrient-replete populations.

The page remains one default iKC whose `ikc_id` equals `BRS4(KC2)`.

## iKC definition

- **What is constrained:** availability of dietary micronutrient precursors and
  minerals needed for coenzyme-dependent, iron-dependent and
  magnesium-dependent energy metabolism.
- **Resource:** a distributed cofactor-sufficiency domain, not every molecule
  participating in mitochondria.
- **Why it is a constraint:** inadequate micronutrient status can impair several
  energy-yielding processes even when macronutrient fuel is present.
- **Shared-domain rationale:** the admitted inputs support distinct but
  concurrently required reaction capacities across bioenergetic mechanisms.

## Constituent adjudication

### B vitamins — admitted at class level

- **Input Type:** `nutrient/compound class`
- **Biological Role:** dietary precursors for coenzymes used in substrate
  conversion, redox transfer and energy-yielding metabolism.
- **Evidence Source:** `tardy_vitamins_2020`,
  `pirinen_niacin_2020`
- **Limitation:** Tardy is a narrative class-level synthesis; Pirinen is a
  disease-specific, high-dose niacin study. The evidence does not establish
  uniform limitation, one intake threshold or supplementation benefit for every
  B vitamin in the general population.
- **Status / ceiling:** `nutritionally-constrained`;
  `dietary-provision`.

### Iron — admitted

- **Input Type:** `nutrient/substance`
- **Biological Role:** supports oxygen transport and iron-containing
  electron-transfer proteins required for energy-yielding metabolism.
- **Evidence Source:** `tardy_vitamins_2020`
- **Limitation:** no evidence of common limitation across every connected
  mechanism or benefit from additional iron in iron-replete people.
- **Status / ceiling:** `nutritionally-constrained`;
  `dietary-provision`.

### Magnesium — admitted

- **Input Type:** `nutrient/substance`
- **Biological Role:** required for ATP-associated reactions and enzymes
  participating in energy-yielding metabolism.
- **Evidence Source:** `tardy_vitamins_2020`
- **Limitation:** no mitochondrial-specific intake threshold, universal
  mechanism-level limitation or supplementation benefit in magnesium-replete
  people.
- **Status / ceiling:** `nutritionally-constrained`;
  `dietary-provision`.

## Food relationships

Legacy food arrows were removed because the existing KC corpus did not
independently adjudicate Food → Input composition at the displayed granularity.
Food examples were not used to establish iKC membership.

## Public Evidence Base Summary

The Summary was compared with the reviewed definition, three constituent atoms
and claim ceilings. It contains one 67-word explanatory paragraph followed by
exactly three distinct, claim-local cited bullets:

1. the admitted micronutrient domain and its boundary from CoQ10 and
   creatine/phosphocreatine biology;
2. the narrative-review and disease-specific measurement boundary; and
3. deficiency prevention separated from additional-intake and clinical-benefit
   claims.

B vitamins, Iron and Magnesium each have a separate title-attached,
keyboard-accessible five-field disclosure. Activating either the title or its
adjacent chevron toggles the same detailed panel.

## Emerging Biological Supports

### Coenzyme Q10 — not retained

Crane supports CoQ10's endogenous biochemical roles in electron transport,
proton translocation and membrane antioxidant protection. The attached corpus
does not assess a dietary or supplemental CoQ10 intervention that supports the
named B-vitamin/iron/magnesium sufficiency constraint. The former claims about
ageing, statin use, mitochondrial disease, dietary influence and
condition-specific supplementation exceeded the attached evidence.

**Verdict:** biologically relevant carrier, but no warranted KC2 support atom.

### Creatine monohydrate — not retained

Solis found comparable posterior-cingulate brain creatine in vegetarians and
omnivores despite lower dietary creatine exposure. Avgerinos reviewed
heterogeneous cognitive responses to creatine supplementation. These sources
concern the creatine/phosphocreatine resource and outcomes, not support of the
shared B-vitamin/iron/magnesium cofactor constraint.

**Verdict:** adjacent PM3 buffering biology, but no warranted KC2 support atom.

The public §4 therefore states that no Emerging Biological Supports are
currently prioritised. No `kc_emerging_support_traceability` or presentation
records were created.

## Proposed FM/PM scope

Existing FM1–FM4 and PM1, PM2, PM3, PM4, PM5, PM6, PM7, PM8 and PM9
connections are carried forward as **proposed scope only**. The reviewed domain
is plausibly relevant across bioenergetic, redox, substrate-flexibility and
adaptation processes, but this KC pass does not establish any individual
PM ↔ iKC edge. No connection was shown impossible by the bounded corpus, so no
`ikc-scope-conflict` flag was required.

## Governing limitations and stopping rationale

- Only the five sources already attached to the page were used.
- Tardy is a broad narrative review and cannot establish simultaneous
  limitation across every listed PM.
- Pirinen is limited to adult-onset mitochondrial myopathy and pharmacological
  niacin dosing.
- Crane establishes CoQ10 biochemistry, not an intervention that supports this
  KC.
- Solis and Avgerinos concern creatine status or cognitive supplementation
  outcomes, not this cofactor domain.
- PM applicability was not researched or inferred from page membership.

Assessment stopped when page coherence, all core constituents, both inherited
§4 candidates, public Summary and proposed scope were adjudicated from the
existing corpus. No unresolved proposition requires a KC change-control flag.

## Verdict

**Canonical with bounded class-level membership.** B vitamins, iron and
magnesium are admitted at a `dietary-provision` ceiling. CoQ10 and creatine are
not retained as Emerging Biological Supports because the attached sources do
not connect them to the named shared cofactor constraint. PM evidence was not
modified.
