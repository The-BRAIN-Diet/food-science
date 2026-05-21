/**
 * Generate BRS FM / PM / KC MDX pages from the six-systems spreadsheet.
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import matter from "gray-matter";

const DOMINANCE_TO_BREAKDOWN = {
  "Diet-Dominant": "Food-State Dominant",
  "Diet-Supported": "Food-State Leaning",
  "Lifestyle-Dominant": "Behavioural/Lifestyle Dominant",
  "Mixed": "Mixed Modulation",
};

const BIB_PATH = path.join(process.cwd(), "static/bibtex/BRAIN-diet.bib");

const MANUAL_CITATION_KEYS = {
  "collaboration 1998": "collaboration_lowering_1998",
  "tao huang 2015": "tao_huang_httpswwwresearchgatenetpublication283712589_effect_of_vitamin_b-12_and_n-3_polyunsaturated_fatty_acids_on_plasma_homocysteine_ferritin_c-reactive_protein_and_other_cardiovascular_risk_factors_a_randomized_controlled_trial_nodate",
  "oulhaj 2016": "oulhaj_omega-3_2016",
  "aragão 2014": "aragao_revitalising_2024",
  "aragao 2024": "aragao_revitalising_2024",
  "arellanes 2020": "arellanes_brain_2020",
  "vance 2014": "vance_phospholipid_2014",
  "gregory 2016": "gregory_homocysteine_2016",
  "minich 2019": "minich_glutathione_2019",
  "chiang 1996": "chiang_s-adenosylmethionine_1996",
  "kumar 2017": "kumar_transsulfuration_2017",
  "sekhar 2011": "sekhar_glutathione_2011",
};

let bibCache = null;

function loadBib() {
  if (bibCache) return bibCache;
  if (!fs.existsSync(BIB_PATH)) {
    bibCache = [];
    return bibCache;
  }
  const raw = fs.readFileSync(BIB_PATH, "utf8");
  bibCache = [...raw.matchAll(/@article\{([^,]+),[\s\S]*?author\s*=\s*\{([^}]+)\}[\s\S]*?year\s*=\s*\{(\d{4})\}/g)].map(
    (m) => ({ key: m[1], author: m[2], year: m[3] }),
  );
  return bibCache;
}

function resolveCitationKey(studyLine) {
  const line = studyLine.trim();
  if (!line) return null;
  const m = line.match(/^([^(]+)\s*\((\d{4})\)/);
  if (!m) return null;
  const manual = MANUAL_CITATION_KEYS[`${m[1].trim().toLowerCase()} ${m[2]}`];
  if (manual && fs.existsSync(BIB_PATH)) return manual;
  const surname = m[1].trim().split(/\s+/).pop().toLowerCase();
  const year = m[2];
  const hit = loadBib().find(
    (e) => e.year === year && e.author.toLowerCase().includes(surname),
  );
  return hit?.key || null;
}

function parseKeyStudies(text) {
  if (!text) return [];
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const label = line.split("—")[0].split("–")[0].trim();
      const key = resolveCitationKey(label);
      return { label, key, href: key ? `/docs/papers/BRAIN-Diet-References#${key}` : null };
    });
}

function buildReferences(studies) {
  const refs = [];
  const numbered = [];
  let i = 1;
  for (const s of studies) {
    if (s.key) {
      refs.push(`[${i}] [${s.label}](/docs/papers/BRAIN-Diet-References#${s.key})`);
      numbered.push({ index: i, label: s.label, key: s.key });
      i += 1;
    }
  }
  return { refs, numbered };
}

function slugify(brsNum, kind, num, name) {
  const base = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `brs${brsNum}-${kind}${num}-${base}`.slice(0, 120);
}

function parseEntityRefs(text) {
  if (!text) return [];
  const out = [];
  const re =
    /BRS(\d+)[-\(](FM|PM|KC)(\d+)\)?\s*(?:\([^)]*\))?\s*(?:[—–-]\s*)?([^;]+)?/gi;
  for (const m of text.matchAll(re)) {
    const id = `BRS${m[1]}(${m[2].toUpperCase()}${m[3]})`;
    const name = (m[4] || "").trim();
    out.push({ id, name });
  }
  return out;
}

function parseInterventions(text) {
  if (!text) return [];
  return text
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((part) => {
      const [left, right] = part.split("→").map((x) => x.trim());
      return { lever: left || part, signal: right || "" };
    });
}

function parseListItems(text) {
  if (!text || /^see inherited/i.test(text)) return [];
  return text
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter((s) => s && !/^see inherited/i.test(s));
}

function timingFromCoverage(coverage) {
  const c = (coverage || "").toLowerCase();
  if (!c) return "No";
  if (c.includes("meal") || c.includes("daily") || c.includes("48") || c.includes("hour")) return "Yes";
  if (c.includes("week")) return "Yes";
  return "No";
}

function exportSpreadsheet(brs, xlsxPath) {
  const py = path.join(process.cwd(), "scripts/lib/brs-spreadsheet-parse.py");
  const res = spawnSync("python3", [py, brs, xlsxPath], { encoding: "utf8" });
  if (res.status !== 0) {
    throw new Error(res.stderr || res.stdout || "spreadsheet parse failed");
  }
  return JSON.parse(res.stdout);
}

function integratedFmDefinition(fm, pms) {
  const clauses = pms.map((p) => p.name.toLowerCase());
  if (clauses.length === 0) return fm.description;
  const list =
    clauses.length === 1
      ? clauses[0]
      : `${clauses.slice(0, -1).join(", ")}, and ${clauses[clauses.length - 1]}`;
  return `Integrated regulation of ${list}, influencing ${fm.description.replace(/^Diet-actionable control point regulating /i, "").replace(/^Functional /i, "").replace(/\.$/, "")}.`;
}

function mechanisticBasisFm(fm, pms) {
  const lines = pms.map(
    (p, i) => `${p.id.replace(/BRS\d+\(PM(\d+)\)/, "PM$1")} governs ${p.name.toLowerCase()}.`,
  );
  return `${fm.description}\n\n${lines.join(" ")}\n\nTogether, these PMs operationalise ${fm.id} as a coordinated methylation and one-carbon control point. ${fm.outputs ? `Emergent functional consequence: ${fm.outputs.replace(/;/g, "; ")}.` : ""}`;
}

export function generateBrsFromSpreadsheet({
  brs = "BRS2",
  xlsxPath = "/Users/paulhouston/Downloads/the six systems.xlsx",
  rootDir = process.cwd(),
  dryRun = false,
}) {
  const data = exportSpreadsheet(brs, xlsxPath);
  const brsNum = brs.replace(/\D/g, "");
  const baseDir = path.join(rootDir, "docs/biological-targets", `brs${brsNum}`);
  const byKind = { FM: [], PM: [], KC: [] };
  for (const e of data.entities) byKind[e.kind]?.push(e);

  const slugById = new Map();
  for (const e of data.entities) {
    const num = e.id.match(/\d+/)?.[0];
    slugById.set(e.id, slugify(brsNum, e.kind.toLowerCase(), num, e.name));
  }

  const fmPmMap = new Map();
  for (const fm of byKind.FM) {
    const pms = parseEntityRefs(fm.pms_covered).filter((r) => r.id.includes("(PM"));
    fmPmMap.set(fm.id, pms);
  }

  const pmFmMap = new Map();
  for (const pm of byKind.PM) {
    const fmRef = parseEntityRefs(pm.fm_coverage).find((r) => r.id.includes("(FM"));
    if (fmRef) pmFmMap.set(pm.id, fmRef.id);
  }

  const written = [];

  function write(relPath, frontmatter, body) {
    const filePath = path.join(baseDir, relPath);
    if (!dryRun) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, matter.stringify(body.trim() + "\n", frontmatter, { lineWidth: 9999 }));
    }
    written.push(filePath);
  }

  for (const kc of byKind.KC) {
    const num = kc.id.match(/\d+/)?.[0];
    const slug = slugById.get(kc.id);
    const interventions = parseInterventions(kc.interventions);
    const linkedFms = byKind.FM.filter((fm) => parseEntityRefs(fm.fm_coverage).some((r) => r.id === kc.id));
    const linkedPms = byKind.PM.filter((pm) => parseEntityRefs(pm.connected).some((r) => r.id === kc.id));

    const body = `### ${kc.id} - ${kc.name}

### 1. Definition

${kc.description}

### 2. Constraint Role

${kc.description} Supporting inputs from the spreadsheet supply substrate and cofactor context for dependent mechanisms in this BRS.

### 3. Supporting Inputs / Substances / Signals

${interventions.map((i) => `- ${i.lever}${i.signal ? ` → ${i.signal}` : ""}`).join("\n") || "- (see spreadsheet interventions)"}

### 4. Biological Importance

${kc.description} Inadequate coverage of these inputs can limit one-carbon flux, remethylation, and downstream methylation-dependent processes across linked FMs and PMs.

### 5. Connected Mechanisms

- Functional Mechanisms
${linkedFms.map((fm) => `  - [${fm.id} - ${fm.name}](/docs/biological-targets/brs${brsNum}/fm/${slugById.get(fm.id)})`).join("\n")}
- Primary Mechanisms
${linkedPms.map((pm) => `  - [${pm.id} - ${pm.name}](/docs/biological-targets/brs${brsNum}/pm/${slugById.get(pm.id)})`).join("\n")}

### 6. Constraint Stressors / Burdens

- inconsistent methyl-donor intake across days
- low folate, B12, choline, or betaine food patterns where KC1 applies
- inadequate sulfur amino-acid and glycine supply where KC2 applies
- ultra-processed dietary patterns displacing whole-food methyl-donor sources

### 7. References

${linkedFms.length ? "1. See linked FM pages for cited evidence." : ""}
`;

    write(`kc/${slug}.mdx`, {
      title: kc.name,
      kc_id: kc.id,
      parent_brs: brs,
      summary: kc.description,
      hide_title: true,
    }, body);
  }

  for (const pm of byKind.PM) {
    const slug = slugById.get(pm.id);
    const parentFm = pmFmMap.get(pm.id) || `BRS${brsNum}(FM1)`;
    const kcs = parseEntityRefs(pm.connected).filter((r) => r.id.includes("(KC"));
    const cross = parseEntityRefs(pm.connected).filter((r) => /BRS\d+\(FM/.test(r.id));
    const cofactors = parseListItems(pm.cofactors);
    const interventions = parseInterventions(pm.interventions);
    const dominance = pm.intervention_dominance || "Diet-Dominant";

    const studies = parseKeyStudies(pm.key_studies);
    const refLines = studies
      .filter((s) => s.key)
      .map((s, i) => `${i + 1}. [${s.label}](/docs/papers/BRAIN-Diet-References#${s.key})`);
    const refBlock = refLines.length
      ? refLines.join("\n")
      : "1. Citation mapping pending — add bibliography keys for spreadsheet studies.";

    const body = `## ${pm.id} - ${pm.name}

## 1. Definition

${pm.description}

## 2. Intervention Breakdown

${DOMINANCE_TO_BREAKDOWN[dominance] || "Food-State Dominant"}

## 3. Functional Role

${pm.outputs || "↑ pathway support (see mechanistic basis)"}

## 4. Mechanistic Basis

### Summary

${pm.description}

<details>
<summary><strong>${pm.name} — mechanistic detail</strong></summary>

#### (${pm.name})

${pm.description}${pm.evidence_notes ? ` ${pm.evidence_notes}` : ""}

${interventions.length ? `Dietary levers include ${interventions.map((i) => i.lever).join("; ")}.` : ""}

</details>

## 5. Underlying Mechanisms and Requirements

### 5.1 KCs (Key Constraints)

${kcs.map((k) => `- [${k.id} - ${k.name || k.id}](/docs/biological-targets/brs${brsNum}/kc/${slugById.get(k.id)})`).join("\n") || "- None listed"}

### 5.2 Co-factors

${cofactors.map((c) => `- ${c}`).join("\n") || "- None listed"}

### 5.3 Cross-BRS Links

${cross.map((c) => `- ${c.id}${c.name ? ` — ${c.name}` : ""}`).join("\n") || "- None listed"}

## 6. Dietary Levers

<details>
<summary><strong>Diet</strong></summary>

${interventions.map((i) => `- ${i.lever}${i.signal ? ` → ${i.signal}` : ""}`).join("\n") || "- See spreadsheet interventions"}

</details>

## 7. Lifestyle Levers

<details>
<summary><strong>Lifestyle</strong></summary>

- Consistent daily meal timing to support one-carbon and methyl-donor patterns described in the spreadsheet.
- Sleep and stress context may indirectly affect methylation demand; lifestyle factors are secondary to dietary substrate supply for this PM.

</details>

## 8. Scoreable Inputs & Modulation Signals

<details>
<summary><strong>Scoreable Input Categories</strong></summary>

| Input Category | Example Inputs | PM relevance |
|---|---|---|
| Functional Property Potentials | methyl_donor_pattern; sulfur_amino_acid_context; choline_rich_food_matrix | May support ${pm.name.toLowerCase()}. |
| Realised Functional States | consistent_daily_methyl_donor_coverage | May reflect meal-level pathway support. |
| Substance / Nutrient Signals | ${interventions.map((i) => i.signal || i.lever).filter(Boolean).slice(0, 4).join("; ") || "folate; B12; choline; betaine"} | Substrate and cofactor signals for this PM. |
| Preparation Transformations | minimally_processed; whole_food_matrix | May preserve nutrient density for pathway support. |

</details>

## 9. References

${refBlock}
`;

    write(`pm/${slug}.mdx`, {
      title: pm.name,
      pm_id: pm.id,
      parent_fm: parentFm,
      parent_brs: brs,
      summary: pm.description,
      key_constraints: kcs.map((k) => `${k.id} - ${k.name || k.id}`),
      cofactors: cofactors.length ? cofactors : undefined,
      intervention_dominance: dominance,
      intervention_breakdown: DOMINANCE_TO_BREAKDOWN[dominance] || "Food-State Dominant",
      timing_specific: timingFromCoverage(pm.coverage_timing),
      dose_sensitivity: pm.dose || undefined,
      references: studies.filter((s) => s.key).map((s, i) => `[${i + 1}] [${s.label}](/docs/papers/BRAIN-Diet-References#${s.key})`),
      hide_title: true,
    }, body);
  }

  for (const fm of byKind.FM) {
    const slug = slugById.get(fm.id);
    const pms = (fmPmMap.get(fm.id) || []).map((p) => {
      const full = byKind.PM.find((x) => x.id === p.id);
      return { ...p, name: full?.name || p.name };
    });
    const kcs = parseEntityRefs(fm.fm_coverage).filter((r) => r.id.includes("(KC"));
    const cross = parseEntityRefs(fm.connected).filter((r) => /BRS\d+\(FM/.test(r.id));
    const { refs } = buildReferences(parseKeyStudies(fm.key_studies));
    const studies = parseKeyStudies(fm.key_studies);
    const interventions = parseInterventions(fm.interventions);
    const dominance = fm.intervention_dominance || "Diet-Dominant";
    const definition = integratedFmDefinition(fm, pms);

    const refSection = studies
      .filter((s) => s.key)
      .map((s, i) => `${i + 1}. [${s.label}](/docs/papers/BRAIN-Diet-References#${s.key})`)
      .join("\n");

    const body = `## ${fm.id} - ${fm.name}

## 1. Definition

${definition}

## 2. Intervention Breakdown

${DOMINANCE_TO_BREAKDOWN[dominance] || "Food-State Dominant"}

## 3. Functional Role

${fm.outputs || "↑ integrated pathway support"}

## 4. Mechanistic Basis (Implementation of PMs)

${mechanisticBasisFm(fm, pms)}

## 5. Underlying Mechanisms and Requirements

### 5.1 PMs (Primary Mechanisms)

${pms.map((p) => `- [${p.id} - ${p.name}](/docs/biological-targets/brs${brsNum}/pm/${slugById.get(p.id)})`).join("\n")}

### 5.2 KCs (Key Constraints)

${kcs.map((k) => `- [${k.id} - ${k.name || k.id}](/docs/biological-targets/brs${brsNum}/kc/${slugById.get(k.id)})`).join("\n")}

### 5.3 Cross-BRS Links

${cross.map((c) => `- ${c.id}${c.name ? ` — ${c.name}` : ""}`).join("\n") || "- None listed"}

## 6. Dietary Levers

<details>
<summary><strong>Diet</strong></summary>

${interventions.map((i) => `- ${i.lever}${i.signal ? ` → ${i.signal}` : ""}`).join("\n")}

</details>

## 7. Lifestyle Levers

<details>
<summary><strong>Lifestyle</strong></summary>

- Regular meal timing and sleep regularity may support daily one-carbon rhythm context alongside dietary methyl-donor intake.
- Stress and recovery patterns may influence methylation demand indirectly; dietary substrate remains primary for this FM.

</details>

## 8. Scoreable Inputs & Modulation Signals

These inputs are used within the BRAIN Diet ontology to generate evidence-constrained estimates of plausible ${brs} support. They are not direct measures of clinical efficacy.

<details>
<summary><strong>Scoreable Input Categories</strong></summary>

| Input Category | Example Inputs | Functional Relevance |
|---|---|---|
| Functional Property Potentials | methyl_donor_pattern; transsulfuration_support; choline_phospholipid_context | May support ${fm.name.toLowerCase()}. |
| Realised Functional States | consistent_methyl_donor_coverage; homocysteine_modulation_context | May reflect integrated FM support at recipe level. |
| Substance / Nutrient Signals | folate; B12; choline; betaine; methionine; omega-3 | Nutrient signals linked to spreadsheet interventions. |
| Preparation Transformations | minimally_processed; whole_food_matrix | May preserve methyl-donor and cofactor density. |

</details>

## 9. References

${refSection || "1. See PM pages for linked citations."}
`;

    write(`fm/${slug}.mdx`, {
      title: fm.name,
      fm_id: fm.id,
      parent_brs: brs,
      summary: definition,
      mechanisms_covered: pms.map((p) => ({
        id: p.id,
        name: p.name,
        href: `/docs/biological-targets/brs${brsNum}/pm/${slugById.get(p.id)}`,
      })),
      key_constraints: kcs.map((k) => ({
        id: k.id,
        name: k.name || k.id.replace(/BRS\d+\(KC\d+\)\s*/, ""),
        type: "substrate",
        href: `/docs/biological-targets/brs${brsNum}/kc/${slugById.get(k.id)}`,
      })),
      intervention_dominance: dominance,
      intervention_breakdown: DOMINANCE_TO_BREAKDOWN[dominance] || "Food-State Dominant",
      timing_specific: timingFromCoverage(fm.coverage_timing),
      coverage_timing: fm.coverage_timing || undefined,
      references: studies.filter((s) => s.key).map((s, i) => `[${i + 1}] [${s.label}](/docs/papers/BRAIN-Diet-References#${s.key})`),
      hide_title: true,
    }, body);
  }

  return { brs, baseDir, written, slugById, byKind };
}

