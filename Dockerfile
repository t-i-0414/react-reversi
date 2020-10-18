FROM node:12.18.4-alpine

WORKDIR /usr/src/frontend

RUN apk add --no-cache git

RUN yarn global add create-react-app

COPY . .

RUN yarn install
