import db from "lib/db.server";
import nextConnect from "next-connect";
import { isAuthenticated } from "@/lib/auth";
import { ApiRequest, ApiResponse } from "lib/utils";

const handler = nextConnect();

handler.use(isAuthenticated).get(async (req: ApiRequest, res: ApiResponse) => {
  // get all users from the users table
  const users = await db.user.findMany();
  res.status(200).json(users);
});

export default handler;
