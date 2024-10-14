import { Request, Response, NextFunction } from 'express'

import { eventLogger } from '@utils/eventLogger'

export const reqLogger = (req: Request, res: Response, next: NextFunction) => {
  eventLogger(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt', next)
  // console.log(`${req.method} ${req.url}`)
  next()
}
