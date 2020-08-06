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
