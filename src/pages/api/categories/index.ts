import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/utils/prisma";
import { Category } from "../../../model/Category";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if(request.method === 'POST') {
  const {name, description} = request.body;

  try {

    const create: Category = await prisma.category.create({
      data: {
        name: name,
        description: description,
      }
    })

    return response.status(201).json(create)
  } catch(error) {

    return response.status(500).json({
      error: error,
      message: 'Error while creating a new category. Try again later.',
    })

  }

  }

  if(request.method === 'GET') {
    
  }
}