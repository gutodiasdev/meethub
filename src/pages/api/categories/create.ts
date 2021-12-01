import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/utils/prisma"


export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const { name } = request.body

    const meet = await prisma.categories.create({
      data: {
        name: name,
        subcategory: subcategory,
        user_preferences_id: 
      },
    })

    return response.status(201).json(meet)
  }
}