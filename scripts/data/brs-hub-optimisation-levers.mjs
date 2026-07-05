/**
 * Curated integrated Optimisation Levers for BRS hub pages.
 * PM provenance attached at generation time via match_optimisation / match_pm_ids.
 * @see system/brs-hub-levers-schema.md
 */

/** @typedef {{ action: string, explanation: string, match_optimisation?: RegExp[], match_pm_ids?: string[], fm_note?: string }} OptimisationLeverDef */

/** @type {Record<string, OptimisationLeverDef[]>} */
export const HUB_OPTIMISATION_LEVERS = {
  BRS1: [
    {
      action: "Prepare omega-3-rich foods gently and include them regularly",
      explanation:
        "to protect delicate marine fats during cooking and support ongoing brain membrane health over time.",
      match_optimisation: [
        /gentle cooking.*marine/i,
        /marine-fat/i,
        /minimally_processed_seafood/i,
        /preserve.*PUFA/i,
      ],
      match_pm_ids: ["BRS1-FM3-PM6"],
      fm_note:
        "Biological rationale: FM §4.3 Suboptimal Function — oxidative degradation of PUFA-rich meal matrices.",
    },
  ],
};
