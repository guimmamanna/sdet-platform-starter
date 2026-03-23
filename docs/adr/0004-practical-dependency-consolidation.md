# ADR 0004: Practical Dependency Consolidation

## Status

Accepted

## Context

The initial API layer used `httpx`, but the combined local bootstrap path created avoidable transitive dependency friction alongside Selenium in one shared Python environment.

## Decision

Use `requests` for the current API client abstraction to keep the repository bootstrap stable and simple in a single local environment.

## Consequences

- Positive: onboarding friction is reduced for recruiters and reviewers cloning the repo locally.
- Positive: the API client remains clear and production-style enough for the portfolio goal.
- Negative: async-first API patterns are not demonstrated in this version.
- Negative: the repo gives up one modern Python HTTP client in favor of practical stability.

