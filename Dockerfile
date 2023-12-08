FROM node:20.10-alpine3.17 as build
WORKDIR /app
COPY ./package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
