'use strict'

import { QueryInterface } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('TeacherStudents', [
      {
        teacherEmail: 'teacherken@gmail.com',
        studentEmail: 'studentjack@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        teacherEmail: 'teacherken@gmail.com',
        studentEmail: 'studentirene@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        teacherEmail: 'teacherken@gmail.com',
        studentEmail: 'studentkevin@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        teacherEmail: 'teacherjoe@gmail.com',
        studentEmail: 'studentjack@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('TeacherStudents', {})
  }
}
