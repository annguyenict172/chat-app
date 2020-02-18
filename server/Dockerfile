FROM node:10.9.0-alpine

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package*.json /app/server/

# Install the build requirements for bcrypt
RUN apk update && apk upgrade \
  && apk --no-cache add --virtual builds-deps build-base python \
  && npm add node-gyp node-pre-gyp

RUN npm install

COPY . /app/server/

CMD ["node", "src/server.js"]