'use strict'

import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Teachers', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Teachers')
  }
}
