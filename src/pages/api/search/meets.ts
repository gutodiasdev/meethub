import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '../../../lib/utils/prisma'

const handler = nextConnect<NextApiRequest, NextApiResponse>({

})
  .post(async (req, res) => {
    const { keyword } = req.body

    const meets = await prisma.meet.findMany({
      where: {
        OR: [{
          name: {
            contains: keyword,
            mode: 'insensitive',
          }
        },
        {
          members: {
            some: {
              roles: 'mentor',
              user: {
                name: {
                  contains: keyword,
                  mode: 'insensitive'
                }
              }
            }
          }
        }
        ]
      },
      include: {
        members: {
          where: {
            roles: 'mentor'
          },
          select: {
            roles: true,
            userId: true,
          }
        }
      }
    })

    return res.status(200).json({ results: { meets } })
  })

export default handler
