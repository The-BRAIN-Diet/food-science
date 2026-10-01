# BRS6(KC2) KC-page evidence review

**Contract:** `system/kc-page-evidence-review-contract.md`  
**Page:** `docs/biological-targets/brs6/kc/brs6-kc2-stress-response-micronutrient-and-lipid-sufficiency.mdx`  
**Corpus:** Tardy et al. 2020 (`tardy_vitamins_2020`); Kennedy 2016 (`kennedy_b_2016`); McNamara and Carlson 2006 (`mcnamara_role_2006`).  
**PM evidence:** not modified. PM ↔ iKC applicability remains a later independent Stage 2B decision.

## Page coherence

**Candidate constraint:** magnesium, vitamin C, all B vitamins, iron, zinc, EPA,
and DHA form one “stress-response micronutrient and lipid” resource pool shared
across HPA-axis and autonomic-recovery mechanisms.

**Adjudication:** **not supported as one identifiable limiting pool.**

- Tardy reviews multiple vitamins and minerals with distinct roles in
  energy-yielding metabolism, DNA synthesis, oxygen transport, and neuronal
  function. A list of biochemical requirements does not establish one resource.
- Kennedy reviews B vitamins as coenzymes across many reactions. Shared
  coenzyme relevance does not establish a stress-response pool or common
  availability bottleneck.
- McNamara and Carlson review long-chain omega-3 fatty acids as structural and
  signalling components of brain lipids. That membrane-lipid role is not the
  same resource as micronutrient cofactor or oxygen-handling roles.

The evidence therefore fails the KC inclusion test. The grouping is primarily a
collection of distinct PM-layer biochemical requirements and dietary inputs
that support a broad outcome, not one shared substrate, precursor, cofactor, or
structural pool.

## iKC definition

No evidence-supported iKC survived.

The default `BRS6(KC2)` identity cannot be defined as a falsifiable shared
resource without collapsing materially different biological roles. Creating
separate iKCs for micronutrients and EPA/DHA would not solve that problem:

- the micronutrient class is still an inventory of distinct cofactors and
  substrates rather than one constrained resource; and
- EPA/DHA membrane-lipid biology is a separate structural/signalling domain and
  is not shown by the corpus to constrain both proposed PMs as one KC.

No replacement KC or additional iKC was invented.

## Constituent adjudication

No constituent is admitted. Because a canonical KC atom can exist only for an
evidence-supported iKC membership relationship, the page does not create
`kc_input_traceability` or `kc_constituent_presentations`.

### Magnesium — reclassified

- **Input Type:** `cofactor`
- **Evidence tested:** `tardy_vitamins_2020`
- **Disposition:** biochemical requirement; no shared-pool membership.
- **Reason:** broad metabolic cofactor roles do not demonstrate that magnesium
  availability is a shared stress-response bottleneck across the proposed scope.

### Vitamin C — reclassified

- **Input Type:** `nutrient/substance`
- **Evidence tested:** `tardy_vitamins_2020`
- **Disposition:** dietary/biochemical input; no shared-pool membership.
- **Reason:** redox and metabolic relevance does not establish membership in a
  common pool with minerals, B vitamins, and membrane lipids.

### B vitamins (B1, B2, B3, B5, B6, B7, B9, B12) — reclassified

- **Input Type:** `nutrient/compound class`
- **Evidence tested:** `tardy_vitamins_2020`; `kennedy_b_2016`
- **Disposition:** biochemical cofactor class; no shared-pool membership.
- **Reason:** the vitamins have many distinct coenzyme roles. The evidence does
  not identify one stress-response resource jointly supplied or depleted.

### Iron — reclassified

- **Input Type:** `nutrient/substance`
- **Evidence tested:** `tardy_vitamins_2020`
- **Disposition:** biochemical and oxygen-handling requirement; no shared-pool
  membership.
- **Reason:** oxygen transport and enzyme roles do not establish the proposed
  common micronutrient-and-lipid bottleneck.

### Zinc — reclassified

- **Input Type:** `cofactor`
- **Evidence tested:** `tardy_vitamins_2020`
- **Disposition:** biochemical requirement; no shared-pool membership.
- **Reason:** broad enzyme and neuronal relevance does not establish shared
  resource identity or joint limitation.

### Long-chain omega-3 fatty acids (EPA and DHA) — reclassified

- **Input Type:** `nutrient/compound class`
- **Evidence tested:** `mcnamara_role_2006`
- **Disposition:** structural/signalling dietary input; no membership in the
  proposed micronutrient pool.
- **Reason:** membrane-lipid structure and signalling are materially different
  from the cited micronutrient roles. The review does not demonstrate one
  interchangeable pool or a common limiting state across the listed mechanisms.

These decisions do not deny PM-specific nutrient relevance. They preserve the
firewall between a KC shared resource and PM Dietary Requirements.

## Public Summary check

The §3 Summary was checked against the failed page-level constraint and every
constituent decision.

- It opens with one 68-word explanatory paragraph.
- It is followed by exactly three cited, non-duplicative boundary bullets.
- It explains the biological distinction without internal membership,
  canonicalisation, or workflow language.
- It does not imply that biochemical importance, deficiency consequences, or
  membrane relevance establishes one shared pool.
- All citations resolve to the three existing page bibliography records.

There are no admitted §3 resources and no assessed §4 candidates. Accordingly,
there are no resource or candidate titles requiring title-attached disclosures,
and no unsupported disclosure atoms were manufactured.

## Proposed FM/PM scope

FM2, FM3, PM4, PM6, and PM7 remain displayed as **proposed scope only** while
the KC identity is unresolved. The corpus does not establish that these
mechanisms draw on one shared micronutrient-and-lipid constraint. No PM evidence
or PM mapping was modified.

## Change-control flags

- `KC-CC-BRS6-KC2-01` — pending `invalid-kc`: the page grouping fails the
  identifiable shared-pool test.
- `KC-CC-BRS6-KC2-02` — resolved constituent challenge: the micronutrients are
  distinct biochemical requirements, not members of one evidenced
  stress-response pool.
- `KC-CC-BRS6-KC2-03` — resolved constituent challenge: EPA/DHA membrane-lipid
  biology does not join the proposed micronutrient pool.

The flags are stored on the KC page only. The shared queue was not modified.

## Evidence coverage and stopping rationale

The attached corpus directly addresses the claimed categories and is sufficient
to determine whether it establishes one shared limiting pool. It establishes
distinct nutrient functions but provides no common resource identity, joint
limitation measurement, or shared depletion/provision relationship.

External retrieval would be needed to propose and test a different KC, not to
rescue the inherited grouping from evidence that does not support it. That would
exceed this bounded page review. Review stopped after the grouping, every
inherited constituent, public Summary, and proposed scope were adjudicated.

## Final verdict

**Full review completed; canonical migration not earned.** The page remains
`kc_evidence_review_status: legacy-unreviewed` because the reviewed identity has
no admitted constituent and fails the KC inclusion test. It is explicitly
flagged `invalid-kc` rather than being made canonical by admitting biochemical
requirements or combining micronutrients and lipids without shared-pool
evidence.
