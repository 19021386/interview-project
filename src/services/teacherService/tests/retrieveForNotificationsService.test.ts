import { retrieveForNotificationsService } from '@services/teacherService/retrieveForNotifications'
import { Student } from '@models/Student'
import { Teacher } from '@models/Teacher'
import { Op } from 'sequelize'
import { emailRegex } from '@constants/regex'

jest.mock('@models/Student')
jest.mock('@models/Teacher')

describe('retrieveForNotificationsService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a list of students who are not suspended, mentioned in the notification and registered with the teacher', async () => {
    const teacherEmail = 'teacher1@email.com'
    const notificationText = 'Hello @student1@email.com'

    const mentionedStudents: string[] = (notificationText.match(emailRegex) || []).map((email: string) =>
      email.slice(1)
    )

    const mockStudents = [
      { email: 'student1@email.com', suspended: false },
      { email: 'student2@email.com', suspended: false }
    ]

    ;(Student.findAll as jest.Mock).mockResolvedValue(mockStudents)

    const result = await retrieveForNotificationsService(teacherEmail, notificationText)

    expect(Student.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: Teacher,
          as: 'teachers',
          where: { email: teacherEmail },
          through: { attributes: [] },
          required: false
        }
      ],
      where: {
        [Op.or]: [{ '$teachers.email$': teacherEmail }, { email: { [Op.in]: mentionedStudents } }],
        suspended: false
      },
      attributes: ['email']
    })

    expect(result).toEqual(['student1@email.com', 'student2@email.com'])
  })

  it('should return an empty list when there are no mentioned students and no teacher-associated students', async () => {
    const teacherEmail = 'teacher1@email.com'
    const notificationText = 'Hello everyone'

    const mentionedStudents: string[] = []

    ;(Student.findAll as jest.Mock).mockResolvedValue([])

    const result = await retrieveForNotificationsService(teacherEmail, notificationText)

    expect(Student.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: Teacher,
          as: 'teachers',
          where: { email: teacherEmail },
          through: { attributes: [] },
          required: false
        }
      ],
      where: {
        [Op.or]: [{ '$teachers.email$': teacherEmail }, { email: { [Op.in]: mentionedStudents } }],
        suspended: false
      },
      attributes: ['email']
    })

    expect(result).toEqual([])
  })

  it('should return only teacher-associated students if notification contains invalid emails', async () => {
    const teacherEmail = 'teacher1@email.com'
    const notificationText = 'Hello @invalidEmail, how are you?'

    const mentionedStudents: string[] = []

    const mockStudents = [{ email: 'student1@email.com', suspended: false }]

    ;(Student.findAll as jest.Mock).mockResolvedValue(mockStudents)

    const result = await retrieveForNotificationsService(teacherEmail, notificationText)

    expect(Student.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: Teacher,
          as: 'teachers',
          where: { email: teacherEmail },
          through: { attributes: [] },
          required: false
        }
      ],
      where: {
        [Op.or]: [{ '$teachers.email$': teacherEmail }, { email: { [Op.in]: mentionedStudents } }],
        suspended: false
      },
      attributes: ['email']
    })

    expect(result).toEqual(['student1@email.com'])
  })

  it('should throw an error if Student.findAll fails', async () => {
    const teacherEmail = 'teacher1@email.com'
    const notificationText = 'Hello @student1@email.com'
    const mockError = new Error('Database error')

    ;(Student.findAll as jest.Mock).mockRejectedValue(mockError)

    await expect(retrieveForNotificationsService(teacherEmail, notificationText)).rejects.toThrow('Database error')
  })
})
