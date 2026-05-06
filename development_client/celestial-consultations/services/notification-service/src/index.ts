import "dotenv/config";
import app from "./app";
import { ENV } from "./config/env";

app.listen(ENV.PORT, () => console.log(`✓ Notification Service on port ${ENV.PORT}`));
