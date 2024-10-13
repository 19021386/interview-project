import { NextFunction, Request, Response } from 'express'
import { registerStudentsService } from '@services/teacherService/registerStudents'

export async function registerStudentsController(req: Request, res: Response, next: NextFunction) {
  try {
    const { teacher, students } = req.body
    await registerStudentsService(teacher, students)
    res.sendStatus(204) // HTTP 204: No Content
  } catch (error) {
    return next(error)
  }
}
