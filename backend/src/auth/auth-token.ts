import { User } from 'src/model/user.model'
import { sign } from 'jsonwebtoken'

export const createAccessToken = (user: User) => {
  return sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '5m' })
}

export const createRefreshToken = (user: User): string => {
  return sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '14d' })
}
