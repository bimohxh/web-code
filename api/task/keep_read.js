// 会员持续学习多少天
const Oper = require('../models/oper')
const Mem = require('../models/mem')
const Topic = require('../models/topic')
const moment = require('moment')

var start = 0

// 每日计算
let fetchMids = async () => {
  let _lastday = moment().add(-1, 'day').format('YYYY-MM-DD')
  let _topic = await Topic.where('show_at', _lastday).fetch()
  let _lastoper = await Oper.where({
    opertype: 'read',
    totype: 'topic',
    toid: _topic.id
  }).fetchAll()
  return _lastoper.toJSON().filter(item => {
    return moment(item.created_at).format('YYYY-MM-DD') === _lastday
  }).map(item => item.id)
}

let updateMem = async (mids) => {
  let _mem = await Mem.query({
    skip: start,
    limit: 1
  }).fetch()
  start++
  if (_mem) {
    let _keep = 0
    if (mids.indexOf(_mem.id) > -1) {
      _keep = _mem.get('keep') + 1
    }
    _mem.set('keep', _keep)
    await _mem.save()
    console.log(` > ${_mem.id}: ${_keep}`)
    updateMem(mids)
  }
}

let action = async () => {
  let mdis = await fetchMids()
  updateMem(mdis)
}

action()
