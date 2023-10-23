import nextConnect from "next-connect";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const handler = nextConnect();

export default handler.post(async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (user) {
      if (!user.password) {
        res.status(400).json({ password: "Please complete your password setup" });
      } else {
        const authenticated = req.body.password === user.password;
        if (authenticated) {
          const token = jwt.sign({ id: user.id }, "secret", {
            expiresIn: "3d",
          });
          res.status(200).json({ ...user, token: token });
        } else {
          res.status(401).json({ password: "Incorrect Password" });
        }
      }
    }
    return res.status(400).json({ msg: "Error" });
  } catch (error) {
    return res.status(400).json({ msg: "Error", error });
  }
});
