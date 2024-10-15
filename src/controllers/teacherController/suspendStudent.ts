import { Request, Response, NextFunction } from 'express'
import { suspendStudentService } from '@services/teacherService/suspendStudent'
import { handleJoiValidationError } from '@utils/joiValidationError'
import Joi from 'joi'

const suspendStudentSchema = Joi.object({
  student: Joi.string().email().required()
}) // student field is required and must be a valid email string

export const suspendStudentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = suspendStudentSchema.validate(req.body)
    if (error) {
      return handleJoiValidationError(error, res)
    }

    const { student }: { student: string } = req.body
    await suspendStudentService(student)
    return res.sendStatus(204)
  } catch (error) {
    return next(error)
  }
}
