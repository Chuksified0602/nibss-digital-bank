import { Request, Response } from "express";
import {
  createCustomerAccount,
} from "../services/account.service";
import {
  nameEnquiry,
  getAccountBalance,
} from "../services/nibss.service";

export const createAccount = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId } = req.body;

    const account = await createCustomerAccount(customerId);

    return res.status(201).json({
      status: "success",
      message: "Account created successfully",
      data: account,
    });
  } catch (error) {
    console.error("Account creation error:", error);

    return res.status(400).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Account creation failed",
    });
  }
};

export const accountNameEnquiry = async (
  req: Request,
  res: Response
) => {
  try {
    const { accountNumber } = req.params;

    const result = await nameEnquiry(
      accountNumber as string
    );

    return res.status(200).json({
      status: "success",
      message: "Account name retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Name enquiry error:", error);

    return res.status(400).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Name enquiry failed",
    });
  }
};

export const accountBalance = async (
  req: Request,
  res: Response
) => {
  try {
    const { accountNumber } = req.params;

    const result = await getAccountBalance(
      accountNumber as string
    );

    return res.status(200).json({
      status: "success",
      message: "Account balance retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Account balance error:", error);

    return res.status(400).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to retrieve account balance",
    });
  }
};