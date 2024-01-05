#!/bin/sh

npm run build
rm -rf /node_modules
rm -rf /public
rm -rf /src

cp -r ./dist /usr/share/nginx/html
nginx -g "daemon off;"
