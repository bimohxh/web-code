const Config = require('../config.json')
// const moment = require('moment')

let knexConf = {
  client: 'mysql',
  connection: Config.db
}

// knexConf.connection.timezone = 'UTC'
knexConf.connection.typeCast = function (field, next) {
  if (field.type === 'DATETIME') {
    return (new Date(field.string())).toLocaleString()
  }
  if (field.type === 'DATE') {
    return field.string()
  }
  return next()
}

var knex = require('knex')(knexConf)
var bookshelf = require('bookshelf')(knex)
bookshelf.plugin(require('bookshelf-uuid'))
bookshelf.plugin('registry')

module.exports = bookshelf
