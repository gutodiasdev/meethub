import { v4 as uuid } from 'uuid'
import prisma from '../lib/utils/prisma';

export async function createRefreshToken(email: string) {
  const currentUserToken = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      token: true,
    }
  })

  if (currentUserToken.token) {
    const refreshToken = uuid()
    return refreshToken;
  }

}