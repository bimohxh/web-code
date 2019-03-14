const Mem = require('../models/mem')
const Oper = require('../models/oper')

module.exports = {
  get_index: (req, res) => {
    let limit = Math.min((req.query.limit || 5), 20)
    let skip = parseInt(req.query.skip || 0)
    Promise.all([Mem.where('reputation', '>=', 20).where('using', '>=', 5).count('id'), Mem.where('reputation', '>=', 20).where('using', '>=', 5).query({
      orderByRaw: 'reputation desc',
      select: ['id', 'nc', 'avatar'],
      limit: limit,
      offset: skip
    }).fetchAll({
      withRelated: ['mem_info', {
        'opers': function (query) {
          query.where({typ: 'REPO', opertyp: 'USING'}).select('idcd', 'mem_id')
        }
      }, {
        'opers.repo': function (query) {
          query.select('alia', 'cover', 'owner', 'id', 'using')
        }
      }]
    })]).then(([count, data]) => {
      res.send({
        items: data,
        count: count
      })
    })
  },

  get_is: (req, res) => {
    let memId = res.locals.mid
    if (!memId) {
      res.send({has: false})
      return
    }
    let params = {mem_id: memId}
    ;['opertyp', 'idcd', 'typ'].forEach(key => {
      params[key] = req.query[key]
    })
    Oper.query({where: params}).fetch().then(data => {
      res.send(data ? true : false)
    })
  },

  // 新增或取消操作
  post_index: async (req, res) => {
    if (!res.locals.mem) {
      res.send({
        status: '4001'
      })
      return
    }
    let memId = res.locals.mem.id
    let params = {mem_id: memId}
    ;['opertype', 'toid', 'totype'].forEach(key => {
      params[key] = req.body[key]
    })

    let oldOper = await Oper.query({where: params}).fetch()

    if (oldOper) {
      let amount = 0
      if (req.body.opertype !== 'read') {
        await oldOper.destroy()
        amount = await (new Oper(params)).updateTarget()
      }
      res.send({
        status: '200',
        data: [
          {
            has: false,
            amount: amount
          }
        ]
      })
      return
    }
    await new Oper(params).save()
    let amount = await (new Oper(params)).updateTarget()
    res.send({
      status: '200',
      data: [
        {
          has: true,
          amount: amount
        }
      ]
    })
  },

  get_mems: async (req, res) => {
    let mems = await Oper.where({
      totype: req.query.totype,
      toid: req.query.toid,
      opertype: req.query.opertype
    }).query({
      limit: 20
    }).fetchAll({
      withRelated: [{
        'mem': function (mqu) {
          return mqu.select('id', 'nc', 'avatar', 'location', 'vip')
        }
      }]
    })
    res.send({
      status: '200',
      data: mems
    })
  }
}
