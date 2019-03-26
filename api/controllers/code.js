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

    // is_optimization
    ;['mem_id'].forEach(key => {
      if (req.query[key] !== undefined) {
        _wheres.push([key, '=', req.query[key]])
      }
    })

    let _items = await formatQuery(_wheres, Code).query({
      limit: page.limit,
      offset: page.skip,
      select: ['id', 'title', 'read', 'comment', 'collect', 'zan', 'tags', 'mem_id', 'created_at'],
      orderByRaw: 'created_at desc'
    }).fetchAll({
      withRelated: ['mem']
    })
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
    if (!res.locals.mem) {
      res.send({
        status: 401
      })
      return
    }
    let memId = res.locals.mem.id
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

  put_index: async (req, res) => {
    if (!res.locals.mem) {
      res.send({
        status: 401
      })
      return
    }
    let _code = await Code.where({ id: req.body.id }).fetch()
    if (!_code || _code.get('mem_id') !== res.locals.mem.id) {
      res.send({
        status: 402
      })
      return
    }

    ;['title', 'remark', 'tags', 'is_public'].forEach(key => {
      _code.set(key, req.body[key])
    })

    await _code.save()

    // 删除已删除的文件
    let newFileIDs = req.body.files.filter(item => item.id).map(item => item.id)
    let oldFileIDs = (await File.where({
      code_id: _code.id
    }).fetchAll()).pluck('id')
    for (let fid of oldFileIDs) {
      if (!newFileIDs.includes(fid)) {
        await File.forge({ id: fid }).destroy()
      }
    }

    for (let file of req.body.files) {
      // 更新和新增
      let data = file.id ? {
        id: file.id
      } : {
        code_id: _code.id
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
      withRelated: ['files', 'mem']
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
