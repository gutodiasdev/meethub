import jwt from 'jsonwebtoken'
import { createRefreshToken } from './createRefreshToken';
import { v4 as uuid } from 'uuid'
import prisma from '../lib/utils/prisma';


export async function generateJwtAndRefreshToken(email: string, payload: object = {}) {
  const token = jwt.sign(payload, process.env.AUTH_SECRET, {
    subject: email,
    expiresIn: 10, // 15 minutes
  });

  // const refreshToken = createRefreshToken(email)

  const refreshToken = uuid()

  const updaterUserRefreshToken = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      token: refreshToken,
    }
  })

  return {
    token,
    refreshToken: updaterUserRefreshToken.token,
  }
}