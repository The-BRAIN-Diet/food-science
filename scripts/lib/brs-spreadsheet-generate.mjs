/**
 * Generate BRS FM / PM / KC MDX pages from the six-systems spreadsheet.
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import matter from "gray-matter";
import { renderHubCollapsible } from "./hub-collapsible.mjs";

const DOMINANCE_TO_BREAKDOWN = {
  "Diet-Dominant": "Food-State Dominant",
  "Diet-Supported": "Food-State Leaning",
  "Lifestyle-Dominant": "Behavioural/Lifestyle Dominant",
  "Mixed": "Mixed Modulation",
};

const BIB_PATH = path.join(process.cwd(), "static/bibtex/BRAIN-diet.bib");

const MANUAL_CITATION_KEYS = {
  "collaboration 1998": "collaboration_lowering_1998",
  "tao huang 2015": "tao_huang_effect_2015",
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
  "hünnerkopf 2007": "hunnerkopf_interaction_2007",
  "hunnerkopf 2007": "hunnerkopf_interaction_2007",
  "ziaei 2024": "ziaei_systematic_2024",
  "ashley 1985": "ashley_breakfast_1985",
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
  const authorLabel = m[1].trim().replace(/\s+et\s+al\.?$/i, "");
  const manual = MANUAL_CITATION_KEYS[`${authorLabel.toLowerCase()} ${m[2]}`];
  if (manual && fs.existsSync(BIB_PATH)) return manual;
  const surname = authorLabel.split(/\s+/).pop().toLowerCase();
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

function parseAuthorYear(label) {
  const m = String(label).match(/^(.+?)\s*\((\d{4})\)$/);
  return { authorLabel: m?.[1]?.trim() || String(label).trim(), year: m?.[2] || "" };
}

function buildReferences(studies) {
  const refs = [];
  const numbered = [];
  for (const s of studies) {
    if (!s.key) continue;
    const { authorLabel, year } = parseAuthorYear(s.label);
    const topic = topicFromBibKey(s.key);
    refs.push(toFrontMatterReference(authorLabel, year, topic, s.key));
    numbered.push({ label: s.label, key: s.key, topic });
  }
  return { refs, numbered };
}

function entityNum(id) {
  const m = String(id).match(/\((FM|PM|KC)(\d+)\)/i);
  return m ? m[2] : "0";
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
  const seen = new Set();
  const re =
    /BRS(\d+)[-\(](FM|PM|KC)(\d+)\)?(?:\s*\(([^)]+)\))?(?:\s*→[^;]*)?/gi;
  for (const m of text.matchAll(re)) {
    const id = `BRS${m[1]}(${m[2].toUpperCase()}${m[3]})`;
    if (seen.has(id)) continue;
    seen.add(id);
    const name = (m[4] || "").trim();
    out.push({ id, name });
  }
  return out;
}

import {
  toFrontMatterReference,
  toReferenceMarkdown,
  topicFromBibKey,
} from "./brs-citation-migration.mjs";

function interventionsToPoolBullets(interventions) {
  const substances = interventions
    .filter((i) => i.lever)
    .map((i) => i.lever.trim())
    .filter(Boolean);
  if (!substances.length) return "- None listed";
  return substances.map((s) => `- ${s}`).join("\n");
}

function interventionsToSubstanceBullets(interventions) {
  const legacyLines = interventions
    .filter((i) => i.lever && i.signal)
    .map((i) => `- ${i.lever} → ${i.signal}`);
  if (!legacyLines.length) return "- None listed";
  const { map } = collectSubstanceFoodMap(legacyLines);
  const bullets = formatSubstanceFoodBullets(map);
  return bullets.length ? bullets.join("\n") : "- None listed";
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
  const clauses = pms.map((p) => (p.name || p.id));
  if (clauses.length === 0) return fm.description;
  const list =
    clauses.length === 1
      ? clauses[0]
      : `${clauses.slice(0, -1).join(", ")}, and ${clauses[clauses.length - 1]}`;
  const outcome = fm.description
    .replace(/^Diet-actionable control point regulating /i, "")
    .replace(/^Functional coupling of /i, "")
    .replace(/^Functional /i, "")
    .replace(/\.$/, "");
  return `Integrated regulation of ${list}, influencing ${outcome}.`;
}

function mechanisticBasisFm(fm, pms, kcs, brsNum, slugById) {
  const pmBullets = pms
    .map((p) => {
      const href = `/docs/biological-targets/brs${brsNum}/pm/${slugById.get(p.id)}`;
      return `- [${p.id} — ${p.name}](${href})\n  Contributes to ${fm.name || fm.id}.`;
    })
    .join("\n\n");
  const synthesisLead =
    pms.length === 1
      ? `[${pms[0].id} — ${pms[0].name}](/docs/biological-targets/brs${brsNum}/pm/${slugById.get(pms[0].id)}) operationalises ${fm.id} as an integrated functional state.`
      : `Together, these PMs operationalise ${fm.id} as an integrated functional state.`;
  const synthesis = `${fm.description}\n\n${synthesisLead}${fm.outputs ? ` Emergent functional consequence: ${fm.outputs.replace(/;/g, "; ")}.` : ""}`;
  return `${fm.description || `${fm.name} emerges from coordinated PM context.`}

### 4.1 Core Primary Mechanisms

${pmBullets}

### 4.2 Integrated Functional Narrative

${synthesis}

### 4.3 Suboptimal Function & Its Effects

Functional failure may arise when linked biological pools are chronically depleted or strained; see linked KC pages for pool definitions and FM-specific failure narrative.`;
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
    slugById.set(e.id, slugify(brsNum, e.kind.toLowerCase(), entityNum(e.id), e.name));
  }

  const fmPmMap = new Map();
  for (const fm of byKind.FM) {
    const pms = parseEntityRefs(fm.pms_covered)
      .filter((r) => r.id.includes("(PM"))
      .map((p) => {
        const full = byKind.PM.find((x) => x.id === p.id);
        return { id: p.id, name: full?.name || p.name || p.id };
      });
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
    const slug = slugById.get(kc.id);
    const interventions = parseInterventions(kc.interventions);
    const linkedFms = byKind.FM.filter((fm) => parseEntityRefs(fm.fm_coverage).some((r) => r.id === kc.id));
    const linkedPms = byKind.PM.filter((pm) => parseEntityRefs(pm.connected).some((r) => r.id === kc.id));

    const body = `### ${kc.id} - ${kc.name}

### 1. Definition

${kc.description}

### 2. Constraint Role

Provides the shared biological pool required for effective operation of linked mechanisms in this BRS.

### 3. Shared Biological Pool

${interventionsToPoolBullets(interventions)}

### 4. Biological Importance

${kc.description} Insufficient pool availability may constrain effective operation of linked FMs and PMs.

### 5. Connected Mechanisms

#### Functional Mechanisms

${linkedFms.map((fm) => `- [${fm.id} - ${fm.name}](/docs/biological-targets/brs${brsNum}/fm/${slugById.get(fm.id)})`).join("\n") || "- None listed"}

#### Primary Mechanisms

${linkedPms.map((pm) => `- [${pm.id} - ${pm.name}](/docs/biological-targets/brs${brsNum}/pm/${slugById.get(pm.id)})`).join("\n") || "- None listed"}

### 6. References

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
    const parentFmEntity = byKind.FM.find((f) => f.id === parentFm);
    const fmName = parentFmEntity?.name || parentFm;
    const kcs = parseEntityRefs(pm.connected).filter((r) => r.id.includes("(KC"));
    const cross = parseEntityRefs(pm.connected).filter((r) => {
      if (!/BRS\d+\(PM/.test(r.id) && !/BRS\d+\(FM/.test(r.id)) return false;
      const m = r.id.match(/BRS(\d+)/);
      return m && m[1] !== String(brsNum);
    });
    const siblingPms = (fmPmMap.get(parentFm) || []).filter((p) => p.id !== pm.id);
    const cofactors = parseListItems(pm.cofactors);
    const interventions = parseInterventions(pm.interventions);
    const dominance = pm.intervention_dominance || "Diet-Dominant";

    const studies = parseKeyStudies(pm.key_studies);
    const refLines = studies
      .filter((s) => s.key)
      .map((s) => {
        const { authorLabel, year } = parseAuthorYear(s.label);
        return toReferenceMarkdown(authorLabel, year, topicFromBibKey(s.key), s.key);
      });
    const refBlock = refLines.length
      ? refLines.join("\n")
      : "1. Citation mapping pending — add bibliography keys for source studies.";

    const body = `## ${pm.id} - ${pm.name}

## 1. Definition

${pm.description}

## 2. Intervention Breakdown

${DOMINANCE_TO_BREAKDOWN[dominance] || "Food-State Dominant"}

## 2. Primary Biological Effects

${pm.outputs || "↑ pathway support (see mechanistic basis)"}

## 4. Mechanistic Basis

### Summary

${pm.description}

${renderHubCollapsible(`${pm.name} — mechanistic detail`, `#### (${pm.name})

${pm.description}${pm.evidence_notes ? ` ${pm.evidence_notes}` : ""}`)}

## 5. Connected BRS${brsNum} Mechanisms

### 5.1 Overarching Functional Mechanism

- [${parentFm} - ${fmName}](/docs/biological-targets/brs${brsNum}/fm/${slugById.get(parentFm)})

### 5.2 Connected Primary Mechanisms

${siblingPms.map((p) => `- [${p.id} - ${p.name}](/docs/biological-targets/brs${brsNum}/pm/${slugById.get(p.id)})`).join("\n") || "- None listed"}

## 6. Connected Mechanisms

${cross.map((c) => `- ${c.id}${c.name ? ` — ${c.name}` : ""}`).join("\n") || "- None listed"}

## 7. Dietary Levers

### 7.1 Direct Dietary Levers

${interventionsToSubstanceBullets(interventions)}

### 7.2 Cofactors and Supporting Inputs

${cofactors.map((c) => `- ${c}`).join("\n") || "- None listed"}

### 7.3 KCs (Key Constraints)

${kcs.map((k) => `- [${k.id} - ${k.name || k.id}](/docs/biological-targets/brs${brsNum}/kc/${slugById.get(k.id)})`).join("\n") || "- None listed"}

## 8. Lifestyle Levers

${renderHubCollapsible("Lifestyle", `- Consistent daily meal timing may support one-carbon and methyl-donor availability across the day.
- Sleep and stress context may indirectly affect methylation demand; lifestyle factors are secondary to dietary substrate supply for this PM.`)}

## 9. Scoreable Inputs & Modulation Signals

${renderHubCollapsible("Scoreable Input Categories", `| Input Category | Example Inputs | PM relevance |
|---|---|---|
| Functional Property Potentials | methyl_donor_pattern; sulfur_amino_acid_context; choline_rich_food_matrix | May support ${pm.name.toLowerCase()}. |
| Realised Functional States | consistent_daily_methyl_donor_coverage | May reflect meal-level pathway support. |
| Preparation Transformations | minimally_processed; whole_food_matrix | May preserve nutrient density for pathway support. |`)}

## 10. References

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
      references: studies.filter((s) => s.key).map((s) => {
        const { authorLabel, year } = parseAuthorYear(s.label);
        return toFrontMatterReference(authorLabel, year, topicFromBibKey(s.key), s.key);
      }),
      hide_title: true,
    }, body);
  }

  for (const fm of byKind.FM) {
    const slug = slugById.get(fm.id);
    const pms = (fmPmMap.get(fm.id) || [])
      .map((p) => byKind.PM.find((x) => x.id === p.id) || p)
      .filter(Boolean);
    const kcs = parseEntityRefs(fm.fm_coverage).filter((r) => r.id.includes("(KC"));
    const cross = parseEntityRefs(fm.connected).filter((r) => /BRS\d+\(FM/.test(r.id));
    const { refs } = buildReferences(parseKeyStudies(fm.key_studies));
    const studies = parseKeyStudies(fm.key_studies);
    const interventions = parseInterventions(fm.interventions);
    const dominance = fm.intervention_dominance || "Diet-Dominant";
    const definition = integratedFmDefinition(fm, pms);

    const refSection = studies
      .filter((s) => s.key)
      .map((s) => {
        const { authorLabel, year } = parseAuthorYear(s.label);
        return toReferenceMarkdown(authorLabel, year, topicFromBibKey(s.key), s.key);
      })
      .join("\n");

    const body = `## ${fm.id} - ${fm.name}

## 1. Definition

${definition}

## 2. Primary Biological Effects

${fm.outputs || "↑ integrated pathway support"}

## 3. Phenome Connections

These outcomes describe translational contexts for the FM as an integrated biological capacity. They are not single-mechanism treatment claims. Biology → Phenome Confidence reflects biological relevance to each outcome — not proof that diet or lifestyle alone will improve it. Integrated FM confidence may exceed a single child PM only when multiple PMs converge on the same phenome with justified biological uplift (Phase 3 review).

No functional outcome context currently mapped.

## 4. Mechanistic Basis (Integrated FM Narrative)

${mechanisticBasisFm(fm, pms, kcs, brsNum, slugById)}

## 5. Connected Mechanisms

${cross.map((c) => `- ${c.id}${c.name ? ` — ${c.name}` : ""}`).join("\n") || "- None listed"}

## 6. References

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
      references: studies.filter((s) => s.key).map((s) => {
        const { authorLabel, year } = parseAuthorYear(s.label);
        return toFrontMatterReference(authorLabel, year, topicFromBibKey(s.key), s.key);
      }),
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

${renderHubCollapsible("Methylation & One-Carbon Metabolism Biological Implications", `B vitamins, particularly B6, B2, folate (5-MTHF), and B12, are essential cofactors in the remethylation of homocysteine (Hcy) to methionine, which is subsequently converted to S-adenosylmethionine (SAMe).

Elevated plasma homocysteine is frequently associated with cognitive and psychiatric contexts; dietary patterns supplying methyl donors, sulfur amino acids, and omega-3 context may support homocysteine modulation and methylation capacity.

## References

- [Collaboration (1998)](/docs/papers/BRAIN-Diet-References#collaboration_lowering_1998)
- [Oulhaj et al. (2016)](/docs/papers/BRAIN-Diet-References#oulhaj_omega-3_2016)
- [Aragão et al. (2024)](/docs/papers/BRAIN-Diet-References#aragao_revitalising_2024)`)}

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
      const subDir = path.join(catDir, sub);
      fs.mkdirSync(subDir, { recursive: true });
      fs.writeFileSync(
        path.join(subDir, "_category_.json"),
        JSON.stringify({ label: sub.toUpperCase(), collapsed: true }, null, 2) + "\n",
      );
    }
  }
  return hubPath;
}
