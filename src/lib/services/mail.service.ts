import { mailTransporter } from "@/lib/api/mailer";
import { connectDB } from "@/lib/db/connect";
import { EmailModel } from "@/lib/db/models/Email";

interface SendMailParams {
  to: string;
  subject: string;
  html: string;
}

export async function saveEmail(data: {
  to: string;
  fromEmail: string;
  fromName?: string;
  subject: string;
  html: string;
  message?: string;
  templateKey: string;
}) {
  await connectDB();

  return EmailModel.create({
    ...data,
    status: "pending",
  });
}

export async function markEmailSent(id: string) {
  await connectDB();
  return EmailModel.findByIdAndUpdate(id, { status: "sent" });
}

export async function markEmailFailed(id: string, error: string) {
  await connectDB();
  return EmailModel.findByIdAndUpdate(id, {
    status: "failed",
    error,
  });
}

export async function sendMail({
  to,
  subject,
  html,
}: SendMailParams): Promise<void> {
  await mailTransporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}
