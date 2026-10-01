/**
 * Move PM Phenome Connections to §7 and References to §8.
 * Resulting order: 1 Mission → 2 PBE → 3 Levers → 4 Mechanistic Basis →
 * 5 BRS Pathways → 7 Phenome Connections → 8 References.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const targetsRoot = path.join(root, "docs/biological-targets");

const ROLE_NUM = {
  mission: 1,
  pbe: 2,
  levers: 3,
  mb: 4,
  pathways: 5,
  phenome: 7,
  refs: 8,
};

function classify(title) {
  if (/Mission & Overview|^Definition$/i.test(title)) return "mission";
  if (/Primary Biological Effects/i.test(title)) return "pbe";
  if (/^Levers$/i.test(title)) return "levers";
  if (/Mechanistic Basis/i.test(title)) return "mb";
  if (/BRS Pathways/i.test(title)) return "pathways";
  if (/Phenome Connections/i.test(title)) return "phenome";
  if (/^References$/i.test(title)) return "refs";
  return "other";
}

function remumberDescendants(text, oldNum, newNum) {
  if (oldNum === newNum) return text;
  const from = String(oldNum);
  const to = String(newNum);
  return text
    .replace(new RegExp(`^(#{3,4})\\s+${from}\\.(\\d+)`, "gm"), `$1 ${to}.$2`)
    .replace(new RegExp(`\\b${from}\\.(\\d+\\.\\d+)\\b`, "g"), `${to}.$1`)
    .replace(new RegExp(`\\b${from}\\.(\\d+)\\b`, "g"), `${to}.$1`)
    .replace(new RegExp(`§${from}(?=[.\\s]|$)`, "g"), `§${to}`);
}

function rewritePm(content) {
  const firstNum = content.search(/^##\s+\d+\.\s+/m);
  if (firstNum === -1) throw new Error("no numbered sections");
  const preamble = content.slice(0, firstNum);
  const rest = content.slice(firstNum);
  const headingRe = /^##\s+(\d+)\.\s+(.+?)\s*$/gm;
  const marks = [...rest.matchAll(headingRe)].map((m) => ({
    index: m.index,
    oldNum: parseInt(m[1], 10),
    title: m[2].trim(),
  }));
  if (!marks.length) throw new Error("no major sections");

  const byRole = {};
  const others = [];
  for (let i = 0; i < marks.length; i += 1) {
    const start = marks[i].index;
    const end = i + 1 < marks.length ? marks[i + 1].index : rest.length;
    const raw = rest.slice(start, end);
    const role = classify(marks[i].title);
    const block = { ...marks[i], raw, role };
    if (role === "other") others.push(block);
    else byRole[role] = block;
  }

  const missing = ["mission", "pbe", "levers", "mb", "pathways", "phenome", "refs"].filter(
    (role) => !byRole[role],
  );
  if (missing.length) throw new Error(`missing ${missing.join(", ")}`);

  const order = ["mission", "pbe", "levers", "mb", "pathways", "phenome", "refs"];
  const pieces = order.map((role) => {
    const block = byRole[role];
    const newNum = ROLE_NUM[role];
    let body = remumberDescendants(block.raw, block.oldNum, newNum);
    body = body.replace(/^##\s+\d+\.\s+/, `## ${newNum}. `);
    return body.trimEnd();
  });
  if (others.length) {
    pieces.splice(pieces.length - 1, 0, ...others.map((b) => b.raw.trimEnd()));
  }
  return `${preamble}${pieces.join("\n\n")}\n`.replace(/\n{3,}/g, "\n\n");
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/pm\d|pm\d\d/i.test(entry.name) && entry.name.endsWith(".mdx")) acc.push(full);
  }
  return acc;
}

const files = walk(targetsRoot).filter((file) => {
  const text = fs.readFileSync(file, "utf8");
  return /^pm_id:/m.test(text) && /^##\s+\d+\.\s+Phenome Connections/m.test(text);
});

let updated = 0;
for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  try {
    const after = rewritePm(before);
    if (after !== before) {
      fs.writeFileSync(file, after);
      updated += 1;
      console.log("updated", path.relative(root, file));
    }
  } catch (err) {
    console.error("FAIL", path.relative(root, file), err.message);
    process.exitCode = 1;
  }
}
console.log(`done ${updated}/${files.length}`);
