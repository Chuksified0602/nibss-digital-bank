import { Router } from "express";
import {
  createAccount,
  accountNameEnquiry,
  accountBalance,
} from "../controllers/account.controller";

const router = Router();

router.post("/", createAccount);

router.get("/name-enquiry/:accountNumber", accountNameEnquiry);

router.get("/balance/:accountNumber", accountBalance);

export default router;