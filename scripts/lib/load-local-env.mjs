/**
 * Load gitignored local env files into process.env without logging values.
 * Does not override variables already set in the shell.
 */
import fs from "node:fs"
import path from "node:path"

const ENV_FILES = [".env.local", ".env"]

function parseEnvFile(raw) {
  const out = {}
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq <= 0) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[key] = value
  }
  return out
}

export function loadLocalEnv(cwd = process.cwd()) {
  const loaded = []
  for (const name of ENV_FILES) {
    const filePath = path.join(cwd, name)
    if (!fs.existsSync(filePath)) continue
    const parsed = parseEnvFile(fs.readFileSync(filePath, "utf8"))
    for (const [key, value] of Object.entries(parsed)) {
      if (process.env[key] == null || process.env[key] === "") {
        process.env[key] = value
      }
    }
    loaded.push(name)
  }
  return loaded
}
