import { Sequelize } from 'sequelize-typescript'

const env = process.env.NODE_ENV || 'development'
const config = require('../config/database.ts')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    // console.log(config)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { Sequelize, sequelize, connectDB }
