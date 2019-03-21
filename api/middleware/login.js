const jwt = require('jsonwebtoken')
const Config = require('../config')

module.exports = async (req, res, next) => {
  let _token = req.headers.token || req.query.token
  let _atoken = req.headers.atoken
  console.log('========', _atoken)

  if (_atoken) {
    res.locals.mem = await new Promise(resolve => {
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
    res.locals.admin = await new Promise(resolve => {
      jwt.verify(_token, Config.jwtkey, (err, payload) => {
        if (err) {
          resolve(false)
        } else {
          resolve(payload)
        }
      })
    })
  }

  next()
}
