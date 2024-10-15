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
        email: 'teacherkein@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'teacherzoe@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'teacherash@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Teachers', {})
  }
}
