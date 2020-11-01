# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./.eslintrc.js /app/.eslintrc.js

RUN npm install
ADD ./src /app/src

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM build-stage as test

COPY ./babel.config.js /app/babel.config.js
COPY ./jest.config.js /app/jest.config.js
ADD ./tests /app/tests 