import { getCommonStudentsController } from '@controllers/teacherController/getCommonStudents'
import { getCommonStudentsService } from '@services/teacherService/getCommonStudents'
import { handleJoiValidationError } from '@utils/joiValidationError'
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

jest.mock('@services/teacherService/getCommonStudents')
jest.mock('@utils/joiValidationError')
jest.mock('@config/index', () => ({
  sequelize: {
    literal: jest.fn((literal) => literal)
  }
}))

describe('getCommonStudentsController', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    req = {
      query: {}
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    next = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return common students when the request is valid', async () => {
    req.query = { teacher: ['teacher1@email.com', 'teacher2@email.com'] }
    const mockCommonStudents = ['student1@email.com', 'student2@email.com']
    ;(getCommonStudentsService as jest.Mock).mockResolvedValue(mockCommonStudents)

    await getCommonStudentsController(req as Request, res as Response, next)

    expect(getCommonStudentsService).toHaveBeenCalledWith(['teacher1@email.com', 'teacher2@email.com'])
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      status: 'OK',
      data: {
        students: mockCommonStudents
      }
    })
  })

  it('should handle Joi validation error', async () => {
    req.query = { teacher: 'invalidEmail' }

    const mockValidationError = new Joi.ValidationError(
      '"teacher" must be a valid email',
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

    ;(handleJoiValidationError as jest.Mock).mockImplementation((error, res) => {
      return res.status(400).json({ status: 'error', message: error.details[0].message })
    })

    await getCommonStudentsController(req as Request, res as Response, next)

    expect(handleJoiValidationError).toHaveBeenCalledWith(mockValidationError, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ status: 'error', message: '"teacher" must be a valid email' })
  })

  it('should call next with error if service throws an error', async () => {
    req.query = { teacher: ['teacher1@email.com'] }
    const mockError = new Error('Service error')
    ;(getCommonStudentsService as jest.Mock).mockRejectedValue(mockError)

    await getCommonStudentsController(req as Request, res as Response, next)

    expect(next).toHaveBeenCalledWith(mockError)
  })
})
