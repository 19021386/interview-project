import { Router, Express } from 'express'

import { registerStudentsController } from '@controllers/teacherController/registerStudents'

import { getCommonStudentsController } from '@controllers/teacherController/getCommonStudents'
const initWebRoutes = (app: Express) => {
  // Create a base router to handle all routes under `/api`
  const apiRouter = Router()

  // Version 1 routes
  apiRouter.get('/', (req, res) => {
    res.send('Hello world!')
  })
  apiRouter.post('/register', registerStudentsController)

  apiRouter.get('/commonstudents', getCommonStudentsController)

  // Apply the `/api` prefix to all routes
  app.use('/api', apiRouter)
}

export default initWebRoutes
