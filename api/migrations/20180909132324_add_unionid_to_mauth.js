
exports.up = function (knex, Promise) {
  return knex.schema.alterTable('mauths', (t) => {
    t.string('unionid')
  })
}

exports.down = function (knex, Promise) {
}
