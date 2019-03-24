var express = require('express')
var app = express()
var router = require('./lib/router')
var bodyParser = require('body-parser')
var login = require('./middleware/login')
var busboy = require('connect-busboy')
const config = require('./config')

require('body-parser-xml')(bodyParser)

global.connections = []

app.use(bodyParser.xml())

app.use(busboy())
app.use(bodyParser.urlencoded({
  limit: '5mb'
}))
app.use(bodyParser.json({
  limit: '5mb'
}))

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token, citycode, atoken, x-file-name')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
app.use(login)

app.use(router)

var server = require('http').createServer(app)

server.listen(config.server.port)

console.log('服务器启动，监听：' + config.server.port)
