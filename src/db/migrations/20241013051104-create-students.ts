'use strict'

import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Students', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Students')
  }
}
