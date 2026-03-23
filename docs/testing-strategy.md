# Testing Strategy

## Scope by layer

- `smoke`: fastest confidence checks for authentication, seeded inventory visibility, and API health.
- `regression`: CRUD, search, validation, and end-to-end behaviour across UI and API layers.
- `contract`: consumer expectations between a UI client and the provider API.
- `performance`: latency and error-rate thresholds under smoke, load, and stress profiles.
- `security`: baseline passive and lightweight active checks through ZAP.

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

