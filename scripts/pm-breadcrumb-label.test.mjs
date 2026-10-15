import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"
import test from "node:test"

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const source = fs.readFileSync(path.join(ROOT, "src/theme/DocBreadcrumbs/index.js"), "utf8")

function loadLabelFn() {
  const start = source.indexOf("const CANONICAL_PM_ID")
  const end = source.indexOf("function addParentFmBreadcrumb")
  assert.ok(start > 0 && end > start)
  const body = source.slice(start, end).replace("export function", "function")
  return new Function(`${body}; return pmFinalBreadcrumbLabel;`)()
}

const label = loadLabelFn()
const gaba = "/docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity"
const dopamine = "/docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation"
const plasticity = "/docs/biological-targets/brs1/fm5/brs1-fm5-pm12-synaptic-structural-plasticity"

test("published PM breadcrumbs take the number from the canonical id", () => {
  assert.equal(label("BRS1-FM4-PM9", "GABA Synthesis Capacity", gaba), "PM9 — GABA Synthesis Capacity")
  assert.equal(label("BRS1-FM1-PM3", "Dopaminergic Signalling Regulation", dopamine), "PM3 — Dopaminergic Signalling Regulation")
  assert.equal(label("BRS1-FM5-PM12", "Synaptic Structural Plasticity", plasticity), "PM12 — Synaptic Structural Plasticity")
  assert.equal(label("BRS6-FM1-PM1", "Glucose Appearance Kinetics", "/docs/biological-targets/brs6/fm1/brs6-fm1-pm1-glucose-appearance-kinetics/"), "PM1 — Glucose Appearance Kinetics")
  assert.equal(label("BRS-X(Hormones-PM1)", "Oestrogen Signalling Stability", "/docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm1-oestrogen-signalling-stability"), "PM1 — Oestrogen Signalling Stability")
  assert.equal(label("BRS-X(ECS-PM5)", "Endocannabinoid Stress-Buffering Capacity", "/docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm5-endocannabinoid-stress-buffering-capacity"), "PM5 — Endocannabinoid Stress-Buffering Capacity")
  assert.equal(label("BRS-X(Circadian-FM1-PM2)", "Feeding-Time Circadian Synchronisation", "/docs/biological-targets/brs-x/circadian/fm1/brs-x-circadian-fm1-pm2-feeding-time-circadian-synchronisation"), "PM2 — Feeding-Time Circadian Synchronisation")
})

test("an existing PM prefix is not duplicated", () => {
  assert.equal(label("BRS1-FM4-PM9", "PM9 — GABA Synthesis Capacity", gaba), "PM9 — GABA Synthesis Capacity")
  assert.equal(label("BRS1-FM5-PM12", "PM12 — Synaptic Structural Plasticity", plasticity), "PM12 — Synaptic Structural Plasticity")
  assert.equal(label("BRS1-FM1-PM1", "PM12 — Other mechanism", "/docs/biological-targets/brs1/fm1/example"), "PM1 — PM12 — Other mechanism")
  assert.equal(label("BRS-X(Circadian-FM1-PM2)", "PM2 — Feeding-Time Circadian Synchronisation", "/docs/biological-targets/brs-x/circadian/fm1/brs-x-circadian-fm1-pm2-feeding-time-circadian-synchronisation"), "PM2 — Feeding-Time Circadian Synchronisation")
})

test("FM, hub, food, substance, recipe and draft pages keep their label", () => {
  assert.equal(label(undefined, "GABA–Glutamate Regulation", "/docs/biological-targets/brs1/fm4/brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation"), "GABA–Glutamate Regulation")
  assert.equal(label("BRS1(FM4)", "GABA–Glutamate Regulation", "/docs/biological-targets/brs1/fm4/brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation"), "GABA–Glutamate Regulation")
  assert.equal(label(undefined, "Neurotransmitter Regulation", "/docs/biological-targets/neurotransmitter-regulation"), "Neurotransmitter Regulation")
  assert.equal(label("BRS-X(Hormones-FM1)", "Reproductive Hormone Balance & Neurocognitive Regulation", "/docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-fm1-reproductive-hormone-balance-and-neurocognitive-regulation"), "Reproductive Hormone Balance & Neurocognitive Regulation")
  assert.equal(label("BRS-X(ECS-FM1)", "Endocannabinoidome Signalling Capacity & Neuromodulatory Regulation", "/docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-fm1-endocannabinoidome-signalling-capacity-and-neuromodulatory-regulation"), "Endocannabinoidome Signalling Capacity & Neuromodulatory Regulation")
  assert.equal(label("BRS-X(Circadian-FM1)", "Light and Feeding Zeitgeber Entrainment", "/docs/biological-targets/brs-x/circadian/fm1/brs-x-circadian-fm1-zeitgeber-entrainment"), "Light and Feeding Zeitgeber Entrainment")
  assert.equal(label("BRS1-FM4-PM9", "Almonds", "/docs/foods/almonds"), "Almonds")
  assert.equal(label("BRS1-FM4-PM9", "Vitamin B6", "/docs/substances/nutrients/micronutrients/vitamins/vitamin-b6"), "Vitamin B6")
  assert.equal(label("BRS1-FM4-PM9", "Soup", "/docs/recipes/Dinner/broccoli-potato-onion-soup"), "Soup")
  assert.equal(label("BRS6-FM1-PM1", "Glucose Appearance Kinetics — Stage 2A/2B draft", "/docs/system/stage2b-preview/brs6-fm1-pm1-glucose-appearance-kinetics-stage2ab-draft"), "Glucose Appearance Kinetics — Stage 2A/2B draft")
  assert.equal(label("BRS1-FM4-PM9extra", "GABA Synthesis Capacity", gaba), "GABA Synthesis Capacity")
  assert.equal(label("BRS7-FM1-PM1", "Elsewhere", "/docs/biological-targets/brs1/fm1/elsewhere"), "Elsewhere")
  assert.equal(label("BRS-X(Hormones-PM1)", "Oestrogen Signalling Stability", "/docs/system/stage2b-preview/brs-x-hormones-pm1"), "Oestrogen Signalling Stability")
  assert.equal(label("BRS-X(Hormones-FM1-PM1)", "Oestrogen Signalling Stability", "/docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm1-oestrogen-signalling-stability"), "Oestrogen Signalling Stability")
})

test("only the rendered final crumb changes, and structured data keeps the sidebar label", () => {
  assert.match(source, /isLast\s*\?\s*pmFinalBreadcrumbLabel\(frontMatter\?\.pm_id, item\.label, location\.pathname\)\s*: item\.label/)
  assert.match(source, /<DocBreadcrumbsStructuredData breadcrumbs=\{displayBreadcrumbs\} \/>/)
  assert.doesNotMatch(source, /displayBreadcrumbs\.map\(\(item\) => \(\{[^}]*pmFinalBreadcrumbLabel/)
})
