# Framework Comparison

| Layer | Stack | Why it is here | Tradeoff |
| --- | --- | --- | --- |
| UI primary | Playwright + TypeScript | Fast parallel execution, modern tracing, rich fixture model | Larger initial footprint than a minimal browser tool |
| UI secondary | Cypress | Familiarity in many frontend teams, strong DOM ergonomics | Cross-browser and multi-tab behaviour are more constrained |
| UI legacy | Selenium + Python | Shows support for established enterprise stacks | More setup and slower feedback than Playwright |
| API | pytest + requests | Clear fixtures, parameterization, schema validation, Python readability | Separate language/toolchain from JS-based suites |
| Contract | Pact | Tight consumer-provider compatibility story | Requires discipline around broker and verification workflows |
| Performance | k6 | Lightweight, code-driven performance checks | Not a full observability platform by itself |
| Security | OWASP ZAP baseline | Practical entry point for shift-left security automation | Baseline scanning is not a full security assessment |
