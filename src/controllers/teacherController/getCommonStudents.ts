import { NextFunction, Request, Response } from 'express'

import { getCommonStudentsService } from '@services/teacherService/getCommonStudents'

export const getCommonStudentsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teachers = req.query.teacher as string | string[]
    const commonStudents = await getCommonStudentsService(teachers)
    return res.status(200).json({
      status: 'OK',
      data: {
        students: commonStudents
      }
    })
  } catch (error) {
    return next(error)
  }
}
