#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="${1:-sample-app.log}"

npm --prefix sample-app run dev > "${LOG_FILE}" 2>&1 &
echo $! > sample-app.pid

bash ci/scripts/wait-for-url.sh "${APP_BASE_URL:-http://localhost:3000}/health" 60

