FROM node:18 AS builder

WORKDIR /app

RUN npm install

COPY package*.json ./

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
