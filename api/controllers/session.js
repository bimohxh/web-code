const Mem = require('../models/mem')
const Config = require('../config')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const moment = require('moment-timezone')

module.exports = {
  get_index: async (req, res) => {
    let _login = res.locals.mem
    console.log('请求了一次', _login)
    if (!_login) {
      res.send({
        status: 1000,
        msg: '用户未登陆'
      })
      return
    }
    let _mem = await Mem.where({
      id: _login.id
    }).fetch()
    if (!_mem) {
      res.send({
        status: 1000,
        msg: '用户未登陆'
      })
      return
    }
    res.send({
      status: 200,
      data: _mem
    })
  }
}
