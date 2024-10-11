// require('ts-node/register')
require('dotenv').config()
const fs = require('fs')
const sslCA = fs.readFileSync(__dirname + process.env.DB_SSL_CA)

const host = process.env.DB_HOST
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const dbPort = process.env.DB_PORT

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
