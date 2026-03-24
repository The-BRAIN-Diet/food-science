#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

INPUT_DIR="$ROOT_DIR/static/img/foods/originals"
OUTPUT_DIR="$ROOT_DIR/static/img/foods"

THUMB_SIZE=400
MEDIUM_W=1200
MEDIUM_H=800
LARGE_W=1800
LARGE_H=1200

QUALITY_THUMB=78
QUALITY_MEDIUM=80
QUALITY_LARGE=82

BG_COLOR="#f7f5f0"

mkdir -p "$OUTPUT_DIR"

echo "INPUT_DIR=$INPUT_DIR"
echo "OUTPUT_DIR=$OUTPUT_DIR"

for img in "$INPUT_DIR"/*; do
  [ -f "$img" ] || continue

  filename="$(basename "$img")"
  slug="${filename%.*}"

  mkdir -p "$OUTPUT_DIR/$slug"

  echo "Processing: $img"

  # Thumb: always square
  magick "$img" \
    -auto-orient \
    -resize "${THUMB_SIZE}x${THUMB_SIZE}^" \
    -gravity center \
    -extent "${THUMB_SIZE}x${THUMB_SIZE}" \
    -strip \
    -quality "$QUALITY_THUMB" \
    -define webp:method=6 \
    "$OUTPUT_DIR/$slug/${slug}_thumb.webp"

  # Medium: always fixed landscape canvas
  magick "$img" \
    -auto-orient \
    -resize "${MEDIUM_W}x${MEDIUM_H}" \
    -background "$BG_COLOR" \
    -gravity center \
    -extent "${MEDIUM_W}x${MEDIUM_H}" \
    -strip \
    -quality "$QUALITY_MEDIUM" \
    -define webp:method=6 \
    "$OUTPUT_DIR/$slug/${slug}_medium.webp"

  # Large: always fixed landscape canvas
  magick "$img" \
    -auto-orient \
    -resize "${LARGE_W}x${LARGE_H}" \
    -background "$BG_COLOR" \
    -gravity center \
    -extent "${LARGE_W}x${LARGE_H}" \
    -strip \
    -quality "$QUALITY_LARGE" \
    -define webp:method=6 \
    "$OUTPUT_DIR/$slug/${slug}_large.webp"

  echo "Processed: $img -> $OUTPUT_DIR/$slug"
done

echo "All images processed."
