const Mem = require('../models/mem')

module.exports = {
  get_index: async (req, res) => {
    let _login = res.locals.mem
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
