const createError = require('http-errors')
require('dotenv').config()
import express, { Express, NextFunction, Request, Response } from 'express'
const cors = require('cors')

import { connectDB } from '@config/index'

import User from 'src/db/models/User'

const cookieParser = require('cookie-parser')

const app: Express = express()

// Express built-in c
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.static('./src/public'))

//cookieParser
app.use(cookieParser())

const whiteList = ['https://localhost:5173', 'http://localhost:5173']

const credentials = (req: Request, res: Response, next: NextFunction) => {
  // Website you wish to allow to connect
  const origin = req.headers.origin || ''
  if (whiteList.includes(origin)) {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }
  next()
}
app.use(credentials)
const corsOptions = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  origin: (origin: string, callback: Function) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 // some browsers choke on 204
}
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send('Hello from Dockerized Express App!')
})

app.get('/users', async function (req, res) {
  const users = await User.findAll({
    include: [{ all: true, nested: true }],
    order: [['id', 'ASC']],
    attributes: {
      exclude: ['password']
    },
    nest: true,
    raw: false
  })
  res.status(200).json(users)
})

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next) {
  next(createError(404))
})

connectDB()
app.use(function (error: Error, req: Request, res: Response) {
  res.status(404).json('Not Found')
})

module.exports = app
