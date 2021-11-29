import prisma from "../lib/utils/prisma";

export async function checkRefreshTokenIsValid(email: string, refreshToken: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      token: true,
    },
  })

  const token = user.token;

  if (token === refreshToken) {
    return token
  }

  return false;

}