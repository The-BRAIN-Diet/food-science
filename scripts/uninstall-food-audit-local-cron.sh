#!/usr/bin/env bash
# Remove the local food-page audit LaunchAgent.
set -euo pipefail

LABEL="org.thebraindiet.food-audit-local"
PLIST="$HOME/Library/LaunchAgents/${LABEL}.plist"

launchctl bootout "gui/$(id -u)/${LABEL}" 2>/dev/null || true
rm -f "$PLIST"

echo "Removed local food-audit LaunchAgent (${LABEL})."
echo "If a Cursor Cloud Automation still exists, disable it in Agents → Automations."
