import bcrypt from "bcrypt"

import prisma from "../../lib/utils/prisma"
import { CreateSessionDTO } from "../../utils/types";
import { generateJwtAndRefreshToken } from "../../utils/generateJwtAndRefreshToken";

const handler = async (request, response) => {

  const { method } = request;

  if (method !== 'POST') {
    return response
      .status(400)
      .json({ success: false, message: 'Method not allowed.' });
  }

  const { email, password } = request.body as CreateSessionDTO;

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

export default handler;