
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('mems', function (table) {
    table.string('id', 50).primary()
    table.string('nc', 100)
    table.string('mobile', 100)
    table.string('avatar')
    table.string('gender', 1)
    table.string('location', 50)
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('mems')
}
