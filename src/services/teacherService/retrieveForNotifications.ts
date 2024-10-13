import { Teacher } from '@models/Teacher'
import { Student } from '@models/Student'
import { HttpException } from '@utils/httpException'
import { globalErrCode } from '@constants/errorCode'

export const retrieveForNotificationsService = async (
  teacherEmail: string,
  notificationText: string
): Promise<string[]> => {
  const teacher = await Teacher.findByPk(teacherEmail, {
    include: {
      model: Student,
      where: { suspended: false },
      attributes: ['email'],
      through: { attributes: [] }
    }
  })

  if (!teacher) {
    throw new HttpException(globalErrCode['TEACHER.0002'])
  }

  const registeredStudents = teacher.students.map((student) => student.email)

  const mentionedStudents = (notificationText.match(/@\S+@\S+\.\S+/g) || []).map((email) => email.slice(1))

  const allRecipients = [...new Set([...registeredStudents, ...mentionedStudents])]

  const validStudents = await Student.findAll({
    where: {
      email: allRecipients,
      suspended: false
    }
  })

  return validStudents.map((student) => student.email)
}
