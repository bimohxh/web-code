const Mem = require('../models/mem')
const Config = require('../config')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const moment = require('moment-timezone')

module.exports = {
  get_index: async (req, res) => {
    let _login = res.locals.mem
    if (res.locals.nologin) {
      res.send(res.locals.nologin); return
    }
    let _mem = await Mem.fullData({
      id: res.locals.mem.id
    })
    if (!_mem) {
      res.send({
        status: '1000',
        msg: '用户未登陆'
      })
      return
    }
    
    let _today = moment(Date.now()).tz('Asia/Shanghai').format('YYYY-MM-DD')

    res.send({
      status: '200',
      data: [_mem]
    })
  }
}
