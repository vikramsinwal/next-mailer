import { mailTransporter } from "@/lib/api/mailer";
import { connectDB } from "@/lib/db/connect";
import { EmailModel } from "@/lib/db/models/Email";
import { LeadModel } from "@/lib/db/models/Lead";

interface LeadParams {
  fullName: string;
  currentCity: string;
  email: string;
  contactNumber: string;
  message: string;
}

export async function savelead(data: {
  fullName: string;
  currentCity: string;
  email: string;
  contactNumber: string;
  message: string;
}) {
  await connectDB();

  return LeadModel.create({
    ...data,
    status: "pending",
  });
}

export async function markEmailSent(id: string) {
  await connectDB();
  return LeadModel.findByIdAndUpdate(id, { status: "sent" });
}

export async function markEmailFailed(id: string, error: string) {
  await connectDB();
  return LeadModel.findByIdAndUpdate(id, {
    status: "failed",
    error,
  });
}

export async function sendEnquiryMail(data: LeadParams): Promise<void> {
  await mailTransporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to: process.env.SUPPORT_EMAIL!,
    subject: `New Lead from ${data.fullName}`,
    html: `
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Current City:</strong> ${data.currentCity}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Contact Number:</strong> ${data.contactNumber}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
}
