const jwt = require('jsonwebtoken')

console.log(jwt.sign({ id: '130ead7d-5d23-4485-89e7-96d1deb51fe1' }, 'hxh5682ssjjdjdjfieek', { expiresIn: '10 days' }))
