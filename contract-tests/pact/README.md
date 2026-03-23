# Pact Contract Tests

This folder demonstrates a simple but CI-friendly contract flow:

1. The consumer test generates a pact file from the expected `GET /api/items` interaction.
2. The provider verification test boots against the sample app and verifies the contract against real endpoints.
3. In a real delivery pipeline, the generated pact would be published to PactFlow or a broker, and provider verification would run as part of deployment readiness.

Local commands:

```bash
npm --prefix contract-tests/pact run test:consumer
npm --prefix contract-tests/pact run test:provider
```

CI/CD fit:

- Pull request: generate and verify contracts against the local provider.
- Main branch: publish contract metadata and verification results to PactFlow.
- Deployment gate: block release when a provider change breaks an accepted consumer contract.

