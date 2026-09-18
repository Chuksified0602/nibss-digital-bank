import { Request, Response } from "express";
import {
  createTransfer,
  getTransactionById,
  getCustomerTransactions,
} from "../services/transaction.service";

export const transfer = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      customerId,
      from,
      to,
      amount,
      type,
    } = req.body;

    const transaction = await createTransfer(
      customerId,
      from,
      to,
      amount,
      type
    );

    return res.status(201).json({
      status: "success",
      message: "Transfer successful",
      data: transaction,
    });
  } catch (error) {
    console.error("Transfer error:", error);

    return res.status(400).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Transfer failed",
    });
  }
};

export const getTransactionStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const transaction = await getTransactionById(
      id as string
    );

    return res.status(200).json({
      status: "success",
      data: transaction,
    });
  } catch (error) {
    console.error("Transaction status error:", error);

    return res.status(400).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to get transaction status",
    });
  }
};

export const getTransactionHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const customerId = (req as any).customerId;

    if (!customerId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const transactions =
      await getCustomerTransactions(customerId);

    return res.status(200).json({
      status: "success",
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error("Transaction history error:", error);

    return res.status(400).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to get transaction history",
    });
  }
};