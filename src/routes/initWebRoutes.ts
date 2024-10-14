import { Router, Express } from 'express'

import { registerStudentsController } from '@controllers/teacherController/registerStudents'

import { getCommonStudentsController } from '@controllers/teacherController/getCommonStudents'

import { suspendStudentController } from '@controllers/teacherController/suspendStudent'

import { retrieveForNotificationsController } from '@controllers/teacherController/retrieveForNotifications'

const initWebRoutes = (app: Express) => {
  // Create a base router to handle all routes under `/api`
  const apiRouter = Router()

  // Version 1 routes
  apiRouter.get('/', (req, res) => {
    res.send('Hello world!')
  })
  /**
   * @openapi
   * '/api/register':
   *   post:
   *     tags:
   *     - RegisterStudent
   *     summary: Register an array of students to a specific teacher
   *     requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/RegisterStudent'
   *     responses:
   *      204:
   *        description: Success but no content
   *      400:
   *        description: Bad request
   *      404:
   *        description: Not found
   */
  apiRouter.post('/register', registerStudentsController)

  /**
   * @openapi
   * '/api/commonstudents':
   *   get:
   *     tags:
   *     - GetCommonStudents
   *     summary: Get array of common students register to array of teachers
   *     parameters:
   *       - in: query
   *         name: teacher
   *         schema:
   *              $ref: '#/components/schemas/GetCommonStudentQuery'
   *     responses:
   *       200:
   *         description: List of common students
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CommonStudentsResponse'
   *       400:
   *         description: Bad request - Joi validation error
   *       500:
   *         description: Internal server error
   */

  apiRouter.get('/commonstudents', getCommonStudentsController)

  /**
   * @openapi
   * '/api/suspend':
   *   post:
   *     tags:
   *     - SuspendStudent
   *     summary: Suspend a student
   *     description: Suspend a student by their email address
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SuspendStudentRequest'
   *     responses:
   *       204:
   *         description: No content - the student has been successfully suspended
   *       400:
   *         description: Bad request - Joi validation error
   *       404:
   *         description: Not found - Student with provided email doesn't exist
   *       500:
   *         description: Internal server error
   */

  apiRouter.post('/suspend', suspendStudentController)

  /**
   * @openapi
   * '/api/retrievefornotifications':
   *   post:
   *     tags:
   *     - RetrieveForNotifications
   *     summary: Retrieve notification recipients
   *     description: Retrieve a list of students who are eligible to receive notifications from a teacher. This includes active students associated with the teacher and those mentioned in the notification text, and they must not be suspended
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RetrieveNotificationRequest'
   *     responses:
   *       200:
   *         description: A list of notification recipients
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RetrieveNotificationResponse'
   *       400:
   *         description: Bad request - Joi validation error
   *       500:
   *         description: Internal server error
   */

  apiRouter.post('/retrievefornotifications', retrieveForNotificationsController)

  // Apply the `/api` prefix to all routes
  app.use('/api', apiRouter)
}

export default initWebRoutes
