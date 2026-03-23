# ADR 0002: Playwright As Primary UI Stack

## Status

Accepted

## Context

The repository must signal current-market SDET strength while still showing experience with alternative and legacy browser tooling.

## Decision

Make Playwright the flagship UI stack and keep Cypress and Selenium as smaller supporting slices.

## Consequences

- Positive: the portfolio aligns with current expectations for modern web automation.
- Positive: traces, screenshots, retries, and browser isolation improve diagnosability.
- Positive: Cypress and Selenium still demonstrate breadth without tripling maintenance cost.
- Negative: some readers may want deeper Cypress examples than the repository currently includes.
- Negative: maintaining three UI stacks still introduces some duplication by design.

