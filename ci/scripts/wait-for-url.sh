#!/usr/bin/env bash
set -euo pipefail

TARGET_URL="${1:?target url required}"
TIMEOUT_SECONDS="${2:-30}"
ATTEMPT=0

until curl --silent --show-error --fail "${TARGET_URL}" >/dev/null 2>&1; do
  ATTEMPT=$((ATTEMPT + 1))
  if [[ "${ATTEMPT}" -ge "${TIMEOUT_SECONDS}" ]]; then
    echo "Timed out waiting for ${TARGET_URL}" >&2
    exit 1
  fi
  sleep 1
done

echo "Ready: ${TARGET_URL}"

