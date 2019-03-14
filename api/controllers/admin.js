const Config = require('../config')
const jwt = require('jsonwebtoken')

module.exports = {
  post_login: async (req, res) => {
    let token = null
    if (req.body.uid === Config.admin.uid && req.body.pwd === Config.admin.pwd) {
      token = jwt.sign({ type: 'admin', uid: Config.admin.uid }, Config.jwtkey, { expiresIn: '20h' })
    }

    if (!token) {
      res.send({
        status: '400',
        msg: '用户名或密码错误！'
      })
      return
    }
    res.send({
      status: '200',
      data: [{
        token: token
      }]
    })
  },

  get_session: async (req, res) => {
    let _login = res.locals.login
    if (!_login || _login.uid !== Config.admin.uid) {
      res.send({
        islogin: false
      })
      return
    }
    res.send({
      islogin: true
    })
  }
}
