# Build React app
FROM node:12 as build-deps

WORKDIR /usr/src/app

COPY package.json ./
ARG REACT_APP_API_URL

RUN npm install --silent
COPY . .
RUN npm run build

# Serve React app
FROM nginx:1.16.0-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]