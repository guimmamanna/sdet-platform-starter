#!/usr/bin/env bash
set -euo pipefail

API_BASE_URL="${API_BASE_URL:-http://localhost:3000/api}"

curl --silent --show-error --fail \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{"state":"default"}' \
  "${API_BASE_URL}/test/reset" >/dev/null

echo "Demo data reset via ${API_BASE_URL}/test/reset"

