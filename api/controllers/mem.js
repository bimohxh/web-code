const Mem = require('../models/mem')
const Logincode = require('../models/logincode')
const MemVipRecord = require('../models/mem_vip_record')
const moment = require('moment')
const Oper = require('../models/oper')

let pagination = req => {
  let limit = Math.min((req.query.limit || 15), 1000)
  let page = parseInt(req.query.page || 1)
  let skip = limit * (page - 1)
  return {
    limit: limit,
    skip: skip
  }
}

let randomCode = codes => {
  let chars = 'abcdefghjkmnpqrstuvwxyz23456789'
  let _length = chars.length
  let _code = [0, 0, 0, 0, 0].map(item => chars[parseInt(Math.random() * _length)]).join('')
  return codes.indexOf(_code) > -1 ? randomCode(codes) : _code
}

module.exports = {
  // 修改资料
  put_index: async (req, res) => {
    let _memid = res.locals.mem.id
    if (!res.locals.mem) {
      res.send({
        status: '4001'
      })
      return
    }

    let data = {
      id: _memid
    }
    ;['name', 'cover', 'gender', 'birthday', 'province_id', 'city_id'].forEach(key => {
      if (req.body[key] !== undefined) {
        data[key] = req.body[key]
      }
    })

    let _mem = await Mem.forge(data).save()
    _mem = await Mem.fullData({
      id: _mem.id
    })
    res.send({
      code: '200',
      msg: 'ok',
      content: {
        mem: _mem
      }
    })
  },

  // 开通会员
  post_vip: async (req, res) => {
    // if (!res.locals.mem) {
    //   res.send({
    //     status: '4001'
    //   })
    //   return
    // }
    let _month = req.body.month
    let _money = req.body.money
    let _memId = req.body.mid

    // 1.2 月 则是1个月 0.2 * 30 = 6 天
    let _day = parseInt((_month - parseInt(_month)) * 30)
    let _realMonth = parseInt(_month)

    if (!res.locals.login) {
      res.send({
        status: '401'
      })
      return
    }

    let _mem = await Mem.where({
      id: _memId
    }).fetch()

    let _start = moment()
    let _oldexpire = _mem.get('vip_expire')
    if (_oldexpire && _oldexpire > moment().format('YYYY-MM-DD')) {
      _start = moment(_oldexpire)
    }

    let expire = _start.add(_realMonth, 'month').format('YYYY-MM-DD')
    expire = moment(expire).add(_day, 'day').format('YYYY-MM-DD')

    // 如果过期时间小于当天 则直接设为null 表示过期
    let realExpire = expire
    // if (expire < moment().format('YYYY-MM-DD')) {
    //   realExpire = null
    // }
    _mem.set('vip_expire', realExpire)
    await _mem.save()

    await MemVipRecord.forge({
      mem_id: _memId,
      expire_at: expire,
      money: _money,
      month: _month
    }).save()
    res.send({
      status: '200'
    })
  },

  // 获取当前会话
  get_session: async (req, res) => {
    let memId = res.locals.mem.id
    if (!memId) {
      res.send({
        status: '401'
      })
      return
    }
    let _mem = await Mem.where({id: memId}).fetch()
    if (!_mem) {
      res.send({
        status: '401',
        msg: '未登录'
      })
      return
    }
    res.send({
      status: '200',
      data: [
        {
          mem: {
            id: _mem.id,
            nc: _mem.get('nc'),
            avatar: _mem.get('avatar'),
            vip_expire: _mem.get('vip_expire'),
            vip: _mem.get('vip')
          }
        }
      ]
    })
  },

  get_index_id: async (req, res) => {
    let _mem = await Mem.where({id: req.params.action}).fetch()
    if (!_mem) {
      res.send({
        status: '404',
        msg: '未找到'
      })
      return
    }
    _mem = _mem.toJSON()
    _mem.isvip = _mem.vip !== 'not'
    res.send({
      status: '200',
      data: [
        _mem
      ]
    })
  },

  get_topic: async (req, res) => {
    let memID = req.params.id || res.locals.mem.id
    let page = pagination(req)
    let _items = await Oper.where({
      totype: 'topic',
      opertype: req.query.oper,
      mem_id: memID
    }).query({
      limit: page.limit,
      offset: page.skip
    }).fetchAll({
      withRelated: ['topic']
    })

    let _count = await Oper.where({
      totype: 'topic',
      opertype: req.query.oper,
      mem_id: memID
    }).count()

    _items = _items.toJSON().map(item => {
      return item.topic
    })

    res.send({
      status: '200',
      data: _items,
      hasmore: _count > page.limit * (page.skip + 1)
    })
  },

  get_rank: async (req, res) => {
    let page = pagination(req)
    let _mems = await Mem.where('keep', '>', 0).query({
      limit: page.limit,
      offset: page.skip,
      orderByRaw: 'keep desc'
    }).fetchAll()
    let _count = await Mem.where('keep', '>', 0).count('id')
    res.send({
      status: '200',
      data: _mems,
      hasmore: _count > page.limit + page.skip
    })
  },

  get_logincode: async (req, res) => {
    if (!res.locals.mem) {
      res.send({
        status: '4001'
      })
      return
    }

    let _codes = await Logincode.fetchAll()
    _codes = _codes.toJSON().map(item => item.code)
    let _code = randomCode(_codes)
    Logincode.forge({
      mem_id: res.locals.mem.id,
      code: _code
    }).save()
    res.send({
      status: '200',
      data: {
        code: _code
      }
    })
  },

  get_statistics: async (req, res) => {
    let _opers = await Oper.where({
      mem_id: req.params.id,
      opertype: 'read',
      totype: 'topic'
    }).where('created_at', 'like', `${req.query.year}%`).query({
      select: ['created_at']
    }).fetchAll()
    res.send({
      status: '200',
      data: _opers
    })
  }
}
