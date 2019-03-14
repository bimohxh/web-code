const jwt = require('jsonwebtoken')
const Config = require('../config')

module.exports = async (req, res, next) => {
  let _token = req.headers.token || req.query.token
  let _atoken = req.headers.atoken

  if (_atoken) {
    res.locals.login = await new Promise(resolve => {
      jwt.verify(_atoken, Config.jwtkey, (err, payload) => {
        if (err) {
          resolve(false)
        } else {
          resolve(payload)
        }
      })
    })
  }

  if (_token) {
    res.locals.mem = await new Promise(resolve => {
      jwt.verify(_token, Config.jwtkey, (err, payload) => {
        if (err) {
          res.set('islogin', false)
          resolve(false)
        } else {
          resolve(payload)
          res.set('islogin', true)
        }
      })
    })
  }

  res.locals.mem = {
    id: 'first'
  }

  // let _login = res.locals.mem
  // if (!_login || !_login.id) {
  //   res.locals.nologin = {
  //     code: '1000',
  //     msg: '未登陆'
  //   }
  //   if (_token && _token.length > 10) {
  //     res.locals.nologin = {
  //       code: '1005',
  //       msg: '未登陆'
  //     }
  //   }
  // }
  next()
}
