import { retrieveForNotificationsController } from '@controllers/teacherController/retrieveForNotifications'
import { retrieveForNotificationsService } from '@services/teacherService/retrieveForNotifications'
import { handleJoiValidationError } from '@utils/joiValidationError'
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

jest.mock('@services/teacherService/retrieveForNotifications')
jest.mock('@utils/joiValidationError')

describe('retrieveForNotificationsController', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    req = { body: {} }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    next = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 200 status and recipients when the request is valid', async () => {
    req.body = { teacher: 'teacher1@email.com', notification: 'Hello @student1@email.com' }
    const mockRecipients = ['student1@email.com']
    ;(retrieveForNotificationsService as jest.Mock).mockResolvedValue(mockRecipients)

    await retrieveForNotificationsController(req as Request, res as Response, next)

    expect(retrieveForNotificationsService).toHaveBeenCalledWith('teacher1@email.com', 'Hello @student1@email.com')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      recipients: mockRecipients
    })
  })

  it('should handle Joi validation error for invalid input', async () => {
    req.body = { teacher: 'invalidEmail', notification: 'Notification text' }

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
      return res.status(400).json({ message: error.details[0].message })
    })

    await retrieveForNotificationsController(req as Request, res as Response, next)

    expect(handleJoiValidationError).toHaveBeenCalledWith(mockValidationError, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: '"teacher" must be a valid email' })
  })

  it('should call next with error if retrieveForNotificationsService throws an error', async () => {
    req.body = { teacher: 'teacher1@email.com', notification: 'Hello @student1@email.com' }
    const mockError = new Error('Service error')
    ;(retrieveForNotificationsService as jest.Mock).mockRejectedValue(mockError)

    await retrieveForNotificationsController(req as Request, res as Response, next)

    expect(next).toHaveBeenCalledWith(mockError)
  })
})
