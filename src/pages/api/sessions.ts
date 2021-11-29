import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"

import prisma from "../../lib/utils/prisma"
import { CreateSessionDTO } from "../../utils/types";
import { generateJwtAndRefreshToken } from "../../utils/generateJwtAndRefreshToken";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const { email, password } = request.body as CreateSessionDTO;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
        roles: true,
        email: true
      }
    })

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!user || comparedPassword === false) {
      return response
        .status(401)
        .json({
          error: true,
          message: 'E-mail or password incorrect.'
        });
    }

    const { token, refreshToken } = generateJwtAndRefreshToken(email, {
      roles: user.roles,
    })

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: refreshToken,
      }
    })

    return response.json({
      token,
      refreshToken,
      roles: user.roles,
      email,
    });
  }

  return response.status(403).json({ message: 'Something went wrong...' })
}