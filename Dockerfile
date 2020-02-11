FROM node:10.18.1-alpine

WORKDIR /usr/app

RUN apk add --no-cache git

COPY package.json .
COPY ./src/config.js.docker ./src/config.js

RUN npm install

COPY . .