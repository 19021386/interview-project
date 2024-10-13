import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'

import { Request, Response, NextFunction } from 'express'

import fs from 'fs'
import { promises as fsPromises } from 'fs'
import path from 'path'

export const eventLogger = async (message: string, logName: string, next: NextFunction) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }

    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
  } catch (err) {
    next(err)
  }
}

export const reqLogger = (req: Request, res: Response, next: NextFunction) => {
  eventLogger(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt', next)
  // console.log(`${req.method} ${req.url}`)
  next()
}
