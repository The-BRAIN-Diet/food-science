/**
 * Cross-TA (anxiety/depression) phenome relationship extensions — PH016–PH018.
 * Merged into existing PM/FM front matter by apply-ta-phenome-extensions.mjs.
 * @see src/data/phenome-registry.json
 */

import { enrichReferenceWithDataLevel } from "../lib/reference-data-levels.mjs";

function ref(index, label, citation_key) {
  return enrichReferenceWithDataLevel({
    index,
    label,
    citation_key,
    href: `/docs/papers/BRAIN-Diet-References#${citation_key}`,
  });
}

function row({
  target_phenome,
  relationship_type = "modulates",
  confidence,
  evidence_level = "mechanistic",
  rationale,
  references,
  evidence_confidence,
}) {
  return {
    target_phenome,
    relationship_type,
    confidence,
    evidence_level,
    rationale,
    references,
    ...(evidence_confidence ? { evidence_confidence } : {}),
  };
}

/** @type {Record<string, import('../lib/phenome-relationships.mjs').PhenomeRelationshipRow[]>} */
export const TA_PM_PHENOME_EXTENSIONS = {
  "BRS1-FM1-PM4": [
    row({
      target_phenome: "Apprehensive Worry / Perseverative Thought",
      relationship_type: "supports",
      confidence: "low-medium",
      evidence_level: "mechanistic",
      rationale:
        "Serotonergic signalling intersects negative-valence and cognitive-control circuits implicated in sustained worry and rumination across anxiety and depressive spectra; Briguglio et al. (2018) summarises dietary serotonin biology relevant to neuropsychiatric mood and anxiety contexts. Marsland et al. (2017) links systemic inflammation to default-mode connectivity patterns associated with perseverative thought — translational framing only, not dietary treatment efficacy.",
      references: [
        ref(1, "Briguglio et al. (2018)", "briguglio_dietary_2018"),
        ref(2, "Marsland et al. (2017)", "marsland_systemic_2017"),
      ],
      evidence_confidence: "low-medium",
    }),
    row({
      target_phenome: "Pleasure & Interest Capacity",
      relationship_type: "modulates",
      confidence: "low-medium",
      evidence_level: "intervention",
      rationale:
        "Serotonin pathways intersect positive-valence and reward-related mood biology; saffron RCT evidence reports improved subclinical depressive symptoms and social-relationship quality alongside anxiety reduction in adults with low mood — mechanism boundary remains serotonergic signalling support, not saffron as a PM intervention.",
      references: [
        ref(1, "Jackson et al. (2021)", "jackson_effects_2021"),
        ref(2, "Lopresti & Drummond (2014)", "lopresti_saffron_2014"),
      ],
      evidence_confidence: "low-medium",
    }),
    row({
      target_phenome: "Social Engagement Capacity",
      relationship_type: "modulates",
      confidence: "low",
      evidence_level: "intervention",
      rationale:
        "Serotonergic tone modulates affiliative and social-affective behaviour in translational framing; Jackson et al. (2021) reported improved social relationships with saffron supplementation in subclinical mood/anxiety contexts — attached evidence is intervention-level, not direct serotonergic social-outcome measurement on this PM.",
      references: [ref(1, "Jackson et al. (2021)", "jackson_effects_2021")],
      evidence_confidence: "low",
    }),
  ],
  "BRS1-FM1-PM3": [
    row({
      target_phenome: "Pleasure & Interest Capacity",
      relationship_type: "modulates",
      confidence: "low-medium",
      evidence_level: "mechanistic",
      rationale:
        "Noradrenergic and broader catecholaminergic signalling intersect reward anticipation and incentive motivation components of pleasure/interest capacity in RDoC Positive Valence framing; Gruber et al. (2023) reviews insulin–dopamine reward disruption in depression as adjacent translational context for monoaminergic supply.",
      references: [
        ref(1, "MacDonald et al. (2024)", "macdonald_dopamine_2024"),
        ref(2, "Gruber et al. (2023)", "gruber_impact_2023"),
      ],
      evidence_confidence: "low",
    }),
  ],
  "BRS1-FM4-PM8": [
    row({
      target_phenome: "Apprehensive Worry / Perseverative Thought",
      relationship_type: "modulates",
      confidence: "low-medium",
      evidence_level: "mechanistic",
      rationale:
        "GABA is the principal inhibitory neurotransmitter; altered central GABA receptor expression is implicated in anxiety pathogenesis in gut–brain and dietary neurotransmitter reviews. GABA synthesis capacity is the mechanism boundary — not probiotic or pharmacologic GABAergic treatment claims.",
      references: [
        ref(1, "Briguglio et al. (2018)", "briguglio_dietary_2018"),
        ref(2, "Edden et al. (2012)", "edden_reduced_2012"),
      ],
      evidence_confidence: "low-medium",
    }),
    row({
      target_phenome: "Social Engagement Capacity",
      relationship_type: "indirect",
      confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "Inhibitory GABAergic tone may indirectly support social approach by limiting hyperarousal and overstimulation that drive withdrawal; direct social-engagement outcome evidence on GABA synthesis capacity remains limited in attached refs.",
      references: [ref(1, "Edden et al. (2012)", "edden_reduced_2012")],
      evidence_confidence: "low",
    }),
  ],
};

