let data = require('../lib/region.json')
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('regions').del()
    .then(function () {
      // Inserts seed entries
      return knex('regions').insert(data)
    })
}
