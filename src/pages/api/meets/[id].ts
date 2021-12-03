import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/utils/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const meet = await prisma.meet.findUnique({
      where: {
        id: req.query.id.toString(),
      },
      select: {
        id: true,
        name: true,
        meetDetails: true,
        price: true,
        members: true,
      }
    })

    return res.status(200).json(meet)
  }
  if (req.method === 'PUT') {
    const meet = await prisma.meet.update({
      where: {
        id: req.query.id.toString(),
      },
      data: {
        name: req.body.name,
        meetDetails: req.body.meetDetails,
        price: req.body.price,
      }
    })

    return res.status(200).json(meet)
  }
  if (req.method === 'DELETE') {
    const meet = await prisma.meet.delete({
      where: {
        id: req.body.id,
      },
      include: {
        reviews: true,
      }
    })

    return res.status(200)
  }

}
