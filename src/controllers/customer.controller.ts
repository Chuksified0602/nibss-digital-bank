import { Request, Response } from "express";
import { onboardCustomer } from "../services/customer.service";
export const createCustomer = async (
  req: Request,
  res: Response
) => {
      console.log("CREATE CUSTOMER CONTROLLER HIT");
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      kycType,
      kycId,
    } = req.body;

    const customer = await onboardCustomer(
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      kycType,
      kycId
    );

    return res.status(201).json({
      status: "success",
      message: "Customer onboarded successfully",
       data: customer,
    });
  } catch (error) {
    console.error("Customer onboarding error:", error);
    return res.status(500).json({
      status: "error",
      message: error instanceof Error
        ? error.message
        : "Customer onboarding failed",
    });
  }
};