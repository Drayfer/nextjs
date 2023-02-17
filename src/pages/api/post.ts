// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Post, PrismaClient } from "@prisma/client";
import { Cors } from "@/lib/cors";
const prisma = new PrismaClient();

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  await Cors(req, res);
  if (req.method === "POST") {
    const body: Post = req.body;
    try {
      const post = await prisma.post.create({
        data: {
          title: body.title,
          body: body.body,
        },
      });
      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json({ error: "wrong method" });
  }
}
