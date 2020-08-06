import { createRefreshToken } from './../auth/auth-token'
import { ApiContext } from './api-context'
import { AuthAccessToken } from '../auth/auth-responses'
import { hash, compare } from 'bcrypt'
import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { createAccessToken } from '../auth/auth-token'
import { checkAuthentication } from '../auth/auth-middleware'

@Resolver()
export class AuthResolvers {
  @Query(() => String)
  @UseMiddleware(checkAuthentication)
  sicher(): String {
    return 'Geheimnis'
  }

  @Query(() => AuthAccessToken)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: ApiContext
  ): Promise<AuthAccessToken> {
    const passwordHash = await hash(password, 12)
    const passwordValid = compare(password, passwordHash)

    const accessToken = passwordValid ? createAccessToken({ id: 'testid', email, password }) : ''

    res.cookie('refc', createRefreshToken({ id: 'testid', email, password }))

    return { accessToken }
  }

  @Mutation(() => String)
  register(@Arg('email') email: string, @Arg('password') password: string): string {
    return `${email} ${password}`
  }
}
