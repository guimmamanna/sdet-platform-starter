SHELL := /bin/bash

APP_BASE_URL ?= http://localhost:3000
API_BASE_URL ?= http://localhost:3000/api

.PHONY: bootstrap bootstrap-js bootstrap-py dev lint smoke wait test-api test-playwright test-cypress test-selenium test-contract test-performance docker-smoke

bootstrap: bootstrap-js bootstrap-py

bootstrap-js:
	npm --prefix sample-app install
	npm --prefix ui-tests/playwright install
	npm --prefix ui-tests/cypress install
	npm --prefix contract-tests/pact install

bootstrap-py:
	python3 -m pip install -r requirements-dev.txt
	python3 -m pip install -r api-tests/pytest/requirements.txt
	python3 -m pip install -r ui-tests/selenium/requirements.txt

dev:
	npm --prefix sample-app run dev

lint:
	npm --prefix sample-app run lint
	npm --prefix ui-tests/playwright run lint
	npm --prefix ui-tests/cypress run lint
	npm --prefix contract-tests/pact run lint
	python3 -m ruff check api-tests/pytest ui-tests/selenium
	python3 -m ruff format --check api-tests/pytest ui-tests/selenium

wait:
	bash ci/scripts/wait-for-url.sh $(APP_BASE_URL)/health 60

smoke: wait
	pytest api-tests/pytest -m smoke
	npm --prefix ui-tests/playwright run test:smoke

test-api: wait
	pytest api-tests/pytest

test-playwright: wait
	npm --prefix ui-tests/playwright run test

test-cypress: wait
	npm --prefix ui-tests/cypress run test:headless

test-selenium: wait
	pytest ui-tests/selenium/tests

test-contract: wait
	npm --prefix contract-tests/pact run test

test-performance: wait
	k6 run performance-tests/k6/smoke.js

docker-smoke:
	docker compose up --build --abort-on-container-exit --exit-code-from smoke-suite smoke-suite

