# Shared Utilities

Shared assets are kept here when they are useful across multiple frameworks or delivery pipelines.

- `scripts/reset-demo-data.sh`: resets the sample application to a known state.
- `test-data/demo-users.json`: canonical credentials used by local examples.

The goal is consistency, not an over-engineered shared library. Cross-language helpers stay lightweight so each framework remains approachable.

