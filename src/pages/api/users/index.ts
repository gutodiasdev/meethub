import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/utils/prisma"
import { generateJwtAndRefreshToken } from "../../../utils/generateJwtAndRefreshToken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password, telephone, roles = 'user' } = req.body

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

    return res.status(201).json(userData)
  }

  if (req.method === 'GET') {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        telephone: true,
        email: true,
        roles: true,
        userPreferences: true,
      }
    })

    return res.status(200).json(users)
  }


  return res.status(403).json({ Error: 'Method not supported' })
}