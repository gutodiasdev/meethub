import bcrypt from "bcrypt"

import prisma from "../../lib/utils/prisma"
import { generateJwtAndRefreshToken } from "../../utils/generateJwtAndRefreshToken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {

  if (request.method === 'POST') {

    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
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

    const { token, refreshToken } = await generateJwtAndRefreshToken(email, {
      roles: user.roles,
      permissions: user.permissions,
    })

    return response.json({
      token,
      refreshToken,
      roles: user.roles,
      id: user.id,
      permissions: user.permissions,
      email,
    });

  }
}

export default handler;