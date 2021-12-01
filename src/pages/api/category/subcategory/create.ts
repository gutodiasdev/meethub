import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../lib/utils/prisma"


export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const { name } = request.body

    const category = await prisma.subCategory.create({
      data: {
        name: name
      }
    })

    return response.status(201).json(category)
  }
}