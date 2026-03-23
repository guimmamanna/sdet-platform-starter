import pytest


@pytest.mark.regression
def test_create_item_validates_minimum_lengths(authenticated_client) -> None:
    response = authenticated_client.request(
        "POST",
        "/items",
        expected_status=400,
        json={"title": "No", "description": "bad", "tags": ["api"]},
    )

    body = response.json()
    assert body["error"]["message"] == "Item payload is invalid"
    assert "title" in body["error"]["details"]["fieldErrors"]


@pytest.mark.regression
def test_duplicate_item_names_are_rejected(authenticated_client) -> None:
    response = authenticated_client.request(
        "POST",
        "/items",
        expected_status=409,
        json={
            "title": "Laptop stand",
            "description": "Duplicate titles should fail cleanly in negative coverage.",
            "tags": ["api"],
        },
    )

    assert "already exists" in response.json()["error"]["message"]


@pytest.mark.regression
def test_delete_missing_item_returns_404(authenticated_client) -> None:
    response = authenticated_client.request(
        "DELETE", "/items/item-does-not-exist", expected_status=404
    )

    assert response.json()["error"]["message"] == "Item item-does-not-exist was not found"
