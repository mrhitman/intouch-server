FROM node:alpine

COPY dist /opt/dist
COPY migrations /opt/migrations
COPY seeds /opt/seeds
COPY knexfile.js /opt/knexfile.js
COPY yarn.lock /opt/yarn.lock
COPY package.json /opt/package.json

EXPOSE 3001

WORKDIR /opt

RUN yarn

ENTRYPOINT [ "yarn", "start" ]