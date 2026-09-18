import app from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";

const startServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`NIBSS Digital Bank API is running on port ${env.port}`);
  });
};

startServer();