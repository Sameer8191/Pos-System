import "dotenv/config";
import { resolve } from "node:path";
import { definePrismaConfig } from "@prisma/cli-engine";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";

export default definePrismaConfig({
  orm: ormConfig({
    contract: resolve("src/server/prisma/**/*.prisma").replaceAll("\\", "/"),

    db: {
      connection: process.env["DATABASE_URL"]!,
    },
  }),
});
