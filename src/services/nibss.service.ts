import axios from "axios";
import { env } from "../config/env";

const nibssClient = axios.create({
  baseURL: env.nibssBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const onboardFintech = async (
  name: string,
  email: string
) => {
  const response = await nibssClient.post("/api/fintech/onboard", {
    name,
    email,
  });

  return response.data;
};

export const loginFintech = async () => {
  const response = await nibssClient.post("/api/auth/token", {
    apiKey: env.nibssApiKey,
    apiSecret: env.nibssApiSecret,
  });

  return response.data;
};

export const getNibssToken = async () => {
  const response = await loginFintech();

  return response.token;
};

export const getNibssAuthHeaders = async () => {
  const token = await getNibssToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getNibssAccounts = async () => {
  const headers = await getNibssAuthHeaders();

  const response = await nibssClient.get("/api/accounts", {
    headers,
  });

  return response.data;
};

export const createBvn = async (
  bvn: string,
  firstName: string,
  lastName: string,
  dob: string,
  phone: string
) => {
  const headers = await getNibssAuthHeaders();

  const response = await nibssClient.post(
    "/api/insertBvn",
    {
      bvn,
      firstName,
      lastName,
      dob,
      phone,
    },
    {
      headers,
    }
  );

  return response.data;
};

export const validateBvn = async (bvn: string) => {
  const headers = await getNibssAuthHeaders();

  const response = await nibssClient.post(
    "/api/validateBvn",
    {
      bvn,
    },
    {
      headers,
    }
  );

  return response.data;
};

export const createNin = async (
  nin: string,
  firstName: string,
  lastName: string,
  dob: string
) => {
  const headers = await getNibssAuthHeaders();

  const response = await nibssClient.post(
    "/api/insertNin",
    {
      nin,
      firstName,
      lastName,
      dob,
    },
    {
      headers,
    }
  );

  return response.data;
};

export const validateNin = async (nin: string) => {
  const headers = await getNibssAuthHeaders();

  const response = await nibssClient.post(
    "/api/validateNin",
    {
      nin,
    },
    {
      headers,
    }
  );

  return response.data;
};

export const nameEnquiry = async (
  accountNumber: string
) => {
  const headers = await getNibssAuthHeaders();

  const response = await nibssClient.get(
    `/api/account/name-enquiry/${accountNumber}`,
    {
      headers,
    }
  );

  return response.data;
};

export const getAccountBalance = async (
  accountNumber: string
) => {
  const headers = await getNibssAuthHeaders();

  const response = await nibssClient.get(
    `/api/account/balance/${accountNumber}`,
    {
      headers,
    }
  );

  return response.data;
};