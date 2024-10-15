import { NextFunction, Request, Response } from 'express'
import { retrieveForNotificationsService } from '@services/teacherService/retrieveForNotifications'
import { handleJoiValidationError } from '@utils/joiValidationError'
import Joi from 'joi'

const retrieveForNotificationsSchema = Joi.object({
  teacher: Joi.string().email().required(),
  notification: Joi.string().required()
}) // both fields are required, teacher must be a valid email string, notification must be a string

export const retrieveForNotificationsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = retrieveForNotificationsSchema.validate(req.body)
    if (error) {
      return handleJoiValidationError(error, res)
    }

    const { teacher, notification }: { teacher: string; notification: string } = req.body
    const recipients: string[] = await retrieveForNotificationsService(teacher, notification)
    return res.status(200).json({
      recipients: recipients
    })
  } catch (error) {
    return next(error)
  }
}
