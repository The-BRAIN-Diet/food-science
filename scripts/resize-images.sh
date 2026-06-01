#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

INPUT_DIR="$ROOT_DIR/static/img/foods/originals"
OUTPUT_DIR="$ROOT_DIR/static/img/foods"
FOODS_DIR="$ROOT_DIR/docs/foods"

# Originals must be named exactly like the food page id (slug): e.g. spinach.png, cheddar-cheese.png
FOOD_SLUGS="$(find "$FOODS_DIR" -maxdepth 1 -name '*.md' ! -name 'index.md' ! -name 'shopping-list.md' -exec basename {} .md \; | sort)"

slugify_filename() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[[:space:]]+/-/g; s/[^a-z0-9._-]+//g; s/-+/-/g; s/^-+|-+$//g'
}

is_food_slug() {
  local want="$1" candidate
  while IFS= read -r candidate; do
    [ "$candidate" = "$want" ] && return 0
  done <<< "$FOOD_SLUGS"
  return 1
}

THUMB_SIZE=400
MEDIUM_H=800
LARGE_H=1200

QUALITY_THUMB=78
QUALITY_MEDIUM=80
QUALITY_LARGE=82

mkdir -p "$OUTPUT_DIR"

echo "INPUT_DIR=$INPUT_DIR"
echo "OUTPUT_DIR=$OUTPUT_DIR"

for img in "$INPUT_DIR"/*; do
  [ -f "$img" ] || continue

  filename="$(basename "$img")"
  slug="$(slugify_filename "${filename%.*}")"

  if ! is_food_slug "$slug"; then
    echo "ERROR: '$filename' -> slug '$slug' does not match any docs/foods page id." >&2
    echo "Rename the file in originals to match the food id (e.g. cheddar-cheese.png)." >&2
    exit 1
  fi

  mkdir -p "$OUTPUT_DIR/$slug"

  dims="$(magick identify -format "%w %h" "$img")"
  w="${dims%% *}"
  h="${dims##* }"

  echo "Processing: $img (${w}x${h})"

  # Thumb (square)
  magick "$img" \
    -auto-orient \
    -resize "${THUMB_SIZE}x${THUMB_SIZE}^" \
    -gravity center \
    -extent "${THUMB_SIZE}x${THUMB_SIZE}" \
    -strip \
    -quality "$QUALITY_THUMB" \
    -define webp:method=6 \
    "$OUTPUT_DIR/$slug/${slug}_thumb.webp"

  if [ "$h" -gt "$w" ]; then
    # Portrait → square
    magick "$img" \
      -auto-orient \
      -resize "${MEDIUM_H}x${MEDIUM_H}^" \
      -gravity center \
      -extent "${MEDIUM_H}x${MEDIUM_H}" \
      -strip \
      -quality "$QUALITY_MEDIUM" \
      -define webp:method=6 \
      "$OUTPUT_DIR/$slug/${slug}_medium.webp"

    magick "$img" \
      -auto-orient \
      -resize "${LARGE_H}x${LARGE_H}^" \
      -gravity center \
      -extent "${LARGE_H}x${LARGE_H}" \
      -strip \
      -quality "$QUALITY_LARGE" \
      -define webp:method=6 \
      "$OUTPUT_DIR/$slug/${slug}_large.webp"

  elif [ "$h" -eq "$w" ]; then
    # Square → keep square
    magick "$img" \
      -auto-orient \
      -resize "${MEDIUM_H}x${MEDIUM_H}" \
      -strip \
      -quality "$QUALITY_MEDIUM" \
      -define webp:method=6 \
      "$OUTPUT_DIR/$slug/${slug}_medium.webp"

    magick "$img" \
      -auto-orient \
      -resize "${LARGE_H}x${LARGE_H}" \
      -strip \
      -quality "$QUALITY_LARGE" \
      -define webp:method=6 \
      "$OUTPUT_DIR/$slug/${slug}_large.webp"

  else
    # Landscape → normalise height
    magick "$img" \
      -auto-orient \
      -resize "x${MEDIUM_H}" \
      -strip \
      -quality "$QUALITY_MEDIUM" \
      -define webp:method=6 \
      "$OUTPUT_DIR/$slug/${slug}_medium.webp"

    magick "$img" \
      -auto-orient \
      -resize "x${LARGE_H}" \
      -strip \
      -quality "$QUALITY_LARGE" \
      -define webp:method=6 \
      "$OUTPUT_DIR/$slug/${slug}_large.webp"
  fi

  echo "Processed: $img -> $OUTPUT_DIR/$slug"
done

echo "All images processed."
