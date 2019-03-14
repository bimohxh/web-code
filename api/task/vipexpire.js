// 会员过期

const Mem = require('../models/mem')
const moment = require('moment')

var today = moment().format('YYYY-MM-DD')

let task = async () => {
  let _mems = await Mem.where('vip_expire', '<', today).fetchAll()
  _mems = _mems.toJSON()
  for (let mem of _mems) {
    await Mem.forge({
      id: mem.id,
      vip: 'not'
    }).save()
    console.log(` > ${mem.id}`)
  }
  console.log('全部处理完毕')
}

task()
