import { NextFunction, Request, Response } from 'express'
import { getCommonStudentsService } from '@services/teacherService/getCommonStudents'
import { handleJoiValidationError } from '@utils/joiValidationError'
import Joi from 'joi'

const getCommonStudentsSchema = Joi.object({
  teacher: Joi.alternatives().try(Joi.string().email(), Joi.array().items(Joi.string().email())).required()
}) // teacher is required, and either an array of strings or a string of valid email address

export const getCommonStudentsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = getCommonStudentsSchema.validate(req.query)
    if (error) {
      return handleJoiValidationError(error, res)
    }

    const teachers = req.query.teacher as string[] | string
    const commonStudents = await getCommonStudentsService(teachers)
    return res.status(200).json({
      students: commonStudents
    })
  } catch (error) {
    return next(error)
  }
}
