FROM node:10.18.1-alpine

WORKDIR /usr/app

RUN apk add --no-cache git

COPY package.json .

RUN npm install

COPY . .