import { Op } from 'sequelize'
import { Teacher } from '@models/Teacher'
import { Student } from '@models/Student'

import { emailRegex } from '@constants/regex'

export const retrieveForNotificationsService = async (
  teacherEmail: string,
  notificationText: string
): Promise<string[]> => {
  const mentionedStudents = (notificationText.match(emailRegex) || []).map((email) => email.slice(1))
  const students = await Student.findAll({
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

  return students.map((student) => student.email)
}
