/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express'

import { Error } from '@constants/interface'

import { eventLogger } from '@utils/eventLogger';

export const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction) => {
    eventLogger( `${req.method}\t${req.headers.origin}\t${req.url}`, 'errLog.txt', next, error)
}
