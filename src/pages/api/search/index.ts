import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import prisma from '../../../lib/utils/prisma'

const handler = nextConnect<NextApiRequest, NextApiResponse>({

})
  .post(async (req, res) => {
    const { keyword } = req.body

    const mentors = await prisma.user.findMany({
      where: {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        position: true,
        categories: {
          select: {
            id: true,
            name: true,
          }
        },
      }
    })

    // const meets = await prisma.meet.findMany({
    //   where: {
    //     OR: [{
    //       name: {
    //         startsWith: keyword,
    //       }
    //     }, {
    //       members: {
    //         some: {
    //           user: {
    //             roles: 'mentor',
    //             name: {
    //               contains: keyword,
    //               mode: 'insensitive'
    //             }
    //           }
    //         }
    //       }
    //     }]
    //   }
    // })

    return res.status(200).json({ results: { mentors } })
  })

export default handler
