import { User } from '../../model/user.model'
import { Request, Response } from 'express'

export interface ApiContext {
  req: Request
  res: Response
  payload?: User
}
