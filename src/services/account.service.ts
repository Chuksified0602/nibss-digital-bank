import { Account } from "../models/account.model";
import { Customer } from "../models/customer.model";
import { getNibssAuthHeaders } from "./nibss.service";
import axios from "axios";
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

  try {
    const response = await axios.post(
      `${env.nibssBaseUrl}/api/account/create`,
      {
        kycType: customer.kycType.toLowerCase(),
        kycID: customer.kycId,
        dob: customer.dateOfBirth,
      },
      {
        headers,
      }
    );

    const nibssAccount = response.data;

    console.log(
      "NIBSS ACCOUNT RESPONSE:",
      JSON.stringify(nibssAccount, null, 2)
    );

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
      console.error(
        "NIBSS ACCOUNT CREATION ERROR:",
        JSON.stringify(error.response?.data, null, 2)
      );
    }

    throw error;
  }
};