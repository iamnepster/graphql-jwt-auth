import 'reflect-metadata'
import 'dotenv/config'
import { notFound, errorHandler } from './middlewares'
import express from 'express'
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
    }),
    context: ({ req, res }) => ({ req, res })
  })

  apolloServer.applyMiddleware({ app })

  app.use(notFound)

  app.use(errorHandler)

  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
  })
}

boostrap()
