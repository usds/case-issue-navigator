FROM node:12-alpine

RUN npm install -g yarn@1.17.3

COPY . /home/src

WORKDIR /home/src

RUN yarn install

ENTRYPOINT yarn run ci-checks
