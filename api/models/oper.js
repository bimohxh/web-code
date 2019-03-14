const DB = require('../lib/db')
require('./code')
const Mem = require('./mem')

let Oper = DB.model('Oper', {
  tableName: 'opers',
  hasTimestamps: true,
  code: function () {
    return this.belongsTo('Code', 'toid')
  },
  mem: function () {
    return this.belongsTo(Mem)
  },
  updateTarget: async function () {
    let _table = {
      code: {
        model: './code'
      }
    }[this.get('totype')]
    let _model = require(_table.model)
    let _count = await Oper.where({
      totype: this.get('totype'),
      toid: this.get('toid'),
      opertype: this.get('opertype')
    }).count()

    let _dist = await _model.where({
      id: this.get('toid')
    }).fetch()
    _dist.set(this.get('opertype'), _count)
    await _dist.save()
  }
})

module.exports = Oper
