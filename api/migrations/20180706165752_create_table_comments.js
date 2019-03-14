
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('comments', function (table) {
    table.increments()
    table.string('mem_id')
    table.string('totype')
    table.string('toid')
    table.text('content')
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('comments')
}
