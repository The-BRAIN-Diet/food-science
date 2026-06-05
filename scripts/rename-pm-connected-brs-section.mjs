#!/usr/bin/env node
/** Rename PM §5 to Connected BRSX Mechanisms from parent_brs. */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { readMechanismPage, listMechanismMdxFiles } from "./lib/mechanism-page-validation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

let changed = 0;
for (const filePath of listMechanismMdxFiles(root, "pm")) {
  const { data, content } = readMechanismPage(filePath);
  const brs = String(data.parent_brs || "").trim();
  if (!brs) continue;
  const title = `Connected ${brs} Mechanisms`;
  const updated = content.replace(/^## 5\. Connected Mechanisms$/m, `## 5. ${title}`);
  if (updated === content) continue;
  fs.writeFileSync(filePath, matter.stringify(updated, data, { lineWidth: 9999 }));
  console.log("updated", path.relative(root, filePath));
  changed++;
}
console.log(`Done. ${changed} PM file(s) renamed.`);
