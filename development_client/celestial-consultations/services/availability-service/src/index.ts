import "dotenv/config";
import app from "./app";
import { connectRedis } from "./config/redis";
import { pool } from "./config/db";
import { ENV } from "./config/env";
const start = async () => {
  await pool.connect();
  await connectRedis();
  app.listen(ENV.PORT, () => console.log(`✓ Availability Service on port ${ENV.PORT}`));
};
start().catch((e) => { console.error(e); process.exit(1); });
