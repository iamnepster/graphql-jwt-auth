import { ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  id: string
  email: string
  password: string
  tokenVersion: number
}
