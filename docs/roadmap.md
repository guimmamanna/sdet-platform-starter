# Roadmap

## Milestone view

| Milestone | Intent | Status |
| --- | --- | --- |
| `v1.1 Portfolio Polish` | Improve repo presentation, documentation depth, and artifact storytelling | In progress |
| `v1.2 Quality Expansion` | Add accessibility, richer reports, and broader CI evidence | Planned |
| `v1.3 Platform Depth` | Add data, mobile, and microservice extension paths | Planned |

See [backlog.md](backlog.md) for the current live GitHub milestones and issue links.

## v1.2 Quality Expansion

- Add visual regression snapshots for the inventory UI.
- Publish Pact contracts to PactFlow with branch metadata.
- Add API performance assertions around error budgets and throughput trends.
- Add SARIF publishing for ZAP-derived findings.

## v1.3 Platform Depth

- Replace in-memory demo data with a lightweight database-backed mode.
- Add service virtualization examples for dependent APIs.
- Add mobile web coverage and cross-browser matrix execution.
- Add environment-specific data seeding profiles for staging-like runs.

## Longer horizon

- Introduce ephemeral preview environments for pull requests.
- Add synthetic production monitoring examples.
- Expand reporting dashboards to aggregate multi-framework results in a single view.

## Portfolio expansion tracks

- Build `portfolio-projects/mobile-device-automation` into a standalone mobile SDET repo.
- Add accessibility gates to the existing sample app and then spin that into a separate showcase project.
- Add a small database-backed demo to support `portfolio-projects/data-pipeline-quality`.
- Add a two-service distributed demo to support `portfolio-projects/microservices-reliability`.
