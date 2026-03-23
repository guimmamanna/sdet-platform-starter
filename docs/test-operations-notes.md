# Test Operations Notes

## Execution model

- Pull request focus: lint, smoke, and fastest regression indicators
- Main branch focus: broader regression and contract confidence
- Nightly focus: slower or more brittle legacy-stack coverage and extended runs

## Ownership model

- Playwright is the primary browser confidence layer
- API tests protect service behaviour and payload contracts
- Pact protects consumer-provider compatibility
- k6 and ZAP provide non-functional guardrails, not comprehensive platform monitoring

## Failure classification

- Product defect: deterministic business-rule or UI failure in the sample app
- Test defect: brittle assertion, unstable wait, or shared-state leak
- Environment defect: startup, dependency, browser, network, or CI runner issue

## Exit criteria for pull requests

- lint must pass
- API smoke must pass
- Playwright smoke must pass
- no newly introduced contract incompatibility

## Exit criteria for broader releases

- smoke layers pass
- targeted regression layers pass for affected scope
- contract verification passes
- performance thresholds stay within acceptable budget for the target environment
- security findings are reviewed rather than ignored silently

