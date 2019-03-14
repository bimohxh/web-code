// 每日推送
const Topic = require('../models/topic')
const moment = require('moment')

let task = async () => {
  let _today = moment().format('YYYY-MM-DD') // '2018-07-10'
  let _item = await Topic.where('show_at', _today).fetch()
  if (_item) {
    console.log('今天的文章已经有了，无需再分配')
    return
  }

  let _avacount = await Topic.where('show_at', 'is', null).where({status: 'y'}).count()
  let _random = parseInt(Math.random() * _avacount)
  let todayItem = await Topic.where('show_at', 'is', null).where({status: 'y'}).query({
    offset: _random
  }).fetch()

  todayItem.set('show_at', _today)

  await todayItem.save()
  console.log(`推送成功：${todayItem.get('title')}`)
}

task()
