import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pgPool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: 5432,
});

export default pgPool;