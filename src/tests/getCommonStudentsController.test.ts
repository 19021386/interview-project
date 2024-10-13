import { getCommonStudentsController } from '@controllers/teacherController/getCommonStudents' // Update with correct path
import { getCommonStudentsService } from '@services/teacherService/getCommonStudents'
import { handleJoiValidationError } from '@utils/joiValidationError'
import { Request, Response, NextFunction } from 'express'

jest.mock('@services/teacherService/getCommonStudents')
jest.mock('@utils/joiValidationError')
jest.mock('@config/index', () => ({
  sequelize: {
    literal: jest.fn().mockReturnValue('COUNT(DISTINCT "teachers"."email")')
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

  it('should return validation error when Joi schema fails', async () => {
    req.query = { teacher: 'invalidEmail' }
    ;(handleJoiValidationError as jest.Mock).mockImplementation((error, response) => {
      return response.status(400).json({ error: 'Invalid teacher email' })
    })

    await getCommonStudentsController(req as Request, res as Response, next)

    expect(handleJoiValidationError).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid teacher email' })
  })

  it('should call next with error if service throws', async () => {
    req.query = { teacher: ['teacher1@email.com'] }
    const mockError = new Error('Service error')
    ;(getCommonStudentsService as jest.Mock).mockRejectedValue(mockError)

    await getCommonStudentsController(req as Request, res as Response, next)

    expect(getCommonStudentsService).toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith(mockError)
  })
})
