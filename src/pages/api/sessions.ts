import { NextApiRequest, NextApiResponse } from "next";
import { generateJwtAndRefreshToken } from "../../services/auth";
import { users } from "../../services/auth/database";
import { CreateSessionDTO } from "../../services/auth/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body as CreateSessionDTO;

    const user = users.get(email);

    if (!user || password !== user.password) {
      return res
        .status(401)
        .json({
          error: true,
          message: 'E-mail or password incorrect.'
        });
    }

    const { token, refreshToken } = generateJwtAndRefreshToken(email, {
      permissions: user.permissions,
      roles: user.roles,
    })

    return res.json({
      token,
      refreshToken,
      permissions: user.permissions,
      roles: user.roles,
    });
  }
}