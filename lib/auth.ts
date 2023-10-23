import jwt from "jsonwebtoken";
import nextConnect from "next-connect";
import { ApiRequest, ApiResponse } from "lib/utils";
// import db from "lib/db.server";

const isAuthor = nextConnect();
const isApexUser = nextConnect();
const isAuthenticated = nextConnect();

// verify user is authenticated or not
isAuthenticated.use(async (req: ApiRequest, res: ApiResponse, next: any) => {
  if (!req.headers.authorization)
    return res.status(403).send({ message: "Please provide authentication token" });

  //user token
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token" });
  }

  jwt.verify(token, "secret", async (err, decoded) => {
    if (err) return res.status(401).send({ message: "Failed to authenticate Token", status: 401 });
    // const user = await db.user.findUnique({where: {id: decoded.id}});
    req.userId = decoded.id;
    // req.userRole = decoded.role;
    next();
  });
});

//check user is superuser or not
isAuthor.use(async (req: ApiRequest, res: ApiResponse, next: any) => {
  // if (req.userRole !== "author") {
  //   return res.status(403).send({ message: "You don't Have permission to Access" });
  // }
  next();
});

//check user is superuser or not
isApexUser.use(async (req: ApiRequest, res: ApiResponse, next: any) => {
  // if (req.userRole !== "apex_user") {
  //   return res.status(403).send({ message: "You don't Have permission to Access" });
  // }
  next();
});

export { isAuthenticated, isAuthor };
