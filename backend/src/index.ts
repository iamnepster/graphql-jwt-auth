import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { AuthResolvers } from './api/auth-resolvers'

const app = express()

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

  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
  })
}

boostrap()
