FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /workspace

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl make python3-pip \
  && rm -rf /var/lib/apt/lists/*

COPY . .

RUN python3 -m pip install --no-cache-dir -r requirements-dev.txt -r api-tests/pytest/requirements.txt -r ui-tests/selenium/requirements.txt
RUN npm --prefix ui-tests/playwright install

ENV PW_DISABLE_WEBSERVER=true

CMD ["bash", "-lc", "pytest api-tests/pytest -m smoke && npm --prefix ui-tests/playwright run test:smoke:docker"]

