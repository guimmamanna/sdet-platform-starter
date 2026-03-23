FROM node:20-alpine AS build

WORKDIR /app/sample-app

COPY sample-app/package.json ./
RUN npm install

COPY sample-app/ ./
RUN npm run build

FROM node:20-alpine

WORKDIR /app/sample-app

COPY sample-app/package.json ./
RUN npm install --omit=dev

COPY --from=build /app/sample-app/dist ./dist
COPY sample-app/public ./public

ENV APP_PORT=3000
ENV ALLOW_TEST_RESET=true

EXPOSE 3000

CMD ["npm", "start"]

