import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "digital-banking-secret";

export const generateToken = (customerId: string) => {
  return jwt.sign(
    {
      customerId,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};