import { User } from './../model/user.model'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'

@Resolver()
export class AuthResolvers {
  @Query(() => User)
  login(@Arg('email') email: string, @Arg('password') password: string): User {
    return { id: '1', email, password }
  }

  @Mutation(() => String)
  register(@Arg('email') email: string, @Arg('password') password: string): string {
    return `${email} ${password}`
  }
}
