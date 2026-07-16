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
  BRS3: [
    {
      action: "Choose gentler cooking methods and avoid repeatedly heating unstable oils",
      explanation:
        "to limit lipid oxidation and dietary ROS that can overwhelm antioxidant clearance and lipid peroxidation control.",
      match_pm_ids: ["BRS3-FM2-PM4", "BRS3-FM2-PM5"],
    },
    {
      action: "Limit ultra-processed food exposure",
      explanation:
        "to reduce post-meal inflammatory signalling and avoidable oxidative substrates that amplify immune tone beyond nutrient intake alone.",
      match_pm_ids: ["BRS3-FM1-PM1", "BRS3-FM3-PM7"],
    },
    {
      action: "Prepare antioxidant-rich vegetables to preserve heat-sensitive compounds",
      explanation:
        "to retain vitamin C and polyphenols that support NRF2 activation and sustained ROS clearance rather than losing them to overcooking.",
      match_pm_ids: ["BRS3-FM2-PM3", "BRS3-FM2-PM6"],
    },
  ],
  BRS4: [
    {
      action:
        "Consider creatine monohydrate under selected high-demand or low-intake conditions",
      explanation:
        "to support phosphocreatine buffering when sleep deprivation, hypoxia, ageing, low dietary creatine intake, or sustained cognitive/physical demand make exogenous creatine more consequential; cerebral responses remain variable and smaller than typical muscle responses.",
      match_optimisation: [
        /creatine monohydrate/i,
        /conditional.*creatine/i,
        /selected conditions/i,
      ],
      match_pm_ids: ["BRS4-FM1-PM3"],
      fm_note:
        "Biological rationale: BRS4-FM1-PM3 — endogenous synthesis/transport first; exogenous creatine is conditional optimisation.",
    },
    {
      action: "Choose gentler cooking methods",
      explanation:
        "to reduce avoidable oxidative stress placed on mitochondrial protection and membrane integrity.",
      match_optimisation: [/gentler cooking/i, /gentle cooking/i],
      match_pm_ids: ["BRS4-FM2-PM5"],
    },
    {
      action: "Boil high-oxalate leafy greens when oxalate load matters",
      explanation:
        "to reduce soluble oxalate, improve mineral bioavailability from iron- and magnesium-rich greens, and limit avoidable pressure on mitochondrial cofactor and redox networks.",
      match_optimisation: [/oxalate/i, /high-oxalate/i],
      match_pm_ids: ["BRS4-FM2-PM4", "BRS4-FM2-PM5"],
    },
  ],
};
