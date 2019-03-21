const Mem = require('../models/mem')
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
        status: 404,
        msg: '未找到'
      })
      return
    }
    res.send({
      status: 200,
      data: [
        _mem
      ]
    })
  },

  // get_topic: async (req, res) => {
  //   let memID = req.params.id || res.locals.mem.id
  //   let page = pagination(req)
  //   let _items = await Oper.where({
  //     totype: 'topic',
  //     opertype: req.query.oper,
  //     mem_id: memID
  //   }).query({
  //     limit: page.limit,
  //     offset: page.skip
  //   }).fetchAll({
  //     withRelated: ['topic']
  //   })

  //   let _count = await Oper.where({
  //     totype: 'topic',
  //     opertype: req.query.oper,
  //     mem_id: memID
  //   }).count()

  //   _items = _items.toJSON().map(item => {
  //     return item.topic
  //   })

  //   res.send({
  //     status: '200',
  //     data: _items,
  //     hasmore: _count > page.limit * (page.skip + 1)
  //   })
  // },

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
  }
}
