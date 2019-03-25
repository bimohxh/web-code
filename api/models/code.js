const DB = require('../lib/db')
require('./file')
require('./mem')

module.exports = DB.model('Code', {
  tableName: 'codes',
  uuid: true,
  hasTimestamps: true,
  files: function () {
    return this.hasMany('File')
  },
  mem: function () {
    return this.belongsTo('Mem')
  }
})
