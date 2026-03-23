from __future__ import annotations

from selenium.webdriver.support import expected_conditions as EC

from pages.base_page import BasePage


class LoginPage(BasePage):
    def login(self, username: str, password: str) -> None:
        self.fill("login-username", username)
        self.fill("login-password", password)
        self.click("login-submit")

    def wait_for_workspace(self) -> None:
        self.wait.until(EC.visibility_of_element_located(self.by_test_id("inventory-workspace")))
