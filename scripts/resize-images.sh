#!/bin/bash
set -euo pipefail

# Defaults can be overridden:
#   INPUT_DIR="foods/originals" OUTPUT_DIR="static/img/foods" bash scripts/resize-images.sh
INPUT_DIR="${INPUT_DIR:-./foods/originals}"
if [ ! -d "$INPUT_DIR" ]; then
  # Backward-compatible fallback
  INPUT_DIR="./static/img/foods/originals"
fi
OUTPUT_DIR="${OUTPUT_DIR:-./static/img/foods}"

slugify() {
  echo "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g'
}

mkdir -p "$OUTPUT_DIR"

for img in "$INPUT_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
  [ -e "$img" ] || continue

  filename="$(basename "$img")"
  name="${filename%.*}"
  slug="$(slugify "$name")"

  [ -n "$slug" ] || continue

  mkdir -p "$OUTPUT_DIR/$slug"

  # Read source dimensions after auto-orient.
  # Include newline so `read` succeeds under `set -e`.
  read -r w h < <(magick "$img" -auto-orient -format "%w %h\n" info:)

  # Thumbnail (always square)
  magick "$img" \
    -auto-orient \
    -resize "360x360^" \
    -gravity center \
    -extent 360x360 \
    -strip \
    -quality 80 \
    -define webp:method=6 \
    "$OUTPUT_DIR/$slug/${slug}_thumb.webp"

  # If portrait, keep medium/large square as well.
  if [ "$h" -gt "$w" ]; then
    # Medium square
    magick "$img" \
      -auto-orient \
      -resize "800x800^" \
      -gravity center \
      -extent 800x800 \
      -strip \
      -quality 80 \
      -define webp:method=6 \
      "$OUTPUT_DIR/$slug/${slug}_medium.webp"

    # Large square
    magick "$img" \
      -auto-orient \
      -resize "1400x1400^" \
      -gravity center \
      -extent 1400x1400 \
      -strip \
      -quality 82 \
      -define webp:method=6 \
      "$OUTPUT_DIR/$slug/${slug}_large.webp"
  else
    # Medium landscape/default
    magick "$img" \
      -auto-orient \
      -resize "800x>" \
      -strip \
      -quality 80 \
      -define webp:method=6 \
      "$OUTPUT_DIR/$slug/${slug}_medium.webp"

    # Large landscape/default
    magick "$img" \
      -auto-orient \
      -resize "1400x>" \
      -strip \
      -quality 82 \
      -define webp:method=6 \
      "$OUTPUT_DIR/$slug/${slug}_large.webp"
  fi

  echo "Processed: $img -> $OUTPUT_DIR/$slug"
done
