/**
 * BRS2(FM1) canonical FM page helpers.
 * @see docs/biological-targets/brs2/fm/brs2-fm1-methylation-cycle-efficiency.mdx
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const KC_SUBSTRATES = {
  "BRS1(KC1)": {
    slug: "brs1-kc1-amino-acid-substrate-sufficiency",
    label: "choline, dietary protein, tryptophan, tyrosine, LNAAs",
  },
  "BRS1(KC2)": {
    slug: "brs1-kc2-amino-acid-completeness-and-balance",
    label: "complete protein sources, EAAs, tyrosine, tryptophan, complementary plant-protein pairing",
  },
  "BRS2(KC1)": {
    slug: "brs2-kc1-methyl-donor-sufficiency",
    label: "B12, betaine, choline, folate",
  },
  "BRS2(KC2)": {
    slug: "brs2-kc2-amino-acid-substrate-sufficiency",
    label: "amino acid support, cysteine, glycine, methionine",
  },
  "BRS6(KC1)": {
    slug: "brs6-kc1-glucose-energy-substrate-availability",
    label: "dietary protein, slow-release carbohydrates, viscous/soluble fibre, mixed macronutrient meal matrix",
  },
  "BRS6(KC2)": {
    slug: "brs6-kc2-stress-response-micronutrient-and-lipid-sufficiency",
    label: "magnesium, B vitamins, vitamin C, iron, zinc, long-chain omega-3 (EPA, DHA), phospholipid-associated lipids",
  },
};

function brsNum(fmId) {
  const m = fmId.match(/BRS(\d+)/);
  return m ? m[1] : "1";
}

function pmSlug(pmId, pmName) {
  const base = pmName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `brs${brsNum(pmId)}-${pmId.match(/PM(\d+)/i)[1]}-${base}`.replace(/--+/g, "-");
}

/** Resolve PM href from mechanisms_covered entry or construct path. */
function pmHref(entry, rootDir) {
  if (entry.href) return entry.href;
  const slug = entry.href?.split("/").pop();
  return `/docs/biological-targets/brs${brsNum(entry.id)}/pm/${slug || "unknown"}`;
}

function extractCofactors(pmContent) {
  const block =
    pmContent.match(/### 5\.1 Cofactors and Supporting Inputs\s*\n([\s\S]*?)(?=\n### 5\.2)/) ||
    pmContent.match(/### 4\.1 Cofactors and Supporting Inputs\s*\n([\s\S]*?)(?=\n### 4\.2)/);
  if (!block) return "—";
  const items = [...block[1].matchAll(/^-\s+(.+)$/gm)]
    .map((m) => m[1].trim())
    .filter((l) => l && !/^Note:/i.test(l));
  return items.length ? items.join(", ") : "—";
}

function extractPmKcIds(pmContent, pmData) {
  const ids = [];
  const body =
    pmContent.match(/### 5\.2 KCs[\s\S]*?(?=\n### 5\.3|\n## )/) ||
    pmContent.match(/### 4\.2 KCs[\s\S]*?(?=\n### 4\.3|\n## )/);
  if (body) {
    for (const m of body[0].matchAll(/BRS\d+\(KC\d+\)/g)) ids.push(m[0]);
  }
  if (!ids.length && pmData.key_constraints) {
    for (const k of pmData.key_constraints) {
      const id = typeof k === "string" ? k.split(" - ")[0].trim() : k.id;
      if (id?.includes("(KC")) ids.push(id.replace(/['"]/g, ""));
    }
  }
  return [...new Set(ids)];
}

function formatKcSubstrates(kcIds, brs) {
  const parts = [];
  for (const id of kcIds) {
    const meta = KC_SUBSTRATES[id];
    if (!meta) continue;
    const kcNum = id.match(/KC(\d+)/)[1];
    parts.push(
      `${meta.label} ([KC${kcNum}](/docs/biological-targets/brs${brs}/kc/${meta.slug}))`,
    );
  }
  return parts.length ? parts.join("; ") : "—";
}

export function buildCofactorsSubstratesTable(fmData, rootDir) {
  const brs = brsNum(fmData.fm_id);
  const rows = [];
  for (const pm of fmData.mechanisms_covered || []) {
    const href = pm.href || `/docs/biological-targets/brs${brs}/pm/${pm.href?.split("/").pop()}`;
    const pmPath = path.join(
      rootDir,
      "docs/biological-targets",
      href.replace("/docs/biological-targets/", "").replace(/\.mdx?$/, "") + ".mdx",
    );
    let pmContent = "";
    let pmData = {};
    if (fs.existsSync(pmPath)) {
      const parsed = matter(fs.readFileSync(pmPath, "utf8"));
      pmContent = parsed.content;
      pmData = parsed.data;
    }
    const cofactors = extractCofactors(pmContent);
    const kcIds = extractPmKcIds(pmContent, pmData);
    const kcSub = formatKcSubstrates(kcIds, brs);
    rows.push(
      `| [${pm.id}](${href}) | ${cofactors} | ${kcSub} |`,
    );
  }
  return `### 5.1 Cofactors and Substrates

| PM | Cofactors | KC substrates |
| --- | --- | --- |
${rows.join("\n")}
`;
}

const SCOREABLE_INTRO = (brs) =>
  `These inputs are used within the BRAIN Diet ontology to generate evidence-constrained estimates of plausible BRS${brs} support. They are not direct measures of clinical efficacy.`;

export function applyCanonicalSection5(content, tableBlock) {
  let next = content;
  if (/### 5\.1 Cofactors and Substrates/.test(next)) {
    next = next.replace(
      /### 5\.1 Cofactors and Substrates[\s\S]*?(?=\n### 5\.2 PMs)/,
      `${tableBlock}\n`,
    );
  } else {
    next = next.replace(
      /## 5\. Underlying Mechanisms and Requirements\s*\n/,
      `## 5. Underlying Mechanisms and Requirements\n\n${tableBlock}\n`,
    );
  }
  next = next.replace(/### 5\.1 PMs/g, "### 5.2 PMs");
  next = next.replace(/### 5\.2 KCs/g, "### 5.3 KCs");
  next = next.replace(/### 5\.3 Cross-BRS/g, "### 5.4 Cross-BRS");
  return next;
}

export function applyCanonicalScoreableIntro(content, brs) {
  let next = content;
  next = next.replace(
    /This FM is interpreted through[\s\S]*?(?=\n\n<details>\s*\n<summary><strong>Scoreable Input Categories)/,
    `${SCOREABLE_INTRO(brs)}\n\n`,
  );
  next = next.replace(
    /These inputs are used within the BRAIN Diet ontology[\s\S]*?guaranteed physiological outcomes\.\s*\n\n/,
    `${SCOREABLE_INTRO(brs)}\n\n`,
  );
  next = next.replace(
    /\n\nFood pages should generally capture[\s\S]*?(?=\n## \d+\. References)/,
    "\n",
  );
  return next;
}

export function applyCanonicalMechanisticBasis(content, fmId, pmClauses, opening, together) {
  const re = /## 4\. Mechanistic Basis \(Synthesis of PMs\)\s*\n[\s\S]*?(?=\n## 5\. )/;
  const body = `${opening}\n\n${pmClauses}\n\n${together}\n`;
  return content.replace(re, `## 4. Mechanistic Basis (Synthesis of PMs)\n\n${body}`);
}
