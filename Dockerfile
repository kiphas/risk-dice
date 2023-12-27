# Build stage
FROM node:20.10-alpine3.17 as build
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Final production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build/ .