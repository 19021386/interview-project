const createError = require('http-errors')

require('dotenv').config()

import express, { Express, NextFunction, Request, Response } from 'express'

const cors = require('cors')

const helmet = require('helmet')

const rateLimit = require('express-rate-limit')

import { connectDB } from '@config/index'

import { reqLogger } from '@middleware/eventLogger'

import initWebRoutes from '@routes/initWebRoutes'

import { Error } from '@constants/interface'
import { HttpException } from '@utils/httpException'
import { errorLogger } from '@middleware/errorLogger'

const cookieParser = require('cookie-parser')

const app: Express = express()

//rate limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  message: 'Too many requests from this IP, please try again after 1 hour'
})
app.use(limiter)

//logger
app.use(reqLogger)

// Express built-in middleware
app.use(express.json({ limit: process.env.JSON_LIMIT }))
app.use(express.urlencoded({ extended: false, limit: process.env.URL_ENCODED_LIMIT }))

//cookieParser
app.use(cookieParser())

//cors
const credentials = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
}
app.use(credentials)
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some browsers choke on 204
  credentials: true
}
app.use(cors(corsOptions))

app.use(helmet())

initWebRoutes(app)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next) {
  next(createError(404))
})

connectDB()
app.use(function (error: Error, req: Request, res: Response, next: NextFunction) {
  errorLogger(error, req, res, next)
  if (error instanceof HttpException) {
    error.status = error.status || 500
    res.status(error.status).json({
      status: 'NG',
      error: {
        errCode: error.errCode,
        message: error.message
      }
    })
  } else {
    res.status(500).json({
      status: 'NG',
      error: {
        errCode: error.status || 500,
        message: error.message
      }
    })
  }
  next()
})

module.exports = app
