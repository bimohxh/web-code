const Code = require('../models/code')
const File = require('../models/file')
const Oper = require('../models/oper')
const Mem = require('../models/mem')
const moment = require('moment')

let pagination = req => {
  let limit = Math.min((req.query.limit || 15), 1000)
  let page = parseInt(req.query.page || 1)
  let skip = limit * (page - 1)
  return {
    limit: limit,
    skip: skip
  }
}

// 我是否收藏和点赞某个文章
let hasOper = async (res, codes, opertyps) => {
  if (!res.locals.mem) {
    codes.forEach(item => {
      item.myoper = opertyps.reduce((result, key) => {
        result[key] = false
        return result
      }, {})
    })
    return codes
  }
  let tids = codes.map(item => {
    return item.id
  })
  let _opers = []
  if (res.locals.mem) {
    _opers = await Oper.where({
      totype: 'code',
      mem_id: res.locals.mem.id
    }).where('toid', 'in', tids).where('opertype', 'in', opertyps).fetchAll()
    _opers = _opers.toJSON().map(item => {
      return `${item.opertype}-${item.toid}`
    })
  }

  codes.forEach(item => {
    item.myoper = opertyps.reduce((result, key) => {
      result[key] = _opers.indexOf(`${key}-${item.id}`) > -1
      return result
    }, {})
  })
  return codes
}

module.exports = {
  get_index: async (req, res) => {
    let page = pagination(req)

    let _items = await Code.query({
      limit: page.limit,
      offset: page.skip,
      select: ['id', 'title', 'read', 'comment', 'collect', 'zan', 'tags'],
      orderByRaw: 'created_at desc'
    }).fetchAll()
    let _count = await Code.count('id')

    res.send({
      status: '200',
      data: {
        items: _items,
        count: _count
      }
    })
  },

  post_index: async (req, res) => {
    let memId = res.locals.mem.id
    if (!res.locals.mem) {
      res.send({
        status: 401
      })
      return
    }
    let params = {mem_id: memId}
    ;['title', 'remark', 'tags'].forEach(key => {
      params[key] = req.body[key]
    })

    let newItem = await new Code(params).save()
    for (let file of req.body.files) {
      let data = {
        code_id: newItem.id
      }
      ;['name', 'content', 'language'].forEach(key => {
        data[key] = file[key]
      })
      await File.forge(data).save()
    }
    res.send({
      status: 200
    })
  },

  get_index_id: async (req, res) => {
    let _item = await Code.where('id', req.params.action).fetch({
      withRelated: ['files']
    })
    if (!_item) {
      res.send({
        status: 404,
        msg: '不存在'
      })
      return
    }

    res.send({
      status: 200,
      data: _item
    })
  }
}
