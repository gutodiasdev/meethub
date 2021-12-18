import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/utils/prisma";

const handler = nextConnect({}).put( async(request: NextApiRequest, response: NextApiResponse) => {
  const { email, categoryId } = request.body

  const userPreferences = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      userPreferences: {
        update: {
          categories: {
            connect: {
              id: categoryId,
            },
          },
        },
      },
    },
  })

  return response.status(200).json(userPreferences)
})

export default handler;