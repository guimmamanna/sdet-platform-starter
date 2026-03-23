from __future__ import annotations

import pytest
import requests

from utils.config import get_ui_config
from utils.driver_factory import build_driver


@pytest.fixture(scope="session")
def ui_config():
    return get_ui_config()


@pytest.fixture(autouse=True)
def reset_demo_state(ui_config) -> None:
    response = requests.post(
        f"{ui_config.api_base_url}/test/reset",
        json={"state": "default"},
        timeout=10,
    )
    response.raise_for_status()


@pytest.fixture()
def driver(ui_config):
    driver = build_driver(ui_config)
    yield driver
    driver.quit()
