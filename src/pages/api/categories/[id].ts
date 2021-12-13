import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/utils/prisma";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if(request.method === 'GET') {
    const {id} = request.query;

    try {

      const category = await prisma.category.findUnique({
        where: {
          id: String(id),
        }
      })
  
      return response.status(200).json(category)

    } catch (error) {

      return response.status(500).json({
        Error: String(error),
        message: 'Somenthing goes wrong. Trying again',
      })

    }
  }
 
}