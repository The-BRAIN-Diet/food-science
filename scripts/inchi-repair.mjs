import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const ROOT = process.cwd()
const DOCS_DIR = path.join(ROOT, "docs")
const SUBSTANCES_DIR = path.join(DOCS_DIR, "substances")
const INCHI_DIR = path.join(ROOT, "static", "img", "inchi")

function listMarkdownFilesRecursive(dir) {
  const out = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === ".cursor") continue
      out.push(...listMarkdownFilesRecursive(full))
    } else if (e.isFile() && e.name.endsWith(".md")) {
      out.push(full)
    }
  }
  return out
}

function readDoc(filePath) {
  const raw = fs.readFileSync(filePath, "utf8")
  const parsed = matter(raw)
  return { data: parsed.data || {}, content: parsed.content || "" }
}

function writeDoc(filePath, data, content) {
  const out = matter.stringify(content, data, { lineWidth: 9999 })
  fs.writeFileSync(filePath, out)
}

function main() {
  if (!fs.existsSync(SUBSTANCES_DIR)) {
    console.error(`Substances dir not found: ${SUBSTANCES_DIR}`)
    process.exit(2)
  }
  if (!fs.existsSync(INCHI_DIR)) {
    console.error(`InChI image dir not found: ${INCHI_DIR}`)
    process.exit(2)
  }

  const files = listMarkdownFilesRecursive(SUBSTANCES_DIR).filter(
    (fp) => path.basename(fp) !== "index.md"
  )

  let updated = 0
  let skippedNoKey = 0
  let skippedNoLocalImage = 0

  for (const fp of files) {
    const { data, content } = readDoc(fp)

    const inchikey = typeof data.inchikey === "string" ? data.inchikey.trim() : ""
    if (!inchikey) {
      skippedNoKey++
      continue
    }

    const pngAbs = path.join(INCHI_DIR, `${inchikey}.png`)
    const svgAbs = path.join(INCHI_DIR, `${inchikey}.svg`)
    const rel =
      fs.existsSync(pngAbs)
        ? `/img/inchi/${inchikey}.png`
        : fs.existsSync(svgAbs)
          ? `/img/inchi/${inchikey}.svg`
          : null

    if (!rel) {
      skippedNoLocalImage++
      continue
    }

    const nextListImage = rel
    const nextInchiImage = rel

    const curListImage = typeof data.list_image === "string" ? data.list_image.trim() : ""
    const curInchiImage = typeof data.inchi_image === "string" ? data.inchi_image.trim() : ""

    // Only change when needed (avoid churn)
    let changed = false
    if (curListImage !== nextListImage) {
      data.list_image = nextListImage
      changed = true
    }
    if (curInchiImage !== nextInchiImage) {
      data.inchi_image = nextInchiImage
      changed = true
    }

    if (changed) {
      writeDoc(fp, data, content)
      updated++
    }
  }

  console.log(
    `InChI repair complete.\n` +
      `- substance pages scanned: ${files.length}\n` +
      `- files updated: ${updated}\n` +
      `- skipped (no inchikey): ${skippedNoKey}\n` +
      `- skipped (no local png/svg for inchikey): ${skippedNoLocalImage}\n`
  )
}

main()

