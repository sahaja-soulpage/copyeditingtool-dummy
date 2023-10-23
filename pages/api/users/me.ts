import db from "lib/db.server";
import nextConnect from "next-connect";
import { isAuthenticated } from "@/lib/auth";
import { ApiRequest, ApiResponse } from "lib/utils";

const handler = nextConnect();

handler.use(isAuthenticated).get(async (req: ApiRequest, res: ApiResponse) => {
  // get user using the idssss
  const id: any = req.userId;
  const user = await db.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!user) {
    res.status(400).json({ message: "not found" });
  } else {
    // Fetch collaborator data for the user

    res.status(200).json(user);
  }
});

export default handler;
