import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import { generateJwtAndRefreshToken } from "../../../utils/generateJwtAndRefreshToken"
import prisma from "../../../lib/utils/prisma"


export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const { email, password, telephone, roles = 'user' } = request.body

    const passwordHash = await bcrypt.hash(password, 6)

    const user = await prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
        telephone: telephone,
        roles: roles,
      },
      select: {
        id: true,
        roles: true,
      }
    })

    const { token, refreshToken } = await generateJwtAndRefreshToken(email, {
      role: user.roles,
    })

    const userData = {
      token,
      refreshToken,
      user
    }

    return response.status(201).json(userData)
  }
}