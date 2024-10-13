import { Teacher } from '@models/Teacher'
import { Student } from '@models/Student'
import { HttpException } from '@utils/httpException'
import { globalErrCode } from '@constants/errorCode'

export const getCommonStudentsService = async (teacherEmails: string | string[]) => {
  if (!Array.isArray(teacherEmails)) {
    teacherEmails = [teacherEmails]
  }

  const teachers = await Teacher.findAll({
    where: {
      email: teacherEmails
    },
    include: {
      model: Student,
      attributes: ['email'],
      through: { attributes: [] }
    }
  })

  if (teachers.length !== teacherEmails.length) {
    throw new HttpException(globalErrCode['TEACHER.0002'])
  }

  const studentLists = teachers.map((teacher) => teacher.students.map((student) => student.email))

  const commonStudents = studentLists.reduce((a, b) => a.filter((c) => b.includes(c)))

  return commonStudents
}
