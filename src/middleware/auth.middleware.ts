import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  customerId?: string;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "Authorization token is required",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Invalid authorization format",
      });
    }

    const decoded = verifyToken(token);

    if (
      typeof decoded !== "object" ||
      !decoded ||
      !("customerId" in decoded)
    ) {
      return res.status(401).json({
        status: "error",
        message: "Invalid authorization token",
      });
    }

    req.customerId = decoded.customerId as string;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired authorization token",
    });
  }
};