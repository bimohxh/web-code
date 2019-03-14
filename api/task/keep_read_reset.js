// 会员持续学习多少天
const Oper = require('../models/oper')
const Mem = require('../models/mem')
const Topic = require('../models/topic')
const moment = require('moment')

var start = 0
var historyTopics = []

var getHistoryPush = async () => {
  let _today = moment().format('YYYY-MM-DD')
  let _topics = await Topic.where('show_at', '<', _today).query({
    orderByRaw: 'show_at desc'
  }).fetchAll()
  historyTopics = _topics.toJSON().map(item => {
    return {
      id: item.id,
      day: item.show_at
    }
  })
}

let computeMem = async mem => {
  let _reads = await Oper.where({
    opertype: 'read',
    totype: 'topic',
    mem_id: mem.id
  }).fetchAll()
  _reads = _reads.toJSON().reduce((result, item) => {
    result[item.toid] = moment(item.created_at).format('YYYY-MM-DD')
    return result
  }, {})
  let _keep = 0
  for (var i = 0; i < historyTopics.length; i++) {
    if (_reads[historyTopics[i].id] === historyTopics[i].day) {
      _keep++
    } else {
      break
    }
  }
  mem.set('keep', _keep)
  console.log(` > ${mem.get('nc')}：${_keep}`)
  await mem.save()
}

let updateMem = async () => {
  let _mem = await Mem.query({
    offset: start,
    limit: 1
  }).fetch()
  start++
  if (_mem) {
    await computeMem(_mem)
    updateMem()
  }
}

let action = async () => {
  await getHistoryPush()
  updateMem()
}

action()
