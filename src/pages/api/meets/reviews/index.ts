import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '../../../../lib/utils/prisma'

const handler = nextConnect<NextApiRequest, NextApiResponse>({

})
  .post(async (req, res) => {
    const { meetId, description, title, rating } = req.body

    const review = await prisma.reviews.create({
      data: {
        meetId: meetId,
        description: description,
        title: title,
        rating: Number(rating),
      }
    })

    return res.status(201).json(review)
  })


export default handler