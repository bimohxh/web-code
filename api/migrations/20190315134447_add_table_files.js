
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('files', function (table) {
    table.string('id', 50).primary()
    table.string('code_id', 50)
    table.string('name', 100)
    table.text('content')
    table.string('language', 20)
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('files')
}
