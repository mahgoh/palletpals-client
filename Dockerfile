# 1. Stage: Build
# Builds static files
FROM node:16-alpine as build
RUN apk add git
WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . /app
RUN npm run build

# 2. Stage: Runtime
# Uses nginx to serve static files
FROM nginx:mainline-alpine as runtime
COPY default.conf /etc/nginx/conf.d/
COPY --from=build /app/dist /var/www/html
