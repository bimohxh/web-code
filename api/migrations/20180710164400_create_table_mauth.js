
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('mauths', function (table) {
    table.increments()
    table.string('mem_id')
    table.string('provider', 10)
    table.string('openid')
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('mauths')
}
