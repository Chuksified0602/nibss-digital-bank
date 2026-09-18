import { Transaction } from "../models/transaction.model";
import { Customer } from "../models/customer.model";
import {
  getNibssAuthHeaders,
  nameEnquiry,
  validateBvn,
  validateNin,
} from "./nibss.service";
import axios from "axios";
import { env } from "../config/env";

export const createTransfer = async (
  customerId: string,
  from: string,
  to: string,
  amount: number,
  type: "INTRA_BANK" | "INTER_BANK"
) => {
  if (amount <= 0) {
    throw new Error("Transfer amount must be greater than zero");
  }

  const customer = await Customer.findById(customerId);

  if (!customer) {
    throw new Error("Customer not found");
  }

  if (!customer.kycVerified) {
    throw new Error("Customer KYC has not been verified");
  }

  // Step 1: Validate customer's BVN/NIN
  if (customer.kycType === "BVN") {
    await validateBvn(customer.kycId);
  } else {
    await validateNin(customer.kycId);
  }

  // Step 2: Perform recipient name enquiry
  await nameEnquiry(to);

  // Step 3: Initiate transfer with NIBSS
  const headers = await getNibssAuthHeaders();

  const response = await axios.post(
    `${env.nibssBaseUrl}/api/transfer`,
    {
      from,
      to,
      amount: amount.toString(),
    },
    {
      headers,
    }
  );

  const nibssTransaction = response.data;

  const transaction = await Transaction.create({
    customerId,
    fromAccount: from,
    toAccount: to,
    amount,
    type,
    status:
      nibssTransaction.status === "SUCCESS"
        ? "SUCCESS"
        : "PENDING",
    nibssTransactionId:
      nibssTransaction.transactionId ||
      nibssTransaction.id,
  });

  return transaction;
};

export const getTransactionById = async (
  transactionId: string
) => {
  const headers = await getNibssAuthHeaders();

  const response = await axios.get(
    `${env.nibssBaseUrl}/api/transaction/${transactionId}`,
    {
      headers,
    }
  );

  return response.data;
};

export const getCustomerTransactions = async (
  customerId: string
) => {
  const transactions = await Transaction.find({
    customerId,
  }).sort({ createdAt: -1 });

  return transactions;
};