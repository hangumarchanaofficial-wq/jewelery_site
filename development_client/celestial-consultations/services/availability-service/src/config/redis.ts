import { createClient } from "redis";
import { ENV } from "./env";
export const redis = createClient({ url: ENV.REDIS_URL });
redis.on("error", (e) => console.error("Redis error:", e));
export const connectRedis = async () => { await redis.connect(); console.log("✓ Redis connected"); };
