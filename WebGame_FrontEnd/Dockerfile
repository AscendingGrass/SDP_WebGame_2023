FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000



RUN npm run build

RUN rm -rf /node_modules
RUN rm -rf /public
RUN rm -rf /src

RUN npm i serve -g

WORKDIR ./dist

CMD ["serve"]