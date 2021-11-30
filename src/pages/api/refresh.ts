import prisma from "../../lib/utils/prisma";
import addUserInformationToRequest from "../../middlewares/addUserInformationToRequest"
import { checkRefreshTokenIsValid } from "../../utils/checkRefreshTokenIsValid";
import { generateJwtAndRefreshToken } from "../../utils/generateJwtAndRefreshToken";
import { invalidateRefreshToken } from "../../utils/invalidateRefreshToken";

const handler = async (request, response) => {

  const { method } = request;

  if (method !== 'POST') {
    return response
      .status(400)
      .json({ success: false, message: 'Only POST requests are allowed.' });
  }

  const email = request.user;
  const { refreshToken } = request.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

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

  const isValidRefreshToken = checkRefreshTokenIsValid(email, refreshToken)

  if (!isValidRefreshToken) {
    return response
      .status(401)
      .json({ error: true, message: 'Refresh token is invalid.' });
  }

  invalidateRefreshToken(email, refreshToken)

  const { token, refreshToken: newRefreshToken } = await generateJwtAndRefreshToken(email, {
    roles: user.roles,
  })

  return response.json({
    token,
    refreshToken: newRefreshToken,
    roles: user.roles,
  });

}

export default addUserInformationToRequest(handler)