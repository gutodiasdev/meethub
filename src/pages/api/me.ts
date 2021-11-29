import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/utils/prisma";
import { DecodedToken } from "../../utils/types";

export default async (request: NextApiRequest, response: NextApiResponse) => {

  if (request.method === 'GET') {
    const { authorization } = request.headers;

    if (!authorization) {
      return response
        .status(401)
        .json({ error: true, code: 'token.invalid', message: 'Token not present.', authorization: authorization })
    }

    const [, token] = authorization?.split(' ');

    if (!token) {
      return response
        .status(401)
        .json({ error: true, code: 'token.invalid', message: 'erro 2' })
    }

    const decoded = jwt.verify(token, process.env.AUTH_SECRET) as DecodedToken;

    const email = decoded.sub;

    if (!decoded) {
      return response
        .status(401)
        .json({ error: true, code: 'token.expired', message: 'Token invalid.' })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        roles: true,
      }
    })

    if (!user) {
      return response
        .status(400)
        .json({ error: true, message: 'User not found.' });
    }

    return response.json({
      email,
      roles: user.roles,
    })
  }

  return response.statusCode
}

