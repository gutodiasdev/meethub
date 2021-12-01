import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/utils/prisma"


export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const { name, description, price, user_id } = request.body

    const meet = await prisma.meets.create({
      data: {
        name: name,
        description: description,
        price: price,
        user_id: user_id,
      },
    })

    return response.status(201).json(meet)
  }
}