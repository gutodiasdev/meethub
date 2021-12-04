import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../../lib/utils/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const iAmMentor = await prisma.meet.findMany({
      where: {
        members: {
          every: {
            roles: 'mentor'
          },
          some: {
            roles: {
              in: 'user',
            }
          }
        },
      }
    })

    const iAmUser = await prisma.meet.findMany({
      where: {
        members: {
          every: {
            roles: 'user'
          }
        }
      }
    })

    const myMeets = {
      asMentor: iAmMentor,
      asUser: iAmUser
    }

    return res.status(200).json(myMeets)
  }


  return res.status(403).json({ Error: 'Method not supported' })
}