import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class AuthAccessToken {
  @Field()
  accessToken: string
}

@ObjectType()
export class AuthRefreshToken {
  @Field()
  refreshToken: string
}

@ObjectType()
export class AuthResponse {
  @Field({ nullable: true })
  message?: string

  @Field({ nullable: true })
  token?: AuthAccessToken
}
