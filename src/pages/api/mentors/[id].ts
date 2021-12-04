import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/utils/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'GET') {
    const response = await prisma.user.findUnique({
      where: {
        id: req.query.id.toString(),
      },
    })

    return res.status(200).json(response)

  }

  if (req.method === 'PUT') {
    const response = await prisma.user.update({
      where: {
        id: req.query.id.toString(),
      },
      data: {
        email: req.body.email,
        password: req.body.password,
        telephone: req.body.telephone,
      }
    })
  }
  if (req.method === 'DELETE') {
    const response = await prisma.user.delete({
      where: {
        id: req.query.id.toString(),
      }
    })
  }


  return res.status(403)
    .json({ message: 'Error. Method not supported' })
}
