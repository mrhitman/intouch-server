import * as knex from "knex";
import { transaction as trx } from "objection";

export const db = knex({
  client: "postgres",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    debug: false
  },
  pool: { min: 24, max: 36 }
});

export const transaction = callback => trx(db, callback);
