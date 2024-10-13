import { Request, Response, NextFunction } from 'express'
import { suspendStudentService } from '@services/teacherService/suspendStudent'

export const suspendStudentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { student }: { student: string } = req.body
    await suspendStudentService(student)
    return res.sendStatus(204)
  } catch (error) {
    return next(error)
  }
}
