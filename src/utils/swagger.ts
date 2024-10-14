// src/swagger.ts

import { Options } from 'swagger-jsdoc'

import dotenv from 'dotenv'

import swaggerJsdoc from 'swagger-jsdoc'

import swaggerUI from 'swagger-ui-express'

import { Express, Request, Response } from 'express'

dotenv.config()

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Interview Project',
      description: 'API Documentation',
      version: '1.0.0',
      contact: {
        name: 'Chu Thanh Tung',
        email: 'tungchuthanh1234@gmail.com'
      }
    },
    servers: [
      {
        url: process.env.SERVER_URL
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/schema/schema.ts']
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

function swaggerDocs(app: Express) {
  //Page
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  //Docs in JSON
}

export default swaggerDocs
