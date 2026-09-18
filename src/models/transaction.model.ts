import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  customerId: mongoose.Types.ObjectId;
  fromAccount: string;
  toAccount: string;
  amount: number;
  type: "INTRA_BANK" | "INTER_BANK";
  status: "PENDING" | "SUCCESS" | "FAILED";
  nibssTransactionId?: string;
}

const transactionSchema = new Schema<ITransaction>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    fromAccount: {
      type: String,
      required: true,
      trim: true,
    },

    toAccount: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    type: {
      type: String,
      enum: ["INTRA_BANK", "INTER_BANK"],
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      required: true,
      default: "PENDING",
    },

    nibssTransactionId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);