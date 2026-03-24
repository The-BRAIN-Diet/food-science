#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import sharp from "sharp"

const ROOT = process.cwd()
const FOODS_DIR = path.join(ROOT, "docs", "foods")
const STATIC_FOODS_DIR = path.join(ROOT, "static", "img", "foods")
const ICON_FALLBACK = path.join(ROOT, "static", "img", "icons", "ingredients.svg")
const SKIP = new Set(["index.md", "shopping-list.md"])

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function norm(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "")
}

function walkFiles(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walkFiles(p))
    else out.push(p)
  }
  return out
}

function getFoodDocs() {
  const files = fs
    .readdirSync(FOODS_DIR)
    .filter((f) => f.endsWith(".md") && !SKIP.has(f))
    .map((f) => path.join(FOODS_DIR, f))

  return files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf8")
    const parsed = matter(raw)
    const slug = slugify(parsed.data.id || path.basename(filePath, ".md"))
    const title = String(parsed.data.title || slug)
    return {filePath, raw, parsed, slug, title}
  })
}

function collectExistingImageFiles() {
  const all = walkFiles(STATIC_FOODS_DIR)
  const bitmap = all.filter((p) => /\.(webp|png|jpg|jpeg)$/i.test(p))
  return bitmap
}

function pickSourceForSlug(slug, frontMatterListImagePath, allImageFiles) {
  const slugNorm = norm(slug)

  const candidates = allImageFiles.filter((p) => {
    const b = path.basename(p)
    const rel = path.relative(STATIC_FOODS_DIR, p)
    const n = norm(rel)
    const isOriginals = rel.includes(`${path.sep}originals${path.sep}`) || rel.includes(`${path.sep}originals1${path.sep}`)
    if (isOriginals) return false
    // Do not use already-generated webp variants as source; that causes recursive bogus images.
    return n.includes(slugNorm) && /\.(png|jpg|jpeg)$/i.test(b)
  })
  if (candidates.length > 0) return candidates[0]

  if (typeof frontMatterListImagePath === "string" && frontMatterListImagePath.startsWith("/img/")) {
    const local = path.join(ROOT, "static", frontMatterListImagePath.replace(/^\/img\//, "img/"))
    if (fs.existsSync(local) && /\.(png|jpg|jpeg)$/i.test(local)) return local
  }

  const originals = allImageFiles.filter((p) => {
    const rel = path.relative(STATIC_FOODS_DIR, p)
    const isOriginals = rel.includes(`${path.sep}originals${path.sep}`) || rel.includes(`${path.sep}originals1${path.sep}`)
    return isOriginals && norm(rel).includes(slugNorm)
  })
  if (originals.length > 0) return originals[0]

  return ICON_FALLBACK
}

function shouldGenerateFromSource(sourcePath) {
  if (!sourcePath) return false
  const resolved = path.resolve(sourcePath)
  if (resolved === path.resolve(ICON_FALLBACK)) return false
  return /\.(png|jpg|jpeg)$/i.test(sourcePath)
}

async function writeWebpVariants(sourcePath, slug) {
  const targetDir = path.join(STATIC_FOODS_DIR, slug)
  fs.mkdirSync(targetDir, {recursive: true})

  const mediumPath = path.join(targetDir, `${slug}_medium.webp`)
  const thumbPath = path.join(targetDir, `${slug}_thumb.webp`)
  const sourceResolved = path.resolve(sourcePath)
  const mediumResolved = path.resolve(mediumPath)
  const thumbResolved = path.resolve(thumbPath)

  if (sourceResolved === mediumResolved || sourceResolved === thumbResolved) {
    const input = await sharp(sourcePath).toBuffer()
    await sharp(input)
      .resize(1200, 675, {fit: "cover", position: "center"})
      .webp({quality: 82})
      .toFile(mediumPath)
    await sharp(input)
      .resize(420, 420, {fit: "cover", position: "center"})
      .webp({quality: 82})
      .toFile(thumbPath)
    return
  }

  await sharp(sourcePath).resize(1200, 675, {fit: "cover", position: "center"}).webp({quality: 82}).toFile(mediumPath)
  await sharp(sourcePath).resize(420, 420, {fit: "cover", position: "center"}).webp({quality: 82}).toFile(thumbPath)
}

async function main() {
  if (!fs.existsSync(FOODS_DIR)) throw new Error(`Missing foods dir: ${FOODS_DIR}`)
  if (!fs.existsSync(STATIC_FOODS_DIR)) throw new Error(`Missing static foods dir: ${STATIC_FOODS_DIR}`)

  const docs = getFoodDocs()
  const allImageFiles = collectExistingImageFiles()

  let generated = 0
  let updatedDocs = 0

  for (const doc of docs) {
    const {parsed, slug, filePath} = doc
    const source = pickSourceForSlug(slug, parsed.data.list_image, allImageFiles)
    if (shouldGenerateFromSource(source)) {
      await writeWebpVariants(source, slug)
    }
    generated++

    const thumb = `/img/foods/${slug}/${slug}_thumb.webp`
    const medium = `/img/foods/${slug}/${slug}_medium.webp`
    const nextData = {
      ...parsed.data,
      legacy_list_image:
        typeof parsed.data.legacy_list_image === "string"
          ? parsed.data.legacy_list_image
          : parsed.data.list_image,
      legacy_main_image:
        typeof parsed.data.legacy_main_image === "string"
          ? parsed.data.legacy_main_image
          : parsed.data.main_image || parsed.data.list_image,
      list_image: fs.existsSync(path.join(STATIC_FOODS_DIR, slug, `${slug}_thumb.webp`))
        ? thumb
        : parsed.data.list_image,
      main_image: fs.existsSync(path.join(STATIC_FOODS_DIR, slug, `${slug}_medium.webp`))
        ? medium
        : undefined,
    }
    if (nextData.main_image === undefined) delete nextData.main_image
    const next = matter.stringify(parsed.content, nextData, {lineWidth: 9999})
    fs.writeFileSync(filePath, next, "utf8")
    updatedDocs++
  }

  console.log(`WebP ensured for ${generated} foods; front matter updated for ${updatedDocs} pages.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

