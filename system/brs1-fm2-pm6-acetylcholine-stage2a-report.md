# BRS1-FM2-PM6 Acetylcholine Synthesis Support — Stage 2A Report

## Scope and amended contracts

This independent rerun used the current `primary-mechanism-schema.md`,
`scientific-finding-schema.md`, `dietary-input-traceability-contract.md`,
`key-constraint-schema.md`, and `kc-page-evidence-review-contract.md`. Existing
page claims and prior reports were treated as propositions, not authoritative
answers.

Both rendered pages were accessible on 30 September 2026:

- published: `https://thebraindiet.org/.../brs1-fm2-pm6-acetylcholine-synthesis-support/`
- local: `http://localhost:3000/.../brs1-fm2-pm6-acetylcholine-synthesis-support`

The published page carried the legacy choline/phosphatidylcholine/B5/B12/folate
lists and copied BRS2(KC1) constituents and foods. The local page carried one
admitted choline row, an empty biochemical inventory, and no KC mapping.

## Overview contract trial

The Mission was used to define intended scope, not as evidence that PM6 achieves
that objective. Each substantive Overview claim was assessed against the
Scientific Findings:

- **Defining reaction:** choline acetyltransferase joins choline and acetyl-CoA
  in cholinergic terminals (PM6-F2; Oda 1999).
- **Substrate delivery:** blood–brain choline handling, terminal CHT uptake and
  compartmented acetyl-CoA supply are distinct steps (PM6-F1 and PM6-F7; Inazu
  2019; Ojiakor and Rylett 2020; Jope 1979).
- **Dietary provision and ceiling:** diet supplies choline directly and through
  phosphatidylcholine, while pantothenate supports coenzyme A formation; none of
  the assessed evidence establishes that extra intake raises human brain
  acetylcholine or improves attention (PM6-F4 and PM6-F5; Derbyshire and Maes
  2023; Böckmann et al. 2023; Rivera-Calimlim et al. 1988).

Verified evidence already in the PM corpus was sufficient, so this Overview
trial did not require additional retrieval. The public Overview was rewritten
as a concise explanatory paragraph plus three scannable bullets, with citations
placed beside the claims they support rather than attached generally to the
paragraph.

Rendered-browser verification confirmed three bullets and working links to PM
references [1], [4], [6], [7], [8], [12] and [13]. The introduction states the
reaction, separates the two substrate-supply boundaries, and preserves the
dietary-provision ceiling without implying cognitive benefit. The treatment
limitation is confined to the final Biological relevance bullet.

## Foundational propositions and adjudication

| Proposition | Disposition | Evidence and consequence |
|---|---|---|
| ChAT forms acetylcholine from choline and acetyl-CoA | Supported | Oda (1999) and Ojiakor and Rylett (2020). Both are substrates; no separate vitamin cofactor is part of the ChAT reaction. |
| Circulating choline and terminal choline are separated by two transport stages | Supported | CTL1/CTL2 operate at brain microvascular endothelium; CHT/SLC5A7 handles high-affinity terminal uptake (Inazu 2019; Ojiakor and Rylett 2020). |
| Choline entry into cholinergic terminals is a material control step | Supported | CHT/SLC5A7 recovers choline and is widely treated as the rate-limiting supply step; transporter trafficking changes with activity (Ojiakor and Rylett 2020). |
| Cytosolic acetyl-CoA supply is compartmented and can regulate synthesis | Supported, route proportions unresolved | ChAT is cytosolic while much acetyl-CoA production is mitochondrial. Citrate cleavage and other proposed routes supply the cytosolic pool; availability can limit synthesis (Jope 1979). |
| Thiamine/B1 is a PM6 synthesis requirement | Not established | Pyrithiamine-induced deficiency lowered nerve-terminal acetyl-CoA and altered quantal ACh release, but ChAT activity was unchanged and synthesis flux was not measured (Szutowicz et al. 2010). Retain as connected acetyl-CoA context, not a PM entry. |
| Phosphatidylcholine can provide choline | Supported | Human stable-isotope crossover evidence shows digestion/remodelling, delayed labelled plasma choline, and higher labelled PC exposure (Böckmann et al. 2023). |
| Pantothenate can constrain the acetyl-CoA side of synthesis | Supported with a strict ceiling | In chronic ethanol-exposed rats, severe brain pantothenate depletion reduced labelled ACh synthesis and pantothenate co-administration increased it (Rivera-Calimlim et al. 1988). This is not ordinary-diet human evidence. |
| One-carbon insufficiency can reduce the choline resource available to acetylcholine biology | Triangulated | Folate compromise and methionine-synthase-reductase impairment lowered brain choline and ACh in mouse models; a rat study showed region- and age-dependent responses (Chan 2008; Crivello 2010; Jadavji 2014). |
| B12 and folate are direct ChAT cofactors | Contradicted by reaction identity | They act in one-carbon metabolism, not in the ChAT reaction. Their supported relationship is shared-resource context. |
| Betaine is a ChAT substrate or cofactor | Not supported | Betaine participates in BHMT remethylation and can spare choline systemically; it is not converted back to choline and no direct PM6 reaction role was found. |
| Acetylcholine concentration, release, receptor binding, and functional outcome are equivalent to synthesis | Rejected | Storage, VAChT packaging, release, AChE breakdown, and receptors are distinct stages. Concentration can change without a measured synthesis-rate change. |

