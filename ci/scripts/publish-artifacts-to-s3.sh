#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${AWS_ARTIFACT_BUCKET:-}" ]]; then
  echo "AWS_ARTIFACT_BUCKET is not set. Skipping artifact upload."
  exit 0
fi

REPORT_DIR="${1:-artifacts}"
PREFIX="${S3_ARTIFACT_PREFIX:-sdet-platform-starter}"
RUN_ID="${CI_BUILD_ID:-local-$(date +%Y%m%d%H%M%S)}"

echo "Uploading ${REPORT_DIR} to s3://${AWS_ARTIFACT_BUCKET}/${PREFIX}/${RUN_ID}/"
aws s3 cp "${REPORT_DIR}" "s3://${AWS_ARTIFACT_BUCKET}/${PREFIX}/${RUN_ID}/" --recursive

