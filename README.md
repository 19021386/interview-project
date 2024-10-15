# Project Interview

This project is a Node.js application running on Docker using MySQL as the database. The application environment is set up for development using Docker Compose, with migrations, seeding, and starting the development server automatically handled.

# Table of Contents

- [Project Deployment](#project-deployment)
  - [Postman Collection](#postman-collection)
  - [How to Use the Postman Collection](#how-to-use-the-postman-collection)
- [Steps to Run the Project](#steps-to-run-the-project)
- [Additional Information](#additional-information)
- [About this Project](#about-this-project)
  - [Models](#models)
    - [Important](#important)
    - [Student Model](#student-model)
    - [Teacher Model](#teacher-model)
    - [TeacherStudent Model](#teacherstudent-model)
  - [Endpoint Services](#endpoint-services)
    - [Swagger Documentation](#swagger-documentation)
    - [Register Students](#register-students)
    - [Retrieve Common Students](#retrieve-common-students)
    - [Suspend a Student](#suspend-a-student)
    - [Retrieve for Notifications](#retrieve-for-notifications)
    - [Error Responses](#error-responses)

## Project Deployment

The project has been successfully deployed! You can access the live API and its documentation using the following link:

- [Swagger API Documentation](https://interview-project-ghjp.onrender.com/docs)

This endpoint contains the full documentation of the API, including all available routes, methods, and parameters. You can use the Swagger UI to explore and interact with the API directly.

Feel free to check it out and test the endpoints! 😊

### Postman Collection

To conveniently test the API in both local and deployed environments, the project includes a **Postman collection** file named `interview-project-collection.postman_collection.json`.

You can use this file to:

- Quickly import all the API endpoints into Postman.
- Switch between local and deployment environments for testing purposes.

### How to Use the Postman Collection:

1. Open Postman.
2. Click on **Import** and select the `interview-project-collection.postman_collection.json` file from the project directory.
3. The included environment variables for both **local** and **deployed** environments will automatically be imported.
4. Select the appropriate environment when testing (local or deployed).
5. Start testing the endpoints with the pre-configured requests!

## Steps to Run the Project:

Before running the project, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/19021386/interview-project
   cd interview-project
   ```

2. **Configure Environment Variables**:

   You need to ensure the environment variables are properly configured for your application to run. The environment variables can be set in the `docker-compose.yml` file under the `app` service. Here's the relevant section:

   ```yaml
   environment:
     - NODE_ENV=development
     - DB_HOST=db
     - DB_USER=root
     - DB_PASSWORD=my_interview_password
     - DB_NAME=my_interview_database
     - DB_PORT=3306
   ```

   These environment variables do the following:

   - **NODE_ENV**: Specifies the environment mode, which is set to `development`.
   - **DB_HOST**: Points to the database service named `db` (this matches the service name in Docker Compose).
   - **DB_USER**: Username for the database, in this case, set to `root`.
   - **DB_PASSWORD**: Password for the database (change `my_interview_password` to your actual password if needed).
   - **DB_NAME**: Name of the MySQL database being used, set to `my_interview_database`.
   - **DB_PORT**: Port where the database is exposed, typically `3306` for MySQL.

   If you need to customize these values, modify them in the `docker-compose.yml` file accordingly.

3. **Build and Start the Containers**:

   Run the following command to build and start the containers:

   ```bash
   docker-compose up --build
   ```

   This command will:

   - Build the Node.js application.
   - Set up the MySQL database.
   - Run database migrations and seeds.
   - Start the development server.

4. **Access the Application**:

   Once the containers are up and running, the application will be available at:

   ```
   http://localhost:8080
   ```

5. **Interacting with the Database**:

   The application uses MySQL for the database, and the credentials are defined in `docker-compose.yml`:

   - **Database Name**: `my_interview_database`
   - **Username**: `root`
   - **Password**: `my_interview_password`
   - **Host**: `db` (Docker internal network)
   - **Port**: `3306`

   You can connect to the MySQL instance using a MySQL client or tools like `phpMyAdmin` if you wish to manually interact with the database.

6. **Running Migrations and Seeds**:

   The `command` section in the `docker-compose.yml` ensures that migrations and seeds are automatically applied when the containers are started. However, if you want to run them manually, you can execute:

   ```bash
   docker-compose exec app npm run dev:migrate
   docker-compose exec app npm run dev:seed
   ```

   If you want to modify the migration and seed configuration, the `seeders` and `migrations` folder can be found in the `db` folder in `src`

7. **Stopping the Containers**:

   To stop the running containers, use:

   ```bash
   docker-compose down
   ```

   This will stop the application and database containers but will keep the volumes (including database data) intact.

8. **Removing Volumes (Optional)**:

   If you want to completely remove the containers and associated volumes (e.g., for a fresh start), run:

   ```bash
   docker-compose down -v
   ```

   This will remove the containers and delete the database data stored in volumes.

9. **Unit Testing**:

   To execute the unit tests and generate a coverage report, run the following command:

   ```bash
   npm run test
   ```

   This command will:

   - Run all unit tests in the project.
   - Display the results of each test case.
   - Provide a detailed coverage report, showing which parts of the code are covered by tests.

### Additional Information:

- **Volumes**: The `db_data` volume is used to persist the MySQL data, so the data will remain even if the container is restarted.
- **Ports**: The application is exposed on port `8080` and is mapped to your local machine's `8080` port.

### Troubleshooting:

- If the application doesn't start or throws an error, ensure that the MySQL service is healthy before the app tries to connect to it. You can check the health of the services by running:

  ```bash
  docker-compose ps
  ```

- If migrations or seeding fail, you can check the logs using:

  ```bash
  docker-compose logs app
  ```

## About this Project

This project is a Express backend application that leverages **Sequelize ORM** and **TypeScript** to interact with a MySQL database. The main functionality revolves around managing relationships between **teachers** and **students**, handling registrations, suspensions, and other actions.

### Models

#### Important!!!

In this project, **login, authentication, and authorization** are assumed to have already been handled externally. Therefore, we do **not** include any user registration or login endpoints within this project.

All the necessary data, including user information, is created using **seeders** during the setup process. This means:

- No user registration endpoint is needed or provided.
- Any data required for the application (e.g., users, roles, permissions, etc.) is pre-populated via seeders.

#### Student Model

The `Student` model represents the students in the system and is defined as follows:

- **email**: A unique identifier (Primary Key) for each student.
- **suspended**: A boolean value indicating whether a student is suspended (default is `false`).
- **teachers**: A many-to-many relationship with the `Teacher` model, allowing each student to be associated with multiple teachers.

#### Teacher Model

The `Teacher` model represents teachers in the system. Each teacher can have many students through the `TeacherStudent` join table:

- **email**: A unique identifier (Primary Key) for each teacher.
- **students**: A many-to-many relationship with the `Student` model, allowing each teacher to manage multiple students.

#### TeacherStudent Model

The `TeacherStudent` model acts as a **join table** that facilitates the many-to-many relationship between teachers and students. It records each pairing of a teacher and a student:

- **teacherEmail**: A Foreign Key referencing the `Teacher` model, which serves as part of the composite primary key.
- **studentEmail**: A Foreign Key referencing the `Student` model, which also serves as part of the composite primary key.
- **timestamps**: This model includes `createdAt` and `updatedAt` timestamps, which automatically track when a teacher-student relationship was created or updated.

### Endpoint Services

#### Swagger Documentation

This Swagger documentation provides details of all the API endpoints available in the project, including request and response formats.

- **Endpoint:** `/docs`

#### Register Students

- **Endpoint:** `POST /api/register`
- **Headers:** `Content-Type: application/json`
- **Success Status:** 204
- **Request Body:**
  - `teacher`: Email of the teacher.
  - `students`: List of student emails.

#### Retrieve Common Students

- **Endpoint:** `GET /api/commonstudents`
- **Success Status:** 200
- **Query Parameters:**
  - `teacher`: One or more teacher emails.
- **Success Response Example:**
  ```json
  {
    "students": ["commonstudent1@gmail.com", "commonstudent2@gmail.com"]
  }
  ```

#### Suspend a Student

- **Endpoint:** `POST /api/suspend`
- **Headers:** `Content-Type: application/json`
- **Success Status:** 204
- **Request Body:**
  - `student`: Email of the student.

#### Retrieve for Notifications

- **Endpoint:** `POST /api/retrievefornotifications`
- **Headers:** `Content-Type: application/json`
- **Success Status:** 200
- **Request Body:**
  - `teacher`: Email of the teacher.
  - `notification`: Text of the notification.
- **Success Response Example:**
  ```json
  {
    "recipients": ["student1@gmail.com", "student2@gmail.com"]
  }
  ```

#### Error Responses

- **Error Response Example:**

```json
{
  "message": "\"teacher\" must be a valid email"
}
```

```json
{
  "message": "Not Found"
}
```
