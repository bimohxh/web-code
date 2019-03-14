const DB = require('../lib/db')

module.exports = DB.model('Mauth', {
  tableName: 'mauths',
  hasTimestamps: true
})
