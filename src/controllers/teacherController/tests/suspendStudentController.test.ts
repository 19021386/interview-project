import { suspendStudentController } from '@controllers/teacherController/suspendStudent'
import { suspendStudentService } from '@services/teacherService/suspendStudent'
import { handleJoiValidationError } from '@utils/joiValidationError'
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

jest.mock('@services/teacherService/suspendStudent')
jest.mock('@utils/joiValidationError')

describe('suspendStudentController', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    req = { body: {} }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn(), sendStatus: jest.fn() }
    next = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 204 status when the request is valid', async () => {
    req.body = { student: 'student1@email.com' }
    ;(suspendStudentService as jest.Mock).mockResolvedValue(undefined)
    await suspendStudentController(req as Request, res as Response, next)
    expect(suspendStudentService).toHaveBeenCalledWith('student1@email.com')
    expect(res.sendStatus).toHaveBeenCalledWith(204)
  })

  it('should handle Joi validation error for invalid student email', async () => {
    req.body = { student: 'invalidEmail' }

    const mockValidationError = new Joi.ValidationError(
      '"student" must be a valid email',
      [
        {
          message: '"student" must be a valid email',
          path: ['student'],
          type: 'string.email',
          context: { label: 'student', value: 'invalidEmail' }
        }
      ],
      {}
    )

    ;(handleJoiValidationError as jest.Mock).mockImplementation((error, res) => {
      return res.status(400).json({ message: error.details[0].message })
    })

    await suspendStudentController(req as Request, res as Response, next)

    expect(handleJoiValidationError).toHaveBeenCalledWith(mockValidationError, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: '"student" must be a valid email' })
  })

  it('should call next with error if suspendStudentService throws', async () => {
    req.body = { student: 'student1@email.com' }
    const mockError = new Error('Service error')
    ;(suspendStudentService as jest.Mock).mockRejectedValue(mockError)
    await suspendStudentController(req as Request, res as Response, next)
    expect(suspendStudentService).toHaveBeenCalledWith('student1@email.com')
    expect(next).toHaveBeenCalledWith(mockError)
  })
})
