import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'
import { NextFunction } from 'express'

import { Error } from '@constants/interface'

export const eventLogger = async (message: string, logName: string, next: NextFunction, error?: Error) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
  const errorInfo = error ? `\t${error}` : ''
  const logItem = `${dateTime}\t${uuid()}\t${message}${errorInfo}\n`

  try {
    const logsDir = path.join(__dirname, '..', 'logs')
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir)
    }

    await fsPromises.appendFile(path.join(logsDir, logName), logItem)
  } catch (err) {
    next(err)
  }
}
