import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '../../../../lib/utils/prisma'

const handler = nextConnect<NextApiRequest, NextApiResponse>({

})
  .get(async (req, res) => {
    const { id } = req.query
    const parsed = String(id)
    const reviews = await prisma.reviews.findMany({
      where: {
        meetId: parsed,
      },
    })

    return res.status(200).json(reviews)
  })