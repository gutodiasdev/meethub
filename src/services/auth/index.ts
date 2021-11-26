import jwt from 'jsonwebtoken'

import { createRefreshToken } from './database';

export function generateJwtAndRefreshToken(email: string, payload: object = {}) {
  const token = jwt.sign(payload, process.env.AUTH_SECRET, {
    subject: email,
    expiresIn: 5, // 15 minutes
  });

  const refreshToken = createRefreshToken(email)

  return {
    token,
    refreshToken,
  }
}
