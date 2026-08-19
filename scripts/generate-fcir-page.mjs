#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"
import {loadFcirRegister, patchPublicFcirPage} from "./lib/fcir-register.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const register = loadFcirRegister(ROOT)
const pagePath = path.join(ROOT, register.public_doc)
const current = fs.readFileSync(pagePath, "utf8")
const next = patchPublicFcirPage(current, register)
fs.writeFileSync(pagePath, next)
console.log(`Updated ${register.public_doc} from src/data/fcir-register.json`)