## Focused retrieval

Explicit questions:

1. Is high-affinity choline transport a defining omitted step?
2. Does dietary phosphatidylcholine demonstrably provide circulating choline?
3. Does pantothenate depletion affect acetylcholine synthesis through
   CoA/acetyl-CoA?
4. Can one-carbon impairment constrain the choline resource used by PM6?
5. Is there direct human evidence that ordinary choline intake raises brain
   acetylcholine synthesis?
6. Does the page distinguish blood–brain delivery from terminal CHT uptake and
   mitochondrial acetyl-CoA production from cytosolic ChAT use?

Targeted sources retrieved:

- Ojiakor and Rylett (2020), DOI `10.1016/j.neuint.2020.104810`
- Böckmann et al. (2023), DOI `10.1007/s00394-023-03121-z`
- Rivera-Calimlim et al. (1988), DOI `10.1111/j.1476-5381.1988.tb16550.x`
- Chan et al. (2008), DOI `10.1007/BF02982630`
- Crivello et al. (2010), DOI `10.1016/j.nutres.2010.09.008`
- Jadavji et al. (2014), DOI `10.1042/BJ20131652`
- Jope (1979), DOI `10.1016/0165-0173(79)90009-2`
- Inazu (2019), DOI `10.3390/nu11102265`
- Szutowicz et al. (2010), DOI `10.1111/j.1471-4159.2010.06919.x`

The focused follow-up was reopened after an independent challenge identified
two boundary gaps: blood–brain transport and compartmented acetyl-CoA supply.
Search stopped after the reaction, both transport stages, acetyl-unit
compartmentation, both dietary provision routes, and the one-carbon constraint
were each supported or bounded. Human
MRS studies measure choline-containing compounds rather than acetylcholine
synthesis and do not close a human intake-to-synthesis claim. Expanding into
AChE drugs, receptor subtypes, release pharmacology, or disease treatment would
cross the PM boundary. The B1 lead stopped at a release endpoint with unchanged
ChAT activity; further generic thiamine literature would not justify a PM6
synthesis entry without a synthesis-specific bridge.

## Scientific Findings

| Finding | Role |
|---|---|
| PM6-F1 | CHT-mediated high-affinity choline uptake controls substrate entry |
| PM6-F2 | Choline + acetyl-CoA → acetylcholine through ChAT |
| PM6-F3 | Attention-related cholinergic context, not a dietary treatment finding |
| PM6-F4 | Phosphatidylcholine is a dietary choline-provision route |
| PM6-F5 | Pantothenate supports CoA/acetyl-CoA supply; severe depletion can reduce rat-brain synthesis |
| PM6-F6 | One-carbon insufficiency can constrain the choline/ACh resource state |
| PM6-F7 | Cytosolic acetyl-CoA supply is metabolically generated and compartmented |

PM6-F1 and PM6-F2 remain FM roll-up findings. The former receptor-binding
content of PM6-F1 was outside headline synthesis-capacity scope and is retained
only in PM6-F3's phenome relationship.

## Connections

The published page exposed one cross-BRS FM link and no PM-level local links.
The rerun replaced the bare/over-broad FM relationship with specific,
evidence-supported PM connections:

- **BRS2-FM1-PM1:** folate/B12 remethylation can reduce reliance on
  choline-derived methyl donation; impairment can lower the choline/ACh resource.
- **BRS2-FM1-PM2:** choline oxidation supplies betaine to BHMT remethylation;
  that competing fate does not establish betaine as a PM6 dietary requirement.
- **BRS2-FM3-PM7:** phosphatidylcholine formation shares choline chemistry, while
  membrane PC synthesis remains distinct from the ChAT reaction.

The local PM1 amino-acid link was removed because being a different substrate
class is not a direct relationship. The local neuronal-membrane DHA link was
replaced by the closer phosphatidylcholine-formation PM. FM2 has no second PM, so
§5.3 correctly has no local sibling connection.

## Coverage sufficiency

Coverage now includes the defining reaction, both reaction substrates,
blood–brain and terminal choline transport, compartmented acetyl-CoA supply,
dietary choline-form provision, pantothenate/CoA provision, the one-carbon
shared-resource interaction, and the boundary between synthesis and later
cholinergic stages. The exact contribution of competing acetyl-unit transfer
routes remains unresolved, but no material foundational proposition remains
unassessed. Human intake-to-brain-synthesis response remains **not
demonstrated**, not a reason to deny the underlying dependencies.
