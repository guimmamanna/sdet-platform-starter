from __future__ import annotations

from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions

from utils.config import UiConfig


def build_driver(config: UiConfig):
    if config.browser.lower() == "firefox":
        options = FirefoxOptions()
        if config.headless:
            options.add_argument("-headless")
        driver = webdriver.Firefox(options=options)
    else:
        options = ChromeOptions()
        if config.headless:
            options.add_argument("--headless=new")
        options.add_argument("--window-size=1440,960")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        driver = webdriver.Chrome(options=options)

    driver.set_page_load_timeout(30)
    return driver
