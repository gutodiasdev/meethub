import { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import prisma from '../../../lib/utils/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'GET') {
    const response = await prisma.user.findUnique({
      where: {
        id: req.query.id.toString(),
      },
      include: {
        UserProfile: true,
      }
    })

    return res.status(200).json(response)

  }

  if (req.method === 'PUT') {
    // TODO
  }
  if (req.method === 'DELETE') {
    // TODO
  }


  return res.status(403)
    .json({ message: 'Error. Method not supported' })
}
