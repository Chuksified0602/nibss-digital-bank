import mongoose, { Document, Schema } from "mongoose";
export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;

  kycType: "BVN" | "NIN";
  kycId: string;
  kycVerified: boolean;
  kycVerifiedAt?: Date;
}
const customerSchema = new Schema<ICustomer>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    dateOfBirth: {
      type: String,
      required: true,
    },
    kycType: {
  type: String,
  enum: ["BVN", "NIN"],
  required: true,
},

kycId: {
  type: String,
  required: true,
  unique: true,
},

kycVerified: {
  type: Boolean,
  required: true,
  default: false,
},
kycVerifiedAt: {
 type: Date,
},
  },
   
  {
    timestamps: true,
  }
);
export const Customer = mongoose.model<ICustomer>(
  "Customer",
  customerSchema
);