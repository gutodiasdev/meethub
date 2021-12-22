import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '../../../../lib/utils/prisma'

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch: () => { },
  onError: () => { }
}).post(async (req, res) => {
  const { userId } = req.body

  const mentor = await prisma.meet.findMany({
    where: {
      members: {
        some: {
          user: {
            AND: [{
              id: userId,
            },
            {
              roles: 'mentor'
            }
            ]
          }
        }
      }
    }
  })

  const user = await prisma.meet.findMany({
    where: {
      members: {
        some: {
          user: {
            AND: [{
              id: userId,
            }, {
              roles: 'user',
            }]
          }
        }
      }
    }
  })

  return res.status(200).json({ asMentor: mentor, asUser: user })

})

export default handler