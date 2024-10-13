import { Response } from 'express'
import Joi from 'joi'

// Reusable function to handle Joi validation errors
export const handleJoiValidationError = (error: Joi.ValidationError, res: Response) => {
  return res.status(400).json({
    status: 'error',
    message: error.details[0].message
  })
}
