import prisma from "../../lib/utils/prisma";
import checkAuthMiddleware from "../../middlewares/checkAuthMiddleware";

const handler = async (request, response) => {
  const { method } = request;

  if (method !== 'GET') {
    return response
      .status(400)
      .json({ success: false, message: 'Method not allowed' });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: request.user,
    }
  })

  if (!user) {
    return response
      .status(400)
      .json({ error: true, message: 'User not found.' });
  }

  return response.json({
    email: user.email,
    roles: user.roles,
    permissions: user.permissions,
    id: user.id,
  })
}

export default checkAuthMiddleware(handler)
