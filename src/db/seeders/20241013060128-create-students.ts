'use strict'

import { QueryInterface } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Students', [
      {
        email: 'studentjack@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentbrandon@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentalex@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studenttravis@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentmay@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentirene@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentchloe@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentjenny@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentlisa@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentrose@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentjohn@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentkevin@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentisaac@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentstanley@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentpeter@gmail.com',
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