/** FM functional_outcome_context rows to append (max 4 total per FM — caller must enforce). */
export const TA_FM_OUTCOME_EXTENSIONS = {
  "BRS1(FM1)": [
    {
      outcome_name: "Apprehensive Worry / Perseverative Thought",
      confidence: "low-medium",
      synthesis:
        "Integrated monoaminergic function — especially serotonergic signalling from precursor availability and transport context — intersects negative-valence and perseverative-thought biology relevant to anxiety and depressive comorbidity in ADHD. This scores translational biological relevance within BRAIN, not dietary treatment of worry disorders.",
      references: [
        ref(1, "Briguglio et al. (2018)", "briguglio_dietary_2018"),
        ref(2, "Marsland et al. (2017)", "marsland_systemic_2017"),
      ],
      evidence_confidence: "low-medium",
    },
  ],
  "BRS3(FM1)": [
    {
      outcome_name: "Apprehensive Worry / Perseverative Thought",
      confidence: "low-medium",
      synthesis:
        "Anti-inflammatory signalling tone — NF-κB restraint and gut-derived inflammatory load — may modulate neuroimmune pathways linked to default-mode hyperconnectivity and perseverative thought in anxiety/depression translational framing.",
      references: [
        ref(1, "Marsland et al. (2017)", "marsland_systemic_2017"),
        ref(2, "Batey et al. (2024)", "batey_lipopolysaccharide_2024"),
      ],
      evidence_confidence: "low-medium",
    },
    {
      outcome_name: "Pleasure & Interest Capacity",
      confidence: "low-medium",
      synthesis:
        "Chronic low-grade inflammatory and LPS-linked neurotransmission disruption intersect depressive anhedonia biology; integrated anti-inflammatory FM capacity may modulate this context through cytokine and transcriptional tone rather than direct antidepressant claims.",
      references: [
        ref(1, "Batey et al. (2024)", "batey_lipopolysaccharide_2024"),
        ref(2, "Song et al. (2023)", "song_mitochondrial_2023"),
      ],
      evidence_confidence: "low",
    },
  ],
  "BRS3(FM3)": [
    {
      outcome_name: "Apprehensive Worry / Perseverative Thought",
      confidence: "low-medium",
      synthesis:
        "Resolution-oriented lipid mediator and cytokine-network balance may modulate inflammatory tone linked to anxiety symptoms; Kiecolt-Glaser et al. (2011) provides human intervention evidence for omega-3 lowering anxiety in stressed adults as adjacent translational support.",
      references: [
        ref(1, "Kiecolt-Glaser et al. (2011)", "kiecolt-glaser_omega-3_2011"),
        ref(2, "Ferguson et al. (2014)", "ferguson_omega3_2014"),
      ],
      evidence_confidence: "low-medium",
    },
    {
      outcome_name: "Pleasure & Interest Capacity",
      confidence: "low",
      synthesis:
        "Inflammation-resolution capacity intersects mitochondrial and reward-processing dysfunction in depression translational models; omega-3 resolution biology provides mechanistic context without direct anhedonia-outcome claims on this FM.",
      references: [
        ref(1, "Song et al. (2023)", "song_mitochondrial_2023"),
        ref(2, "Gruber et al. (2023)", "gruber_impact_2023"),
      ],
      evidence_confidence: "low",
    },
  ],
};
