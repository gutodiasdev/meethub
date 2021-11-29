import { v4 as uuid } from 'uuid'


export function createRefreshToken(email: string) {
  const refreshToken = uuid()

  return refreshToken;
}