import { handleJoiValidationError } from '@utils/joiValidationError'
import { Response } from 'express'
import Joi from 'joi'

describe('handleJoiValidationError', () => {
  let res: Partial<Response>

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a 400 status and an error message when Joi validation error occurs', () => {
    const mockValidationError = new Joi.ValidationError(
      'ValidationError',
      [
        {
          message: '"teacher" must be a valid email',
          path: ['teacher'],
          type: 'string.email',
          context: { label: 'teacher', value: 'invalidEmail' }
        }
      ],
      {}
    )

    handleJoiValidationError(mockValidationError, res as Response)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      status: 'NG',
      error: {
        errCode: 400,
        message: '"teacher" must be a valid email'
      }
    })
  })

  it('should return a 400 status and the first error message in the details array', () => {
    const mockValidationError = new Joi.ValidationError(
      'ValidationError',
      [
        { message: '"students" must contain at least 1 item', path: ['students'], type: 'array.min' },
        { message: '"teacher" is required', path: ['teacher'], type: 'any.required' }
      ],
      {}
    )

    handleJoiValidationError(mockValidationError, res as Response)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      status: 'NG',
      error: {
        errCode: 400,
        message: '"students" must contain at least 1 item'
      }
    })
  })
})
