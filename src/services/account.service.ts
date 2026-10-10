import axios from "axios";
import { Account } from "../models/account.model";
import { Customer } from "../models/customer.model";
import { getNibssAuthHeaders } from "./nibss.service";
import { env } from "../config/env";

export const createCustomerAccount = async (
  customerId: string
) => {
  const customer = await Customer.findById(customerId);

  if (!customer) {
    throw new Error("Customer not found");
  }

  if (!customer.kycVerified) {
    throw new Error("Customer KYC has not been verified");
  }

  const existingAccount = await Account.findOne({ customerId });

  if (existingAccount) {
    throw new Error("Customer already has an account");
  }

  const headers = await getNibssAuthHeaders();

  const requestBody = {
    kycType: customer.kycType.toLowerCase(),
    kycID: customer.kycId,
    dob: customer.dateOfBirth,
  };

  console.log("ACCOUNT CREATION REQUEST:");
  console.log(JSON.stringify(requestBody, null, 2));

  try {
    const response = await axios.post(
      `${env.nibssBaseUrl}/api/account/create`,
      requestBody,
      {
        headers,
      }
    );

    console.log("NIBSS ACCOUNT CREATION RESPONSE:");
    console.log(JSON.stringify(response.data, null, 2));

    const nibssAccount = response.data;

    const account = await Account.create({
      customerId: customer._id,
      accountNumber: nibssAccount.accountNumber,
      balance: 15000,
      currency: "NGN",
      status: "ACTIVE",
    });

    return account;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("NIBSS ACCOUNT CREATION ERROR");
      console.error("STATUS:", error.response?.status);
      console.error(
        "RESPONSE:",
        JSON.stringify(error.response?.data, null, 2)
      );
    } else {
      console.error("ACCOUNT CREATION ERROR:", error);
    }

    throw error;
  }
};