import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/utils/prisma";
import nextConnect from 'next-connect'
import jwt from 'jsonwebtoken'
interface NextApiRequestExatended extends NextApiRequest {
  user: string
}

export default nextConnect<NextApiRequestExatended, NextApiResponse>({

  onNoMatch(req, res) {
    res.status(405).json({mesage: `Method ${req.method} Not Allowed`});
  }
  
}).use((req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  const [, token] = authorization?.split(' ');

  if (!token) {
    return res
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  try {

    const decoded = jwt.verify(token as string, process.env.AUTH_SECRET)

    req.user = String(decoded.sub);

    return next()

  } catch (err) {

    return res
      .status(401)
      .json({ error: true, code: 'token.expired', message: 'Token invalid.' })
  }

}).get(async (req, res) => {

  const user = await prisma.user.findUnique({
    where: {
      email: req.user,
    }
  })

  if (!user) {
    return res
      .status(400)
      .json({ error: true, message: 'User not found.' });
  }

  return res.json({
    email: user.email,
    roles: user.roles,
    permissions: user.permissions,
    id: user.id,
  })

})
