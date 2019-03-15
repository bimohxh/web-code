const DB = require('../lib/db')
require('./file')

module.exports = DB.model('Code', {
  tableName: 'codes',
  uuid: true,
  hasTimestamps: true,
  files: function () {
    return this.hasMany('File')
  }
})
