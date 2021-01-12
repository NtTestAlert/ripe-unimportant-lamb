FROM node:14-alpine3.12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./app/package*.json ./

RUN npm install

COPY ./app/ .

EXPOSE 80

CMD ["npm", "start"]