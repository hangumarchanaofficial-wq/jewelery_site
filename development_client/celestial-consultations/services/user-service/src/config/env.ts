export const ENV = {
  PORT:           process.env.PORT || 4001,
  DB_HOST:        process.env.DB_HOST || "localhost",
  DB_PORT:        Number(process.env.DB_PORT) || 5432,
  DB_NAME:        process.env.DB_NAME || "celestial_db",
  DB_USER:        process.env.DB_USER || "postgres",
  DB_PASSWORD:    process.env.DB_PASSWORD || "postgres",
  JWT_SECRET:     process.env.JWT_SECRET || "secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",
};
