FROM node:11.11.0

RUN npm install -g cnpm  --registry=https://registry.npm.taobao.org
WORKDIR /var/www/html

CMD top -d 1000 -b