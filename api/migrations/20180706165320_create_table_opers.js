
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('opers', function (table) {
    table.increments()
    table.string('mem_id')
    table.string('opertype')
    table.string('totype')
    table.string('toid')
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('opers')
}
