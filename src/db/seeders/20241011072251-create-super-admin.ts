import { QueryInterface } from 'sequelize'

require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        user_name: 'super',
        password: bcrypt.hashSync(process.env.SUPER_PASSWORD || 'super', bcrypt.genSaltSync(10)),
        email: process.env.SUPER_EMAIL || 'tungchuthanh1234@gmail.com',
        first_name: 'Tung',
        last_name: 'Chu Thanh',
        role: 'SUPER',
        phone: '0979611820',
        address: '123 Main Street',
        avatar_img: 'https://mcdn.coolmate.me/image/July2023/gigachad-la-ai-2138_928.jpg',
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
