import mongoose, { Schema, Document } from "mongoose";

export interface PaymentDocument extends Document {
  inquiryId: mongoose.Types.ObjectId;
  utrNumber: string;
  paymentProof: string; // base64 or URL
  fileName: string;
  fileSize: number;
  fileType: string;
  status: "pending" | "verified" | "rejected";
  verifiedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<PaymentDocument>(
  {
    inquiryId: {
      type: Schema.Types.ObjectId,
      ref: "Inquiry",
      required: true,
    },
    utrNumber: { type: String, required: true },
    paymentProof: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    verifiedAt: Date,
    rejectionReason: String,
  },
  { timestamps: true },
);

// Indexes
PaymentSchema.index({ inquiryId: 1 });
PaymentSchema.index({ utrNumber: 1 });
PaymentSchema.index({ status: 1 });

export const PaymentModel =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
