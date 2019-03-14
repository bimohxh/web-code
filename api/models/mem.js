const DB = require('../lib/db')
const moment = require('moment')

module.exports = DB.model('Mem', {
  tableName: 'mems',
  uuid: true,
  hasTimestamps: true
})
