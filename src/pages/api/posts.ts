// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { cors, runMiddleware } from "@/lib/cors";
const prisma = new PrismaClient();

export interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function posts(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);
  if (req.method === "GET") {
    try {
      const posts: Post[] = await prisma.post.findMany();
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json({ error: "wrong method" });
  }
}

// posts()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
