'use strict'

import { QueryInterface } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('TeacherStudents', [
      {
        teacherEmail: 'teacherken@gmail.com',
        studentEmail: 'studenttung@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        teacherEmail: 'teacherken@gmail.com',
        studentEmail: 'studentphuong@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        teacherEmail: 'teacherken@gmail.com',
        studentEmail: 'studenthuy@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        teacherEmail: 'teacherjoe@gmail.com',
        studentEmail: 'studenttung@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('TeacherStudents', {})
  }
}
