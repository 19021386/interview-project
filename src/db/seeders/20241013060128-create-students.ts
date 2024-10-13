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
      },
      {
        email: 'studentquang@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentviet@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentkhai@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentkhanh@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentkien@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studenthoang@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentbinh@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentminh@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentquan@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studentthuong@gmail.com',
        suspended: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'studenthuy@gmail.com',
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
