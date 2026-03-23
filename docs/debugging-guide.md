# Debugging Guide

## Failure workflow

1. Confirm whether the failure is product, environment, or test-code related.
2. Re-run the smallest relevant scope locally.
3. Review logs, traces, screenshots, API payloads, and DOM state before changing assertions.
4. Only add retries after root cause is understood.

## Flaky-test mitigation

- Prefer explicit waits tied to visible state changes.
- Reset data before tests that mutate the system.
- Use stable `data-testid` selectors, not layout-based selectors.
- Avoid cross-test dependencies and static data collisions.
- Keep browser tests independent and parallel-safe.

## Root-cause checklist

- Did the sample app start cleanly?
- Did test reset execute before the scenario?
- Did the selector or API schema change?
- Did a race appear between mutation and subsequent assertion?
- Did CI run in a different browser or network profile?

## Useful local commands

```bash
make smoke
npm --prefix ui-tests/playwright run test -- --headed
pytest api-tests/pytest -m regression -vv
bash security-tests/zap/run-baseline.sh http://localhost:3000
```

