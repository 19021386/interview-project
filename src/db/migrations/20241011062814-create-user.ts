'use strict'

import { QueryInterface, DataTypes } from 'sequelize'

enum ROLE_TYPE {
  SUPER = 'SUPER',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

enum GENDER_TYPE {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  GAY = 'GAY',
  LESBIAN = 'LESBIAN',
  OTHER = 'OTHER'
}

enum STATUS_TYPE {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(ROLE_TYPE))
      },
      phone: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      avatar_img: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.ENUM(...Object.values(GENDER_TYPE))
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(STATUS_TYPE))
      },
      refresh_token: {
        type: DataTypes.STRING
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
    await queryInterface.dropTable('Users')
  }
}
