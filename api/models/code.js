const DB = require('../lib/db')

module.exports = DB.model('Code', {
  tableName: 'codes',
  uuid: true,
  hasTimestamps: true
})
