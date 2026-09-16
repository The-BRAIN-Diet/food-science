import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"
import {
  classifyPage,
  letterFromTitle,
  pageIdFrom,
  sitePathFromDocsRel,
  mealCategoryFromPath,
  mergeReviewState,
  buildPublicDataset,
  assertPublicDatasetSafe,
  findPublicPageRecord,
  openPublicIssueCount,
} from "./lib/framework-qc.mjs"

test("food, recipe, PM, KC, phenome and hub classification", () => {
  assert.equal(classifyPage("docs/foods/green-tea.md", { tags: ["Food"] }).page_type, "Food")
  assert.equal(classifyPage("docs/foods/index.md", {}).page_type, "Index")
  assert.equal(classifyPage("docs/recipes/Lunch/salmon-salad.md", { tags: ["Recipe"] }).page_type, "Recipe")
  assert.equal(
    classifyPage(
      "docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx",
      { pm_id: "BRS5-FM2-PM4" },
    ).page_type,
    "PM",
  )
  assert.equal(
    classifyPage("docs/biological-targets/brs5/fm2/brs5-fm2-microbial-metabolite-signalling-capacity.mdx", {
      fm_id: "BRS5(FM2)",
    }).page_type,
    "FM",
  )
  assert.equal(
    classifyPage("docs/biological-targets/brs2/kc/brs2-kc2-methionine-transsulfuration-substrate-pool.mdx", {
      kc_id: "BRS2(KC2)",
    }).page_type,
    "KC",
  )
  assert.equal(classifyPage("docs/biological-targets/gut-brain-axis-enteric-nervous-system.md", {}).page_type, "BRS")
  assert.equal(classifyPage("docs/phenomes/details/ph001-focus-attention-stability.mdx", { id: "ph001" }).page_type, "Phenome")
  assert.equal(classifyPage("docs/dietary-foundations/index.md", {}).page_type, "Framework/methodology")
  assert.equal(
    classifyPage("docs/biological-targets/brs1/sm/brs1-sm-snp1-comt-catecholamine-clearance-sensitivity.mdx", {
      sm_id: "BRS1(SM-SNP1)",
    }).page_type,
    "SM",
  )
  assert.equal(classifyPage("docs/biological-targets/dependencies/brs5-to-brs1.md", {}).page_type, "Dependency")
  assert.equal(classifyPage("docs/substances/bioactive-compounds/index.md", {}).page_type, "Index")
  assert.equal(classifyPage("docs/therapeutic-areas/Alzhiemers.md", { title: "Alzheimer's" }).page_type, "Other")
})

test("letters and site paths", () => {
  assert.equal(letterFromTitle("Green Tea"), "G")
  assert.equal(letterFromTitle("PH001 — Focus"), "P")
  assert.equal(sitePathFromDocsRel("foods/green-tea.md"), "/docs/foods/green-tea")
  assert.equal(sitePathFromDocsRel("foods/index.md"), "/docs/foods")
  assert.equal(mealCategoryFromPath("docs/recipes/Lunch/foo.md"), "Lunch")
})

test("page ids prefer mechanism identifiers", () => {
  assert.equal(pageIdFrom("x.mdx", { pm_id: "BRS5-FM2-PM4" }), "BRS5-FM2-PM4")
  assert.equal(pageIdFrom("x.mdx", { fm_id: "BRS5(FM2)" }), "BRS5-FM2")
  assert.equal(pageIdFrom("x.mdx", { kc_id: "BRS2(KC2)" }), "BRS2-KC2")
  assert.equal(pageIdFrom("x.mdx", { sm_id: "BRS1(SM-SNP1)" }), "BRS1-SM-SNP1")
})

