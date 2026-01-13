import { mailTransporter } from "@/lib/api/mailer";

interface SendMailParams {
  to: string;
  subject: string;
  html: string;
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
