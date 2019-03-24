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

const formatQuery = (wheres, query) => {
  return wheres.reduce((result, item) => {
    return query.where(...item)
  }, query)
}

module.exports = {
  get_index: async (req, res) => {
    let page = pagination(req)
    
    let _wheres = [
      ['is_public', '=', 'y']
    ]

    let _tag = req.query.tag
    if (_tag) {
      _wheres.push(['tags', 'like', `%${_tag}%`])
    }

    ;['mem_id'].forEach(key => {
      if (req.query[key] !== undefined) {
        _wheres.push([key, '=', req.query[key]])
      }
    })

    let _items = await formatQuery(_wheres, Code).query({
      limit: page.limit,
      offset: page.skip,
      select: ['id', 'title', 'read', 'comment', 'collect', 'zan', 'tags'],
      orderByRaw: 'created_at desc'
    }).fetchAll()
    let _count = await formatQuery(_wheres, Code).count('id')

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
    ;['title', 'remark', 'tags', 'is_public'].forEach(key => {
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
