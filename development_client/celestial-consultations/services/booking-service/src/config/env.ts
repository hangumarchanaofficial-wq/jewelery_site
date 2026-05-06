export const ENV = {
  PORT: process.env.PORT || 4003,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME || "celestial_db",
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "postgres",
  AVAILABILITY_SERVICE_URL: process.env.AVAILABILITY_SERVICE_URL || "http://localhost:4002",
  NOTIFICATION_SERVICE_URL: process.env.NOTIFICATION_SERVICE_URL || "http://localhost:4005",
};
