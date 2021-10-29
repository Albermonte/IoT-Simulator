FROM node:14-alpine

RUN apk add --update alpine-sdk
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add --update --no-cache git gcompat gettext

WORKDIR /home/node/app
COPY package.json .
RUN npm install

ADD . /home/node/app
RUN npm run build

CMD [ "npm", "start" ]
EXPOSE ${PORT}