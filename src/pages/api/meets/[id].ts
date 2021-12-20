import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/utils/prisma'

export default async (request: NextApiRequest, response: NextApiResponse) => {

  if (request.method === 'GET') {
    const { id } = request.query

    try {

      const meet = await prisma.meet.findUnique({
        where: {
          id: String(id),
        },
        select: {
          id: true,
          name: true,
          image: true,
          meetDetails: true,
          price: true,
          members: true,
          categories: {
            select: {
              name: true,
            }
          }
        }
      })

      return response.status(200).json(meet)

    } catch (error) {

      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })

    }
  }

}
