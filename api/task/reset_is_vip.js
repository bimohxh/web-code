// 会员过期

const Mem = require('../models/mem')
const moment = require('moment')

let task = async () => {
  let _mems = await Mem.fetchAll()
  _mems = _mems.toJSON()
  for (let mem of _mems) {
    let isvip = mem.vip_expire >= moment().format('YYYY-MM-DD') ? 'month' : 'not'
    await Mem.forge({
      id: mem.id,
      vip: isvip
    }).save()
    console.log(` > ${mem.id} - ${isvip}`)
  }
  console.log('全部处理完毕')
}

task()
