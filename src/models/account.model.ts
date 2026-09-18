import mongoose, { Document, Schema } from "mongoose";

export interface IAccount extends Document {
  customerId: mongoose.Types.ObjectId;
  accountNumber: string;
  balance: number;
  currency: string;
  status: "ACTIVE" | "INACTIVE";
}

const accountSchema = new Schema<IAccount>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      unique: true,
    },

    accountNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    balance: {
      type: Number,
      required: true,
      default: 15000,
    },

    currency: {
      type: String,
      required: true,
      default: "NGN",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      required: true,
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export const Account = mongoose.model<IAccount>(
  "Account",
  accountSchema
);