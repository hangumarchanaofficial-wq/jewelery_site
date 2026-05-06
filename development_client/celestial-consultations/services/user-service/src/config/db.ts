import { Pool } from "pg";
import { ENV } from "./env";

export const pool = new Pool({
  host:     ENV.DB_HOST,
  port:     ENV.DB_PORT,
  database: ENV.DB_NAME,
  user:     ENV.DB_USER,
  password: ENV.DB_PASSWORD,
});

export const connectDB = async () => {
  const client = await pool.connect();
  console.log("✓ PostgreSQL connected");
  client.release();
};
