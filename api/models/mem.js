const DB = require('../lib/db')

module.exports = DB.model('Mem', {
  tableName: 'mems',
  uuid: true,
  hasTimestamps: true
})
