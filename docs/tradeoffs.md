# Tradeoffs

## Why one monorepo

- Easier for a reviewer to scan one coherent platform than multiple disconnected starter repos.
- Lets the same demo target support UI, API, contract, performance, and security layers.
- The tradeoff is a larger repository and more tooling to bootstrap locally.

## Why not maximize every framework equally

- Equal depth across Playwright, Cypress, and Selenium would create maintenance-heavy duplication.
- The repo intentionally optimizes for signal: one modern flagship stack plus smaller breadth examples.

## Why the demo app is intentionally simple

- Reviewers need to understand the test value quickly.
- A smaller app keeps the quality engineering choices visible.
- The tradeoff is reduced realism compared with a multi-service production sample.

## Why Docker and AWS support are examples, not a full platform

- The repository is meant to be credible and runnable locally first.
- Full cloud infra would add noise and maintenance without improving recruiter signal proportionally.

## Why reports are artifact-driven

- SDETs are judged heavily on failure diagnosis and CI usability.
- Keeping JUnit, HTML, traces, videos, and text summaries central makes the repo more realistic than assertion-only examples.

