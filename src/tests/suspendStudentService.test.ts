import { suspendStudentService } from '@services/teacherService/suspendStudent'
import { Student } from '@models/Student'
import { HttpException } from '@utils/httpException'
import { globalErrCode } from '@constants/errorCode'

jest.mock('@models/Student')

describe('suspendStudentService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if the student is not found', async () => {
    const studentEmail = 'student1@email.com'
    ;(Student.findByPk as jest.Mock).mockResolvedValue(null)
    await expect(suspendStudentService(studentEmail)).rejects.toThrow(new HttpException(globalErrCode['STUDENT.0002']))
    expect(Student.findByPk).toHaveBeenCalledWith(studentEmail)
  })

  it('should suspend the student when found', async () => {
    const mockStudent = { email: 'student1@email.com', suspended: false, save: jest.fn() }
    ;(Student.findByPk as jest.Mock).mockResolvedValue(mockStudent)
    await suspendStudentService('student1@email.com')
    expect(mockStudent.suspended).toBe(true)
    expect(mockStudent.save).toHaveBeenCalled()
  })

  it('should throw an error if save fails', async () => {
    const mockStudent = {
      email: 'student1@email.com',
      suspended: false,
      save: jest.fn().mockRejectedValue(new Error('Save failed'))
    }
    ;(Student.findByPk as jest.Mock).mockResolvedValue(mockStudent)
    await expect(suspendStudentService('student1@email.com')).rejects.toThrow('Save failed')
  })
})
