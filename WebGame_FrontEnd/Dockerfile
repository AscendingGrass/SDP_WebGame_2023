FROM node:18-alpine
EXPOSE 3000

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN chmod +x script.sh
RUN npm i serve -g

CMD ["./script.sh"]