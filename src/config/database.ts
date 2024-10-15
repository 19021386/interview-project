require('dotenv').config()

const host = process.env.DB_HOST
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const dbPort = process.env.DB_PORT
const sslCA = process.env.CA_CERTIFICATE

// get database settings from environment

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    port: dbPort,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true,
        ca: sslCA
      }
    },
    dialect: 'mysql',
    models: [__dirname + '/../db/models']
    // logging: false
  }
}