test("public dataset excludes internal issues and private fields", () => {
  const scanned = [
    {
      page_id: "BRS5-FM2-PM4",
      path: "docs/biological-targets/brs5/fm2/pm4.mdx",
      title: "PM4",
      page_type: "PM",
      letter: "M",
      site_path: "/docs/biological-targets/brs5/fm2/pm4",
    },
    {
      page_id: "green-tea",
      path: "docs/foods/green-tea.md",
      title: "Green Tea",
      page_type: "Food",
      letter: "G",
      site_path: "/docs/foods/green-tea",
    },
  ]
  const state = {
    pages: {
      "BRS5-FM2-PM4": {
        review_status: "issues_logged",
        last_checked: "2026-09-14",
        checked_by: "framework-qc-seed",
        public_reviewer: "Framework editorial review",
        review_scope: "Published evidence mapping.",
        linked_framework_issue_ids: ["FW001"],
      },
    },
  }
  const issues = {
    issues: [
      {
        id: "FW001",
        title: "Internal title",
        visibility: "public",
        public_title: "Public title",
        public_findings: ["Public finding one"],
        findings: ["Internal finding", "Do not publish"],
        required_action: "secret rewrite steps",
        status: "open",
        scope: { kind: "page", page_ids: ["BRS5-FM2-PM4"], page_paths: ["docs/biological-targets/brs5/fm2/pm4.mdx"] },
      },
      {
        id: "FW002",
        title: "Internal grading",
        visibility: "internal",
        findings: ["internal only"],
        required_action: "rerun",
        status: "deferred",
        scope: { kind: "framework-wide", page_ids: [], page_paths: [] },
      },
    ],
  }
  const register = mergeReviewState(scanned, state, issues)
  const publicDataset = buildPublicDataset({ register, issues: issues.issues, generated: "2026-09-14" })
  assertPublicDatasetSafe(publicDataset)

  assert.equal(publicDataset.issues.length, 1)
  assert.equal(publicDataset.issues[0].id, "FW001")
  assert.equal(publicDataset.issues[0].title, "Public title")
  assert.deepEqual(publicDataset.issues[0].findings, ["Public finding one"])
  assert.equal(JSON.stringify(publicDataset).includes("FW002"), false)
  assert.equal(JSON.stringify(publicDataset).includes("secret rewrite"), false)
  assert.equal(JSON.stringify(publicDataset).includes("framework-qc-seed"), false)
  assert.equal(JSON.stringify(publicDataset).includes("docs/foods/green-tea.md"), false)

  const matched = findPublicPageRecord(publicDataset, {
    permalink: "/docs/biological-targets/brs5/fm2/pm4/",
    pageId: "BRS5-FM2-PM4",
  })
  assert.equal(matched.page_id, "BRS5-FM2-PM4")
  assert.equal(openPublicIssueCount(matched), 1)
  assert.equal(matched.reviewer, "Framework editorial review")

  const unmatched = findPublicPageRecord(publicDataset, {
    permalink: "/docs/foods/green-tea",
    pageId: "green-tea",
  })
  assert.equal(unmatched.review_status, "unreviewed")
  assert.equal(openPublicIssueCount(unmatched), 0)

  const missing = findPublicPageRecord(publicDataset, {
    permalink: "/docs/does-not-exist",
    pageId: "no-such-page",
  })
  assert.equal(missing, null)
  assert.equal(openPublicIssueCount(missing), 0)
})

