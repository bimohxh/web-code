
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('codes', function (table) {
    table.string('id', 50).primary()
    table.string('mem_id', 50)
    table.string('title', 100)
    table.string('tags', 200)
    table.text('remark')
    table.string('is_public', 1).defaultTo('y') // 是否是公开的代码
    table.string('is_optimization', 1).defaultTo('n') // 是否是优选代码
    table.integer('read').defaultTo(0) // 阅读个数
    table.integer('comment').defaultTo(0) // 评论个数
    table.integer('collect').defaultTo(0) // 收藏数
    table.integer('zan').defaultTo(0) // 点赞数
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('codes')
}
