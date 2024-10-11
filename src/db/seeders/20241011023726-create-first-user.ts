import { QueryInterface } from 'sequelize'

require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        user_name: 'user',
        password: bcrypt.hashSync(process.env.USER_PASSWORD || 'user', bcrypt.genSaltSync(10)),
        email: process.env.USER_EMAIL || 'HPhi4@gmail.com',
        first_name: 'Phi',
        last_name: 'Nguyen Huu',
        role: 'USER',
        phone: '0979611820',
        address: '123 Main Street',
        avatar_img: 'https://static.wikia.nocookie.net/joke-battles/images/d/df/Gigachad.png',
        gender: 'MALE',
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Users', {})
  }
}
