import mongoose, { Schema, Document } from "mongoose";

export interface EmailDocument extends Document {
  to: string;
  fromEmail: string;
  fromName?: string;
  subject: string;
  message: string;
  templateKey: string;
  status: "pending" | "sent" | "failed";
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmailSchema = new Schema<EmailDocument>(
  {
    to: { type: String, required: true },
    fromEmail: { type: String, required: true },
    fromName: String,
    subject: { type: String, required: true },
    message: { type: String, required: true },
    templateKey: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },

    error: String,
  },
  { timestamps: true }
);

export const EmailModel =
  mongoose.models.Email || mongoose.model("Email", EmailSchema);
