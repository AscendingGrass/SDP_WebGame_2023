FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# CMD ["npm","run","dev"]

RUN npm run build

RUN npm i serve -g

WORKDIR ./dist

CMD ["serve"]