import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/utils/prisma'

export default async (request: NextApiRequest, response: NextApiResponse) => {

  if (request.method === 'GET') {

    const { id } = request.query

    try {
      
      const findOne = await prisma.user.findUnique({
        where: {
          id: String(id),
        },
        select: {
          id: true,
          email: true,
          name: true,
          position: true,
          roles: true,
          userPreferences: true,
          telephone: true,
          meets: {
            include: {
              meet: true,
            }
          }
        },
      })
  
      return response.status(200).json(findOne)

    } catch (error) {

      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })
      
    }

  }

  return response.status(403).json({ message: 'Error. Method not supported' })
}
