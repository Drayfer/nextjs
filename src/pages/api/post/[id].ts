// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Post, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function postId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id as string;
  const body: Post = req.body;
  if (req.method === "GET") {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });
      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else if (req.method === "PUT") {
    const post = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title: body.title,
        body: body.body,
      },
    });
    return res.status(200).json(post);
  } else if (req.method === "DELETE") {
    const post = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
    return res.status(200).json(post);
  } else {
    return res.status(500).json({ error: "wrong method" });
  }
}
