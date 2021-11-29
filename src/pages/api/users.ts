import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import prisma from "../../lib/utils/prisma"
import { generateJwtAndRefreshToken } from "../../utils/generateJwtAndRefreshToken"

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const { email, password, telephone } = request.body

    const passwordHash = await bcrypt.hash(password, 6)

    const user = await prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
        telephone: telephone,
      },
      select: {
        id: true,
        roles: true,
      }
    })

    const { token, refreshToken } = generateJwtAndRefreshToken(email, {
      role: user.roles,
    })

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: refreshToken,
      }
    })

    const userData = {
      token,
      refreshToken,
      user
    }

    return response.status(201).json(userData)
  }
}