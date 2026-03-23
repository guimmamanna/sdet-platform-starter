# Playwright

Playwright is the flagship browser stack in this repository. It demonstrates the style expected from a modern SDET codebase:

- TypeScript-first test authoring.
- Page objects backed by stable `data-testid` selectors.
- Auto-reset fixtures for deterministic state.
- Tagged execution for smoke and regression coverage.
- Parallel execution with retries and failure artifacts.
- HTML and JUnit reports for CI visibility.

Useful commands:

```bash
npm --prefix ui-tests/playwright run test:smoke
npm --prefix ui-tests/playwright run test:regression
npm --prefix ui-tests/playwright run report
```

