#!/usr/bin/env bash
# After a food-audit agent has fixed today's batch, try to deliver the commit.
# Order: commit (if dirty) -> push -> gh pr create -> print hash and stop.
# Never force-push. Never amend. Safe for cloud sandboxes without credentials.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

DEFAULT_MSG="Fix food pages for today letter-batch canonical audit"
MSG="${1:-$DEFAULT_MSG}"

if [[ -n "$(git status --porcelain)" ]]; then
  git add docs/foods/
  # Only commit if foods changed; avoid empty commits from unrelated dirt
  if git diff --cached --quiet; then
    echo "deliver: working tree dirty but no docs/foods/ changes staged - aborting commit"
    git status --short
    exit 2
  fi
  git commit -m "$MSG"
fi

HASH="$(git rev-parse --short HEAD)"
echo "deliver: HEAD=${HASH}"

PUSH_ERR="$(mktemp)"
if git push -u origin HEAD 2>"$PUSH_ERR"; then
  rm -f "$PUSH_ERR"
  echo "deliver: push succeeded"
  exit 0
fi

echo "deliver: push failed:"
cat "$PUSH_ERR" >&2 || true
rm -f "$PUSH_ERR"

if command -v gh >/dev/null 2>&1; then
  BODY_FILE="$(mktemp)"
  PR_ERR="$(mktemp)"
  cat >"$BODY_FILE" <<'PRBODY'
## Summary
- Automated food-page canonical audit fixes for todays letter batch.

## Test plan
- [ ] bash scripts/run-food-audit-today.sh passes on this branch
- [ ] Spot-check 1-2 edited pages against docs/foods/dark-chocolate.md
PRBODY
  if gh pr create --title "$MSG" --body-file "$BODY_FILE" 2>"$PR_ERR"; then
    rm -f "$BODY_FILE" "$PR_ERR"
    echo "deliver: opened PR via gh"
    exit 0
  fi
  echo "deliver: gh pr create failed:"
  cat "$PR_ERR" >&2 || true
  rm -f "$BODY_FILE" "$PR_ERR"
fi

echo "deliver: STOP - commit is local only."
echo "deliver: cherry-pick or pull this hash on a credentialed machine: ${HASH}"
echo "deliver: full: $(git rev-parse HEAD)"
exit 3
