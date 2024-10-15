/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterStudent:
 *       type: object
 *       required:
 *         - teacher
 *         - students
 *       properties:
 *         teacher:
 *           type: string
 *           default: teacherken@gmail.com
 *         students:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - studenttung@gmail.com
 *             - studentphuong@gmail.com
 *
 *     GetCommonStudentQuery:
 *       type: array
 *       items:
 *         type: string
 *         format: email
 *       description: The email(s) of the teacher(s) whose common students you want to retrieve.
 *       example:
 *         - "teacherken@gmail.com"
 *         - "teacherjoe@gmail.com"
 *
 *     CommonStudentsResponse:
 *       type: object
 *       properties:
 *         students:
 *           type: array
 *           items:
 *             type: string
 *             example: ["studenttung@gmail.com", "studentphuong@gmail.com"]
 *
 *     SuspendStudentRequest:
 *       type: object
 *       required:
 *         - student
 *       properties:
 *         student:
 *           type: string
 *           format: email
 *           description: The email of the student to suspend.
 *           example: "studentphuong@gmail.com"
 *
 *     RetrieveNotificationRequest:
 *       type: object
 *       required:
 *         - teacher
 *         - notification
 *       properties:
 *         teacher:
 *           type: string
 *           format: email
 *           description: The email of the teacher sending the notification.
 *           example: "teacherken@gmail.com"
 *         notification:
 *           type: string
 *           description: The notification text, which may include email addresses of students to be notified.
 *           example: "Hello students! @studentquan@gmail.com @studentquang@gmail.com"
 *
 *     RetrieveNotificationResponse:
 *       type: object
 *       properties:
 *         recipients:
 *           type: array
 *           items:
 *              type: string
 *              example: ["studenttung@gmail.com", "studentphuong@gmail.com", "studentquan@gmail.com", "studentquang@gmail.com"]
 */
