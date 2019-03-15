const DB = require('../lib/db')

module.exports = DB.model('File', {
  tableName: 'files',
  uuid: true,
  hasTimestamps: true
})
