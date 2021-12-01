import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/utils/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(403).json({ message: 'Error. Method not allowed' })
  }

  const response = await prisma.category.findMany()

  return res.status(200).json(response)
}