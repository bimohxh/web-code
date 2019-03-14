# web-code

> My supreme Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


### win10 ubuntu bash

```bash
docker build -t newnode .
docker run -d -p 3000:3000 -v C:/www/web-code:/var/www/html newnode
```