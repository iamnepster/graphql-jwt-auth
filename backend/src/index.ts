import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { AuthResolvers } from './api/auth-resolvers'
import cors from 'cors'

const app = express()
app.use(cors({ origin: 'http://localhost:3000' }))

const port = process.env.PORT || 8080

const boostrap = async () => {
  app.get('/refresh_token', (_, res) => {
    res.send({
      data: 'Hello World!'
    })
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolvers]
    })
  })

  apolloServer.applyMiddleware({ app })

  app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
  })

  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '' : error.stack
    })
  })

  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
  })
}

boostrap()
