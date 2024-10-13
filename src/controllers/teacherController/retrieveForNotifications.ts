import { NextFunction, Request, Response } from 'express'
import { retrieveForNotificationsService } from '@services/teacherService/retrieveForNotifications'

export const retrieveForNotificationsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { teacher, notification }: { teacher: string; notification: string } = req.body
    const recipients: string[] = await retrieveForNotificationsService(teacher, notification)
    return res.status(200).json({
      status: 'OK',
      data: {
        recipients: recipients
      }
    })
  } catch (error) {
    return next(error)
  }
}
