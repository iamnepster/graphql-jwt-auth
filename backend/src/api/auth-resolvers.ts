import { Resolver, Query, Mutation, Arg } from 'type-graphql'

@Resolver()
export class AuthResolvers {
  @Query(() => String)
  login(@Arg('email') email: string, @Arg('password') password: string) {
    return `${email} ${password}`
  }

  @Mutation(() => String)
  register(@Arg('email') email: string, @Arg('password') password: string) {
    return `${email} ${password}`
  }
}
