# Build Stage
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_BASE_URL

ENV VITE_BASE_URL=$VITE_BASE_URL

RUN npm run build


# Production Stage
FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]