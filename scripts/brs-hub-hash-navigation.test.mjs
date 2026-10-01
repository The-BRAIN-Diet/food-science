import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import test from "node:test"

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")

function readDoc(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8")
}

test("ADHD evidence hash on BRS1 opens a collapsed hub dropdown, not only emerging-support panels", () => {
  const hub = readDoc("src/client/brsFmHubDropdown.ts")
  const page = readDoc("docs/biological-targets/neurotransmitter-regulation.md")

  assert.match(page, /### ADHD evidence and connected BRS1 mechanisms \{#adhd-evidence-and-connected-brs1-mechanisms\}/)
  assert.match(page, /data-brs-hub-hash="adhd-evidence-and-connected-brs1-mechanisms"/)
  assert.match(page, /<div class="brs-fm-hub-panel" hidden>/)
  assert.match(hub, /function openHubTargetFromHash/)
  assert.match(hub, /function openHubAncestors/)
  assert.match(hub, /function dismissHashForItem/)
  assert.match(hub, /hash === dismissedHash \|\| hash === lastAutoOpenedHash/)
  assert.match(hub, /history\.replaceState/)
  assert.match(hub, /hashchange/)
  assert.match(hub, /data-brs-hub-hash/)
  assert.doesNotMatch(hub, /function openEmergingSupportFromHash/)
})

test("hub All Mechanisms collapsed summary matches Functional Mechanisms (FM titles only)", () => {
  const page = readDoc("docs/biological-targets/inflammation-oxidative-stress.md")
  const start = page.indexOf("<!-- brs-hub-all-mechanisms:start -->")
  const end = page.indexOf("<!-- brs-hub-all-mechanisms:end -->")
  const children = page.indexOf("brs-fm-hub-group-children", start)
  assert.ok(start >= 0 && end > start && children > start && children < end)
  const collapsed = page.slice(start, children)
  assert.doesNotMatch(collapsed, /brs-fm-hub-group-pm-list/)
  assert.match(collapsed, /BRS3\(FM1\) — Anti-Inflammatory Signalling Tone/)
  const expanded = page.slice(children, end)
  assert.match(expanded, /class="brs-fm-hub-pm-list"/)
})
