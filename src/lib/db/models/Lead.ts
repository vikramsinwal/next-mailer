import mongoose, { Schema, Document } from "mongoose";

export interface LeadDocument extends Document {
  fullName: string;
  currentCity: string;
  email: string;
  contactNumber: string;
  message: string;
  status: "pending" | "sent" | "failed";
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<LeadDocument>(
  {
    fullName: { type: String, required: true },
    currentCity: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },

    error: String,
  },
  { timestamps: true },
);

export const LeadModel =
  mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
