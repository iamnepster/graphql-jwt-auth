import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { createAccessToken, createRefreshToken } from '../../auth/auth-service'
import { User } from '../../model/user.model'

export const refreshTokens = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.refc

  if (!token) {
    const error = new Error('Cookie is missing')
    res.status(400)
    next(error)
  }

  try {
    const payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
    const refreshToken = createRefreshToken(payload as User)
    const accessToken = createAccessToken(payload as User)

    res.cookie('refc', refreshToken)
    res.send({
      accessToken
    })
  } catch (_) {
    const error = new Error('Token is either invalid or expired')
    res.status(403)
    next(error)
  }
}
