import prisma from "../lib/utils/prisma";

export async function invalidateRefreshToken(email: string, refreshToken: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (user.token !== refreshToken) {
    return false
  }

  return true;

}