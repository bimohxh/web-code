const DB = require('../lib/db')
const Mem = require('./mem')
// const Msg = require('./msg')

let Comment = DB.model('Comment', {
  tableName: 'comments',
  hasTimestamps: true,
  mem: function () {
    return this.belongsTo(Mem)
  },
  updateTarget: async function () {
    let _table = {
      code: {
        model: './code',
        field: 'comment'
      }
    }[this.get('totype')]
    let _model = require(_table.model)
    let _count = await Comment.where({
      totype: this.get('totype'),
      toid: this.get('toid')
    }).count()

    let _dist = await _model.where({
      id: this.get('toid')
    }).fetch()

    _dist.set(_table.field, _count)
    await _dist.save()
  }
})

module.exports = Comment
