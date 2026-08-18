#!/usr/bin/env node
/**
 * Restore Supporting Key Constraint Pools on every FM page from PM → KC unions.
 *
 * Usage:
 *   node scripts/restore-fm-supporting-kc-pools.mjs
 *   node scripts/restore-fm-supporting-kc-pools.mjs --dry-run
 */
import fs from "node:fs"
import path from "node:path"
import {
  getKcPoolIndex,
  listFmFiles,
  reconcileFmKcPools,
  restoreFmSupportingKcPoolPage,
} from "./lib/fm-supporting-kc-pools.mjs"

const rootDir = process.cwd()
const dryRun = process.argv.includes("--dry-run")
const kcIndex = getKcPoolIndex(rootDir)
const files = listFmFiles(rootDir)
const reports = []

for (const filePath of files) {
  const report = dryRun
    ? reconcileFmKcPools(filePath, { rootDir, kcIndex })
    : restoreFmSupportingKcPoolPage(filePath, { rootDir, kcIndex })
  reports.push(report)
}

const outDir = path.join(rootDir, "scripts/out")
fs.mkdirSync(outDir, { recursive: true })
const payload = {
  generated_at: new Date().toISOString(),
  dry_run: dryRun,
  derivation: "PM → KC union per FM",
  fms: reports.map((r) => ({
    fm_id: r.fmId,
    file: path.relative(rootDir, r.filePath),
    derived_kcs: r.derivedIds,
    rendered_kcs: r.renderedIds,
    fm_front_matter_kcs: r.fmFrontMatterIds,
    section_4_3_kcs: r.citedIn43,
    written: Boolean(r.written),
    discrepancies: {
      cited_in_4_3_missing_from_union: r.missingFromUnion,
      front_matter_not_equal_to_union: r.fmFrontMatterIds.join("|") !== r.derivedIds.join("|"),
      unresolved_hrefs: r.unresolvedHrefs,
      pms_missing_canonical_mapping: r.pmsMissingMapping,
      missing_pm_pages: r.missingPmPages,
    },
    issues: r.issues,
  })),
  fms_with_no_mapped_kcs: reports.filter((r) => r.derivedIds.length === 0).map((r) => r.fmId),
}
const outPath = path.join(outDir, "fm-kc-pool-reconciliation.json")
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2))

const written = reports.filter((r) => r.written).length
const withKcs = reports.filter((r) => r.derivedIds.length)
const none = reports.filter((r) => r.derivedIds.length === 0)
const mismatches43 = reports.filter((r) => r.missingFromUnion.length)
console.log(`FM pages: ${reports.length}`)
console.log(`Listings written: ${written}${dryRun ? " (dry-run)" : ""}`)
console.log(`FMs with derived KCs: ${withKcs.length}`)
console.log(`FMs with no mapped KCs: ${none.map((r) => r.fmId).join(", ") || "none"}`)
console.log(`§4.3 KCs missing from PM union: ${mismatches43.length}`)
console.log(`Report: ${path.relative(rootDir, outPath)}`)
