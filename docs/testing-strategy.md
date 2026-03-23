# Testing Strategy

## Scope by layer

- `smoke`: fastest confidence checks for authentication, seeded inventory visibility, and API health.
- `regression`: CRUD, search, validation, and end-to-end behaviour across UI and API layers.
- `contract`: consumer expectations between a UI client and the provider API.
- `performance`: latency and error-rate thresholds under smoke, load, and stress profiles.
- `security`: baseline passive and lightweight active checks through ZAP.

## Release gating philosophy

- Browser smoke and API smoke should be fast enough to protect pull requests.
- Heavier regression layers should align to changed risk, not run indiscriminately on every workflow.
- Contract tests should fail early when compatibility changes, even if endpoint-level tests still pass.
- Non-functional checks should provide evidence for readiness, not just extra console output.

## Shift-left principles

- Validate contracts early so API changes fail before release.
- Keep schema validation close to API tests to catch drift quickly.
- Use CI artifacts so failures are diagnosable from pull requests.
- Favor stable selectors and data reset hooks over fragile test logic.

## Environment isolation

- Every mutating suite resets the sample app state before execution.
- Auth tokens are created per run or replaced with an explicit test token when provider verification requires it.
- Demo data is seeded centrally and documented under `shared-utils`.

## Test data management

- Seed data covers common flows and edge cases.
- Factories create low-collision items for mutation tests.
- Search and duplicate-name validations are intentionally predictable so failures are easy to classify.

## Selector strategy

- Use `data-testid` for automation stability.
- Avoid selectors tied to layout, styling, or incidental text where possible.
- Keep selector naming consistent with business intent so failures are diagnosable quickly.

## Parallelization notes

- Playwright runs in parallel and resets app state before tests to avoid cross-test coupling.
- API tests reset state automatically through fixtures.
- Legacy Selenium coverage stays intentionally smaller to reduce maintenance cost and flaky surface area.

## Diagnostic expectations

- UI failures should retain screenshots, traces, and video where useful.
- API failures should make status, path, and payload mismatches obvious in the assertion message.
- CI should retain artifacts so triage can happen without rerunning everything locally.
