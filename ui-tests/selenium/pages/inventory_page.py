from __future__ import annotations

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

from pages.base_page import BasePage


class InventoryPage(BasePage):
    def add_item(self, title: str, description: str) -> None:
        self.fill("item-title", title)
        self.fill("item-description", description)
        self.click("item-submit")

    def search(self, query: str) -> None:
        self.fill("search-input", query)
        self.click("search-submit")

    def clear_search(self) -> None:
        self.click("search-clear")

    def edit_item(self, current_title: str, next_title: str, next_description: str) -> None:
        self._item_card(current_title).find_element(
            By.XPATH, ".//button[normalize-space()='Edit']"
        ).click()
        self.fill("item-title", next_title)
        self.fill("item-description", next_description)
        self.click("item-submit")

    def delete_item(self, title: str) -> None:
        self._item_card(title).find_element(
            By.XPATH, ".//button[normalize-space()='Delete']"
        ).click()

    def _item_card(self, title: str):
        return self.wait.until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    f"//li[contains(@class, 'item-card')][.//h4[normalize-space()='{title}']]",
                )
            )
        )

    def item_exists(self, title: str) -> bool:
        return (
            len(
                self.driver.find_elements(
                    By.XPATH,
                    f"//li[contains(@class, 'item-card')][.//h4[normalize-space()='{title}']]",
                )
            )
            == 1
        )
