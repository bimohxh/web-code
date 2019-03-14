const Comment = require('../models/comment')
const Oper = require('../models/oper')

// 获取当前登录会员喜欢的评论
let getMyFavors = (req, res) => {
  if (!req.headers.atoken) {
    return Promise.resolve([])
  }
  let memId = res.locals.mem.id
  if (!memId) {
    return Promise.resolve([])
  }
  return new Promise(resolve => {
    Oper.query({
      where: {opertyp: 'FAVOR', typ: 'COMMENT', mem_id: memId},
      select: ['idcd']
    }).fetchAll().then(opers => {
      resolve(opers.map(item => {
        return item.get('idcd')
      }))
    })
  })
}

module.exports = {
  get_index: async (req, res) => {
    let limit = Math.min((req.query.limit || 30), 100)
    let skip = parseInt(req.query.skip || 0)
    let where = {}
    let order = req.query.order
    ;['totype', 'toid', 'mem_id'].forEach(key => {
      let val = req.query[key]
      if (val) {
        where[key] = val
      }
    })
    let query = {
      where: where,
      limit: limit,
      offset: skip,
      orderByRaw: order || 'id asc'
    }

    let [comments, count, myfavors] = await Promise.all([
      Comment.query(query).fetchAll({
        withRelated: [{
          'mem': function (mqu) {
            return mqu.select('id', 'nc', 'avatar', 'location', 'vip')
          }
        }]
      }),
      Comment.where(where).count('id'),
      getMyFavors(req, res)
    ])
    let result = comments.toJSON()
    result.forEach(item => {
      item.isFavor = myfavors.indexOf(item.id) > -1
    })
    res.send({
      status: '200',
      data: result
    })
  },

  post_index: async (req, res) => {
    let memId = res.locals.mem.id
    if (!res.locals.mem) {
      res.send({
        status: '4001'
      })
      return
    }
    let params = {mem_id: memId}
    ;['totype', 'toid', 'content'].forEach(key => {
      params[key] = req.body[key]
    })

    let newItem = await new Comment(params).save()
    await newItem.updateTarget()

    let backitem = await Comment.where({id: newItem.get('id')}).fetch({
      withRelated: [{
        'mem': function (mqu) {
          return mqu.select('id', 'nc', 'avatar', 'location')
        }
      }]
    })

    res.send({
      status: '200',
      data: [
        backitem
      ]
    })
  },

  // 删除
  delete_index_id: async (req, res) => {
    if (!res.locals.mem) {
      res.send({
        status: '4001'
      })
      return
    }
    let memId = res.locals.mem.id

    let _comment = await Comment.where({
      id: req.params.action
    }).fetch()

    if (_comment.get('mem_id') !== memId) {
      res.send({status: false})
      return
    }

    let pwoutsesion = {}
    ;['totype', 'toid'].forEach(key => {
      pwoutsesion[key] = _comment.get(key)
    })

    await _comment.destroy()
    await (new Comment({pwoutsesion})).updateTarget()
    res.send({
      status: '200'
    })
  },

  // 更新
  put_index_id: async (req, res) => {
    if (!res.locals.mem) {
      res.send({
        status: '4001'
      })
      return
    }
    let memId = res.locals.mem.id
    let _comment = await Comment.where({ id: req.params.action }).fetch()

    if (_comment.get('mem_id') !== memId) {
      res.send({
        status: '401',
        msg: '无权修改'
      })
      return
    }
    _comment.set('content', req.body.content)
    await _comment.save()
    res.send({status: '200'})
  },

  // target
  // get_target: async (req, res) => {
  //   let _comment = await Comment.where({
  //     id: req.params.id
  //   }).fetch()
  //   let Model = {
  //     REPO: {
  //       route: async () => {
  //         let Repo = require('../models/repo')
  //         let _repo = await Repo.where({id: _comment.get('idcd')}).fetch()
  //         return `${Config.client.main}/repo/${_repo.get('owner')}/${_repo.get('alia')}`
  //       }
  //     },
  //     NEWS: {
  //       route: `${Config.client.news}/news/${_comment.get('idcd')}`
  //     }
  //   }[_comment.get('typ')]
  //   let url = (typeof Model.route === 'string') ? Model.route : await Model.route()
  //   res.redirect(url)
  // }
}
