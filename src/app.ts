import createError from 'http-errors'
import dotenv from 'dotenv'
dotenv.config() // Load environment variables

import express, { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'

import { connectDB } from '@config/index'
import { reqLogger } from '@middleware/eventLogger'
import initWebRoutes from '@routes/initWebRoutes'
import { Error } from '@constants/interface'
import { HttpException } from '@utils/httpException'
import { errorLogger } from '@middleware/errorLogger'

const app: Express = express()

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  message: 'Too many requests from this IP, please try again after 1 hour'
})
app.use(limiter)

// Logger
app.use(reqLogger)

// Express built-in middleware
app.use(express.json({ limit: process.env.JSON_LIMIT }))
app.use(express.urlencoded({ extended: false, limit: process.env.URL_ENCODED_LIMIT }))

// cookieParser
app.use(cookieParser())

// CORS configuration
const credentials = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
}
app.use(credentials)

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions))

// Helmet for securing HTTP headers
app.use(helmet())

// Initialize web routes
initWebRoutes(app)

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next) => {
  next(createError(404))
})

// Connect to the database
connectDB()

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
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

export default app
