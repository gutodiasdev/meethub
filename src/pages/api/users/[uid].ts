import { useRouter } from 'next/router'
import prisma from '../../../lib/utils/prisma'

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(403)
      .json({ message: 'Error. Method not allowed' })
  }

  const router = useRouter()
  const { uid } = router.query

  const response = await prisma.user.findUnique({
    where: {
      id: uid.toString(),
    }
  })

  return res.status(200).json(response)
}
