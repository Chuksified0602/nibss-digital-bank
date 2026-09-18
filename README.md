# NIBSS Digital Banking Backend

A Node.js and TypeScript digital banking backend integrated with the NIBSS by Phoenix API.

## Project Overview

This project implements core digital banking backend functionality including:

- Customer onboarding
- BVN verification
- NIN verification
- Bank account creation
- Account balance enquiry
- Account name enquiry
- Intra-bank and inter-bank transfers
- Transaction status enquiry
- Transaction history
- JWT-based authentication
- MongoDB data persistence

## Technology Stack

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Axios
- JWT
- bcrypt
- dotenv
- NIBSS by Phoenix API

## Project Structure

```text
src/
├── config/
│   ├── env.ts
│   └── database.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── customer.controller.ts
│   ├── account.controller.ts
│   └── transaction.controller.ts
├── middleware/
│   └── auth.middleware.ts
├── models/
│   ├── customer.model.ts
│   ├── account.model.ts
│   └── transaction.model.ts
├── routes/
│   ├── auth.routes.ts
│   ├── customer.routes.ts
│   ├── account.routes.ts
│   └── transaction.routes.ts
├── services/
│   ├── nibss.service.ts
│   ├── customer.service.ts
│   ├── account.service.ts
│   └── transaction.service.ts
├── utils/
│   └── jwt.ts
├── app.ts
└── server.ts