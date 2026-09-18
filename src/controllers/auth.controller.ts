import { Request, Response } from "express";
import { Customer } from "../models/customer.model";
import { generateToken } from "../utils/jwt";

export const loginCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId } = req.body;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        status: "error",
        message: "Customer not found",
      });
    }

    const token = generateToken(customer._id.toString());

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        token,
        customerId: customer._id,
      },
    });
  } catch (error) {
    console.error("Customer login error:", error);

    return res.status(400).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
};