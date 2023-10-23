import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      db: PrismaClient;
    }
  }
}

if (!global.db) {
  global.db = new PrismaClient({
    errorFormat: "minimal",
  });
}
const db: PrismaClient = global.db;

export default db;
