import bcrypt from "bcrypt";
import db from "lib/db.server";
import { ApiRequest, ApiResponse } from "lib/utils";
const { v4: uuidv4 } = require("uuid");

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "GET request not allowed" });
    return;
  }

  // check user exists or not in db
  const user: any = await db.user.findUnique({
    where: {
      token: req.body.token,
    },
  });

  if (user) {
    if (req.body.new_password !== req.body.confirm_password) {
      res.status(400).json({ confirm_password: "Passwords do not match" });
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.new_password, salt, async function (err, hash) {
        // hash the raw password
        const password_hash = hash;
        req.body.password = password_hash;
        // update user password
        const update_password = await db.user.update({
          where: {
            token: req.body.token,
          },
          data: {
            password: password_hash,
          },
        });
        if (update_password) {
          const newToken = uuidv4();
          // Update the user's token field in the database
          await db.user.update({
            where: { id: user.id }, // Specify the user to update
            data: { token: newToken }, // Set the new token value
          });
        }
      });
    });

    res.status(200).json({ message: "password updated successfully" });
  } else {
    res.status(400).json({ message: "Link expired or invalid link" });
  }
}
