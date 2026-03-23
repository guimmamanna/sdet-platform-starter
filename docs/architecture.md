# Architecture

```mermaid
flowchart LR
    Dev[Engineer / Recruiter] --> Repo[sdet-platform-starter]
    Repo --> App[sample-app]
    Repo --> PW[Playwright]
    Repo --> CY[Cypress]
    Repo --> SEL[Selenium]
    Repo --> API[pytest API]
    Repo --> PACT[Pact]
    Repo --> PERF[k6]
    Repo --> SEC[OWASP ZAP]
    Repo --> CI[CI/CD]
    Repo --> DOCKER[Docker Compose]

    App --> UI[UI flows]
    App --> REST[REST API]
    App --> RESET[Test reset endpoints]

    PW --> UI
    CY --> UI
    SEL --> UI
    API --> REST
    PACT --> REST
    PERF --> REST
    SEC --> UI

    CI --> Reports[Artifacts and reports]
    DOCKER --> App
    DOCKER --> PW
    DOCKER --> API
```

## Design choices

- One shared sample target keeps the repository coherent and makes cross-framework comparisons credible.
- Playwright is treated as the primary stack because it best reflects current market expectations for modern UI automation.
- Cypress and Selenium are intentionally smaller. They demonstrate range without duplicating the entire Playwright suite.
- State reset endpoints are exposed only for controlled test environments and make the repo deterministic enough for CI, contract, and performance layers.
- The repository prefers simple local execution over a heavy platform abstraction layer.

