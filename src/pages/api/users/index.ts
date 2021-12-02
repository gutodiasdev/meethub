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
    const allUsers = await prisma.user.findMany({})

    return res.status(200).json(allUsers)
  }


  return res.status(403).json({ Error: 'Method not supported' })
}