# OWASP ZAP Baseline

This repository includes a safe baseline security scan wrapper aimed at owned or explicitly authorized environments.

What it demonstrates:

- reproducible baseline scans from Docker
- rules tuning via `baseline-rules.conf`
- artifact generation suitable for CI retention
- explicit acknowledgement that findings require engineering triage, not blanket suppression

Usage:

```bash
bash security-tests/zap/run-baseline.sh http://localhost:3000
```

Legal and ethical usage:

- Run scans only against systems you own or are authorized to assess.
- Never point automated security tooling at third-party production systems without written approval.
- Treat this as a starting point for secure SDLC integration, not a substitute for a formal security program.

