import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/utils/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const meet = await prisma.meet.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        meetDetails: req.body.meetDetails,
        mentorId: req.body.mentorId,
      }
    })

    return res.status(201).json(meet)
  }
  if (req.method === 'GET') {
    const allMeets = await prisma.meet.findMany({
      select: {
        id: true,
        mentor: {
          select: {
            id: true,
            email: true,
            name: true,
            position: true,
          }
        }
      }
    })

    return res.status(200).json(allMeets)
  }


  return res.status(403).json({ Error: 'Method not supported' })
}