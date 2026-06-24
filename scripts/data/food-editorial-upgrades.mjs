/**
 * Curated Overview + KNH upgrades with standard [n] body citations.
 * refKeys optional — rebuilds ## References when refs were mismatched to claims.
 */
export const FOOD_EDITORIAL_UPGRADES = {
  aubergine: {
    overview: `Aubergine (eggplant) provides **anthocyanin** pigments (notably nasunin in the peel) and fibre at low energy density, contributing polyphenol diversity within plant-forward dietary patterns [1]. Carotenoid and polyphenol bioactives from vegetables participate in antioxidant and anti-inflammatory networks relevant to brain health [1].

Within the BRAIN Diet framework, aubergine is a low-calorie vegetable used for fibre and polyphenol variety; food-derived phenolics can shape gut microbiota composition and metabolite profiles that intersect with neurotransmitter biology [2].`,
    knh: [
      "Peel anthocyanins (e.g. nasunin) contribute antioxidant interest at seasoning-to-side-dish portions [1].",
      "Low energy density with meaningful fibre per 100 g; typical culinary portions are smaller than table values imply.",
      "Polyphenol-class vegetable supporting diverse plant-food intake rather than a single-nutrient role [2].",
      "Pairs with dietary fat in mixed meals to support absorption of co-ingested fat-soluble phytonutrients [1].",
    ],
  },
  avocado: {
    overview: `Avocado is a **monounsaturated-fat-rich** fruit providing oleic acid, fibre, potassium, and fat-soluble-friendly delivery of co-ingested carotenoids when eaten with vegetables [1,2]. Dietary fat supports chylomicron packaging of carotenoids and related absorption pathways [1].

Within the BRAIN Diet framework, avocado functions as a whole-food fat source that improves carotenoid bioavailability from salads and vegetable dishes [2], while contributing fibre and potassium at moderate energy density.`,
    knh: [
      "Monounsaturated-fat matrix supports carotenoid absorption from co-ingested vegetables [1,2].",
      "Fibre and potassium at moderate energy density (~160–200 kcal per 100 g, cultivar-dependent).",
      "Whole-food fat source preferable to refined oils when the goal is meal-matrix micronutrient absorption [2].",
      "Typical portions are much smaller than 100 g; nutrient totals scale with serving size.",
    ],
  },
  "avocado-oil": {
    overview: `Avocado oil is a **monounsaturated-fat** culinary oil (chiefly oleic acid) used for cooking and dressings where a neutral-to-mild flavoured MUFA source is desired [1]. Like other unsaturated fats, it supports micelle and chylomicron formation for fat-soluble nutrients consumed in the same meal [2].

Within the BRAIN Diet framework, avocado oil is a practical fat vehicle for carotenoid-rich salads and vegetables; fat quality and food matrix still matter more than isolated oil intake alone [1].`,
    knh: [
      "High oleic acid content; monounsaturated fats feature in cardiometabolic dietary guidance [1].",
      "Improves carotenoid and fat-soluble nutrient absorption when paired with vegetables [2].",
      "Refined oil — prefer whole avocado when fibre and potassium are also targets.",
      "Use as a cooking/dressing fat in moderation within overall fat-quality patterns [1].",
    ],
  },
  bananas: {
    overview: `Bananas provide **vitamin B6**, **tryptophan**, and **potassium** when ripe, supporting neurotransmitter-related pathways and electrolyte balance [1]. **Green** bananas are comparatively richer in **resistant starch**, a fermentable fibre supporting gut microbiome diversity (downstream SCFA production is a fermentation outcome, not an intrinsic banana nutrient).

Within the BRAIN Diet framework, ripeness is the primary functional selector: ripe fruit for B6/tryptophan patterns; green fruit for prebiotic resistant starch. Bananas are relatively high in **polyphenol oxidase (PPO)**; combining them in fresh smoothies with flavan-3-ol sources can markedly reduce polyphenol bioavailability [1].`,
    knh: [
      "Ripeness shifts role: ripe = B6/tryptophan; green = resistant starch prebiotic fibre.",
      "High PPO activity can reduce flavan-3-ol uptake when blended with polyphenol-rich ingredients [1].",
      "Potassium and moderate carbohydrate content; table values reflect riper fruit.",
      "Typical portions are one medium fruit (~100–120 g), not 100 g table servings alone.",
    ],
  },
  beetroot: {
    overview: `Beetroot provides dietary **nitrates** and **betalain** pigments with interest for vascular and antioxidant biology [1]. Folate and minerals accompany a moderate plant-protein fraction in whole beetroot preparations [2].

Within the BRAIN Diet framework, beetroot fits nitrate-rich vegetable patterns supporting vascular function context; lysine-limited plant protein pairs with legumes or grains for amino-acid balance [2].`,
    knh: [
      "Dietary nitrate source supporting nitric-oxide-related vascular biology (mechanistic dietary context) [1].",
      "Betalain pigments contribute antioxidant interest within vegetable polyphenol intake.",
      "Lysine-limited plant protein (~7 g per 100 g in some products); pair with legumes [2].",
      "Raw or lightly cooked preparations retain more nitrate than prolonged high-heat processing.",
    ],
  },
  "bell-peppers": {
    overview: `Bell peppers provide **vitamin C**, carotenoids (including capsanthin and related pigments), and low energy density [1]. Co-consuming vegetables with a small amount of dietary fat improves carotenoid absorption via chylomicron packaging [2].

Within the BRAIN Diet framework, peppers are a vitamin C–rich vegetable supporting non-heme iron absorption in mixed meals and contributing carotenoid diversity [1,2].`,
    knh: [
      "Very high vitamin C per 100 g among common vegetables; supports non-heme iron absorption in mixed meals [1].",
      "Carotenoid pigments with improved bioavailability when paired with dietary fat [2].",
      "Low energy density; colour (red/yellow/orange) tracks carotenoid profile.",
      "Useful culinary pairing with legumes, grains, and iron-containing plant foods [1].",
    ],
  },
  "black-goji": {
    overview: `Black goji (Lycium ruthenicum) berries are **anthocyanin-rich** fruits with exceptionally high pigment density compared with many common berries [1]. Dietary flavonoid and anthocyanin intake has been associated with cognitive endpoints in controlled feeding contexts [2].

Within the BRAIN Diet framework, black goji is a concentrated polyphenol-class food used in small portions for anthocyanin diversity rather than as a staple calorie source [1,2].`,
    knh: [
      "Anthocyanin-dense berry; pigment content strongly exceeds many common cultivated berries [1].",
      "High-flavonoid dietary patterns link to cognitive improvements in human trials [2].",
      "Low typical serving sizes; nutrient and polyphenol intake scales with portion.",
      "Part of diverse berry/polyphenol strategy rather than a single-source reliance [2].",
    ],
  },
  "black-pepper": {
    overview: `Black pepper provides **piperine**, an alkaloid that markedly increases **curcumin** bioavailability and can enhance absorption of other dietary compounds [1]. It is used as a culinary spice at gram-scale portions rather than as a bulk food.

Within the BRAIN Diet framework, black pepper is primarily a **food synergy** ingredient — especially paired with turmeric — where small amounts improve polyphenol delivery [1].`,
    knh: [
      "Piperine increases curcumin bioavailability in humans [1].",
      "Spice-use portions; USDA per-100 g protein values are not meaningful for typical intake.",
      "Synergy ingredient for turmeric-containing meals and polyphenol-rich dishes [1].",
      "Store as whole peppercorns when possible; grind fresh to preserve volatile compounds.",
    ],
  },
  "black-tea": {
    overview: `Black tea provides **theaflavins** and **catechins** (lower than green tea for unoxidised catechins) and caffeine in a polyphenol-rich beverage matrix [1]. High-polyphenol dietary patterns, including tea polyphenols, have been studied for metabolic and cognitive endpoints [2].

Within the BRAIN Diet framework, black tea is a flavonoid beverage best used without excess sugar; timing may matter for caffeine-sensitive individuals [1]. Polyphenol-rich drinks can reduce non-heme iron absorption if taken with iron-rich plant meals.`,
    knh: [
      "Theaflavin/catechin-class polyphenols; oxidation level differs from green tea [1].",
      "High-polyphenol Mediterranean-style patterns associate with metabolic benefits in trials [2].",
      "Contains caffeine; separate from iron-rich plant meals if optimising non-heme iron absorption.",
      "Low energy when unsweetened; flavonoid yield varies by brew time and leaf grade.",
    ],
  },
  broccoli: {
    overview: `Broccoli is a cruciferous vegetable providing **sulforaphane** precursors (glucoraphanin), **folate**, and sulfur compounds supporting glutathione-linked antioxidant networks [1]. Isothiocyanates from crucifers activate Nrf2-associated cytoprotective gene programmes [1].

Within the BRAIN Diet framework, broccoli contributes folate and crucifer phytonutrients at low energy density; light cooking or chewing-dependent myrosinase activity affects sulforaphane yield [2].`,
    knh: [
      "Glucoraphanin → sulforaphane pathway; Nrf2-activating isothiocyanate interest [1].",
      "Folate and vitamin C at low energy density (~34 kcal per 100 g raw) [2].",
      "Sulfur-containing vegetable supporting glutathione precursor intake [1].",
      "Chewing/light cooking preserves myrosinase-dependent sulforaphane formation.",
    ],
  },
  "broccoli-sprouts": {
    overview: `Broccoli sprouts are concentrated sources of **glucoraphanin** and active **myrosinase**, delivering higher sulforaphane potential per gram than mature broccoli when handled appropriately [1]. They are used as a functional crucifer garnish or short-grown sprout food.

Within the BRAIN Diet framework, sprouts are a sulforaphane-focused ingredient with meaningful food-safety considerations (fresh sprout handling); typical portions are small [1].`,
    knh: [
      "Among the densest practical glucoraphanin sources for sulforaphane delivery [1].",
      "Requires active myrosinase (fresh chewing or careful preparation) for ITC conversion [1].",
      "Typical servings are tablespoons, not 100 g portions.",
      "Fresh sprout food-safety handling matters for immunocompromised individuals.",
    ],
  },
  "brussels-sprouts": {
    overview: `Brussels sprouts are cruciferous vegetables providing glucosinolate-derived **isothiocyanates**, **folate**, and fibre at moderate energy density [1]. Crucifer sulfur compounds support glutathione-linked antioxidant strategies [1].

Within the BRAIN Diet framework, Brussels sprouts contribute folate and crucifer diversity; folate supports methylation and neurochemical synthesis pathways [2].`,
    knh: [
      "Crucifer isothiocyanate / Nrf2 pathway interest similar to broccoli [1].",
      "Folate and fibre at ~43 kcal per 100 g; supports one-carbon nutrient intake [2].",
      "Sulfur-containing vegetable within glutathione precursor strategies [1].",
      "Roasting acceptable; excessive charring increases heat-derived compounds.",
    ],
  },
  butter: {
    overview: `Butter is a **saturated-fat-rich** dairy fat used for culinary flavour and fat-soluble vitamin delivery (vitamins A, D, E, K when present) [1]. Saturated fat intake is recommended within upper limits in cardiometabolic dietary guidance [1].

Within the BRAIN Diet framework, butter is a strategic fat for small-portion use; overall dietary pattern quality and plant-food volume matter more than isolated saturated fat sources [2].`,
    knh: [
      "Saturated fat source; keep within guideline limits for SFA intake [1].",
      "Fat-soluble vitamin vehicle in whole-dairy matrix.",
      "Prefer culinary amounts; not a primary BRAIN Diet staple fat.",
      "Plant-forward patterns with limited animal saturated fat align with sustainable healthy diet frameworks [2].",
    ],
  },
  cabbage: {
    refKeys: ["houghton_sulforaphane_2016", "yeo_influence_2023"],
    overview: `Cabbage is a cruciferous vegetable providing **glucosinolates**, **vitamin C**, **folate**, and fibre at very low energy density [1]. Fermented cabbage (sauerkraut) delivers **Lactobacillus**-rich fermented vegetable matrices supporting gut microbiome diversity as part of fermented-food patterns [2].

Within the BRAIN Diet framework, cabbage is useful fresh or fermented: fresh for crucifer phytonutrients and vitamin C; fermented for probiotic-adjacent dietary patterns where food-derived bioactives modulate gut microbiota [2].`,
    knh: [
      "Crucifer glucosinolate/isothiocyanate pathways linked to Nrf2 biology [1].",
      "Very low energy density (~25 kcal per 100 g) with vitamin C and fibre.",
      "Fermented forms (sauerkraut) support fermented-vegetable diversity for gut microbiota modulation [2].",
      "Raw, lightly cooked, or fermented preparations preserve different bioactive fractions.",
    ],
  },
  "cacao-nibs-raw": {
    overview: `Raw cacao nibs are minimally processed cacao pieces rich in **cocoa flavanols** (epicatechin, catechin) and fibre, used as a bitter garnish [1]. Flavanol retention is generally higher in minimally processed cacao than heavily alkalised cocoa powders [1].

Within the BRAIN Diet framework, nibs are a polyphenol-dense ingredient in small portions; cocoa flavanols have vascular mechanistic interest [2], and heavy-metal variability across cacao products makes sourcing relevant for regular use [3].`,
    knh: [
      "Minimally processed cacao retains more native flavan-3-ols than alkalised cocoa [1].",
      "Epicatechin-class flavanols with vascular mechanistic human data [2].",
      "High fibre and mineral density per 100 g; typical use is garnish-scale portions.",
      "Heavy-metal (Cd/Pb) sourcing matters for frequent cacao intake [3].",
    ],
  },
  capers: {
    overview: `Capers are among the richest common food sources of **quercetin**, a flavonoid polyphenol studied for antioxidant and anti-inflammatory roles in diet-derived bioactive networks [1]. They are used as a condiment at small portions rather than as a bulk calorie source.

Within the BRAIN Diet framework, capers are a high-quercetin seasoning supporting polyphenol diversity; high-flavonoid dietary patterns have been associated with cognitive endpoints in controlled trials [2]. Pickled varieties can be high in sodium — rinsing may be appropriate.`,
    knh: [
      "Among the highest quercetin concentrations per 100 g of common foods (condiment-use portions) [1].",
      "Low energy density (~27 kcal per 100 g); practical intake is seasoning-scale.",
      "Flavonoid-rich dietary patterns link to cognitive improvements in human trials [2].",
      "Rinse high-sodium pickled capers; buying jars preserved in extra virgin olive oil is an even better strategy; use as a polyphenol booster in Mediterranean-style dishes.",
    ],
  },
  carrots: {
    overview: `Carrots provide **beta-carotene** and other carotenoids at low energy density; carotenoid bioaccessibility from raw vegetables is limited and improved by cooking and co-ingested fat [1,2]. Carotenoids participate in antioxidant and neuroprotective dietary patterns [3].

Within the BRAIN Diet framework, carrots are a carotenoid vegetable best used with a small amount of unsaturated fat in mixed meals to support absorption [2].`,
    knh: [
      "Beta-carotene-rich root vegetable; bioaccessibility increases with cooking and fat co-ingestion [1,2].",
      "Carotenoids implicated in neuroprotective antioxidant networks [3].",
      "Low energy density with meaningful fibre per 100 g.",
      "Pair with olive oil, avocado, or other fats in salads and cooked dishes [2].",
    ],
  },
  cashews: {
    overview: `Cashews provide plant protein, **magnesium**, **zinc**, and unsaturated fats in a tree-nut matrix [1]. Soaking and sprouting can reduce **phytates**, improving mineral bioavailability from nuts and seeds [1].

Within the BRAIN Diet framework, cashews are a lysine-limited plant protein source paired with legumes or grains for amino-acid complementarity.`,
    knh: [
      "Magnesium and zinc in a tree-nut matrix; typical portions are 30–40 g, not 100 g.",
      "Lysine-limited plant protein; pair with legumes for amino-acid balance.",
      "Soaking/sprouting reduces phytates and can improve mineral bioavailability [1].",
      "Unsaturated fat source; energy-dense — portion control matters.",
    ],
  },
  cauliflower: {
    overview: `Cauliflower is a cruciferous vegetable providing glucosinolate-derived compounds, **vitamin C**, **folate**, and fibre at very low energy density [1]. Crucifer isothiocyanates activate Nrf2-linked antioxidant gene networks [1].

Within the BRAIN Diet framework, cauliflower is a low-calorie crucifer substitute in diverse vegetable patterns; folate supports methylation-related pathways [2].`,
    knh: [
      "Crucifer isothiocyanate / Nrf2 interest at very low energy density [1].",
      "Vitamin C and folate per 100 g; useful in low-carb vegetable diversity [2].",
      "Milder flavour than broccoli; still requires glucosinolate → ITC conversion for sulforaphane-class effects [1].",
      "Roasting acceptable; avoid heavy charring of any crucifer.",
    ],
  },
  "chamomile-tea": {
    overview: `Chamomile tea provides **apigenin**, a flavone that binds benzodiazepine-site receptors and is studied for calm and sleep-supportive effects [1]. It is a caffeine-free herbal infusion used in evening wind-down patterns.

Within the BRAIN Diet framework, chamomile is a herbal polyphenol beverage used for relaxation context rather than micronutrient density [1].`,
    knh: [
      "Apigenin-rich herbal infusion with GABAergic receptor-binding interest [1].",
      "Caffeine-free evening beverage option.",
      "Polyphenol yield varies with steep time and flower quality.",
      "Culinary/tea doses differ from concentrated extract trials [1].",
    ],
  },
  "cheddar-cheese": {
    overview: `Cheddar cheese provides **complete protein**, **calcium**, **vitamin B12**, and **zinc** in a fermented dairy matrix [1]. Fermented dairy foods contribute live and postbiotic bacterial metabolites relevant to gut microbiota patterns [2].

Within the BRAIN Diet framework, cheddar is a nutrient-dense dairy protein used in modest portions; saturated fat and sodium content warrant portion awareness [1].`,
    knh: [
      "Complete animal protein with calcium and vitamin B12 [1].",
      "Fermented dairy matrix with microbiota-modulating interest [2].",
      "Energy-dense; typical portions are 30–40 g, not 100 g.",
      "Aged varieties are lower lactose; sodium varies by product.",
    ],
  },
  cherries: {
    overview: `Cherries (especially tart varieties) provide **anthocyanins**, **melatonin**, and polyphenols studied in sleep and recovery contexts [1]. Berry-class polyphenols have systematic-review support for cognitive performance endpoints in aging [2].

Within the BRAIN Diet framework, cherries are a polyphenol fruit used fresh, frozen, or as tart juice in targeted portions rather than as a primary calorie source [1,2].`,
    knh: [
      "Anthocyanin-rich stone fruit; tart varieties noted for melatonin interest [1].",
      "Berry polyphenol cognitive evidence from systematic reviews [2].",
      "Frozen whole cherries preserve polyphenols better than juice-only patterns.",
      "Low energy density fresh; juice concentrates sugar — portion accordingly.",
    ],
  },
  "chia-seeds": {
    overview: `Chia seeds provide **ALA omega-3**, **fibre**, and plant protein in a hydrophilic seed matrix [1]. They are lysine-limited like most nuts/seeds and pair with legumes for amino-acid balance [2].

Within the BRAIN Diet framework, chia is a fibre and ALA source used in puddings, yogurts, and baked goods; hydration forms a gel that slows gastric emptying.`,
    knh: [
      "ALA omega-3 and very high fibre per 100 g; typical portions are 1–2 tablespoons [1].",
      "Lysine-limited plant protein; pair with legumes [2].",
      "Gel formation when soaked; useful soluble-fibre addition.",
      "Energy-dense; 100 g table values exceed normal serving sizes.",
    ],
  },
  chicken: {
    overview: `Chicken provides **niacin (vitamin B3)** for NAD⁺ synthesis, **zinc**, and amino acids including **tryptophan**, supporting neurotransmitter synthesis and mitochondrial function [1]. Niacin feeds NAD⁺ salvage pathways relevant to ATP production and cognitive energy metabolism [1].

Within the BRAIN Diet framework, chicken is a flexible protein base; large neutral amino acid balance affects tryptophan brain uptake in mixed meals [2]. Pair with fibre- and polyphenol-rich plants; gentler cooking preserves B vitamins [1,2].`,
    knh: [
      "Complete, highly digestible animal protein with niacin and zinc [1].",
      "Tryptophan source; LNAA competition affects serotonin-pathway routing [2].",
      "Lower heme-iron density than red meat; lower saturated fat when skin limited.",
      "Processing level matters: minimally processed cuts differ from cured/deli products.",
    ],
  },
  chickpeas: {
    overview: `Chickpeas provide **lysine-rich** plant protein, **fibre**, **folate**, and **iron** in a legume matrix [1]. Soaking and cooking reduce **phytates**, improving mineral bioavailability [1].

Within the BRAIN Diet framework, chickpeas are methionine-limited and pair with grains for complete essential amino-acid coverage.`,
    knh: [
      "Lysine-rich legume protein; methionine/cysteine limiting (DIAAS ~65–70) [1].",
      "Fibre and folate at moderate energy density.",
      "Soaking/cooking reduces phytates and improves iron/zinc bioavailability [1].",
      "Pair with vitamin C-rich foods to enhance non-heme iron absorption.",
    ],
  },
  "chicory-root": {
    overview: `Chicory root is a concentrated source of **inulin**, a fermentable prebiotic fibre supporting **Bifidobacterium** and related taxa [1]. Prebiotic fibres have been studied for gut–brain axis markers including cortisol response [2].

Within the BRAIN Diet framework, chicory root (and inulin ingredients) support fermentable-fibre diversity; typical use is as roasted drink or inulin additive rather than whole-root bulk intake [1,2].`,
    knh: [
      "High inulin content — fermentable prebiotic fibre [1].",
      "Prebiotic intake studied for cortisol and emotional-bias endpoints [2].",
      "Roasted chicory beverage is caffeine-free coffee substitute.",
      "Introduce gradually to limit fermentative GI discomfort.",
    ],
  },
  chlorella: {
    overview: `Chlorella is a **microalgae** providing protein, chlorophyll, and bioavailable **vitamin B12** (true cobalamin forms in validated preparations) unlike many spirulina products [1]. It is used in supplement-scale portions for micronutrient and protein density.

Within the BRAIN Diet framework, chlorella can help close B12 gaps in plant-forward patterns when a validated algae source is used [1].`,
    knh: [
      "Microalgae protein with validated true B12 in some preparations [1].",
      "Very high table protein per 100 g; typical use is supplement grams/day.",
      "Source quality matters for B12 form (cobalamin vs analogues).",
      "Introduce gradually; GI tolerance varies.",
    ],
  },
  cilantro: {
    overview: `Cilantro (coriander leaves) provides **polyphenols** and culinary antioxidants in an herb matrix with very low energy density [1]. Food-derived phenolics from herbs and vegetables modulate gut microbiota and neurotransmitter-related pathways [2].

Within the BRAIN Diet framework, cilantro is a flavour and polyphenol herb used fresh as a garnish rather than for bulk nutrient intake [1,2].`,
    knh: [
      "Fresh herb polyphenols at negligible calorie contribution [1].",
      "Culinary garnish increasing phytochemical diversity [2].",
      "Fat-soluble flavour compounds released in oily dressings.",
      "Genetic taste variation (soapiness) affects palatability, not nutrient profile.",
    ],
  },
  cinnamon: {
    overview: `Cinnamon provides **polyphenols** (including proanthocyanidins) studied for glycaemic and metabolic endpoints [1]. Cassia cinnamon contains **coumarin** — regular high intake may warrant Ceylon varieties for frequent use.

Within the BRAIN Diet framework, cinnamon is a spice used in 1–3 g/day culinary or therapeutic contexts rather than as a bulk food [1].`,
    knh: [
      "Polyphenol-rich spice with glycaemic-control research interest [1].",
      "Typical doses are 1–3 g/day; not 100 g USDA portions.",
      "Cassia vs Ceylon matters for coumarin exposure with frequent use.",
      "Pair with carbohydrate-containing meals in glycaemic-management patterns [1].",
    ],
  },
  cockles: {
    overview: `Cockles are small bivalve shellfish providing **vitamin B12**, **iron**, **zinc**, **selenium**, and **taurine** in a low-fat marine protein matrix [1,2]. Shellfish contribute complete highly digestible protein [3].

Within the BRAIN Diet framework, cockles are a sustainable shellfish option used for B12, iron, and marine taurine density; brief steaming preserves the natural liquor minerals [1,2].`,
    knh: [
      "Very high vitamin B12 and iron per 100 g; bivalve nutrient density [1].",
      "Marine taurine source; phospholipid-bound omega-3 in shellfish matrices [2].",
      "Complete animal protein (DIAAS context) [3].",
      "Low mercury compared with many large predatory fish; purge and steam briefly.",
    ],
  },
  "coconut-oil": {
    overview: `Coconut oil is a **saturated-fat-rich** oil high in **medium-chain triglycerides (MCTs)** used for culinary and ketogenic contexts [1]. Saturated fat intake should remain within dietary upper limits [1].

Within the BRAIN Diet framework, coconut oil is an occasional culinary fat; evidence for brain-specific benefit beyond energy metabolism is limited — overall fat quality and plant-food volume matter more [2].`,
    knh: [
      "High in saturated fat and MCTs (C8/C10 fractions vary by product) [1].",
      "MCTs provide rapidly oxidised fatty acids; ketogenic contexts only.",
      "Not a preferred default cooking fat vs olive/avocado oils for cardiometabolic patterns [2].",
      "Energy-dense; typical use is tablespoons, not 100 g.",
    ],
    refKeys: ["li_saturated_2015", "schwingshackl_monounsaturated_2014"],
  },
  coffee: {
    overview: `Coffee provides **caffeine**, a adenosine-receptor antagonist that increases striatal **dopamine D2/D3 receptor availability** and acute alertness [1]. Coffee polyphenols contribute to dietary flavonoid intake [2].

Within the BRAIN Diet framework, coffee is a polyphenol beverage used morning-to-midday; caffeine timing affects sleep — stop ~8 hours before bed if sensitive [1]. Avoid taking with iron-rich plant meals if optimising non-heme iron absorption.`,
    knh: [
      "Caffeine modulates dopamine receptor availability and alertness [1].",
      "Chlorogenic-acid polyphenols add flavonoid intake [2].",
      "Timing matters for sleep; individual caffeine metabolism varies.",
      "Unsweetened brews only; polyphenol–iron absorption competition with meals.",
    ],
  },
  "cordyceps-mushroom": {
    overview: `Cordyceps mushrooms (including *Cordyceps militaris* cultivars) provide **polysaccharides** and **cordycepin** studied for energy-metabolism and immunomodulatory endpoints [1]. They are used as a functional mushroom in extract or culinary forms.

Within the BRAIN Diet framework, cordyceps is a medicinal-mushroom adjunct; evidence in humans is emerging and doses are often extract-based rather than whole-food 100 g portions [1].`,
    knh: [
      "Cordycepin and polysaccharide bioactives in functional mushroom matrices [1].",
      "Traditional use for vitality/endurance; human RCT evidence still limited.",
      "Extract vs whole-mushroom doses differ materially from USDA 100 g tables.",
      "Source cultivation method (*militaris* vs *sinensis*) affects compound profile.",
    ],
  },
  corn: {
    overview: `Corn provides **lutein** and **zeaxanthin** carotenoids relevant to macular and cognitive dietary patterns [1,2]. Carotenoid absorption improves with co-ingested dietary fat [3].

Within the BRAIN Diet framework, corn is a whole-grain/starchy vegetable contributing carotenoid diversity; sweet corn and maize products differ in sugar and processing [1,2,3].`,
    knh: [
      "Lutein and zeaxanthin source; cognitive and visual dietary interest [1,2].",
      "Carotenoid absorption improved with dietary fat at the same meal [3].",
      "Whole kernel and polenta forms retain more fibre than refined corn products.",
      "Choose minimally processed forms; pairing with beans completes amino-acid profile.",
    ],
  },
  cranberries: {
    overview: `Cranberries provide **proanthocyanidins (PACs)** and anthocyanins with urinary-tract and polyphenol interest [1]. Berry-class flavonoids have cognitive systematic-review support in aging populations [2].

Within the BRAIN Diet framework, cranberries are used fresh, frozen, or as low-sugar preparations; juice cocktails with added sugar reduce BRAIN Diet alignment.`,
    knh: [
      "PAC-rich berry with urinary-tract polyphenol interest [1].",
      "Berry flavonoid cognitive evidence from systematic reviews [2].",
      "Very tart fresh — low-sugar preparations preferred.",
      "Dried sweetened cranberries are dessert-tier, not polyphenol staples.",
    ],
  },
  cucumber: {
    overview: `Cucumber provides **water**, **vitamin K**, modest **vitamin C**, and very low energy density [1]. As a hydrating vegetable, it supports volume and phytochemical diversity within plant-forward patterns [2].

Within the BRAIN Diet framework, cucumber is a low-calorie hydration vegetable; peel-on varieties add fibre and polyphenols.`,
    knh: [
      "Very high water content; low energy (~15 kcal per 100 g).",
      "Vitamin K in whole-cucumber preparations with peel [1].",
      "Supports meal volume and hydration in plant-forward patterns [2].",
      "Pair with fat-containing dressings when co-ingesting fat-soluble nutrients from salads.",
    ],
  },
}
