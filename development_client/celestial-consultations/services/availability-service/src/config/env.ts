export const ENV = {
  PORT:       process.env.PORT || 4002,
  DB_HOST:    process.env.DB_HOST || "localhost",
  DB_PORT:    Number(process.env.DB_PORT) || 5432,
  DB_NAME:    process.env.DB_NAME || "celestial_db",
  DB_USER:    process.env.DB_USER || "postgres",
  DB_PASSWORD:process.env.DB_PASSWORD || "postgres",
  REDIS_URL:  process.env.REDIS_URL || "redis://localhost:6379",
};
