#!/usr/bin/env bash
# Wrapper for scheduled / cloud-agent food-page audits.
# Prefer this over `npm run food:audit:today` in Automations — it preflights
# required files and falls back to direct node when package.json is stale.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

fail() {
  echo "error: $*" >&2
  exit 127
}

echo "--- Food audit preflight ---"
echo "cwd: $ROOT"

[[ -f package.json ]] || fail "package.json missing (wrong working directory? expected food-science repo root)"
[[ -d docs/foods ]] || fail "docs/foods/ missing"
[[ -f scripts/food-page-letter-audit.mjs ]] || fail "scripts/food-page-letter-audit.mjs missing — pull latest main/paul12"
[[ -f scripts/lib/food-page-letter-schedule.mjs ]] || fail "scripts/lib/food-page-letter-schedule.mjs missing"
[[ -f scripts/lib/food-page-validation.mjs ]] || fail "scripts/lib/food-page-validation.mjs missing"
[[ -f system/food-page-schema.md ]] || fail "system/food-page-schema.md missing"

if [[ -f package.json ]] && node -e "const p=require('./package.json'); process.exit(p.scripts&&p.scripts['food:audit:today']?0:1)" 2>/dev/null; then
  echo "preflight: OK (npm script food:audit:today present)"
  echo "---"
  exec npm run food:audit:today -- "$@"
fi

echo "note: food:audit:today missing from package.json; running node scripts/food-page-letter-audit.mjs" >&2
echo "preflight: OK (direct node fallback)"
echo "---"
exec node scripts/food-page-letter-audit.mjs "$@"
