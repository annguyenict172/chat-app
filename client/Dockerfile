FROM node:10.9.0-alpine as builder

RUN mkdir -p /app/client
WORKDIR /app/client

COPY package*.json /app/client/

RUN npm install

COPY . /app/client/

RUN npm run build

FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/client/build /usr/share/nginx/html

RUN chown nginx.nginx /usr/share/nginx/html/ -R

EXPOSE 80