FROM node:18-alpine

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8081

CMD [ "yarn", "start:dev" ]
