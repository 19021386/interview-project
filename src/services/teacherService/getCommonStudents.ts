import { Op } from 'sequelize'
import { Student } from '@models/Student'
import { Teacher } from '@models/Teacher'
import { sequelize } from '@config/index'

export const getCommonStudentsService = async (teacherEmails: string[]) => {
  if (!Array.isArray(teacherEmails)) {
    teacherEmails = [teacherEmails]
  }

  const teacherCount = teacherEmails.length

  const commonStudents = await Student.findAll({
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
    having: sequelize.literal(`COUNT(DISTINCT "teachers"."email") = ${teacherCount}`)
  })

  return commonStudents.map((student) => student.email)
}
