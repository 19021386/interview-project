import { globalErrCode } from '@constants/errorCode'
import { Student } from '@models/Student'
import { HttpException } from '@utils/httpException'

export const suspendStudentService = async (studentEmail: string): Promise<void> => {
  const student = await Student.findByPk(studentEmail)

  if (!student) {
    throw new HttpException(globalErrCode['STUDENT.0002'])
  }
  if (student.suspended === false) {
    student.suspended = true
    await student.save()
  }
}
