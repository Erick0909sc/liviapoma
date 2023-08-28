import prisma from "@/lib/prismadb";
import { Role } from "@prisma/client";
import axios from "axios";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { name, email, password, image }:
          {
            name: string;
            email: string;
            password: string;
            image: string;
          } = req.body;
        if (!name && !email && !password) {
          return res.status(400).json({ message: "Information is missing" });
        }
        // first user is administrator
        let role: Role = "User";
        const users = await prisma.user.findMany();
        if (!users.length) {
          role = "Admin";
        }
        // check duplicate users
        const checkExist = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (checkExist) {
          return res.status(400).json({ message: "The account has already been created before" });
        } else {

          const passwordhash = await hash(password, 5);
          await prisma.user.create({
            data: {
              name: name,
              email,
              password: passwordhash,
              image: image ? image : "",
              role,
            },
          });
          // await axios.post(`${process.env.BASE_URL}/api/auth/isnewuser`, {
          //   user: name,
          //   email: email,
          // });
          res.status(201).json({ message: "User created successfully", email });
        }
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    case "GET":
      try {
        const users = await prisma.user.findMany()
        users.length ? res.status(200).json(users) : res.status(400).json({ message: 'users not found' })
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` })
      break;
  }
}
