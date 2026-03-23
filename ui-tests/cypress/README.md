# Cypress

The Cypress slice is intentionally smaller than Playwright, but still production-shaped:

- custom commands for reset and login
- environment-aware configuration
- request interception for UI/API observability
- Mochawesome reporting for CI artifacts

Run it with:

```bash
npm --prefix ui-tests/cypress run test:headless
```

