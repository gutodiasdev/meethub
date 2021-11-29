import jwt from "jsonwebtoken";
import prisma from "../lib/utils/prisma";
import { DecodedToken } from "../utils/types";

const checkAuthMiddleware = (handler) => {
  return async (request, response) => {
    const { authorization } = request.headers;

    if (!authorization) {
      return response
        .status(401)
        .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }

    const [, token] = authorization?.split(' ');

    if (!token) {
      return response
        .status(401)
        .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }

    try {
      const decoded = jwt.verify(token as string, process.env.AUTH_SECRET) as DecodedToken;

      const currentUser = await prisma.user.findUnique({
        where: { email: decoded.sub },
        select: {
          email: true,
        }
      })

      if (!currentUser) {
        return response.status(401).json({ message: 'Erro no token.' })
      }

      request.user = currentUser;

      return handler(request, response);

    } catch (err) {

      return response
        .status(401)
        .json({ error: true, code: 'token.expired', message: 'Token invalid.' })
    }
  }
}

export default checkAuthMiddleware;