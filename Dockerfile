FROM node:20.10-alpine3.17 as build
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build
COPY --from=build /app/build /usr/share/nginx/html

# production environment
FROM alpine:latest
COPY --from=build /app/build /usr/share/nginx/html/risk-dice