'use strict'

import { QueryInterface } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Teachers', [
      {
        email: 'teacherken@gmail.com',
        createdAt: new Date(),

        updatedAt: new Date()
      },
      {
        email: 'teacherjoe@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'teachertuananh@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'teacherquy@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'teacherhai@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Teachers', {})
  }
}
