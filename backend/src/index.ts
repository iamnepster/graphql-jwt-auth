import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { notFound, errorHandler } from './middlewares'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { AuthResolvers } from './api/graphql/auth-resolvers'
import { refreshTokens } from './api/ajax/auth-ajax'

const app = express()
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(cookieParser())

const port = process.env.PORT || 8080

const boostrap = async () => {
  app.get('/refresh_tokens', refreshTokens)

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
