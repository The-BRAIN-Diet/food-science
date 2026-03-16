#!/usr/bin/env node
/**
 * Redistribute Food Context bullets from Serving into Sourcing, Synergies, and Serving.
 * Reads each food page, classifies each bullet under ### Serving by keywords, and rewrites the section.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FOODS_DIR = path.resolve(process.cwd(), process.argv.includes("--foods-dir") && process.argv[process.argv.indexOf("--foods-dir") + 1] || "docs/foods")
const SKIP = new Set(["index", "shopping-list"])

function classifyBullet(line) {
  const t = line.toLowerCase()
  const bullet = line.replace(/^- /, "").trim()
  if (!bullet) return "serving"

  // Serving first: clear preparation/cooking advice (soak, cook thoroughly, reduce phytates/oxalate)
  // so these aren’t misclassified by later synergies rules (e.g. “legumes/grains”)
  if (
    /soak\s+(and\s+)?cook|soak\s+(before|overnight|to\s+reduce)|cook\s+thoroughly|reduce\s+(phytates|oxalate)|soaking\s+and\s+sprouting\s+reduces\s+phytates|boiling\s+.*\s+oxalate/i.test(bullet)
  ) return "serving"

  // Sourcing: what to choose, where from, quality, storage, labels
  if (
    /^\s*choose\s+(smaller species|grass-fed|whole grain|calcium-fortified|products with)/i.test(bullet) ||
    /choose.*(when possible|to reduce mercury|for higher nutrient)/i.test(bullet) ||
    /consider pasture-raised/i.test(bullet) ||
    /check ingredient/i.test(bullet) ||
    /store (refrigerated|in a cool|dried)/i.test(bullet) ||
    /sustainably sourced|wild-caught|farmed|mercury|best choices|fda/i.test(bullet) ||
    /live active cultures/i.test(bullet) ||
    /traditional wasabi is grated|tube or powder|true wasabi from horseradish/i.test(bullet)
  ) return "sourcing"

  // Synergies: pair with, combine with, part of strategy, absorption, timing
  if (
    /pair with|combine with|pair .* (for|to) (absorption|complementarity|conversion|profile|enhance)/i.test(bullet) ||
    /part of .*(diverse|grain-legume|fermented|protein|choline|strategy|complementarity|rotation)/i.test(bullet) ||
    /vitamin c.*(iron|absorption)|iron absorption/i.test(bullet) ||
    /fat.*(carotenoid|absorption)|carotenoid.*absorption/i.test(bullet) ||
    /tryptophan.*(carb|serotonin)|trp:lnaa/i.test(bullet) ||
    /grain.*legume|legume.*grain|amino acid (profile|complementarity|coverage)/i.test(bullet) ||
    /timing.*(evening|midday)|best consumed.*(evening|midday|in evening)/i.test(bullet) ||
    /black pepper.*piperine|fat and heat.*(absorption|curcumin)/i.test(bullet) ||
    /polyphenol synergy|practical pairing/i.test(bullet) ||
    /dietary diversity.*plant foods|microbial richness/i.test(bullet) ||
    /high-tyrosine protein.*morning|morning meals to support dopamine/i.test(bullet) ||
    /sleep-supportive evening|evening nutrition strategy/i.test(bullet) ||
    /omega-3 sources for optimal dha|conversion from ala/i.test(bullet) ||
    /urolithin.*ellagitannins/i.test(bullet) ||
    /(spinach|beans) \+ (eggs|vitamin c|oil)/i.test(bullet) ||
    /eat your beans with vitamin c/i.test(bullet)
  ) return "synergies"

  // Serving: how to prepare, cook, soak, avoid
  if (
    /soak (before|overnight|and cook|to reduce)/i.test(bullet) ||
    /cook thoroughly|boiling|gentle cooking|light cooking|best prepared with gentle/i.test(bullet) ||
    /avoid high-heat|ages?.*blood-brain|advanced glycation/i.test(bullet) ||
    /reduce (phytates|oxalate|antinutrient)/i.test(bullet) ||
    /preserve (nutrients|omega-3s|tryptophan)/i.test(bullet) ||
    /can be (consumed|used|added|prepared|various ways)/i.test(bullet) ||
    /use (small amounts|in dressings|in bean soaking)|dilute before/i.test(bullet) ||
    /fermentation improves digestibility|fermentation.*bioavailability/i.test(bullet) &&
      !/part of fermented/i.test(bullet) ||
    /beta-glucan.*gut microbiome.*mechanisms/i.test(bullet) ||
    /important for (creatine|heme iron) intake/i.test(bullet) ||
    /(creatine|iron|zinc) content$/i.test(bullet) ||
    /phosphatidyl|choline intake supports|structural membrane/i.test(bullet) ||
    /prebiotic fiber.*gut microbiome health$/i.test(bullet) ||
    /whole grain diversity strategy$/i.test(bullet) ||
    /diverse protein strategy; high/i.test(bullet) ||
    /targeted foods such as.*exceed minimum omega-3/i.test(bullet) ||
    /raw \(sushi-grade\)|lightly cooked/i.test(bullet) ||
    /prevent oxidation/i.test(bullet) ||
    /oxalate.*bioavailability|boiling.*oxalate/i.test(bullet) ||
    /mineral bioavailability(?!.*vitamin c)/i.test(bullet) ||
    /soaking and sprouting reduces phytates/i.test(bullet)
  ) return "serving"

  // Default: if mentions "pair" or "part of" -> synergies; "cook"/"soak"/"avoid" -> serving; "choose"/"store" -> sourcing
  if (/pair with|part of .* strategy|complementarity/i.test(bullet)) return "synergies"
  if (/soak|cook|boil|avoid|preserve|reduce (phytate|oxalate)|gentle cooking/i.test(bullet)) return "serving"
  if (/choose|store|sustainable|grass-fed|wild|farmed/i.test(bullet)) return "sourcing"
  return "serving"
}

function getSlugs() {
  if (!fs.existsSync(FOODS_DIR)) return []
  return fs.readdirSync(FOODS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.basename(f, ".md"))
    .filter((s) => !SKIP.has(s))
    .sort()
}

function extractFoodContextBlock(content) {
  const start = content.indexOf("\n## Food Context\n")
  if (start === -1) return null
  const after = content.slice(start + "\n## Food Context\n".length)
  const endMatch = after.match(/\n(### Essential Amino Acid Profile|## Substances|## Recipes|## Biological Target Matrix|## References)\n/)
  const end = endMatch ? endMatch.index : after.length
  const block = after.slice(0, end)
  const restBefore = content.slice(0, start + "\n## Food Context\n".length)
  const restAfter = content.slice(start + "\n## Food Context\n".length + end)
  return { block, restBefore, restAfter }
}

function parseServingBullets(block) {
  const servingMatch = block.match(/\n### Serving\n\n([\s\S]*?)(?=\n### |\n## |$)/)
  if (!servingMatch) return []
  const text = servingMatch[1]
  const bullets = []
  let current = ""
  for (const line of text.split(/\n/)) {
    if (/^- /.test(line)) {
      if (current.trim()) bullets.push(current.trim())
      current = line
    } else if (current && (line.trim() === "" || line.startsWith(" "))) {
      current += "\n" + line
    } else if (current) {
      bullets.push(current.trim())
      current = ""
    }
  }
  if (current.trim()) bullets.push(current.trim())
  return bullets.filter((b) => b.startsWith("- "))
}

function getExistingSourcingContent(block) {
  const m = block.match(/\n### Sourcing\n\n([\s\S]*?)(?=\n### Synergies\n)/)
  if (!m) return ""
  const text = m[1].trim()
  if (!text) return ""
  return text + "\n\n"
}

function getExistingSynergiesContent(block) {
  const m = block.match(/\n### Synergies\n\n([\s\S]*?)(?=\n### Serving\n)/)
  if (!m) return ""
  const text = m[1].trim()
  if (!text) return ""
  return text + "\n\n"
}

function rebuildFoodContext(block, bullets) {
  const sourcing = []
  const synergies = []
  const serving = []
  for (const b of bullets) {
    const kind = classifyBullet(b)
    if (kind === "sourcing") sourcing.push(b)
    else if (kind === "synergies") synergies.push(b)
    else serving.push(b)
  }
  const existingSourcing = getExistingSourcingContent(block)
  const existingSynergies = getExistingSynergiesContent(block)

  let out = "\n\n### Sourcing\n\n"
  out += existingSourcing
  if (sourcing.length) out += sourcing.join("\n") + "\n\n"
  out += "### Synergies\n\n"
  out += existingSynergies
  if (synergies.length) out += synergies.join("\n") + "\n\n"
  out += "### Serving\n\n"
  if (serving.length) out += serving.join("\n") + "\n\n"
  return out
}

function processFile(filePath, dryRun) {
  const raw = fs.readFileSync(filePath, "utf8")
  const parsed = extractFoodContextBlock(raw)
  if (!parsed) return { changed: false }
  const bullets = parseServingBullets(parsed.block)
  if (bullets.length === 0) return { changed: false }
  const newBlock = rebuildFoodContext(parsed.block, bullets)
  const newContent = parsed.restBefore + newBlock + parsed.restAfter
  if (newContent === raw) return { changed: false }
  if (!dryRun) fs.writeFileSync(filePath, newContent, "utf8")
  return { changed: true, sourcing: bullets.filter((b) => classifyBullet(b) === "sourcing").length, synergies: bullets.filter((b) => classifyBullet(b) === "synergies").length, serving: bullets.filter((b) => classifyBullet(b) === "serving").length }
}

function main() {
  const dryRun = process.argv.includes("--dry-run")
  const slugs = getSlugs()
  let changed = 0
  for (const slug of slugs) {
    const filePath = path.join(FOODS_DIR, `${slug}.md`)
    if (!fs.existsSync(filePath)) continue
    const result = processFile(filePath, dryRun)
    if (result.changed) {
      changed++
      if (dryRun) console.log(`[dry-run] ${slug}.md`)
      else console.log(`${slug}.md (S:${result.sourcing} Sy:${result.synergies} Sv:${result.serving})`)
    }
  }
  console.log(`\nDone. ${changed} page(s) updated.`)
  if (dryRun && changed > 0) console.log("Run without --dry-run to apply.")
}

main()
