import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "lib/db.server";
import { ApiRequest, ApiResponse } from "lib/utils";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "GET request not allowed" });
    return;
  }

  console.log(req.body.email, "req.body", req.body.password);
  // check user exists or not in db
  console.log(req.body.email, "emailllll");
  const user = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone_no: true,
      status: true,
      password: true,
    },
  });

  console.log(user, "userrrrr");
  if (user) {
    if (!user.password) {
      res.status(400).json({ password: "Please complete your password setup" });
    } else {
      const authenticated = await bcrypt.compare(req.body.password, user.password);
      if (authenticated) {
        const token = jwt.sign({ id: user.id }, "secret", {
          expiresIn: "3d",
        });
        res.status(200).json({ ...user, token: token });
      } else {
        res.status(401).json({ password: "Incorrect Password" });
      }
    }
  } else {
    res.status(400).json({ email: "Incorrect Email" });
  }
}
