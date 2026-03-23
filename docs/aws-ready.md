# AWS-Ready Notes

## Container-first execution

The repository is structured so the same test assets can run:

- locally through `make` or `docker compose`
- in AWS CodeBuild using `ci/codebuild/buildspec.yml`
- in ECS, EKS, or another container scheduler

## Configuration and secrets

- Non-secret config lives in `.env.example`.
- Secrets should be injected at runtime from AWS Secrets Manager or SSM Parameter Store.
- Never commit real credentials, broker tokens, or artifact bucket names tied to private infrastructure.

## Artifact publishing

`ci/scripts/publish-artifacts-to-s3.sh` is included as a simple placeholder for pushing reports to S3.

Typical artifacts:

- Playwright HTML report
- JUnit XML
- Pact files
- ZAP baseline outputs

## Operational extension points

- Add per-environment `.env` overlays through your pipeline system.
- Publish container images to ECR for the sample app or test runners.
- Fan out framework-specific jobs with CodeBuild batch builds if suite volume grows.

