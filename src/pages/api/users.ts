import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import { generateJwtAndRefreshToken } from "../../utils/generateJwtAndRefreshToken"
import prisma from "../../lib/utils/prisma"


const handler = async (request, response) => {
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

    const userData = {
      token,
      refreshToken,
      user
    }

    return response.status(201).json(userData)
  }
}

export default handler;