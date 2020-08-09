import { MiddlewareFn } from 'type-graphql/dist/interfaces/Middleware'
import { ApiContext } from '../api/graphql/api-context'
import { verify } from 'jsonwebtoken'
import { User } from 'src/model/user.model'

export const checkAuthentication: MiddlewareFn<ApiContext> = ({ context }, next) => {
  const authorization = context.req.headers.authorization

  if (!authorization) {
    throw new Error('Authorization header missing')
  }

  const token = authorization.split(' ')[1]
  const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)

  context.payload = payload as any

  return next()
}

export const checkAuthTokenVersion: MiddlewareFn<ApiContext> = ({ context }, next) => {
  const authorization = context.req.headers.authorization

  if (!authorization) {
    throw new Error('Authorization header missing')
  }

  const token = authorization.split(' ')[1]
  const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)

  if ((payload as User).tokenVersion !== 1) {
    throw new Error('Token version is not valid')
  }

  context.payload = payload as any

  return next()
}
