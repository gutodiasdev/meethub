import prisma from "../lib/utils/prisma";

export async function checkRefreshTokenIsValid(email: string, refreshToken: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (user.token === refreshToken) {
    return true
  }

  return false;

}