import { NextApiRequest, NextApiResponse } from "next"
import { Prisma } from "@prisma/client"
import prisma from "../../../lib/utils/prisma"

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const { name, price, meetDetails, mentorEmail, categoryId, mentorId } = request.body

    try {
    
      const meet = await prisma.meet.create({
        data: {
          name: name,
          price: Number(price),
          meetDetails: meetDetails,
          members: {
            create: {
              roles: 'mentor',
              user: {
                connect: {
                  id: mentorId,
                },
              },
            }
          },
          categories: {
            connect: {
              id: categoryId
            }
          }
        },
      })
  
      return response.status(201).json(meet)

    } catch (error) {
      
      if(error instanceof Prisma.PrismaClientKnownRequestError) {

        console.log(error)

      }

      throw error;
    
    }
  }

  if (request.method === 'GET') {
    try {
      
      const meets = await prisma.meet.findMany({
        select: {
          id: true,
          name: true,
          price: true,
        }
      })
      
      return response.status(200).json(meets)

    } catch (error) {

      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })
      
    }
  }

  if (request.method === 'PUT') {
    const {id, name, meetDetails, price} = request.body

    try {
      
      const meet = await prisma.meet.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          meetDetails: meetDetails,
          price: price,
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

  if (request.method === 'DELETE') {
    const { id } = request.body

    try {
      
      await prisma.meet.delete({
        where: {
          id: id,
        },
        include: {
          reviews: true,
        }
      })
  
      return response.status(200)

    } catch (error) {

      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })
      
    }
  }
}