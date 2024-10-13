import { Teacher } from '@models/Teacher'
import { Student } from '@models/Student'

import { HttpException } from '@utils/httpException'
import { globalErrCode } from '@constants/errorCode'

export async function registerStudentsService(teacherEmail: string, studentEmails: string[]) {
  const teacher = await Teacher.findByPk(teacherEmail)
  if (!teacher) {
    throw new HttpException(globalErrCode['TEACHER.0001'])
  }

  const students = await Student.findAll({
    where: { email: studentEmails }
  })

  if (students.length !== studentEmails.length) {
    throw new HttpException(globalErrCode['STUDENT.0001'])
  }

  await teacher.$set('students', students) // Set the many-to-many relationship
}
