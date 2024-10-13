/* eslint-disable prettier/prettier */
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

import { Request, Response, NextFunction } from 'express'

import { Error } from '@constants/interface'

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

export const eventLogger = async (error: Error, message: string, logName: string, next: NextFunction) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\t${error}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch (err) {
        next(err)
    }
}

export const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction) => {
    eventLogger(error, `${req.method}\t${req.headers.origin}\t${req.url}`, 'errLog.txt', next)
    // console.log(`${req.method} ${req.url}`)
}
