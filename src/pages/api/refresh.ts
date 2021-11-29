import { decode } from "jsonwebtoken";
import prisma from "../../lib/utils/prisma";
import { checkRefreshTokenIsValid } from "../../utils/checkRefreshTokenIsValid";
import { generateJwtAndRefreshToken } from "../../utils/generateJwtAndRefreshToken";
import { invalidateRefreshToken } from "../../utils/invalidateRefreshToken";
import { DecodedToken } from "../../utils/types";

export default async (request, response) => {
  if (request.method === 'POST') {
    const { authorization } = request.headers;
    const { refreshToken } = request.body;

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

    const decoded = decode(token as string) as DecodedToken;

    request.user = decoded.sub;
    const email = request.user;


    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        token: true,
        email: true,
        roles: true,
      }
    })

    if (!user) {
      return response
        .status(401)
        .json({
          error: true,
          message: 'User not found.'
        });
    }

    if (!refreshToken) {
      return response
        .status(401)
        .json({ error: true, message: 'Refresh token is required.' });
    }

    if (token !== refreshToken) {
      return response
        .status(401)
        .json({ error: true, message: 'Refresh token is invalid.' });
    }

    const isValidRefreshToken = checkRefreshTokenIsValid(email, refreshToken)

    if (!isValidRefreshToken) {
      return response
        .status(401)
        .json({ error: true, message: 'Refresh token is invalid.' });
    }

    // invalidateRefreshToken(email, refreshToken)


    const { token: newToken, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(email, {
      roles: user.roles,
    })

    return response.json({
      token: newToken,
      refreshToken: newRefreshToken,
      roles: user.roles,
    })
  }
}