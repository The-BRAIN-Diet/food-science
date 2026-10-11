/** Reviewed proposals only: a tag, rendered row, or copied source note is not evidence. */
import fs from "node:fs"
import path from "node:path"
const root = path.resolve(import.meta.dirname, "..")
const report = JSON.parse(fs.readFileSync(path.join(root, "system/food-substance-recovery-evidence.json"), "utf8"))
const supported = report.rows.filter(row => row.classification === "source_supported" && row.evidence?.source && row.evidence?.material && row.evidence?.verification)
const proposal = {mode: "read-only-reviewed-proposal", scientificRecoveries: supported.length, unresolved: report.rows.filter(row => row.classification !== "source_supported"), supported}
fs.writeFileSync(path.join(root, "scripts/out/food-substance-recovery-proposal.json"), JSON.stringify(proposal, null, 2))
console.log(JSON.stringify({mode: proposal.mode, scientificRecoveries: supported.length, unresolved: proposal.unresolved.length}))