test("public Review & Corrections UI is shared layout, not per-page content", () => {
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
  const content = fs.readFileSync(path.join(root, "src/theme/DocItem/Content/index.tsx"), "utf8")
  const bar = fs.readFileSync(path.join(root, "src/components/ReviewCorrections/DocUtilityBar.tsx"), "utf8")
  const css = fs.readFileSync(path.join(root, "src/components/ReviewCorrections/styles.module.css"), "utf8")
  const panel = fs.readFileSync(path.join(root, "src/components/ReviewCorrections/PageReviewPanel.tsx"), "utf8")
  const publicTs = fs.readFileSync(path.join(root, "src/data/frameworkQcPublic.ts"), "utf8")
  const register = fs.readFileSync(path.join(root, "src/components/ReviewCorrections/PublicRegister.tsx"), "utf8")
  assert.match(content, /DocUtilityBar/)
  assert.match(bar, /Review & Corrections/)
  assert.match(bar, /showsNutritionContentTabs/)
  assert.match(bar, /showsPageUtilityBar/)
  assert.match(publicTs, /pageType === "Index"/)
  assert.match(publicTs, /isIndexDocSource/)
  assert.match(bar, /aria-disabled="true"/)
  assert.match(bar, /aria-selected="true"/)
  assert.match(css, /margin-left:\s*auto/)
  assert.match(css, /justify-content:\s*flex-end/)
  assert.match(css, /border-radius:\s*0/)
  assert.equal(/border-radius:\s*999px/.test(css), false)
  assert.match(css, /\.tabSelected[\s\S]*background:\s*var\(--ifm-color-primary\)/)
  assert.match(css, /\.tab[\s\S]*color:\s*var\(--ifm-color-emphasis-600\)/)
  assert.equal(/tabAccent/.test(bar), false)
  assert.match(css, /@media \(max-width: 996px\)/)
  assert.match(css, /white-space:\s*nowrap/)
  assert.match(publicTs, /pageType === "Food"/)
  assert.match(publicTs, /pageType === "Substance"/)
  assert.match(publicTs, /pageType === "Recipe"/)
  assert.match(publicTs, /Evidence review status: Unreviewed\./)
  assert.match(
    publicTs,
    /No accepted corrections are currently recorded for this page\. This does not mean that the page has completed source or expert review\./,
  )
  assert.match(panel, /UNREVIEWED_STATUS_COPY/)
  assert.match(panel, /includeInternalDocs/)
  assert.equal(/verified|approved|evidence-based/i.test(panel), false)
  assert.equal(/login|sign up|comment|notification/i.test(register), false)

  const config = fs.readFileSync(path.join(root, "docusaurus.config.ts"), "utf8")
  assert.match(config, /INCLUDE_INTERNAL_DOCS/)
  assert.match(config, /framework-qc-public\.fallback\.json/)
  assert.match(config, /localOnlyDocExclude/)
})

test("framework-wide issues are not copied onto every register row", () => {
  const scanned = [
    { page_id: "BRS5-FM2-PM4", path: "docs/biological-targets/brs5/fm2/pm4.mdx", title: "PM4", page_type: "PM", letter: "M" },
    { page_id: "green-tea", path: "docs/foods/green-tea.md", title: "Green Tea", page_type: "Food", letter: "G" },
  ]
  const state = { pages: {} }
  const issues = {
    issues: [
      {
        id: "FW002",
        scope: { kind: "framework-wide", page_ids: [], page_paths: [] },
      },
      {
        id: "FW001",
        scope: { kind: "page", page_ids: ["BRS5-FM2-PM4"], page_paths: ["docs/biological-targets/brs5/fm2/pm4.mdx"] },
      },
    ],
  }
  const rows = mergeReviewState(scanned, state, issues)
  const pm = rows.find((r) => r.page_id === "BRS5-FM2-PM4")
  const food = rows.find((r) => r.page_id === "green-tea")
  assert.deepEqual(pm.linked_framework_issue_ids, ["FW001"])
  assert.equal(pm.review_status, "issues_logged")
  assert.deepEqual(food.linked_framework_issue_ids, [])
  assert.equal(food.review_status, "unreviewed")
})

test("generated public dataset stays public-safe", () => {
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
  const abs = path.join(root, "src/data/framework-qc-public.generated.json")
  if (!fs.existsSync(abs)) return
  const dataset = JSON.parse(fs.readFileSync(abs, "utf8"))
  assertPublicDatasetSafe(dataset)
  assert.equal((dataset.issues || []).some((i) => i.id === "FW002"), false)
  const pm = findPublicPageRecord(dataset, {
    permalink: "/docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection",
    pageId: "BRS5-FM2-PM4",
  })
  assert.ok(pm)
  assert.equal(openPublicIssueCount(pm), 2)
  const missing = findPublicPageRecord(dataset, {permalink: "/docs/not-a-page", pageId: "missing"})
  assert.equal(missing, null)
})
