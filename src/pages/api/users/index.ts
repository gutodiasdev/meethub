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
      
      await prisma.$disconnect()

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
      
      if(error instanceof Prisma.PrismaClientKnownRequestError) {

        console.log(error)

      }

      throw error;

    }
  }

  if (request.method === 'PUT') {

    try {
      
      const {id, name, email, password, telephone, image, position, biography, categoryId} = request.body

      if(password) {

        const hashedPassword = await bcrypt.hash(password, 6)

        const updatedUser = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            image: image,
            password: hashedPassword,
            email: email,
            name: name,
            telephone: telephone,
            position: position,
            biography: biography,
          }
        })

        return response.status(200).json(updatedUser) 
      }
  
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          image: image,
          email: email,
          name: name,
          telephone: telephone,
          position: position,
          biography: biography,
          userPreferences: {
            update: {
              categories: {
                connect: categoryId,
              },
            }
          }
        }
      })

      return response.status(200).json(updatedUser) 

    } catch (error) {

      if(error instanceof Prisma.PrismaClientKnownRequestError) {

        return response.json(String(error))

      }

      throw error;
      
    }

  }
  
  if (request.method === 'DELETE') {
    
    try {

      const { id } = request.body

      await prisma.user.delete({
        where: {
          id: id,
        }
      })

      return response.status(200).json({message: `User ${id} was deleted successfully!`})

    } catch (error) {

      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })
      
    }

  }

  return response.status(403).json({ Error: 'Method not supported' })
}