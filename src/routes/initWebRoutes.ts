import { Router, Express } from 'express'

import { registerStudentsController } from '@controllers/teacherController/registerStudents'

const initWebRoutes = (app: Express) => {
  // Create a base router to handle all routes under `/api`
  const apiRouter = Router()

  // Version 1 routes
  apiRouter.use('/', (req, res) => {
    res.send('Hello world!')
  })
  apiRouter.post('/register', registerStudentsController)

  // Apply the `/api` prefix to all routes
  app.use('/api', apiRouter)
}

export default initWebRoutes
