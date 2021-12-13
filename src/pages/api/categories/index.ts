import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/utils/prisma";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if(request.method === 'POST') {
    const {name, description} = request.body;

    try {
      
      const create = await prisma.category.create({
        data: {
          name: name,
          description: description,
        }
      })
  
      return response.status(201).json({create, message: `Category ${name}, successfuly created!`})

    } catch (error) {
      
      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })

    }
  }

  if(request.method === 'GET') {
    try {
      
      const categories = await prisma.category.findMany()

      return response.status(200).json(categories)

    } catch (error) {
      
      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })

    }
  }

  if(request.method === 'PUT') {
    const {id, name, description} = request.body;

    try {

      const category = await prisma.category.update({
        where: {
          id: id
        },
        data: {
          name: name,
          description: description,
        },
      })
  
      return response.status(200).json(category)

    } catch (error) {

      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })

    }
  }

  if(request.method === 'DELETE') {
    const { id } = request.body;

    try {

      const category = await prisma.category.delete({
        where: {id: id}
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