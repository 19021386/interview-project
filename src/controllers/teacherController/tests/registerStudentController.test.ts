import { registerStudentsController } from '@controllers/teacherController/registerStudents'
import { registerStudentsService } from '@services/teacherService/registerStudents'
import { handleJoiValidationError } from '@utils/joiValidationError'
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

jest.mock('@services/teacherService/registerStudents')
jest.mock('@utils/joiValidationError')

describe('registerStudentsController', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    req = {
      body: {}
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn()
    }

    next = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 204 status when the request is valid', async () => {
    req.body = {
      teacher: 'teacher1@email.com',
      students: ['student1@email.com', 'student2@email.com']
    }
    ;(registerStudentsService as jest.Mock).mockResolvedValue(undefined)

    await registerStudentsController(req as Request, res as Response, next)

    expect(registerStudentsService).toHaveBeenCalledWith('teacher1@email.com', [
      'student1@email.com',
      'student2@email.com'
    ])
    expect(res.sendStatus).toHaveBeenCalledWith(204)
  })

  it('should handle Joi validation error for invalid teacher email', async () => {
    req.body = {
      teacher: 'invalidEmail',
      students: ['student1@email.com']
    }

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

    ;(registerStudentsService as jest.Mock).mockResolvedValue(undefined)
    ;(handleJoiValidationError as jest.Mock).mockImplementation((error, res) => {
      return res.status(400).json({ status: 'error', message: error.details[0].message })
    })

    await registerStudentsController(req as Request, res as Response, next)

    expect(handleJoiValidationError).toHaveBeenCalledWith(mockValidationError, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: '"teacher" must be a valid email'
    })
  })

  it('should handle Joi validation error for empty students array', async () => {
    req.body = {
      teacher: 'teacher@email.com',
      students: []
    }

    const mockValidationError = new Joi.ValidationError(
      '"students" must contain at least 1 items',
      [
        {
          message: '"students" must contain at least 1 items',
          path: ['students'],
          type: 'array.min',
          context: { limit: 1 }
        }
      ],
      {}
    )

    ;(registerStudentsService as jest.Mock).mockResolvedValue(undefined)
    ;(handleJoiValidationError as jest.Mock).mockImplementation((error, res) => {
      return res.status(400).json({ status: 'error', message: error.details[0].message })
    })

    await registerStudentsController(req as Request, res as Response, next)

    expect(handleJoiValidationError).toHaveBeenCalledWith(mockValidationError, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: '"students" must contain at least 1 items'
    })
  })

  it('should call next with error if registerStudentsService throws an error', async () => {
    req.body = {
      teacher: 'teacher1@email.com',
      students: ['student1@email.com']
    }
    const mockError = new Error('Service error')

    ;(registerStudentsService as jest.Mock).mockRejectedValue(mockError)

    await registerStudentsController(req as Request, res as Response, next)

    expect(registerStudentsService).toHaveBeenCalledWith('teacher1@email.com', ['student1@email.com'])
    expect(next).toHaveBeenCalledWith(mockError)
  })
})
