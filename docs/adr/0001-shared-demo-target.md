# ADR 0001: Shared Demo Target

## Status

Accepted

## Context

The repository needs to demonstrate UI, API, contract, performance, and security testing without feeling like unrelated examples stitched together.

## Decision

Use one shared sample application target for all automation layers.

## Consequences

- Positive: the portfolio reads as a coherent quality platform rather than a tooling showcase.
- Positive: cross-framework comparisons become credible because they exercise the same flows and data.
- Positive: CI, Docker, and debugging guidance stay simpler.
- Negative: the demo app carries more responsibility than a single-framework sample normally would.
- Negative: some specialized scenarios are constrained by the simplicity of the shared target.

