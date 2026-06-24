/**
 * Three-letter-per-day rotation for canonical food-page audits.
 * Anchor: 2026-06-24 = day 0 (A, B, C) — first scheduled automation run.
 */
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { FOODS_DIR_DEFAULT, SKIP_SLUGS } from "./food-page-validation.mjs"

export const SCHEDULE_EPOCH = "2026-06-24"

/** @type {readonly (readonly string[])[]} */
export const LETTER_GROUPS = [
  ["A", "B", "C"],
  ["D", "E", "F"],
  ["G", "H", "I"],
  ["J", "K", "L"],
  ["M", "N", "O"],
  ["P", "Q", "R"],
  ["S", "T", "U"],
  ["V", "W", "X"],
  ["Y", "Z"],
]

export function dayIndexFromDate(date = new Date(), epoch = SCHEDULE_EPOCH) {
  const start = new Date(`${epoch}T12:00:00`)
  const d = new Date(date)
  d.setHours(12, 0, 0, 0)
  const msPerDay = 24 * 60 * 60 * 1000
  const diff = Math.floor((d.getTime() - start.getTime()) / msPerDay)
  return ((diff % LETTER_GROUPS.length) + LETTER_GROUPS.length) % LETTER_GROUPS.length
}

export function lettersForDayIndex(index) {
  const i = ((index % LETTER_GROUPS.length) + LETTER_GROUPS.length) % LETTER_GROUPS.length
  return [...LETTER_GROUPS[i]]
}

export function lettersForDate(date = new Date(), epoch = SCHEDULE_EPOCH) {
  return lettersForDayIndex(dayIndexFromDate(date, epoch))
}

export function titleForSlug(foodsDir, slug) {
  const filePath = path.join(path.resolve(process.cwd(), foodsDir), `${slug}.md`)
  if (!fs.existsSync(filePath)) return slug
  const raw = fs.readFileSync(filePath, "utf8")
  const { data } = matter(raw)
  const title = data.title || slug
  return String(title).replace(/^['"]|['"]$/g, "").trim()
}

export function firstLetter(title) {
  const t = String(title || "").trim()
  if (!t) return ""
  return t[0].toUpperCase()
}

export function slugsForLetters(foodsDir = FOODS_DIR_DEFAULT, letters) {
  const letterSet = new Set(letters.map((l) => l.toUpperCase()))
  const dirAbs = path.resolve(process.cwd(), foodsDir)
  if (!fs.existsSync(dirAbs)) return []

  return fs
    .readdirSync(dirAbs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.basename(f, ".md"))
    .filter((slug) => !SKIP_SLUGS.has(slug))
    .filter((slug) => letterSet.has(firstLetter(titleForSlug(foodsDir, slug))))
    .sort((a, b) => titleForSlug(foodsDir, a).localeCompare(titleForSlug(foodsDir, b)))
}

export function buildRotationTable(epoch = SCHEDULE_EPOCH) {
  return LETTER_GROUPS.map((letters, index) => {
    const slugs = slugsForLetters(FOODS_DIR_DEFAULT, letters)
    return {
      day: index + 1,
      letters: letters.join(", "),
      count: slugs.length,
      slugs,
    }
  })
}

export function formatScheduleSummary(epoch = SCHEDULE_EPOCH) {
  const lines = [
    `Food page audit rotation (epoch ${epoch}, 9-day cycle):`,
    "",
    "| Day | Letters | Pages |",
    "| --- | ------- | ----- |",
  ]
  for (const row of buildRotationTable(epoch)) {
    lines.push(`| ${row.day} | ${row.letters} | ${row.count} |`)
  }
  return lines.join("\n")
}
