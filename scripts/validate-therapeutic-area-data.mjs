#!/usr/bin/env node
import path from "node:path";
import {fileURLToPath} from "node:url";
import {validateTherapeuticAreaData} from "./lib/therapeutic-area-validation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = validateTherapeuticAreaData(root);

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Therapeutic Area data validation passed.");
}
