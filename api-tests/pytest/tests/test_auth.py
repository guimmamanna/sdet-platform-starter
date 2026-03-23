import pytest

from schemas.items import AuthResponseSchema


@pytest.mark.smoke
def test_login_returns_token_and_user_schema(api_client, demo_credentials) -> None:
    response = api_client.login(**demo_credentials)

    payload = AuthResponseSchema.model_validate(response.json())

    assert payload.user.username == demo_credentials["username"]
    assert payload.user.displayName == "Standard User"
    assert payload.token.startswith("token-")


@pytest.mark.regression
def test_login_rejects_invalid_credentials(api_client) -> None:
    response = api_client.request(
        "POST",
        "/auth/login",
        expected_status=401,
        json={"username": "not-a-user", "password": "bad-password"},
    )

    assert response.json()["error"]["message"] == "Invalid username or password"
