# Data Pipeline Quality

## Goal

Build a data-quality automation project for an analytics or platform team where quality risks live in SQL, transformations, and data contracts rather than UI flows.

## What this project would demonstrate

- schema and contract validation for raw and curated datasets
- source-to-target reconciliation checks
- null, duplicate, freshness, and SLA assertions
- data factory or fixture generation for pipeline validation
- CI support for dbt models, SQL linting, and warehouse smoke checks

## Suggested stack

- Python + pytest
- pandas or polars
- SQLAlchemy
- Great Expectations or Soda
- dbt tests
- SQLFluff

## High-value scenarios

- ingestion schema drift detection
- row-count reconciliation between source and target
- financial or operational business-rule assertions
- freshness monitoring for downstream tables
- negative tests for malformed files and delayed upstream feeds

## Portfolio-ready structure

```text
data-pipeline-quality/
├── data-tests/
├── contracts/
├── sql/
├── ci/
└── docs/
```

## Recruiter signal

This project broadens the portfolio beyond web automation and shows that your quality mindset applies to platform, analytics, and decision-critical data systems.

## Next milestones

- add a small DuckDB or Postgres-backed demo pipeline
- create reconciliation tests for staged and curated tables
- wire data-quality results into a nightly CI job

