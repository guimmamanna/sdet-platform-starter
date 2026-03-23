# Accessibility Quality Gates

## Goal

Build a project focused on accessible user journeys and CI-enforced quality gates for modern web applications.

## What this project would demonstrate

- automated accessibility scanning as part of pull-request validation
- keyboard-only journey coverage
- regression checks for roles, labels, focus order, and form error messaging
- Lighthouse performance and accessibility budgets
- collaboration mindset with frontend and design systems teams

## Suggested stack

- Playwright
- `@axe-core/playwright`
- Lighthouse CI
- TypeScript
- GitHub Actions for accessibility artifact publishing

## High-value scenarios

- authenticated landing page accessibility
- keyboard navigation for dialogs, menus, and search flows
- accessible error handling for invalid form submissions
- visual focus visibility checks
- color-contrast enforcement and heading hierarchy validation

## Portfolio-ready structure

```text
accessibility-quality-gates/
├── tests/a11y/
├── tests/keyboard/
├── lhci/
├── ci/
└── docs/
```

## Recruiter signal

This project shows quality engineering maturity beyond “does it work?” and into “can all users use it reliably?”, which stands out with engineering leaders and design-system teams.

## Next milestones

- add axe scans against the existing sample app
- publish accessibility reports as CI artifacts
- add per-page accessibility baselines and exception review workflow

