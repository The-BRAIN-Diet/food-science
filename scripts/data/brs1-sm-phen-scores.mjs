/**
 * BRS1 SM-PHEN Phase 3 interpretation scores.
 * @see system/specific-mechanism-schema.md#sm-phen-pages-phenome-interpretation-layer
 */

/** @type {Record<string, { interpretation_lens: string, interpreted_phenome: object }>} */
export const BRS1_SM_PHEN_SCORES = {
  "BRS1(SM-PHEN1)": {
    interpretation_lens: "BRS1 excitatory–inhibitory balance and sensory-regulation context",
    interpreted_phenome: {
      id: "PH015",
      name: "Stress Reactivity",
      relationship_type: "modulates",
      confidence: "medium",
      evidence_confidence: "low-medium",
      rationale:
        "Connected BRS1 FM4 PM cluster describes excitatory–inhibitory balance, GABA synthesis, glutamate clearance, and excitotoxicity modulation that may intersect sensory-overwhelm and stress-linked reactivity patterns when inhibitory tone is strained — as one component of a multi-system phenotype, not as a single-mechanism determinant. Evidence Confidence is low-medium because attached refs establish ADHD GABA biomarker context rather than direct sensory-regulation outcome trials on this SM.",
      references: [
        {
          label: "Edden et al. (2012)",
          citation_key: "edden_reduced_2012",
          href: "/docs/papers/BRAIN-Diet-References#edden_reduced_2012",
          data_level: "Human Mechanistic",
        },
        {
          label: "Puts et al. (2020)",
          citation_key: "puts_reduced_2020",
          href: "/docs/papers/BRAIN-Diet-References#puts_reduced_2020",
          data_level: "Human Mechanistic",
        },
        {
          label: "Mamiya et al. (2021)",
          citation_key: "mamiya_precision_2021",
          href: "/docs/papers/BRAIN-Diet-References#mamiya_precision_2021",
          data_level: "Mechanistic",
        },
      ],
    },
  },
  "BRS1(SM-PHEN2)": {
    interpretation_lens: "BRS1 monoaminergic precursor, transport, and signalling context",
    interpreted_phenome: {
      id: "PH003",
      name: "Emotional Regulation",
      relationship_type: "modulates",
      confidence: "medium",
      evidence_confidence: "low-medium",
      rationale:
        "Connected BRS1 PMs describe amino-acid availability, precursor transport dynamics, and monoaminergic signalling context that may influence emotional reactivity, stress responsiveness, and regulation capacity — as one component of a multi-system phenotype, not as a single-mechanism determinant. Evidence Confidence is low-medium because attached refs establish ADHD emotional-dysregulation and serotonergic context rather than direct dietary intervention outcomes on this SM.",
      references: [
        {
          label: "Shaw et al. (2014)",
          citation_key: "shaw_emotion_2014",
          href: "/docs/papers/BRAIN-Diet-References#shaw_emotion_2014",
          data_level: "Human Mechanistic",
        },
        {
          label: "Banerjee and Nandagopal (2015)",
          citation_key: "banerjee_does_2015",
          href: "/docs/papers/BRAIN-Diet-References#banerjee_does_2015",
          data_level: "Mechanistic",
        },
        {
          label: "Oades (2010)",
          citation_key: "oades_role_2010",
          href: "/docs/papers/BRAIN-Diet-References#oades_role_2010",
          data_level: "Mechanistic",
        },
      ],
    },
  },
};
