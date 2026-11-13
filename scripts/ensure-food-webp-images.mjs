#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const ROOT = process.cwd()
const STATIC_FOODS_DIR = path.join(ROOT, "static", "img", "foods")
const ORIGINALS_DIR = path.join(STATIC_FOODS_DIR, "originals")

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function originalImages() {
  return fs
    .readdirSync(ORIGINALS_DIR, {withFileTypes: true})
    .filter((entry) => entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name))
    .map((entry) => path.join(ORIGINALS_DIR, entry.name))
}

async function writeWebpVariants(sourcePath, slug) {
  const targetDir = path.join(STATIC_FOODS_DIR, slug)
  fs.mkdirSync(targetDir, {recursive: true})
  const mediumPath = path.join(targetDir, `${slug}_medium.webp`)
  const thumbPath = path.join(targetDir, `${slug}_thumb.webp`)
  await sharp(sourcePath).resize(1200, 675, {fit: "cover", position: "center"}).webp({quality: 82}).toFile(mediumPath)
  await sharp(sourcePath).resize(420, 420, {fit: "cover", position: "center"}).webp({quality: 82}).toFile(thumbPath)
}

async function main() {
  if (!fs.existsSync(ORIGINALS_DIR)) throw new Error(`Missing originals dir: ${ORIGINALS_DIR}`)

  const sources = originalImages()
  for (const sourcePath of sources) {
    const slug = slugify(path.basename(sourcePath, path.extname(sourcePath)))
    if (!slug) throw new Error(`Cannot name resized image for ${sourcePath}`)
    await writeWebpVariants(sourcePath, slug)
  }

  console.log(`Resized ${sources.length} image${sources.length === 1 ? "" : "s"} from originals.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
