import { getCommonStudentsService } from '@services/teacherService/getCommonStudents'
import { Student } from '@models/Student'
import { Teacher } from '@models/Teacher' // Import Teacher model directly
import { sequelize } from '@config/index'
import { Op } from 'sequelize'

jest.mock('@models/Student')
jest.mock('@config/index', () => ({
  sequelize: {
    literal: jest.fn((literal) => literal)
  }
}))

describe('getCommonStudentsService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the common students for multiple teachers', async () => {
    const teacherEmails = ['teacher1@email.com', 'teacher2@email.com']
    const mockStudents = [{ email: 'student1@email.com' }, { email: 'student2@email.com' }]

    ;(Student.findAll as jest.Mock).mockResolvedValue(mockStudents)

    const result = await getCommonStudentsService(teacherEmails)

    expect(Student.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: Teacher,
          as: 'teachers',
          attributes: [],
          where: {
            email: {
              [Op.in]: teacherEmails
            }
          },
          through: { attributes: [] }
        }
      ],
      attributes: ['email'],
      group: ['Student.email'],
      having: sequelize.literal(`COUNT(DISTINCT "teachers"."email") = ${teacherEmails.length}`)
    })
    expect(result).toEqual(['student1@email.com', 'student2@email.com'])
  })

  it('should return an empty array if no common students found', async () => {
    const teacherEmails = ['teacher1@email.com']
    ;(Student.findAll as jest.Mock).mockResolvedValue([])
    const result = await getCommonStudentsService(teacherEmails)
    expect(Student.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: Teacher,
          as: 'teachers',
          attributes: [],
          where: {
            email: {
              [Op.in]: teacherEmails
            }
          },
          through: { attributes: [] }
        }
      ],
      attributes: ['email'],
      group: ['Student.email'],
      having: sequelize.literal(`COUNT(DISTINCT "teachers"."email") = ${teacherEmails.length}`)
    })
    expect(result).toEqual([])
  })

  it('should convert single teacher email to array and return students', async () => {
    const teacherEmail = 'teacher1@email.com'
    const mockStudents = [{ email: 'student1@email.com' }]
    ;(Student.findAll as jest.Mock).mockResolvedValue(mockStudents)
    const result = await getCommonStudentsService(teacherEmail)

    expect(Student.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: Teacher,
          as: 'teachers',
          attributes: [],
          where: {
            email: {
              [Op.in]: [teacherEmail]
            }
          },
          through: { attributes: [] }
        }
      ],
      attributes: ['email'],
      group: ['Student.email'],
      having: sequelize.literal(`COUNT(DISTINCT "teachers"."email") = 1`)
    })
    expect(result).toEqual(['student1@email.com'])
  })

  it('should throw an error if findAll fails', async () => {
    const teacherEmails = ['teacher1@email.com']
    const mockError = new Error('Database error')
    ;(Student.findAll as jest.Mock).mockRejectedValue(mockError)
    await expect(getCommonStudentsService(teacherEmails)).rejects.toThrow('Database error')
  })
})
