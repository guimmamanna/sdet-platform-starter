# ADR 0003: Deterministic Test State Controls

## Status

Accepted

## Context

Mutating browser, API, and contract tests become fragile quickly if they share mutable state or rely on manual environment cleanup.

## Decision

Expose dedicated test-only reset and provider-state endpoints in the sample application and document them as non-production controls.

## Consequences

- Positive: suites stay parallel-safe and repeatable.
- Positive: contract verification can prepare provider state explicitly.
- Positive: local debugging becomes faster and less error-prone.
- Negative: the application surface includes endpoints that would be unsafe in production if not isolated properly.
- Negative: realism is slightly reduced versus using only user-visible setup flows.

