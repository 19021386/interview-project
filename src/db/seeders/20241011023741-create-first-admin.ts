import { QueryInterface } from 'sequelize'

require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        user_name: 'admin',
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin', bcrypt.genSaltSync(10)),
        email: process.env.ADMIN_EMAIL || 'tuanken3011@gmail.com',
        first_name: 'Tuan',
        last_name: 'Nguyen',
        role: 'ADMIN',
        phone: '0979611820',
        address: '123 Main Street',
        avatar_img: 'https://pop.inquirer.net/files/2021/05/834.png',
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
