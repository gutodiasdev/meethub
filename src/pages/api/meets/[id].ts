import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/utils/prisma'

export default async (request: NextApiRequest, response: NextApiResponse) => {

  if (request.method === 'GET') {
    const { id } = request.body

    try {

      const meet = await prisma.meet.findUnique({
        where: {
          id: request.query.id.toString(),
        },
        select: {
          id: true,
          name: true,
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