export function writeBrsHubPage({
  brs = "BRS2",
  hubDocId = "methylation-one-carbon-metabolism",
  hubTitle = "BRS2 - Methylation & One-Carbon Metabolism",
  slugById,
  byKind,
  rootDir = process.cwd(),
  dryRun = false,
}) {
  const brsNum = brs.replace(/\D/g, "");
  const hubPath = path.join(rootDir, "docs/biological-targets", `${hubDocId}.md`);
  const fms = byKind.FM;
  const kcs = byKind.KC;
  const pms = byKind.PM;

  const body = `---
id: ${hubDocId}
title: ${hubTitle}
sidebar_label: ${hubTitle}
description: Biochemical regulation layer for one-carbon metabolism, methyl donor flux, and related mechanisms.
tags:
  - Biological Target
  - Methylation & One-Carbon Metabolism
list_image: /img/icons/biological-targets.svg
---

# ${hubTitle}

## Overview

The Methylation & One-Carbon Metabolism system regulates methyl donor availability, homocysteine recycling, transsulfuration, and SAMe-dependent phospholipid methylation. It links dietary folate, B12, choline, betaine, and sulfur amino-acid patterns to brain-relevant methylation capacity and redox coupling.

One-carbon metabolism connects nutrient intake to epigenetic and neurochemical context; genotype-sensitive pathways (for example MTHFR-related efficiency) may alter how dietary methyl donors are utilised without changing the core FM/PM structure of this BRS.

<details>
<summary><strong>Methylation & One-Carbon Metabolism Biological Implications</strong></summary>

B vitamins, particularly B6, B2, folate (5-MTHF), and B12, are essential cofactors in the remethylation of homocysteine (Hcy) to methionine, which is subsequently converted to S-adenosylmethionine (SAMe).

Elevated plasma homocysteine is frequently associated with cognitive and psychiatric contexts; dietary patterns supplying methyl donors, sulfur amino acids, and omega-3 context may support homocysteine modulation and methylation capacity.

## References

- [Collaboration (1998)](/docs/papers/BRAIN-Diet-References#collaboration_lowering_1998)
- [Oulhaj et al. (2016)](/docs/papers/BRAIN-Diet-References#oulhaj_omega-3_2016)
- [Aragão et al. (2024)](/docs/papers/BRAIN-Diet-References#aragao_revitalising_2024)

</details>

---

## Functional Mechanisms

These functional mechanisms represent connected groupings of biological mechanisms and dietary control points through which this system can be influenced.

### Core Functional Mechanisms

${fms
  .map((fm) => {
    const slug = slugById.get(fm.id);
    return `- [${fm.id} — ${fm.name}](/docs/biological-targets/brs${brsNum}/fm/${slug}): ${fm.description}`;
  })
  .join("\n")}

---

## Requirements (Key Constraints)

${kcs
  .map((kc) => {
    const slug = slugById.get(kc.id);
    return `- [${kc.id} — ${kc.name}](/docs/biological-targets/brs${brsNum}/kc/${slug}): ${kc.description}`;
  })
  .join("\n")}

---

## Primary Mechanisms

Primary mechanisms sit beneath functional mechanisms and define specific regulatory processes. Browse by functional mechanism above, or use these direct links:

${pms
  .map((pm) => {
    const slug = slugById.get(pm.id);
    return `- [${pm.id} — ${pm.name}](/docs/biological-targets/brs${brsNum}/pm/${slug})`;
  })
  .join("\n")}
`;

  if (!dryRun) {
    fs.writeFileSync(hubPath, body);
    const catDir = path.join(rootDir, "docs/biological-targets", `brs${brsNum}`);
    fs.mkdirSync(catDir, { recursive: true });
    fs.writeFileSync(
      path.join(catDir, "_category_.json"),
      JSON.stringify(
        {
          label: hubTitle,
          position: 2,
          link: { type: "doc", id: `biological-targets/${hubDocId}` },
          collapsed: false,
          collapsible: true,
        },
        null,
        2,
      ) + "\n",
    );
    for (const sub of ["fm", "pm", "kc"]) {
      fs.writeFileSync(
        path.join(catDir, sub, "_category_.json"),
        JSON.stringify({ label: sub.toUpperCase(), collapsed: true }, null, 2) + "\n",
      );
    }
  }
  return hubPath;
}
