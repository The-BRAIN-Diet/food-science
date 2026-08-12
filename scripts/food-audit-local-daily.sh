#!/usr/bin/env bash
# Local weekday food-page audit for this checkout (e.g. paul12 on localhost).
# Invoked by LaunchAgent — does NOT use Cursor Cloud Automations.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

LOG_DIR="${FOOD_AUDIT_LOG_DIR:-$ROOT/.food-audit-logs}"
mkdir -p "$LOG_DIR"
STAMP="$(date +%Y-%m-%d_%H%M%S)"
LOG_FILE="$LOG_DIR/audit-${STAMP}.log"
LATEST="$LOG_DIR/latest.log"
PROMPT_FILE="$LOG_DIR/open-in-cursor-prompt.md"

PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"
export PATH

{
  echo "=== Food audit (local) ${STAMP} ==="
  echo "cwd: $ROOT"
  echo "branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
  echo "head: $(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
  echo
} | tee "$LOG_FILE"

set +e
bash "$ROOT/scripts/run-food-audit-today.sh" 2>&1 | tee -a "$LOG_FILE"
STATUS=${PIPESTATUS[0]}
set -e

cp "$LOG_FILE" "$LATEST"

if [[ "$STATUS" -eq 0 ]]; then
  rm -f "$PROMPT_FILE"
  if [[ "${FOOD_AUDIT_NOTIFY_OK:-0}" == "1" ]]; then
    osascript -e 'display notification "Today'\''s letter batch is already canonical." with title "Food audit OK"' 2>/dev/null || true
  fi
  echo "local-audit: OK (exit 0)" | tee -a "$LOG_FILE"
  exit 0
fi

cat >"$PROMPT_FILE" <<EOF
# Food page audit — local fix prompt ($(date +%Y-%m-%d))

Working directory: \`$ROOT\` (current branch; keep work on this local checkout).

1. Run \`bash scripts/run-food-audit-today.sh\` and read the failures.
2. Fix **only today's letter-batch** pages to match \`system/food-page-schema.md\` (example: \`docs/foods/dark-chocolate.md\`).
3. Re-run \`bash scripts/run-food-audit-today.sh\` until OK.
4. When you want live updated: commit + push from this machine (do not use cloud Automations for this).

Latest log: \`$LATEST\`
EOF

osascript -e 'display notification "Letter-batch pages need canonical fixes. See .food-audit-logs/open-in-cursor-prompt.md" with title "Food audit needs work"' 2>/dev/null || true

echo "local-audit: FAIL (exit $STATUS) — prompt written to $PROMPT_FILE" | tee -a "$LOG_FILE"
exit "$STATUS"
