# Pytest API Tests

The API suite is intentionally structured like a real service-level automation layer:

- `clients/demo_api.py` centralizes HTTP behaviour and auth handling.
- `schemas/items.py` validates response contracts and business-shape guarantees.
- `data/factories.py` produces deterministic, low-collision test data.
- `conftest.py` resets shared state before every test to keep suites isolated.

Run locally:

```bash
pytest api-tests/pytest -m smoke
pytest api-tests/pytest -m regression
```

