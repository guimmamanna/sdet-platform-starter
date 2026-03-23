from __future__ import annotations

from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


class BasePage:
    def __init__(self, driver: WebDriver) -> None:
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def open(self, path: str) -> None:
        self.driver.get(path)

    def by_test_id(self, test_id: str):
        return (By.CSS_SELECTOR, f'[data-testid="{test_id}"]')

    def fill(self, test_id: str, value: str) -> None:
        element = self.wait.until(EC.visibility_of_element_located(self.by_test_id(test_id)))
        element.clear()
        element.send_keys(value)

    def click(self, test_id: str) -> None:
        element = self.wait.until(EC.element_to_be_clickable(self.by_test_id(test_id)))
        element.click()

    def text(self, test_id: str) -> str:
        element = self.wait.until(EC.visibility_of_element_located(self.by_test_id(test_id)))
        return element.text
