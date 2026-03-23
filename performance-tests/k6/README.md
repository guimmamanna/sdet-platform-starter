# k6 Performance Tests

The k6 suite covers three practical layers:

- `smoke.js`: a fast gate for basic availability and response-time regressions
- `load.js`: representative authenticated traffic against seeded inventory endpoints
- `stress.js`: higher concurrency to expose headroom and failure modes

Interpretation guidance:

- `http_req_failed` captures outright request errors.
- `p(95)` thresholds reflect user-perceived latency rather than only averages.
- A failed stress threshold is not automatically a release blocker; it should trigger investigation and capacity analysis.

Example:

```bash
k6 run performance-tests/k6/load.js
```

