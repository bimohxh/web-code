const axios = require('axios')
const config = require('../config')
const Mauth = require('../models/mauth')
const Mem = require('../models/mem')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const WXBizDataCrypt = require('../lib/WXBizDataCrypt')

const Logincode = require('../models/logincode')

const expireday = '30 days'
const FreeVip = '5' // 免费会员 5 天

// 获取 uniond id
let fetchUnionID = function (sessionKey, encryptedData, iv) {
  if (!encryptedData) {
    return ''
  }
  var pc = new WXBizDataCrypt(config.wxsp.appid, sessionKey)
  var data = pc.decryptData(encryptedData , iv)
  return data.unionId
}

module.exports = {
  post_session: async (req, res) => {
    let memID = await new Promise(resolve => {
      jwt.verify(req.body.token, config.jwtkey, (err, payload) => {
        if (err) {
          resolve(null)
        } else {
          resolve((payload || {}).id)
        }
      })
    })
    Mem.where({id: memID}).fetch().then(data => {
      if (data) {
        let token = jwt.sign({ id: data.id }, config.jwtkey, { expiresIn: expireday })
        res.send({
          status: true,
          token: token,
          mem: {
            id: data.id,
            nc: data.get('nc'),
            avatar: data.get('avatar'),
            iswebker: data.get('iswebker')
          }
        })
      } else {
        res.send({status: false})
      }
    })
  },

  post_wxsp: async (req, res) => {
    let _code = req.body.code
    let _info = req.body.info
    let _url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.wxsp.appid}&secret=${config.wxsp.appsecret}&js_code=${_code}&grant_type=authorization_code`
    let result = await axios.create({
      headers: {
        'Accept': 'application/json'
      }
    }).get(_url)

    let _openid = result.data.openid
    // let _unionid = await fetchUnionID(result.data.session_key, req.body.encryptedData, req.body.iv)
    let _mauth = await Mauth.where({
      provider: 'wxsp',
      openid: _openid
    }).fetch()
    if (!_mauth) {
      // 免费会员
      let vipExpire = moment().add(FreeVip, 'day').format('YYYY-MM-DD')

      // 注册
      let newMem = await Mem.forge({
        nc: _info.nickName,
        avatar: _info.avatarUrl,
        location: `${_info.country} ${_info.city}`,
        gender: _info.gender === 1 ? 'M' : 'F',
        vip_expire: vipExpire
      }).save()

      _mauth = await Mauth.forge({
        provider: 'wxsp',
        openid: _openid,
        mem_id: newMem.id,
        // unionid: _unionid
      }).save()
    } else {
      // _mauth.set('unionid', _unionid)
      // await _mauth.save()
    }

    let _mem = await Mem.where({
      id: _mauth.get('mem_id')
    }).fetch()

    let loginToken = jwt.sign({
      id: _mem.id
    }, config.jwtkey, { expiresIn: expireday })
    res.send({
      status: '200',
      data: [
        {
          token: loginToken,
          mem: {
            id: _mem.id,
            nc: _mem.get('nc'),
            avatar: _mem.get('avatar')
          }
        }
      ]
    })
  },

  post_logincode: async (req, res) => {
    let _code = req.body.code
    if (!_code) {
      res.send({
        status: '4210'
      })
      return
    }

    let _login = await Logincode.where({
      code: _code
    }).fetch()
    if (!_login) {
      res.send({
        status: '4211'
      })
      return
    }

    // 10 分钟有效
    let remain = 10 * 60 * 1000 - (Date.now() - (+new Date(_login.get('created_at'))))
    if (remain < 0) {
      await _login.destroy()
      res.send({
        status: '4310',
        description: 'code已失效'
      })
      return
    }

    let token = jwt.sign({ id: _login.get('mem_id') }, config.jwtkey, { expiresIn: expireday })
    await _login.destroy()
    res.send({
      status: '200',
      data: [
        {
          token: token
        }
      ]
    })
  }
}
