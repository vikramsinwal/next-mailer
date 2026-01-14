"use server";

import { contactSchema } from "@/lib/validators/contact.schema";
import { sendMail } from "@/lib/3p-api/php-mailer";
import { verifyCaptcha } from "@/lib/verifyCaptcha";
import { emailTemplate } from "@/lib/emailTemplate";

export async function sendMailAction(formData: FormData) {
  // ✅ Convert FormData → plain object for Zod
  const payload = {
    fromName: formData.get("fromName"),
    fromEmail: formData.get("fromEmail"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
      token: formData.get("token"),
    attachments: formData.getAll("file"), // 👈 get all files
  };

  // ✅ Zod validation
  const data = contactSchema.parse(payload);

  // 🔐 CAPTCHA verification
  const isHuman = await verifyCaptcha(data.token);
  if (!isHuman) {
    throw new Error("Captcha failed");
  }

  // ✅ Attachment handling (optional)
  const file = formData.get("file") as File | null;
  const attachments = [];

  if (file) {
    // Optional: file size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Attachment size exceeds 10MB");
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    attachments.push({
      filename: file.name,
      content: buffer,
      contentType: file.type,
    });
  }

  // ✅ Send mail
  await sendMail({
    to: data.email,
    subject: data.subject,
    html: emailTemplate(data), // or data.message
    // html: data.message,
    fromEmail: data.fromEmail,
    fromName: data.fromName,
    attachments,
  });
}
