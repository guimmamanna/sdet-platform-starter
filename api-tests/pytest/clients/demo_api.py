from __future__ import annotations

from collections.abc import Iterable
from urllib.parse import urljoin

import requests


class DemoApiClient:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url.rstrip("/") + "/"
        self._client = requests.Session()
        self._client.headers.update({"Content-Type": "application/json"})
        self.timeout = 10.0

    def close(self) -> None:
        self._client.close()

    def request(
        self,
        method: str,
        path: str,
        expected_status: int | None = None,
        **kwargs,
    ) -> requests.Response:
        response = self._client.request(
            method,
            urljoin(self.base_url, path.lstrip("/")),
            timeout=kwargs.pop("timeout", self.timeout),
            **kwargs,
        )
        if expected_status is not None and response.status_code != expected_status:
            raise AssertionError(
                "Expected "
                f"{expected_status} for {method} {path}, "
                f"got {response.status_code}: {response.text}"
            )
        return response

    def login(self, username: str, password: str) -> requests.Response:
        response = self.request(
            "POST",
            "/auth/login",
            expected_status=200,
            json={"username": username, "password": password},
        )
        token = response.json()["token"]
        self._client.headers["Authorization"] = f"Bearer {token}"
        return response

    def reset_state(self, state: str = "default") -> requests.Response:
        return self.request("POST", "/test/reset", expected_status=200, json={"state": state})

    def list_items(self, query: str | None = None) -> requests.Response:
        params = {"q": query} if query else None
        return self.request("GET", "/items", expected_status=200, params=params)

    def create_item(self, payload: dict[str, object]) -> requests.Response:
        return self.request("POST", "/items", expected_status=201, json=payload)

    def update_item(self, item_id: str, payload: dict[str, object]) -> requests.Response:
        return self.request("PUT", f"/items/{item_id}", expected_status=200, json=payload)

    def delete_item(self, item_id: str) -> requests.Response:
        return self.request("DELETE", f"/items/{item_id}", expected_status=200)

    def titles(self) -> Iterable[str]:
        response = self.list_items()
        return [item["title"] for item in response.json()["items"]]
