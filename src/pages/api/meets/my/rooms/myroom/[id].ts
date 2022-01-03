import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '../../../../../../lib/utils/prisma'

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch: (req, res) => { },
  onError: (req, res) => { }
})
  .get(async (req, res) => {
    const { userId, id } = req.query

    const myRoom = await prisma.meetEnrollment.findUnique({
      where: {
        userId_meetId: {
          userId: String(userId),
          meetId: String(id),
        }
      }
    })

    return res.status(200).json(myRoom)
  })
export default handler