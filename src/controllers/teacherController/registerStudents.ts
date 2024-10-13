import { NextFunction, Request, Response } from 'express'
import { registerStudentsService } from '@services/teacherService/registerStudents'
import { handleJoiValidationError } from '@utils/joiValidationError'
import Joi from 'joi'

const registerStudentsSchema = Joi.object({
  teacher: Joi.string().email().required(),
  students: Joi.array().items(Joi.string().email()).min(1).required()
})
export async function registerStudentsController(req: Request, res: Response, next: NextFunction) {
  try {
    const { error } = registerStudentsSchema.validate(req.body)
    if (error) {
      return handleJoiValidationError(error, res)
    }

    const { teacher, students }: { teacher: string; students: string[] } = req.body
    await registerStudentsService(teacher, students)
    res.sendStatus(204)
  } catch (error) {
    return next(error)
  }
}
