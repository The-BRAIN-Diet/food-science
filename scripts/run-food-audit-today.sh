#!/usr/bin/env bash
# Wrapper for scheduled / cloud-agent food-page audits.
# Works even when package.json has not yet picked up food:audit:today on the checked-out branch.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -f package.json ]] && node -e "const p=require('./package.json'); process.exit(p.scripts&&p.scripts['food:audit:today']?0:1)" 2>/dev/null; then
  exec npm run food:audit:today -- "$@"
fi

if [[ -f scripts/food-page-letter-audit.mjs ]]; then
  echo "note: food:audit:today missing from package.json; running node scripts/food-page-letter-audit.mjs" >&2
  exec node scripts/food-page-letter-audit.mjs "$@"
fi

echo "error: food audit tooling not found in $(pwd)" >&2
echo "expected: package.json scripts.food:audit:today or scripts/food-page-letter-audit.mjs" >&2
exit 127
