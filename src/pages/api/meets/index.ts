import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/utils/prisma";
import nextConnect from "next-connect";

export default nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => { },
  onNoMatch: (req, res, next) => { },
})
  .post(async (req, res) => {
    const { name, price, meetDetails, categoryId, mentorId, image } = req.body;

    const meet = await prisma.meet.create({
      data: {
        name: name,
        price: Number(price),
        meetDetails: meetDetails,
        image: image,
        members: {
          create: {
            roles: "mentor",
            user: {
              connect: {
                id: mentorId,
              },
            },
          },
        },
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    return res.status(201).json(meet);
  })
  .get(async (req, res) => {
    const meets = await prisma.meet.findMany({
      select: {
        id: true,
        categories: {
          select: {
            name: true,
          },
        },
        name: true,
        price: true,
        meetDetails: true,
        members: {
          where: {
            roles: 'mentor',
          }
        },
      }
    })

    return res.status(200).json(meets);
  })
  .put(async (req, res) => {
    const { meetId, image, price, meetDetails, categories, name } = req.body

    await prisma.meet.update({
      where: {
        id: meetId,
      },
      data: {
        image: image,
        price: price,
        meetDetails: meetDetails,
        name: name,
        categories: categories,
      }
    })

    return res.status(200).json({ message: 'Successfuly updated!' })
  })

