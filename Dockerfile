# Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY package*.json ./

RUN npm install -g nodemon

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev:start" ]
