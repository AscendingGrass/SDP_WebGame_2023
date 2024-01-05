
# Final runtime stage
FROM node:18-alpine

# Install Nginx
RUN apk add --no-cache nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm uninstall vite
RUN npm i vite
RUN chmod +x script.sh

CMD ["./script.sh"]