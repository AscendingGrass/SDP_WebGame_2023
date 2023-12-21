#!/bin/sh

npm install
npm run build
rm -rf /node_modules
rm -rf /public
rm -rf /src

cd ./dist
serve