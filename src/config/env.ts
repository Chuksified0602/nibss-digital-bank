import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,

  nibssBaseUrl:
    process.env.NIBSS_BASE_URL ||
    "https://nibssbyphoenix.onrender.com",

  nibssApiKey: process.env.NIBSS_API_KEY || "",

  nibssApiSecret: process.env.NIBSS_API_SECRET || "",
  mongoUri: process.env.MONGODB_URI || "",
};
