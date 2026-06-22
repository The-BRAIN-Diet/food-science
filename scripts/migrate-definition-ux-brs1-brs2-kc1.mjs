#!/usr/bin/env node
/**
 * Migrate §1 Definition to paragraph + 3 bullets (mechanism-page-section-prose.md).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs/biological-targets");

const UPDATES = {
  "brs2/kc/brs2-kc1-one-carbon-donor-pool.mdx": {
    summary:
      "Ensures the body has enough methyl-group donors to sustain homocysteine recycling, SAMe production, and the many methylation reactions required for brain function, cellular maintenance, and metabolic regulation. Depletion of this shared pool can constrain multiple pathways simultaneously.",
    definition: `Ensures the body has enough methyl-group donors to sustain homocysteine recycling, SAMe production, and the many methylation reactions required for brain function, cellular maintenance, and metabolic regulation. Depletion of this shared pool can constrain multiple pathways simultaneously.

* Underpins neurotransmitter and monoamine pathway methylation support — Supporting BRS1.
* Constrains membrane phospholipid methylation and omega-3 carriage — within BRS2.
* Influences epigenetic regulation, repair, and metabolic adaptation — Supporting BRS4.`,
    heading: "### 1. Definition",
    nextHeading: "### 2. Constraint Role",
  },
  "brs1/kc/brs1-kc1-amino-acid-quality-and-competitive-balance.mdx": {
    definition: `Helps ensure neurotransmitter-relevant amino acids are present in the right quality and balance across your diet. Poor amino-acid completeness or competitive imbalance can limit precursor adequacy and brain transport context even when total protein intake is adequate.

* Sustains catecholaminergic and serotonergic precursor availability across meals — within BRS1.
* Shapes competitive large neutral amino-acid transport context at the blood–brain barrier — within BRS1.
* Constrains GABA and glutamate precursor adequacy when indispensable amino-acid coverage is weak — within BRS1.`,
    heading: "### 1. Definition",
    nextHeading: "### 2. Constraint Role",
  },
  "brs1/fm1/brs1-fm1-monoaminergic-function.mdx": {
    definition: `Supports attention, motivation, arousal, emotional regulation, and behavioural control through the brain's dopamine, noradrenaline, and serotonin systems. Stable monoaminergic signalling underpins many day-to-day cognitive and emotional functions.

* Links dietary protein patterns to dopamine, noradrenaline, and serotonin precursor supply — within BRS1.
* Supports attention, arousal, and emotional regulation through coordinated monoaminergic signalling — within BRS1.
* Connects meal-level amino-acid biology to executive function and behavioural control contexts — Supporting BRS6.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm2/brs1-fm2-cholinergic-function.mdx": {
    definition: `Supports attention, working memory, and cognitive precision through the brain's cholinergic signalling system. Dietary choline and cholinergic substrate support help maintain the biochemical foundation for learning-focused brain activity.

* Supports acetylcholine synthesis from dietary choline for learning-focused brain activity — within BRS1.
* Contributes to attention and working-memory cholinergic signalling — within BRS1.
* Intersects phospholipid substrate pools relevant to membrane chemistry — Supporting BRS2.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx": {
    definition: `Supports healthy neuronal membranes and the long-chain fats the brain needs for stable signalling. Getting omega-3s to the brain in the right carrier form helps maintain membrane flexibility and structural integrity over time.

* Delivers long-chain omega-3 fats to the brain in carrier forms suited to barrier transport — within BRS1.
* Supports neuronal membrane flexibility and structural lipid integrity — within BRS1.
* Creates the membrane environment in which neurotransmitter receptors and signalling operate — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm4/brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation.mdx": {
    definition: `Helps the brain maintain stable neural activity by balancing excitatory and inhibitory signalling. Good excitation–inhibition balance supports focus, emotional control, and resistance to sensory overwhelm.

* Supports inhibitory tone through GABA-related pathways — within BRS1.
* Helps manage excitatory glutamate load and neural overstimulation — within BRS1.
* Contributes to stable attention, emotional control, and sensory regulation — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx": {
    definition: `Helps ensure the brain has enough of the right amino acids from your meals to support neurotransmitter production and stable signalling. Getting protein quantity, quality, and meal distribution right matters for the biochemical foundation of attention, mood, and cognitive control.

* Provides the amino-acid foundation for catecholamine and serotonin precursor supply — within BRS1.
* Supports meal-level protein quality and distribution that underpin stable neurotransmitter biology — within BRS1.
* Depends on broader dietary amino-acid completeness represented by KC1 — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx": {
    definition: `Influences which amino acids reach the brain after a meal by shaping competitive transport at the blood-brain barrier. Meal composition can shift whether tyrosine, tryptophan, and other precursors are favourably or unfavourably presented for brain entry.

* Shapes which aromatic amino acids compete for brain entry after meals — within BRS1.
* Influences tyrosine and tryptophan delivery bias relevant to monoamine pathways — within BRS1.
* Links carbohydrate–protein meal structure to blood–brain barrier transport context — Supporting BRS6.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm1/brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation.mdx": {
    definition: `Supports alertness, focus, and executive control through norepinephrine — a key signal for attention and arousal. Stable noradrenergic signalling helps the brain maintain appropriate vigilance and cognitive engagement.

* Supports alertness and attention through norepinephrine signalling pathways — within BRS1.
* Helps maintain executive engagement and arousal appropriate to task demands — within BRS1.
* Operates downstream of precursor availability and LAT1 transport represented in sibling PMs — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation.mdx": {
    definition: `Helps support emotional regulation, stress resilience, and behavioural control through serotonin-related brain signalling. Stable serotonergic activity contributes to mood stability, inhibition, and sleep-compatible neurochemistry.

* Supports emotional regulation and stress resilience through serotonin-related signalling — within BRS1.
* Contributes to behavioural inhibition and mood stability — within BRS1.
* Intersects sleep-compatible neurochemistry and broader monoaminergic balance — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support.mdx": {
    definition: `Supports attention, working memory, and cognitive precision by helping the brain convert dietary choline into acetylcholine. Choline-rich foods provide the substrate for a signalling system central to learning and focus.

* Converts dietary choline into acetylcholine for learning and focus — within BRS1.
* Supports attention and working-memory cholinergic signalling — within BRS1.
* Draws on choline and phospholipid substrates that intersect membrane chemistry — Supporting BRS2.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation.mdx": {
    definition: `Helps supply the brain with DHA and integrate it into neuronal membranes over time, supporting membrane flexibility and the structural environment in which neural signalling occurs. Habitual omega-3 intake and phospholipid-carrier form matter more than isolated high-dose episodes.

* Supplies DHA to neuronal membranes supporting flexible, signal-ready brain structure — within BRS1.
* Depends on habitual omega-3 intake and phospholipid-bound carrier forms over time — within BRS1.
* Links dietary fat patterns to the membrane environment of neurotransmitter signalling — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance.mdx": {
    definition: `Helps maintain the balance between brain excitation and inhibition — a foundation for attention, emotional control, and stable reactivity. When inhibitory and excitatory signalling are well matched, neural networks operate with greater stability.

* Balances excitatory glutamate and inhibitory GABA tone for network stability — within BRS1.
* Supports attention and emotional control through matched inhibition and excitation — within BRS1.
* Provides the regulatory foundation for sibling synthesis and clearance PMs — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity.mdx": {
    definition: `Supports inhibitory tone by helping the brain convert glutamate into GABA — the principal inhibitory neurotransmitter. Adequate GABA synthesis capacity helps maintain calm, control, and resistance to overstimulation.

* Converts glutamate to GABA to strengthen inhibitory calming signals — within BRS1.
* Supports resistance to overstimulation and sensory overload — within BRS1.
* Depends on cofactor and amino-acid context from broader dietary patterns — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling.mdx": {
    definition: `Helps protect neural circuits from excessive excitatory drive by clearing and recycling glutamate. Effective glutamate control supports stable signalling and reduces risk of excitatory overload.

* Clears and recycles glutamate to prevent excitatory build-up — within BRS1.
* Protects neural circuits from sustained excitatory drive — within BRS1.
* Supports stable signalling downstream of excitation–inhibition balance — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/fm4/brs1-fm4-pm10-excitotoxicity-modulation.mdx": {
    definition: `Helps protect the brain from excessive excitatory stress when glutamatergic drive becomes too strong. Modulating excitotoxic pressure supports neural stability and cognitive regulation over time.

* Helps limit neural stress risk when glutamatergic drive becomes excessive — within BRS1.
* Supports long-term cognitive and regulatory stability under excitatory load — within BRS1.
* Connects dietary amino-acid context to endogenous excitatory buffering capacity — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
  "brs1/sm/brs1-sm-snp1-comt-catecholamine-clearance-sensitivity.mdx": {
    definition: `Helps explain why some people may be more sensitive to tyrosine-rich meals, competitive amino-acid transport, and noradrenergic arousal context based on genetic variation in catecholamine clearance. COMT genotype modulates how stable BRS1 monoaminergic biology is read — not whether it works.

* Explains why some individuals may clear catecholamines more slowly after tyrosine-rich meals — within BRS1.
* Modulates interpretation of noradrenergic arousal without changing core pathway biology — within BRS1.
* Highlights when competitive amino-acid transport context may matter more for attention — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Phenome Connections",
  },
  "brs1/sm/brs1-sm-snp2-apoe4-omega-3-brain-delivery-sensitivity.mdx": {
    definition: `Helps explain why omega-3 supplementation and brain DHA delivery may appear less effective in some people carrying the APOE4 variant. Genotype-sensitive reading prevents over-interpreting uniform trial results.

* Explains why brain DHA enrichment may differ between APOE4 carriers and non-carriers — within BRS1.
* Prevents over-reading uniform omega-3 trial results in mixed-genotype groups — within BRS1.
* Supports phospholipid-carrier and choline context when interpreting delivery efficiency — Supporting BRS2.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Phenome Connections",
  },
  "brs1/sm/brs1-sm-phen1-excitatory-inhibitory-stability-sensory-regulation.mdx": {
    definition: `Helps interpret sensory overwhelm, reactivity, and difficulty maintaining inhibitory control when excitatory–inhibitory balance is under strain. Connected BRS1 mechanisms may support regulatory stability through meal and dietary patterns.

* Frames sensory overwhelm as a pattern linked to excitation–inhibition strain — within BRS1.
* Connects GABA–glutamate biology to regulatory stability without diagnostic claims — within BRS1.
* Supports diet-pattern interpretation for inhibitory tone and excitatory clearance — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Phenome Connections",
  },
  "brs1/sm/brs1-sm-phen2-emotional-dysregulation-monoaminergic-interpretation.mdx": {
    definition: `Helps interpret patterns of emotional reactivity, affective instability, and difficulty maintaining emotional control under stress — a major but often underacknowledged dimension of ADHD. Emotional dysregulation is a functional phenotype pattern, not a single neurotransmitter pathway.

* Interprets emotional reactivity as a phenotype spanning multiple monoaminergic pathways — within BRS1.
* Links serotonergic and noradrenergic biology to affective stability context — within BRS1.
* Avoids reducing emotional dysregulation to a single neurotransmitter model — within BRS1.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Phenome Connections",
  },
  "brs1/sm/brs1-sm-cross1-histaminergic-arousal-neuroimmune-crosstalk.mdx": {
    definition: `Helps interpret how wakefulness, vigilance, and attentional readiness are influenced by histamine — a brain arousal signal that also responds to immune, gut, and circadian inputs. Understanding this cross-system biology helps read attention and sleep–wake patterns in context.

* Integrates wakefulness and vigilance with immune and gut-derived inflammatory context — Supporting BRS3.
* Connects histamine biology to attention interpretation across sleep–wake cycles — Supporting BRS6.
* Maps gut-barrier and microbial interface effects on arousal without a single-mechanism claim — Supporting BRS5.`,
    heading: "## 1. Definition",
    nextHeading: "## 2. Primary Biological Effects",
  },
};

function replaceDefinitionSection(content, { heading, nextHeading, definition }) {
  const re = new RegExp(
    `(${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n\\n)[\\s\\S]*?(\\n${nextHeading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "m",
  );
  if (!re.test(content)) {
    throw new Error(`Definition block not found (${heading} -> ${nextHeading})`);
  }
  return content.replace(re, `$1${definition}\n$2`);
}

function updateSummary(frontmatter, summary) {
  if (!summary) return frontmatter;
  if (!frontmatter.includes("summary:")) return frontmatter;
  return frontmatter.replace(
    /^summary:\s*>-\s*\n(?:\s+.*\n)*|^summary:\s*['"][^'"]*['"]\s*\n|^summary:\s*[^\n]+\n/m,
    `summary: >-\n  ${summary.replace(/\n/g, "\n  ")}\n`,
  );
}

for (const [rel, cfg] of Object.entries(UPDATES)) {
  const filePath = path.join(docs, rel);
  const raw = fs.readFileSync(filePath, "utf8");
  const fmEnd = raw.indexOf("---", 3);
  const fm = raw.slice(0, fmEnd + 3);
  const body = raw.slice(fmEnd + 3);
  const newBody = replaceDefinitionSection(body, cfg);
  const newFm = cfg.summary ? updateSummary(fm, cfg.summary) : fm;
  fs.writeFileSync(filePath, `${newFm}${newBody}`, "utf8");
  console.log(`updated: ${rel}`);
}

console.log(`\nDone. ${Object.keys(UPDATES).length} files updated.`);
