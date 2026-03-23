import pytest

from schemas.items import ItemsResponseSchema


@pytest.mark.smoke
def test_list_items_returns_seeded_inventory(authenticated_client) -> None:
    response = authenticated_client.list_items()

    payload = ItemsResponseSchema.model_validate(response.json())

    assert payload.count >= 3
    assert any(item.title == "Laptop stand" for item in payload.items)
    assert len({item.title for item in payload.items}) == payload.count


@pytest.mark.regression
@pytest.mark.parametrize(
    ("query", "expected_title"),
    [
        ("Laptop", "Laptop stand"),
        ("headset", "Noise cancelling headset"),
    ],
)
def test_search_filters_items(authenticated_client, query: str, expected_title: str) -> None:
    response = authenticated_client.list_items(query=query)

    payload = ItemsResponseSchema.model_validate(response.json())

    assert payload.count >= 1
    assert all(
        query.lower() in f"{item.title} {item.description}".lower() for item in payload.items
    )
    assert any(item.title == expected_title for item in payload.items)


@pytest.mark.regression
def test_create_update_delete_item_respects_business_rules(
    authenticated_client, item_factory
) -> None:
    created = authenticated_client.create_item(item_factory.build()).json()["item"]
    assert created["owner"] == "standard_user"
    assert created["status"] == "active"

    updated_payload = {
        "title": f"{created['title']} updated",
        "description": "Updated through pytest API coverage to confirm edit behaviour.",
        "tags": ["api", "updated"],
    }
    updated = authenticated_client.update_item(created["id"], updated_payload).json()["item"]
    assert updated["title"] == updated_payload["title"]
    assert updated["description"] == updated_payload["description"]

    search_response = authenticated_client.list_items(query=updated_payload["title"])
    search_payload = ItemsResponseSchema.model_validate(search_response.json())
    assert search_payload.count == 1
    assert search_payload.items[0].id == created["id"]

    delete_response = authenticated_client.delete_item(created["id"])
    assert delete_response.json()["message"] == "Item deleted successfully"

    remaining_titles = authenticated_client.titles()
    assert updated_payload["title"] not in remaining_titles
