import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/utils/prisma"
import { generateJwtAndRefreshToken } from "../../../utils/generateJwtAndRefreshToken";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    try {
      
      const { email, password, telephone, roles = 'user' } = request.body

      const passwordHash = await bcrypt.hash(password, 6)

      const user = await prisma.user.create({
        data: {
          email: email,
          password: passwordHash,
          telephone: telephone,
          roles: roles,
        },
        select: {
          id: true,
          roles: true,
          permissions: true,
          email: true,
        }
      })

      const { token, refreshToken } = await generateJwtAndRefreshToken(email, {
        role: user.roles,
        permissions: user.permissions,
      })

      const userData = {
        token,
        refreshToken,
        user
      }

      return response.status(201).json(userData)

    } catch (error) {

      if(error instanceof Prisma.PrismaClientKnownRequestError) {

        console.log(error)

      }

      throw error;
      
    }
  }

  if (request.method === 'GET') {
    
    try {
      
      const users = await prisma.user.findMany()

      return response.status(200).json(users)

    } catch (error) {
      
      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })

    }
  }

  if (request.method === 'PUT') {

    try {
      
      const {id, email, password, telephone, image, position, biography} = request.body

      const passwordHash = await bcrypt.hash(password, 6)
  
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email: email,
          password: passwordHash,
          telephone: telephone,
          image: image,
          position: position,
          biography: biography,
        }
      })

      return response.status(200).json(updatedUser)

    } catch (error) {

      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })
      
    }

  }
  
  if (request.method === 'DELETE') {
    
    try {

      const { id } = request.body

      const response = await prisma.user.delete({
        where: {
          id: request.query.id.toString(),
        }
      })

    } catch (error) {

      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })
      
    }

  }




  return response.status(403).json({ Error: 'Method not supported' })
}