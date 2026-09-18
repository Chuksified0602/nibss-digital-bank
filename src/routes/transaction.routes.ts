import { Router } from "express";
import {
  transfer,
  getTransactionStatus,
  getTransactionHistory,
} from "../controllers/transaction.controller";

const router = Router();

router.post("/transfer", transfer);

router.get("/history/:customerId", getTransactionHistory);

router.get("/status/:id", getTransactionStatus);

export default router;