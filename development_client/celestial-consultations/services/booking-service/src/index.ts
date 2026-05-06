import "dotenv/config";
import app from "./app";
import { pool } from "./config/db";
import { ENV } from "./config/env";
const start = async () => {
  await pool.connect();
  app.listen(ENV.PORT, () => console.log(`✓ Booking Service on port ${ENV.PORT}`));
};
start().catch((e) => { console.error(e); process.exit(1); });
