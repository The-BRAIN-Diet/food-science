import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import {
  scanPages,
  loadJson,
  mergeReviewState,
  buildReport,
  formatReportMarkdown,
  buildQueuePages,
  issueIsOpen,
  buildPublicDataset,
  assertPublicDatasetSafe,
} from "./lib/framework-qc.mjs"

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const OUT_DIR = path.join(ROOT, "scripts/out/framework-qc")

function renderReviewQueueHtml({ register, queuePages, issues, report }) {
  const frameworkWide = issues.filter((i) => i.scope?.kind === "framework-wide")
  const payload = {
    pages: queuePages,
    issues,
    frameworkWide,
    report,
  }
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Framework QC Review Queue (internal)</title>
  <style>
    :root { font-family: ui-sans-serif, system-ui, sans-serif; color: #1a1a1a; background: #f6f5f2; }
    body { margin: 0; padding: 24px; max-width: 1200px; }
    h1 { font-size: 22px; margin: 0 0 8px; }
    .sub { color: #555; margin-bottom: 20px; }
    .stats { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
    .stat { background: #fff; border: 1px solid #ddd; padding: 10px 14px; min-width: 120px; }
    .stat b { display: block; font-size: 20px; }
    .controls { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 12px; }
    input, select { padding: 8px; font: inherit; width: 100%; box-sizing: border-box; }
    .row { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
    label { font-size: 14px; }
    .group { margin: 18px 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; color: #666; }
    .page { background: #fff; border: 1px solid #ddd; padding: 12px 14px; margin-bottom: 8px; }
    .page h3 { margin: 0 0 6px; font-size: 16px; }
    .meta { font-size: 13px; color: #555; }
    .issues { margin-top: 8px; font-size: 13px; }
    .issues.wide { border-top: 1px solid #eee; padding-top: 8px; margin-top: 10px; color: #444; }
    a { color: #1d4e89; }
    .fw { background: #fff; border: 1px solid #c5b48a; padding: 12px 14px; margin-bottom: 10px; }
    .hidden { display: none; }
  </style>
</head>
<body>
  <h1>Framework QC Review Queue</h1>
  <p class="sub">Internal view generated from the Page Review Register and Framework Issues Register. Not a public Review &amp; Corrections interface.</p>
  <div class="stats">
    <div class="stat"><b id="c-total">0</b>Total</div>
    <div class="stat"><b id="c-reviewed">0</b>Reviewed</div>
    <div class="stat"><b id="c-issues">0</b>Issues logged</div>
    <div class="stat"><b id="c-complete">0</b>Complete</div>
  </div>
  <div class="controls">
    <input id="q" type="search" placeholder="Search title, path, issue ID, issue text" />
    <select id="type"><option value="">All page types</option></select>
    <select id="letter"><option value="">All letters</option></select>
    <select id="rstatus"><option value="">All review statuses</option></select>
    <select id="istatus"><option value="">All issue statuses</option></select>
    <select id="priority"><option value="">All priorities</option></select>
  </div>
  <div class="row">
    <label><input id="openOnly" type="checkbox" /> Open issues only</label>
    <label>Sort
      <select id="sort">
        <option value="title">Title</option>
        <option value="priority">Priority</option>
        <option value="open">Open-issue count</option>
      </select>
    </label>
  </div>
  <h2>Framework-wide issues</h2>
  <div id="fw"></div>
  <h2>Pages</h2>
  <div id="list"></div>
  <script>
    const DATA = ${JSON.stringify(payload)};
    const $ = (id) => document.getElementById(id);
    function fillSelect(id, values) {
      const el = $(id);
      [...new Set(values)].sort().forEach((v) => {
        if (!v) return;
        const o = document.createElement("option");
        o.value = v; o.textContent = v; el.appendChild(o);
      });
    }
    fillSelect("type", DATA.pages.map((p) => p.page_type));
    fillSelect("letter", DATA.pages.map((p) => p.letter));
    fillSelect("rstatus", DATA.pages.map((p) => p.review_status));
    fillSelect("istatus", DATA.issues.map((i) => i.status));
    fillSelect("priority", DATA.issues.map((i) => i.priority));

    function matches(p, q) {
      if (!q) return true;
      const hay = [
        p.title, p.path, p.page_id,
        ...(p.page_issues || []).flatMap((i) => [i.id, i.title, (i.findings || []).join(" "), i.required_action]),
      ].join(" ").toLowerCase();
      return hay.includes(q);
    }

    function groupKey(p) {
      if (["BRS", "FM", "PM", "KC"].includes(p.page_type)) {
        const h = p.brs_hierarchy || {};
        const brsLabel = h.subsystem ? (h.brs + " (" + h.subsystem + ")") : (h.brs || "unscoped");
        return [p.page_type, brsLabel, h.fm || "", p.title];
      }
      if (p.page_type === "Recipe") {
        return [p.page_type, p.meal_category || "Uncategorised", p.letter, p.title];
      }
      return [p.page_type, p.letter, p.title];
    }

    function render() {
      const q = $("q").value.trim().toLowerCase();
      const type = $("type").value;
      const letter = $("letter").value;
      const rstatus = $("rstatus").value;
      const istatus = $("istatus").value;
      const priority = $("priority").value;
      const openOnly = $("openOnly").checked;
      const sort = $("sort").value;

      let rows = DATA.pages.filter((p) => {
        if (type && p.page_type !== type) return false;
        if (letter && p.letter !== letter) return false;
        if (rstatus && p.review_status !== rstatus) return false;
        if (openOnly && p.open_issue_count === 0) return false;
        if (istatus && !(p.page_issues || []).some((i) => i.status === istatus)) return false;
        if (priority && !(p.page_issues || []).some((i) => i.priority === priority)) return false;
        if (!matches(p, q)) return false;
        return true;
      });

      rows.sort((a, b) => {
        if (sort === "priority") return (b.priority_rank - a.priority_rank) || a.title.localeCompare(b.title);
        if (sort === "open") return (b.open_issue_count - a.open_issue_count) || a.title.localeCompare(b.title);
        const ga = groupKey(a).join("\\0");
        const gb = groupKey(b).join("\\0");
        return ga.localeCompare(gb);
      });

      const reviewed = DATA.pages.filter((p) => p.review_status !== "unreviewed").length;
      const issuesLogged = DATA.pages.filter((p) => p.review_status === "issues_logged").length;
      const complete = DATA.pages.filter((p) => p.review_status === "expert_reviewed").length;
      $("c-total").textContent = DATA.pages.length;
      $("c-reviewed").textContent = reviewed;
      $("c-issues").textContent = issuesLogged;
      $("c-complete").textContent = complete;

      $("fw").innerHTML = DATA.frameworkWide.map((i) => {
        const findings = (i.findings || []).map((f, n) => "<li>" + (n + 1) + ". " + f + "</li>").join("");
        return "<div class=\\"fw\\" id=\\"" + i.id + "\\"><strong>" + i.id + " — " + i.title + "</strong> · " + i.status + " · " + i.priority +
          "<ol>" + findings + "</ol><p>Required action: " + i.required_action + "</p><p>Scope: framework-wide (not duplicated onto page rows)</p></div>";
      }).join("") || "<p>None.</p>";

      let html = "";
      let lastGroup = "";
      for (const p of rows) {
        const g = ["BRS", "FM", "PM", "KC"].includes(p.page_type)
          ? (p.page_type + " · " + ((p.brs_hierarchy && (p.brs_hierarchy.subsystem ? p.brs_hierarchy.brs + " (" + p.brs_hierarchy.subsystem + ")" : p.brs_hierarchy.brs)) || "unscoped") + (p.brs_hierarchy && p.brs_hierarchy.fm ? " · " + p.brs_hierarchy.fm : ""))
          : p.page_type === "Recipe"
            ? ("Recipe · " + (p.meal_category || "Uncategorised") + " · " + p.letter)
            : (p.page_type + " · " + p.letter);
        if (g !== lastGroup) {
          html += "<div class=\\"group\\">" + g + "</div>";
          lastGroup = g;
        }
        const href = p.site_path || "";
        const pageIss = (p.page_issues || []).map((i) => {
          const link = i.subsection || ("#" + i.id);
          return "<div><a href=\\"" + link + "\\">" + i.id + "</a> — " + i.title + " (" + i.status + ", " + i.priority + ")</div>";
        }).join("");
        const scoped = (p.applicable_scoped || []).join(", ");
        html += "<div class=\\"page\\"><h3>" + p.title + "</h3><div class=\\"meta\\">" +
          p.page_type + " · " + p.page_id + " · " + p.review_status +
          (href ? " · <a href=\\"" + href + "\\">Open page</a>" : "") +
          " · <code>" + p.path + "</code></div>" +
          "<div class=\\"issues\\"><strong>Page-specific issues</strong><br>" + (pageIss || "None") + "</div>" +
          "<div class=\\"issues wide\\"><strong>Applicable scoped issues</strong> (not framework-wide copies): " +
          (scoped || "None") + "</div></div>";
      }
      $("list").innerHTML = html || "<p>No pages match.</p>";
    }
    ["q","type","letter","rstatus","istatus","priority","openOnly","sort"].forEach((id) => {
      $(id).addEventListener("input", render);
      $(id).addEventListener("change", render);
    });
    render();
  </script>
</body>
</html>
`
}

function main() {
  const issuesDoc = loadJson(path.join(ROOT, "system/framework-qc/framework-issues-register.json"), { issues: [] })
  const stateDoc = loadJson(path.join(ROOT, "system/framework-qc/page-review-state.json"), { pages: {} })
  const { pages: scanned, classification_notes } = scanPages(ROOT)
  const register = mergeReviewState(scanned, stateDoc, issuesDoc)
  const report = buildReport({ register, scanned, issues: issuesDoc.issues, classification_notes })
  const queuePages = buildQueuePages(register, scanned, issuesDoc.issues)

  const publicDataset = buildPublicDataset({
    register,
    issues: issuesDoc.issues,
    generated: report.generated,
  })
  assertPublicDatasetSafe(publicDataset)

  const publicJson = JSON.stringify(publicDataset, null, 2) + "\n"
  const publicSrcPath = path.join(ROOT, "src/data/framework-qc-public.generated.json")

  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(
    path.join(OUT_DIR, "page-review-register.json"),
    JSON.stringify({ version: 1, generated: report.generated, pages: register }, null, 2) + "\n",
  )
  fs.writeFileSync(path.join(OUT_DIR, "page-review-report.md"), formatReportMarkdown(report, issuesDoc.issues))
  fs.writeFileSync(
    path.join(OUT_DIR, "review-queue.html"),
    renderReviewQueueHtml({ register, queuePages, issues: issuesDoc.issues, report }),
  )
  fs.writeFileSync(path.join(OUT_DIR, "framework-qc-public.json"), publicJson)
  fs.writeFileSync(publicSrcPath, publicJson)

  console.log(`Framework QC: ${register.length} pages`)
  console.log(`  register → scripts/out/framework-qc/page-review-register.json`)
  console.log(`  report   → scripts/out/framework-qc/page-review-report.md`)
  console.log(`  queue    → scripts/out/framework-qc/review-queue.html`)
  console.log(`  public   → src/data/framework-qc-public.generated.json`)
}

main()
