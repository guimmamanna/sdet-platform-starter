from __future__ import annotations

import pytest

from pages.inventory_page import InventoryPage
from pages.login_page import LoginPage


@pytest.mark.smoke
def test_seeded_user_can_log_in(driver, ui_config) -> None:
    login_page = LoginPage(driver)
    login_page.open(ui_config.base_url)
    login_page.login(ui_config.username, ui_config.password)
    login_page.wait_for_workspace()

    inventory_page = InventoryPage(driver)
    assert "standard_user" in inventory_page.text("session-user")
    assert inventory_page.item_exists("Laptop stand")


@pytest.mark.regression
def test_user_can_complete_crud_flow(driver, ui_config) -> None:
    title = "Selenium legacy item"
    updated_title = "Selenium legacy item updated"

    login_page = LoginPage(driver)
    login_page.open(ui_config.base_url)
    login_page.login(ui_config.username, ui_config.password)
    login_page.wait_for_workspace()

    inventory_page = InventoryPage(driver)
    inventory_page.add_item(title, "Created from the Selenium legacy coverage layer.")
    assert "Item created successfully" in inventory_page.text("toast-message")

    inventory_page.search(title)
    assert inventory_page.item_exists(title)

    inventory_page.edit_item(title, updated_title, "Edited with explicit waits and page objects.")
    assert "Item updated successfully" in inventory_page.text("toast-message")

    inventory_page.search(updated_title)
    assert inventory_page.item_exists(updated_title)

    inventory_page.delete_item(updated_title)
    assert "Item deleted successfully" in inventory_page.text("toast-message")
