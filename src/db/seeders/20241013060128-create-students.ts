'use strict'

import { QueryInterface } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Students', [
      {
        email: 'studenttung@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentphuong@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studenttien@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentnguyet@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Students', {})
  }
}
