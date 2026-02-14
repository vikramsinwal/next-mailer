import mongoose, { Schema, Document } from "mongoose";

export interface InquiryDocument extends Document {
  fullName: string;
  currentCity: string;
  email: string;
  contactNumber: string;
  category: string;
  categoryName?: string;
  subCategory: string;
  subCategoryName?: string;
  plan?: string;
  amount?: number;
  message?: string;
  status: "pending" | "sent" | "failed";
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<InquiryDocument>(
  {
    fullName: { type: String, required: true },
    currentCity: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    category: { type: String, required: true },
    categoryName: { type: String },
    subCategory: { type: String, required: true },
    subCategoryName: { type: String },
    plan: { type: String },
    amount: { type: Number },
    message: { type: String },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    error: String,
  },
  { timestamps: true },
);

// Indexes for better query performance
InquirySchema.index({ email: 1 });
InquirySchema.index({ status: 1 });
InquirySchema.index({ createdAt: -1 });

export const InquiryModel =
  mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
