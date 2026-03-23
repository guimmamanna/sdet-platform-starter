# Microservices Reliability

## Goal

Build a distributed-systems quality engineering project focused on API compatibility, resilience, and non-functional risk in microservice environments.

## What this project would demonstrate

- contract-driven development for service consumers and providers
- service virtualization for unstable or expensive dependencies
- resilience testing around retries, timeouts, and fallback logic
- performance thresholds for core service paths
- release-readiness thinking for backward compatibility and partial failures

## Suggested stack

- Pact
- k6
- Testcontainers
- WireMock or MockServer
- Docker Compose
- GitHub Actions or Buildkite

## High-value scenarios

- backward-compatible response evolution
- idempotent POST and retry behaviour
- timeout handling when a downstream service degrades
- partial failure tolerance in fan-out workflows
- load validation for critical API paths

## Portfolio-ready structure

```text
microservices-reliability/
├── contract-tests/
├── virtualization/
├── performance/
├── docker/
├── ci/
└── docs/
```

## Recruiter signal

This project shows systems-level quality thinking and helps position you for SDET roles working with platform, backend, or cloud-native teams rather than only UI-heavy products.

## Next milestones

- add a two-service demo with one downstream dependency
- simulate degradation with service virtualization
- add compatibility and load gates to a sample pipeline

