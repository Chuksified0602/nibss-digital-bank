import express from "express";

import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes";
import accountRoutes from "./routes/account.routes";
import transactionRoutes from "./routes/transaction.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/transactions", transactionRoutes);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "NIBSS Digital Bank API is healthy",
  });
});

export default app;