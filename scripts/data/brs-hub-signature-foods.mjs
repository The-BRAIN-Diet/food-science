/**
 * Curated hub Target Foods with practitioner-facing explanations.
 * When defined for a BRS, replaces auto-extracted nutrient-dense stars on hub pages.
 * @see system/brs-hub-levers-schema.md
 */

/** @type {Record<string, Array<{ label: string, food_slug?: string|null, explanation: string, match_foods?: string[] }>>} */
export const HUB_SIGNATURE_FOODS = {
  BRS1: [
    {
      label: "Eggs",
      food_slug: "eggs",
      match_foods: ["eggs"],
      explanation:
        "Provides complete protein, choline, and membrane lipids that support amino-acid precursor supply, acetylcholine synthesis, and neuronal DHA incorporation across BRS1 pathways.",
    },
    {
      label: "Salmon",
      food_slug: "salmon",
      match_foods: ["salmon"],
      explanation:
        "Rich in DHA and phospholipid-bound omega-3s that support neuronal membrane incorporation and help modulate excitatory–inhibitory balance under inflammatory or oxidative load.",
    },
    {
      label: "Lentils",
      food_slug: "lentils",
      match_foods: ["lentils"],
      explanation:
        "Plant protein source that supports amino-acid pool sufficiency and complementary amino-acid balance when paired with grains, relevant to neurotransmitter precursor availability.",
    },
    {
      label: "Fish Roe",
      food_slug: "salmon-roe",
      match_foods: ["fish roe", "roe"],
      explanation:
        "Delivers phospholipid-bound DHA in a food matrix suited to neuronal membrane incorporation rather than isolated triglyceride omega-3 alone.",
    },
    {
      label: "Pumpkin Seeds",
      food_slug: "pumpkin-seeds",
      match_foods: ["pumpkin seeds"],
      explanation:
        "Magnesium- and zinc-rich seed supporting GABA–glutamate balance and GABA synthesis capacity within excitatory–inhibitory regulation.",
    },
    {
      label: "Blueberries",
      food_slug: "blueberries",
      match_foods: ["blueberries", "berries"],
      explanation:
        "Polyphenol-rich fruit that supports glutamate clearance, recycling, and excitotoxicity modulation within GABA–glutamate regulation.",
    },
    {
      label: "Extra Virgin Olive Oil",
      food_slug: "extra-virgin-olive-oil",
      match_foods: ["extra-virgin olive oil", "extra virgin olive oil"],
      explanation:
        "Provides monounsaturated fats and polyphenols that support membrane context and glutamate clearance pathways within neuronal signalling balance.",
    },
    {
      label: "Greek Yogurt (plain, unsweetened)",
      food_slug: "greek-yogurt",
      match_foods: ["yogurt", "greek yogurt", "kefir"],
      explanation:
        "Fermented dairy providing protein matrix and microbial metabolites that support GABA synthesis capacity within the gut–neurotransmitter interface.",
    },
  ],
  BRS2: [
    {
      label: "Eggs",
      food_slug: "eggs",
      match_foods: ["eggs"],
      explanation:
        "Concentrated source of choline, B12, and complete protein supporting homocysteine remethylation, SAMe synthesis, transsulfuration, and phosphatidylcholine formation.",
    },
    {
      label: "Spinach",
      food_slug: "spinach",
      match_foods: ["spinach"],
      explanation:
        "Leafy green rich in folate and betaine that supports folate–B12 remethylation, BHMT-mediated remethylation, and methyl-donor throughput across the one-carbon cycle.",
    },
    {
      label: "Salmon",
      food_slug: "salmon",
      match_foods: ["salmon"],
      explanation:
        "Provides B vitamins, selenium, and phospholipid context supporting glutathione synthesis and choline-derived phosphatidylcholine formation.",
    },
    {
      label: "Sardines",
      food_slug: "sardines",
      match_foods: ["sardines"],
      explanation:
        "Oily fish supplying B12, selenium, and phospholipid-bound fats that support transsulfuration, glutathione synthesis, and membrane methylation coupling.",
    },
    {
      label: "Fish Roe",
      food_slug: "salmon-roe",
      match_foods: ["fish roe", "roe"],
      explanation:
        "Phospholipid-rich seafood supporting phosphatidylcholine formation and the methylation–membrane coupling axis.",
    },
    {
      label: "Pumpkin Seeds",
      food_slug: "pumpkin-seeds",
      match_foods: ["pumpkin seeds"],
      explanation:
        "Magnesium- and zinc-rich seed supporting SAMe synthesis and enzymatic cofactor sufficiency across methylation-cycle reactions.",
    },
    {
      label: "Mackerel",
      food_slug: "mackerel",
      match_foods: ["mackerel"],
      explanation:
        "Oily fish providing B vitamins and phospholipid substrate that support glutathione synthesis and choline–phosphatidylcholine pathways.",
    },
  ],
  BRS3: [
    {
      label: "Salmon",
      food_slug: "salmon",
      match_foods: ["salmon", "mackerel", "sardines"],
      explanation:
        "EPA- and DHA-rich oily fish supporting NF-κB regulation, cytokine network modulation, and resolution-oriented lipid mediator formation.",
    },
    {
      label: "Walnuts",
      food_slug: "walnuts",
      match_foods: ["walnuts"],
      explanation:
        "Plant source of ALA and polyphenols that supports antioxidant network recycling and a favourable omega-6:omega-3 balance within inflammatory tone.",
    },
    {
      label: "Blueberries",
      food_slug: "blueberries",
      match_foods: ["blueberries", "berries"],
      explanation:
        "Anthocyanin-rich fruit supporting ROS generation–clearance balance, NF-κB modulation, and endogenous antioxidant defences.",
    },
    {
      label: "Extra Virgin Olive Oil",
      food_slug: "extra-virgin-olive-oil",
      match_foods: ["extra-virgin olive oil", "extra virgin olive oil"],
      explanation:
        "Monounsaturated fat and polyphenol source that supports anti-inflammatory signalling tone and reduces reliance on oxidised dietary fats.",
    },
    {
      label: "Broccoli",
      food_slug: "broccoli",
      match_foods: ["broccoli"],
      explanation:
        "Sulphur-rich crucifer providing glucosinolate-derived compounds and antioxidant cofactors that support redox stability and inflammatory resolution capacity.",
    },
    {
      label: "Fermented Vegetables",
      food_slug: "fermented-vegetables",
      match_foods: ["fermented vegetables", "kefir", "yogurt"],
      explanation:
        "Live-culture foods supporting gut-derived inflammatory signalling modulation and microbial metabolite context for systemic inflammatory tone.",
    },
    {
      label: "Spinach",
      food_slug: "spinach",
      match_foods: ["spinach"],
      explanation:
        "Leafy green supplying vitamins C and E, folate, and magnesium that support antioxidant network recycling and cytokine network balance.",
    },
    {
      label: "Barley",
      food_slug: "barley",
      match_foods: ["barley", "oats"],
      explanation:
        "Soluble-fibre whole grain supporting fermentable substrate delivery, gut-derived inflammatory signalling modulation, and SCFA-related anti-inflammatory context.",
    },
  ],
  BRS4: [
    {
      label: "Salmon",
      food_slug: "salmon",
      match_foods: ["salmon", "mackerel", "sardines"],
      explanation:
        "Oily fish providing CoQ10-relevant context, omega-3s, and high-quality protein supporting electron transport, ROS control, and mitochondrial biogenesis.",
    },
    {
      label: "Eggs",
      food_slug: "eggs",
      match_foods: ["eggs"],
      explanation:
        "Rich in B vitamins, choline, and complete protein supporting cellular bioenergetics, cofactor sufficiency, and sustained substrate delivery to mitochondria.",
    },
    {
      label: "Oats",
      food_slug: "oats",
      match_foods: ["oats", "barley"],
      explanation:
        "Slowly digested whole grain providing steady carbohydrate fuel and B-vitamin context for substrate utilisation flexibility and cognitive energy availability.",
    },
    {
      label: "Spinach",
      food_slug: "spinach",
      match_foods: ["spinach"],
      explanation:
        "Iron-, magnesium-, and folate-rich leafy green supporting electron transport cofactors, redox balance, and mitochondrial enzyme function.",
    },
    {
      label: "Walnuts",
      food_slug: "walnuts",
      match_foods: ["walnuts"],
      explanation:
        "ALA and polyphenol source supporting mitochondrial biogenesis, ROS production–control balance, and metabolic fuel-switching context.",
    },
    {
      label: "Blueberries",
      food_slug: "blueberries",
      match_foods: ["blueberries", "berries"],
      explanation:
        "Polyphenol-rich fruit supporting ROS control, mitochondrial resilience, and oxidative stress modulation within bioenergetic regulation.",
    },
    {
      label: "Pumpkin Seeds",
      food_slug: "pumpkin-seeds",
      match_foods: ["pumpkin seeds"],
      explanation:
        "Magnesium- and zinc-rich seed supporting mitochondrial enzyme cofactors, redox stability, and cellular energy production pathways.",
    },
    {
      label: "Broccoli",
      food_slug: "broccoli",
      match_foods: ["broccoli"],
      explanation:
        "Cruciferous vegetable providing sulphur compounds and antioxidant cofactors that support mitochondrial resilience and redox stability under metabolic demand.",
    },
  ],
  BRS5: [
    {
      label: "Oats",
      food_slug: "oats",
      match_foods: ["oats"],
      explanation:
        "β-glucan-rich whole grain supporting fermentable fibre delivery, microbial ecological turnover, and SCFA production relevant to gut–brain signalling.",
    },
    {
      label: "Barley",
      food_slug: "barley",
      match_foods: ["barley"],
      explanation:
        "Soluble-fibre grain promoting microbial fermentation, competitive ecological selection, and butyrate-supportive substrate for barrier and vagal context.",
    },
    {
      label: "Fermented Vegetables",
      food_slug: "fermented-vegetables",
      match_foods: ["fermented vegetables"],
      explanation:
        "Live-culture food providing postbiotic peptides and microbial signals that support vagal and enteric nervous system modulation.",
    },
    {
      label: "Kefir",
      food_slug: "kefir",
      match_foods: ["kefir", "yogurt"],
      explanation:
        "Fermented dairy with diverse live cultures supporting vagal–ENS signalling and gut–brain communication through microbial and postbiotic pathways.",
    },
    {
      label: "Blueberries",
      food_slug: "blueberries",
      match_foods: ["blueberries", "berries"],
      explanation:
        "Polyphenol-rich fruit supporting keystone taxa, microbial turnover, and biotransformation of plant compounds into gut- and mitochondria-relevant metabolites.",
    },
    {
      label: "Salmon",
      food_slug: "salmon",
      match_foods: ["salmon", "sardines", "mackerel"],
      explanation:
        "Omega-3-rich seafood supporting gut barrier tight-junction integrity and limiting gut-derived immune and inflammatory load.",
    },
    {
      label: "Walnuts",
      food_slug: "walnuts",
      match_foods: ["walnuts"],
      explanation:
        "Polyphenol- and fibre-containing nut supporting microbial polyphenol biotransformation and metabolite generation relevant to gut–brain pathways.",
    },
    {
      label: "Greek Yogurt (plain, unsweetened)",
      food_slug: "greek-yogurt",
      match_foods: ["yogurt", "greek yogurt"],
      explanation:
        "Fermented dairy providing live cultures and protein matrix that support vagal–ENS signalling and structured meal patterns for gut rhythm stability.",
    },
  ],
  BRS6: [
    {
      label: "Oats",
      food_slug: "oats",
      match_foods: ["oats"],
      explanation:
        "Rich in β-glucan and slowly digested carbohydrates that support sustained energy availability, glycaemic stability, satiety, and favourable metabolic signalling.",
    },
    {
      label: "Barley",
      food_slug: "barley",
      match_foods: ["barley"],
      explanation:
        "One of the richest whole-food sources of soluble fibre, promoting stable post-meal glucose responses, microbial fermentation, and metabolic flexibility.",
    },
    {
      label: "Lentils",
      food_slug: "lentils",
      match_foods: ["lentils"],
      explanation:
        "Combines slowly digested carbohydrate, protein and fermentable fibre, supporting stable energy delivery, insulin regulation, and appetite control.",
    },
    {
      label: "Chickpeas",
      food_slug: "chickpeas",
      match_foods: ["chickpeas"],
      explanation:
        "Low-glycaemic legume providing protein, fibre and resistant starch that help maintain metabolic stability and reduce post-prandial glucose excursions.",
    },
    {
      label: "Extra Virgin Olive Oil",
      food_slug: "extra-virgin-olive-oil",
      match_foods: ["extra-virgin olive oil", "extra virgin olive oil"],
      explanation:
        "Provides monounsaturated fats and polyphenols that support insulin sensitivity, reduce inflammatory burden, and complement healthy metabolic regulation.",
    },
    {
      label: "Salmon",
      food_slug: "salmon",
      match_foods: ["salmon"],
      explanation:
        "Rich in omega-3 fatty acids and high-quality protein, supporting metabolic resilience, neuroendocrine function, and recovery following physiological stress.",
    },
    {
      label: "Blueberries",
      food_slug: "blueberries",
      match_foods: ["blueberries", "berries"],
      explanation:
        "Polyphenol-rich fruit that supports vascular function, metabolic signalling, and oxidative resilience while providing a low-glycaemic whole-food carbohydrate source.",
    },
    {
      label: "Greek Yogurt (plain, unsweetened)",
      food_slug: "greek-yogurt",
      match_foods: ["yogurt", "greek yogurt"],
      explanation:
        "Provides high-quality protein and a favourable food matrix that supports appetite regulation, metabolic control and structured meal composition.",
    },
  ],
  "BRS-X(ECS)": [
    {
      label: "Eggs",
      food_slug: "eggs",
      match_foods: ["eggs"],
      explanation:
        "Phospholipid- and choline-rich whole food supporting NAPE → NAE biosynthesis and dietary entry into endocannabinoidome precursor pools.",
    },
    {
      label: "Salmon",
      food_slug: "salmon",
      match_foods: ["salmon", "mackerel", "sardines"],
      explanation:
        "Omega-3-rich oily fish supporting DHEA/EPEA-related endocannabinoidome signalling, dopamine neuromodulation, and stress-buffering lipid mediator context.",
    },
    {
      label: "Fish Roe",
      food_slug: "salmon-roe",
      match_foods: ["fish roe", "roe"],
      explanation:
        "Phospholipid-bound DHA source supporting NAPE biosynthesis, omega-3-derived endocannabinoidome signalling, and dopamine-linked neuromodulation.",
    },
    {
      label: "Oats",
      food_slug: "oats",
      match_foods: ["oats"],
      explanation:
        "Whole-grain phospholipid and fibre matrix supporting NAPE precursor availability and endocannabinoid stress-buffering through regular meal-pattern intake.",
    },
    {
      label: "Walnuts",
      food_slug: "walnuts",
      match_foods: ["walnuts"],
      explanation:
        "Plant source of ALA and polyphenols supporting omega-3-derived endocannabinoidome signalling without reliance on pharmacological receptor targeting.",
    },
    {
      label: "Blueberries",
      food_slug: "blueberries",
      match_foods: ["blueberries", "berries"],
      explanation:
        "Polyphenol-rich fruit supporting FAAH-mediated endocannabinoid preservation and diet-sensitive modulation of stress-buffering capacity.",
    },
  ],
  "BRS-X(Hormones)": [
    {
      label: "Oats",
      food_slug: "oats",
      match_foods: ["oats"],
      explanation:
        "Fermentable-fibre whole grain supporting estrobolome regulation, progesterone-supportive microbial metabolism, and metabolic–reproductive hormone integration.",
    },
    {
      label: "Barley",
      food_slug: "barley",
      match_foods: ["barley"],
      explanation:
        "Soluble-fibre grain supporting microbial hormone biotransformation, testosterone signalling stability, and androgen–microbiome regulation.",
    },
    {
      label: "Eggs",
      food_slug: "eggs",
      match_foods: ["eggs"],
      explanation:
        "Complete protein and micronutrient source supporting oestrogen signalling stability, metabolic–reproductive integration, and hormonal milieu through food-first patterns.",
    },
    {
      label: "Broccoli",
      food_slug: "broccoli",
      match_foods: ["broccoli"],
      explanation:
        "Cruciferous vegetable providing sulphur compounds and fibre that support androgen–microbiome regulation and microbial hormone metabolism.",
    },
    {
      label: "Spinach",
      food_slug: "spinach",
      match_foods: ["spinach"],
      explanation:
        "Folate- and magnesium-rich leafy green supporting one-carbon and micronutrient context for hormone synthesis, clearance, and signalling stability.",
    },
  ],
};
