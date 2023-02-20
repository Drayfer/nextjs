// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Cors } from "@/lib/cors";
const prisma = new PrismaClient();

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  await Cors(req, res);
  const { postId } = req.query;
  if (req.method === "POST") {
    const body = req.body;

    try {
      const comment = await prisma.comment.create({
        data: {
          name: body.name,
          body: body.body,
          postId: Number(postId),
        },
      });

      return res.status(200).json(comment);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else if (req.method === "GET") {
    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId: Number(postId),
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json({ error: "wrong method" });
  }
}
