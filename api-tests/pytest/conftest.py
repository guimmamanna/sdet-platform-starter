from __future__ import annotations

import os

import pytest

from clients.demo_api import DemoApiClient
from data.factories import ItemFactory


@pytest.fixture(scope="session")
def api_base_url() -> str:
    return os.getenv("API_BASE_URL", "http://localhost:3000/api")


@pytest.fixture(scope="session")
def demo_credentials() -> dict[str, str]:
    return {
        "username": os.getenv("DEMO_USERNAME", "standard_user"),
        "password": os.getenv("DEMO_PASSWORD", "Password123!"),
    }


@pytest.fixture()
def api_client(api_base_url: str) -> DemoApiClient:
    client = DemoApiClient(api_base_url)
    yield client
    client.close()


@pytest.fixture(autouse=True)
def reset_demo_state(api_client: DemoApiClient) -> None:
    api_client.reset_state()


@pytest.fixture()
def authenticated_client(
    api_client: DemoApiClient, demo_credentials: dict[str, str]
) -> DemoApiClient:
    api_client.login(**demo_credentials)
    return api_client


@pytest.fixture()
def item_factory() -> ItemFactory:
    return ItemFactory()
