'use strict'

import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('TeacherStudents', {
      teacherEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Teachers',
          key: 'email'
        },
        onDelete: 'CASCADE',
        primaryKey: true // Mark teacherEmail as part of the primary key
      },
      studentEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Students',
          key: 'email'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('TeacherStudents')
  }
}
