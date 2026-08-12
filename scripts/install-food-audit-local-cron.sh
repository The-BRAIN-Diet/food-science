#!/usr/bin/env bash
# Install a macOS LaunchAgent that runs the food-page audit locally on weekdays at 12:30.
# This replaces the mistaken Cursor Cloud Automation for this job.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LABEL="org.thebraindiet.food-audit-local"
PLIST="$HOME/Library/LaunchAgents/${LABEL}.plist"
DAILY="$ROOT/scripts/food-audit-local-daily.sh"
LOG_DIR="$ROOT/.food-audit-logs"

chmod +x "$ROOT/scripts/run-food-audit-today.sh" "$DAILY" "$ROOT/scripts/food-audit-try-deliver.sh" 2>/dev/null || true
mkdir -p "$HOME/Library/LaunchAgents" "$LOG_DIR"

# Weekdays 12:30 local time (LaunchAgents use the Mac's timezone).
cat >"$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${LABEL}</string>
  <key>WorkingDirectory</key>
  <string>${ROOT}</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>${DAILY}</string>
  </array>
  <key>StartCalendarInterval</key>
  <array>
    <dict><key>Weekday</key><integer>1</integer><key>Hour</key><integer>12</integer><key>Minute</key><integer>30</integer></dict>
    <dict><key>Weekday</key><integer>2</integer><key>Hour</key><integer>12</integer><key>Minute</key><integer>30</integer></dict>
    <dict><key>Weekday</key><integer>3</integer><key>Hour</key><integer>12</integer><key>Minute</key><integer>30</integer></dict>
    <dict><key>Weekday</key><integer>4</integer><key>Hour</key><integer>12</integer><key>Minute</key><integer>30</integer></dict>
    <dict><key>Weekday</key><integer>5</integer><key>Hour</key><integer>12</integer><key>Minute</key><integer>30</integer></dict>
  </array>
  <key>StandardOutPath</key>
  <string>${LOG_DIR}/launchd.out.log</string>
  <key>StandardErrorPath</key>
  <string>${LOG_DIR}/launchd.err.log</string>
  <key>RunAtLoad</key>
  <false/>
</dict>
</plist>
EOF

launchctl bootout "gui/$(id -u)/${LABEL}" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
launchctl enable "gui/$(id -u)/${LABEL}" 2>/dev/null || true

echo "Installed local food-audit LaunchAgent:"
echo "  label:  ${LABEL}"
echo "  plist:  ${PLIST}"
echo "  repo:   ${ROOT}"
echo "  when:   weekdays 12:30 (Mac local time)"
echo
echo "Test now:  bash scripts/food-audit-local-daily.sh"
echo "          or: launchctl kickstart -k gui/\$(id -u)/${LABEL}"
echo "Uninstall: bash scripts/uninstall-food-audit-local-cron.sh"
echo
echo "Important: turn OFF / delete the Cursor Cloud Automation named"
echo "  \"Food pages — 3-letter daily audit\" in Agents → Automations"
echo "so it does not keep running in the cloud."
