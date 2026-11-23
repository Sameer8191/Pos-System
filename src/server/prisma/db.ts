import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
  contract,
  url: process.env['DATABASE_URL']!,
});


// import { definePrismaConfig } from "prisma/config";
// import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";

// export default definePrismaConfig({
//   orm: ormConfig({
//     contract: "./src/prisma/**/*.prisma",
//     db: {
//       connection: process.env['DATABASE_URL']!,
//     },
//   }),
// });
