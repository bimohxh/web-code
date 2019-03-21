import axios from 'axios'
import Cookie from 'js-cookie'
const cookieparser = require('cookieparser')
const Config = require('../config')

// 请求分为两类：
// 1类是客户端发出的请求：直接用 Cookie.get('awlogin') 即可
// 2类是服务端发出的请求：则需要通过 req.headers.cookie 去获取了
export default ({ app, req }, inject) => {
  inject('axios', () => {
    let token = null
    if (process.server) {
      token = cookieparser.parse(req.headers.cookie || '').atoken
    } else {
      token = Cookie.get('atoken')
    }
    return axios.create({
      baseURL: Config.API,
      headers: { atoken: token || '' }
    })
  })
}
