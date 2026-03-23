# Contributing

## Principles

This repository is intended to model production-minded SDET practices:

- Keep tests deterministic and environment-aware.
- Prefer clear abstractions over cleverness.
- Treat flaky behaviour as an engineering problem, not a retry strategy.
- Document tradeoffs when adding tooling or pipeline complexity.

## Local Setup

1. Create and activate a Python virtual environment.
2. Copy `.env.example` to `.env` and adjust any local ports if needed.
3. Run `make bootstrap`.
4. Start the sample application with `make dev`.
5. In another terminal, run the suites you need.

## Branching

- Use short-lived branches.
- Name branches by intent, for example `feat/playwright-reporting` or `fix/api-negative-cases`.
- Keep pull requests focused; avoid mixing test framework changes with unrelated app changes.

## Quality Gate

Before opening a pull request, run:

```bash
make lint
make smoke
```

Add targeted commands when touching a specific area:

```bash
make test-cypress
make test-selenium
make test-contract
```

## Pull Requests

- Describe the behavioural change and the risk profile.
- Link any issue or roadmap item.
- Include screenshots or report artifacts when UI behaviour changes.
- Call out any new environment variables, tags, or pipeline dependencies.

## Test Authoring Standards

- Use stable `data-testid` selectors for browser automation.
- Keep assertions close to business outcomes.
- Reset shared test state before tests that mutate data.
- Prefer explicit waits tied to observable state over arbitrary sleeps.
- Add comments only when the intent is not obvious from code.

