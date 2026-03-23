# Sample Reports

Checked-in sample outputs are included so reviewers can see the artifact style without waiting for CI to finish.

## Included artifacts

- [api-smoke-junit.xml](api-smoke-junit.xml)
- [playwright-smoke-junit.xml](playwright-smoke-junit.xml)
- [playwright-smoke-summary.txt](playwright-smoke-summary.txt)
- [k6-smoke-summary.json](k6-smoke-summary.json)
- [k6-smoke-output.txt](k6-smoke-output.txt)

## Why these are committed

- They make the repository easier to evaluate from GitHub alone.
- They show how smoke evidence is represented across functional and non-functional layers.
- They are small enough to keep in the repository without turning it into an artifact dump.

Larger runtime artifacts such as Playwright HTML reports, videos, screenshots on failure, and traces are still better retained in CI systems rather than committed to source control.

