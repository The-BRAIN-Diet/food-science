---
title: BRS2 → BRS3 — One-Carbon to Redox Coupling
integration_id: BRS2->BRS3
source_brs: BRS2
destination_brs: BRS3
hide_title: true
---

# BRS2 → BRS3 — One-Carbon to Redox Coupling

One-carbon transsulfuration supplies cysteine that [BRS3](/docs/biological-targets/inflammation-oxidative-stress) uses in glutathione-centred redox defence.

## Dependency

[BRS2](/docs/biological-targets/methylation-one-carbon-metabolism) can divert homocysteine through [transsulfuration](/docs/biological-targets/brs2/fm2/brs2-fm2-pm5-transsulfuration-pathway) toward cysteine. That cysteine is a substrate for [glutathione synthesis](/docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis). The resulting [glutathione](/docs/substances/bioactive-compounds/glutathione) pool is used in BRS3 peroxide reduction, electrophile conjugation and related thiol chemistry.

## Principal Routes

<div className="markdown-table-scroll">

| Route | Contribution to BRS3 | Relationship |
| --- | --- | --- |
| Transsulfuration (CBS/CTH) | Provides cysteine from homocysteine | Direct |
| Glutathione synthesis from cysteine | Supplies GSH for glutathione-dependent redox enzymes | Direct |

</div>

## Network Interpretation

This is a substrate-routing dependency, not an immune-regulation pathway. Methyl-cycle flux can compete with transsulfuration, so one-carbon allocation can constrain glutathione precursor supply. The same glutathione pool later conditions [BRS1](/docs/biological-targets/neurotransmitter-regulation) only as a mediated `BRS2 → BRS3 → BRS1` route, not as a BRS2 monoamine-synthesis output.

## Boundary and Evidence Status

Transsulfuration and glutathione synthesis are established biochemistry. Substrate availability does not guarantee increased GSH or improved inflammatory outcomes. The dependency does not establish a clinical redox treatment.

## Supporting Evidence

- [Kumar et al., 2017](/docs/papers/BRAIN-Diet-References#kumar_transsulfuration_2017) — Reviews transsulfuration from homocysteine to cysteine and onward glutathione-related chemistry.
- [Chiang et al., 1996](/docs/papers/BRAIN-Diet-References#chiang_s-adenosylmethionine_1996) — Reviews SAMe-dependent methylation and the allocation of one-carbon flux that can feed transsulfuration.
- [Lu, 2013](/docs/papers/BRAIN-Diet-References#lu_glutathione_synthesis_2013) — Reviews glutathione synthesis and cysteine as a frequent constraint on that pathway.
