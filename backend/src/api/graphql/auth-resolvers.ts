import { AuthResponse } from './../../auth/auth-responses'
import { createRefreshToken } from '../../auth/auth-service'
import { ApiContext } from './api-context'
import { AuthAccessToken } from '../../auth/auth-responses'
import { hash, compare } from 'bcrypt'
import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { createAccessToken } from '../../auth/auth-service'
import { checkAuthentication } from '../../auth/auth-middleware'
import { verify } from 'jsonwebtoken'

@Resolver()
export class AuthResolvers {
  @Query(() => String)
  @UseMiddleware(checkAuthentication)
  sicher(): String {
    return 'Geheimnis'
  }

  @Query(() => AuthResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: ApiContext
  ): Promise<AuthResponse> {
    const passwordHash = await hash(password, 12)
    const passwordValid = compare(password, passwordHash)

    try {
      // TODO: match user with database
      const user = { id: 'testid', email, password, tokenVersion: 1 }
      const accessToken = passwordValid ? createAccessToken(user) : ''

      res.cookie('refc', createRefreshToken({ id: 'testid', email, password, tokenVersion: 1 }))
      return { token: { accessToken } }
    } catch (error) {
      res.status(403)
      return { message: 'Invalid credentials' }
    }
  }

  @Query(() => AuthResponse)
  async refreshTokens(@Ctx() { req, res }: ApiContext): Promise<AuthResponse> {
    const token = req.cookies.refc

    if (!token) {
      res.status(400)
      throw new Error('Cookie is missing')
    }

    try {
      const payload: any = verify(token, process.env.REFRESH_TOKEN_SECRET!)

      const user = {
        id: payload.id,
        email: payload.email,
        password: payload.password,
        tokenVersion: payload.tokenVersion
      }

      const refreshToken = createRefreshToken(user)
      const accessToken = createAccessToken(user)

      res.cookie('refc', refreshToken)
      return { token: { accessToken } }
    } catch (error) {
      res.status(403)
      return { message: 'Invalid refresh token' }
    }
  }

  @Mutation(() => String)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: ApiContext
  ): Promise<AuthAccessToken> {
    const passwordHash = await hash(password, 12)

    // TODO: add user to the database
    console.log({ email, passwordHash })

    const user = { id: 'testid', email, password, tokenVersion: 1 }
    const accessToken = createAccessToken(user)
    const refreshToken = createRefreshToken(user)

    res.cookie('refc', refreshToken)

    return { accessToken }
  }
}
