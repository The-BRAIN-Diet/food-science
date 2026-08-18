#!/usr/bin/env node
/**
 * Documented synonym search of USDA FoodData Central.
 *
 * Before a page may declare that USDA holds no record for a food, the search
 * that established it has to be reproducible. A single query on a common name
 * proves very little: FoodData Central indexes by product description, so
 * "Reishi" may be absent while "Ganoderma lucidum" is present, and a specialist
 * ingredient may exist only as a branded supplement.
 *
 * Each food is therefore searched by common name, scientific name, accepted
 * taxonomic synonyms, product form and preparation state, across every data
 * type: Foundation, SR Legacy, Survey (FNDDS), Branded and Experimental.
 *
 * Every candidate returned is recorded with the reason it was accepted or
 * rejected. A shared parent ingredient or food category is never sufficient:
 * species, edible material and processing state must all match.
 *
 * Usage: node scripts/fdc-synonym-search.mjs [--key YOUR_FDC_KEY]
 * Results are written to scripts/data/fdc-synonym-search.json
 */
import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DATA_TYPES = ["Foundation", "SR Legacy", "Survey (FNDDS)", "Branded", "Experimental"]

/**
 * The key is read from the environment or from the gitignored `.env.local`,
 * never from an argument: anything passed on the command line is visible in the
 * shell history and in the process list.
 */
function apiKey() {
  if (process.env.USDA_API_KEY) return process.env.USDA_API_KEY
  try {
    const env = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8")
    const match = env.match(/^USDA_API_KEY=(.+)$/m)
    if (match) return match[1].trim()
  } catch {
    /* fall through to the shared demo key */
  }
  return "DEMO_KEY"
}

const API_KEY = apiKey()
if (API_KEY === "DEMO_KEY") {
  console.warn("No USDA_API_KEY found. The shared DEMO_KEY allows ~30 requests an hour.")
}

/**
 * Search terms per page. Common name, scientific name and accepted synonyms,
 * then product form and preparation state, because a specialist ingredient is
 * usually indexed by what it is sold as rather than by what it is.
 */
export const SEARCHES = {
  "mct-oil": {
    food: "MCT oil (fractionated coconut oil, C8/C10 medium-chain triglycerides)",
    terms: [
      "MCT oil",
      "medium chain triglyceride",
      "fractionated coconut oil",
      "caprylic capric triglyceride",
      "coconut oil fractionated",
    ],
  },
  "reishi-mushroom": {
    food: "Reishi, Ganoderma lucidum, dried fruiting body or extract",
    terms: ["reishi", "Ganoderma lucidum", "Ganoderma", "lingzhi", "ling zhi", "mushroom reishi"],
  },
  "turkey-tail-mushroom": {
    food: "Turkey tail, Trametes versicolor, dried fruiting body or extract",
    terms: [
      "turkey tail",
      "Trametes versicolor",
      "Coriolus versicolor",
      "yunzhi",
      "mushroom turkey tail",
    ],
  },
  "cordyceps-mushroom": {
    food: "Cordyceps, Cordyceps militaris / Ophiocordyceps sinensis, dried or extract",
    terms: [
      "cordyceps",
      "Cordyceps militaris",
      "Ophiocordyceps sinensis",
      "caterpillar fungus",
      "mushroom cordyceps",
    ],
  },
  "sunflower-lecithin": {
    food: "Sunflower lecithin, phospholipid fraction of sunflower seed oil",
    terms: ["sunflower lecithin", "lecithin sunflower", "lecithin", "phosphatidylcholine"],
  },
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const PAGE_SIZE = 200

/**
 * POST rather than GET, because the query string form rejected the
 * "Survey (FNDDS)" data type outright and a rejected search is indistinguishable
 * from an empty one in a results file.
 *
 * A 429 is waited out rather than recorded. "No record exists" has to mean the
 * API answered and returned nothing, never that it declined to answer.
 */
async function search(query, dataType, attempt = 0) {
  let res
  try {
    res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({query, dataType, pageSize: PAGE_SIZE}),
    })
  } catch (err) {
    return {error: String(err), foods: []}
  }
  if (res.status === 429) {
    if (attempt >= 8) return {error: "HTTP 429 after repeated backoff", foods: []}
    const wait = Math.min(5 * 60_000, 20_000 * 2 ** Math.min(attempt, 4))
    console.log(`  rate limited, waiting ${Math.round(wait / 1000)}s before retrying "${query}"`)
    await sleep(wait)
    return search(query, dataType, attempt + 1)
  }
  if (!res.ok) return {error: `HTTP ${res.status}`, foods: []}
  const json = await res.json()
  return {total: json.totalHits, foods: json.foods || []}
}

const results = {}

for (const [page, spec] of Object.entries(SEARCHES)) {
  results[page] = {food: spec.food, dataTypesCovered: DATA_TYPES, searched: [], candidates: {}}

  const record = (food, term) => {
    const id = String(food.fdcId)
    if (!results[page].candidates[id]) {
      results[page].candidates[id] = {
        fdcId: id,
        description: food.description,
        dataType: food.dataType,
        brandOwner: food.brandOwner || null,
        foundBy: [],
      }
    }
    if (!results[page].candidates[id].foundBy.includes(term)) {
      results[page].candidates[id].foundBy.push(term)
    }
  }

  for (const term of spec.terms) {
    const all = await search(term, DATA_TYPES)
    results[page].searched.push({
      term,
      scope: "all data types",
      hits: all.total ?? 0,
      returned: all.foods.length,
      truncated: (all.total ?? 0) > PAGE_SIZE,
      error: all.error || null,
    })
    for (const food of all.foods) record(food, term)

    /*
     * A generic term such as "lecithin" matches thousands of branded products
     * and would bury the curated data types below the page limit. Where the
     * result set is truncated, each data type is searched on its own so that
     * Foundation, SR Legacy, Survey and Experimental are covered exhaustively.
     */
    if ((all.total ?? 0) > PAGE_SIZE) {
      for (const dataType of DATA_TYPES) {
        const one = await search(term, [dataType])
        results[page].searched.push({
          term,
          scope: dataType,
          hits: one.total ?? 0,
          returned: one.foods.length,
          truncated: (one.total ?? 0) > PAGE_SIZE,
          error: one.error || null,
        })
        for (const food of one.foods) record(food, term)
        await sleep(400)
      }
    }
    await sleep(400)
  }

  const n = Object.keys(results[page].candidates).length
  const failed = results[page].searched.filter((s) => s.error).length
  console.log(
    `${page}: ${results[page].searched.length} searches → ${n} candidates` +
      (failed ? ` (${failed} FAILED)` : ""),
  )
}

fs.writeFileSync(
  path.join(ROOT, "scripts/data/fdc-synonym-search.json"),
  JSON.stringify(results, null, 2) + "\n",
)
console.log("\nwritten to scripts/data/fdc-synonym-search.json")
