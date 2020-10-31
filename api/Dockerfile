From node:14.14.0-alpine as base

WORKDIR /usr/src/app

COPY package.json .
COPY tsconfig.json .
RUN npm install

EXPOSE 8080

ADD ./src /usr/src/app/src

From base as test

ADD ./babel.config.js .
ADD ./jest.config.js .
Add ./tests /usr/src/app/tests


