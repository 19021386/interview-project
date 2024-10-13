import { registerStudentsService } from '@services/teacherService/registerStudents'
import { Teacher } from '@models/Teacher'
import { Student } from '@models/Student'
import { HttpException } from '@utils/httpException'
import { globalErrCode } from '@constants/errorCode'

jest.mock('@models/Teacher')
jest.mock('@models/Student')

describe('registerStudentsService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should throw an error if the teacher is not found', async () => {
    const teacherEmail = 'teacher1@email.com'
    const studentEmails = ['student1@email.com', 'student2@email.com']

    ;(Teacher.findByPk as jest.Mock).mockResolvedValue(null)

    await expect(registerStudentsService(teacherEmail, studentEmails)).rejects.toThrow(
      new HttpException(globalErrCode['TEACHER.0001'])
    )
    expect(Teacher.findByPk).toHaveBeenCalledWith(teacherEmail)
  })

  it('should throw an error if not all students are found', async () => {
    const teacher = { $set: jest.fn() }
    const teacherEmail = 'teacher1@email.com'
    const studentEmails = ['student1@email.com', 'student2@email.com']

    ;(Teacher.findByPk as jest.Mock).mockResolvedValue(teacher)
    ;(Student.findAll as jest.Mock).mockResolvedValue([{ email: 'student1@email.com' }])

    await expect(registerStudentsService(teacherEmail, studentEmails)).rejects.toThrow(
      new HttpException(globalErrCode['STUDENT.0001'])
    )
    expect(Teacher.findByPk).toHaveBeenCalledWith(teacherEmail)
    expect(Student.findAll).toHaveBeenCalledWith({
      where: { email: studentEmails }
    })
  })

  it('should set the students for the teacher when all students are found', async () => {
    const teacher = { $set: jest.fn() }
    const teacherEmail = 'teacher1@email.com'
    const studentEmails = ['student1@email.com', 'student2@email.com']

    const mockStudents = [{ email: 'student1@email.com' }, { email: 'student2@email.com' }]

    ;(Teacher.findByPk as jest.Mock).mockResolvedValue(teacher)
    ;(Student.findAll as jest.Mock).mockResolvedValue(mockStudents)

    await registerStudentsService(teacherEmail, studentEmails)

    expect(Teacher.findByPk).toHaveBeenCalledWith(teacherEmail)
    expect(Student.findAll).toHaveBeenCalledWith({
      where: { email: studentEmails }
    })
    expect(teacher.$set).toHaveBeenCalledWith('students', mockStudents)
  })
})
