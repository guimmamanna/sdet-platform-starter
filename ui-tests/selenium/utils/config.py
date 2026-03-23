from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class UiConfig:
    base_url: str = os.getenv("APP_BASE_URL", "http://localhost:3000")
    api_base_url: str = os.getenv("API_BASE_URL", "http://localhost:3000/api")
    browser: str = os.getenv("SELENIUM_BROWSER", "chrome")
    headless: bool = os.getenv("SELENIUM_HEADLESS", "true").lower() == "true"
    username: str = os.getenv("DEMO_USERNAME", "standard_user")
    password: str = os.getenv("DEMO_PASSWORD", "Password123!")


def get_ui_config() -> UiConfig:
    return UiConfig()
