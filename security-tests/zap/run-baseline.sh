#!/usr/bin/env bash
set -euo pipefail

TARGET_URL="${1:-${APP_BASE_URL:-http://localhost:3000}}"
REPORT_DIR="security-tests/zap/reports"

mkdir -p "${REPORT_DIR}"

docker run --rm \
  -v "$(pwd):/zap/wrk:rw" \
  ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py \
  -t "${TARGET_URL}" \
  -r "/zap/wrk/${REPORT_DIR}/zap-baseline.html" \
  -J "/zap/wrk/${REPORT_DIR}/zap-baseline.json" \
  -c "/zap/wrk/security-tests/zap/baseline-rules.conf" \
  -I
